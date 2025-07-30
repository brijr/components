import { ContactCardsProps } from "./index";
import { Headphones, Briefcase, Users, Globe, Shield, Zap } from "lucide-react";
import React from "react";

export const defaultContent: ContactCardsProps = {
  headline: "How can we help?",
  subheadline: "Choose the best way to reach our team",
  cards: [
    {
      icon: React.createElement(Headphones, { className: "w-6 h-6" }),
      title: "Customer Support",
      description: "Get help with your account or technical issues",
      details: [
        {
          label: "Email",
          value: "support@example.com",
          href: "mailto:support@example.com",
        },
        {
          label: "Phone",
          value: "+1 (555) 111-2222",
          href: "tel:+15551112222",
        },
        {
          label: "Hours",
          value: "24/7 support",
        },
      ],
      action: {
        text: "Open ticket",
        href: "/support",
      },
      badge: "Most popular",
      featured: true,
    },
    {
      icon: React.createElement(Briefcase, { className: "w-6 h-6" }),
      title: "Sales Team",
      description: "Learn how our solutions can help your business",
      details: [
        {
          label: "Email",
          value: "sales@example.com",
          href: "mailto:sales@example.com",
        },
        {
          label: "Phone",
          value: "+1 (555) 999-8888",
          href: "tel:+15559998888",
        },
        {
          label: "Hours",
          value: "Mon-Fri 9AM-6PM EST",
        },
      ],
      action: {
        text: "Schedule demo",
        href: "/demo",
      },
    },
    {
      icon: React.createElement(Users, { className: "w-6 h-6" }),
      title: "Partnerships",
      description: "Explore partnership and integration opportunities",
      details: [
        {
          label: "Email",
          value: "partners@example.com",
          href: "mailto:partners@example.com",
        },
        {
          label: "Phone",
          value: "+1 (555) 777-6666",
          href: "tel:+15557776666",
        },
        {
          label: "Response",
          value: "Within 48 hours",
        },
      ],
      action: {
        text: "Apply now",
        href: "/partners",
      },
    },
  ],
  columns: 3,
  cta: {
    title: "Can't find what you're looking for?",
    description: "Our general inquiries team can help direct you to the right department",
    action: {
      text: "Contact general inquiries",
      href: "/contact",
    },
  },
};

export const contentVariations: ContactCardsProps[] = [
  // Department-based
  {
    headline: "Contact our departments",
    subheadline: "Direct lines to specialized teams",
    cards: [
      {
        icon: React.createElement(Shield, { className: "w-6 h-6" }),
        title: "Security Team",
        description: "Report security issues or vulnerabilities",
        details: [
          {
            label: "Email",
            value: "security@example.com",
            href: "mailto:security@example.com",
          },
          {
            label: "PGP Key",
            value: "Download key",
            href: "/pgp-key",
          },
          {
            label: "Response",
            value: "Within 24 hours",
          },
        ],
        action: {
          text: "Report issue",
          href: "/security/report",
        },
        badge: "Encrypted",
      },
      {
        icon: React.createElement(Zap, { className: "w-6 h-6" }),
        title: "Technical Team",
        description: "API support and technical integration help",
        details: [
          {
            label: "Email",
            value: "tech@example.com",
            href: "mailto:tech@example.com",
          },
          {
            label: "Discord",
            value: "Join server",
            href: "/discord",
          },
          {
            label: "Docs",
            value: "View documentation",
            href: "/docs",
          },
        ],
        action: {
          text: "View API status",
          href: "/status",
        },
      },
      {
        icon: React.createElement(Briefcase, { className: "w-6 h-6" }),
        title: "Enterprise Sales",
        description: "Custom solutions for large organizations",
        details: [
          {
            label: "Email",
            value: "enterprise@example.com",
            href: "mailto:enterprise@example.com",
          },
          {
            label: "Phone",
            value: "+1 (555) 888-9999",
            href: "tel:+15558889999",
          },
          {
            label: "Min seats",
            value: "100+ users",
          },
        ],
        action: {
          text: "Get enterprise pricing",
          href: "/enterprise",
        },
        featured: true,
      },
    ],
    columns: 3,
  },
  // Regional offices
  {
    headline: "Global presence",
    subheadline: "Connect with our offices worldwide",
    cards: [
      {
        icon: React.createElement(Globe, { className: "w-6 h-6" }),
        title: "North America",
        description: "Headquarters and main operations",
        details: [
          {
            label: "Location",
            value: "San Francisco, CA",
          },
          {
            label: "Phone",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
          },
          {
            label: "Email",
            value: "na@example.com",
            href: "mailto:na@example.com",
          },
          {
            label: "Timezone",
            value: "PST (UTC-8)",
          },
        ],
        featured: true,
      },
      {
        icon: React.createElement(Globe, { className: "w-6 h-6" }),
        title: "Europe",
        description: "European headquarters",
        details: [
          {
            label: "Location",
            value: "London, UK",
          },
          {
            label: "Phone",
            value: "+44 20 7123 4567",
            href: "tel:+442071234567",
          },
          {
            label: "Email",
            value: "eu@example.com",
            href: "mailto:eu@example.com",
          },
          {
            label: "Timezone",
            value: "GMT (UTC+0)",
          },
        ],
      },
      {
        icon: React.createElement(Globe, { className: "w-6 h-6" }),
        title: "Asia Pacific",
        description: "APAC operations center",
        details: [
          {
            label: "Location",
            value: "Singapore",
          },
          {
            label: "Phone",
            value: "+65 6123 4567",
            href: "tel:+6561234567",
          },
          {
            label: "Email",
            value: "apac@example.com",
            href: "mailto:apac@example.com",
          },
          {
            label: "Timezone",
            value: "SGT (UTC+8)",
          },
        ],
      },
      {
        icon: React.createElement(Globe, { className: "w-6 h-6" }),
        title: "Latin America",
        description: "LATAM support center",
        details: [
          {
            label: "Location",
            value: "São Paulo, Brazil",
          },
          {
            label: "Phone",
            value: "+55 11 1234 5678",
            href: "tel:+551112345678",
          },
          {
            label: "Email",
            value: "latam@example.com",
            href: "mailto:latam@example.com",
          },
          {
            label: "Timezone",
            value: "BRT (UTC-3)",
          },
        ],
      },
    ],
    columns: 4,
    cta: {
      title: "Need immediate assistance?",
      description: "Our global support team is available 24/7",
      action: {
        text: "Get support now",
        href: "/support",
      },
    },
  },
  // Service types
  {
    headline: "Choose your service",
    cards: [
      {
        icon: React.createElement(Zap, { className: "w-6 h-6" }),
        title: "Emergency Support",
        description: "For critical issues affecting your business",
        details: [
          {
            label: "Hotline",
            value: "+1 (555) 911-0000",
            href: "tel:+15559110000",
          },
          {
            label: "Available",
            value: "24/7/365",
          },
          {
            label: "Response",
            value: "< 15 minutes",
          },
        ],
        action: {
          text: "Call now",
          href: "tel:+15559110000",
        },
        badge: "Critical",
        featured: true,
      },
      {
        icon: React.createElement(Users, { className: "w-6 h-6" }),
        title: "Account Management",
        description: "For existing customers",
        details: [
          {
            label: "Email",
            value: "accounts@example.com",
            href: "mailto:accounts@example.com",
          },
          {
            label: "Portal",
            value: "Customer portal",
            href: "/portal",
          },
          {
            label: "Hours",
            value: "Business hours",
          },
        ],
        action: {
          text: "Access portal",
          href: "/portal",
        },
      },
    ],
    columns: 2,
  },
];