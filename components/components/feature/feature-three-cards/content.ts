export const defaultContent = {
  headline: "Built for Performance, Security, and Reliability",
  subheadline:
    "Enterprise-grade infrastructure with the developer experience you'll love.",
  features: [
    {
      icon: "Zap" as const,
      title: "Blazing Fast Performance",
      description:
        "Sub-second response times with global CDN, edge computing, and optimized caching. Your users will feel the difference.",
      link: {
        text: "See benchmarks",
        href: "/performance",
      },
    },
    {
      icon: "Shield" as const,
      title: "Bank-Level Security",
      description:
        "SOC 2 Type II certified with end-to-end encryption, GDPR compliance, and advanced threat protection built in.",
      link: {
        text: "Security overview",
        href: "/security",
      },
    },
    {
      icon: "Activity" as const,
      title: "99.99% Uptime SLA",
      description:
        "Redundant infrastructure across multiple regions with automatic failover and real-time health monitoring.",
      link: {
        text: "View status",
        href: "/status",
      },
    },
  ],
  primaryCTA: {
    text: "Explore All Features",
    href: "/features",
  },
};