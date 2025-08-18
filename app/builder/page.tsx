"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/builder-store";
import { BuilderSidebar } from "@/components/builder/sidebar";
import { BuilderCanvas } from "@/components/builder/canvas";
import { PropertyEditor } from "@/components/builder/property-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Save, 
  Download,
  Eye,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function BuilderPage() {
  const {
    pageTitle,
    pageSlug,
    sections,
    previewMode,
    selectedSectionId,
    setPageTitle,
    setPageSlug,
    setPreviewMode,
    clearPage,
  } = useBuilderStore();

  const [isPreview, setIsPreview] = useState(false);

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
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b p-2 text-center bg-muted">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPreview(false)}
          >
            Exit Preview
          </Button>
        </div>
        <BuilderCanvas />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-4">
            <Input
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-48"
              placeholder="Page Title"
            />
            <Input
              value={pageSlug}
              onChange={(e) => setPageSlug(e.target.value)}
              className="w-32"
              placeholder="page-slug"
            />
          </div>

          {/* Device Preview */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              size="sm"
              variant={previewMode === "desktop" ? "default" : "ghost"}
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === "tablet" ? "default" : "ghost"}
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === "mobile" ? "default" : "ghost"}
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPreview(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              disabled={sections.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={clearPage}
              disabled={sections.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
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
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <BuilderSidebar />
        </div>

        {/* Canvas */}
        <BuilderCanvas />

        {/* Property Editor */}
        {selectedSectionId && (
          <div className="w-80 flex-shrink-0">
            <PropertyEditor />
          </div>
        )}
      </div>
    </div>
  );
}