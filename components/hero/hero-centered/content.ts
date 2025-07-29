import type { HeroCenteredProps } from "./index";

/**
 * Default content for HeroCentered component
 */
export const defaultContent: HeroCenteredProps = {
  headline: "Create without limits",
  subheadline: "Where imagination meets innovation",
  cta: {
    text: "Start Creating",
    href: "/create",
  },
};

/**
 * Alternative content variations for HeroCentered component
 */
export const contentVariations: HeroCenteredProps[] = [
  {
    headline: "Coming soon",
    subheadline: "Something amazing is on the way",
    cta: {
      text: "Get Notified",
      href: "/notify",
      variant: "outline",
    },
  },
  {
    headline: "404",
    subheadline: "This page has wandered off",
    cta: {
      text: "Go Home",
      href: "/",
      variant: "ghost",
    },
  },
  {
    headline: "Think big",
  },
  {
    headline: "Hello, world",
    cta: {
      text: "Say Hi Back",
      href: "/contact",
      variant: "outline",
    },
  },
  {
    headline: "Ship faster",
    subheadline: "Build • Test • Deploy",
  },
];