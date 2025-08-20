"use client";

import { useState, useEffect } from "react";
import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { EnhancedSidebar } from "@/components/builder/enhanced-sidebar";
import { EnhancedCanvas } from "@/components/builder/enhanced-canvas";
import { EnhancedPropertyEditor } from "@/components/builder/enhanced-property-editor";
import { AiAssistant } from "@/components/builder/ai-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Save, 
  Download,
  Eye,
  Edit,
  Trash2,
  Undo,
  Redo,
  Wand2,
  Plus,
  FileText,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function EnhancedBuilderPage() {
  const {
    pageTitle,
    pageSlug,
    sections,
    previewMode,
    viewMode,
    selectedSectionId,
    isAiPanelOpen,
    isGenerating,
    setPageTitle,
    setPageSlug,
    setPreviewMode,
    setViewMode,
    clearPage,
    undo,
    redo,
    canUndo,
    canRedo,
    setAiPanelOpen,
    generateWithAi,
  } = useBuilderStore();

  const [showQuickActions, setShowQuickActions] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Cmd/Ctrl + Z
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }
      
      // Redo: Cmd/Ctrl + Shift + Z
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        if (canRedo()) redo();
      }
      
      // Toggle preview: Cmd/Ctrl + P
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setViewMode(viewMode === "edit" ? "preview" : "edit");
      }
      
      // Open AI: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setAiPanelOpen(!isAiPanelOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, undo, redo, viewMode, setViewMode, isAiPanelOpen, setAiPanelOpen]);

  const handleSave = async () => {
    const pageData = {
      id: `page-${Date.now()}`,
      title: pageTitle,
      slug: pageSlug,
      sections: sections.map(s => ({
        id: s.id,
        componentSlug: s.componentSlug,
        props: s.props,
        order: s.order,
        visible: true,
      })),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generatedBy: "manual",
        version: 1,
      },
    };

    try {
      const response = await fetch("/api/pages/simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
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

  const handleExport = () => {
    const pageData = {
      title: pageTitle,
      slug: pageSlug,
      sections,
    };
    
    const blob = new Blob([JSON.stringify(pageData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pageSlug}.json`;
    a.click();
    toast.success("Page exported!");
  };

  const quickGenerate = async (type: string) => {
    const prompts: Record<string, string> = {
      hero: "Create a hero section for a modern SaaS product",
      features: "Create a feature grid showcasing product capabilities",
      testimonials: "Create a testimonial section with customer reviews",
      pricing: "Create a pricing section with three tiers",
      cta: "Create a call-to-action section",
      full: "Create a complete landing page for a SaaS product"
    };

    const prompt = prompts[type];
    if (prompt) {
      await generateWithAi(prompt, type === "full" ? "page" : "section");
      setShowQuickActions(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-3 gap-4">
          {/* Page Info */}
          <div className="flex items-center gap-3">
            <Input
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-48 h-9"
              placeholder="Page Title"
            />
            <Input
              value={pageSlug}
              onChange={(e) => setPageSlug(e.target.value)}
              className="w-32 h-9"
              placeholder="page-slug"
            />
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList className="h-9">
                <TabsTrigger value="edit" className="gap-2">
                  <Edit className="h-3 w-3" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-3 w-3" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Device Preview */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                size="sm"
                variant={previewMode === "desktop" ? "default" : "ghost"}
                onClick={() => setPreviewMode("desktop")}
                className="h-7 w-7 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === "tablet" ? "default" : "ghost"}
                onClick={() => setPreviewMode("tablet")}
                className="h-7 w-7 p-0"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === "mobile" ? "default" : "ghost"}
                onClick={() => setPreviewMode("mobile")}
                className="h-7 w-7 p-0"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            {/* History Controls */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={undo}
                disabled={!canUndo()}
                className="h-7 w-7 p-0"
                title="Undo (Cmd+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={redo}
                disabled={!canRedo()}
                className="h-7 w-7 p-0"
                title="Redo (Cmd+Shift+Z)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* AI Actions */}
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Quick Generate
              </Button>
              
              {showQuickActions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border rounded-lg shadow-lg p-1 z-50">
                  <button
                    onClick={() => quickGenerate("hero")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
                  >
                    Generate Hero
                  </button>
                  <button
                    onClick={() => quickGenerate("features")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
                  >
                    Generate Features
                  </button>
                  <button
                    onClick={() => quickGenerate("testimonials")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
                  >
                    Generate Testimonials
                  </button>
                  <button
                    onClick={() => quickGenerate("pricing")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
                  >
                    Generate Pricing
                  </button>
                  <button
                    onClick={() => quickGenerate("cta")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded"
                  >
                    Generate CTA
                  </button>
                  <div className="border-t my-1" />
                  <button
                    onClick={() => quickGenerate("full")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded font-medium"
                  >
                    Generate Full Page
                  </button>
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setAiPanelOpen(!isAiPanelOpen)}
              className="gap-2"
              title="AI Assistant (Cmd+K)"
            >
              <Wand2 className="h-4 w-4" />
              AI Assistant
            </Button>

            <div className="border-l pl-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExport}
                disabled={sections.length === 0}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearPage}
                disabled={sections.length === 0}
                className="ml-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={sections.length === 0}
                className="ml-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        {viewMode === "edit" && (
          <div className="w-64 flex-shrink-0 border-r bg-background">
            <EnhancedSidebar />
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative">
          <EnhancedCanvas />
          
          {/* Floating AI Prompt Bar */}
          {isGenerating && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background border rounded-lg shadow-lg p-4 flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Generating with AI...</span>
            </div>
          )}
        </div>

        {/* Property Editor */}
        {viewMode === "edit" && selectedSectionId && (
          <div className="w-80 flex-shrink-0 border-l bg-background">
            <EnhancedPropertyEditor />
          </div>
        )}

        {/* AI Assistant Panel */}
        {isAiPanelOpen && (
          <div className="absolute inset-0 z-40">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setAiPanelOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-96 bg-background border-l shadow-xl">
              <AiAssistant />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}