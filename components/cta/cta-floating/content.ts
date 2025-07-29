import { CTAFloatingProps } from "./index";

export const defaultContent: CTAFloatingProps = {
  message: "Ready to get started? Try our platform free for 14 days",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "Learn More",
    href: "/features",
  },
  dismissible: true,
  position: "bottom",
  showDelay: 3000,
  hideOnScroll: 500,
};

export const contentVariations: CTAFloatingProps[] = [
  // Exit intent
  {
    message: "Wait! Get 20% off your first month before you go",
    primaryCTA: {
      text: "Claim Discount",
      href: "/discount",
    },
    dismissible: true,
    position: "top",
    showDelay: 5000,
  },
  // Live chat prompt
  {
    message: "Need help? Our team is online and ready to assist",
    primaryCTA: {
      text: "Start Chat",
      href: "/chat",
    },
    secondaryCTA: {
      text: "Email Us",
      href: "/contact",
    },
    dismissible: true,
    position: "bottom",
    showDelay: 10000,
  },
  // Limited time offer
  {
    message: "⏰ Flash sale: 50% off all plans - Ends in 2 hours!",
    primaryCTA: {
      text: "Get Deal",
      href: "/flash-sale",
    },
    dismissible: false,
    position: "top",
    showDelay: 1000,
  },
  // Content upgrade
  {
    message: "Enjoying this content? Get our free guide with 10x more tips",
    primaryCTA: {
      text: "Download Guide",
      href: "/guide",
    },
    dismissible: true,
    position: "bottom",
    showDelay: 30000,
    hideOnScroll: 1000,
  },
  // Demo reminder
  {
    message: "See our platform in action with a personalized demo",
    primaryCTA: {
      text: "Book Demo",
      href: "/demo",
    },
    secondaryCTA: {
      text: "Watch Video",
      href: "/video",
    },
    dismissible: true,
    position: "bottom",
    showDelay: 15000,
  },
  // Newsletter signup
  {
    message: "Join 50,000+ subscribers getting weekly insights",
    primaryCTA: {
      text: "Subscribe",
      href: "/newsletter",
    },
    dismissible: true,
    position: "bottom",
    showDelay: 20000,
    hideOnScroll: 2000,
  },
];