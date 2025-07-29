import { CTASimpleProps } from "./index";

export const defaultContent: CTASimpleProps = {
  headline: "Ready to get started?",
  subheadline: "Join thousands of satisfied customers using our platform to grow their business.",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/signup",
  },
  secondaryCTA: {
    text: "View Pricing",
    href: "/pricing",
  },
  variant: "default",
};

export const contentVariations: CTASimpleProps[] = [
  // Newsletter signup
  {
    headline: "Stay in the loop",
    subheadline: "Get the latest updates and exclusive content delivered to your inbox.",
    primaryCTA: {
      text: "Subscribe Now",
      href: "/newsletter",
    },
    variant: "muted",
  },
  // Demo request
  {
    headline: "See it in action",
    subheadline: "Book a personalized demo with our product experts.",
    primaryCTA: {
      text: "Request Demo",
      href: "/demo",
    },
    secondaryCTA: {
      text: "Watch Video",
      href: "/video",
    },
    variant: "default",
  },
  // Primary variant
  {
    headline: "Transform your workflow today",
    subheadline: "Start your 14-day free trial. No credit card required.",
    primaryCTA: {
      text: "Get Started Free",
      href: "/signup",
    },
    secondaryCTA: {
      text: "Contact Sales",
      href: "/contact",
    },
    variant: "primary",
  },
  // Webinar registration
  {
    headline: "Join our upcoming webinar",
    subheadline: "Learn best practices from industry experts in our free online session.",
    primaryCTA: {
      text: "Register Now",
      href: "/webinar",
    },
    variant: "default",
  },
  // Download resource
  {
    headline: "Get your free guide",
    subheadline: "Download our comprehensive guide to scaling your business.",
    primaryCTA: {
      text: "Download Guide",
      href: "/download",
    },
    variant: "muted",
  },
  // Partner program
  {
    headline: "Become a partner",
    subheadline: "Join our partner network and unlock new revenue opportunities.",
    primaryCTA: {
      text: "Apply Now",
      href: "/partners",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/partner-info",
    },
    variant: "default",
  },
];