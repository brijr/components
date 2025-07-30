export const defaultContent = {
  headline: "Latest from the blog",
  description: "Insights, tutorials, and updates from our team",
  posts: [
    {
      id: "1",
      title: "Getting Started with React Server Components",
      excerpt: "Learn how to leverage the power of React Server Components in your Next.js applications for better performance and developer experience.",
      image: {
        src: "/placeholder.webp",
        alt: "React Server Components illustration"
      },
      category: "Tutorial",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-15",
      readingTime: 5,
      href: "/blog/react-server-components"
    },
    {
      id: "2",
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends and technologies shaping the future of web development, from AI integration to edge computing.",
      image: {
        src: "/placeholder.webp",
        alt: "Web development trends"
      },
      category: "Trends",
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-12",
      readingTime: 8,
      href: "/blog/future-web-development"
    },
    {
      id: "3",
      title: "Building Accessible React Applications",
      excerpt: "A comprehensive guide to implementing accessibility best practices in your React applications from the ground up.",
      image: {
        src: "/placeholder.webp",
        alt: "Accessibility in React"
      },
      category: "Best Practices",
      author: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.webp"
      },
      date: "2024-01-10",
      readingTime: 6,
      href: "/blog/accessible-react"
    }
  ],
  columns: 3,
  showAuthor: true,
  showReadingTime: true,
  viewAllLink: {
    text: "View all posts",
    href: "/blog"
  }
};

export const contentVariations = [
  // Two column layout
  {
    headline: "Resources & Insights",
    posts: [
      {
        id: "1",
        title: "Mastering TypeScript Generics",
        excerpt: "Deep dive into TypeScript generics and how to use them effectively in your projects.",
        image: {
          src: "/placeholder.webp",
          alt: "TypeScript code"
        },
        category: "Development",
        author: {
          name: "Alex Kim"
        },
        date: "2024-01-20",
        readingTime: 10,
        href: "/blog/typescript-generics"
      },
      {
        id: "2",
        title: "CSS Grid vs Flexbox: When to Use Each",
        excerpt: "Understanding the differences and best use cases for CSS Grid and Flexbox layouts.",
        image: {
          src: "/placeholder.webp",
          alt: "CSS layout comparison"
        },
        category: "CSS",
        author: {
          name: "Jordan Lee"
        },
        date: "2024-01-18",
        readingTime: 7,
        href: "/blog/grid-vs-flexbox"
      }
    ],
    columns: 2,
    showAuthor: false,
    showReadingTime: true
  },
  // Four column layout - minimal
  {
    headline: "Quick Reads",
    posts: [
      {
        id: "1",
        title: "5 Git Commands You Should Know",
        excerpt: "Essential Git commands every developer should master.",
        image: {
          src: "/placeholder.webp",
          alt: "Git terminal"
        },
        category: "Tips",
        author: {
          name: "Dev Team"
        },
        date: "2024-01-22",
        readingTime: 3,
        href: "/blog/git-commands"
      },
      {
        id: "2",
        title: "JavaScript Array Methods",
        excerpt: "Quick reference for the most useful array methods.",
        image: {
          src: "/placeholder.webp",
          alt: "JavaScript code"
        },
        category: "Reference",
        author: {
          name: "Dev Team"
        },
        date: "2024-01-21",
        readingTime: 4,
        href: "/blog/array-methods"
      },
      {
        id: "3",
        title: "VS Code Productivity Tips",
        excerpt: "Boost your coding speed with these VS Code tricks.",
        image: {
          src: "/placeholder.webp",
          alt: "VS Code editor"
        },
        category: "Tools",
        author: {
          name: "Dev Team"
        },
        date: "2024-01-20",
        readingTime: 3,
        href: "/blog/vscode-tips"
      },
      {
        id: "4",
        title: "React Hooks Explained",
        excerpt: "Understanding the basics of React Hooks.",
        image: {
          src: "/placeholder.webp",
          alt: "React logo"
        },
        category: "React",
        author: {
          name: "Dev Team"
        },
        date: "2024-01-19",
        readingTime: 5,
        href: "/blog/react-hooks"
      }
    ],
    columns: 4,
    showAuthor: false,
    showReadingTime: false
  },
  // Content marketing focused
  {
    headline: "Marketing Insights",
    description: "Stay ahead with the latest marketing strategies and case studies",
    posts: [
      {
        id: "1",
        title: "The Psychology of Color in Brand Design",
        excerpt: "How color choices impact customer perception and buying decisions in digital marketing.",
        image: {
          src: "/placeholder.webp",
          alt: "Color psychology in branding"
        },
        category: "Branding",
        author: {
          name: "Lisa Wang",
          avatar: "/placeholder.webp"
        },
        date: "2024-01-25",
        readingTime: 12,
        href: "/blog/color-psychology"
      },
      {
        id: "2",
        title: "Email Marketing Best Practices for 2024",
        excerpt: "Proven strategies to improve your email open rates and conversions in the current landscape.",
        image: {
          src: "/placeholder.webp",
          alt: "Email marketing dashboard"
        },
        category: "Email Marketing",
        author: {
          name: "Tom Harris",
          avatar: "/placeholder.webp"
        },
        date: "2024-01-23",
        readingTime: 9,
        href: "/blog/email-best-practices"
      },
      {
        id: "3",
        title: "SEO Trends That Actually Matter",
        excerpt: "Cut through the noise and focus on SEO strategies that deliver real results for your business.",
        image: {
          src: "/placeholder.webp",
          alt: "SEO analytics"
        },
        category: "SEO",
        author: {
          name: "Rachel Green",
          avatar: "/placeholder.webp"
        },
        date: "2024-01-20",
        readingTime: 15,
        href: "/blog/seo-trends"
      }
    ],
    columns: 3,
    showAuthor: true,
    showReadingTime: true,
    viewAllLink: {
      text: "Explore all articles",
      href: "/resources"
    }
  }
];