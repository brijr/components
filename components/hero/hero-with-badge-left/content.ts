import type { HeroWithBadgeLeftProps } from "./index";

/**
 * Default content for HeroWithBadgeLeft component
 */
export const defaultContent: HeroWithBadgeLeftProps = {
  badge: {
    text: "New Release",
    variant: "secondary",
    href: "/changelog",
  },
  headline: "The future of collaboration is here",
  subheadline:
    "Experience the next generation of team productivity with our revolutionary new features",
  primaryCTA: {
    text: "Get Early Access",
    href: "/early-access",
  },
  secondaryCTA: {
    text: "Watch Demo",
    href: "/demo",
  },
};

/**
 * Alternative content variations for HeroWithBadgeLeft component
 */
export const contentVariations: HeroWithBadgeLeftProps[] = [
  {
    badge: {
      text: "Limited Offer",
      variant: "destructive",
    },
    headline: "50% off for the next 48 hours",
    subheadline: "Join thousands of teams already transforming their workflow",
    primaryCTA: {
      text: "Claim Offer",
      href: "/special-offer",
    },
  },
  {
    badge: {
      text: "Product Hunt #1",
      variant: "default",
      href: "https://producthunt.com",
    },
    headline: "The tool developers love",
    subheadline:
      "Streamline your development workflow with our award-winning platform",
    primaryCTA: {
      text: "Start Building",
      href: "/signup",
    },
    secondaryCTA: {
      text: "Read Reviews",
      href: "/testimonials",
    },
  },
  {
    badge: {
      text: "Beta",
      variant: "outline",
    },
    headline: "Try our AI assistant",
    subheadline:
      "Be among the first to experience intelligent automation that adapts to your needs",
    primaryCTA: {
      text: "Join Beta",
      href: "/beta",
    },
  },
];
