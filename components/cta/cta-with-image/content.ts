import { CTAWithImageProps } from "./index";

export const defaultContent: CTAWithImageProps = {
  headline: "See the difference",
  subheadline: "Our intuitive interface makes complex tasks simple",
  primaryCTA: {
    text: "Try It Now",
    href: "/demo",
  },
  secondaryCTA: {
    text: "Watch Video",
    href: "/video",
  },
  image: {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=900&fit=crop",
    alt: "Product dashboard showing analytics",
    width: 600,
    height: 400,
  },
  imagePosition: "right",
  variant: "default",
};

export const contentVariations: CTAWithImageProps[] = [
  // Mobile app promotion
  {
    headline: "Work from anywhere",
    subheadline: "Our mobile app keeps you productive on the go",
    primaryCTA: {
      text: "Download for iOS",
      href: "/ios",
    },
    secondaryCTA: {
      text: "Download for Android",
      href: "/android",
    },
    image: {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop",
      alt: "Mobile app on smartphone",
      width: 600,
      height: 400,
    },
    imagePosition: "left",
    variant: "muted",
  },
  // Integration showcase
  {
    headline: "Connect all your tools",
    subheadline: "Seamlessly integrate with your existing workflow",
    primaryCTA: {
      text: "View Integrations",
      href: "/integrations",
    },
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
      alt: "Integration dashboard",
      width: 600,
      height: 400,
    },
    imagePosition: "right",
    variant: "default",
  },
  // Security focus
  {
    headline: "Enterprise-grade security",
    subheadline: "Your data is protected with industry-leading encryption",
    primaryCTA: {
      text: "Learn More",
      href: "/security",
    },
    secondaryCTA: {
      text: "View Compliance",
      href: "/compliance",
    },
    image: {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=900&fit=crop",
      alt: "Security dashboard",
      width: 600,
      height: 400,
    },
    imagePosition: "left",
    variant: "primary",
  },
  // Analytics feature
  {
    headline: "Make data-driven decisions",
    subheadline: "Powerful analytics to help you understand your business",
    primaryCTA: {
      text: "Explore Analytics",
      href: "/analytics",
    },
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
      alt: "Analytics charts and graphs",
      width: 600,
      height: 400,
    },
    imagePosition: "right",
    variant: "muted",
  },
  // Team collaboration
  {
    headline: "Collaborate effortlessly",
    subheadline: "Work together in real-time, from anywhere",
    primaryCTA: {
      text: "Start Collaborating",
      href: "/collaborate",
    },
    secondaryCTA: {
      text: "See How It Works",
      href: "/features/collaboration",
    },
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop",
      alt: "Team collaboration",
      width: 600,
      height: 400,
    },
    imagePosition: "left",
    variant: "default",
  },
];