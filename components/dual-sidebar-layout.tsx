"use client";

import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app-sidebar";
import { DesignSystemSidebar } from "@/design-system-sidebar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

interface DualSidebarLayoutProps {
  children: React.ReactNode;
}

export function DualSidebarLayout({ children }: DualSidebarLayoutProps) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-full"
    >
      {/* Left Sidebar Panel */}
      <ResizablePanel
        defaultSize={15}
        minSize={12}
        maxSize={20}
        className="min-w-[3rem]"
      >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
        </SidebarProvider>
      </ResizablePanel>
      
      {/* Main Content Panel */}
      <ResizablePanel defaultSize={65} minSize={40}>
        <main className="h-full overflow-auto bg-background">
          {children}
        </main>
      </ResizablePanel>
      
      {/* Resize Handle */}
      <ResizableHandle withHandle />
      
      {/* Right Sidebar Panel */}
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={35}
        className="min-w-[12rem]"
      >
        <SidebarProvider defaultOpen={true}>
          <DesignSystemSidebar />
        </SidebarProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}