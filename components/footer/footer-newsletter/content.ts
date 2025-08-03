import { Twitter, Linkedin, Rss, Mail, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import React from "react";
import type { FooterNewsletterProps } from "./index";

export const defaultContent: FooterNewsletterProps = {
  newsletter: {
    badge: "Join 50,000+ subscribers",
    title: "Stay ahead with our newsletter",
    description: "Get weekly insights on technology, design, and business delivered straight to your inbox.",
    benefits: [
      { text: "Industry insights and trends", icon: React.createElement(TrendingUp, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" }) },
      { text: "Exclusive subscriber content", icon: React.createElement(Sparkles, { className: "w-4 h-4 text-purple-600 dark:text-purple-400" }) },
      { text: "Expert interviews & case studies", icon: React.createElement(BookOpen, { className: "w-4 h-4 text-green-600 dark:text-green-400" }) },
      { text: "Early access to new features", icon: React.createElement(Mail, { className: "w-4 h-4 text-orange-600 dark:text-orange-400" }) },
    ],
    form: {
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
      helperText: "No spam, unsubscribe at any time. Read our Privacy Policy.",
    },
    recentEditions: [
      {
        title: "The Future of AI in Product Design",
        date: "Dec 15, 2023",
        href: "/newsletter/ai-design",
      },
      {
        title: "2024 Technology Predictions",
        date: "Dec 8, 2023",
        href: "/newsletter/2024-predictions",
      },
      {
        title: "Building Scalable Design Systems",
        date: "Dec 1, 2023",
        href: "/newsletter/design-systems",
      },
    ],
  },
  company: {
    name: "TechPulse",
    links: [
      { text: "About", href: "/about" },
      { text: "Archive", href: "/newsletter/archive" },
      { text: "Writers", href: "/writers" },
      { text: "Advertise", href: "/advertise" },
      { text: "Contact", href: "/contact" },
    ],
    socialLinks: [
      {
        platform: "Twitter",
        href: "https://twitter.com/techpulse",
        icon: React.createElement(Twitter, { className: "w-5 h-5" }),
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/techpulse",
        icon: React.createElement(Linkedin, { className: "w-5 h-5" }),
      },
      {
        platform: "RSS",
        href: "/rss",
        icon: React.createElement(Rss, { className: "w-5 h-5" }),
      },
    ],
  },
  copyright: "All rights reserved.",
};

export const contentVariations = [
  // Minimal newsletter footer
  {
    newsletter: {
      title: "Subscribe to updates",
      description: "Get the latest news delivered to your inbox.",
      form: {
        placeholder: "Your email",
        buttonText: "Subscribe",
      },
    },
    company: {
      name: "SimpleNews",
      links: [
        { text: "Home", href: "/" },
        { text: "About", href: "/about" },
        { text: "Privacy", href: "/privacy" },
        { text: "Terms", href: "/terms" },
      ],
    },
  },
  // Educational newsletter
  {
    newsletter: {
      badge: "Free weekly lessons",
      title: "Level up your skills",
      description: "Join thousands of developers getting better at their craft with our weekly tutorials and tips.",
      benefits: [
        { text: "Practical coding tutorials" },
        { text: "Career development advice" },
        { text: "Tool recommendations" },
        { text: "Community Q&A sessions" },
      ],
      form: {
        placeholder: "developer@example.com",
        buttonText: "Start Learning",
        helperText: "✨ Get a free eBook when you subscribe!",
      },
    },
    company: {
      name: "DevLearn",
      links: [
        { text: "Courses", href: "/courses" },
        { text: "Blog", href: "/blog" },
        { text: "Community", href: "/community" },
        { text: "Support", href: "/support" },
      ],
    },
  },
];