import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Layout } from "@/components/craft/layout";
import { Toaster } from "@/components/ui/sonner";
import { Background } from "@/components/backgrounds";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next JS Components created by Bridger Tower",
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
      {children}
      <Toaster position="top-right" />
      <Background />
    </Layout>
  );
}
