"use client";

import React, { Suspense } from "react";
import { Page, ComponentInstance } from "./schemas/page.schema";
import { registry } from "@/registry";
import { ComponentWrapper } from "@/components/component-wrapper";

interface PageRendererProps {
  schema: Page;
  mode?: "preview" | "production";
  device?: "mobile" | "tablet" | "desktop";
}

/**
 * Component loader with error boundary
 */
const ComponentLoader = ({ section, mode }: { section: ComponentInstance; mode: string }) => {
  const component = registry.find((r) => r.slug === section.componentSlug);
  
  if (!component) {
    if (mode === "preview") {
      return (
        <div className="border-2 border-dashed border-red-300 bg-red-50 p-8 text-center">
          <p className="text-red-600">Component not found: {section.componentSlug}</p>
        </div>
      );
    }
    return null;
  }

  // Get props, potentially with responsive variants
  const props = section.props;

  return (
    <div id={section.id} data-component={section.componentSlug}>
      {mode === "preview" ? (
        <ComponentWrapper name={component.name} filePath={component.filePath}>
          <component.Component {...props} />
        </ComponentWrapper>
      ) : (
        <component.Component {...props} />
      )}
    </div>
  );
};

/**
 * Dynamic page renderer that takes a JSON schema and renders components
 */
export const PageRenderer = ({ schema, mode = "production", device = "desktop" }: PageRendererProps) => {
  // Sort sections by order
  const sortedSections = [...schema.sections].sort((a, b) => a.order - b.order);

  // Device-specific classes
  const deviceClasses = {
    mobile: "max-w-sm mx-auto",
    tablet: "max-w-2xl mx-auto",
    desktop: "w-full",
  };

  return (
    <div 
      className={`page-renderer ${deviceClasses[device]}`}
      data-page-id={schema.id}
      data-page-slug={schema.slug}
    >
      {mode === "preview" && (
        <div className="bg-blue-50 border-b border-blue-200 p-2 text-center text-sm">
          <span className="text-blue-700">
            Preview Mode - {device.charAt(0).toUpperCase() + device.slice(1)} View
          </span>
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
          <ComponentLoader section={section} mode={mode} />
        </Suspense>
      ))}
      
      {sortedSections.length === 0 && mode === "preview" && (
        <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No components added yet</p>
            <p className="text-gray-400 text-sm">Add components to start building your page</p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Error boundary for component rendering
 */
export class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <p className="text-red-600">Something went wrong rendering this component</p>
            {process.env.NODE_ENV === "development" && (
              <pre className="text-xs mt-2 text-red-500">{this.state.error?.message}</pre>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}