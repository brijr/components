import { HeroMinimalLeftProps } from "./index";

export const defaultContent: HeroMinimalLeftProps = {
  headline: "Welcome to Our Platform",
  subheadline: "Build amazing products with our comprehensive design system and component library",
  primaryCTA: {
    text: "Get Started",
    href: "/signup"
  },
  secondaryCTA: {
    text: "Learn More",
    href: "/features"
  }
};

export const contentVariations: HeroMinimalLeftProps[] = [
  // Startup variation
  {
    headline: "Ship Faster with Modern Tools",
    subheadline: "Everything you need to build, test, and deploy your next big idea",
    primaryCTA: {
      text: "Start Building",
      href: "/register"
    },
    secondaryCTA: {
      text: "View Demo",
      href: "/demo"
    }
  },
  // SaaS variation
  {
    headline: "Simplify Your Workflow",
    subheadline: "Automate repetitive tasks and focus on what matters most to your business",
    primaryCTA: {
      text: "Try Free for 30 Days",
      href: "/trial"
    },
    secondaryCTA: {
      text: "See Pricing",
      href: "/pricing"
    }
  },
  // Minimal variation (no subheadline)
  {
    headline: "The Future of Design Systems",
    primaryCTA: {
      text: "Explore Now",
      href: "/explore"
    }
  },
  // Single CTA variation
  {
    headline: "Ready to Transform Your Business?",
    subheadline: "Join thousands of companies already using our platform",
    primaryCTA: {
      text: "Get Started Today",
      href: "/start"
    }
  }
];