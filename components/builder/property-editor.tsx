"use client";

import { useBuilderStore } from "@/lib/builder-store";
import { registry } from "@/registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

export const PropertyEditor = () => {
  const {
    sections,
    selectedSectionId,
    selectSection,
    updateSectionProps,
  } = useBuilderStore();

  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  
  if (!selectedSection) {
    return (
      <div className="h-full border-l bg-background p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Select a section to edit its properties</p>
        </div>
      </div>
    );
  }

  const component = registry.find((c) => c.slug === selectedSection.componentSlug);
  if (!component) return null;

  const handlePropChange = (propPath: string, value: unknown) => {
    const newProps = { ...selectedSection.props };
    
    // Handle nested properties (e.g., "primaryCTA.text")
    const pathParts = propPath.split(".");
    if (pathParts.length === 1) {
      newProps[propPath] = value;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newProps;
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = value;
    }
    
    updateSectionProps(selectedSection.id, newProps);
  };

  const renderPropEditor = (key: string, value: unknown, path = "") => {
    const fullPath = path ? `${path}.${key}` : key;
    
    // Handle objects recursively
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <div key={fullPath} className="space-y-3">
          <Label className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <div className="pl-4 border-l-2 space-y-3">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderPropEditor(subKey, subValue, fullPath)
            )}
          </div>
        </div>
      );
    }
    
    // Handle primitive values
    return (
      <div key={fullPath} className="space-y-2">
        <Label htmlFor={fullPath} className="text-sm capitalize">
          {key.replace(/([A-Z])/g, " $1").trim()}
        </Label>
        {typeof value === "string" && value.length > 50 ? (
          <Textarea
            id={fullPath}
            value={value || ""}
            onChange={(e) => handlePropChange(fullPath, e.target.value)}
            className="min-h-[80px]"
          />
        ) : (
          <Input
            id={fullPath}
            type={typeof value === "number" ? "number" : "text"}
            value={typeof value === "string" || typeof value === "number" ? value : ""}
            onChange={(e) => handlePropChange(fullPath, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="h-full border-l bg-background">
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Properties</h2>
          <p className="text-sm text-muted-foreground">{component.name}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => selectSection(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {Object.entries(selectedSection.props).map(([key, value]) =>
            renderPropEditor(key, value)
          )}
        </div>
      </ScrollArea>
    </div>
  );
};