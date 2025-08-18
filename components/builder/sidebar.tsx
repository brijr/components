"use client";

import { registry } from "@/registry";
import { useBuilderStore } from "@/lib/builder-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export const BuilderSidebar = () => {
  const addSection = useBuilderStore((state) => state.addSection);
  
  // Group components by type
  const componentsByType = registry.reduce((acc, component) => {
    if (!acc[component.type]) {
      acc[component.type] = [];
    }
    acc[component.type].push(component);
    return acc;
  }, {} as Record<string, typeof registry>);

  return (
    <div className="h-full border-r bg-background">
      <div className="border-b p-4">
        <h2 className="font-semibold">Components</h2>
        <p className="text-sm text-muted-foreground">
          Click to add to your page
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-6">
          {Object.entries(componentsByType).map(([type, components]) => (
            <div key={type}>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {type}s
              </h3>
              <div className="space-y-2">
                {components.map((component) => (
                  <Button
                    key={component.slug}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => addSection(component.slug)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {component.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};