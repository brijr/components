"use client";

import { useState, useCallback } from "react";
import { PageRenderer } from "@/lib/page-renderer";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { registry } from "@/registry";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Wand2, 
  Copy, 
  Download, 
  Save, 
  RefreshCw, 
  Sparkles,
  Code,
  Eye,
  Settings,
  Zap,
  Layout,
  Type,
  Image,
  DollarSign,
  MessageSquare,
  Navigation
} from "lucide-react";

const componentTypes = [
  { value: "hero", label: "Hero Section", icon: Layout },
  { value: "feature", label: "Features", icon: Zap },
  { value: "pricing", label: "Pricing", icon: DollarSign },
  { value: "testimonial", label: "Testimonials", icon: MessageSquare },
  { value: "cta", label: "Call to Action", icon: Navigation },
  { value: "footer", label: "Footer", icon: Navigation },
  { value: "auto", label: "Auto-detect", icon: Sparkles }
];

const quickPrompts = [
  {
    category: "Hero",
    prompts: [
      "Minimal hero with 'Launch Your SaaS in Days' headline and beta signup",
      "Split hero with product screenshot for project management tool",
      "Video hero showcasing AI-powered analytics platform"
    ]
  },
  {
    category: "Features",
    prompts: [
      "Three-card feature grid for developer tools",
      "Icon list with 6 features for cloud storage service",
      "Alternating media sections for mobile app features"
    ]
  },
  {
    category: "Complete Pages",
    prompts: [
      "Full landing page for AI writing assistant",
      "SaaS pricing page with 3 tiers and FAQ",
      "Product showcase page with hero, features, testimonials, and CTA"
    ]
  }
];

export default function AIPlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [componentType, setComponentType] = useState("auto");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<SimplePage | null>(null);
  const [propsJson, setPropsJson] = useState("");
  const [viewMode, setViewMode] = useState<"preview" | "code" | "props">("preview");

  const generateComponent = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          componentType: componentType === "auto" ? undefined : componentType,
          mode: "component"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate component");
      }

      const data = await response.json();
      setGeneratedPage(data.page);
      setPropsJson(JSON.stringify(data.page.sections[0]?.props || {}, null, 2));
      toast.success("Component generated successfully!");
    } catch (error) {
      toast.error("Failed to generate component. Using fallback example.");
      // Fallback to a default example
      generateFallbackExample();
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackExample = () => {
    // Find a component that matches the type
    const components = registry.filter(r => 
      componentType === "auto" || r.type === componentType
    );
    
    if (components.length === 0) {
      toast.error("No components found for this type");
      return;
    }

    const selectedComponent = components[0];
    
    const examplePage: SimplePage = {
      id: `ai-generated-${Date.now()}`,
      title: "AI Generated Component",
      slug: "ai-generated",
      sections: [{
        id: "section-1",
        componentSlug: selectedComponent.slug,
        props: selectedComponent.props || {},
        order: 0,
        visible: true
      }],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "ai",
        prompt: prompt
      }
    };

    setGeneratedPage(examplePage);
    setPropsJson(JSON.stringify(selectedComponent.props || {}, null, 2));
  };

  const updateProps = () => {
    try {
      const parsed = JSON.parse(propsJson);
      if (generatedPage) {
        const updated = {
          ...generatedPage,
          sections: [{
            ...generatedPage.sections[0],
            props: parsed
          }]
        };
        setGeneratedPage(updated);
        toast.success("Props updated!");
      }
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  const copyCode = () => {
    if (!generatedPage?.sections[0]) return;
    
    const component = registry.find(r => r.slug === generatedPage.sections[0].componentSlug);
    if (!component) return;

    const code = `<${component.name.replace(/\s+/g, '')} {...${JSON.stringify(generatedPage.sections[0].props, null, 2)}} />`;
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const exportComponent = () => {
    if (!generatedPage) return;
    
    const blob = new Blob([JSON.stringify(generatedPage, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `component-${Date.now()}.json`;
    a.click();
    toast.success("Component exported!");
  };

  const saveToBuilder = async () => {
    if (!generatedPage) return;

    try {
      const response = await fetch("/api/pages/simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedPage)
      });

      if (response.ok) {
        toast.success("Saved to page builder!");
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Error saving component");
    }
  };

  const applyQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
    // Auto-detect component type from prompt
    if (quickPrompt.toLowerCase().includes("hero")) {
      setComponentType("hero");
    } else if (quickPrompt.toLowerCase().includes("feature")) {
      setComponentType("feature");
    } else if (quickPrompt.toLowerCase().includes("pricing")) {
      setComponentType("pricing");
    } else if (quickPrompt.toLowerCase().includes("testimonial")) {
      setComponentType("testimonial");
    } else {
      setComponentType("auto");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Component Playground</h1>
              <p className="text-muted-foreground">Generate components with natural language</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="space-y-4">
            {/* Main Input Card */}
            <Card>
              <CardHeader>
                <CardTitle>Component Generator</CardTitle>
                <CardDescription>
                  Describe the component you want to create
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Component Type
                  </label>
                  <Select value={componentType} onValueChange={setComponentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prompt
                  </label>
                  <Textarea
                    placeholder="Create a hero section with a bold headline about revolutionizing productivity, a subheadline about AI-powered tools, and two buttons - 'Start Free Trial' and 'Watch Demo'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={generateComponent} 
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Component
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPrompt("");
                      setGeneratedPage(null);
                      setPropsJson("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickPrompts.map((category) => (
                    <div key={category.category}>
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                        {category.category}
                      </h4>
                      <div className="space-y-2">
                        {category.prompts.map((quickPrompt, i) => (
                          <button
                            key={i}
                            onClick={() => applyQuickPrompt(quickPrompt)}
                            className="w-full text-left p-2 text-sm rounded-lg border hover:bg-accent transition-colors"
                          >
                            {quickPrompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            {generatedPage ? (
              <>
                {/* View Controls */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Component</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={copyCode}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={exportComponent}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={saveToBuilder}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </TabsTrigger>
                        <TabsTrigger value="props">
                          <Settings className="mr-2 h-4 w-4" />
                          Props
                        </TabsTrigger>
                        <TabsTrigger value="code">
                          <Code className="mr-2 h-4 w-4" />
                          Code
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="preview" className="mt-4">
                        <div className="border rounded-lg overflow-hidden bg-background">
                          <PageRenderer 
                            schema={generatedPage} 
                            mode="preview" 
                            device="desktop" 
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="props" className="mt-4">
                        <div className="space-y-4">
                          <Textarea
                            value={propsJson}
                            onChange={(e) => setPropsJson(e.target.value)}
                            rows={15}
                            className="font-mono text-sm"
                          />
                          <Button onClick={updateProps} className="w-full">
                            Apply Changes
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="code" className="mt-4">
                        <pre className="p-4 bg-muted rounded-lg overflow-auto">
                          <code className="text-sm">
                            {generatedPage.sections[0] && (() => {
                              const component = registry.find(r => r.slug === generatedPage.sections[0].componentSlug);
                              return component ? 
                                `import { ${component.name.replace(/\s+/g, '')} } from "@/components/components/${component.type}/${component.slug}";\n\n` +
                                `<${component.name.replace(/\s+/g, '')} \n${Object.entries(generatedPage.sections[0].props)
                                  .map(([key, value]) => `  ${key}=${typeof value === 'string' ? `"${value}"` : `{${JSON.stringify(value)}}`}`)
                                  .join('\n')}\n/>` : 'Component not found';
                            })()}
                          </code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full min-h-[600px] flex items-center justify-center">
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">No component generated yet</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Enter a prompt and click generate to create a component
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}