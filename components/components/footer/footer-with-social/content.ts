export const defaultContent = {
  companyName: "Your Company",
  tagline: "Building the future of digital experiences",
  socialLinks: [
    {
      platform: "Twitter" as const,
      href: "https://twitter.com",
      label: "Follow us on Twitter",
    },
    {
      platform: "Github" as const,
      href: "https://github.com",
      label: "View our GitHub",
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
  trustBadges: [
    {
      text: "SOC 2 Certified",
      icon: "Shield" as const,
    },
    {
      text: "GDPR Compliant",
      icon: "Lock" as const,
    },
    {
      text: "99.9% Uptime",
      icon: "Activity" as const,
    },
  ],
  links: [
    {
      text: "Privacy",
      href: "/privacy",
    },
    {
      text: "Terms",
      href: "/terms",
    },
    {
      text: "Support",
      href: "/support",
    },
  ],
  copyright: "© 2024 Your Company. All rights reserved.",
};