import { CTAWithBenefitsProps } from "./index";

export const defaultContent: CTAWithBenefitsProps = {
  headline: "Everything you need to succeed",
  subheadline: "Join thousands of teams already using our platform to grow their business",
  benefits: [
    { text: "Unlimited projects and collaborators" },
    { text: "Advanced analytics and reporting" },
    { text: "24/7 priority support" },
    { text: "99.9% uptime guarantee" },
    { text: "Enterprise-grade security" },
  ],
  primaryCTA: {
    text: "Start Free Trial",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Compare Plans",
    href: "/pricing",
  },
  layout: "centered",
  variant: "default",
};

export const contentVariations: CTAWithBenefitsProps[] = [
  // Split layout version
  {
    headline: "Why teams love our platform",
    subheadline: "Everything you need in one powerful solution",
    benefits: [
      { text: "Set up in minutes, not hours" },
      { text: "No credit card required" },
      { text: "Cancel anytime" },
      { text: "GDPR & SOC2 compliant" },
      { text: "Free migrations from competitors" },
    ],
    primaryCTA: {
      text: "Get Started Free",
      href: "/signup",
    },
    layout: "split",
    variant: "muted",
  },
  // Pro plan upgrade
  {
    headline: "Unlock the full potential",
    subheadline: "Upgrade to Pro and supercharge your workflow",
    benefits: [
      { text: "Unlimited team members" },
      { text: "Advanced automation workflows" },
      { text: "Custom integrations" },
      { text: "Dedicated account manager" },
      { text: "SLA guarantee" },
      { text: "Advanced security features" },
    ],
    primaryCTA: {
      text: "Upgrade to Pro",
      href: "/upgrade",
    },
    secondaryCTA: {
      text: "View All Features",
      href: "/features",
    },
    layout: "centered",
    variant: "primary",
  },
  // Newsletter benefits
  {
    headline: "Stay ahead of the curve",
    subheadline: "Get exclusive insights delivered to your inbox",
    benefits: [
      { text: "Weekly industry insights" },
      { text: "Early access to new features" },
      { text: "Exclusive discounts and offers" },
      { text: "Expert tips and best practices" },
    ],
    primaryCTA: {
      text: "Subscribe Now",
      href: "/newsletter",
    },
    layout: "centered",
    variant: "default",
  },
  // Partner program
  {
    headline: "Grow your business with us",
    benefits: [
      { text: "Earn 30% recurring commission" },
      { text: "Dedicated partner dashboard" },
      { text: "Marketing materials and support" },
      { text: "Priority technical support" },
      { text: "Co-marketing opportunities" },
    ],
    primaryCTA: {
      text: "Become a Partner",
      href: "/partners",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/partner-program",
    },
    layout: "split",
    variant: "muted",
  },
  // Free trial benefits
  {
    headline: "Try everything free for 14 days",
    subheadline: "No commitment, no credit card required",
    benefits: [
      { text: "Access to all premium features" },
      { text: "Unlimited projects" },
      { text: "Full customer support" },
      { text: "Free onboarding session" },
    ],
    primaryCTA: {
      text: "Start Your Trial",
      href: "/trial",
    },
    layout: "centered",
    variant: "primary",
  },
];