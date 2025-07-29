import { FeatureCardsProps } from "./index";

export const defaultContent: FeatureCardsProps = {
  headline: "See it in action",
  subheadline: "Powerful features designed to help you work smarter and faster",
  features: [
    {
      title: "Analytics Dashboard",
      description: "Track your key metrics in real-time with customizable dashboards and detailed insights.",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      imageAlt: "Analytics dashboard showing charts and metrics",
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with built-in chat, file sharing, and project management tools.",
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
      imageAlt: "Team collaborating around a table",
    },
    {
      title: "Workflow Automation",
      description: "Automate repetitive tasks and create custom workflows to save time and reduce errors.",
      imageSrc: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop",
      imageAlt: "Workflow automation interface",
    },
    {
      title: "Mobile Experience",
      description: "Access your work from anywhere with our fully-featured mobile applications.",
      imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
      imageAlt: "Mobile app interface on smartphone",
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security with encryption, SSO, and compliance certifications.",
      imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
      imageAlt: "Security dashboard with lock icon",
    },
    {
      title: "API Integration",
      description: "Connect with your favorite tools using our comprehensive REST and GraphQL APIs.",
      imageSrc: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop",
      imageAlt: "Code editor showing API integration",
    },
  ],
  columns: 3,
};

export const contentVariations: FeatureCardsProps[] = [
  // E-commerce variation
  {
    headline: "Everything you need to sell online",
    subheadline: "Powerful e-commerce features to grow your business",
    features: [
      {
        title: "Product Management",
        description: "Easily manage inventory, variants, and pricing with our intuitive interface.",
        imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
        imageAlt: "Product management dashboard",
      },
      {
        title: "Order Processing",
        description: "Streamline order fulfillment with automated workflows and shipping integrations.",
        imageSrc: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=450&fit=crop",
        imageAlt: "Order processing interface",
      },
      {
        title: "Customer Analytics",
        description: "Understand your customers better with detailed purchase history and behavior analytics.",
        imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        imageAlt: "Customer analytics dashboard",
      },
      {
        title: "Marketing Tools",
        description: "Built-in email campaigns, discount codes, and abandoned cart recovery.",
        imageSrc: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop",
        imageAlt: "Marketing campaign builder",
      },
    ],
    columns: 2,
  },
  // SaaS product variation
  {
    headline: "Features that scale with you",
    features: [
      {
        title: "Real-time Monitoring",
        description: "Monitor application performance and user activity in real-time.",
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        imageAlt: "Real-time monitoring dashboard",
      },
      {
        title: "Custom Reporting",
        description: "Create custom reports and export data in multiple formats.",
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        imageAlt: "Custom reporting interface",
      },
      {
        title: "User Management",
        description: "Manage users, roles, and permissions with granular control.",
        imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
        imageAlt: "User management dashboard",
      },
    ],
    columns: 3,
  },
  // Design tool variation
  {
    headline: "Design tools that inspire creativity",
    subheadline: "Professional features for designers and creative teams",
    features: [
      {
        title: "Vector Editor",
        description: "Powerful vector editing tools with precision control and advanced path operations.",
        imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
        imageAlt: "Vector editing interface",
      },
      {
        title: "Component Library",
        description: "Build and maintain consistent design systems with reusable components.",
        imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
        imageAlt: "Component library interface",
      },
      {
        title: "Real-time Collaboration",
        description: "Work together in real-time with cursor tracking and live updates.",
        imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
        imageAlt: "Collaborative design workspace",
      },
      {
        title: "Version History",
        description: "Never lose work with automatic saves and unlimited version history.",
        imageSrc: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=450&fit=crop",
        imageAlt: "Version history timeline",
      },
      {
        title: "Export Options",
        description: "Export to any format with customizable settings and batch processing.",
        imageSrc: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=450&fit=crop",
        imageAlt: "Export options dialog",
      },
      {
        title: "Plugin Ecosystem",
        description: "Extend functionality with thousands of community plugins and integrations.",
        imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee0c38?w=800&h=450&fit=crop",
        imageAlt: "Plugin marketplace",
      },
    ],
    columns: 3,
  },
];