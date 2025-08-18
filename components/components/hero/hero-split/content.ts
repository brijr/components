import { HeroSplitProps } from "./index";

export const defaultContent: HeroSplitProps = {
  headline: "Build Better Products Faster",
  subheadline:
    "Our platform provides everything you need to go from idea to production in record time.",
  primaryCTA: {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Watch Demo",
    href: "/demo",
  },
  image: {
    src: "/placeholder.webp",
    alt: "Product screenshot",
  },
  imagePosition: "right",
};

export const variations = {
  leftImage: {
    headline: "Analytics That Drive Growth",
    subheadline:
      "Get deep insights into your business with our powerful analytics dashboard.",
    primaryCTA: {
      text: "Start Free Trial",
      href: "/trial",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Analytics dashboard",
    },
    imagePosition: "left" as const,
  },
  noImage: {
    headline: "Transform Your Business",
    subheadline:
      "Join thousands of companies using our platform to streamline their operations.",
    primaryCTA: {
      text: "Book a Demo",
      href: "/demo",
    },
    secondaryCTA: {
      text: "See Pricing",
      href: "/pricing",
    },
  },
  minimal: {
    headline: "The Modern Way to Build",
    subheadline: "Ship faster with our developer-first platform.",
    primaryCTA: {
      text: "Start Building",
      href: "/start",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Platform interface",
    },
  },
};
