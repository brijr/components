"use client";

import { useState } from "react";
import { ValidatedPageRenderer } from "@/lib/page-renderer-validated";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { heroMinimalDefinition } from "@/lib/schemas/component-schemas/definitions/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ValidationError, ValidationWarning } from "@/lib/schemas/component-schemas/types";
import { CheckCircle, AlertCircle, XCircle, Code, Eye, Wand2 } from "lucide-react";

/**
 * Schema Validation Demo Page
 */
export default function SchemaDemo() {
  const [selectedExample, setSelectedExample] = useState<"valid" | "invalid" | "auto-fixed">("valid");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<ValidationWarning[]>([]);
  
  // Example pages with different validation states
  const examples = {
    valid: {
      id: "valid-example",
      title: "Valid Hero Example",
      slug: "valid-hero",
      sections: [
        {
          id: "hero-1",
          componentSlug: "hero-minimal",
          props: {
            headline: "Build Amazing Products with Our Platform",
            subheadline: "Everything you need to turn your ideas into reality",
            primaryCTA: {
              text: "Start Free Trial",
              href: "/signup"
            },
            secondaryCTA: {
              text: "Watch Demo",
              href: "/demo"
            }
          },
          order: 0,
          visible: true
        }
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "manual" as const,
        version: 1
      }
    },
    invalid: {
      id: "invalid-example",
      title: "Invalid Hero Example",
      slug: "invalid-hero",
      sections: [
        {
          id: "hero-2",
          componentSlug: "hero-minimal",
          props: {
            // Missing required headline
            subheadline: "This will trigger validation errors because the headline is missing and the CTA href is invalid",
            primaryCTA: {
              text: "Click here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", // Too long
              href: "not-a-valid-url" // Invalid URL format
            },
            secondaryCTA: {
              text: "", // Empty text
              href: "/valid"
            }
          },
          order: 0,
          visible: true
        }
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "manual" as const,
        version: 1
      }
    },
    "auto-fixed": {
      id: "auto-fixed-example",
      title: "Auto-Fixed Hero Example",
      slug: "auto-fixed-hero",
      sections: [
        {
          id: "hero-3",
          componentSlug: "hero-minimal",
          props: {
            headline: "Hi", // Too short - will get warning
            subheadline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.", // Too long - will be trimmed
            primaryCTA: {
              text: "CLICK ME NOW", // All caps - will get warning
              href: "signup" // Missing slash - will be auto-fixed
            }
          },
          order: 0,
          visible: true
        }
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "manual" as const,
        version: 1
      }
    }
  };
  
  const currentPage = examples[selectedExample] as SimplePage;
  
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">JSON Schema Validation Demo</h1>
        <p className="text-lg text-muted-foreground">
          See how our AI-optimized component system validates and auto-fixes props in real-time
        </p>
      </div>
      
      {/* Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Example</CardTitle>
          <CardDescription>Choose different validation scenarios to test</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={selectedExample === "valid" ? "default" : "outline"}
              onClick={() => {
                setSelectedExample("valid");
                setValidationErrors([]);
                setValidationWarnings([]);
              }}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Valid Props
            </Button>
            <Button
              variant={selectedExample === "invalid" ? "default" : "outline"}
              onClick={() => {
                setSelectedExample("invalid");
                setValidationErrors([]);
                setValidationWarnings([]);
              }}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Invalid Props
            </Button>
            <Button
              variant={selectedExample === "auto-fixed" ? "default" : "outline"}
              onClick={() => {
                setSelectedExample("auto-fixed");
                setValidationErrors([]);
                setValidationWarnings([]);
              }}
              className="gap-2"
            >
              <Wand2 className="h-4 w-4" />
              Auto-Fixed Props
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Schema & Props */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Definition</CardTitle>
              <CardDescription>AI hints and validation rules</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="schema">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                  <TabsTrigger value="ai-hints">AI Hints</TabsTrigger>
                </TabsList>
                
                <TabsContent value="schema" className="mt-4">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{JSON.stringify(heroMinimalDefinition.schema, null, 2)}</code>
                  </pre>
                </TabsContent>
                
                <TabsContent value="props" className="mt-4">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                    <code>{JSON.stringify(currentPage.sections[0].props, null, 2)}</code>
                  </pre>
                </TabsContent>
                
                <TabsContent value="ai-hints" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Purpose</h4>
                      <p className="text-sm text-muted-foreground">
                        {heroMinimalDefinition.aiHints.purpose}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">When to Use</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {heroMinimalDefinition.aiHints.whenToUse.map((use, i) => (
                          <li key={i}>• {use}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Common Patterns</h4>
                      <div className="flex flex-wrap gap-2">
                        {heroMinimalDefinition.aiHints.commonPatterns.map((pattern, i) => (
                          <Badge key={i} variant="secondary">{pattern}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Validation Results */}
          <Card>
            <CardHeader>
              <CardTitle>Validation Results</CardTitle>
              <CardDescription>
                {validationErrors.length === 0 && validationWarnings.length === 0
                  ? "No validation issues detected"
                  : `${validationErrors.length} errors, ${validationWarnings.length} warnings`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {validationErrors.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Errors
                  </h4>
                  <ul className="space-y-2">
                    {validationErrors.map((error, i) => (
                      <li key={i} className="text-sm bg-red-50 text-red-700 p-2 rounded">
                        <span className="font-medium">{error.path}:</span> {error.message}
                        {error.suggestion && (
                          <div className="text-xs mt-1 opacity-75">
                            💡 {error.suggestion}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationWarnings.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Warnings
                  </h4>
                  <ul className="space-y-2">
                    {validationWarnings.map((warning, i) => (
                      <li key={i} className="text-sm bg-yellow-50 text-yellow-700 p-2 rounded">
                        <span className="font-medium">{warning.path}:</span> {warning.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationErrors.length === 0 && validationWarnings.length === 0 && (
                <div className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>All validations passed successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Preview */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Component Preview</CardTitle>
              <CardDescription>Live preview with validation overlay</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <ValidatedPageRenderer
                  schema={currentPage}
                  mode="preview"
                  device="desktop"
                  enableValidation={true}
                  onValidationError={setValidationErrors}
                  onValidationWarning={setValidationWarnings}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Info Box */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Code className="h-4 w-4" />
                Schema Validation
              </div>
              <p className="text-sm text-muted-foreground">
                Components are validated against JSON schemas generated from TypeScript interfaces, ensuring type safety and data integrity.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Wand2 className="h-4 w-4" />
                Auto-Fix System
              </div>
              <p className="text-sm text-muted-foreground">
                Common errors like missing slashes in URLs or strings that are too long are automatically fixed, reducing AI generation failures.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Eye className="h-4 w-4" />
                Real-time Feedback
              </div>
              <p className="text-sm text-muted-foreground">
                Validation happens in real-time during preview, showing errors and warnings inline with suggestions for fixes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}