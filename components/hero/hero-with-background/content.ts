import type { HeroWithBackgroundProps } from "./index";

/**
 * Default content for HeroWithBackground component
 */
export const defaultContent: HeroWithBackgroundProps = {
  headline: "Build something extraordinary",
  subheadline:
    "Create powerful applications with our comprehensive development platform and join a community of innovators.",
  primaryCTA: {
    text: "Start Building",
    href: "/get-started",
  },
  secondaryCTA: {
    text: "Explore Features",
    href: "/features",
  },
  backgroundImage: {
    src: "/placeholder.webp",
    alt: "Abstract technology background",
    overlayOpacity: 60,
  },
  minHeight: "600px",
};

/**
 * Alternative content variations for HeroWithBackground component
 */
export const contentVariations: HeroWithBackgroundProps[] = [
  {
    headline: "Welcome to the future",
    subheadline: "Experience innovation like never before",
    primaryCTA: {
      text: "Join Us",
      href: "/signup",
    },
    backgroundImage: {
      src: "/placeholder.webp",
      alt: "Futuristic cityscape",
      overlayOpacity: 70,
    },
    minHeight: "700px",
  },
  {
    headline: "Empowering teams worldwide",
    subheadline:
      "Over 10,000 companies trust our platform to drive their success",
    primaryCTA: {
      text: "Get Started Free",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Contact Sales",
      href: "/contact",
    },
    backgroundImage: {
      src: "/placeholder.webp",
      alt: "Global team collaboration",
      overlayOpacity: 40,
    },
    minHeight: "550px",
  },
];