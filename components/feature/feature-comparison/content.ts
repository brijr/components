import { FeatureComparisonProps } from "./index";

export const defaultContent: FeatureComparisonProps = {
  headline: "Compare our plans",
  subheadline: "Choose the right plan for your needs",
  optionAName: "Basic",
  optionADescription: "For individuals and small teams",
  optionBName: "Pro",
  optionBDescription: "For growing businesses",
  features: [
    { name: "Unlimited projects", optionA: true, optionB: true },
    { name: "Team collaboration", optionA: true, optionB: true },
    { name: "File storage", optionA: true, optionB: true },
    { name: "Advanced analytics", optionA: false, optionB: true },
    { name: "Custom integrations", optionA: false, optionB: true },
    { name: "Priority support", optionA: false, optionB: true },
    { name: "API access", optionA: false, optionB: true },
    { name: "White-label options", optionA: false, optionB: true },
    { name: "Advanced security", optionA: false, optionB: true },
    { name: "Dedicated account manager", optionA: false, optionB: true },
  ],
};

export const contentVariations: FeatureComparisonProps[] = [
  // Self-hosted vs Cloud comparison
  {
    headline: "Deployment options",
    subheadline: "Choose between self-hosted and cloud deployment",
    optionAName: "Self-Hosted",
    optionADescription: "Full control on your infrastructure",
    optionBName: "Cloud",
    optionBDescription: "Managed solution with automatic updates",
    features: [
      { name: "Full data control", optionA: true, optionB: false },
      { name: "Automatic updates", optionA: false, optionB: true },
      { name: "Managed backups", optionA: false, optionB: true },
      { name: "Custom configuration", optionA: true, optionB: false },
      { name: "99.9% uptime SLA", optionA: false, optionB: true },
      { name: "Instant scalability", optionA: false, optionB: true },
      { name: "Air-gapped deployment", optionA: true, optionB: false },
      { name: "24/7 monitoring", optionA: false, optionB: true },
    ],
  },
  // Free vs Premium comparison
  {
    headline: "Free vs Premium",
    optionAName: "Free",
    optionBName: "Premium",
    features: [
      { name: "Core features", optionA: true, optionB: true },
      { name: "Community support", optionA: true, optionB: true },
      { name: "Advanced features", optionA: false, optionB: true },
      { name: "Priority support", optionA: false, optionB: true },
      { name: "Custom branding", optionA: false, optionB: true },
      { name: "Analytics dashboard", optionA: false, optionB: true },
      { name: "Team collaboration", optionA: false, optionB: true },
      { name: "API access", optionA: false, optionB: true },
    ],
  },
  // Before vs After comparison
  {
    headline: "Transform your workflow",
    subheadline: "See how our solution improves your process",
    optionAName: "Before",
    optionADescription: "Traditional approach",
    optionBName: "After",
    optionBDescription: "With our solution",
    features: [
      { name: "Automated workflows", optionA: false, optionB: true },
      { name: "Real-time collaboration", optionA: false, optionB: true },
      { name: "Version control", optionA: false, optionB: true },
      { name: "Centralized data", optionA: false, optionB: true },
      { name: "Instant insights", optionA: false, optionB: true },
      { name: "Mobile access", optionA: false, optionB: true },
      { name: "Integration capabilities", optionA: false, optionB: true },
    ],
  },
];