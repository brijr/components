export const defaultContent = {
  headline: "One Platform, Endless Possibilities",
  subheadline: "Explore how different teams use our platform to achieve their goals",
  tabs: [
    {
      id: "developers",
      label: "For Developers",
      title: "Build Faster with Modern Tools",
      description:
        "Streamline your development workflow with powerful IDE integrations, CI/CD pipelines, and automated testing.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
        alt: "Developer workspace",
      },
      features: [
        "Git integration & version control",
        "Automated testing & deployment",
        "Code review workflows",
        "API documentation generator",
        "Performance monitoring",
      ],
      cta: {
        text: "Start Coding",
        href: "/developers",
      },
    },
    {
      id: "designers",
      label: "For Designers",
      title: "Design Systems at Scale",
      description:
        "Create consistent, beautiful designs with our comprehensive design system tools and collaborative features.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        alt: "Design workspace",
      },
      features: [
        "Component libraries",
        "Design tokens management",
        "Figma & Sketch plugins",
        "Responsive preview",
        "Design handoff tools",
      ],
      cta: {
        text: "Explore Design Tools",
        href: "/designers",
      },
    },
    {
      id: "managers",
      label: "For Managers",
      title: "Lead with Confidence",
      description:
        "Get complete visibility into your team's progress with comprehensive project management and reporting tools.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
        alt: "Management dashboard",
      },
      features: [
        "Team performance metrics",
        "Resource allocation",
        "Sprint planning tools",
        "Budget tracking",
        "Custom reporting",
      ],
      cta: {
        text: "View Management Features",
        href: "/managers",
      },
    },
    {
      id: "marketers",
      label: "For Marketers",
      title: "Grow Your Audience",
      description:
        "Launch campaigns, track performance, and optimize your marketing efforts with data-driven insights.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop",
        alt: "Marketing dashboard",
      },
      features: [
        "Campaign management",
        "A/B testing tools",
        "Analytics & attribution",
        "Content calendar",
        "Social media integration",
      ],
      cta: {
        text: "Boost Your Marketing",
        href: "/marketers",
      },
    },
  ],
  primaryCTA: {
    text: "Get Started Free",
    href: "/signup",
  },
};