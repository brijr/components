import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/craft/layout";

const inter = Inter({ subsets: ["latin"] });

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
  return <Layout className={inter.className}>{children}</Layout>;
}
