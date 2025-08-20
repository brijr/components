"use client";

import { useState, useEffect } from "react";
import { PageRenderer } from "@/lib/page-renderer";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { 
  Sparkles,
  Download,
  Save,
  RefreshCw,
  FileText,
  Monitor,
  Tablet,
  Smartphone,
  ArrowRight,
  Brain,
  Zap,
  AlertCircle,
  ChevronDown,
  Wand2,
  Lightbulb,
  Copy,
  Check
} from "lucide-react";

// Example prompts for inspiration
const examplePrompts = [
  {
    title: "SaaS Product",
    prompt: "Create a landing page for DataFlow, an AI-powered analytics platform that helps businesses make data-driven decisions. Include features, pricing, and testimonials.",
    icon: Zap,
  },
  {
    title: "E-commerce",
    prompt: "Build a product page for GreenLeaf, an organic tea shop. Show our premium tea collection, customer reviews, and special offers. Casual and inviting tone.",
    icon: FileText,
  },
  {
    title: "Agency",
    prompt: "Design a professional website for Creative Studios, a digital marketing agency. Highlight our services, portfolio, and client success stories.",
    icon: Wand2,
  },
  {
    title: "Startup",
    prompt: "Launch page for FitTrack, a new fitness app that uses AI to create personalized workout plans. Bold and energetic tone with early access signup.",
    icon: Lightbulb,
  },
];

