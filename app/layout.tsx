import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app-sidebar";
import { DesignSystemProvider } from "@/providers/design-system-provider";
import { DesignSystemEditor } from "@/components/design-system-editor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "components.bridger.to / react components for building marketing sites",
  description:
    "bridger tower's component library. built with ds.bridger.to and ui.shadcn.com.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-accent/30 antialiased`}
      >
        <DesignSystemProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <DesignSystemEditor />
          <Toaster />
        </DesignSystemProvider>
      </body>
    </html>
  );
}
