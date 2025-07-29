import { HeroTextImageProps } from "./index";

/**
 * Default content for the HeroTextImage component
 */
export const defaultContent: HeroTextImageProps = {
  badge: "Introducing v3.0",
  headline: "The Modern Way to Build Digital Products",
  subheadline:
    "Ship faster with our comprehensive toolkit. Everything you need to go from idea to production in record time.",
  primaryCTA: {
    text: "Start Building",
    href: "/get-started",
  },
  secondaryCTA: {
    text: "Watch Demo",
    href: "/demo",
  },
  image: {
    src: "/placeholder.webp",
    alt: "Abstract geometric design representing modern digital products",
    priority: true,
  },
  textAlign: "center",
};

/**
 * Content variations for different use cases
 */
export const contentVariations = {
  minimal: {
    headline: "Simplify Your Workflow",
    subheadline: "One platform, endless possibilities.",
    image: {
      src: "/placeholder.webp",
      alt: "Clean minimal workspace",
    },
    textAlign: "center",
  } as HeroTextImageProps,

  leftAligned: {
    badge: "New Features",
    headline: "Powerful Tools for Modern Teams",
    subheadline:
      "Collaborate seamlessly, ship confidently, and scale effortlessly with our integrated platform designed for the way you work.",
    primaryCTA: {
      text: "Get Started Free",
      href: "/signup",
    },
    secondaryCTA: {
      text: "Book a Demo",
      href: "/contact",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Team collaboration in modern office",
      priority: true,
    },
    textAlign: "left",
  } as HeroTextImageProps,

  rightAligned: {
    headline: "Transform Your Business",
    subheadline:
      "Join thousands of companies using our platform to accelerate growth and innovation.",
    primaryCTA: {
      text: "Start Free Trial",
      href: "/trial",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Business growth visualization",
    },
    textAlign: "right",
  } as HeroTextImageProps,

  withoutBadge: {
    headline: "Build Something Amazing",
    subheadline:
      "Turn your ideas into reality with the most powerful development platform.",
    primaryCTA: {
      text: "Get Started",
      href: "/start",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/about",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Creative workspace with technology",
    },
    textAlign: "center",
  } as HeroTextImageProps,
};

/**
 * Industry-specific examples
 */
export const industryExamples = {
  saas: {
    badge: "Trusted by 10,000+ teams",
    headline: "The All-in-One Platform for SaaS Success",
    subheadline:
      "From user onboarding to revenue optimization, we've got everything you need to grow your SaaS business.",
    primaryCTA: {
      text: "Start 14-Day Trial",
      href: "/trial",
    },
    secondaryCTA: {
      text: "See Pricing",
      href: "/pricing",
    },
    image: {
      src: "/placeholder.webp",
      alt: "SaaS analytics dashboard",
      priority: true,
    },
    textAlign: "center",
  } as HeroTextImageProps,

  ecommerce: {
    badge: "Black Friday Sale",
    headline: "Your Store, Supercharged",
    subheadline:
      "Sell more with AI-powered recommendations, seamless checkout, and advanced analytics.",
    primaryCTA: {
      text: "Create Your Store",
      href: "/create-store",
    },
    secondaryCTA: {
      text: "View Examples",
      href: "/showcase",
    },
    image: {
      src: "/placeholder.webp",
      alt: "E-commerce platform interface",
    },
    textAlign: "center",
  } as HeroTextImageProps,

  developer: {
    badge: "For Developers",
    headline: "Code Less, Ship More",
    subheadline:
      "The developer platform that scales with you. From prototype to production in minutes, not months.",
    primaryCTA: {
      text: "View Documentation",
      href: "/docs",
    },
    secondaryCTA: {
      text: "Try Playground",
      href: "/playground",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Code editor with modern UI",
      priority: true,
    },
    textAlign: "left",
  } as HeroTextImageProps,
};
