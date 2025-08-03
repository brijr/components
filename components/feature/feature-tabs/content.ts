import { BarChart, Cpu, Shield, Palette, Code, Users, Globe, Zap } from "lucide-react";
import React from "react";
import type { FeatureTabsProps } from "./index";

export const defaultContent: FeatureTabsProps = {
  headline: "Powerful features at your fingertips",
  subheadline: "Explore each feature in detail to see how it can transform your workflow",
  features: [
    {
      value: "analytics",
      label: "Analytics",
      title: "Comprehensive Analytics Dashboard",
      description: "Transform your data into actionable insights with our powerful analytics suite. Track performance, identify trends, and make data-driven decisions.",
      badge: "Most Popular",
      icon: React.createElement(BarChart, { className: "w-4 h-4" }),
      image: {
        src: "/placeholder.svg",
        alt: "Analytics dashboard showing various charts and metrics",
      },
      benefits: [
        "Real-time data visualization with interactive charts",
        "Custom report builder with drag-and-drop interface",
        "Export reports in PDF, CSV, or Excel formats",
        "Team collaboration with shared dashboards",
        "Automated insights powered by machine learning",
      ],
    },
    {
      value: "automation",
      label: "Automation",
      title: "Intelligent Workflow Automation",
      description: "Eliminate repetitive tasks and streamline your processes. Our automation tools help you save time and reduce errors.",
      icon: React.createElement(Cpu, { className: "w-4 h-4" }),
      image: {
        src: "/placeholder.svg",
        alt: "Visual workflow builder interface",
      },
      benefits: [
        "Visual workflow builder with no coding required",
        "Connect with 100+ popular apps and services",
        "Advanced conditional logic and branching",
        "Built-in error handling and retry mechanisms",
        "Schedule automations or trigger by events",
      ],
    },
    {
      value: "security",
      label: "Security",
      title: "Enterprise-Grade Security",
      description: "Rest easy knowing your data is protected by industry-leading security measures and compliance standards.",
      badge: "Enterprise",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      image: {
        src: "/placeholder.svg",
        alt: "Security dashboard with threat monitoring",
      },
      benefits: [
        "End-to-end encryption for all data transfers",
        "SOC 2 Type II and ISO 27001 certified",
        "Advanced threat detection and prevention",
        "Role-based access control (RBAC)",
        "Regular security audits and penetration testing",
      ],
    },
    {
      value: "design",
      label: "Design",
      title: "Professional Design Tools",
      description: "Create stunning visuals and maintain brand consistency with our integrated design system and tools.",
      icon: React.createElement(Palette, { className: "w-4 h-4" }),
      image: {
        src: "/placeholder.svg",
        alt: "Design interface with component library",
      },
      benefits: [
        "Pre-built component library with 500+ elements",
        "Brand kit for consistent styling",
        "Collaborative design reviews",
        "Version control for design assets",
        "Export to multiple formats and platforms",
      ],
    },
  ],
};

export const contentVariations = [
  // Developer tools variation
  {
    headline: "Developer-first platform",
    subheadline: "Built with developers in mind, for developers by developers",
    features: [
      {
        value: "api",
        label: "APIs",
        title: "RESTful & GraphQL APIs",
        description: "Access all features programmatically with our comprehensive APIs.",
        icon: React.createElement(Code, { className: "w-4 h-4" }),
        benefits: [
          "RESTful API with OpenAPI documentation",
          "GraphQL endpoint with playground",
          "WebSocket support for real-time data",
          "SDKs for popular languages",
        ],
      },
      {
        value: "collaboration",
        label: "Collaboration",
        title: "Team Collaboration Tools",
        description: "Work seamlessly with your team, no matter where they are.",
        icon: React.createElement(Users, { className: "w-4 h-4" }),
        benefits: [
          "Real-time code collaboration",
          "Built-in code review tools",
          "Team chat and video calls",
          "Shared development environments",
        ],
      },
      {
        value: "deployment",
        label: "Deployment",
        title: "One-Click Deployment",
        description: "Deploy to production with confidence using our automated pipeline.",
        icon: React.createElement(Globe, { className: "w-4 h-4" }),
        benefits: [
          "Deploy to multiple regions globally",
          "Automatic SSL certificates",
          "Zero-downtime deployments",
          "Rollback with one click",
        ],
      },
    ],
  },
  // Simple variation
  {
    headline: "Everything you need",
    features: [
      {
        value: "fast",
        label: "Performance",
        title: "Lightning Fast",
        description: "Built for speed from the ground up.",
        icon: React.createElement(Zap, { className: "w-4 h-4" }),
      },
      {
        value: "secure",
        label: "Security",
        title: "Secure by Default",
        description: "Your data is always protected.",
        icon: React.createElement(Shield, { className: "w-4 h-4" }),
      },
      {
        value: "team",
        label: "Team",
        title: "Built for Teams",
        description: "Collaborate effectively with your team.",
        icon: React.createElement(Users, { className: "w-4 h-4" }),
      },
    ],
  },
];