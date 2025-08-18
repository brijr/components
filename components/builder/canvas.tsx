"use client";

import { useBuilderStore } from "@/lib/builder-store";
import { registry } from "@/registry";
import { Button } from "@/components/ui/button";
import { Trash2, MoveUp, MoveDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const BuilderCanvas = () => {
  const {
    sections,
    selectedSectionId,
    previewMode,
    selectSection,
    removeSection,
    reorderSections,
  } = useBuilderStore();

  const deviceClasses = {
    desktop: "w-full",
    tablet: "max-w-3xl mx-auto",
    mobile: "max-w-sm mx-auto",
  };

  if (sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No sections added yet</h3>
          <p className="text-muted-foreground">
            Add components from the sidebar to start building your page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-muted/30 overflow-auto">
      <div className={cn("min-h-full bg-background", deviceClasses[previewMode])}>
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => {
            const component = registry.find((c) => c.slug === section.componentSlug);
            if (!component) return null;

            const Component = component.Component;
            const isSelected = section.id === selectedSectionId;

            return (
              <div
                key={section.id}
                className={cn(
                  "relative group cursor-pointer transition-all",
                  isSelected && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={() => selectSection(section.id)}
              >
                {/* Section controls */}
                <div
                  className={cn(
                    "absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    isSelected && "opacity-100"
                  )}
                >
                  {index > 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderSections(index, index - 1);
                      }}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                  )}
                  {index < sections.length - 1 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderSections(index, index + 1);
                      }}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSection(section.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Component label */}
                <div
                  className={cn(
                    "absolute top-2 left-2 z-10 bg-background/90 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity",
                    isSelected && "opacity-100"
                  )}
                >
                  {component.name}
                </div>

                {/* Render the component */}
                <Component {...section.props} />
              </div>
            );
          })}
      </div>
    </div>
  );
};