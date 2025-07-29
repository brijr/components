import { PricingEnterpriseProps } from "./index";
import { Shield, Zap, Users, HeadphonesIcon, Globe, Building2, Lock, BarChart, Rocket } from "lucide-react";
import React from "react";

export const defaultContent: PricingEnterpriseProps = {
  headline: "Enterprise solutions tailored to your needs",
  subheadline: "Get custom pricing, dedicated support, and advanced features for your organization",
  features: [
    {
      icon: React.createElement(Shield, { className: "w-5 h-5" }),
      title: "Advanced Security",
      description: "Enterprise-grade security with SSO, 2FA, audit logs, and compliance certifications",
    },
    {
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
      title: "Unlimited Scale",
      description: "Handle millions of requests with dedicated infrastructure and guaranteed uptime",
    },
    {
      icon: React.createElement(Users, { className: "w-5 h-5" }),
      title: "Team Management",
      description: "Advanced user roles, permissions, and provisioning with SCIM support",
    },
    {
      icon: React.createElement(HeadphonesIcon, { className: "w-5 h-5" }),
      title: "Priority Support",
      description: "24/7 dedicated support team with guaranteed response times and SLAs",
    },
    {
      icon: React.createElement(Globe, { className: "w-5 h-5" }),
      title: "Global Infrastructure",
      description: "Deploy across multiple regions with data residency and compliance options",
    },
    {
      icon: React.createElement(Building2, { className: "w-5 h-5" }),
      title: "Custom Solutions",
      description: "Tailored features, integrations, and workflows built for your business",
    },
  ],
  primaryCTA: {
    text: "Contact Sales",
    href: "/contact-sales",
  },
  secondaryCTA: {
    text: "Schedule Demo",
    href: "/demo",
  },
  logos: {
    headline: "Trusted by industry leaders",
    images: [
      { src: "https://via.placeholder.com/120x40", alt: "Company 1" },
      { src: "https://via.placeholder.com/120x40", alt: "Company 2" },
      { src: "https://via.placeholder.com/120x40", alt: "Company 3" },
      { src: "https://via.placeholder.com/120x40", alt: "Company 4" },
      { src: "https://via.placeholder.com/120x40", alt: "Company 5" },
    ],
  },
};

export const contentVariations: PricingEnterpriseProps[] = [
  // Security-focused enterprise
  {
    headline: "Enterprise-grade security for your data",
    subheadline: "Meet the strictest compliance requirements with our enterprise platform",
    features: [
      {
        icon: React.createElement(Lock, { className: "w-5 h-5" }),
        title: "SOC 2 Type II Certified",
        description: "Annual audits ensure the highest standards of security and availability",
      },
      {
        icon: React.createElement(Shield, { className: "w-5 h-5" }),
        title: "HIPAA Compliant",
        description: "Safeguard sensitive health information with built-in compliance features",
      },
      {
        icon: React.createElement(Globe, { className: "w-5 h-5" }),
        title: "GDPR Ready",
        description: "Full data privacy controls and right to erasure support",
      },
      {
        icon: React.createElement(Building2, { className: "w-5 h-5" }),
        title: "On-Premise Option",
        description: "Deploy within your own infrastructure for complete control",
      },
      {
        icon: React.createElement(Users, { className: "w-5 h-5" }),
        title: "Advanced Access Control",
        description: "Role-based permissions, IP allowlisting, and session management",
      },
      {
        icon: React.createElement(BarChart, { className: "w-5 h-5" }),
        title: "Compliance Reporting",
        description: "Automated reports for audits and regulatory requirements",
      },
    ],
    primaryCTA: {
      text: "Request Security Overview",
      href: "/security",
    },
    secondaryCTA: {
      text: "Talk to Compliance Team",
      href: "/compliance-contact",
    },
  },
  // API/Developer focused
  {
    headline: "Built for developers, trusted by enterprises",
    features: [
      {
        icon: React.createElement(Zap, { className: "w-5 h-5" }),
        title: "99.99% Uptime SLA",
        description: "Guaranteed availability with credits for any downtime",
      },
      {
        icon: React.createElement(Rocket, { className: "w-5 h-5" }),
        title: "Unlimited API Calls",
        description: "No rate limits with dedicated infrastructure",
      },
      {
        title: "White-Glove Onboarding",
        description: "Expert integration support and custom implementation",
      },
      {
        title: "Custom SLAs",
        description: "Tailored service agreements to meet your requirements",
      },
      {
        title: "Dedicated Endpoints",
        description: "Isolated infrastructure for maximum performance",
      },
      {
        title: "Priority Roadmap Input",
        description: "Direct influence on product development and features",
      },
    ],
    primaryCTA: {
      text: "Get Custom Quote",
      href: "/enterprise-quote",
    },
  },
  // Financial services
  {
    headline: "Financial-grade infrastructure",
    subheadline: "Trusted by banks, fintechs, and payment processors worldwide",
    features: [
      {
        title: "PCI DSS Level 1",
        description: "Highest level of payment security certification",
      },
      {
        title: "Real-time Fraud Detection",
        description: "ML-powered monitoring and instant alerts",
      },
      {
        title: "Multi-region Redundancy",
        description: "Automatic failover and disaster recovery",
      },
      {
        title: "Encryption at Rest",
        description: "AES-256 encryption for all stored data",
      },
      {
        title: "Regulatory Compliance",
        description: "Meet requirements for SEC, FINRA, and more",
      },
      {
        title: "Audit Trail",
        description: "Complete transaction history and compliance logs",
      },
    ],
    primaryCTA: {
      text: "Schedule Compliance Call",
      href: "/fintech-contact",
    },
    secondaryCTA: {
      text: "Download Security Whitepaper",
      href: "/security-whitepaper",
    },
    logos: {
      headline: "Powering the world's leading financial institutions",
      images: [
        { src: "https://via.placeholder.com/120x40", alt: "Bank 1" },
        { src: "https://via.placeholder.com/120x40", alt: "Bank 2" },
        { src: "https://via.placeholder.com/120x40", alt: "Fintech 1" },
        { src: "https://via.placeholder.com/120x40", alt: "Fintech 2" },
      ],
    },
  },
  // Simple enterprise
  {
    headline: "Enterprise features without the complexity",
    features: [
      {
        title: "Dedicated Account Team",
        description: "Your success is our priority with personalized support",
      },
      {
        title: "Custom Contracts",
        description: "Flexible terms that work for your organization",
      },
      {
        title: "Volume Discounts",
        description: "Better pricing as you scale your usage",
      },
      {
        title: "Training & Onboarding",
        description: "Get your team up to speed quickly",
      },
    ],
    primaryCTA: {
      text: "Talk to Sales",
      href: "/sales",
    },
  },
];