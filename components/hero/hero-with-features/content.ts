import type { HeroWithFeaturesProps } from "./index";

/**
 * Default content for HeroWithFeatures component
 */
export const defaultContent: HeroWithFeaturesProps = {
  headline: "Built for modern teams",
  subheadline:
    "Everything you need to collaborate, create, and scale your business",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "View Pricing",
    href: "/pricing",
  },
  features: [
    {
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with live updates and instant synchronization across all devices",
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain deep insights into your performance with comprehensive dashboards and reports",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance certifications to keep your data protected",
    },
  ],
};

/**
 * Alternative content variations for HeroWithFeatures component
 */
export const contentVariations: HeroWithFeaturesProps[] = [
  {
    headline: "The complete developer platform",
    subheadline: "Build, deploy, and scale applications with confidence",
    primaryCTA: {
      text: "Get Started",
      href: "/signup",
    },
    features: [
      {
        title: "Push to Deploy",
        description:
          "Deploy your code instantly with our GitHub integration and automated CI/CD pipeline",
      },
      {
        title: "Global CDN",
        description:
          "Deliver content at lightning speed with edge locations worldwide",
      },
      {
        title: "Auto-scaling",
        description:
          "Handle any traffic spike automatically with intelligent resource management",
      },
      {
        title: "99.99% Uptime",
        description:
          "Rock-solid reliability backed by our enterprise SLA guarantee",
      },
    ],
  },
  {
    headline: "Simplify your workflow",
    subheadline:
      "Automate repetitive tasks and focus on what truly matters",
    primaryCTA: {
      text: "Try It Free",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Book Demo",
      href: "/demo",
    },
    features: [
      {
        title: "Smart Automation",
        description:
          "Set up intelligent workflows that adapt to your business needs",
      },
      {
        title: "Integration Hub",
        description:
          "Connect with 1000+ tools and services you already use",
      },
      {
        title: "Custom Workflows",
        description:
          "Design workflows that match your unique business processes",
      },
    ],
  },
];