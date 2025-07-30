export const defaultContent = {
  headline: "Featured Stories",
  description: "Our top picks and trending articles",
  featuredPost: {
    title: "The Future of AI in Software Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy code. From AI-powered code completion to automated testing and deployment strategies.",
    image: {
      src: "/placeholder.webp",
      alt: "AI and software development illustration"
    },
    category: "Innovation",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.webp"
    },
    date: "2024-01-25",
    readingTime: 10,
    href: "/blog/ai-software-development",
    ctaText: "Read the full story"
  },
  secondaryPosts: [
    {
      id: "1",
      title: "5 JavaScript Patterns You Should Know",
      excerpt: "Essential design patterns that will make your code more maintainable and scalable.",
      category: "JavaScript",
      date: "2024-01-23",
      href: "/blog/javascript-patterns"
    },
    {
      id: "2",
      title: "Building Scalable APIs with GraphQL",
      excerpt: "Best practices for designing and implementing GraphQL APIs that can grow with your application.",
      category: "Backend",
      date: "2024-01-22",
      href: "/blog/scalable-graphql"
    },
    {
      id: "3",
      title: "The State of Web Performance in 2024",
      excerpt: "Key metrics, tools, and techniques for optimizing web performance in modern applications.",
      category: "Performance",
      date: "2024-01-20",
      href: "/blog/web-performance-2024"
    }
  ],
  showTrending: true,
  viewAllLink: {
    text: "View all articles",
    href: "/blog"
  }
};

export const contentVariations = [
  // Tech news focused
  {
    headline: "Breaking Tech News",
    featuredPost: {
      title: "Major Security Vulnerability Discovered in Popular Framework",
      excerpt: "Security researchers have uncovered a critical vulnerability affecting millions of applications. Here's what you need to know and how to protect your systems.",
      image: {
        src: "/placeholder.webp",
        alt: "Security alert illustration"
      },
      category: "Security",
      author: {
        name: "Security Team"
      },
      date: "2024-01-26",
      readingTime: 5,
      href: "/blog/security-alert"
    },
    secondaryPosts: [
      {
        id: "1",
        title: "Emergency Patch Released for CVE-2024-1234",
        excerpt: "Update your systems immediately to protect against this vulnerability.",
        category: "Updates",
        date: "2024-01-26",
        href: "/blog/emergency-patch"
      },
      {
        id: "2",
        title: "How to Audit Your Dependencies for Security Issues",
        excerpt: "A step-by-step guide to keeping your projects secure.",
        category: "Tutorial",
        date: "2024-01-25",
        href: "/blog/dependency-audit"
      }
    ],
    showTrending: true
  },
  // Product updates focused
  {
    headline: "What's New",
    description: "Latest product updates and feature releases",
    featuredPost: {
      title: "Introducing AI-Powered Analytics Dashboard",
      excerpt: "We're excited to announce our new analytics dashboard that uses machine learning to provide actionable insights from your data automatically.",
      image: {
        src: "/placeholder.webp",
        alt: "Analytics dashboard preview"
      },
      category: "Product Update",
      author: {
        name: "Product Team",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-24",
      readingTime: 7,
      href: "/blog/ai-analytics-launch",
      ctaText: "Explore the features"
    },
    secondaryPosts: [
      {
        id: "1",
        title: "Mobile App Update 3.0 Now Available",
        excerpt: "New features including offline mode and biometric authentication.",
        category: "Mobile",
        date: "2024-01-22",
        href: "/blog/mobile-update-3"
      },
      {
        id: "2",
        title: "API Rate Limits Increased for Pro Users",
        excerpt: "We've doubled the API rate limits for all Pro and Enterprise plans.",
        category: "API",
        date: "2024-01-20",
        href: "/blog/api-rate-increase"
      }
    ],
    viewAllLink: {
      text: "See all updates",
      href: "/updates"
    }
  },
  // Industry insights
  {
    headline: "Industry Insights",
    featuredPost: {
      title: "The Rise of Edge Computing in Enterprise Applications",
      excerpt: "How edge computing is transforming enterprise software architecture, enabling real-time processing and reducing latency for critical applications.",
      image: {
        src: "/placeholder.webp",
        alt: "Edge computing network"
      },
      category: "Enterprise",
      author: {
        name: "Michael Torres",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-23",
      readingTime: 12,
      href: "/blog/edge-computing-enterprise"
    },
    secondaryPosts: [
      {
        id: "1",
        title: "Cloud Costs: Optimization Strategies for 2024",
        excerpt: "Practical approaches to reduce cloud spending without sacrificing performance.",
        category: "Cloud",
        date: "2024-01-21",
        href: "/blog/cloud-cost-optimization"
      },
      {
        id: "2",
        title: "Microservices vs Monoliths: A Balanced Perspective",
        excerpt: "When to choose each architecture based on your team and project needs.",
        category: "Architecture",
        date: "2024-01-19",
        href: "/blog/microservices-monoliths"
      },
      {
        id: "3",
        title: "The Impact of GDPR on Global Data Strategies",
        excerpt: "Three years later: lessons learned and best practices for compliance.",
        category: "Compliance",
        date: "2024-01-18",
        href: "/blog/gdpr-impact"
      }
    ],
    showTrending: false,
    viewAllLink: {
      text: "More insights",
      href: "/insights"
    }
  }
];