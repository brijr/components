import { StatsAnimatedProps } from "./index";
import { 
  Users, 
  Heart, 
  Globe, 
  Zap,
  Trophy,
  Star,
  TrendingUp,
  Target,
  Rocket,
  Shield,
  Coffee,
  Award
} from "lucide-react";
import React from "react";

export const defaultContent: StatsAnimatedProps = {
  headline: "Our achievements",
  subheadline: "Numbers that speak for themselves",
  stats: [
    {
      value: 1000000,
      label: "Happy Customers",
      suffix: "+",
      duration: 2500,
      icon: React.createElement(Users, { className: "w-6 h-6" }),
    },
    {
      value: 98,
      label: "Customer Satisfaction",
      suffix: "%",
      maxValue: 100,
      showProgress: true,
      duration: 2000,
      icon: React.createElement(Heart, { className: "w-6 h-6" }),
      description: "Based on 50,000+ reviews",
    },
    {
      value: 150,
      label: "Countries Served",
      suffix: "+",
      duration: 2200,
      icon: React.createElement(Globe, { className: "w-6 h-6" }),
    },
    {
      value: 99.9,
      label: "Uptime SLA",
      suffix: "%",
      maxValue: 100,
      showProgress: true,
      duration: 1800,
      icon: React.createElement(Zap, { className: "w-6 h-6" }),
      description: "Enterprise-grade reliability",
    },
  ],
  columns: 4,
  trigger: "onScroll",
  staggerDelay: 200,
};

export const contentVariations: StatsAnimatedProps[] = [
  // Company milestones
  {
    headline: "Milestones & achievements",
    stats: [
      {
        value: 10,
        label: "Years in Business",
        suffix: "+",
        duration: 1500,
        icon: React.createElement(Trophy, { className: "w-6 h-6" }),
      },
      {
        value: 500,
        label: "Team Members",
        suffix: "+",
        duration: 2000,
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
      {
        value: 50,
        label: "Industry Awards",
        suffix: "+",
        duration: 1800,
        icon: React.createElement(Award, { className: "w-6 h-6" }),
      },
    ],
    columns: 3,
    trigger: "onScroll",
    staggerDelay: 150,
  },
  // Progress bars focused
  {
    headline: "Project completion status",
    subheadline: "Real-time progress tracking",
    stats: [
      {
        value: 85,
        label: "Development Progress",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2000,
        icon: React.createElement(Rocket, { className: "w-6 h-6" }),
        description: "Frontend & Backend complete",
      },
      {
        value: 92,
        label: "Testing Coverage",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2200,
        icon: React.createElement(Shield, { className: "w-6 h-6" }),
        description: "Unit & Integration tests",
      },
      {
        value: 78,
        label: "Documentation",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 1900,
        icon: React.createElement(Target, { className: "w-6 h-6" }),
        description: "API & User guides",
      },
      {
        value: 100,
        label: "Security Audit",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2100,
        icon: React.createElement(Shield, { className: "w-6 h-6" }),
        description: "Passed all checks",
      },
    ],
    columns: 2,
    trigger: "onScroll",
    staggerDelay: 100,
  },
  // Large numbers
  {
    headline: "Platform statistics",
    stats: [
      {
        value: 2500000,
        label: "API Calls Daily",
        suffix: "+",
        duration: 3000,
        icon: React.createElement(Zap, { className: "w-6 h-6" }),
      },
      {
        value: 750000,
        label: "Active Projects",
        duration: 2800,
        icon: React.createElement(Rocket, { className: "w-6 h-6" }),
      },
      {
        value: 99.99,
        label: "Reliability",
        suffix: "%",
        duration: 2000,
        icon: React.createElement(Shield, { className: "w-6 h-6" }),
      },
    ],
    columns: 3,
    trigger: "onMount",
  },
  // Mixed stats and progress
  {
    headline: "Performance metrics",
    stats: [
      {
        value: 4.9,
        label: "App Store Rating",
        suffix: "/5",
        duration: 1800,
        icon: React.createElement(Star, { className: "w-6 h-6" }),
      },
      {
        value: 95,
        label: "Code Quality Score",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2000,
        description: "Maintainability index",
      },
      {
        value: 1200,
        label: "Daily Active Users",
        suffix: "K+",
        duration: 2500,
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
      {
        value: 88,
        label: "Feature Adoption",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2200,
        description: "Core features usage",
      },
    ],
    columns: 4,
    trigger: "onScroll",
    staggerDelay: 150,
  },
  // Team stats
  {
    headline: "Our growing team",
    stats: [
      {
        value: 42,
        label: "Engineers",
        duration: 1500,
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
      {
        value: 15,
        label: "Designers",
        duration: 1600,
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
      {
        value: 8,
        label: "Product Managers",
        duration: 1400,
        icon: React.createElement(Users, { className: "w-6 h-6" }),
      },
      {
        value: 2500,
        label: "Cups of Coffee",
        suffix: "+",
        duration: 2000,
        icon: React.createElement(Coffee, { className: "w-6 h-6" }),
      },
    ],
    columns: 4,
    trigger: "onScroll",
    staggerDelay: 100,
  },
  // Minimal animated stats
  {
    stats: [
      {
        value: 10000,
        label: "Customers",
        suffix: "+",
        duration: 2000,
      },
      {
        value: 500,
        label: "Partners",
        suffix: "+",
        duration: 1800,
      },
    ],
    columns: 2,
    trigger: "onMount",
  },
  // Environmental impact
  {
    headline: "Environmental impact",
    subheadline: "Our commitment to sustainability",
    stats: [
      {
        value: 75,
        label: "Carbon Neutral Progress",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2500,
        description: "Towards 2025 goal",
      },
      {
        value: 1200000,
        label: "Trees Planted",
        duration: 3000,
        icon: React.createElement(TrendingUp, { className: "w-6 h-6" }),
      },
      {
        value: 90,
        label: "Renewable Energy",
        suffix: "%",
        maxValue: 100,
        showProgress: true,
        duration: 2200,
        description: "In our data centers",
      },
    ],
    columns: 3,
    trigger: "onScroll",
    staggerDelay: 200,
  },
];