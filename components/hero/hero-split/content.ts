import type { HeroSplitProps } from "./index";

/**
 * Default content for HeroSplit component
 */
export const defaultContent: HeroSplitProps = {
  headline: "Transform your workflow with intelligent automation",
  subheadline:
    "Streamline your processes, save time, and focus on what matters most with our powerful automation platform.",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "Watch Demo",
    href: "/demo",
  },
  image: {
    src: "/placeholder.svg",
    alt: "Workflow automation dashboard interface",
    width: 600,
    height: 400,
    priority: true,
  },
};

/**
 * Alternative content variations for HeroSplit component
 */
export const contentVariations: HeroSplitProps[] = [
  {
    headline: "Analytics that drive growth",
    subheadline:
      "Make data-driven decisions with real-time insights and comprehensive reporting tools.",
    primaryCTA: {
      text: "Get Started",
      href: "/signup",
    },
    image: {
      src: "/placeholder.svg",
      alt: "Analytics dashboard with charts and graphs",
      width: 600,
      height: 400,
    },
    reverse: true,
  },
  {
    headline: "Collaborate seamlessly across teams",
    subheadline:
      "Break down silos and work together efficiently with our integrated collaboration platform.",
    primaryCTA: {
      text: "Try It Free",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/features",
    },
    image: {
      src: "/placeholder.svg",
      alt: "Team collaboration interface showing shared workspace",
      width: 600,
      height: 400,
    },
  },
];
