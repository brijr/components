import type { HeroWithVideoProps } from "./index";

/**
 * Default content for HeroWithVideo component
 */
export const defaultContent: HeroWithVideoProps = {
  headline: "Watch how it works",
  subheadline:
    "See our platform in action and discover how easy it is to get started",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "View Documentation",
    href: "/docs",
  },
  video: {
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Platform overview video",
    aspectRatio: "16:9",
  },
};

/**
 * Alternative content variations for HeroWithVideo component
 */
export const contentVariations: HeroWithVideoProps[] = [
  {
    headline: "Learn from the experts",
    subheadline: "Join our masterclass and level up your skills",
    primaryCTA: {
      text: "Enroll Now",
      href: "/enroll",
    },
    video: {
      embedUrl: "https://player.vimeo.com/video/123456789",
      title: "Masterclass introduction",
      aspectRatio: "16:9",
    },
  },
  {
    headline: "Customer success stories",
    subheadline:
      "Hear directly from our customers about their transformation journey",
    primaryCTA: {
      text: "Get Started",
      href: "/signup",
    },
    secondaryCTA: {
      text: "More Stories",
      href: "/testimonials",
    },
    video: {
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Customer testimonial compilation",
      aspectRatio: "21:9",
    },
  },
];