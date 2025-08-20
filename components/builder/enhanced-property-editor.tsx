"use client";

import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { registry } from "@/registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Settings,
  Type,
  Link,
  Image,
  List,
  RotateCcw,
  Copy,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const EnhancedPropertyEditor = () => {
  const { 
    sections, 
    selectedSectionId, 
    updateSectionProps,
    duplicateSection,
    removeSection 
  } = useBuilderStore();
  
  const [localProps, setLocalProps] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const selectedSection = sections.find(s => s.id === selectedSectionId);
  const component = selectedSection 
    ? registry.find(c => c.slug === selectedSection.componentSlug)
    : null;

  useEffect(() => {
    if (selectedSection) {
      setLocalProps(selectedSection.props);
      setHasChanges(false);
    }
  }, [selectedSectionId, selectedSection]);

  if (!selectedSection || !component) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Select a section to edit its properties</p>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...localProps, [key]: value };
    setLocalProps(newProps);
    setHasChanges(true);
  };

  const handleNestedPropChange = (parentKey: string, childKey: string, value: any) => {
    const newProps = {
      ...localProps,
      [parentKey]: {
        ...localProps[parentKey],
        [childKey]: value
      }
    };
    setLocalProps(newProps);
    setHasChanges(true);
  };

  const applyChanges = () => {
    updateSectionProps(selectedSectionId, localProps);
    setHasChanges(false);
    toast.success("Properties updated");
  };

  const resetChanges = () => {
    setLocalProps(selectedSection.props);
    setHasChanges(false);
  };

  const renderPropEditor = (key: string, value: any, path: string[] = []) => {
    const fullPath = [...path, key].join(".");
    
    // Handle different types of props
    if (value === null || value === undefined) {
      return null;
    }

    // Boolean
    if (typeof value === "boolean") {
      return (
        <div className="flex items-center justify-between py-2">
          <Label htmlFor={fullPath} className="text-sm">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <Switch
            id={fullPath}
            checked={value}
            onCheckedChange={(checked) => {
              if (path.length > 0) {
                handleNestedPropChange(path[0], key, checked);
              } else {
                handlePropChange(key, checked);
              }
            }}
          />
        </div>
      );
    }

    // String
    if (typeof value === "string") {
      const isLongText = value.length > 50;
      const InputComponent = isLongText ? Textarea : Input;
      
      return (
        <div className="space-y-1.5">
          <Label htmlFor={fullPath} className="text-sm flex items-center gap-1">
            {key.includes("href") || key.includes("url") ? (
              <Link className="h-3 w-3" />
            ) : (
              <Type className="h-3 w-3" />
            )}
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <InputComponent
            id={fullPath}
            value={value}
            onChange={(e) => {
              if (path.length > 0) {
                handleNestedPropChange(path[0], key, e.target.value);
              } else {
                handlePropChange(key, e.target.value);
              }
            }}
            className="h-9"
            rows={isLongText ? 3 : undefined}
          />
        </div>
      );
    }

    // Number
    if (typeof value === "number") {
      return (
        <div className="space-y-1.5">
          <Label htmlFor={fullPath} className="text-sm">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <Input
            id={fullPath}
            type="number"
            value={value}
            onChange={(e) => {
              const numValue = parseFloat(e.target.value);
              if (path.length > 0) {
                handleNestedPropChange(path[0], key, numValue);
              } else {
                handlePropChange(key, numValue);
              }
            }}
            className="h-9"
          />
        </div>
      );
    }

    // Array
    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm font-medium">
            <List className="h-3 w-3" />
            {key.replace(/([A-Z])/g, " $1").trim()}
            <span className="text-muted-foreground ml-auto">({value.length} items)</span>
          </div>
          <div className="pl-3 border-l-2 border-muted space-y-3">
            {value.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="text-xs text-muted-foreground">Item {index + 1}</div>
                {typeof item === "object" ? (
                  Object.entries(item).map(([itemKey, itemValue]) => (
                    <div key={itemKey}>
                      {renderPropEditor(itemKey, itemValue, [key, index.toString()])}
                    </div>
                  ))
                ) : (
                  renderPropEditor(index.toString(), item, [key])
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Object
    if (typeof value === "object") {
      return (
        <div className="space-y-2">
          <div className="text-sm font-medium">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </div>
          <div className="pl-3 border-l-2 border-muted space-y-2">
            {Object.entries(value).map(([childKey, childValue]) => (
              <div key={childKey}>
                {renderPropEditor(childKey, childValue, [key])}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Group props by category
  const categorizedProps = Object.entries(localProps).reduce((acc, [key, value]) => {
    let category = "General";
    
    if (key.includes("CTA") || key.includes("button")) {
      category = "Actions";
    } else if (key.includes("image") || key.includes("icon") || key.includes("src")) {
      category = "Media";
    } else if (key.includes("headline") || key.includes("title") || key.includes("description") || key.includes("text")) {
      category = "Content";
    } else if (Array.isArray(value)) {
      category = "Lists";
    }
    
    if (!acc[category]) acc[category] = [];
    acc[category].push([key, value]);
    
    return acc;
  }, {} as Record<string, [string, any][]>);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{component.name}</h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => duplicateSection(selectedSectionId)}
              className="h-8 w-8 p-0"
              title="Duplicate section"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeSection(selectedSectionId)}
              className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
              title="Delete section"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {component.description && (
          <p className="text-sm text-muted-foreground">{component.description}</p>
        )}
      </div>

      {/* Properties */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {Object.keys(categorizedProps).length > 1 ? (
            <Tabs defaultValue={Object.keys(categorizedProps)[0]} className="w-full">
              <TabsList className="w-full">
                {Object.keys(categorizedProps).map(category => (
                  <TabsTrigger key={category} value={category} className="flex-1">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(categorizedProps).map(([category, props]) => (
                <TabsContent key={category} value={category} className="space-y-4 mt-4">
                  {props.map(([key, value]) => (
                    <div key={key}>
                      {renderPropEditor(key, value)}
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="space-y-4">
              {Object.entries(localProps).map(([key, value]) => (
                <div key={key}>
                  {renderPropEditor(key, value)}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer with Apply/Reset */}
      {hasChanges && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={resetChanges}
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-3 w-3" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={applyChanges}
              className="flex-1"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};