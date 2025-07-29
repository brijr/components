import type { HeroWithTabsLeftProps } from "./index";

/**
 * Default content for HeroWithTabsLeft component
 */
export const defaultContent: HeroWithTabsLeftProps = {
  headline: "Built for every team",
  subheadline: "One platform that adapts to how you work",
  tabs: [
    {
      label: "Engineering",
      value: "engineering",
      title: "Ship code with confidence",
      description:
        "Powerful tools for modern development teams to build, test, and deploy faster",
      features: [
        "CI/CD pipeline integration",
        "Automated testing suite",
        "Real-time monitoring",
        "Rollback protection",
      ],
    },
    {
      label: "Product",
      value: "product",
      title: "Turn insights into features",
      description:
        "Understand your users and build products they love with data-driven insights",
      features: [
        "User analytics dashboard",
        "A/B testing framework",
        "Feature flag management",
        "Customer feedback loops",
      ],
    },
    {
      label: "Marketing",
      value: "marketing",
      title: "Grow your audience",
      description:
        "Everything you need to attract, engage, and retain customers at scale",
      features: [
        "Campaign automation",
        "Lead scoring & routing",
        "Multi-channel tracking",
        "ROI analytics",
      ],
    },
  ],
  defaultTab: "engineering",
  primaryCTA: {
    text: "Start Building",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Watch Demo",
    href: "/demo",
  },
};

/**
 * Alternative content variations for HeroWithTabsLeft component
 */
export const contentVariations: HeroWithTabsLeftProps[] = [
  {
    headline: "Choose your journey",
    tabs: [
      {
        label: "Startups",
        value: "startups",
        title: "From idea to IPO",
        description: "Everything you need to build and scale your startup",
        features: [
          "Free tier available",
          "Startup credits",
          "Priority support",
        ],
        image: {
          src: "/placeholder.webp",
          alt: "Startup dashboard",
        },
      },
      {
        label: "Enterprise",
        value: "enterprise",
        title: "Enterprise-grade security",
        description: "Trusted by Fortune 500 companies worldwide",
        features: ["SOC 2 compliance", "Custom SLAs", "Dedicated support"],
        image: {
          src: "/placeholder.webp",
          alt: "Enterprise features",
        },
      },
    ],
    primaryCTA: {
      text: "Get Started",
      href: "/signup",
    },
  },
  {
    headline: "Learn at your own pace",
    subheadline: "Choose the learning path that fits your schedule",
    tabs: [
      {
        label: "Self-Paced",
        value: "self-paced",
        title: "Learn on your schedule",
        description:
          "Access all course materials and progress at your own speed",
      },
      {
        label: "Instructor-Led",
        value: "instructor",
        title: "Live classes with experts",
        description: "Join scheduled sessions with real-time Q&A and feedback",
      },
      {
        label: "Bootcamp",
        value: "bootcamp",
        title: "Intensive 12-week program",
        description:
          "Full-time immersive experience with job placement support",
      },
    ],
    primaryCTA: {
      text: "Enroll Now",
      href: "/enroll",
    },
    secondaryCTA: {
      text: "View Curriculum",
      href: "/curriculum",
    },
  },
];
