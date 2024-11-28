import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Layout } from "@/components/craft";
import { Toaster } from "@/components/ui/sonner";
import { Background } from "@/components/backgrounds";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/site/theme/theme-provider";
import { Nav } from "@/components/nav";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://components.bridger.to"),
  title: "Next JS Components for building websites created by Bridger Tower",
  description:
    "Collection of Typescript React components for Next JS built using Tailwind and shadcn/ui. Created by Bridger Tower.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className={font.className}>
      <body className="px-4 xl:px-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Toaster position="top-right" />
          <Background />
          <Analytics />
        </ThemeProvider>
      </body>
    </Layout>
  );
}
