import { FAQGridProps } from "./index";
import { CreditCard, Shield, Zap, Users, Globe, HeadphonesIcon } from "lucide-react";
import React from "react";

export const defaultContent: FAQGridProps = {
  headline: "Frequently asked questions",
  subheadline: "Quick answers to common questions about our service",
  items: [
    {
      question: "What is included in the free plan?",
      answer: "The free plan includes up to 3 projects, basic features, 1GB storage, and community support. It's perfect for individuals and small teams just getting started.",
      icon: React.createElement(Zap, { className: "w-5 h-5 text-primary" }),
    },
    {
      question: "How secure is my data?",
      answer: "We use bank-level encryption for all data transmission and storage. Our infrastructure is SOC 2 certified and we perform regular security audits to ensure your data remains safe.",
      icon: React.createElement(Shield, { className: "w-5 h-5 text-primary" }),
    },
    {
      question: "Can I add team members?",
      answer: "Yes! All paid plans support multiple team members. The number of seats depends on your plan. You can add or remove team members anytime from your dashboard.",
      icon: React.createElement(Users, { className: "w-5 h-5 text-primary" }),
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and ACH transfers for annual plans. Enterprise customers can also pay by invoice with NET 30 terms.",
      icon: React.createElement(CreditCard, { className: "w-5 h-5 text-primary" }),
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee. Enterprise customers may have one-time onboarding fees for custom implementations.",
      icon: React.createElement(Globe, { className: "w-5 h-5 text-primary" }),
    },
    {
      question: "What kind of support is available?",
      answer: "Free users get community support. Paid plans include email support with guaranteed response times. Pro and Enterprise plans also get phone support and a dedicated account manager.",
      icon: React.createElement(HeadphonesIcon, { className: "w-5 h-5 text-primary" }),
    },
  ],
  columns: 2,
  contactInfo: {
    headline: "Still have questions?",
    description: "Our support team is ready to help you get started",
    email: "support@example.com",
    phone: "+1 (555) 123-4567",
    cta: {
      text: "Contact Support",
      href: "/support",
    },
  },
};

export const contentVariations: FAQGridProps[] = [
  // 3-column layout
  {
    headline: "Quick answers",
    items: [
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page. We'll email you a reset link that's valid for 24 hours.",
      },
      {
        question: "Can I export my data?",
        answer: "Yes, you can export all your data in CSV, JSON, or PDF format from your account settings.",
      },
      {
        question: "Do you have an API?",
        answer: "Yes, we offer a RESTful API for all paid plans. Check our developer docs for details.",
      },
      {
        question: "What browsers are supported?",
        answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. Mobile browsers are also supported.",
      },
      {
        question: "Is there a mobile app?",
        answer: "Yes, we have native apps for iOS and Android available on the App Store and Google Play.",
      },
      {
        question: "Can I white-label the platform?",
        answer: "White-labeling is available for Enterprise plans with custom branding and domain options.",
      },
    ],
    columns: 3,
    cta: {
      text: "View All FAQs",
      href: "/faq",
    },
  },
  // Account & billing focus
  {
    headline: "Account & Billing",
    subheadline: "Common questions about managing your account",
    items: [
      {
        question: "How do I update my billing information?",
        answer: "Go to Settings > Billing in your dashboard. You can update your payment method, billing address, and download invoices.",
      },
      {
        question: "Can I get a receipt for my purchase?",
        answer: "Yes, receipts are automatically emailed after each payment. You can also download them from your billing history in the dashboard.",
      },
      {
        question: "What happens when I reach my plan limits?",
        answer: "We'll notify you at 80% and 100% of your limits. You can upgrade your plan or purchase add-ons to increase specific limits.",
      },
      {
        question: "Do you offer educational discounts?",
        answer: "Yes, we offer 50% off for students and educators with valid .edu email addresses. Non-profits also qualify for discounted pricing.",
      },
    ],
    columns: 2,
  },
  // Technical FAQ
  {
    headline: "Technical questions",
    items: [
      {
        question: "What are the system requirements?",
        answer: "Our web app works on any modern browser. The desktop app requires Windows 10+, macOS 10.14+, or Ubuntu 18.04+. Mobile apps require iOS 13+ or Android 8+.",
      },
      {
        question: "How often is data backed up?",
        answer: "We perform continuous backups with point-in-time recovery. Your data is replicated across multiple geographic regions for redundancy.",
      },
      {
        question: "Can I integrate with my existing tools?",
        answer: "Yes, we offer native integrations with 100+ popular tools and a Zapier integration for connecting to 3000+ other apps.",
      },
      {
        question: "What's your uptime guarantee?",
        answer: "We guarantee 99.9% uptime for all paid plans, with service credits available if we fall below this threshold. Check our SLA for details.",
      },
      {
        question: "How do I report bugs or request features?",
        answer: "Use the feedback button in your dashboard or email feedback@example.com. We review all submissions and update our public roadmap quarterly.",
      },
      {
        question: "Is two-factor authentication available?",
        answer: "Yes, we support 2FA via SMS, authenticator apps, and hardware keys. Enterprise plans can enforce 2FA for all team members.",
      },
    ],
    columns: 2,
    contactInfo: {
      headline: "Need technical assistance?",
      description: "Our technical support team can help with any issues",
      cta: {
        text: "Open Support Ticket",
        href: "/support/new",
      },
    },
  },
];