import { PricingWithToggleProps } from "./index";

export const defaultContent: PricingWithToggleProps = {
  headline: "Choose the perfect plan for your team",
  subheadline: "Start with a 14-day free trial. No credit card required.",
  monthlyLabel: "Monthly",
  annualLabel: "Annual",
  annualDiscount: "Save 20%",
  plans: [
    {
      name: "Starter",
      description: "Perfect for freelancers and small projects",
      monthlyPrice: "$19",
      annualPrice: "$15",
      features: [
        "Up to 5 projects",
        "2 team members",
        "Basic analytics",
        "5 GB storage",
        "Email support",
        "Mobile app access",
      ],
      cta: {
        text: "Start Free Trial",
        href: "/signup",
      },
    },
    {
      name: "Professional",
      description: "For growing teams and businesses",
      monthlyPrice: "$49",
      annualPrice: "$39",
      recommended: true,
      features: [
        "Unlimited projects",
        "10 team members",
        "Advanced analytics",
        "100 GB storage",
        "Priority support",
        "Custom integrations",
        "API access",
        "Team collaboration tools",
      ],
      cta: {
        text: "Start Free Trial",
        href: "/signup?plan=pro",
      },
    },
    {
      name: "Enterprise",
      description: "For large teams with advanced needs",
      monthlyPrice: "$149",
      annualPrice: "$119",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Unlimited storage",
        "24/7 phone support",
        "Custom workflows",
        "Advanced security",
        "Dedicated account manager",
        "Custom contract available",
      ],
      cta: {
        text: "Contact Sales",
        href: "/contact-sales",
      },
    },
  ],
};

export const contentVariations: PricingWithToggleProps[] = [
  // Startup-focused pricing
  {
    headline: "Pricing that grows with your startup",
    subheadline: "All plans include unlimited updates and SSL certificate",
    annualDiscount: "2 months free",
    plans: [
      {
        name: "Launch",
        description: "Get your idea off the ground",
        monthlyPrice: "$29",
        annualPrice: "$24",
        features: [
          "1 website",
          "10,000 monthly visits",
          "Basic SEO tools",
          "Community support",
          "Standard performance",
        ],
        cta: {
          text: "Start Building",
          href: "/signup?plan=launch",
        },
      },
      {
        name: "Grow",
        description: "Scale your business",
        monthlyPrice: "$79",
        annualPrice: "$66",
        recommended: true,
        features: [
          "3 websites",
          "100,000 monthly visits",
          "Advanced SEO tools",
          "Priority support",
          "Enhanced performance",
          "A/B testing",
          "Advanced analytics",
        ],
        cta: {
          text: "Start Growing",
          href: "/signup?plan=grow",
        },
      },
      {
        name: "Scale",
        description: "Enterprise-ready platform",
        monthlyPrice: "$299",
        annualPrice: "$249",
        features: [
          "Unlimited websites",
          "Unlimited visits",
          "Enterprise SEO suite",
          "Dedicated support",
          "Maximum performance",
          "Custom integrations",
          "White-label options",
          "SLA guarantee",
        ],
        cta: {
          text: "Talk to Sales",
          href: "/enterprise",
        },
      },
    ],
  },
  // Creator economy pricing
  {
    headline: "Monetize your content",
    subheadline: "Keep 100% of your earnings. We only charge for platform usage.",
    monthlyLabel: "Monthly billing",
    annualLabel: "Yearly billing",
    annualDiscount: "Save 25%",
    plans: [
      {
        name: "Creator",
        description: "Start monetizing your audience",
        monthlyPrice: "$9",
        annualPrice: "$7",
        features: [
          "Unlimited posts",
          "Basic analytics",
          "Email subscribers",
          "Payment processing",
          "Mobile app",
        ],
        cta: {
          text: "Start Creating",
          href: "/creator-signup",
        },
      },
      {
        name: "Professional",
        description: "Build a sustainable business",
        monthlyPrice: "$29",
        annualPrice: "$22",
        recommended: true,
        features: [
          "Everything in Creator",
          "Advanced analytics",
          "Custom domain",
          "Priority support",
          "Membership tiers",
          "Exclusive content",
          "Community features",
        ],
        cta: {
          text: "Go Professional",
          href: "/pro-signup",
        },
      },
    ],
  },
  // B2B SaaS pricing
  {
    headline: "Enterprise-ready from day one",
    annualDiscount: "Save up to 30%",
    plans: [
      {
        name: "Team",
        description: "For small teams",
        monthlyPrice: "$99",
        annualPrice: "$69",
        features: [
          "Up to 20 users",
          "SSO authentication",
          "99.9% uptime SLA",
          "Advanced permissions",
          "API access",
          "24/7 support",
        ],
        cta: {
          text: "Start Trial",
          href: "/team-trial",
        },
      },
      {
        name: "Business",
        description: "For growing companies",
        monthlyPrice: "$299",
        annualPrice: "$209",
        recommended: true,
        features: [
          "Up to 100 users",
          "Everything in Team",
          "Advanced security",
          "Custom integrations",
          "Dedicated CSM",
          "Training sessions",
          "Priority roadmap input",
        ],
        cta: {
          text: "Start Trial",
          href: "/business-trial",
        },
      },
      {
        name: "Enterprise",
        description: "For large organizations",
        monthlyPrice: "Custom",
        annualPrice: "Custom",
        features: [
          "Unlimited users",
          "Everything in Business",
          "Custom contracts",
          "On-premise option",
          "24/7 phone support",
          "Professional services",
          "Custom development",
        ],
        cta: {
          text: "Contact Us",
          href: "/enterprise-contact",
        },
      },
    ],
  },
];