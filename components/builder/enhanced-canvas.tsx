"use client";

import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { registry } from "@/registry";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Copy, 
  Edit2, 
  Eye,
  EyeOff,
  Plus,
  Grip
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const EnhancedCanvas = () => {
  const {
    sections,
    selectedSectionId,
    previewMode,
    viewMode,
    selectSection,
    removeSection,
    reorderSections,
    duplicateSection,
    addSection,
  } = useBuilderStore();

  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const deviceClasses = {
    desktop: "w-full",
    tablet: "max-w-3xl mx-auto",
    mobile: "max-w-sm mx-auto",
  };

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedSection) {
      const draggedIndex = sections.findIndex(s => s.id === draggedSection);
      if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
        reorderSections(draggedIndex, dropIndex);
      }
    }
    setDraggedSection(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
    setDragOverIndex(null);
  };

  if (sections.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Start Building Your Page</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Drag and drop components from the sidebar to build your page manually
            </p>
            <Button
              onClick={() => {
                // Add a default hero section
                addSection("hero-minimal");
              }}
            >
              Add First Section
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-muted/30 overflow-auto h-full">
      <div className={cn(
        "min-h-full bg-background transition-all duration-300",
        deviceClasses[previewMode]
      )}>
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => {
            const component = registry.find((c) => c.slug === section.componentSlug);
            if (!component) return null;

            const Component = component.Component;
            const isSelected = section.id === selectedSectionId;
            const isDragging = section.id === draggedSection;
            const isDropTarget = index === dragOverIndex;

            // In preview mode, just render the component
            if (viewMode === "preview") {
              return (
                <div key={section.id}>
                  <Component {...section.props} />
                </div>
              );
            }

            // Edit mode with all controls
            return (
              <div
                key={section.id}
                className={cn(
                  "relative group transition-all",
                  isSelected && "ring-2 ring-primary ring-offset-2",
                  isDragging && "opacity-50",
                  isDropTarget && "border-t-4 border-primary"
                )}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => selectSection(section.id)}
              >
                {/* Drag Handle */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10">
                  <div className="bg-background border rounded p-1">
                    <Grip className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Section Controls */}
                <div className={cn(
                  "absolute right-2 top-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                  isSelected && "opacity-100"
                )}>
                  <div className="bg-background border rounded-lg shadow-sm flex">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newIndex = index - 1;
                        if (newIndex >= 0) {
                          reorderSections(index, newIndex);
                        }
                      }}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                      title="Move up"
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newIndex = index + 1;
                        if (newIndex < sections.length) {
                          reorderSections(index, newIndex);
                        }
                      }}
                      disabled={index === sections.length - 1}
                      className="h-8 w-8 p-0"
                      title="Move down"
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>
                    <div className="w-px bg-border" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateSection(section.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Duplicate"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <div className="w-px bg-border" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Component Label */}
                <div className={cn(
                  "absolute left-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity",
                  isSelected && "opacity-100"
                )}>
                  <div className="bg-background border rounded px-2 py-1 text-xs font-medium">
                    {component.name}
                  </div>
                </div>

                {/* Component */}
                <div className={cn(
                  "transition-all",
                  viewMode === "edit" && "pointer-events-none select-none"
                )}>
                  <Component {...section.props} />
                </div>

                {/* Hover Overlay */}
                {viewMode === "edit" && (
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </div>
            );
          })}
        
        {/* Add Section Button */}
        {viewMode === "edit" && (
          <div className="p-8 flex justify-center">
            <p className="text-sm text-muted-foreground">
              Drag components from the sidebar to add more sections
            </p>
          </div>
        )}
      </div>
    </div>
  );
};