"use client";

import { useState, useEffect } from "react";
import { PageRenderer } from "@/lib/page-renderer";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { 
  Sparkles,
  Download,
  Save,
  RefreshCw,
  FileText,
  Rocket,
  Building2,
  ShoppingBag,
  GraduationCap,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  ArrowRight,
  Wand2,
  Zap,
  AlertCircle,
  Brain
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  sections: number;
  industries: string[];
  icon: any;
}

const templates: Template[] = [
  {
    id: "saas-landing",
    name: "SaaS Product",
    description: "Software product with features, pricing, testimonials",
    sections: 7,
    industries: ["technology", "software"],
    icon: Rocket
  },
  {
    id: "ecommerce-landing",
    name: "E-commerce",
    description: "Product showcase with categories and reviews",
    sections: 6,
    industries: ["retail", "fashion"],
    icon: ShoppingBag
  },
  {
    id: "agency-landing",
    name: "Agency",
    description: "Professional services with case studies",
    sections: 7,
    industries: ["consulting", "services"],
    icon: Building2
  },
  {
    id: "startup-landing",
    name: "Startup Launch",
    description: "High-energy launch page for new products",
    sections: 6,
    industries: ["startup", "innovation"],
    icon: Rocket
  },
  {
    id: "course-landing",
    name: "Online Course",
    description: "Educational program with curriculum",
    sections: 7,
    industries: ["education", "training"],
    icon: GraduationCap
  }
];

const industries = [
  "Technology", "Software", "E-commerce", "Healthcare", 
  "Finance", "Education", "Real Estate", "Travel",
  "Fitness", "Food & Beverage", "Entertainment", "Fashion"
];

const tones = [
  "Professional", "Casual", "Bold", "Minimal", "Playful", "Serious"
];