export default function PageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedPage, setGeneratedPage] = useState<SimplePage | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [extractedContext, setExtractedContext] = useState<any>(null);
  const [generationMetadata, setGenerationMetadata] = useState<any>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [useCache, setUseCache] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [showExtractedContext, setShowExtractedContext] = useState(false);

  const generatePage = async () => {
    if (!prompt.trim() || prompt.length < 10) {
      toast.error("Please describe what kind of page you want (at least 10 characters)");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setExtractedContext(null);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const response = await fetch("/api/generate-page-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          options: {
            useAI,
            useCache,
            temperature,
            autoEnhance,
            showExtractedContext,
          }
        })
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate page");
      }

      const data = await response.json();
      
      if (data.page && data.page.sections && data.page.sections.length > 0) {
        setGeneratedPage(data.page);
        setGenerationMetadata(data.metadata);
        
        if (data.extractedContext) {
          setExtractedContext(data.extractedContext);
        }
        
        const aiSections = data.metadata?.aiSectionsCount || 0;
        const totalSections = data.page.sections.length;
        
        toast.success(
          `Generated ${totalSections} sections from your description!`,
          {
            description: aiSections > 0 
              ? `${aiSections} sections created with AI in ${data.metadata?.duration || 0}ms`
              : `Generated in ${data.metadata?.duration || 0}ms`
          }
        );
      } else {
        throw new Error("Invalid page data received");
      }
    } catch (error) {
      console.error("Generation failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate page");
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const useExamplePrompt = (examplePrompt: string, index: number) => {
    setPrompt(examplePrompt);
    setCopiedPrompt(index);
    setTimeout(() => setCopiedPrompt(null), 2000);
    toast.success("Example prompt loaded!");
  };

  const exportPage = () => {
    if (!generatedPage) return;
    
    const blob = new Blob([JSON.stringify(generatedPage, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedPage.slug}-page.json`;
    a.click();
    toast.success("Page exported!");
  };

  const savePage = async () => {
    if (!generatedPage) return;

    try {
      const response = await fetch("/api/pages/simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedPage)
      });

      if (response.ok) {
        toast.success("Page saved successfully!");
      } else {
        toast.error("Failed to save page");
      }
    } catch {
      toast.error("Error saving page");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary">Natural Language</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">Page Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Just describe what you want, and AI will create a complete landing page with all the right sections.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Main Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Page</CardTitle>
                <CardDescription>
                  Tell us what kind of page you need in natural language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Example: Create a landing page for TechFlow, an AI-powered project management tool for developers. We help teams ship faster with intelligent automation. Professional tone, include pricing and testimonials."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none text-base"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {prompt.length} characters
                    </span>
                    {prompt.length > 0 && prompt.length < 10 && (
                      <span className="text-xs text-orange-500">
                        Minimum 10 characters
                      </span>
                    )}
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generatePage} 
                  disabled={isGenerating || prompt.length < 10}
                  className="w-full h-12"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      AI is creating your page...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Generate Page
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      AI is analyzing your request and generating content...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Example Prompts</CardTitle>
                <CardDescription>Click to use these as inspiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {examplePrompts.map((example, index) => {
                  const Icon = example.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => useExamplePrompt(example.prompt, index)}
                      className="w-full p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1 flex items-center gap-2">
                            {example.title}
                            {copiedPrompt === index ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {example.prompt}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Advanced Options</CardTitle>
                        <CardDescription>Fine-tune generation settings</CardDescription>
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai">Use AI Generation</Label>
                      <Switch
                        id="ai"
                        checked={useAI}
                        onCheckedChange={setUseAI}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="cache">Use Cache</Label>
                      <Switch
                        id="cache"
                        checked={useCache}
                        onCheckedChange={setUseCache}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enhance">Auto-Enhance Context</Label>
                      <Switch
                        id="enhance"
                        checked={autoEnhance}
                        onCheckedChange={setAutoEnhance}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="context">Show Extracted Context</Label>
                      <Switch
                        id="context"
                        checked={showExtractedContext}
                        onCheckedChange={setShowExtractedContext}
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
                        Lower = more focused, Higher = more creative
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Extracted Context (Debug) */}
            {extractedContext && showExtractedContext && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Context</CardTitle>
                  <CardDescription>What AI understood from your prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {extractedContext.companyName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{extractedContext.companyName}</span>
                      </div>
                    )}
                    {extractedContext.industry && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">{extractedContext.industry}</span>
                      </div>
                    )}
                    {extractedContext.tone && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tone:</span>
                        <span className="font-medium">{extractedContext.tone}</span>
                      </div>
                    )}
                    {extractedContext.suggestedTemplate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Template:</span>
                        <span className="font-medium">{extractedContext.suggestedTemplate}</span>
                      </div>
                    )}
                    {extractedContext.numberOfSections && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sections:</span>
                        <span className="font-medium">{extractedContext.numberOfSections}</span>
                      </div>
                    )}
                    {extractedContext.features && extractedContext.features.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Features:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {extractedContext.features.map((feature: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-3">
            <Card className="h-full min-h-[700px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      {generatedPage ? (
                        <span className="flex items-center gap-2">
                          {generationMetadata?.generationMethod === "prompt" && (
                            <Badge variant="outline" className="text-xs">
                              <Brain className="h-3 w-3 mr-1" />
                              From Prompt
                            </Badge>
                          )}
                          {generatedPage.sections.length} sections generated
                          {generationMetadata?.aiSectionsCount && (
                            <span className="text-xs text-muted-foreground">
                              ({generationMetadata.aiSectionsCount} with AI)
                            </span>
                          )}
                        </span>
                      ) : (
                        "Your page will appear here"
                      )}
                    </CardDescription>
                  </div>
                  {generatedPage && (
                    <div className="flex gap-2">
                      {/* Device Preview */}
                      <div className="flex items-center gap-1 border rounded-lg p-1">
                        <Button
                          size="sm"
                          variant={deviceMode === "desktop" ? "default" : "ghost"}
                          onClick={() => setDeviceMode("desktop")}
                          className="h-8 w-8 p-0"
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={deviceMode === "tablet" ? "default" : "ghost"}
                          onClick={() => setDeviceMode("tablet")}
                          className="h-8 w-8 p-0"
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={deviceMode === "mobile" ? "default" : "ghost"}
                          onClick={() => setDeviceMode("mobile")}
                          className="h-8 w-8 p-0"
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button size="sm" variant="outline" onClick={exportPage}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={savePage}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {generatedPage ? (
                  <div className="border-t max-h-[600px] overflow-auto bg-background">
                    <PageRenderer 
                      schema={generatedPage} 
                      mode="preview" 
                      device={deviceMode} 
                    />
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center bg-muted/20">
                    <div className="text-center space-y-4 max-w-md">
                      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Ready to Generate</h3>
                        <p className="text-muted-foreground">
                          Simply describe your page in the text box, and AI will create a complete landing page tailored to your needs.
                        </p>
                      </div>
                      <div className="pt-4">
                        <p className="text-sm font-medium mb-3">AI understands:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Badge variant="outline">Company Names</Badge>
                          <Badge variant="outline">Industries</Badge>
                          <Badge variant="outline">Features</Badge>
                          <Badge variant="outline">Tone & Style</Badge>
                          <Badge variant="outline">Target Audience</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}