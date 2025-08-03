import { 
  BarChart, 
  Cloud, 
  Shield, 
  Code, 
  Users, 
  BookOpen,
  Twitter,
  Github,
  Linkedin,
  FileText,
  Briefcase,
  GraduationCap,
  HeadphonesIcon,
  Globe,
  Rocket,
  Lock,
  Cpu
} from "lucide-react";
import React from "react";
import type { FooterMegaProps } from "./index";

export const defaultContent: FooterMegaProps = {
  brand: {
    name: "TechCorp",
    description: "Empowering businesses with cutting-edge technology solutions since 2010",
  },
  columns: [
    {
      title: "Products",
      description: "Tools to power your business",
      links: [
        {
          text: "Analytics Platform",
          href: "/products/analytics",
          description: "Real-time business insights",
          icon: React.createElement(BarChart, { className: "w-4 h-4" }),
          badge: "Popular",
        },
        {
          text: "Cloud Infrastructure",
          href: "/products/cloud",
          description: "Scalable hosting solutions",
          icon: React.createElement(Cloud, { className: "w-4 h-4" }),
        },
        {
          text: "Security Suite",
          href: "/products/security",
          description: "Enterprise-grade protection",
          icon: React.createElement(Shield, { className: "w-4 h-4" }),
          badge: "New",
        },
        {
          text: "Developer Tools",
          href: "/products/devtools",
          description: "Build faster, ship better",
          icon: React.createElement(Code, { className: "w-4 h-4" }),
        },
      ],
    },
    {
      title: "Solutions",
      links: [
        {
          text: "For Startups",
          href: "/solutions/startups",
          description: "Grow from 0 to 1",
          icon: React.createElement(Rocket, { className: "w-4 h-4" }),
        },
        {
          text: "For Enterprise",
          href: "/solutions/enterprise",
          description: "Scale with confidence",
          icon: React.createElement(Briefcase, { className: "w-4 h-4" }),
        },
        {
          text: "For Developers",
          href: "/solutions/developers",
          description: "APIs and SDKs",
          icon: React.createElement(Code, { className: "w-4 h-4" }),
        },
        {
          text: "For Education",
          href: "/solutions/education",
          description: "Special academic pricing",
          icon: React.createElement(GraduationCap, { className: "w-4 h-4" }),
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          text: "Documentation",
          href: "/docs",
          icon: React.createElement(BookOpen, { className: "w-4 h-4" }),
        },
        {
          text: "API Reference",
          href: "/api",
          icon: React.createElement(FileText, { className: "w-4 h-4" }),
        },
        {
          text: "Guides & Tutorials",
          href: "/guides",
          icon: React.createElement(BookOpen, { className: "w-4 h-4" }),
        },
        {
          text: "Blog",
          href: "/blog",
          badge: "Updated",
        },
        {
          text: "Community Forum",
          href: "/community",
          icon: React.createElement(Users, { className: "w-4 h-4" }),
        },
        {
          text: "System Status",
          href: "/status",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          text: "About Us",
          href: "/about",
        },
        {
          text: "Careers",
          href: "/careers",
          badge: "We're hiring!",
        },
        {
          text: "Press Kit",
          href: "/press",
        },
        {
          text: "Partners",
          href: "/partners",
        },
        {
          text: "Investors",
          href: "/investors",
        },
        {
          text: "Contact Sales",
          href: "/contact",
        },
      ],
    },
  ],
  featured: {
    title: "What's New",
    items: [
      {
        title: "AI-Powered Analytics",
        description: "Introducing machine learning insights for better decision making",
        href: "/blog/ai-analytics-launch",
        badge: "Featured",
      },
      {
        title: "2024 State of DevOps Report",
        description: "Industry trends and best practices from 10,000+ developers",
        href: "/resources/devops-report-2024",
      },
      {
        title: "Enterprise Security Webinar",
        description: "Join us Dec 20th for live Q&A with security experts",
        href: "/events/security-webinar",
        badge: "Live Event",
      },
    ],
  },
  search: {
    placeholder: "Search docs, guides, and more...",
    buttonText: "Search",
  },
  bottom: {
    copyright: "All rights reserved.",
    links: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Cookie Settings", href: "/cookies" },
      { text: "Sitemap", href: "/sitemap" },
    ],
    socialLinks: [
      {
        platform: "Twitter",
        href: "https://twitter.com/techcorp",
        icon: React.createElement(Twitter, { className: "w-5 h-5" }),
      },
      {
        platform: "GitHub",
        href: "https://github.com/techcorp",
        icon: React.createElement(Github, { className: "w-5 h-5" }),
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/techcorp",
        icon: React.createElement(Linkedin, { className: "w-5 h-5" }),
      },
    ],
  },
};

