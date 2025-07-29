import { CTABannerProps } from "./index";

export const defaultContent: CTABannerProps = {
  message: "🎉 Limited time offer: Get 50% off annual plans - Sale ends Friday!",
  primaryCTA: {
    text: "Claim Offer",
    href: "/offer",
  },
  secondaryCTA: {
    text: "Learn More",
    href: "/pricing",
  },
  dismissible: true,
  variant: "primary",
  position: "top",
};

export const contentVariations: CTABannerProps[] = [
  // Maintenance notice
  {
    message: "⚠️ Scheduled maintenance: Our services will be unavailable from 2-4 AM EST on Saturday",
    primaryCTA: {
      text: "View Details",
      href: "/status",
    },
    dismissible: true,
    variant: "warning",
    position: "top",
  },
  // Feature announcement
  {
    message: "🚀 New feature: Real-time collaboration is now available for all users",
    primaryCTA: {
      text: "Try It Now",
      href: "/features/collaboration",
    },
    secondaryCTA: {
      text: "What's New",
      href: "/changelog",
    },
    dismissible: true,
    variant: "success",
    position: "top",
  },
  // Cookie notice
  {
    message: "We use cookies to improve your experience and analyze site traffic",
    primaryCTA: {
      text: "Accept",
      href: "#",
    },
    secondaryCTA: {
      text: "Preferences",
      href: "/privacy",
    },
    dismissible: false,
    variant: "default",
    position: "bottom",
  },
  // Webinar reminder
  {
    message: "📅 Don't forget: Our live webinar starts tomorrow at 2 PM EST",
    primaryCTA: {
      text: "Join Webinar",
      href: "/webinar",
    },
    dismissible: true,
    variant: "primary",
    position: "top",
  },
  // Update available
  {
    message: "A new version is available with performance improvements and bug fixes",
    primaryCTA: {
      text: "Update Now",
      href: "/update",
    },
    secondaryCTA: {
      text: "Release Notes",
      href: "/changelog",
    },
    dismissible: true,
    variant: "default",
    position: "top",
  },
  // Free shipping
  {
    message: "🚚 Free shipping on all orders over $50 - No code needed",
    primaryCTA: {
      text: "Shop Now",
      href: "/shop",
    },
    dismissible: true,
    variant: "success",
    position: "top",
  },
];