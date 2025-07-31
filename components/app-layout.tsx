"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DesignSystemDrawer } from "@/components/design-system-drawer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        {/* Left Sidebar */}
        <AppSidebar />

        {/* Main Content Area with Inset */}
        <SidebarInset className="relative flex flex-1">
          <main className="flex-1 overflow-auto">{children}</main>

          {/* Design System Drawer Trigger */}
          <DesignSystemDrawer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
