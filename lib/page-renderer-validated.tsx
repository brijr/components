"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Page, ComponentInstance } from "./schemas/page.schema";
import { SimplePage } from "./schemas/page-simple.schema";
import { registry } from "@/registry";
import { ComponentWrapper } from "@/components/component-wrapper";
import { componentValidator } from "./schemas/component-schemas/validator";
import { ValidationResult, ValidationError, ValidationWarning } from "./schemas/component-schemas/types";
import { getComponentDefinition } from "./schemas/component-schemas";

interface PageRendererProps {
  schema: Page | SimplePage;
  mode?: "preview" | "production";
  device?: "mobile" | "tablet" | "desktop";
  enableValidation?: boolean;
  onValidationError?: (errors: ValidationError[]) => void;
  onValidationWarning?: (warnings: ValidationWarning[]) => void;
}

interface ValidationStatus {
  sectionId: string;
  componentSlug: string;
  result: ValidationResult;
}

/**
 * Component loader with validation and error boundary
 */
const ValidatedComponentLoader = ({ 
  section, 
  mode,
  enableValidation,
  onValidation
}: { 
  section: ComponentInstance; 
  mode: string;
  enableValidation?: boolean;
  onValidation?: (result: ValidationResult) => void;
}) => {
  const [validatedProps, setValidatedProps] = useState(section.props);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  
  useEffect(() => {
    if (enableValidation) {
      // Get component definition
      const definition = getComponentDefinition(section.componentSlug);
      
      // Validate props
      const result = componentValidator.validateProps(
        section.componentSlug,
        section.props,
        definition
      );
      
      setValidationResult(result);
      
      // Use fixed props if available
      if (result.fixedProps) {
        setValidatedProps(result.fixedProps);
      }
      
      // Notify parent of validation result
      if (onValidation) {
        onValidation(result);
      }
    }
  }, [section.componentSlug, section.props, enableValidation, onValidation]);
  
  const component = registry.find((r) => r.slug === section.componentSlug);
  
  if (!component) {
    if (mode === "preview") {
      return (
        <div className="border-2 border-dashed border-red-300 bg-red-50 p-8 text-center">
          <p className="text-red-600 font-semibold">Component not found: {section.componentSlug}</p>
          <p className="text-red-500 text-sm mt-2">Please check that the component is registered</p>
        </div>
      );
    }
    return null;
  }

  // Show validation errors in preview mode
  if (mode === "preview" && validationResult && !validationResult.valid) {
    return (
      <div className="relative">
        <div className="absolute top-0 right-0 z-10 m-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg">
            <p className="font-semibold text-sm">Validation Errors:</p>
            <ul className="text-xs mt-1 space-y-1">
              {validationResult.errors?.slice(0, 3).map((error, i) => (
                <li key={i}>• {error.path}: {error.message}</li>
              ))}
              {validationResult.errors && validationResult.errors.length > 3 && (
                <li>• ...and {validationResult.errors.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>
        <div className="opacity-75">
          <ComponentWrapper name={component.name} filePath={component.filePath}>
            <component.Component {...validatedProps} />
          </ComponentWrapper>
        </div>
      </div>
    );
  }

  // Show validation warnings in preview mode
  if (mode === "preview" && validationResult?.warnings && validationResult.warnings.length > 0) {
    return (
      <div className="relative">
        <div className="absolute top-0 right-0 z-10 m-4">
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg shadow-lg">
            <p className="font-semibold text-sm">Warnings:</p>
            <ul className="text-xs mt-1 space-y-1">
              {validationResult.warnings.slice(0, 3).map((warning, i) => (
                <li key={i}>• {warning.path}: {warning.message}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <ComponentWrapper name={component.name} filePath={component.filePath}>
            <component.Component {...validatedProps} />
          </ComponentWrapper>
        </div>
      </div>
    );
  }

  return (
    <div id={section.id} data-component={section.componentSlug}>
      {mode === "preview" ? (
        <ComponentWrapper name={component.name} filePath={component.filePath}>
          <component.Component {...validatedProps} />
        </ComponentWrapper>
      ) : (
        <component.Component {...validatedProps} />
      )}
    </div>
  );
};

/**
 * Enhanced page renderer with validation
 */
export const ValidatedPageRenderer = ({ 
  schema, 
  mode = "production", 
  device = "desktop",
  enableValidation = true,
  onValidationError,
  onValidationWarning
}: PageRendererProps) => {
  const [validationStatuses, setValidationStatuses] = useState<ValidationStatus[]>([]);
  
  // Sort sections by order
  const sortedSections = [...schema.sections].sort((a, b) => a.order - b.order);

  // Device-specific classes
  const deviceClasses = {
    mobile: "max-w-sm mx-auto",
    tablet: "max-w-2xl mx-auto",
    desktop: "w-full",
  };

  // Handle validation results
  const handleValidation = (sectionId: string, componentSlug: string) => (result: ValidationResult) => {
    const status: ValidationStatus = { sectionId, componentSlug, result };
    
    setValidationStatuses(prev => {
      const filtered = prev.filter(s => s.sectionId !== sectionId);
      return [...filtered, status];
    });
    
    // Notify parent of errors/warnings
    if (result.errors && onValidationError) {
      onValidationError(result.errors);
    }
    if (result.warnings && onValidationWarning) {
      onValidationWarning(result.warnings);
    }
  };

  // Calculate overall validation status
  const hasErrors = validationStatuses.some(s => !s.result.valid);
  const hasWarnings = validationStatuses.some(s => s.result.warnings && s.result.warnings.length > 0);
  const totalErrors = validationStatuses.reduce((sum, s) => sum + (s.result.errors?.length || 0), 0);
  const totalWarnings = validationStatuses.reduce((sum, s) => sum + (s.result.warnings?.length || 0), 0);

  return (
    <div 
      className={`page-renderer ${deviceClasses[device]}`}
      data-page-id={schema.id}
      data-page-slug={schema.slug}
    >
      {mode === "preview" && (
        <div className="bg-blue-50 border-b border-blue-200 p-2 text-center text-sm sticky top-0 z-20">
          <div className="flex items-center justify-center gap-4">
            <span className="text-blue-700">
              Preview Mode - {device.charAt(0).toUpperCase() + device.slice(1)} View
            </span>
            {enableValidation && (
              <>
                {hasErrors && (
                  <span className="text-red-600 font-semibold">
                    ⚠️ {totalErrors} validation error{totalErrors !== 1 ? 's' : ''}
                  </span>
                )}
                {!hasErrors && hasWarnings && (
                  <span className="text-yellow-600">
                    ⚡ {totalWarnings} warning{totalWarnings !== 1 ? 's' : ''}
                  </span>
                )}
                {!hasErrors && !hasWarnings && validationStatuses.length > 0 && (
                  <span className="text-green-600">
                    ✓ All validations passed
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {sortedSections.map((section) => (
        <Suspense 
          key={section.id}
          fallback={
            <div className="animate-pulse bg-gray-100 h-64 flex items-center justify-center">
              <span className="text-gray-400">Loading component...</span>
            </div>
          }
        >
          <ValidatedComponentLoader 
            section={section} 
            mode={mode}
            enableValidation={enableValidation}
            onValidation={handleValidation(section.id, section.componentSlug)}
          />
        </Suspense>
      ))}
      
      {mode === "preview" && enableValidation && validationStatuses.length > 0 && (
        <div className="fixed bottom-4 right-4 z-30">
          <details className="bg-white border rounded-lg shadow-lg p-4 max-w-md">
            <summary className="cursor-pointer font-semibold text-sm">
              Validation Report ({totalErrors + totalWarnings} issues)
            </summary>
            <div className="mt-3 max-h-60 overflow-y-auto">
              {validationStatuses.map(status => (
                <div key={status.sectionId} className="mb-3 text-xs">
                  <p className="font-medium">{status.componentSlug}:</p>
                  {status.result.errors && (
                    <ul className="text-red-600 ml-4 mt-1">
                      {status.result.errors.map((e, i) => (
                        <li key={i}>• {e.path}: {e.message}</li>
                      ))}
                    </ul>
                  )}
                  {status.result.warnings && (
                    <ul className="text-yellow-600 ml-4 mt-1">
                      {status.result.warnings.map((w, i) => (
                        <li key={i}>• {w.path}: {w.message}</li>
                      ))}
                    </ul>
                  )}
                  {!status.result.errors && !status.result.warnings && (
                    <p className="text-green-600 ml-4">✓ Valid</p>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};