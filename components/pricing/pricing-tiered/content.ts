import { PricingTieredProps } from "./index";

export const defaultContent: PricingTieredProps = {
  headline: "Choose the plan that's right for you",
  subheadline: "All plans include a 30-day money-back guarantee",
  tiers: [
    {
      name: "Starter",
      description: "Perfect for trying out our service",
      price: "$9",
      period: "/month",
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "48-hour support response",
        "1 GB storage",
        "Export to CSV",
      ],
      cta: {
        text: "Get Started",
        href: "/signup?plan=starter",
      },
    },
    {
      name: "Professional",
      description: "Everything you need to grow",
      price: "$29",
      period: "/month",
      originalPrice: "$39",
      recommended: true,
      badge: "Most Popular",
      features: [
        "Everything in Starter",
        "Unlimited projects",
        "Advanced analytics",
        "Priority 24-hour support",
        "50 GB storage",
        "API access",
        "Custom integrations",
        "Team collaboration",
      ],
      cta: {
        text: "Start Free Trial",
        href: "/signup?plan=professional",
      },
    },
    {
      name: "Enterprise",
      description: "Advanced features for your team",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "1-hour support response",
        "Custom workflows",
        "Advanced security",
        "Dedicated account manager",
        "99.99% uptime SLA",
        "On-premise deployment",
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact-sales",
      },
    },
  ],
  showDecorations: true,
};

export const contentVariations: PricingTieredProps[] = [
  // Good-Better-Best with annual discount
  {
    headline: "Simple pricing for everyone",
    subheadline: "Save 20% with annual billing",
    tiers: [
      {
        name: "Good",
        description: "For individuals",
        price: "$12",
        period: "/month",
        features: [
          "5 active projects",
          "Basic features",
          "Email support",
          "Mobile app",
        ],
        cta: {
          text: "Choose Good",
          href: "/checkout?plan=good",
        },
      },
      {
        name: "Better",
        description: "For professionals",
        price: "$24",
        period: "/month",
        recommended: true,
        badge: "Best Value",
        features: [
          "25 active projects",
          "All features",
          "Priority support",
          "Advanced analytics",
          "Integrations",
        ],
        cta: {
          text: "Choose Better",
          href: "/checkout?plan=better",
        },
      },
      {
        name: "Best",
        description: "For teams",
        price: "$48",
        period: "/month",
        features: [
          "Unlimited projects",
          "Everything in Better",
          "Phone support",
          "Custom training",
          "API access",
          "White-label option",
        ],
        cta: {
          text: "Choose Best",
          href: "/checkout?plan=best",
        },
      },
    ],
    showDecorations: true,
  },
  // Two-tier with strong differentiation
  {
    headline: "Choose your experience",
    tiers: [
      {
        name: "Essential",
        description: "Core features to get started",
        price: "$19",
        period: "/month",
        features: [
          "All essential features",
          "Up to 3 team members",
          "10 GB storage",
          "Standard support",
          "Basic reporting",
        ],
        cta: {
          text: "Start with Essential",
          href: "/essential",
        },
      },
      {
        name: "Premium",
        description: "Full suite for serious users",
        price: "$49",
        period: "/month",
        recommended: true,
        badge: "Everything Included",
        features: [
          "All features unlocked",
          "Unlimited team members",
          "Unlimited storage",
          "Priority support",
          "Advanced reporting",
          "Custom branding",
          "API & webhooks",
          "SSO authentication",
        ],
        cta: {
          text: "Go Premium",
          href: "/premium",
        },
      },
    ],
  },
  // Usage-based tiers
  {
    headline: "Pay for what you use",
    subheadline: "Transparent pricing based on your needs",
    tiers: [
      {
        name: "Lite",
        description: "Up to 1,000 API calls",
        price: "$29",
        period: "/month",
        features: [
          "1,000 API calls",
          "Basic rate limiting",
          "Community support",
          "Standard SLA",
        ],
        cta: {
          text: "Start Lite",
          href: "/api/lite",
        },
      },
      {
        name: "Pro",
        description: "Up to 10,000 API calls",
        price: "$99",
        period: "/month",
        recommended: true,
        features: [
          "10,000 API calls",
          "Priority rate limiting",
          "Email support",
          "99.9% SLA",
          "Advanced analytics",
        ],
        cta: {
          text: "Start Pro",
          href: "/api/pro",
        },
      },
      {
        name: "Scale",
        description: "Up to 100,000 API calls",
        price: "$299",
        period: "/month",
        features: [
          "100,000 API calls",
          "Dedicated infrastructure",
          "24/7 phone support",
          "99.99% SLA",
          "Custom endpoints",
          "Volume discounts available",
        ],
        cta: {
          text: "Start Scale",
          href: "/api/scale",
        },
      },
    ],
  },
  // Creative industry pricing
  {
    headline: "Plans for every creator",
    tiers: [
      {
        name: "Hobbyist",
        description: "For personal projects",
        price: "$15",
        period: "/month",
        features: [
          "5 active projects",
          "Basic editing tools",
          "1080p exports",
          "Community forum",
        ],
        cta: {
          text: "Start Creating",
          href: "/hobbyist",
        },
      },
      {
        name: "Creator",
        description: "For content creators",
        price: "$35",
        period: "/month",
        recommended: true,
        badge: "Creator's Choice",
        features: [
          "Unlimited projects",
          "Pro editing tools",
          "4K exports",
          "Priority rendering",
          "Stock media library",
          "Commercial license",
        ],
        cta: {
          text: "Become a Creator",
          href: "/creator",
        },
      },
      {
        name: "Studio",
        description: "For professional studios",
        price: "$99",
        period: "/month",
        features: [
          "Everything in Creator",
          "Team collaboration",
          "8K exports",
          "Dedicated support",
          "Custom plugins",
          "Enterprise license",
          "Training included",
        ],
        cta: {
          text: "Contact Studio Sales",
          href: "/studio",
        },
      },
    ],
    showDecorations: true,
  },
];