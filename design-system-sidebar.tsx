"use client";

import * as React from "react";
import { Paintbrush, Download, Upload, RotateCcw } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorSection } from "@/components/design-system-editor/color-section";
import { TypographySection } from "@/components/design-system-editor/typography-section";
import { SpacingSection } from "@/components/design-system-editor/spacing-section";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Separator } from "@/components/ui/separator";

export function DesignSystemSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Paintbrush className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Design System</span>
                <span className="text-muted-foreground truncate text-xs">
                  Customize theme
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <Tabs defaultValue="colors" className="w-full">
          <div className="px-2 pb-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors" className="text-xs">Colors</TabsTrigger>
              <TabsTrigger value="typography" className="text-xs">Type</TabsTrigger>
              <TabsTrigger value="spacing" className="text-xs">Space</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="px-2">
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
      </SidebarContent>
      
      <SidebarFooter>
        <Separator className="mb-2" />
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-3 gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                title="Export design tokens"
                className="h-8 px-2"
              >
                <Download className="h-3 w-3" />
                <span className="sr-only sm:not-sr-only sm:ml-1 text-xs">Export</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImport}
                title="Import design tokens"
                className="h-8 px-2"
              >
                <Upload className="h-3 w-3" />
                <span className="sr-only sm:not-sr-only sm:ml-1 text-xs">Import</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTokens}
                title="Reset to defaults"
                className="h-8 px-2"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="sr-only sm:not-sr-only sm:ml-1 text-xs">Reset</span>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}