import { DollarSign, Rocket, Shield, Headphones, Code, Globe, Zap, Users } from "lucide-react";
import React from "react";
import type { FeatureAccordionProps } from "./index";

export const defaultContent: FeatureAccordionProps = {
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about our platform and how it can help you succeed",
  features: [
    {
      value: "getting-started",
      title: "How do I get started with your platform?",
      description: "Getting started is incredibly simple. Sign up for a free account, follow our interactive onboarding process, and you'll be up and running in minutes. We provide step-by-step tutorials and documentation to help you make the most of our platform from day one.",
      badge: "Popular",
      icon: React.createElement(Rocket, { className: "w-4 h-4" }),
      points: [
        "Free 14-day trial with no credit card required",
        "Interactive onboarding with guided tutorials",
        "Access to our comprehensive knowledge base",
        "Direct support from our onboarding team",
      ],
    },
    {
      value: "pricing",
      title: "How does your pricing model work?",
      description: "We offer transparent, scalable pricing that grows with your business. Choose from our flexible plans based on your needs, with no hidden fees or surprise charges. All plans include core features, with advanced capabilities available in higher tiers.",
      icon: React.createElement(DollarSign, { className: "w-4 h-4" }),
      points: [
        "Pay-as-you-grow pricing model",
        "Monthly or annual billing options (save 20% annually)",
        "No setup fees or hidden charges",
        "Easy plan upgrades or downgrades anytime",
      ],
    },
    {
      value: "security",
      title: "How secure is my data on your platform?",
      description: "Security is our top priority. We implement industry-leading security measures including end-to-end encryption, regular security audits, and compliance with major standards. Your data is protected by multiple layers of security infrastructure.",
      badge: "Enterprise",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      points: [
        "256-bit AES encryption for data at rest and in transit",
        "SOC 2 Type II and ISO 27001 certified",
        "Regular third-party security audits",
        "GDPR and CCPA compliant",
        "99.99% uptime SLA guarantee",
      ],
    },
    {
      value: "support",
      title: "What kind of support do you offer?",
      description: "We provide comprehensive support to ensure your success. From self-service resources to dedicated support teams, we're here to help you every step of the way. Our support team consists of product experts who understand your business needs.",
      icon: React.createElement(Headphones, { className: "w-4 h-4" }),
      points: [
        "24/7 email and chat support for all plans",
        "Phone support for Pro and Enterprise plans",
        "Extensive documentation and video tutorials",
        "Community forum with active user base",
        "Dedicated success manager for Enterprise accounts",
      ],
    },
    {
      value: "integration",
      title: "Can I integrate with my existing tools?",
      description: "Absolutely! Our platform is designed to work seamlessly with your existing tech stack. We offer native integrations with popular tools and a robust API for custom integrations. Connect your favorite tools and automate your workflows.",
      icon: React.createElement(Code, { className: "w-4 h-4" }),
      points: [
        "100+ native integrations with popular tools",
        "RESTful API and webhooks for custom integrations",
        "Zapier and Make.com support",
        "OAuth 2.0 authentication",
        "Comprehensive API documentation with examples",
      ],
    },
    {
      value: "scalability",
      title: "Can your platform scale with my business?",
      description: "Our infrastructure is built to scale effortlessly with your growth. Whether you're a startup or an enterprise, our platform adapts to your needs with automatic scaling, global CDN, and performance optimization at every level.",
      icon: React.createElement(Globe, { className: "w-4 h-4" }),
      points: [
        "Auto-scaling infrastructure",
        "Global CDN with 200+ edge locations",
        "No limits on users or data",
        "Performance remains consistent at any scale",
      ],
    },
  ],
  type: "single",
  defaultValue: "getting-started",
  variant: "bordered",
};

export const contentVariations = [
  // Technical FAQ variation
  {
    headline: "Technical questions answered",
    subheadline: "Deep dive into the technical aspects of our platform",
    features: [
      {
        value: "api",
        title: "What API capabilities do you offer?",
        description: "Our comprehensive API suite includes RESTful endpoints, GraphQL support, and real-time webhooks for complete platform integration.",
        icon: React.createElement(Code, { className: "w-4 h-4" }),
        points: [
          "Full CRUD operations via REST API",
          "GraphQL endpoint with introspection",
          "Real-time webhooks for event-driven architecture",
          "Rate limiting: 1000 requests/minute",
        ],
      },
      {
        value: "performance",
        title: "What are your performance benchmarks?",
        description: "We maintain industry-leading performance metrics with continuous monitoring and optimization.",
        icon: React.createElement(Zap, { className: "w-4 h-4" }),
        badge: "Fast",
        points: [
          "Average API response time: <100ms",
          "99.99% uptime guarantee",
          "Global CDN for static assets",
          "Database query optimization",
        ],
      },
      {
        value: "stack",
        title: "What technology stack do you use?",
        description: "Built on modern, proven technologies for reliability and performance.",
        points: [
          "Frontend: React with TypeScript",
          "Backend: Node.js with Express",
          "Database: PostgreSQL with Redis caching",
          "Infrastructure: AWS with Kubernetes",
        ],
      },
    ],
    type: "multiple",
    variant: "separated",
  },
  // Simple FAQ variation
  {
    headline: "Quick answers to common questions",
    features: [
      {
        value: "trial",
        title: "Is there a free trial?",
        description: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start.",
      },
      {
        value: "cancel",
        title: "Can I cancel anytime?",
        description: "Absolutely. You can cancel your subscription at any time with no penalties or hidden fees.",
      },
      {
        value: "team",
        title: "Can my team collaborate?",
        description: "Yes, all plans include team collaboration features with role-based permissions and real-time updates.",
        icon: React.createElement(Users, { className: "w-4 h-4" }),
      },
      {
        value: "data",
        title: "Can I export my data?",
        description: "Your data belongs to you. Export everything at any time in standard formats like CSV, JSON, or PDF.",
      },
    ],
  },
];