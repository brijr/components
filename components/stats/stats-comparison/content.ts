import { StatsComparisonProps } from "./index";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Target,
  TrendingUp,
  Clock,
  Package,
  Star
} from "lucide-react";
import React from "react";

export const defaultContent: StatsComparisonProps = {
  headline: "Monthly comparison",
  subheadline: "Key metrics vs last month",
  stats: [
    {
      label: "Revenue",
      current: {
        value: "125.5",
        prefix: "$",
        suffix: "K",
      },
      previous: {
        value: "98.2",
        prefix: "$",
        suffix: "K",
      },
      change: {
        value: "27.8%",
        type: "increase",
        isPositive: true,
      },
      icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
      description: "Total revenue generated",
    },
    {
      label: "Active Users",
      current: {
        value: "8,429",
      },
      previous: {
        value: "7,812",
      },
      change: {
        value: "7.9%",
        type: "increase",
        isPositive: true,
      },
      icon: React.createElement(Users, { className: "w-5 h-5" }),
      description: "Monthly active users",
    },
    {
      label: "Conversion Rate",
      current: {
        value: "3.24",
        suffix: "%",
      },
      previous: {
        value: "2.89",
        suffix: "%",
      },
      change: {
        value: "12.1%",
        type: "increase",
        isPositive: true,
      },
      icon: React.createElement(Target, { className: "w-5 h-5" }),
      description: "Visitor to customer rate",
    },
  ],
  periodLabels: {
    current: "This month",
    previous: "Last month",
  },
  variant: "cards",
  columns: 3,
};

