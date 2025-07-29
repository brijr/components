import type { HeroWithFormProps } from "./index";

/**
 * Default content for HeroWithForm component
 */
export const defaultContent: HeroWithFormProps = {
  headline: "Stay in the loop",
  subheadline:
    "Get notified about new features, updates, and important announcements",
  form: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    inputType: "email",
    inputName: "email",
  },
  helperText: "Join 12,000+ subscribers. Unsubscribe anytime.",
  secondaryCTA: {
    text: "View past newsletters",
    href: "/newsletter/archive",
  },
};

/**
 * Alternative content variations for HeroWithForm component
 */
export const contentVariations: HeroWithFormProps[] = [
  {
    headline: "Get early access",
    subheadline: "Be among the first to try our new AI-powered features",
    form: {
      placeholder: "Your work email",
      buttonText: "Request Access",
      inputType: "email",
      action: "/api/early-access",
      method: "POST",
    },
    helperText: "No credit card required. 2,847 people on the waitlist.",
  },
  {
    headline: "Start your free trial",
    subheadline: "No credit card required. Cancel anytime.",
    form: {
      placeholder: "Enter your business email",
      buttonText: "Start Free Trial",
      inputType: "email",
      inputName: "business_email",
    },
    helperText: "14-day free trial with all features included",
    secondaryCTA: {
      text: "See pricing options",
      href: "/pricing",
    },
  },
  {
    headline: "Book a personalized demo",
    form: {
      placeholder: "Your phone number",
      buttonText: "Schedule Call",
      inputType: "tel",
      inputName: "phone",
    },
    helperText: "We'll call you within 24 hours",
    secondaryCTA: {
      text: "Or chat with us now",
      href: "/contact",
    },
  },
];
