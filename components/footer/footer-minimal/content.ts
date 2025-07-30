export const defaultContent = {
  text: "© 2024 Acme Inc. All rights reserved.",
  links: [
    { text: "Privacy", href: "/privacy" },
    { text: "Terms", href: "/terms" }
  ],
  align: "center" as const
};

export const contentVariations = [
  // Left aligned with more links
  {
    text: "© 2024 StartupCo",
    links: [
      { text: "About", href: "/about" },
      { text: "Privacy", href: "/privacy" },
      { text: "Terms", href: "/terms" },
      { text: "Contact", href: "/contact" }
    ],
    align: "left" as const
  },
  // Center aligned minimal
  {
    text: "© 2024 MinimalCo. Made with love.",
    align: "center" as const
  },
  // Right aligned with social-style links
  {
    text: "© 2024 Creative Studio",
    links: [
      { text: "Twitter", href: "https://twitter.com" },
      { text: "Instagram", href: "https://instagram.com" },
      { text: "Dribbble", href: "https://dribbble.com" }
    ],
    align: "right" as const
  },
  // Just copyright
  {
    text: "© 2024 Simple Inc. All rights reserved.",
    align: "center" as const
  }
];