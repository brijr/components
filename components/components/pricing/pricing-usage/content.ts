export const defaultContent = {
  headline: "Pay Only for What You Use",
  subheadline:
    "Transparent, usage-based pricing that scales with your business. No surprises, no hidden fees.",
  basePrice: {
    amount: 0,
    currency: "$",
    description: "Free tier includes 1,000 API calls per month",
  },
  usageTiers: [
    {
      name: "Starter",
      range: "0 - 10K",
      pricePerUnit: 0.001,
      unit: "API call",
      features: ["Basic support", "99.9% uptime"],
    },
    {
      name: "Growth",
      range: "10K - 100K",
      pricePerUnit: 0.0008,
      unit: "API call",
      features: ["Priority support", "99.95% uptime"],
    },
    {
      name: "Scale",
      range: "100K - 1M",
      pricePerUnit: 0.0005,
      unit: "API call",
      features: ["Dedicated support", "99.99% uptime"],
    },
    {
      name: "Enterprise",
      range: "1M+",
      pricePerUnit: 0.0003,
      unit: "API call",
      features: ["Custom SLA", "24/7 phone support"],
    },
  ],
  examples: [
    {
      usage: "5,000 API calls/month",
      cost: "$5/month",
      description: "Perfect for small projects and testing",
    },
    {
      usage: "50,000 API calls/month",
      cost: "$40/month",
      description: "Ideal for growing applications",
    },
    {
      usage: "500,000 API calls/month",
      cost: "$250/month",
      description: "For high-traffic production apps",
    },
    {
      usage: "5,000,000 API calls/month",
      cost: "$1,500/month",
      description: "Enterprise-scale operations",
    },
  ],
  primaryCTA: {
    text: "Start Free",
    href: "/signup",
  },
  secondaryCTA: {
    text: "View Pricing Calculator",
    href: "/pricing/calculator",
  },
};