export const defaultContent = {
  newsletter: {
    headline: "Stay in the loop",
    description: "Get the latest updates, tips, and insights delivered straight to your inbox.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    successMessage: "Thanks for subscribing! Check your email for confirmation.",
  },
  socialLinks: [
    {
      platform: "Twitter" as const,
      href: "https://twitter.com",
      label: "Follow us on Twitter",
    },
    {
      platform: "Linkedin" as const,
      href: "https://linkedin.com",
      label: "Connect on LinkedIn",
    },
    {
      platform: "Youtube" as const,
      href: "https://youtube.com",
      label: "Watch on YouTube",
    },
  ],
  quickLinks: [
    {
      title: "Product",
      links: [
        { text: "Features", href: "/features" },
        { text: "Pricing", href: "/pricing" },
        { text: "Integrations", href: "/integrations" },
        { text: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "/docs" },
        { text: "API Reference", href: "/api" },
        { text: "Blog", href: "/blog" },
        { text: "Community", href: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Careers", href: "/careers" },
        { text: "Contact", href: "/contact" },
        { text: "Partners", href: "/partners" },
      ],
    },
  ],
  trustIndicator: {
    quote: "This platform has transformed how we work. The results speak for themselves - 3x productivity increase in just 3 months.",
    author: "Jane Smith",
    role: "CEO at TechCorp",
  },
  copyright: "© 2024 Your Company. All rights reserved.",
  legalLinks: [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms of Service", href: "/terms" },
    { text: "Cookie Policy", href: "/cookies" },
  ],
};