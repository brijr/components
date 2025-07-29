import type { HeroWithStatsProps } from "./index";

/**
 * Default content for HeroWithStats component
 */
export const defaultContent: HeroWithStatsProps = {
  headline: "Trusted by developers worldwide",
  subheadline:
    "Join the thousands of teams using our platform to build better products faster",
  stats: [
    {
      value: "2.5",
      suffix: "M+",
      label: "Active Users",
    },
    {
      value: "99.99",
      suffix: "%",
      label: "Uptime",
    },
    {
      value: "150",
      suffix: "+",
      label: "Countries",
    },
    {
      prefix: "<",
      value: "5",
      suffix: "ms",
      label: "Response Time",
    },
  ],
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryCTA: {
    text: "View Customer Stories",
    href: "/customers",
  },
};

/**
 * Alternative content variations for HeroWithStats component
 */
export const contentVariations: HeroWithStatsProps[] = [
  {
    headline: "Results that speak for themselves",
    subheadline:
      "Our platform delivers measurable impact for businesses of all sizes",
    stats: [
      {
        prefix: "+",
        value: "325",
        suffix: "%",
        label: "ROI Increase",
      },
      {
        value: "50",
        suffix: "%",
        label: "Time Saved",
      },
      {
        prefix: "$",
        value: "2.3",
        suffix: "M",
        label: "Revenue Generated",
      },
      {
        value: "4.9",
        suffix: "/5",
        label: "Customer Rating",
      },
    ],
    primaryCTA: {
      text: "See How It Works",
      href: "/demo",
    },
  },
  {
    headline: "Built for scale",
    stats: [
      {
        value: "1",
        suffix: "B+",
        label: "API Calls Daily",
      },
      {
        value: "0.001",
        suffix: "%",
        label: "Error Rate",
      },
      {
        value: "11",
        label: "Data Centers",
      },
    ],
    primaryCTA: {
      text: "View Infrastructure",
      href: "/infrastructure",
    },
    secondaryCTA: {
      text: "Read Docs",
      href: "/docs",
    },
  },
];
