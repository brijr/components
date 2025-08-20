"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { 
  getAllCategories,
  getComponentsByCategory,
  getComponentDefinition 
} from "@/lib/schemas/component-schemas";
import { ValidatedPageRenderer } from "@/lib/page-renderer-validated";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { 
  Sparkles, 
  Wand2, 
  RefreshCw, 
  Download, 
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Building2,
  Palette,
  Users,
  MessageSquare,
  Settings,
  BarChart,
  Clock
} from "lucide-react";

export default function AIGeneratorPage() {
  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>("hero");
  const [selectedComponent, setSelectedComponent] = useState<string>("hero-minimal");
  const [companyName, setCompanyName] = useState("TechFlow");
  const [industry, setIndustry] = useState("saas");
  const [tone, setTone] = useState<string>("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [keywords, setKeywords] = useState("");
  
  // Options
  const [useCache, setUseCache] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProps, setGeneratedProps] = useState<any>(null);
  const [generationResponse, setGenerationResponse] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  
  const categories = getAllCategories();
  const componentsInCategory = getComponentsByCategory(selectedCategory as any);
  const currentDefinition = getComponentDefinition(selectedComponent);
  
  // Generate component
  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          componentSlug: selectedComponent,
          context: {
            companyName,
            industry,
            tone,
            targetAudience: targetAudience || undefined,
            additionalContext: additionalContext || undefined,
            keywords: keywords ? keywords.split(",").map(k => k.trim()) : undefined,
          },
          options: {
            useCache,
            temperature,
          },
        }),
      });
      
      const data = await response.json();
      setGenerationResponse(data);
      
      if (data.success) {
        setGeneratedProps(data.props);
        toast.success(
          `Generated with ${data.metadata?.generatedBy === "claude" ? "Claude AI" : "Template System"}`,
          {
            description: `Took ${data.metadata?.generationTime}ms`,
          }
        );
      } else {
        toast.error("Generation failed", {
          description: data.error || "Unknown error",
        });
      }
    } catch (error) {
      toast.error("Failed to generate", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Fetch metrics
  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/generate-component");
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };
  
  // Copy JSON to clipboard
  const copyJSON = () => {
    if (generatedProps) {
      navigator.clipboard.writeText(JSON.stringify(generatedProps, null, 2));
      toast.success("Copied to clipboard!");
    }
  };
  
  // Create preview page
  const createPreviewPage = (): SimplePage | null => {
    if (!generatedProps) return null;
    
    return {
      id: "ai-generated",
      title: "AI Generated Component",
      slug: "ai-generated",
      sections: [
        {
          id: "section-1",
          componentSlug: selectedComponent,
          props: generatedProps,
          order: 0,
          visible: true,
        },
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "ai" as const,
        version: 1,
      },
    };
  };
  
  const previewPage = createPreviewPage();
  
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">AI Component Generator</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Generate component content using Claude AI with schema validation
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Component Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Component</CardTitle>
              <CardDescription>Select component to generate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={(val) => {
                  setSelectedCategory(val);
                  const first = getComponentsByCategory(val as any)[0];
                  if (first) setSelectedComponent(first.slug);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Component</Label>
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
            </CardContent>
          </Card>
          
          {/* Context */}
          <Card>
            <CardHeader>
              <CardTitle>Context</CardTitle>
              <CardDescription>Provide generation context</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Name *</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., TechFlow"
                />
              </div>
              
              <div>
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Target Audience</Label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., developers, marketers"
                />
              </div>
              
              <div>
                <Label>Additional Context</Label>
                <Textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Any specific details about your product/service..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Keywords (comma-separated)</Label>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., AI, automation, productivity"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="cache">Use Cache</Label>
                <Switch
                  id="cache"
                  checked={useCache}
                  onCheckedChange={setUseCache}
                />
              </div>
              
              <div>
                <Label>Temperature: {temperature}</Label>
                <Slider
                  value={[temperature]}
                  onValueChange={([val]) => setTemperature(val)}
                  min={0}
                  max={1}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower = more predictable, Higher = more creative
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !companyName}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate with AI
              </>
            )}
          </Button>
        </div>
        
        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          {previewPage && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Component</CardTitle>
                    <CardDescription>
                      {generationResponse?.metadata?.generatedBy === "claude" ? (
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Generated with Claude AI
                        </span>
                      ) : generationResponse?.metadata?.generatedBy === "cache" ? (
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Retrieved from cache
                        </span>
                      ) : (
                        <span>Generated with template system</span>
                      )}
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline" onClick={copyJSON}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  <ValidatedPageRenderer
                    schema={previewPage}
                    mode="preview"
                    device="desktop"
                    enableValidation={true}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Generation Response */}
          {generationResponse && (
            <Card>
              <CardHeader>
                <CardTitle>Generation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="props">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="props">Props</TabsTrigger>
                    <TabsTrigger value="validation">Validation</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="props" className="mt-4">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                      <code>{JSON.stringify(generatedProps, null, 2)}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="validation" className="mt-4">
                    {generationResponse.validation ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {generationResponse.validation.valid ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="font-medium">Validation Passed</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-red-500" />
                              <span className="font-medium">Validation Failed</span>
                            </>
                          )}
                        </div>
                        
                        {generationResponse.validation.errors?.map((error: any, i: number) => (
                          <div key={i} className="text-sm bg-red-50 text-red-700 p-2 rounded">
                            <span className="font-medium">{error.path}:</span> {error.message}
                          </div>
                        ))}
                        
                        {generationResponse.validation.warnings?.map((warning: any, i: number) => (
                          <div key={i} className="text-sm bg-yellow-50 text-yellow-700 p-2 rounded">
                            <span className="font-medium">{warning.path}:</span> {warning.message}
                          </div>
                        ))}
                        
                        {generationResponse.validation.fixedProps && (
                          <div className="text-sm bg-blue-50 text-blue-700 p-2 rounded">
                            Props were auto-fixed during validation
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No validation data</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="metadata" className="mt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Generated By:</span>
                        <Badge>{generationResponse.metadata?.generatedBy}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Generation Time:</span>
                        <span className="text-sm">{generationResponse.metadata?.generationTime}ms</span>
                      </div>
                      {generationResponse.metadata?.model && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Model:</span>
                          <span className="text-sm">{generationResponse.metadata.model}</span>
                        </div>
                      )}
                      {generationResponse.metadata?.cached && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">From Cache:</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          {/* API Info */}
          {!generatedProps && (
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <Settings className="h-4 w-4" />
                      Configure
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Select component and provide context about your company
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI creates content matching your context and tone
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle className="h-4 w-4" />
                      Validate
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Props are validated and auto-fixed if needed
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <Button variant="outline" size="sm" onClick={fetchMetrics}>
                    <BarChart className="mr-2 h-4 w-4" />
                    View Metrics
                  </Button>
                  
                  {metrics && (
                    <div className="mt-4 grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Generations:</span>
                        <span className="font-medium">{metrics.metrics?.totalGenerations || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium">
                          {metrics.metrics?.totalGenerations 
                            ? Math.round((metrics.metrics.successfulGenerations / metrics.metrics.totalGenerations) * 100)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cache Hits:</span>
                        <span className="font-medium">{metrics.metrics?.cacheHits || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Anthropic Configured:</span>
                        {metrics.anthropicConfigured ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}