export const defaultContent = {
  headline: "Stay in the loop",
  description: "Get the latest news, updates, and insights delivered straight to your inbox.",
  form: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    successMessage: "Thanks for subscribing! Check your inbox to confirm."
  },
  privacyText: "We respect your privacy. Unsubscribe at any time.",
  privacyLink: "/privacy",
  variant: "accent" as const
};

export const contentVariations = [
  // Minimal version
  {
    headline: "Join our newsletter",
    form: {
      placeholder: "Your email address",
      buttonText: "Subscribe",
      successMessage: "Welcome aboard!"
    },
    variant: "default" as const
  },
  // With name field
  {
    headline: "Get weekly updates",
    description: "Join 50,000+ subscribers getting our best content every week.",
    form: {
      placeholder: "your@email.com",
      buttonText: "Join now",
      successMessage: "You're all set! We'll be in touch soon.",
      showNameField: true,
      namePlaceholder: "First name"
    },
    privacyText: "No spam, ever. Read our",
    privacyLink: "/privacy",
    variant: "muted" as const
  },
  // E-commerce version
  {
    headline: "Get 10% off your first order",
    description: "Subscribe to our newsletter and receive exclusive offers, new product alerts, and style tips.",
    form: {
      placeholder: "Email address",
      buttonText: "Get 10% off",
      successMessage: "Check your email for your discount code!"
    },
    privacyText: "By subscribing, you agree to receive marketing emails. Unsubscribe anytime.",
    variant: "accent" as const
  },
  // Tech/developer focused
  {
    headline: "Developer digest",
    description: "Weekly roundup of the best technical articles, tools, and resources.",
    form: {
      placeholder: "developer@company.com",
      buttonText: "Subscribe",
      successMessage: "Welcome to the developer community!"
    },
    privacyText: "We hate spam as much as you do.",
    privacyLink: "/privacy",
    variant: "default" as const
  }
];