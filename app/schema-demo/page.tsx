"use client";

import { useState } from "react";
import { ValidatedPageRenderer } from "@/lib/page-renderer-validated";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { 
  getComponentDefinition, 
  getAllCategories,
  getComponentsByCategory,
  componentLibraryStats 
} from "@/lib/schemas/component-schemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ValidationError, ValidationWarning } from "@/lib/schemas/component-schemas/types";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Code, 
  Eye, 
  Wand2,
  Layers,
  Zap,
  Shield,
  Package
} from "lucide-react";

/**
 * Schema Validation Demo Page - Now with all components
 */
export default function SchemaDemo() {
  const [selectedCategory, setSelectedCategory] = useState<string>("hero");
  const [selectedComponent, setSelectedComponent] = useState<string>("hero-minimal");
  const [validationMode, setValidationMode] = useState<"valid" | "invalid" | "auto-fixed">("valid");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<ValidationWarning[]>([]);
  
  const categories = getAllCategories();
  const componentsInCategory = getComponentsByCategory(selectedCategory as any);
  const currentDefinition = getComponentDefinition(selectedComponent);
  
  // Generate example pages for different validation states
  const generateExamplePage = (): SimplePage => {
    const baseProps = currentDefinition?.templates?.default || {};
    
    let props = { ...baseProps };
    
    if (validationMode === "invalid") {
      // Intentionally break props
      if (selectedComponent === "hero-minimal") {
        props = {
          subheadline: "Missing required headline",
          primaryCTA: { text: "x".repeat(50), href: "invalid" }
        };
      } else if (selectedComponent === "feature-three-cards") {
        props = {
          features: [] // Empty array when features required
        };
      } else if (selectedComponent === "pricing-toggle") {
        props = {
          plans: [
            { 
              name: "", // Empty name
              monthlyPrice: -10, // Negative price
              features: [],
              cta: { text: "", href: "" }
            }
          ]
        };
      }
    } else if (validationMode === "auto-fixed") {
      // Props that will be auto-fixed
      if (selectedComponent === "hero-minimal") {
        props = {
          headline: "Hi", // Too short
          subheadline: "x".repeat(250), // Too long - will be trimmed
          primaryCTA: { text: "CLICK HERE", href: "signup" } // Missing slash
        };
      } else if (selectedComponent === "feature-three-cards") {
        props = {
          ...baseProps,
          headline: "FEATURES IN ALL CAPS", // Will get warning
          features: baseProps.features?.map((f: any) => ({
            ...f,
            description: "Lorem ipsum placeholder text" // Placeholder warning
          }))
        };
      }
    }
    
    return {
      id: `demo-${validationMode}`,
      title: `${currentDefinition?.name} Demo`,
      slug: `demo-${selectedComponent}`,
      sections: [
        {
          id: "section-1",
          componentSlug: selectedComponent,
          props,
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
    };
  };
  
  const currentPage = generateExamplePage();
  
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-4xl font-bold">AI-Ready Component Library</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {componentLibraryStats.totalComponents} Components
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Every component has JSON schemas, AI hints, and validation rules for reliable generation
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-medium">Total Components</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{componentLibraryStats.totalComponents}</div>
            <p className="text-xs text-muted-foreground">Across {componentLibraryStats.categories} categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <CardTitle className="text-sm font-medium">AI Optimized</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Full schema coverage</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm font-medium">Validation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Multi-layer</div>
            <p className="text-xs text-muted-foreground">Schema + business rules</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-500" />
              <CardTitle className="text-sm font-medium">Templates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3-5</div>
            <p className="text-xs text-muted-foreground">Per component</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Component Explorer */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Controls & Schema */}
        <div className="lg:col-span-1 space-y-6">
          {/* Component Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Component</CardTitle>
              <CardDescription>Choose a component to explore</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={(val) => {
                  setSelectedCategory(val);
                  const firstInCategory = getComponentsByCategory(val as any)[0];
                  if (firstInCategory) {
                    setSelectedComponent(firstInCategory.slug);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)} ({getComponentsByCategory(cat).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Component</label>
                <Select value={selectedComponent} onValueChange={setSelectedComponent}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsInCategory.map(comp => (
                      <SelectItem key={comp.slug} value={comp.slug}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <label className="text-sm font-medium mb-2 block">Validation Mode</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={validationMode === "valid" ? "default" : "outline"}
                    onClick={() => setValidationMode("valid")}
                    className="flex-1"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Valid
                  </Button>
                  <Button
                    size="sm"
                    variant={validationMode === "invalid" ? "default" : "outline"}
                    onClick={() => setValidationMode("invalid")}
                    className="flex-1"
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Invalid
                  </Button>
                  <Button
                    size="sm"
                    variant={validationMode === "auto-fixed" ? "default" : "outline"}
                    onClick={() => setValidationMode("auto-fixed")}
                    className="flex-1"
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Auto-Fix
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Component Info */}
          <Card>
            <CardHeader>
              <CardTitle>{currentDefinition?.name}</CardTitle>
              <CardDescription>{currentDefinition?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ai-hints">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ai-hints">AI Hints</TabsTrigger>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ai-hints" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Purpose</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentDefinition?.aiHints.purpose}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">When to Use</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {currentDefinition?.aiHints.whenToUse.slice(0, 3).map((use, i) => (
                        <li key={i}>• {use}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Patterns</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentDefinition?.aiHints.commonPatterns.slice(0, 3).map((pattern, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {pattern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schema" className="mt-4">
                  <div className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
                      <code>
                        {JSON.stringify(
                          currentDefinition?.schema?.properties || {},
                          null,
                          2
                        ).slice(0, 500)}...
                      </code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Validation Results */}
          {(validationErrors.length > 0 || validationWarnings.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Validation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {validationErrors.map((error, i) => (
                  <div key={i} className="text-xs bg-red-50 text-red-700 p-2 rounded">
                    <span className="font-medium">{error.path}:</span> {error.message}
                  </div>
                ))}
                {validationWarnings.map((warning, i) => (
                  <div key={i} className="text-xs bg-yellow-50 text-yellow-700 p-2 rounded">
                    <span className="font-medium">{warning.path}:</span> {warning.message}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Preview */}
        <div className="lg:col-span-2">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>
                    {validationMode === "valid" && "Valid props example"}
                    {validationMode === "invalid" && "Showing validation errors"}
                    {validationMode === "auto-fixed" && "Auto-fixing in action"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {validationErrors.length === 0 && validationWarnings.length === 0 && (
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Valid
                    </Badge>
                  )}
                  {validationErrors.length > 0 && (
                    <Badge variant="outline" className="text-red-600">
                      <XCircle className="h-3 w-3 mr-1" />
                      {validationErrors.length} Errors
                    </Badge>
                  )}
                  {validationWarnings.length > 0 && (
                    <Badge variant="outline" className="text-yellow-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {validationWarnings.length} Warnings
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t max-h-[600px] overflow-auto">
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
    </div>
  );
}