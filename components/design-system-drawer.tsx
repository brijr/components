"use client";

import * as React from "react";
import { Paintbrush, Download, Upload, RotateCcw } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorSection } from "@/components/design-system-editor/color-section";
import { TypographySection } from "@/components/design-system-editor/typography-section";
import { SpacingSection } from "@/components/design-system-editor/spacing-section";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Separator } from "@/components/ui/separator";

export function DesignSystemDrawer() {
  const { resetTokens, exportTokens, importTokens } = useDesignSystem();
  const [open, setOpen] = React.useState(false);

  const handleExport = () => {
    const tokens = exportTokens();
    const blob = new Blob([tokens], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-tokens.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          importTokens(text);
        } catch (error) {
          console.error("Failed to import tokens:", error);
        }
      }
    };
    input.click();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
          aria-label="Customize design system"
        >
          <Paintbrush className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Design System</DrawerTitle>
          <DrawerDescription>
            Customize colors, typography, and spacing for your components
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-hidden px-4">
          <Tabs defaultValue="colors" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1 mt-4">
              <div className="pb-4">
                <TabsContent value="colors" className="mt-0 space-y-4">
                  <ColorSection />
                </TabsContent>
                
                <TabsContent value="typography" className="mt-0 space-y-4">
                  <TypographySection />
                </TabsContent>
                
                <TabsContent value="spacing" className="mt-0 space-y-4">
                  <SpacingSection />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
        
        <DrawerFooter>
          <Separator className="mb-2" />
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                title="Export design tokens"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleImport}
                title="Import design tokens"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetTokens}
                title="Reset to defaults"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}