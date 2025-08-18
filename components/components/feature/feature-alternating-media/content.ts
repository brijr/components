export const defaultContent = {
  headline: "Powerful Features for Every Workflow",
  subheadline:
    "Discover how our platform adapts to your unique needs with flexible, powerful features.",
  features: [
    {
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows with our intelligent automation engine. Set up custom triggers, actions, and conditions to streamline your processes.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: "Automation dashboard",
      },
      bullets: [
        "Visual workflow builder",
        "100+ pre-built integrations",
        "Custom API connections",
        "Real-time monitoring",
      ],
      cta: {
        text: "Explore Automation",
        href: "/features/automation",
      },
    },
    {
      title: "Advanced Analytics",
      description:
        "Get deep insights into your data with our comprehensive analytics suite. Track metrics, visualize trends, and make data-driven decisions with confidence.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: "Analytics dashboard",
      },
      bullets: [
        "Custom dashboards",
        "Real-time data processing",
        "Predictive analytics",
        "Export to any format",
      ],
      cta: {
        text: "View Analytics Demo",
        href: "/demo/analytics",
      },
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with built-in collaboration tools. Share projects, leave comments, and stay synchronized across your entire organization.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        alt: "Team collaboration",
      },
      bullets: [
        "Real-time co-editing",
        "Threaded discussions",
        "Version control",
        "Role-based permissions",
      ],
      cta: {
        text: "Learn About Teams",
        href: "/features/teams",
      },
    },
  ],
};