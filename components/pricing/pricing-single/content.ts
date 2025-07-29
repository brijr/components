import { PricingSingleProps } from "./index";

export const defaultContent: PricingSingleProps = {
  headline: "Simple, transparent pricing",
  subheadline: "Everything you need to grow your business",
  price: "$49",
  period: "/month",
  priceDescription: "No setup fees. Cancel anytime.",
  features: [
    "Unlimited projects and collaborators",
    "Advanced analytics and reporting",
    "24/7 priority customer support",
    "API access and webhooks",
    "Custom integrations",
    "99.9% uptime guarantee",
    "Daily automated backups",
    "End-to-end encryption",
  ],
  primaryCTA: {
    text: "Start 14-Day Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "Book a Demo",
    href: "/demo",
  },
  guarantee: "30-day money-back guarantee",
};

export const contentVariations: PricingSingleProps[] = [
  // Lifetime deal
  {
    headline: "Get lifetime access",
    subheadline: "Pay once, use forever",
    price: "$299",
    priceDescription: "One-time payment. No recurring fees.",
    features: [
      "Lifetime access to all features",
      "All future updates included",
      "Priority support for life",
      "Unlimited projects",
      "Commercial license",
      "Source code access",
    ],
    primaryCTA: {
      text: "Buy Lifetime Access",
      href: "/purchase",
    },
    guarantee: "60-day money-back guarantee",
  },
  // Freemium model
  {
    headline: "Start for free, upgrade when ready",
    subheadline: "No credit card required",
    price: "$0",
    period: "/month",
    priceDescription: "Free forever for up to 3 projects",
    features: [
      "Up to 3 active projects",
      "Basic features and tools",
      "Community support",
      "1 GB storage",
      "SSL certificates",
      "Mobile app access",
    ],
    primaryCTA: {
      text: "Create Free Account",
      href: "/signup",
    },
    secondaryCTA: {
      text: "View Pro Features",
      href: "/pro",
    },
  },
  // Consultant/service pricing
  {
    headline: "Professional consulting services",
    subheadline: "Expert guidance for your project",
    price: "$2,500",
    period: "/month",
    priceDescription: "Minimum 3-month engagement",
    features: [
      "Weekly strategy sessions",
      "Dedicated project manager",
      "Custom implementation",
      "Performance optimization",
      "Team training included",
      "24/7 emergency support",
      "Monthly progress reports",
    ],
    primaryCTA: {
      text: "Schedule Consultation",
      href: "/consultation",
    },
    secondaryCTA: {
      text: "View Case Studies",
      href: "/case-studies",
    },
  },
  // Course/education pricing
  {
    headline: "Master the skills that matter",
    subheadline: "Complete course with lifetime access",
    price: "$197",
    priceDescription: "One-time payment. Instant access.",
    features: [
      "12 hours of video content",
      "Downloadable resources",
      "Interactive assignments",
      "Certificate of completion",
      "Private student community",
      "Live Q&A sessions",
      "30-day money-back guarantee",
    ],
    primaryCTA: {
      text: "Enroll Now",
      href: "/enroll",
    },
    secondaryCTA: {
      text: "Preview Course",
      href: "/preview",
    },
    guarantee: "30-day money-back guarantee",
  },
  // App subscription
  {
    headline: "Premium features for power users",
    price: "$9.99",
    period: "/month",
    priceDescription: "Billed monthly. Cancel anytime.",
    features: [
      "Unlimited cloud sync",
      "Advanced editing tools",
      "Priority processing",
      "No ads",
      "Offline mode",
      "Premium templates",
      "Export in all formats",
    ],
    primaryCTA: {
      text: "Try Premium Free",
      href: "/premium-trial",
    },
  },
  // Enterprise quote
  {
    headline: "Enterprise solutions",
    subheadline: "Tailored for your organization's needs",
    price: "Custom",
    priceDescription: "Based on your requirements",
    features: [
      "Unlimited users and projects",
      "On-premise deployment option",
      "Custom integrations",
      "Dedicated support team",
      "SLA guarantees",
      "Security audit reports",
      "Training and onboarding",
      "Custom contract terms",
    ],
    primaryCTA: {
      text: "Get a Quote",
      href: "/enterprise-quote",
    },
    secondaryCTA: {
      text: "Talk to Sales",
      href: "/contact-sales",
    },
  },
];