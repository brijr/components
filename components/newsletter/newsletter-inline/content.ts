export const defaultContent = {
  headline: "Get updates in your inbox",
  form: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    successMessage: "Thanks for subscribing!"
  },
  variant: "default" as const,
  align: "left" as const
};

export const contentVariations = [
  // Compact version for footers
  {
    headline: "Newsletter",
    form: {
      placeholder: "Email address",
      buttonText: "Join",
      successMessage: "You're subscribed!"
    },
    variant: "compact" as const,
    align: "left" as const
  },
  // Centered for sidebars
  {
    headline: "Stay updated",
    form: {
      placeholder: "Your email",
      buttonText: "Sign up",
      successMessage: "Welcome to our newsletter!"
    },
    variant: "default" as const,
    align: "center" as const
  },
  // Right-aligned for headers
  {
    headline: "Get the latest news",
    form: {
      placeholder: "Email",
      buttonText: "Subscribe",
      successMessage: "Thanks! Check your inbox."
    },
    variant: "compact" as const,
    align: "right" as const
  },
  // Call-to-action style
  {
    headline: "Don't miss out on updates",
    form: {
      placeholder: "Enter email address",
      buttonText: "Notify me",
      successMessage: "We'll keep you posted!"
    },
    variant: "default" as const,
    align: "center" as const
  }
];