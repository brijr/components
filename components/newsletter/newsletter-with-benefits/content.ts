export const defaultContent = {
  headline: "Level up your skills weekly",
  description: "Join thousands of developers getting better every week",
  benefits: [
    "Curated tutorials and in-depth guides",
    "Early access to new features and tools",
    "Exclusive discounts on courses and resources",
    "Direct line to industry experts"
  ],
  form: {
    placeholder: "Enter your email",
    buttonText: "Start learning",
    successMessage: "Welcome to the community! Check your inbox.",
    layout: "inline" as const
  },
  trustIndicators: {
    subscriberCount: "50,000+ developers",
    frequency: "Weekly newsletter",
    customText: "Unsubscribe anytime"
  },
  backgroundStyle: "gradient" as const
};

export const contentVariations = [
  // Marketing focused
  {
    headline: "Grow your business with proven strategies",
    description: "Get actionable marketing insights delivered to your inbox",
    benefits: [
      "Case studies from successful campaigns",
      "Step-by-step implementation guides",
      "Free templates and resources",
      "Access to our private community"
    ],
    form: {
      placeholder: "Your work email",
      buttonText: "Get free resources",
      layout: "stacked" as const
    },
    trustIndicators: {
      subscriberCount: "25,000+ marketers",
      frequency: "Bi-weekly",
    },
    backgroundStyle: "default" as const
  },
  // E-commerce version
  {
    headline: "Never miss a deal",
    benefits: [
      "Exclusive member-only discounts",
      "Early access to sales and new products",
      "Free shipping on orders over $50",
      "Birthday month special offers"
    ],
    form: {
      placeholder: "Email address",
      buttonText: "Join VIP list",
      successMessage: "You're in! Check your email for a special welcome gift.",
      layout: "inline" as const
    },
    trustIndicators: {
      customText: "Join 100,000+ happy customers"
    },
    backgroundStyle: "pattern" as const
  },
  // SaaS product updates
  {
    headline: "Stay ahead of the curve",
    description: "Get product updates, tips, and industry insights",
    benefits: [
      "Be first to know about new features",
      "Pro tips to maximize your workflow",
      "Customer success stories and use cases",
      "Invites to exclusive webinars and events"
    ],
    form: {
      placeholder: "name@company.com",
      buttonText: "Subscribe",
      layout: "inline" as const
    },
    trustIndicators: {
      subscriberCount: "15,000+ professionals",
      frequency: "Monthly digest"
    },
    backgroundStyle: "gradient" as const
  }
];