import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

export const defaultContent = {
  brandName: "Acme Inc",
  links: [
    { text: "About", href: "/about" },
    { text: "Products", href: "/products" },
    { text: "Blog", href: "/blog" },
    { text: "Careers", href: "/careers" },
    { text: "Contact", href: "/contact" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" }
  ],
  copyright: "All rights reserved.",
  socialLinks: [
    {
      platform: "GitHub",
      href: "https://github.com",
      icon: Github
    },
    {
      platform: "Twitter",
      href: "https://twitter.com",
      icon: Twitter
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin
    }
  ]
};

export const contentVariations = [
  // Minimal version
  {
    brandName: "StartupCo",
    links: [
      { text: "Home", href: "/" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
      { text: "Privacy", href: "/privacy" }
    ],
    copyright: "All rights reserved."
  },
  // With social links and more navigation
  {
    brandName: "TechCorp",
    links: [
      { text: "Platform", href: "/platform" },
      { text: "Solutions", href: "/solutions" },
      { text: "Resources", href: "/resources" },
      { text: "Company", href: "/company" },
      { text: "Support", href: "/support" },
      { text: "Legal", href: "/legal" },
      { text: "Sitemap", href: "/sitemap" }
    ],
    copyright: "Built with passion. All rights reserved.",
    socialLinks: [
      {
        platform: "GitHub",
        href: "https://github.com/techcorp",
        icon: Github
      },
      {
        platform: "Twitter",
        href: "https://twitter.com/techcorp",
        icon: Twitter
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/company/techcorp",
        icon: Linkedin
      },
      {
        platform: "Facebook",
        href: "https://facebook.com/techcorp",
        icon: Facebook
      }
    ]
  }
];