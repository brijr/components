import { StatsSimpleProps } from "./index";

export const defaultContent: StatsSimpleProps = {
  headline: "Our impact in numbers",
  subheadline: "Trusted by companies worldwide to deliver exceptional results",
  stats: [
    {
      value: "10",
      suffix: "M+",
      label: "Active Users",
    },
    {
      value: "99.9",
      suffix: "%",
      label: "Uptime SLA",
    },
    {
      value: "150",
      suffix: "+",
      label: "Countries",
    },
    {
      value: "4.9",
      prefix: "★",
      label: "User Rating",
    },
  ],
  columns: 4,
  variant: "default",
};

export const contentVariations: StatsSimpleProps[] = [
  // Large numbers variant
  {
    stats: [
      {
        prefix: "$",
        value: "2.5",
        suffix: "B",
        label: "Total Revenue Processed",
      },
      {
        value: "500",
        suffix: "K+",
        label: "Transactions Daily",
      },
      {
        value: "0.01",
        suffix: "%",
        label: "Error Rate",
      },
    ],
    columns: 3,
    variant: "large",
  },
  // Company metrics
  {
    headline: "Growing every day",
    subheadline: "Our journey from startup to industry leader",
    stats: [
      {
        value: "2015",
        label: "Founded",
      },
      {
        value: "450",
        suffix: "+",
        label: "Employees",
      },
      {
        value: "12",
        label: "Global Offices",
      },
      {
        value: "50",
        suffix: "M",
        label: "Funding Raised",
      },
    ],
    columns: 4,
    variant: "default",
  },
  // Performance metrics
  {
    headline: "Built for speed and reliability",
    stats: [
      {
        value: "50",
        suffix: "ms",
        label: "Avg Response Time",
      },
      {
        value: "99.99",
        suffix: "%",
        label: "API Uptime",
      },
      {
        value: "1",
        suffix: "B+",
        label: "API Calls/Month",
      },
      {
        value: "45",
        suffix: "TB",
        label: "Data Processed",
      },
    ],
    columns: 4,
    variant: "compact",
  },
  // Social proof
  {
    headline: "Loved by developers",
    stats: [
      {
        value: "4.8",
        suffix: "/5",
        label: "G2 Rating",
      },
      {
        value: "25",
        suffix: "K+",
        label: "GitHub Stars",
      },
      {
        value: "1",
        suffix: "M+",
        label: "NPM Downloads",
      },
    ],
    columns: 3,
    variant: "default",
  },
  // Environmental impact
  {
    headline: "Our commitment to sustainability",
    subheadline: "Making a positive impact on the planet",
    stats: [
      {
        value: "100",
        suffix: "%",
        label: "Carbon Neutral",
      },
      {
        value: "2.5",
        suffix: "M",
        label: "Trees Planted",
      },
      {
        value: "75",
        suffix: "%",
        label: "Renewable Energy",
      },
      {
        value: "Zero",
        label: "Waste to Landfill",
      },
    ],
    columns: 4,
    variant: "default",
  },
  // Customer success
  {
    stats: [
      {
        value: "95",
        suffix: "%",
        label: "Customer Retention",
      },
      {
        value: "< 2",
        suffix: "hrs",
        label: "Support Response",
      },
      {
        value: "4.9",
        suffix: "/5",
        label: "CSAT Score",
      },
    ],
    columns: 3,
    variant: "large",
  },
  // Product usage
  {
    headline: "Platform statistics",
    stats: [
      {
        value: "15",
        suffix: "K+",
        label: "Active Projects",
      },
      {
        value: "2.5",
        suffix: "M",
        label: "Deployments/Month",
      },
      {
        value: "500",
        suffix: "K+",
        label: "Team Members",
      },
      {
        value: "10",
        suffix: "PB",
        label: "Data Stored",
      },
    ],
    columns: 4,
    variant: "compact",
  },
  // E-commerce stats
  {
    headline: "Powering global commerce",
    stats: [
      {
        prefix: "$",
        value: "50",
        suffix: "B+",
        label: "GMV Processed",
      },
      {
        value: "200",
        suffix: "M+",
        label: "Orders Completed",
      },
      {
        value: "180",
        label: "Countries Served",
      },
      {
        value: "15",
        label: "Payment Methods",
      },
    ],
    columns: 4,
    variant: "default",
  },
];