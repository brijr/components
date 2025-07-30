export const defaultContent = {
  headline: "All Posts",
  description: "Browse through our entire collection of articles and insights",
  posts: [
    {
      id: "1",
      title: "Understanding Modern Web Architecture",
      excerpt: "A deep dive into microservices, serverless, and edge computing in modern web applications. Learn how these technologies work together to create scalable, performant applications.",
      thumbnail: {
        src: "/placeholder.webp",
        alt: "Web architecture diagram"
      },
      categories: ["Architecture", "Development"],
      author: {
        name: "David Kim",
        role: "Senior Engineer",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-15",
      readingTime: 8,
      href: "/blog/modern-web-architecture",
      featured: true
    },
    {
      id: "2",
      title: "State Management in React: A Complete Guide",
      excerpt: "Compare different state management solutions in React applications, from Context API to Redux, Zustand, and more. Find the right solution for your project.",
      thumbnail: {
        src: "/placeholder.webp",
        alt: "React state management"
      },
      categories: ["React", "JavaScript"],
      author: {
        name: "Emma Wilson",
        role: "Frontend Lead",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-12",
      readingTime: 12,
      href: "/blog/react-state-management"
    },
    {
      id: "3",
      title: "Building a Design System from Scratch",
      excerpt: "Learn how to create a comprehensive design system for your organization, including components, tokens, documentation, and governance.",
      thumbnail: {
        src: "/placeholder.webp",
        alt: "Design system components"
      },
      categories: ["Design", "UI/UX"],
      author: {
        name: "Alex Rivera",
        role: "Design Systems Engineer"
      },
      date: "2024-01-10",
      readingTime: 15,
      href: "/blog/design-system-guide"
    },
    {
      id: "4",
      title: "Performance Optimization Techniques for Next.js",
      excerpt: "Discover advanced techniques to optimize your Next.js applications, including code splitting, image optimization, and caching strategies.",
      categories: ["Performance", "Next.js"],
      author: {
        name: "Ryan Chen",
        role: "Performance Engineer"
      },
      date: "2024-01-08",
      readingTime: 10,
      href: "/blog/nextjs-performance"
    }
  ],
  showThumbnails: true,
  showAvatars: true,
  loadMore: {
    text: "Load more posts"
  }
};

export const contentVariations = [
  // Minimal list without thumbnails
  {
    headline: "Recent Articles",
    posts: [
      {
        id: "1",
        title: "The Rise of AI in Software Development",
        excerpt: "How artificial intelligence is transforming the way we write, test, and deploy code.",
        categories: ["AI", "Trends"],
        author: {
          name: "Tech Team"
        },
        date: "2024-01-20",
        readingTime: 6,
        href: "/blog/ai-development"
      },
      {
        id: "2",
        title: "Securing Your Node.js Applications",
        excerpt: "Best practices for implementing security in Node.js applications.",
        categories: ["Security", "Node.js"],
        author: {
          name: "Security Team"
        },
        date: "2024-01-18",
        readingTime: 9,
        href: "/blog/nodejs-security"
      },
      {
        id: "3",
        title: "GraphQL vs REST: Making the Right Choice",
        excerpt: "A practical comparison of GraphQL and REST APIs for modern applications.",
        categories: ["API", "Backend"],
        author: {
          name: "API Team"
        },
        date: "2024-01-16",
        readingTime: 7,
        href: "/blog/graphql-vs-rest"
      }
    ],
    showThumbnails: false,
    showAvatars: false
  },
  // With pagination
  {
    headline: "Blog Archive",
    description: "Explore our complete collection of technical articles",
    posts: [
      {
        id: "1",
        title: "Kubernetes Best Practices for Production",
        excerpt: "Essential guidelines for running Kubernetes clusters in production environments, covering security, scalability, and monitoring.",
        thumbnail: {
          src: "/placeholder.webp",
          alt: "Kubernetes dashboard"
        },
        categories: ["DevOps", "Kubernetes"],
        author: {
          name: "Lisa Chen",
          role: "DevOps Lead",
          avatar: "/placeholder.webp"
        },
        date: "2024-01-22",
        readingTime: 11,
        href: "/blog/kubernetes-production"
      },
      {
        id: "2",
        title: "Testing Strategies for Microservices",
        excerpt: "Comprehensive testing approaches for microservices architecture, including unit, integration, and end-to-end testing.",
        thumbnail: {
          src: "/placeholder.webp",
          alt: "Testing pyramid"
        },
        categories: ["Testing", "Architecture"],
        author: {
          name: "Mark Johnson",
          role: "QA Architect",
          avatar: "/placeholder.webp"
        },
        date: "2024-01-20",
        readingTime: 14,
        href: "/blog/microservices-testing"
      }
    ],
    showThumbnails: true,
    showAvatars: true,
    pagination: {
      currentPage: 1,
      totalPages: 5
    }
  },
  // Content marketing focused
  {
    headline: "Marketing Resources",
    description: "Strategies, tips, and insights to grow your business",
    posts: [
      {
        id: "1",
        title: "Content Marketing ROI: How to Measure Success",
        excerpt: "Learn how to track and measure the return on investment of your content marketing efforts with practical metrics and tools.",
        thumbnail: {
          src: "/placeholder.webp",
          alt: "Analytics dashboard"
        },
        categories: ["Marketing", "Analytics"],
        author: {
          name: "Sarah Martinez",
          role: "Marketing Director"
        },
        date: "2024-01-25",
        readingTime: 8,
        href: "/blog/content-marketing-roi",
        featured: true
      },
      {
        id: "2",
        title: "Building Brand Authority Through Thought Leadership",
        excerpt: "Strategies for establishing your brand as an industry leader through strategic content and positioning.",
        thumbnail: {
          src: "/placeholder.webp",
          alt: "Brand strategy"
        },
        categories: ["Branding", "Strategy"],
        author: {
          name: "Michael Brown",
          role: "Brand Strategist"
        },
        date: "2024-01-23",
        readingTime: 10,
        href: "/blog/thought-leadership"
      },
      {
        id: "3",
        title: "The Complete Guide to LinkedIn Marketing",
        excerpt: "Maximize your B2B marketing efforts on LinkedIn with proven strategies for organic and paid campaigns.",
        categories: ["Social Media", "B2B"],
        author: {
          name: "Jennifer Lee",
          role: "Social Media Manager"
        },
        date: "2024-01-21",
        readingTime: 12,
        href: "/blog/linkedin-marketing"
      }
    ],
    showThumbnails: true,
    showAvatars: false,
    loadMore: {
      text: "View more resources"
    }
  }
];