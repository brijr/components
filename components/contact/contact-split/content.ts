import { ContactSplitProps } from "./index";
import { Mail, Phone, MessageCircle, MapPin, Headphones } from "lucide-react";
import React from "react";

export const defaultContent: ContactSplitProps = {
  headline: "Let's start a conversation",
  subheadline: "Choose your preferred way to reach us or send a message directly",
  contactMethods: [
    {
      icon: React.createElement(Mail, { className: "w-5 h-5" }),
      title: "Email us",
      description: "Send us an email anytime",
      action: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      icon: React.createElement(Phone, { className: "w-5 h-5" }),
      title: "Call us",
      description: "Mon-Fri from 8am to 6pm",
      action: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      badge: "Toll-free",
    },
    {
      icon: React.createElement(MessageCircle, { className: "w-5 h-5" }),
      title: "Live chat",
      description: "Chat with our support team",
      action: "Start a conversation",
      href: "#chat",
      badge: "Online now",
    },
  ],
  form: {
    title: "Send us a message",
    description: "Fill out the form below and we'll get back to you within 24 hours.",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Your name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "your@email.com",
        required: true,
      },
      {
        name: "phone",
        label: "Phone (optional)",
        type: "tel",
        placeholder: "+1 (555) 123-4567",
        required: false,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us how we can help...",
        rows: 4,
        required: true,
      },
    ],
    submitText: "Send message",
    successMessage: "Thank you for your message. We'll get back to you within 24 hours.",
  },
  additionalInfo: [
    {
      title: "Office hours",
      items: [
        "Monday - Friday: 8:00 AM - 6:00 PM PST",
        "Saturday: 9:00 AM - 4:00 PM PST",
        "Sunday: Closed",
        "Holidays: Closed",
      ],
    },
    {
      title: "Response times",
      items: [
        "Email: Within 24 hours",
        "Phone: Immediate during office hours",
        "Live chat: Within 5 minutes",
      ],
    },
  ],
};

export const contentVariations: ContactSplitProps[] = [
  // Sales-focused
  {
    headline: "Talk to our sales team",
    subheadline: "Ready to learn how we can help your business grow?",
    contactMethods: [
      {
        icon: React.createElement(Phone, { className: "w-5 h-5" }),
        title: "Call sales",
        description: "Speak with a sales representative",
        action: "+1 (555) 999-8888",
        href: "tel:+15559998888",
        badge: "Priority line",
      },
      {
        icon: React.createElement(Mail, { className: "w-5 h-5" }),
        title: "Email sales",
        description: "Get a detailed response",
        action: "sales@example.com",
        href: "mailto:sales@example.com",
      },
      {
        icon: React.createElement(MessageCircle, { className: "w-5 h-5" }),
        title: "Schedule a demo",
        description: "See our product in action",
        action: "Book a 30-min demo",
        href: "/demo",
      },
    ],
    form: {
      title: "Request a quote",
      fields: [
        {
          name: "name",
          label: "Full name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Work email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
        },
        {
          name: "company",
          label: "Company name",
          type: "text",
          required: true,
        },
        {
          name: "employees",
          label: "Number of employees",
          type: "text",
          placeholder: "e.g., 50-100",
          required: true,
        },
        {
          name: "message",
          label: "Tell us about your needs",
          type: "textarea",
          rows: 3,
          required: false,
        },
      ],
      submitText: "Get a quote",
      successMessage: "Thanks! Our sales team will contact you within 24 hours.",
    },
  },
  // Support-focused
  {
    headline: "Get support",
    subheadline: "We're here to help you succeed",
    contactMethods: [
      {
        icon: React.createElement(Headphones, { className: "w-5 h-5" }),
        title: "24/7 Support",
        description: "For urgent issues",
        action: "+1 (555) 111-2222",
        href: "tel:+15551112222",
        badge: "24/7",
      },
      {
        icon: React.createElement(MessageCircle, { className: "w-5 h-5" }),
        title: "Live chat",
        description: "Average wait time: 2 min",
        action: "Chat with support",
        href: "#chat",
        badge: "Recommended",
      },
      {
        icon: React.createElement(Mail, { className: "w-5 h-5" }),
        title: "Support ticket",
        description: "For non-urgent issues",
        action: "support@example.com",
        href: "mailto:support@example.com",
      },
    ],
    form: {
      title: "Open a support ticket",
      description: "Describe your issue and we'll help you resolve it",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "account_id",
          label: "Account ID (if known)",
          type: "text",
          required: false,
        },
        {
          name: "issue",
          label: "Describe your issue",
          type: "textarea",
          rows: 5,
          required: true,
        },
      ],
      submitText: "Submit ticket",
    },
    additionalInfo: [
      {
        title: "Support levels",
        items: [
          "Basic: Email support (48h response)",
          "Pro: Priority support (24h response)",
          "Enterprise: Dedicated support (2h response)",
        ],
      },
      {
        title: "Resources",
        items: [
          "Knowledge base: help.example.com",
          "Video tutorials: learn.example.com",
          "API docs: docs.example.com",
        ],
      },
    ],
  },
  // Minimal
  {
    headline: "Contact us",
    contactMethods: [
      {
        icon: React.createElement(Mail, { className: "w-5 h-5" }),
        title: "Email",
        description: "Best for detailed inquiries",
        action: "info@example.com",
        href: "mailto:info@example.com",
      },
      {
        icon: React.createElement(Phone, { className: "w-5 h-5" }),
        title: "Phone",
        description: "Quick questions",
        action: "+1 (555) 123-4567",
        href: "tel:+15551234567",
      },
    ],
    form: {
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          rows: 6,
          required: true,
        },
      ],
    },
  },
  // International
  {
    headline: "Global offices",
    subheadline: "Connect with our teams around the world",
    contactMethods: [
      {
        icon: React.createElement(MapPin, { className: "w-5 h-5" }),
        title: "Americas",
        description: "US, Canada, Brazil",
        action: "+1 (555) 123-4567",
        href: "tel:+15551234567",
      },
      {
        icon: React.createElement(MapPin, { className: "w-5 h-5" }),
        title: "Europe",
        description: "UK, Germany, France",
        action: "+44 20 7123 4567",
        href: "tel:+442071234567",
      },
      {
        icon: React.createElement(MapPin, { className: "w-5 h-5" }),
        title: "Asia Pacific",
        description: "Singapore, Japan, Australia",
        action: "+65 6123 4567",
        href: "tel:+6561234567",
      },
    ],
    form: {
      title: "Send a message",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "region",
          label: "Your region",
          type: "text",
          placeholder: "e.g., North America",
          required: true,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          rows: 4,
          required: true,
        },
      ],
    },
    additionalInfo: [
      {
        title: "Languages",
        items: [
          "English (24/7)",
          "Spanish, French, German (Business hours)",
          "Japanese, Mandarin (APAC hours)",
        ],
      },
    ],
  },
];