import { Users, BarChart, Shield, Zap, Cloud, Lock, Palette, Globe, Cpu, Sparkles, Code, Layers } from "lucide-react";
import React from "react";
import type { FeatureBentoProps } from "./index";

export const defaultContent: FeatureBentoProps = {
  headline: "Everything you need to build amazing products",
  subheadline: "Our comprehensive platform provides all the tools and features to bring your ideas to life",
  features: [
    {
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes instantly, leave comments, and stay in sync across all your projects.",
      icon: React.createElement(Users, { className: "w-6 h-6" }),
      size: "large",
      image: {
        src: "/placeholder.svg",
        alt: "Real-time collaboration interface",
      },
    },
    {
      title: "Advanced Analytics",
      description: "Gain deep insights into your performance with comprehensive analytics and customizable dashboards.",
      icon: React.createElement(BarChart, { className: "w-5 h-5" }),
      size: "medium",
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and security measures to keep your data safe.",
      icon: React.createElement(Shield, { className: "w-5 h-5" }),
      size: "small",
    },
    {
      title: "Lightning Fast",
      description: "Optimized for speed with global CDN and edge computing.",
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
      size: "small",
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud infrastructure that grows with your business. Deploy anywhere in the world with a single click.",
      icon: React.createElement(Cloud, { className: "w-5 h-5" }),
      size: "medium",
    },
    {
      title: "Design System",
      description: "Beautiful, consistent UI components to build stunning interfaces faster.",
      icon: React.createElement(Palette, { className: "w-5 h-5" }),
      size: "small",
    },
    {
      title: "Global Network",
      description: "Deploy to multiple regions worldwide for the best performance.",
      icon: React.createElement(Globe, { className: "w-5 h-5" }),
      size: "small",
    },
    {
      title: "AI-Powered Features",
      description: "Leverage the power of artificial intelligence to automate workflows, generate insights, and enhance productivity across your entire organization.",
      icon: React.createElement(Sparkles, { className: "w-6 h-6" }),
      size: "large",
      image: {
        src: "/placeholder.svg",
        alt: "AI-powered dashboard interface",
      },
    },
  ],
};

export const contentVariations = [
  // Developer-focused variation
  {
    headline: "Built for developers, by developers",
    subheadline: "Modern tools and APIs to accelerate your development workflow",
    features: [
      {
        title: "Powerful APIs",
        description: "RESTful and GraphQL APIs with comprehensive documentation and SDKs for all major languages.",
        icon: React.createElement(Code, { className: "w-6 h-6" }),
        size: "large" as const,
      },
      {
        title: "CI/CD Integration",
        description: "Seamless integration with your existing CI/CD pipelines.",
        icon: React.createElement(Layers, { className: "w-5 h-5" }),
        size: "medium" as const,
      },
      {
        title: "Version Control",
        description: "Built-in Git integration.",
        icon: React.createElement(Code, { className: "w-5 h-5" }),
        size: "small" as const,
      },
      {
        title: "Edge Computing",
        description: "Deploy functions at the edge.",
        icon: React.createElement(Cpu, { className: "w-5 h-5" }),
        size: "small" as const,
      },
      {
        title: "Database Options",
        description: "Support for SQL, NoSQL, and vector databases with automatic scaling.",
        icon: React.createElement(Layers, { className: "w-5 h-5" }),
        size: "medium" as const,
      },
    ],
  },
  // Minimal variation
  {
    headline: "Simple yet powerful",
    features: [
      {
        title: "Easy to Use",
        description: "Intuitive interface that anyone can master in minutes.",
        size: "large" as const,
      },
      {
        title: "Secure by Default",
        description: "Enterprise-grade security built in from day one.",
        icon: React.createElement(Lock, { className: "w-5 h-5" }),
        size: "medium" as const,
      },
      {
        title: "Fast Setup",
        description: "Get started in seconds.",
        size: "small" as const,
      },
      {
        title: "24/7 Support",
        description: "Always here to help.",
        size: "small" as const,
      },
    ],
  },
];