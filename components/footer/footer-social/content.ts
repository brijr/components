import { Twitter, Instagram, Linkedin, Youtube, Facebook, Github } from "lucide-react";
import React from "react";
import type { FooterSocialProps } from "./index";

export const defaultContent: FooterSocialProps = {
  brand: {
    name: "Acme Inc",
    tagline: "Follow us everywhere",
  },
  socialPlatforms: [
    {
      name: "Twitter",
      href: "https://twitter.com/acme",
      icon: React.createElement(Twitter, { className: "w-6 h-6" }),
      followers: "125K",
      colorClass: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/acme",
      icon: React.createElement(Instagram, { className: "w-6 h-6" }),
      followers: "340K",
      colorClass: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/acme",
      icon: React.createElement(Linkedin, { className: "w-6 h-6" }),
      followers: "89K",
      colorClass: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@acme",
      icon: React.createElement(Youtube, { className: "w-6 h-6" }),
      followers: "210K",
      colorClass: "hover:text-red-600",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/acme",
      icon: React.createElement(Facebook, { className: "w-6 h-6" }),
      followers: "1.2M",
      colorClass: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      href: "https://github.com/acme",
      icon: React.createElement(Github, { className: "w-6 h-6" }),
      followers: "45K",
      colorClass: "hover:text-gray-600 dark:hover:text-gray-300",
    },
  ],
  socialCta: {
    title: "Join our growing community",
    description: "Be the first to know about new products, exclusive deals, and company updates. Follow us on your favorite platform.",
  },
  quickLinks: [
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
    { text: "Privacy", href: "/privacy" },
    { text: "Terms", href: "/terms" },
  ],
  copyright: "All rights reserved.",
};

export const contentVariations = [
  // Minimal social footer
  {
    brand: {
      name: "TechStartup",
    },
    socialPlatforms: [
      {
        name: "Twitter",
        href: "https://twitter.com/techstartup",
        icon: React.createElement(Twitter, { className: "w-6 h-6" }),
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/company/techstartup",
        icon: React.createElement(Linkedin, { className: "w-6 h-6" }),
      },
      {
        name: "GitHub",
        href: "https://github.com/techstartup",
        icon: React.createElement(Github, { className: "w-6 h-6" }),
      },
    ],
  },
  // Creator-focused footer
  {
    brand: {
      name: "Creative Studio",
      tagline: "Let's create together",
    },
    socialPlatforms: [
      {
        name: "Instagram",
        href: "https://instagram.com/creativestudio",
        icon: React.createElement(Instagram, { className: "w-6 h-6" }),
        followers: "892K",
        colorClass: "hover:text-pink-500",
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@creativestudio",
        icon: React.createElement(Youtube, { className: "w-6 h-6" }),
        followers: "1.5M",
        colorClass: "hover:text-red-600",
      },
      {
        name: "Twitter",
        href: "https://twitter.com/creativestudio",
        icon: React.createElement(Twitter, { className: "w-6 h-6" }),
        followers: "234K",
        colorClass: "hover:text-blue-400",
      },
    ],
    socialCta: {
      title: "Get inspired daily",
      description: "Follow our creative journey and get exclusive behind-the-scenes content",
    },
    quickLinks: [
      { text: "Portfolio", href: "/portfolio" },
      { text: "Services", href: "/services" },
      { text: "Blog", href: "/blog" },
      { text: "Contact", href: "/contact" },
    ],
  },
];