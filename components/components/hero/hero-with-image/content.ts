import { HeroWithImageProps } from "./index";

export const defaultContent: HeroWithImageProps = {
  headline: "Your Complete Development Platform",
  subheadline: "Everything you need to build, deploy, and scale modern applications.",
  primaryCTA: {
    text: "Start Free",
    href: "/signup",
  },
  secondaryCTA: {
    text: "See How It Works",
    href: "/features",
  },
  image: {
    src: "/placeholder.webp",
    alt: "Platform dashboard showing analytics and metrics",
  },
};

export const variations = {
  product: {
    headline: "Meet the New Standard in Project Management",
    subheadline: "Collaborate seamlessly, ship faster, and keep everyone aligned.",
    primaryCTA: {
      text: "Try It Free",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Book a Demo",
      href: "/demo",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Project management interface",
    },
  },
  minimal: {
    headline: "Design at Scale",
    subheadline: "Build consistent experiences across every touchpoint.",
    primaryCTA: {
      text: "Get Started",
      href: "/start",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Design system components",
    },
  },
  noButtons: {
    headline: "The Future is Here",
    subheadline: "Experience the next generation of cloud computing.",
    image: {
      src: "/placeholder.webp",
      alt: "Cloud infrastructure visualization",
    },
  },
};