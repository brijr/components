export const defaultContent = {
  headline: "Everything You Need to Succeed",
  subheadline: "POWERFUL FEATURES",
  description:
    "Built for modern teams who demand performance, reliability, and exceptional developer experience.",
  features: [
    {
      icon: "Code2" as const,
      title: "Intelligent Development",
      description:
        "AI-powered code completion, smart refactoring, and real-time error detection help you ship better code faster.",
    },
    {
      icon: "Settings2" as const,
      title: "Complete Control",
      description:
        "Fine-tune every aspect with advanced configuration options that adapt to your unique workflow requirements.",
    },
    {
      icon: "Users2" as const,
      title: "Seamless Collaboration",
      description:
        "Real-time co-editing, inline code reviews, and shared workspaces keep your entire team perfectly synchronized.",
    },
    {
      icon: "BarChart3" as const,
      title: "Actionable Analytics",
      description:
        "Track performance metrics, identify bottlenecks, and make data-driven decisions with comprehensive insights.",
    },
    {
      icon: "Heart" as const,
      title: "Developer First",
      description:
        "Thoughtfully crafted with keyboard shortcuts, powerful CLI tools, and an intuitive interface developers love.",
    },
    {
      icon: "TrendingUp" as const,
      title: "Scale Without Limits",
      description:
        "Enterprise-grade infrastructure that automatically scales with your growth, from prototype to production.",
    },
  ],
  primaryCTA: {
    text: "Start Building",
    href: "/signup",
  },
  secondaryCTA: {
    text: "View Documentation",
    href: "/docs",
  },
  layout: "two-column" as const,
};