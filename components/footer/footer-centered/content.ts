import { Github, Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";

export const defaultContent = {
  brand: {
    name: "Acme Inc",
    tagline: "Building amazing products for everyone",
  },
  links: [
    { text: "Features", href: "/features" },
    { text: "Pricing", href: "/pricing" },
    { text: "About", href: "/about" },
    { text: "Blog", href: "/blog" },
    { text: "Careers", href: "/careers" },
    { text: "Contact", href: "/contact" },
  ],
  socialLinks: [
    {
      platform: "GitHub",
      href: "https://github.com",
      icon: Github,
    },
    {
      platform: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
  ],
  copyright: "All rights reserved.",
};

export const contentVariations = [
  // Creative agency version
  {
    brand: {
      name: "Studio Creative",
      tagline: "We craft digital experiences that inspire",
    },
    links: [
      { text: "Work", href: "/work" },
      { text: "Services", href: "/services" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
    socialLinks: [
      {
        platform: "Instagram",
        href: "https://instagram.com",
        icon: Instagram,
      },
      {
        platform: "Dribbble",
        href: "https://dribbble.com",
        icon: Dribbble,
      },
      {
        platform: "Twitter",
        href: "https://twitter.com",
        icon: Twitter,
      },
    ],
    copyright: "Crafted with passion.",
  },
  // Startup version
  {
    brand: {
      name: "LaunchPad",
      tagline: "Your idea, launched",
    },
    links: [
      { text: "How it Works", href: "/how-it-works" },
      { text: "Success Stories", href: "/stories" },
      { text: "Pricing", href: "/pricing" },
      { text: "Resources", href: "/resources" },
      { text: "Support", href: "/support" },
    ],
    socialLinks: [
      {
        platform: "Twitter",
        href: "https://twitter.com/launchpad",
        icon: Twitter,
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/launchpad",
        icon: Linkedin,
      },
    ],
    copyright: "Made for founders, by founders.",
  },
  // Minimal version without social links
  {
    brand: {
      name: "Minimal Co",
    },
    links: [
      { text: "About", href: "/about" },
      { text: "Work", href: "/work" },
      { text: "Contact", href: "/contact" },
      { text: "Privacy", href: "/privacy" },
      { text: "Terms", href: "/terms" },
    ],
    copyright: "All rights reserved.",
  },
];
