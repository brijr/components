import { PricingSimpleProps } from "./index";

export const defaultContent: PricingSimpleProps = {
  headline: "Choose your plan",
  subheadline: "Start free, upgrade anytime. No credit card required.",
  plans: [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: "$0",
      period: "/month",
      features: [
        { text: "Up to 3 projects" },
        { text: "Basic analytics" },
        { text: "48-hour support" },
        { text: "1 GB storage" },
        { text: "Basic integrations" },
      ],
      cta: {
        text: "Start Free",
        href: "/signup",
      },
    },
    {
      name: "Professional",
      description: "For growing teams and businesses",
      price: "$29",
      period: "/month",
      recommended: true,
      features: [
        { text: "Unlimited projects" },
        { text: "Advanced analytics" },
        { text: "Priority 24/7 support" },
        { text: "50 GB storage" },
        { text: "All integrations" },
        { text: "Custom workflows" },
        { text: "Team collaboration" },
      ],
      cta: {
        text: "Start Free Trial",
        href: "/signup?plan=pro",
      },
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: "$99",
      period: "/month",
      features: [
        { text: "Everything in Pro" },
        { text: "Unlimited storage" },
        { text: "Dedicated support" },
        { text: "Custom integrations" },
        { text: "Advanced security" },
        { text: "SLA guarantee" },
        { text: "API access" },
        { text: "Custom training" },
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact-sales",
      },
    },
  ],
};

export const contentVariations: PricingSimpleProps[] = [
  // Two-tier pricing
  {
    headline: "Simple, transparent pricing",
    subheadline: "Choose the plan that fits your needs",
    plans: [
      {
        name: "Personal",
        description: "Everything you need to get started",
        price: "$15",
        period: "/month",
        features: [
          { text: "5 projects" },
          { text: "Basic features" },
          { text: "Email support" },
          { text: "10 GB storage" },
        ],
        cta: {
          text: "Get Started",
          href: "/signup",
        },
      },
      {
        name: "Team",
        description: "Advanced features for your whole team",
        price: "$49",
        period: "/month",
        recommended: true,
        features: [
          { text: "Unlimited projects" },
          { text: "All features" },
          { text: "Priority support" },
          { text: "100 GB storage" },
          { text: "Team management" },
          { text: "Advanced analytics" },
        ],
        cta: {
          text: "Start Free Trial",
          href: "/signup?plan=team",
        },
      },
    ],
  },
  // Feature-focused pricing
  {
    headline: "Pricing that scales with you",
    plans: [
      {
        name: "Basic",
        description: "Essential features",
        price: "$19",
        period: "/month",
        features: [
          { text: "Core features", included: true },
          { text: "5 team members", included: true },
          { text: "Basic support", included: true },
          { text: "Advanced features", included: false },
          { text: "Priority support", included: false },
        ],
        cta: {
          text: "Choose Basic",
          href: "/signup?plan=basic",
        },
      },
      {
        name: "Pro",
        description: "Most popular choice",
        price: "$49",
        period: "/month",
        recommended: true,
        features: [
          { text: "Everything in Basic", included: true },
          { text: "25 team members", included: true },
          { text: "Advanced features", included: true },
          { text: "Priority support", included: true },
          { text: "Custom branding", included: false },
        ],
        cta: {
          text: "Choose Pro",
          href: "/signup?plan=pro",
        },
      },
      {
        name: "Business",
        description: "For larger teams",
        price: "$99",
        period: "/month",
        features: [
          { text: "Everything in Pro", included: true },
          { text: "Unlimited team members", included: true },
          { text: "Custom branding", included: true },
          { text: "Dedicated account manager", included: true },
          { text: "99.9% uptime SLA", included: true },
        ],
        cta: {
          text: "Choose Business",
          href: "/signup?plan=business",
        },
      },
    ],
  },
  // Annual pricing focus
  {
    headline: "Save 20% with annual billing",
    subheadline: "All plans include a 14-day free trial",
    plans: [
      {
        name: "Freelancer",
        description: "For independent professionals",
        price: "$96",
        period: "/year",
        features: [
          { text: "1 user" },
          { text: "10 projects" },
          { text: "Basic tools" },
          { text: "Email support" },
        ],
        cta: {
          text: "Start Trial",
          href: "/trial?plan=freelancer",
        },
      },
      {
        name: "Studio",
        description: "For creative teams",
        price: "$480",
        period: "/year",
        recommended: true,
        features: [
          { text: "5 users" },
          { text: "Unlimited projects" },
          { text: "Advanced tools" },
          { text: "Priority support" },
          { text: "Collaboration features" },
        ],
        cta: {
          text: "Start Trial",
          href: "/trial?plan=studio",
        },
      },
      {
        name: "Agency",
        description: "For growing agencies",
        price: "$960",
        period: "/year",
        features: [
          { text: "25 users" },
          { text: "Everything in Studio" },
          { text: "White-label options" },
          { text: "Dedicated support" },
          { text: "Custom workflows" },
          { text: "Advanced permissions" },
        ],
        cta: {
          text: "Start Trial",
          href: "/trial?plan=agency",
        },
      },
    ],
  },
];