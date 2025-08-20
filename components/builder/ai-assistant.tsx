"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Wand2, 
  Sparkles, 
  History,
  FileText,
  Layout,
  Zap,
  MessageSquare,
  DollarSign,
  Navigation,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const suggestionTemplates = [
  {
    category: "Complete Pages",
    icon: FileText,
    suggestions: [
      "SaaS landing page with pricing",
      "Product showcase with testimonials",
      "Startup homepage with all sections",
      "Marketing page for mobile app"
    ]
  },
  {
    category: "Hero Sections",
    icon: Layout,
    suggestions: [
      "Minimal hero with two CTAs",
      "Hero with product screenshot",
      "Video background hero",
      "Hero with signup form"
    ]
  },
  {
    category: "Features",
    icon: Zap,
    suggestions: [
      "Three-card feature grid",
      "Feature list with icons",
      "Alternating feature sections",
      "Tabbed feature showcase"
    ]
  },
  {
    category: "Social Proof",
    icon: MessageSquare,
    suggestions: [
      "Customer testimonial grid",
      "Testimonial carousel",
      "Case study section",
      "Star rating testimonials"
    ]
  }
];

export const AiAssistant = () => {
  const {
    aiPrompt,
    isGenerating,
    generationHistory,
    selectedSectionId,
    sections,
    setAiPrompt,
    setAiPanelOpen,
    generateWithAi,
    updateSectionProps,
  } = useBuilderStore();

  const [activeTab, setActiveTab] = useState("generate");
  const [enhancePrompt, setEnhancePrompt] = useState("");

  const handleGenerate = async (mode: "section" | "page") => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    await generateWithAi(aiPrompt, mode);
    setAiPrompt("");
    toast.success(`${mode === "page" ? "Page" : "Section"} generated!`);
  };

  const handleEnhance = async () => {
    if (!selectedSectionId || !enhancePrompt.trim()) {
      toast.error("Select a section and enter enhancement instructions");
      return;
    }

    // For now, just regenerate the section with the new prompt
    await generateWithAi(enhancePrompt, "enhance");
    setEnhancePrompt("");
    toast.success("Section enhanced!");
  };

  const applySuggestion = (suggestion: string) => {
    setAiPrompt(suggestion);
    setActiveTab("generate");
  };

  const selectedSection = sections.find(s => s.id === selectedSectionId);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setAiPanelOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="generate" className="flex-1">Generate</TabsTrigger>
          <TabsTrigger value="enhance" className="flex-1">Enhance</TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1">Ideas</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Generate Tab */}
          <TabsContent value="generate" className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                What would you like to create?
              </label>
              <Textarea
                placeholder="E.g., Create a hero section with a headline about AI tools and two buttons"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {generationHistory.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <History className="h-3 w-3" />
                  Recent Prompts
                </div>
                <div className="space-y-1">
                  {generationHistory.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setAiPrompt(prompt)}
                      className="w-full text-left p-2 text-sm rounded border hover:bg-accent transition-colors truncate"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => handleGenerate("section")}
                disabled={isGenerating || !aiPrompt.trim()}
                className="flex-1"
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Add Section
              </Button>
              <Button
                onClick={() => handleGenerate("page")}
                disabled={isGenerating || !aiPrompt.trim()}
                variant="outline"
                className="flex-1"
              >
                Replace Page
              </Button>
            </div>
          </TabsContent>

          {/* Enhance Tab */}
          <TabsContent value="enhance" className="p-4 space-y-4">
            {selectedSection ? (
              <>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-1">Selected Section</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSection.componentSlug.replace(/-/g, " ")}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    How should we enhance this section?
                  </label>
                  <Textarea
                    placeholder="E.g., Make the headline more compelling, add more features, change the tone to be more professional"
                    value={enhancePrompt}
                    onChange={(e) => setEnhancePrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Quick Actions</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEnhancePrompt("Make the content more compelling and action-oriented")}
                    >
                      More Compelling
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEnhancePrompt("Make it more professional and enterprise-focused")}
                    >
                      Professional
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEnhancePrompt("Simplify the content and make it clearer")}
                    >
                      Simplify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEnhancePrompt("Add more details and expand the content")}
                    >
                      Expand
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleEnhance}
                  disabled={isGenerating || !enhancePrompt.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Enhance Section
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a section on the canvas to enhance it
                </p>
              </div>
            )}
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="p-4 space-y-4">
            {suggestionTemplates.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium text-sm">{category.category}</h3>
                </div>
                <div className="space-y-2">
                  {category.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(suggestion)}
                      className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{suggestion}</span>
                        <Sparkles className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};