export const contentVariations: StatsComparisonProps[] = [
  // Year over year comparison
  {
    headline: "Annual growth metrics",
    subheadline: "2024 vs 2023 performance",
    stats: [
      {
        label: "Total Revenue",
        current: {
          value: "4.2",
          prefix: "$",
          suffix: "M",
        },
        previous: {
          value: "2.8",
          prefix: "$",
          suffix: "M",
        },
        change: {
          value: "50%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
      },
      {
        label: "Customer Base",
        current: {
          value: "45,230",
        },
        previous: {
          value: "28,150",
        },
        change: {
          value: "60.7%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(Users, { className: "w-5 h-5" }),
      },
      {
        label: "Market Share",
        current: {
          value: "12.5",
          suffix: "%",
        },
        previous: {
          value: "8.2",
          suffix: "%",
        },
        change: {
          value: "4.3pp",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(TrendingUp, { className: "w-5 h-5" }),
      },
      {
        label: "Customer Satisfaction",
        current: {
          value: "4.8",
          suffix: "/5",
        },
        previous: {
          value: "4.6",
          suffix: "/5",
        },
        change: {
          value: "4.3%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(Star, { className: "w-5 h-5" }),
      },
    ],
    periodLabels: {
      current: "2024",
      previous: "2023",
    },
    variant: "cards",
    columns: 4,
  },
  // E-commerce quarterly comparison (table)
  {
    headline: "Quarterly performance",
    subheadline: "Q4 2024 vs Q3 2024",
    stats: [
      {
        label: "Gross Merchandise Value",
        current: {
          value: "892.3",
          prefix: "$",
          suffix: "K",
        },
        previous: {
          value: "756.8",
          prefix: "$",
          suffix: "K",
        },
        change: {
          value: "17.9%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(ShoppingCart, { className: "w-5 h-5" }),
      },
      {
        label: "Orders Processed",
        current: {
          value: "12,456",
        },
        previous: {
          value: "10,234",
        },
        change: {
          value: "21.7%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(Package, { className: "w-5 h-5" }),
      },
      {
        label: "Average Order Value",
        current: {
          value: "71.65",
          prefix: "$",
        },
        previous: {
          value: "73.94",
          prefix: "$",
        },
        change: {
          value: "3.1%",
          type: "decrease",
          isPositive: false,
        },
        icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
      },
      {
        label: "Cart Abandonment Rate",
        current: {
          value: "68.2",
          suffix: "%",
        },
        previous: {
          value: "71.5",
          suffix: "%",
        },
        change: {
          value: "4.6%",
          type: "decrease",
          isPositive: true, // Lower is better
        },
        icon: React.createElement(ShoppingCart, { className: "w-5 h-5" }),
      },
      {
        label: "Return Rate",
        current: {
          value: "5.2",
          suffix: "%",
        },
        previous: {
          value: "6.8",
          suffix: "%",
        },
        change: {
          value: "23.5%",
          type: "decrease",
          isPositive: true, // Lower is better
        },
        icon: React.createElement(Package, { className: "w-5 h-5" }),
      },
    ],
    periodLabels: {
      current: "Q4 2024",
      previous: "Q3 2024",
    },
    variant: "table",
  },
  // Minimal comparison
  {
    headline: "Week over week",
    stats: [
      {
        label: "Sales",
        current: {
          value: "42.3",
          prefix: "$",
          suffix: "K",
        },
        previous: {
          value: "38.7",
          prefix: "$",
          suffix: "K",
        },
        change: {
          value: "9.3%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
      },
      {
        label: "New Signups",
        current: {
          value: "284",
        },
        previous: {
          value: "312",
        },
        change: {
          value: "9%",
          type: "decrease",
          isPositive: false,
        },
        icon: React.createElement(Users, { className: "w-5 h-5" }),
      },
      {
        label: "Avg Session",
        current: {
          value: "3:42",
        },
        previous: {
          value: "3:28",
        },
        change: {
          value: "6.7%",
          type: "increase",
          isPositive: true,
        },
        icon: React.createElement(Clock, { className: "w-5 h-5" }),
      },
    ],
    periodLabels: {
      current: "This week",
      previous: "Last week",
    },
    variant: "minimal",
    columns: 3,
  },
  // Department comparison
  {
    headline: "Department performance",
    stats: [
      {
        label: "Sales Team",
        current: {
          value: "1.2",
          prefix: "$",
          suffix: "M",
        },
        previous: {
          value: "980",
          prefix: "$",
          suffix: "K",
        },
        change: {
          value: "22.4%",
          type: "increase",
          isPositive: true,
        },
        description: "Total revenue generated",
      },
      {
        label: "Marketing Team",
        current: {
          value: "45.2",
          suffix: "K",
        },
        previous: {
          value: "38.9",
          suffix: "K",
        },
        change: {
          value: "16.2%",
          type: "increase",
          isPositive: true,
        },
        description: "Qualified leads generated",
      },
      {
        label: "Support Team",
        current: {
          value: "1.8",
          suffix: "h",
        },
        previous: {
          value: "2.4",
          suffix: "h",
        },
        change: {
          value: "25%",
          type: "decrease",
          isPositive: true,
        },
        description: "Avg resolution time",
      },
      {
        label: "Product Team",
        current: {
          value: "98.5",
          suffix: "%",
        },
        previous: {
          value: "96.2",
          suffix: "%",
        },
        change: {
          value: "2.4%",
          type: "increase",
          isPositive: true,
        },
        description: "Feature completion rate",
      },
    ],
    periodLabels: {
      current: "This quarter",
      previous: "Last quarter",
    },
    variant: "cards",
    columns: 2,
  },
  // Regional comparison
  {
    headline: "Regional sales comparison",
    subheadline: "Performance by region",
    stats: [
      {
        label: "North America",
        current: {
          value: "3.2",
          prefix: "$",
          suffix: "M",
        },
        previous: {
          value: "2.8",
          prefix: "$",
          suffix: "M",
        },
        change: {
          value: "14.3%",
          type: "increase",
          isPositive: true,
        },
      },
      {
        label: "Europe",
        current: {
          value: "2.1",
          prefix: "$",
          suffix: "M",
        },
        previous: {
          value: "2.3",
          prefix: "$",
          suffix: "M",
        },
        change: {
          value: "8.7%",
          type: "decrease",
          isPositive: false,
        },
      },
      {
        label: "Asia Pacific",
        current: {
          value: "1.8",
          prefix: "$",
          suffix: "M",
        },
        previous: {
          value: "1.2",
          prefix: "$",
          suffix: "M",
        },
        change: {
          value: "50%",
          type: "increase",
          isPositive: true,
        },
      },
      {
        label: "Latin America",
        current: {
          value: "680",
          prefix: "$",
          suffix: "K",
        },
        previous: {
          value: "720",
          prefix: "$",
          suffix: "K",
        },
        change: {
          value: "5.6%",
          type: "decrease",
          isPositive: false,
        },
      },
    ],
    periodLabels: {
      current: "2024 YTD",
      previous: "2023 YTD",
    },
    variant: "table",
  },
];