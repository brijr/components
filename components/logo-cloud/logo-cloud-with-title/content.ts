import { LogoCloudWithTitleProps } from "./index";

export const defaultContent: LogoCloudWithTitleProps = {
  headline: "Trusted by industry leaders",
  subheadline:
    "Join thousands of companies already transforming their business with our platform",
  logos: [
    {
      name: "Fortune 500 Corp",
      src: "/logo-placeholder.svg",
      width: 140,
      height: 40,
      description: "Leading global enterprise",
      href: "https://example.com",
    },
    {
      name: "Tech Innovators",
      src: "/logo-placeholder.svg",
      width: 120,
      height: 40,
      description: "Pioneering the future",
      href: "https://example.com",
    },
    {
      name: "Global Retail",
      src: "/logo-placeholder.svg",
      width: 130,
      height: 40,
      description: "Worldwide commerce leader",
      href: "https://example.com",
    },
    {
      name: "Finance Plus",
      src: "/logo-placeholder.svg",
      width: 110,
      height: 40,
      description: "Trusted financial services",
      href: "https://example.com",
    },
    {
      name: "Health Systems",
      src: "/logo-placeholder.svg",
      width: 140,
      height: 40,
      description: "Healthcare innovation",
      href: "https://example.com",
    },
    {
      name: "EduTech Pro",
      src: "/logo-placeholder.svg",
      width: 120,
      height: 40,
      description: "Education technology leader",
      href: "https://example.com",
    },
    {
      name: "Media Giant",
      src: "/logo-placeholder.svg",
      width: 130,
      height: 40,
      description: "Global media network",
      href: "https://example.com",
    },
    {
      name: "Auto Leaders",
      src: "/logo-placeholder.svg",
      width: 120,
      height: 40,
      description: "Driving innovation",
      href: "https://example.com",
    },
  ],
  testimonial: {
    quote:
      "This platform has fundamentally transformed how we operate. The efficiency gains have been remarkable.",
    author: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "Fortune 500 Corp",
  },
  variant: "grid",
  columns: 4,
  logoStyle: "grayscale",
  showDescriptions: true,
};

export const contentVariations: LogoCloudWithTitleProps[] = [
  // Single row variant
  {
    headline: "Our partners",
    subheadline: "Working with the best in the industry",
    logos: [
      {
        name: "Microsoft",
        src: "/logo-placeholder.svg",
        width: 130,
        height: 40,
      },
      {
        name: "Google",
        src: "/logo-placeholder.svg",
        width: 110,
        height: 40,
      },
      {
        name: "Amazon",
        src: "/logo-placeholder.svg",
        width: 120,
        height: 40,
      },
      {
        name: "Apple",
        src: "/logo-placeholder.svg",
        width: 100,
        height: 40,
      },
      {
        name: "Meta",
        src: "/logo-placeholder.svg",
        width: 110,
        height: 40,
      },
    ],
    variant: "single-row",
    logoStyle: "grayscale",
  },
  // With testimonial focus
  {
    headline: "Loved by teams everywhere",
    logos: [
      {
        name: "Startup Inc",
        src: "/logo-placeholder.svg",
        width: 120,
        height: 40,
      },
      {
        name: "Scale Fast",
        src: "/logo-placeholder.svg",
        width: 110,
        height: 40,
      },
      {
        name: "Growth Co",
        src: "/logo-placeholder.svg",
        width: 130,
        height: 40,
      },
      {
        name: "Innovate Labs",
        src: "/logo-placeholder.svg",
        width: 140,
        height: 40,
      },
      {
        name: "Future Tech",
        src: "/logo-placeholder.svg",
        width: 120,
        height: 40,
      },
      {
        name: "Digital First",
        src: "/logo-placeholder.svg",
        width: 130,
        height: 40,
      },
    ],
    testimonial: {
      quote:
        "We've tried many solutions, but this is the only one that truly delivers on its promises. Our team productivity has increased by 40%.",
      author: "Michael Chen",
      role: "Founder & CEO",
      company: "Scale Fast",
    },
    variant: "grid",
    columns: 6,
    logoStyle: "color",
  },
  // Stacked variant for featured partners
  {
    headline: "Featured case studies",
    subheadline: "See how leading companies use our platform",
    logos: [
      {
        name: "Enterprise Alpha",
        src: "/logo-placeholder.svg",
        width: 160,
        height: 50,
        description: "Reduced operational costs by 35% in 6 months",
        href: "/case-studies/enterprise-alpha",
      },
      {
        name: "Global Beta",
        src: "/logo-placeholder.svg",
        width: 150,
        height: 50,
        description: "Scaled from 100 to 10,000 users seamlessly",
        href: "/case-studies/global-beta",
      },
      {
        name: "Innovation Gamma",
        src: "/logo-placeholder.svg",
        width: 170,
        height: 50,
        description: "Launched 5 new products using our platform",
        href: "/case-studies/innovation-gamma",
      },
    ],
    variant: "stacked",
    logoStyle: "color",
    showDescriptions: true,
  },
  // Security-focused partners
  {
    headline: "Security & compliance partners",
    subheadline: "Certified and trusted by leading security organizations",
    logos: [
      {
        name: "ISO Certified",
        src: "/logo-placeholder.svg",
        width: 100,
        height: 40,
        description: "ISO 27001 certified",
      },
      {
        name: "SOC 2",
        src: "/logo-placeholder.svg",
        width: 90,
        height: 40,
        description: "Type II compliant",
      },
      {
        name: "GDPR Ready",
        src: "/logo-placeholder.svg",
        width: 110,
        height: 40,
        description: "Fully GDPR compliant",
      },
      {
        name: "HIPAA Secure",
        src: "/logo-placeholder.svg",
        width: 120,
        height: 40,
        description: "HIPAA compliant",
      },
      {
        name: "PCI DSS",
        src: "/logo-placeholder.svg",
        width: 100,
        height: 40,
        description: "Level 1 certified",
      },
      {
        name: "CCPA Ready",
        src: "/logo-placeholder.svg",
        width: 110,
        height: 40,
        description: "CCPA compliant",
      },
    ],
    variant: "grid",
    columns: 6,
    logoStyle: "dark",
    showDescriptions: true,
  },
  // Investor logos
  {
    headline: "Backed by the best",
    subheadline: "World-class investors believe in our vision",
    logos: [
      {
        name: "Venture Capital A",
        src: "/logo-placeholder.svg",
        width: 140,
        height: 40,
        href: "https://vca.com",
      },
      {
        name: "Growth Partners",
        src: "/logo-placeholder.svg",
        width: 150,
        height: 40,
        href: "https://growth.com",
      },
      {
        name: "Innovation Fund",
        src: "/logo-placeholder.svg",
        width: 160,
        height: 40,
        href: "https://innovation.com",
      },
      {
        name: "Tech Ventures",
        src: "/logo-placeholder.svg",
        width: 140,
        height: 40,
        href: "https://techventures.com",
      },
    ],
    variant: "single-row",
    logoStyle: "grayscale",
  },
];
