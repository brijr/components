import {
  Cloud,
  Shield,
  Zap,
  Globe,
  Lock,
  Sparkles,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import React from "react";
import type { FooterAppProps } from "./index";

export const defaultContent: FooterAppProps = {
  app: {
    name: "TaskFlow",
    tagline: "Your personal productivity companion",
    description:
      "Join millions of users who've transformed their daily workflow. Available on all your devices.",
    rating: {
      score: 4.8,
      reviews: "50K+",
    },
    features: [
      {
        icon: React.createElement(Cloud, { className: "w-5 h-5" }),
        title: "Sync Everywhere",
        description: "Access your tasks on all devices",
      },
      {
        icon: React.createElement(Shield, { className: "w-5 h-5" }),
        title: "Secure & Private",
        description: "End-to-end encryption",
      },
      {
        icon: React.createElement(Zap, { className: "w-5 h-5" }),
        title: "Lightning Fast",
        description: "Optimized for performance",
      },
      {
        icon: React.createElement(Sparkles, { className: "w-5 h-5" }),
        title: "Smart Features",
        description: "AI-powered suggestions",
      },
    ],
    stores: [
      {
        name: "App Store",
        href: "https://apps.apple.com/app/taskflow",
        badge:
          "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
        alt: "Download on the App Store",
      },
      {
        name: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.taskflow",
        badge:
          "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
        alt: "Get it on Google Play",
      },
    ],
    qrCode: {
      src: "/placeholder.svg",
      text: "Scan to download",
    },
    preview: {
      src: "/placeholder.svg",
      alt: "TaskFlow App Preview",
      width: 300,
      height: 600,
    },
  },
  links: [
    { text: "Features", href: "/features" },
    { text: "Pricing", href: "/pricing" },
    { text: "Support", href: "/support" },
    { text: "Blog", href: "/blog" },
    { text: "Privacy", href: "/privacy" },
    { text: "Terms", href: "/terms" },
  ],
  socialLinks: [
    {
      platform: "Twitter",
      href: "https://twitter.com/taskflow",
      icon: React.createElement(Twitter, { className: "w-5 h-5" }),
    },
    {
      platform: "Facebook",
      href: "https://facebook.com/taskflow",
      icon: React.createElement(Facebook, { className: "w-5 h-5" }),
    },
    {
      platform: "Instagram",
      href: "https://instagram.com/taskflow",
      icon: React.createElement(Instagram, { className: "w-5 h-5" }),
    },
  ],
  copyright: "All rights reserved.",
};

export const contentVariations = [
  // Gaming app footer
  {
    app: {
      name: "Epic Quest",
      tagline: "Adventure awaits",
      description:
        "Embark on the ultimate mobile RPG experience. Play with friends, conquer dungeons, and become a legend.",
      rating: {
        score: 4.9,
        reviews: "1M+",
      },
      features: [
        {
          icon: React.createElement(Globe, { className: "w-5 h-5" }),
          title: "Massive World",
          description: "Explore endless realms",
        },
        {
          icon: React.createElement(Zap, { className: "w-5 h-5" }),
          title: "Real-time PvP",
          description: "Battle players worldwide",
        },
      ],
      stores: [
        {
          name: "App Store",
          href: "https://apps.apple.com/app/epic-quest",
          badge:
            "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
          alt: "Download on the App Store",
        },
        {
          name: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.epicquest",
          badge:
            "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
          alt: "Get it on Google Play",
        },
      ],
    },
    links: [
      { text: "Game Guide", href: "/guide" },
      { text: "Community", href: "/community" },
      { text: "Support", href: "/support" },
      { text: "News", href: "/news" },
    ],
  },
  // Finance app footer
  {
    app: {
      name: "WealthTrack",
      tagline: "Smart investing made simple",
      description:
        "Take control of your financial future with intelligent portfolio management.",
      features: [
        {
          icon: React.createElement(Lock, { className: "w-5 h-5" }),
          title: "Bank-level Security",
          description: "Your data is protected",
        },
        {
          icon: React.createElement(Sparkles, { className: "w-5 h-5" }),
          title: "AI Insights",
          description: "Personalized recommendations",
        },
      ],
      stores: [
        {
          name: "App Store",
          href: "https://apps.apple.com/app/wealthtrack",
          badge:
            "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
          alt: "Download on the App Store",
        },
        {
          name: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.wealthtrack",
          badge:
            "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
          alt: "Get it on Google Play",
        },
      ],
    },
    links: [
      { text: "Security", href: "/security" },
      { text: "Help Center", href: "/help" },
      { text: "Legal", href: "/legal" },
    ],
  },
];
