import { CTASimpleLeftProps } from "./index";

export const defaultContent: CTASimpleLeftProps = {
  headline: "Start building today",
  subheadline: "Get access to all features with our free plan. Upgrade anytime as you grow.",
  primaryCTA: {
    text: "Get Started",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Learn More",
    href: "/features",
  },
  variant: "default",
};

export const contentVariations: CTASimpleLeftProps[] = [
  // Blog subscription
  {
    headline: "Never miss an update",
    subheadline: "Subscribe to our blog and get the latest insights delivered weekly.",
    primaryCTA: {
      text: "Subscribe",
      href: "/subscribe",
    },
    variant: "muted",
  },
  // Early access
  {
    headline: "Get early access",
    subheadline: "Be among the first to try our new features before they launch.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/early-access",
    },
    secondaryCTA: {
      text: "See What's Coming",
      href: "/roadmap",
    },
    variant: "default",
  },
  // Support CTA
  {
    headline: "Need help getting started?",
    subheadline: "Our support team is here to help you succeed.",
    primaryCTA: {
      text: "Contact Support",
      href: "/support",
    },
    secondaryCTA: {
      text: "Browse Docs",
      href: "/docs",
    },
    variant: "primary",
  },
  // Free resource
  {
    headline: "Download our toolkit",
    subheadline: "Everything you need to streamline your workflow in one package.",
    primaryCTA: {
      text: "Download Now",
      href: "/download",
    },
    variant: "default",
  },
  // Community
  {
    headline: "Join our community",
    subheadline: "Connect with thousands of professionals in our active community.",
    primaryCTA: {
      text: "Join Community",
      href: "/community",
    },
    variant: "muted",
  },
  // Upgrade prompt
  {
    headline: "Ready to scale?",
    subheadline: "Unlock advanced features and priority support with our Pro plan.",
    primaryCTA: {
      text: "Upgrade to Pro",
      href: "/upgrade",
    },
    secondaryCTA: {
      text: "Compare Plans",
      href: "/pricing",
    },
    variant: "primary",
  },
];