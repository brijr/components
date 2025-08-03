import type { FeatureSpotlightProps } from "./index";

export const defaultContent: FeatureSpotlightProps = {
  headline: "Features that make a difference",
  subheadline: "Discover how our platform empowers teams to achieve more",
  direction: "alternating",
  features: [
    {
      title: "Advanced Analytics Dashboard",
      description: "Get deep insights into your data with our comprehensive analytics suite. Track performance metrics, identify trends, and make data-driven decisions with confidence.",
      image: {
        src: "/placeholder.svg",
        alt: "Analytics dashboard showing various charts and metrics",
      },
      badge: "New",
      benefits: [
        "Real-time data visualization with interactive charts",
        "Custom report builder with drag-and-drop interface",
        "Export reports in PDF, CSV, or Excel formats",
        "Team collaboration with shared dashboards",
        "AI-powered insights and recommendations",
      ],
      cta: {
        label: "Explore Analytics",
        href: "/features/analytics",
      },
      testimonial: {
        quote: "The analytics dashboard transformed how we make decisions. We now have insights that were previously hidden in our data.",
        author: "Sarah Chen",
        role: "Head of Product",
        company: "TechCorp",
        avatar: {
          src: "/placeholder.svg",
          alt: "Sarah Chen",
        },
      },
    },
    {
      title: "Intelligent Workflow Automation",
      description: "Automate repetitive tasks and complex workflows with our visual automation builder. Save time, reduce errors, and let your team focus on what matters most.",
      image: {
        src: "/placeholder.svg",
        alt: "Visual workflow automation builder interface",
      },
      benefits: [
        "Visual workflow builder with no coding required",
        "100+ pre-built integrations with popular tools",
        "Conditional logic and advanced branching",
        "Built-in error handling and retry mechanisms",
        "Schedule automations or trigger by events",
      ],
      cta: {
        label: "Start Automating",
        href: "/features/automation",
        variant: "outline",
      },
    },
    {
      title: "Enterprise-Grade Security",
      description: "Rest easy knowing your data is protected by industry-leading security measures. We take security seriously so you can focus on growing your business.",
      image: {
        src: "/placeholder.svg",
        alt: "Security dashboard showing protection status",
      },
      badge: "Enterprise",
      benefits: [
        "End-to-end encryption for all data",
        "SOC 2 Type II and ISO 27001 certified",
        "Advanced threat detection and prevention",
        "Role-based access control (RBAC)",
        "Regular security audits and penetration testing",
        "99.99% uptime SLA guarantee",
      ],
      testimonial: {
        quote: "Security was our top concern when choosing a platform. This solution exceeded our expectations with its comprehensive security features.",
        author: "Michael Roberts",
        role: "CISO",
        company: "FinanceHub",
        avatar: {
          src: "/placeholder.svg",
          alt: "Michael Roberts",
        },
      },
      cta: {
        label: "View Security Features",
        href: "/security",
      },
    },
  ],
};

export const contentVariations = [
  // Product showcase variation
  {
    headline: "Revolutionary features for modern teams",
    subheadline: "See what makes our platform the choice of industry leaders",
    features: [
      {
        title: "AI-Powered Insights",
        description: "Leverage artificial intelligence to uncover hidden patterns and opportunities in your data. Our ML algorithms continuously learn and improve to provide better recommendations.",
        image: {
          src: "/placeholder.svg",
          alt: "AI insights dashboard",
        },
        badge: "Beta",
        benefits: [
          "Predictive analytics for trend forecasting",
          "Automated anomaly detection",
          "Natural language query interface",
          "Smart recommendations engine",
        ],
        cta: {
          label: "Try AI Features",
          href: "/features/ai",
        },
      },
      {
        title: "Global Collaboration Hub",
        description: "Connect teams across the globe with our real-time collaboration tools. Work together seamlessly, regardless of location or timezone.",
        image: {
          src: "/placeholder.svg",
          alt: "Team collaboration interface",
        },
        benefits: [
          "Real-time document collaboration",
          "HD video conferencing built-in",
          "Instant translation for 50+ languages",
          "Timezone-aware scheduling",
        ],
        testimonial: {
          quote: "Our distributed team has never been more connected. The collaboration features are game-changing.",
          author: "Elena Vasquez",
          role: "VP of Engineering",
          company: "GlobalTech",
        },
        cta: {
          label: "See Collaboration Tools",
          href: "/features/collaboration",
          variant: "secondary",
        },
      },
    ],
    direction: "left",
  },
  // Simple variation
  {
    headline: "Key features that drive success",
    features: [
      {
        title: "Lightning Fast Performance",
        description: "Experience blazing fast load times and instant responses. Our optimized infrastructure ensures your work never slows down.",
        image: {
          src: "/placeholder.svg",
          alt: "Performance metrics dashboard",
        },
        benefits: [
          "Sub-second page loads",
          "Global CDN with 200+ edge locations",
          "Optimized for mobile devices",
          "Offline mode support",
        ],
      },
      {
        title: "Seamless Integrations",
        description: "Connect with all your favorite tools and services. Our platform plays nicely with your existing tech stack.",
        image: {
          src: "/placeholder.svg",
          alt: "Integration ecosystem visualization",
        },
        cta: {
          label: "View All Integrations",
          href: "/integrations",
        },
      },
    ],
  },
];