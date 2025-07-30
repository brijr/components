"use client";

import * as React from "react";
import { Paintbrush } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorSection } from "./color-section";
import { TypographySection } from "./typography-section";
import { SpacingSection } from "./spacing-section";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Separator } from "@/components/ui/separator";

export function DesignSystemEditor() {
  const [open, setOpen] = React.useState(false);
  const { resetTokens, exportTokens, importTokens } = useDesignSystem();

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
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
            title="Open Design System Editor"
          >
            <Paintbrush className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Design System Editor</SheetTitle>
            <SheetDescription>
              Customize colors, typography, and spacing in real-time
            </SheetDescription>
          </SheetHeader>
          
          <Tabs defaultValue="colors" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-280px)] mt-6">
              <TabsContent value="colors" className="space-y-4">
                <ColorSection />
              </TabsContent>
              
              <TabsContent value="typography" className="space-y-4">
                <TypographySection />
              </TabsContent>
              
              <TabsContent value="spacing" className="space-y-4">
                <SpacingSection />
              </TabsContent>
            </ScrollArea>
          </Tabs>
          
          <Separator className="my-4" />
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport}>
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={resetTokens}>
              Reset to Defaults
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}