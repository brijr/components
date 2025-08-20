import Ajv from "ajv";
import addFormats from "ajv-formats";
import { JSONSchema7 } from "json-schema";
import { 
  ComponentDefinition, 
  ValidationResult, 
  ValidationError, 
  ValidationWarning,
  GenerationContext 
} from "./types";
import { validateComponentProps, ComponentSchemaMap } from "./generator";

/**
 * Initialize AJV with formats
 */
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
  validateFormats: true,
});

// Add format validators
addFormats(ajv);

// Add custom formats
ajv.addFormat("uri-reference", /^(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
ajv.addFormat("color", /^#[0-9A-F]{6}$/i);

/**
 * Component Validator class
 */
export class ComponentValidator {
  private validators: Map<string, any> = new Map();
  
  /**
   * Validate props against component schema
   */
  validateProps(
    componentSlug: string,
    props: any,
    definition?: ComponentDefinition
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    // 1. Zod validation (if available)
    const zodResult = validateComponentProps(componentSlug, props);
    if (!zodResult.success) {
      zodResult.error.errors.forEach(err => {
        errors.push({
          path: err.path.join("."),
          message: err.message,
          type: err.code,
          suggestion: this.getSuggestion(err.code, err.path),
        });
      });
    }
    
    // 2. JSON Schema validation (if definition provided)
    if (definition?.schema) {
      const jsonValid = this.validateWithJSONSchema(
        props,
        definition.schema,
        componentSlug
      );
      
      if (!jsonValid.valid) {
        errors.push(...jsonValid.errors!);
      }
    }
    
    // 3. Business rules validation
    if (definition?.validation) {
      const businessRules = this.validateBusinessRules(
        props,
        definition.validation
      );
      
      if (!businessRules.valid) {
        errors.push(...businessRules.errors!);
      }
      
      if (businessRules.warnings) {
        warnings.push(...businessRules.warnings);
      }
    }
    
    // 4. Content quality checks
    const qualityChecks = this.validateContentQuality(props);
    if (qualityChecks.warnings) {
      warnings.push(...qualityChecks.warnings);
    }
    
    // 5. Attempt auto-fix if there are errors
    let fixedProps = props;
    if (errors.length > 0) {
      const fixed = this.attemptAutoFix(props, errors, definition);
      if (fixed.success) {
        fixedProps = fixed.props;
        // Convert errors to warnings since we fixed them
        warnings.push(...errors.map(e => ({
          path: e.path,
          message: `Auto-fixed: ${e.message}`,
          type: "auto-fixed",
        })));
        errors.length = 0; // Clear errors
      }
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
      fixedProps: fixedProps !== props ? fixedProps : undefined,
    };
  }
  
  /**
   * Validate with JSON Schema
   */
  private validateWithJSONSchema(
    props: any,
    schema: JSONSchema7,
    componentSlug: string
  ): ValidationResult {
    let validator = this.validators.get(componentSlug);
    
    if (!validator) {
      validator = ajv.compile(schema);
      this.validators.set(componentSlug, validator);
    }
    
    const valid = validator(props);
    
    if (!valid) {
      const errors: ValidationError[] = validator.errors.map((err: any) => ({
        path: err.instancePath.replace(/^\//, "").replace(/\//g, "."),
        message: err.message || "Validation failed",
        type: err.keyword,
        suggestion: this.getSuggestion(err.keyword, err.instancePath),
      }));
      
      return { valid: false, errors };
    }
    
    return { valid: true };
  }
  
  /**
   * Validate business rules
   */
  private validateBusinessRules(
    props: any,
    validation: ComponentDefinition["validation"]
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    if (!validation) return { valid: true };
    
    // Check required fields
    validation.required?.forEach(field => {
      if (!this.getNestedValue(props, field)) {
        errors.push({
          path: field,
          message: `${field} is required`,
          type: "required",
        });
      }
    });
    
    // Check conditional rules
    validation.conditional?.forEach(rule => {
      const propValue = this.getNestedValue(props, rule.if.prop);
      let conditionMet = false;
      
      switch (rule.if.condition) {
        case "exists":
          conditionMet = propValue !== undefined && propValue !== null;
          break;
        case "equals":
          conditionMet = propValue === rule.if.value;
          break;
        case "contains":
          conditionMet = String(propValue).includes(rule.if.value);
          break;
        case "matches":
          conditionMet = new RegExp(rule.if.value).test(String(propValue));
          break;
      }
      
      if (conditionMet) {
        // Apply "then" rules
        rule.then.required?.forEach(field => {
          if (!this.getNestedValue(props, field)) {
            errors.push({
              path: field,
              message: `${field} is required when ${rule.if.prop} ${rule.if.condition} ${rule.if.value || ""}`,
              type: "conditional-required",
            });
          }
        });
        
        rule.then.forbidden?.forEach(field => {
          if (this.getNestedValue(props, field)) {
            warnings.push({
              path: field,
              message: `${field} should not be set when ${rule.if.prop} ${rule.if.condition} ${rule.if.value || ""}`,
              type: "conditional-forbidden",
            });
          }
        });
      }
    });
    
    // Check constraints
    validation.constraints?.forEach(constraint => {
      const value = this.getNestedValue(props, constraint.prop);
      if (!value) return;
      
      let valid = true;
      let message = constraint.message;
      
      switch (constraint.type) {
        case "minLength":
          valid = String(value).length >= constraint.value;
          message = message || `${constraint.prop} must be at least ${constraint.value} characters`;
          break;
        case "maxLength":
          valid = String(value).length <= constraint.value;
          message = message || `${constraint.prop} must be at most ${constraint.value} characters`;
          break;
        case "pattern":
          valid = new RegExp(constraint.value).test(String(value));
          message = message || `${constraint.prop} must match pattern ${constraint.value}`;
          break;
        case "enum":
          valid = constraint.value.includes(value);
          message = message || `${constraint.prop} must be one of: ${constraint.value.join(", ")}`;
          break;
      }
      
      if (!valid) {
        errors.push({
          path: constraint.prop,
          message,
          type: constraint.type,
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }
  
  /**
   * Validate content quality
   */
  private validateContentQuality(props: any): ValidationResult {
    const warnings: ValidationWarning[] = [];
    
    // Check for placeholder content
    const placeholderPatterns = [
      /lorem ipsum/i,
      /placeholder/i,
      /example text/i,
      /test content/i,
      /\[.*\]/,  // Brackets indicating placeholder
      /TODO/i,
    ];
    
    const checkForPlaceholders = (obj: any, path = ""): void => {
      if (typeof obj === "string") {
        placeholderPatterns.forEach(pattern => {
          if (pattern.test(obj)) {
            warnings.push({
              path,
              message: "Contains placeholder content",
              type: "placeholder",
            });
          }
        });
        
        // Check for all caps (might be placeholder)
        if (obj.length > 3 && obj === obj.toUpperCase()) {
          warnings.push({
            path,
            message: "Text is all uppercase",
            type: "formatting",
          });
        }
        
        // Check for very short content
        if (path.includes("headline") && obj.length < 10) {
          warnings.push({
            path,
            message: "Headline seems too short",
            type: "content-length",
          });
        }
        
        // Check for very long content
        if (path.includes("headline") && obj.length > 100) {
          warnings.push({
            path,
            message: "Headline seems too long",
            type: "content-length",
          });
        }
      } else if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          const newPath = path ? `${path}.${key}` : key;
          checkForPlaceholders(value, newPath);
        });
      }
    };
    
    checkForPlaceholders(props);
    
    return {
      valid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }
  
  /**
   * Attempt to auto-fix common errors
   */
  private attemptAutoFix(
    props: any,
    errors: ValidationError[],
    definition?: ComponentDefinition
  ): { success: boolean; props?: any } {
    const fixed = JSON.parse(JSON.stringify(props)); // Deep clone
    let hasFixedSomething = false;
    
    errors.forEach(error => {
      // Fix missing required fields with defaults
      if (error.type === "required" || error.type === "undefined") {
        const defaultValue = this.getDefaultValue(error.path, definition);
        if (defaultValue !== undefined) {
          this.setNestedValue(fixed, error.path, defaultValue);
          hasFixedSomething = true;
        }
      }
      
      // Fix type mismatches
      if (error.type === "type") {
        const expectedType = this.getExpectedType(error.path, definition);
        const currentValue = this.getNestedValue(props, error.path);
        
        if (expectedType === "string" && typeof currentValue === "number") {
          this.setNestedValue(fixed, error.path, String(currentValue));
          hasFixedSomething = true;
        } else if (expectedType === "number" && typeof currentValue === "string") {
          const parsed = parseFloat(currentValue);
          if (!isNaN(parsed)) {
            this.setNestedValue(fixed, error.path, parsed);
            hasFixedSomething = true;
          }
        }
      }
      
      // Fix format issues
      if (error.type === "format") {
        if (error.message?.includes("URL") || error.message?.includes("uri")) {
          const value = this.getNestedValue(props, error.path);
          if (typeof value === "string" && !value.startsWith("http") && !value.startsWith("/")) {
            this.setNestedValue(fixed, error.path, `/${value}`);
            hasFixedSomething = true;
          }
        }
      }
      
      // Trim strings that are too long
      if (error.type === "maxLength") {
        const value = this.getNestedValue(props, error.path);
        if (typeof value === "string") {
          const match = error.message?.match(/at most (\d+)/);
          if (match) {
            const maxLength = parseInt(match[1]);
            this.setNestedValue(fixed, error.path, value.substring(0, maxLength));
            hasFixedSomething = true;
          }
        }
      }
    });
    
    return {
      success: hasFixedSomething,
      props: hasFixedSomething ? fixed : undefined,
    };
  }
  
  /**
   * Get suggestion for fixing an error
   */
  private getSuggestion(errorType: string, path: string | string[]): string | undefined {
    const pathStr = Array.isArray(path) ? path.join(".") : path;
    
    const suggestions: Record<string, string> = {
      required: `Add a value for ${pathStr}`,
      type: `Check the data type for ${pathStr}`,
      format: `Ensure ${pathStr} matches the expected format`,
      minLength: `Make ${pathStr} longer`,
      maxLength: `Shorten ${pathStr}`,
      minimum: `Increase the value of ${pathStr}`,
      maximum: `Decrease the value of ${pathStr}`,
      pattern: `Adjust ${pathStr} to match the required pattern`,
      enum: `Choose a valid option for ${pathStr}`,
    };
    
    return suggestions[errorType];
  }
  
  /**
   * Get default value for a field
   */
  private getDefaultValue(path: string, definition?: ComponentDefinition): any {
    if (!definition?.templates?.default) return undefined;
    
    return this.getNestedValue(definition.templates.default, path);
  }
  
  /**
   * Get expected type for a field
   */
  private getExpectedType(path: string, definition?: ComponentDefinition): string | undefined {
    if (!definition?.schema?.properties) return undefined;
    
    const pathParts = path.split(".");
    let current: any = definition.schema.properties;
    
    for (const part of pathParts) {
      if (!current[part]) return undefined;
      
      if (current[part].type) {
        if (pathParts[pathParts.length - 1] === part) {
          return current[part].type;
        }
      }
      
      current = current[part].properties || current[part].items?.properties || {};
    }
    
    return undefined;
  }
  
  /**
   * Get nested value from object
   */
  private getNestedValue(obj: any, path: string): any {
    const parts = path.split(".");
    let current = obj;
    
    for (const part of parts) {
      if (current?.[part] === undefined) return undefined;
      current = current[part];
    }
    
    return current;
  }
  
  /**
   * Set nested value in object
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const parts = path.split(".");
    let current = obj;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    current[parts[parts.length - 1]] = value;
  }
}

/**
 * Singleton validator instance
 */
export const componentValidator = new ComponentValidator();