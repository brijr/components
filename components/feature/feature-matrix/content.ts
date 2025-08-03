import type { FeatureMatrixProps } from "./index";

export const defaultContent: FeatureMatrixProps = {
  headline: "Compare our plans",
  subheadline: "Choose the perfect plan for your team's needs",
  plans: [
    {
      name: "Starter",
      description: "For individuals",
      price: "$9",
      period: "per month",
    },
    {
      name: "Professional",
      description: "For growing teams",
      price: "$29",
      period: "per month",
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Business",
      description: "For larger teams",
      price: "$79",
      period: "per month",
    },
    {
      name: "Enterprise",
      description: "For organizations",
      price: "Custom",
    },
  ],
  categories: [
    {
      name: "Core Features",
      features: [
        {
          name: "User accounts",
          tooltip: "Number of user accounts included",
          availability: ["5", "25", "100", "Unlimited"],
        },
        {
          name: "Projects",
          tooltip: "Number of active projects",
          availability: ["3", "15", "50", "Unlimited"],
        },
        {
          name: "Storage",
          availability: ["10 GB", "100 GB", "500 GB", "Unlimited"],
        },
        {
          name: "API access",
          tooltip: "Access to our RESTful API",
          availability: [false, true, true, true],
        },
        {
          name: "Custom domain",
          availability: [false, true, true, true],
        },
        {
          name: "SSL certificate",
          availability: [true, true, true, true],
        },
      ],
    },
    {
      name: "Collaboration",
      features: [
        {
          name: "Team collaboration",
          availability: [true, true, true, true],
        },
        {
          name: "Guest access",
          tooltip: "Invite external collaborators",
          availability: [false, true, true, true],
        },
        {
          name: "Real-time sync",
          availability: [true, true, true, true],
        },
        {
          name: "Version history",
          tooltip: "Days of version history",
          availability: ["7 days", "30 days", "90 days", "Unlimited"],
        },
        {
          name: "Comments & annotations",
          availability: [true, true, true, true],
        },
      ],
    },
    {
      name: "Analytics & Reporting",
      features: [
        {
          name: "Basic analytics",
          availability: [true, true, true, true],
        },
        {
          name: "Advanced analytics",
          availability: [false, true, true, true],
        },
        {
          name: "Custom reports",
          availability: [false, false, true, true],
        },
        {
          name: "Export data",
          tooltip: "Export formats available",
          availability: ["CSV", "CSV, PDF", "CSV, PDF, Excel", "All formats"],
        },
        {
          name: "API analytics",
          availability: [false, false, true, true],
        },
      ],
    },
    {
      name: "Security & Compliance",
      features: [
        {
          name: "Two-factor auth",
          availability: [true, true, true, true],
        },
        {
          name: "SSO/SAML",
          tooltip: "Single Sign-On support",
          availability: [false, false, true, true],
        },
        {
          name: "Audit logs",
          availability: [false, true, true, true],
        },
        {
          name: "GDPR compliance",
          availability: [true, true, true, true],
        },
        {
          name: "SOC 2 certified",
          availability: [false, false, false, true],
        },
        {
          name: "Custom SLA",
          availability: [false, false, false, true],
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "Email support",
          availability: [true, true, true, true],
        },
        {
          name: "Priority support",
          availability: [false, true, true, true],
        },
        {
          name: "Phone support",
          availability: [false, false, true, true],
        },
        {
          name: "Dedicated manager",
          availability: [false, false, false, true],
        },
        {
          name: "Response time",
          tooltip: "Guaranteed response time",
          availability: ["48h", "24h", "4h", "1h"],
        },
        {
          name: "Onboarding assistance",
          availability: [false, true, true, true],
        },
      ],
    },
  ],
};

export const contentVariations = [
  // SaaS variation
  {
    headline: "Find your perfect plan",
    subheadline: "All plans include a 14-day free trial",
    plans: [
      {
        name: "Free",
        description: "Get started",
        price: "$0",
        period: "forever",
      },
      {
        name: "Pro",
        description: "Best value",
        price: "$19",
        period: "per user/month",
        featured: true,
        badge: "Save 20%",
      },
      {
        name: "Team",
        description: "For teams",
        price: "$49",
        period: "per user/month",
      },
    ],
    categories: [
      {
        name: "Usage Limits",
        features: [
          {
            name: "Monthly active users",
            availability: ["1,000", "10,000", "Unlimited"],
          },
          {
            name: "API calls",
            availability: ["10k/month", "100k/month", "Unlimited"],
          },
          {
            name: "Bandwidth",
            availability: ["10 GB", "100 GB", "Unlimited"],
          },
        ],
      },
      {
        name: "Features",
        features: [
          {
            name: "Dashboard",
            availability: [true, true, true],
          },
          {
            name: "Integrations",
            availability: ["5", "Unlimited", "Unlimited"],
          },
          {
            name: "White-label",
            availability: [false, false, true],
          },
        ],
      },
    ],
  },
  // Simple comparison
  {
    headline: "Choose your plan",
    plans: [
      { name: "Basic" },
      { name: "Premium", featured: true },
      { name: "Ultimate" },
    ],
    categories: [
      {
        name: "Features",
        features: [
          {
            name: "Core functionality",
            availability: [true, true, true],
          },
          {
            name: "Advanced features",
            availability: [false, true, true],
          },
          {
            name: "Premium features",
            availability: [false, false, true],
          },
          {
            name: "Priority support",
            availability: [false, true, true],
          },
          {
            name: "Custom branding",
            availability: [false, false, true],
          },
        ],
      },
    ],
  },
];