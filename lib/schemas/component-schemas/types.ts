import { z } from "zod";
import { JSONSchema7 } from "json-schema";

/**
 * Unified Component Definition for AI-optimized generation
 */
export interface ComponentDefinition {
  // Metadata
  slug: string;
  name: string;
  category: "hero" | "feature" | "pricing" | "testimonial" | "cta" | "footer";
  description: string;
  
  // Schema Definition
  schema: JSONSchema7;  // Strict JSON Schema for props validation
  zodSchema?: z.ZodSchema;  // Optional Zod schema for runtime validation
  
  // AI Generation Hints
  aiHints: {
    purpose: string;  // What this component is for
    whenToUse: string[];  // Scenarios where this component fits
    commonPatterns: string[];  // Common content patterns
    industryVariations?: Record<string, Partial<any>>;  // Industry-specific defaults
    toneVariations?: Record<string, Partial<any>>;  // Tone-specific adjustments
  };
  
  // Content Templates
  templates: {
    default: any;  // Default props
    minimal?: Partial<any>;  // Minimal viable props
    full?: any;  // All props filled
    variations?: Record<string, any>;  // Named variations
  };
  
  // Validation Rules
  validation?: {
    required: string[];  // Required fields
    conditional?: ConditionalRule[];  // Conditional requirements
    constraints?: ConstraintRule[];  // Additional constraints
  };
  
  // Composition Rules
  composition?: {
    compatible: string[];  // Works well with these components
    sequence?: {
      prefersBefore?: string[];
      prefersAfter?: string[];
      neverBefore?: string[];
      neverAfter?: string[];
    };
    contentFlow?: {
      sharesPropsWith?: string[];  // Can share content with
      inheritsPropsFrom?: string[];  // Can inherit from
    };
  };
}

/**
 * Conditional validation rule
 */
export interface ConditionalRule {
  if: {
    prop: string;
    condition: "exists" | "equals" | "contains" | "matches";
    value?: any;
  };
  then: {
    required?: string[];
    forbidden?: string[];
    constraints?: ConstraintRule[];
  };
}

/**
 * Constraint validation rule
 */
export interface ConstraintRule {
  prop: string;
  type: "minLength" | "maxLength" | "pattern" | "enum" | "custom";
  value: any;
  message?: string;
}

/**
 * Generation context for AI
 */
export interface GenerationContext {
  companyName: string;
  industry?: string;
  tone?: "professional" | "casual" | "playful" | "serious" | "bold" | "minimal";
  targetAudience?: string;
  style?: string;
  keywords?: string[];
  existingSections?: Array<{
    slug: string;
    props: any;
  }>;
}

/**
 * Semantic prop definition for better AI understanding
 */
export enum PropIntent {
  HEADLINE = "headline",          // Main message
  SUPPORTING_TEXT = "supporting", // Secondary message
  ACTION = "action",              // CTA/Button
  VISUAL = "visual",              // Image/Video
  DATA = "data",                  // Lists/Features
  METADATA = "metadata",          // SEO/Analytics
  LAYOUT = "layout",              // Layout control
  STYLE = "style"                 // Styling options
}

/**
 * Semantic prop with intent and context
 */
export interface SemanticProp {
  intent: PropIntent;
  value: any;
  variants?: {
    mobile?: any;
    tablet?: any;
    desktop?: any;
  };
  aiContext?: {
    importance: "critical" | "high" | "medium" | "low";
    canGenerate: boolean;
    generationHints?: string[];
    examples?: any[];
  };
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
  warnings?: ValidationWarning[];
  fixedProps?: any;
}

export interface ValidationError {
  path: string;
  message: string;
  type: string;
  suggestion?: string;
}

export interface ValidationWarning {
  path: string;
  message: string;
  type: string;
}

/**
 * Component registry entry with full definition
 */
export interface ComponentRegistryEntry {
  Component: React.ComponentType<any>;
  definition: ComponentDefinition;
  filePath: string;
}