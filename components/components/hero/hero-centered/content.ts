import { HeroCenteredProps } from "./index";

export const defaultContent: HeroCenteredProps = {
  badge: "New Release",
  headline: "Ship Faster with Modern Tools",
  subheadline: "Build, test, and deploy your applications with confidence using our comprehensive development platform.",
  primaryCTA: {
    text: "Start Building",
    href: "/signup",
  },
  secondaryCTA: {
    text: "View Demo",
    href: "/demo",
  },
};

export const variations = {
  startup: {
    badge: "Series A Funded",
    headline: "The Future of Design Systems",
    subheadline: "Create consistent, beautiful interfaces across your entire product suite.",
    primaryCTA: {
      text: "Get Early Access",
      href: "/early-access",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/about",
    },
  },
  saas: {
    headline: "All-in-One Marketing Platform",
    subheadline: "Automate your marketing, sales, and customer service in one powerful platform.",
    primaryCTA: {
      text: "Start Free Trial",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Book a Demo",
      href: "/contact",
    },
  },
  agency: {
    badge: "Award-Winning Agency",
    headline: "We Build Digital Experiences",
    subheadline: "Partner with us to transform your digital presence and drive real business results.",
    primaryCTA: {
      text: "View Our Work",
      href: "/portfolio",
    },
    secondaryCTA: {
      text: "Get in Touch",
      href: "/contact",
    },
  },
};