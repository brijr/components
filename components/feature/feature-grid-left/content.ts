import { FeatureGridLeftProps } from "./index";
import { Zap, Shield, Globe, Rocket, Code, Users, BarChart, Lock } from "lucide-react";
import React from "react";

export const defaultContent: FeatureGridLeftProps = {
  headline: "Everything you need to succeed",
  subheadline: "Our platform provides all the tools and features to help you grow your business",
  features: [
    {
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized infrastructure and global CDN.",
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
    },
    {
      title: "Enterprise Security",
      description: "Bank-level encryption and security measures to keep your data safe and compliant.",
      icon: React.createElement(Shield, { className: "w-5 h-5" }),
    },
    {
      title: "Global Scale",
      description: "Deploy worldwide with our distributed infrastructure across 30+ regions.",
      icon: React.createElement(Globe, { className: "w-5 h-5" }),
    },
    {
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive setup process and comprehensive docs.",
      icon: React.createElement(Rocket, { className: "w-5 h-5" }),
    },
    {
      title: "Developer Friendly",
      description: "Modern APIs, SDKs, and tools that developers love to work with.",
      icon: React.createElement(Code, { className: "w-5 h-5" }),
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with built-in collaboration and permission controls.",
      icon: React.createElement(Users, { className: "w-5 h-5" }),
    },
  ],
  columns: 3,
};

export const contentVariations: FeatureGridLeftProps[] = [
  // SaaS variation - 4 columns
  {
    headline: "Built for modern teams",
    subheadline: "Everything your team needs in one integrated platform",
    features: [
      {
        title: "Real-time Analytics",
        description: "Track performance metrics and KPIs in real-time dashboards.",
        icon: React.createElement(BarChart, { className: "w-5 h-5" }),
      },
      {
        title: "Advanced Security",
        description: "SOC 2 certified with end-to-end encryption.",
        icon: React.createElement(Lock, { className: "w-5 h-5" }),
      },
      {
        title: "Team Management",
        description: "Organize teams with roles and permissions.",
        icon: React.createElement(Users, { className: "w-5 h-5" }),
      },
      {
        title: "API Access",
        description: "Full REST and GraphQL API access.",
        icon: React.createElement(Code, { className: "w-5 h-5" }),
      },
    ],
    columns: 4,
  },
  // Minimal variation - 2 columns, no icons
  {
    headline: "Simple yet powerful",
    features: [
      {
        title: "Easy to Use",
        description: "Intuitive interface that anyone can master in minutes.",
      },
      {
        title: "Always Reliable",
        description: "99.99% uptime SLA with redundant infrastructure.",
      },
      {
        title: "Cost Effective",
        description: "Transparent pricing that scales with your business.",
      },
      {
        title: "Expert Support",
        description: "24/7 support from our team of experts.",
      },
    ],
    columns: 2,
  },
  // Product features variation
  {
    headline: "Features that make a difference",
    subheadline: "Designed with your success in mind",
    features: [
      {
        title: "Smart Automation",
        description: "Automate repetitive tasks and save hours every week.",
      },
      {
        title: "Custom Workflows",
        description: "Build workflows that match your unique processes.",
      },
      {
        title: "Integrations",
        description: "Connect with 1000+ apps and services you already use.",
      },
      {
        title: "Mobile Ready",
        description: "Full-featured mobile apps for iOS and Android.",
      },
      {
        title: "Data Export",
        description: "Export your data anytime in multiple formats.",
      },
      {
        title: "Version Control",
        description: "Track changes and restore previous versions easily.",
      },
    ],
    columns: 3,
  },
];