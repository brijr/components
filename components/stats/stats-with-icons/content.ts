import { StatsWithIconsProps } from "./index";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Shield,
  Zap,
  Globe,
  Package,
  Heart,
  Activity,
  Cpu,
  Database
} from "lucide-react";
import React from "react";

export const defaultContent: StatsWithIconsProps = {
  headline: "Platform overview",
  subheadline: "Real-time metrics and insights",
  stats: [
    {
      icon: React.createElement(Users, { className: "w-5 h-5" }),
      value: "2,543",
      label: "Active Users",
      description: "Currently online",
      trend: {
        value: "12%",
        direction: "up",
        label: "vs last week",
      },
    },
    {
      icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
      value: "45.2",
      prefix: "$",
      suffix: "K",
      label: "Revenue",
      description: "This month",
      trend: {
        value: "3%",
        direction: "down",
        label: "vs last month",
      },
    },
    {
      icon: React.createElement(TrendingUp, { className: "w-5 h-5" }),
      value: "89.1",
      suffix: "%",
      label: "Growth Rate",
      description: "Year over year",
      trend: {
        value: "5.2%",
        direction: "up",
      },
      badge: "All-time high",
    },
    {
      icon: React.createElement(Clock, { className: "w-5 h-5" }),
      value: "1.2",
      suffix: "s",
      label: "Avg Response Time",
      description: "Last 24 hours",
      trend: {
        value: "15ms",
        direction: "down",
        label: "improvement",
      },
    },
  ],
  columns: 4,
  variant: "default",
};

export const contentVariations: StatsWithIconsProps[] = [
  // Security dashboard
  {
    headline: "Security overview",
    stats: [
      {
        icon: React.createElement(Shield, { className: "w-5 h-5" }),
        value: "0",
        label: "Security Incidents",
        description: "Last 30 days",
        badge: "Secure",
      },
      {
        icon: React.createElement(Activity, { className: "w-5 h-5" }),
        value: "1,234",
        label: "Threats Blocked",
        description: "This month",
        trend: {
          value: "23%",
          direction: "up",
        },
      },
      {
        icon: React.createElement(Zap, { className: "w-5 h-5" }),
        value: "99.99",
        suffix: "%",
        label: "System Uptime",
        description: "Last 90 days",
      },
    ],
    columns: 3,
    variant: "filled",
  },
  // E-commerce metrics
  {
    headline: "Store performance",
    subheadline: "Key metrics for your online store",
    stats: [
      {
        icon: React.createElement(Package, { className: "w-5 h-5" }),
        value: "1,893",
        label: "Orders Today",
        trend: {
          value: "8%",
          direction: "up",
          label: "vs yesterday",
        },
      },
      {
        icon: React.createElement(DollarSign, { className: "w-5 h-5" }),
        value: "124.5",
        prefix: "$",
        suffix: "K",
        label: "Daily Revenue",
        trend: {
          value: "12.5%",
          direction: "up",
          label: "vs avg",
        },
      },
      {
        icon: React.createElement(Users, { className: "w-5 h-5" }),
        value: "89",
        prefix: "$",
        label: "Avg Order Value",
        trend: {
          value: "2%",
          direction: "down",
        },
      },
      {
        icon: React.createElement(Heart, { className: "w-5 h-5" }),
        value: "342",
        label: "Items in Wishlists",
        description: "Potential sales",
      },
    ],
    columns: 4,
    variant: "default",
  },
  // Infrastructure monitoring
  {
    headline: "System health",
    stats: [
      {
        icon: React.createElement(Cpu, { className: "w-5 h-5" }),
        value: "42",
        suffix: "%",
        label: "CPU Usage",
        description: "4 cores active",
        trend: {
          value: "Normal",
          direction: "up",
        },
      },
      {
        icon: React.createElement(Database, { className: "w-5 h-5" }),
        value: "2.1",
        suffix: "TB",
        label: "Storage Used",
        description: "Of 5TB total",
        badge: "42% full",
      },
      {
        icon: React.createElement(Activity, { className: "w-5 h-5" }),
        value: "156",
        suffix: "ms",
        label: "API Latency",
        description: "p99 response time",
        trend: {
          value: "5ms",
          direction: "down",
        },
      },
    ],
    columns: 3,
    variant: "outline",
  },
  // Marketing metrics
  {
    headline: "Campaign performance",
    stats: [
      {
        icon: React.createElement(Users, { className: "w-5 h-5" }),
        value: "45.2",
        suffix: "K",
        label: "New Visitors",
        description: "This week",
        trend: {
          value: "18%",
          direction: "up",
        },
      },
      {
        icon: React.createElement(TrendingUp, { className: "w-5 h-5" }),
        value: "3.2",
        suffix: "%",
        label: "Conversion Rate",
        description: "All campaigns",
        trend: {
          value: "0.5%",
          direction: "up",
        },
      },
      {
        icon: React.createElement(Globe, { className: "w-5 h-5" }),
        value: "89",
        label: "Countries Reached",
        description: "Global coverage",
      },
      {
        icon: React.createElement(Heart, { className: "w-5 h-5" }),
        value: "92",
        suffix: "%",
        label: "Satisfaction Score",
        description: "Based on surveys",
      },
    ],
    columns: 4,
    variant: "filled",
  },
  // Minimal stats
  {
    stats: [
      {
        icon: React.createElement(Users, { className: "w-5 h-5" }),
        value: "10K+",
        label: "Happy Customers",
      },
      {
        icon: React.createElement(Globe, { className: "w-5 h-5" }),
        value: "50+",
        label: "Countries Served",
      },
    ],
    columns: 2,
    variant: "default",
  },
  // Development metrics
  {
    headline: "Development activity",
    subheadline: "Repository and deployment statistics",
    stats: [
      {
        icon: React.createElement(Zap, { className: "w-5 h-5" }),
        value: "127",
        label: "Deployments",
        description: "This month",
        trend: {
          value: "23",
          direction: "up",
          label: "more than last month",
        },
      },
      {
        icon: React.createElement(Activity, { className: "w-5 h-5" }),
        value: "3.2",
        suffix: "K",
        label: "Commits",
        description: "Across all repos",
      },
      {
        icon: React.createElement(Shield, { className: "w-5 h-5" }),
        value: "0",
        label: "Critical Issues",
        description: "All systems operational",
        badge: "Healthy",
      },
      {
        icon: React.createElement(Clock, { className: "w-5 h-5" }),
        value: "14",
        suffix: "min",
        label: "Build Time",
        description: "Average CI/CD",
        trend: {
          value: "2min",
          direction: "down",
        },
      },
    ],
    columns: 4,
    variant: "outline",
  },
];