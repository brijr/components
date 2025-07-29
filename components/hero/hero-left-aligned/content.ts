import { HeroLeftAlignedProps } from "./index";

export const defaultContent: HeroLeftAlignedProps = {
  headline: "Build faster with our comprehensive component library",
  subheadline:
    "Save weeks of development time with production-ready components that are accessible, responsive, and beautifully designed out of the box.",
  primaryCTA: {
    text: "Get Started Free",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Browse Components",
    href: "/components",
  },
  image: {
    src: "/placeholder.webp",
    alt: "Component library interface showing various UI elements",
    width: 1200,
    height: 675,
    priority: true,
  },
};

export const contentVariations: HeroLeftAlignedProps[] = [
  // Project Management Tool
  {
    headline: "Manage projects like never before",
    subheadline:
      "Our intuitive platform brings teams together, streamlines workflows, and delivers projects on time. Experience the difference of truly collaborative project management.",
    primaryCTA: {
      text: "Start Your Free Trial",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Watch Demo",
      href: "/demo",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Project management dashboard with kanban board",
      width: 1200,
      height: 675,
      priority: true,
    },
  },
  // Marketing Platform
  {
    headline: "Marketing automation that actually works",
    subheadline:
      "Stop juggling multiple tools. Our all-in-one platform handles email campaigns, social media, analytics, and more—so you can focus on growing your business.",
    primaryCTA: {
      text: "Try It Free",
      href: "/free-trial",
    },
    secondaryCTA: {
      text: "See Features",
      href: "/features",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Marketing automation dashboard showing campaign analytics",
      width: 1200,
      height: 675,
    },
  },
  // Data Analytics
  {
    headline: "Turn your data into actionable insights",
    subheadline:
      "Advanced analytics made simple. Connect your data sources, visualize trends, and make informed decisions with our powerful yet easy-to-use platform.",
    primaryCTA: {
      text: "Get Started",
      href: "/start",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Data visualization dashboard with charts and graphs",
      width: 1200,
      height: 675,
      priority: true,
    },
  },
  // Design Tool
  {
    headline: "Design tools built for modern teams",
    subheadline:
      "Collaborate in real-time, maintain design consistency, and ship products faster with our comprehensive design platform trusted by thousands of teams worldwide.",
    primaryCTA: {
      text: "Start Designing",
      href: "/signup",
    },
    secondaryCTA: {
      text: "Request Demo",
      href: "/contact",
    },
    image: {
      src: "/placeholder.webp",
      alt: "Design tool interface with component library",
      width: 1200,
      height: 675,
    },
  },
];
