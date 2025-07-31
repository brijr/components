import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { DualSidebarLayout } from "@/components/dual-sidebar-layout";
import { DesignSystemProvider } from "@/providers/design-system-provider";
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
          <DualSidebarLayout>
            {children}
          </DualSidebarLayout>
          <Toaster />
        </DesignSystemProvider>
      </body>
    </html>
  );
}
