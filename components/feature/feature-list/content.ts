import { FeatureListProps } from "./index";
import { BarChart, Shield, Zap, Globe, Users, Sparkles, Database, Cloud } from "lucide-react";
import React from "react";

export const defaultContent: FeatureListProps = {
  headline: "Why teams choose our platform",
  subheadline: "Everything you need to build, deploy, and scale your applications",
  features: [
    {
      title: "Advanced Analytics Dashboard",
      description: "Get deep insights into your application performance with real-time analytics, custom metrics, and detailed reports that help you make data-driven decisions.",
      icon: React.createElement(BarChart, { className: "w-6 h-6" }),
    },
    {
      title: "Enterprise-Grade Security",
      description: "Rest easy with SOC 2 Type II certification, end-to-end encryption, regular security audits, and compliance with major industry standards including GDPR and HIPAA.",
      icon: React.createElement(Shield, { className: "w-6 h-6" }),
    },
    {
      title: "Lightning Fast Performance",
      description: "Experience sub-second response times with our globally distributed CDN, optimized caching strategies, and auto-scaling infrastructure that grows with your needs.",
      icon: React.createElement(Zap, { className: "w-6 h-6" }),
    },
    {
      title: "Global Infrastructure",
      description: "Deploy to 35+ data centers worldwide with automatic failover, load balancing, and edge computing capabilities for the best user experience anywhere.",
      icon: React.createElement(Globe, { className: "w-6 h-6" }),
    },
    {
      title: "Team Collaboration Tools",
      description: "Work together seamlessly with built-in version control, code review workflows, shared environments, and granular permission controls for teams of any size.",
      icon: React.createElement(Users, { className: "w-6 h-6" }),
    },
  ],
  maxWidth: "lg",
};

export const contentVariations: FeatureListProps[] = [
  // AI/ML focused variation
  {
    headline: "Powered by cutting-edge AI",
    subheadline: "Leverage the latest in artificial intelligence and machine learning",
    features: [
      {
        title: "Smart Recommendations",
        description: "Our AI analyzes user behavior patterns to provide personalized recommendations that improve engagement and conversion rates.",
        icon: React.createElement(Sparkles, { className: "w-6 h-6" }),
      },
      {
        title: "Automated Insights",
        description: "Machine learning algorithms continuously analyze your data to surface actionable insights and optimization opportunities.",
        icon: React.createElement(BarChart, { className: "w-6 h-6" }),
      },
      {
        title: "Natural Language Processing",
        description: "Advanced NLP capabilities enable intelligent search, content analysis, and automated categorization of your data.",
        icon: React.createElement(Database, { className: "w-6 h-6" }),
      },
      {
        title: "Predictive Analytics",
        description: "Forecast trends and anticipate user needs with our sophisticated predictive modeling and time-series analysis.",
        icon: React.createElement(Cloud, { className: "w-6 h-6" }),
      },
    ],
    maxWidth: "md",
  },
  // Simple variation without icons
  {
    headline: "Built for developers, by developers",
    features: [
      {
        title: "RESTful API",
        description: "Comprehensive REST API with detailed documentation, SDKs in 10+ languages, and interactive API explorer.",
      },
      {
        title: "CLI Tools",
        description: "Powerful command-line interface for automation, scripting, and integration with your existing workflows.",
      },
      {
        title: "Webhooks & Events",
        description: "Real-time event notifications with customizable webhooks, retry logic, and event filtering.",
      },
      {
        title: "Infrastructure as Code",
        description: "Define and manage your infrastructure using familiar tools like Terraform, CloudFormation, and Pulumi.",
      },
      {
        title: "Local Development",
        description: "Full-featured local development environment with hot reloading, debugging tools, and production parity.",
      },
      {
        title: "Extensive Documentation",
        description: "Comprehensive guides, tutorials, API references, and example projects to help you succeed.",
      },
    ],
    maxWidth: "lg",
  },
  // Compact variation
  {
    headline: "Everything in one place",
    features: [
      {
        title: "Unified Dashboard",
        description: "Single pane of glass for all your metrics, logs, and alerts.",
        icon: React.createElement(BarChart, { className: "w-6 h-6" }),
      },
      {
        title: "Automated Workflows",
        description: "Build complex automation with our visual workflow builder.",
        icon: React.createElement(Zap, { className: "w-6 h-6" }),
      },
      {
        title: "24/7 Support",
        description: "Expert support team available around the clock via chat, email, and phone.",
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
    ],
    maxWidth: "sm",
  },
];