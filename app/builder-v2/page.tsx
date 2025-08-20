"use client";

import { useEffect } from "react";
import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { EnhancedSidebar } from "@/components/builder/enhanced-sidebar";
import { EnhancedCanvas } from "@/components/builder/enhanced-canvas";
import { EnhancedPropertyEditor } from "@/components/builder/enhanced-property-editor";
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
  Redo
} from "lucide-react";
import { toast } from "sonner";

export default function EnhancedBuilderPage() {
  const {
    pageTitle,
    pageSlug,
    sections,
    previewMode,
    viewMode,
    selectedSectionId,
    setPageTitle,
    setPageSlug,
    setPreviewMode,
    setViewMode,
    clearPage,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useBuilderStore();

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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, undo, redo, viewMode, setViewMode]);

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
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "edit" | "preview")}>
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
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={sections.length === 0}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
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
        </div>

        {/* Property Editor */}
        {viewMode === "edit" && selectedSectionId && (
          <div className="w-80 flex-shrink-0 border-l bg-background">
            <EnhancedPropertyEditor />
          </div>
        )}
      </div>
    </div>
  );
}