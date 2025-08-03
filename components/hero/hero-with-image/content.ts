import { HeroWithImageProps } from "./index";

export const defaultContent: HeroWithImageProps = {
  headline: "Beautiful Design System Components",
  subheadline:
    "Build stunning interfaces with our pre-built, customizable components",
  primaryCTA: {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCTA: {
    text: "View Components",
    href: "/components",
  },
  image: {
    src: "/placeholder.svg",
    alt: "Dashboard interface showing modern design components",
    width: 1200,
    height: 675,
    priority: true,
  },
};

export const contentVariations: HeroWithImageProps[] = [
  // Analytics Platform
  {
    headline: "Analytics That Drive Growth",
    subheadline:
      "Understand your users, optimize your product, and scale with confidence",
    primaryCTA: {
      text: "Start Free Trial",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Book a Demo",
      href: "/demo",
    },
    image: {
      src: "/placeholder.svg",
      alt: "Analytics dashboard with charts and metrics",
      width: 1200,
      height: 675,
      priority: true,
    },
  },
  // Developer Tools
  {
    headline: "Ship Code Faster",
    subheadline:
      "Modern development tools that help you build, test, and deploy with ease",
    primaryCTA: {
      text: "Try It Free",
      href: "/start",
    },
    secondaryCTA: {
      text: "Documentation",
      href: "/docs",
    },
    image: {
      src: "/placeholder.svg",
      alt: "Code editor interface with syntax highlighting",
      width: 1200,
      height: 675,
    },
  },
  // E-commerce
  {
    headline: "Your Online Store, Simplified",
    subheadline:
      "Everything you need to sell online, manage inventory, and grow your business",
    primaryCTA: {
      text: "Start Selling",
      href: "/register",
    },
    image: {
      src: "/placeholder.svg",
      alt: "E-commerce dashboard showing products and sales",
      width: 1200,
      height: 675,
      priority: true,
    },
  },
  // Educational Platform
  {
    headline: "Learn at Your Own Pace",
    subheadline: "Access thousands of courses from industry experts",
    primaryCTA: {
      text: "Browse Courses",
      href: "/courses",
    },
    secondaryCTA: {
      text: "Free Preview",
      href: "/preview",
    },
    image: {
      src: "/placeholder.svg",
      alt: "Online learning platform interface",
      width: 1200,
      height: 675,
    },
  },
];