export const contentVariations = [
  // SaaS platform footer
  {
    brand: {
      name: "CloudFlow",
      description: "The modern platform for digital transformation",
    },
    columns: [
      {
        title: "Platform",
        links: [
          {
            text: "Infrastructure",
            href: "/platform/infrastructure",
            icon: React.createElement(Cloud, { className: "w-4 h-4" }),
          },
          {
            text: "Security",
            href: "/platform/security",
            icon: React.createElement(Lock, { className: "w-4 h-4" }),
          },
          {
            text: "Integrations",
            href: "/platform/integrations",
            icon: React.createElement(Cpu, { className: "w-4 h-4" }),
          },
          {
            text: "API",
            href: "/platform/api",
            icon: React.createElement(Code, { className: "w-4 h-4" }),
          },
        ],
      },
      {
        title: "Use Cases",
        links: [
          { text: "E-commerce", href: "/use-cases/ecommerce" },
          { text: "Healthcare", href: "/use-cases/healthcare" },
          { text: "Finance", href: "/use-cases/finance" },
          { text: "Education", href: "/use-cases/education" },
        ],
      },
      {
        title: "Support",
        links: [
          {
            text: "Help Center",
            href: "/support",
            icon: React.createElement(HeadphonesIcon, { className: "w-4 h-4" }),
          },
          { text: "Documentation", href: "/docs" },
          { text: "Video Tutorials", href: "/tutorials" },
          { text: "Contact Support", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { text: "Privacy", href: "/privacy" },
          { text: "Terms", href: "/terms" },
          { text: "SLA", href: "/sla" },
          { text: "DPA", href: "/dpa" },
        ],
      },
    ],
    bottom: {
      links: [
        { text: "System Status", href: "/status" },
        { text: "Security", href: "/security" },
      ],
    },
  },
  // Global corporation footer
  {
    brand: {
      name: "GlobalTech",
    },
    columns: [
      {
        title: "Regions",
        links: [
          {
            text: "North America",
            href: "/regions/na",
            icon: React.createElement(Globe, { className: "w-4 h-4" }),
          },
          {
            text: "Europe",
            href: "/regions/eu",
            icon: React.createElement(Globe, { className: "w-4 h-4" }),
          },
          {
            text: "Asia Pacific",
            href: "/regions/apac",
            icon: React.createElement(Globe, { className: "w-4 h-4" }),
          },
          {
            text: "Latin America",
            href: "/regions/latam",
            icon: React.createElement(Globe, { className: "w-4 h-4" }),
          },
        ],
      },
      {
        title: "Industries",
        links: [
          { text: "Automotive", href: "/industries/automotive" },
          { text: "Retail", href: "/industries/retail" },
          { text: "Manufacturing", href: "/industries/manufacturing" },
          { text: "Technology", href: "/industries/technology" },
        ],
      },
      {
        title: "Services",
        links: [
          { text: "Consulting", href: "/services/consulting" },
          { text: "Implementation", href: "/services/implementation" },
          { text: "Support", href: "/services/support" },
          { text: "Training", href: "/services/training" },
        ],
      },
      {
        title: "About",
        links: [
          { text: "Leadership", href: "/about/leadership" },
          { text: "Locations", href: "/about/locations" },
          { text: "Sustainability", href: "/about/sustainability" },
          { text: "Newsroom", href: "/newsroom" },
        ],
      },
    ],
    bottom: {
      copyright: "A Global Technology Leader",
    },
  },
];