export default function PageGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("saas-landing");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [tone, setTone] = useState("Professional");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueSellingPoints, setUniqueSellingPoints] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedPage, setGeneratedPage] = useState<SimplePage | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [useAI, setUseAI] = useState(true);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [generationMetadata, setGenerationMetadata] = useState<any>(null);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  // Check AI availability on mount
  useEffect(() => {
    fetch("/api/generate-page-ai")
      .then(res => res.json())
      .then(data => setAiAvailable(data.aiEnabled))
      .catch(() => setAiAvailable(false));
  }, []);

  const generatePage = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter your company or product name");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90));
    }, 300);

    try {
      // Choose endpoint based on AI toggle
      const endpoint = useAI && aiAvailable ? "/api/generate-page-ai" : "/api/generate-page";
      
      const requestBody: any = {
        templateId: selectedTemplate,
        companyName,
        industry: industry.toLowerCase(),
        tone: tone.toLowerCase(),
        description
      };

      // Add AI-specific parameters
      if (useAI && aiAvailable) {
        requestBody.targetAudience = targetAudience;
        requestBody.uniqueSellingPoints = uniqueSellingPoints ? uniqueSellingPoints.split(",").map(s => s.trim()) : undefined;
        requestBody.keywords = keywords ? keywords.split(",").map(s => s.trim()) : undefined;
        requestBody.useAI = true;
        requestBody.useCache = true;
        requestBody.temperature = 0.7;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
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
        
        const generationMethod = data.metadata?.generationMethod === "ai" ? "AI" : "Template";
        const aiSections = data.metadata?.aiSectionsCount || 0;
        
        toast.success(
          `Generated complete page with ${data.page.sections.length} sections!`,
          {
            description: useAI && aiAvailable 
              ? `${aiSections} sections generated with AI in ${data.metadata?.duration || 0}ms`
              : `Template: ${data.template.name}`
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

  const exportPage = () => {
    if (!generatedPage) return;
    
    const blob = new Blob([JSON.stringify(generatedPage, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedPage.slug}-complete-page.json`;
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
            {useAI && aiAvailable && (
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            )}
            <Badge variant="secondary">Complete Pages</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">Page Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate full landing pages with 5-8 sections in seconds. 
            {useAI && aiAvailable 
              ? " AI creates coherent, contextual content tailored to your business."
              : " Every page is complete and ready to deploy."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Choose Template</CardTitle>
                <CardDescription>Select a page structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTemplate === template.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedTemplate === template.id ? "bg-primary/10" : "bg-muted"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {template.description}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {template.sections} sections
                            </Badge>
                          </div>
                        </div>
                        {selectedTemplate === template.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Generation Mode */}
            {aiAvailable !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>2. Generation Mode</CardTitle>
                  <CardDescription>Choose how to generate content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border">
                    <div className="flex items-center gap-3">
                      {useAI ? (
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                      ) : (
                        <div className="p-2 bg-muted rounded-lg">
                          <Zap className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">
                          {useAI ? "AI Generation" : "Template Generation"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {useAI 
                            ? "Intelligent, context-aware content"
                            : "Fast, template-based content"}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={useAI}
                      onCheckedChange={setUseAI}
                      disabled={!aiAvailable}
                    />
                  </div>
                  {!aiAvailable && (
                    <Alert className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        AI generation requires ANTHROPIC_API_KEY to be configured
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>3. Customize Details</CardTitle>
                <CardDescription>Personalize your page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Company/Product Name *
                  </label>
                  <Input
                    placeholder="e.g., TechFlow AI"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Industry
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(ind => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tone & Style
                  </label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map(t => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Context (Optional)
                  </label>
                  <Textarea
                    placeholder="Any specific features, benefits, or unique aspects to highlight..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* AI-specific fields */}
                {useAI && aiAvailable && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Target Audience
                      </label>
                      <Input
                        placeholder="e.g., developers, small businesses, marketers"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Unique Selling Points
                      </label>
                      <Textarea
                        placeholder="Comma-separated list of key benefits or features"
                        value={uniqueSellingPoints}
                        onChange={(e) => setUniqueSellingPoints(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Keywords
                      </label>
                      <Input
                        placeholder="e.g., AI, automation, productivity, innovation"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={generatePage} 
              disabled={isGenerating || !companyName.trim()}
              className="w-full h-12"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  {useAI && aiAvailable ? "AI Generating..." : "Generating..."}
                </>
              ) : (
                <>
                  {useAI && aiAvailable ? (
                    <Brain className="mr-2 h-5 w-5" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5" />
                  )}
                  Generate {useAI && aiAvailable ? "with AI" : "Full Page"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2">
                <Progress value={generationProgress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {useAI && aiAvailable 
                    ? `AI is creating ${selectedTemplateData?.sections} coherent sections...`
                    : `Creating ${selectedTemplateData?.sections} sections...`}
                </p>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full min-h-[700px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      {generatedPage ? (
                        <span className="flex items-center gap-2">
                          {generationMetadata?.generationMethod === "ai" && (
                            <Badge variant="outline" className="text-xs">
                              <Brain className="h-3 w-3 mr-1" />
                              AI Generated
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
                        "Your complete page will appear here"
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
                        <FileText className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Ready to Generate</h3>
                        <p className="text-muted-foreground">
                          Configure your page details and click generate to create a complete {selectedTemplateData?.sections}-section landing page
                        </p>
                      </div>
                      {selectedTemplateData && (
                        <div className="pt-4">
                          <p className="text-sm font-medium mb-3">This template includes:</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="outline">Hero Section</Badge>
                            <Badge variant="outline">Features</Badge>
                            <Badge variant="outline">Testimonials</Badge>
                            {selectedTemplate.includes("pricing") && (
                              <Badge variant="outline">Pricing</Badge>
                            )}
                            <Badge variant="outline">CTA</Badge>
                            <Badge variant="outline">Footer</Badge>
                          </div>
                        </div>
                      )}
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