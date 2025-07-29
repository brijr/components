import { CTASplitProps } from "./index";

export const defaultContent: CTASplitProps = {
  headline: "Boost your productivity",
  subheadline: "Start using our tools to work smarter, not harder",
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

export const contentVariations: CTASplitProps[] = [
  // Newsletter inline
  {
    headline: "Stay informed",
    subheadline: "Get weekly insights delivered to your inbox",
    primaryCTA: {
      text: "Subscribe",
      href: "/newsletter",
    },
    variant: "muted",
  },
  // Free trial
  {
    headline: "Try it free for 30 days",
    subheadline: "No credit card required. Cancel anytime.",
    primaryCTA: {
      text: "Start Free Trial",
      href: "/trial",
    },
    secondaryCTA: {
      text: "See Pricing",
      href: "/pricing",
    },
    variant: "primary",
  },
  // Consultation
  {
    headline: "Let's discuss your project",
    subheadline: "Book a free consultation with our experts",
    primaryCTA: {
      text: "Schedule Call",
      href: "/consultation",
    },
    variant: "default",
  },
  // App download
  {
    headline: "Take your work anywhere",
    subheadline: "Download our mobile app for iOS and Android",
    primaryCTA: {
      text: "Download App",
      href: "/download",
    },
    secondaryCTA: {
      text: "View Features",
      href: "/mobile",
    },
    variant: "muted",
  },
  // Limited offer
  {
    headline: "Limited time: 50% off annual plans",
    subheadline: "Offer ends soon. Lock in your discount today.",
    primaryCTA: {
      text: "Claim Offer",
      href: "/offer",
    },
    variant: "primary",
  },
  // Documentation
  {
    headline: "Need help integrating?",
    subheadline: "Check out our comprehensive documentation",
    primaryCTA: {
      text: "View Docs",
      href: "/docs",
    },
    secondaryCTA: {
      text: "API Reference",
      href: "/api",
    },
    variant: "default",
  },
];