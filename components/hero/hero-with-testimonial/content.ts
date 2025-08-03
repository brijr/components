import type { HeroWithTestimonialProps } from "./index";

/**
 * Default content for HeroWithTestimonial component
 */
export const defaultContent: HeroWithTestimonialProps = {
  headline: "Trusted by industry leaders",
  subheadline:
    "Discover why thousands of companies choose our platform for their critical workflows",
  primaryCTA: {
    text: "Get Started Free",
    href: "/signup",
  },
  secondaryCTA: {
    text: "Read Customer Stories",
    href: "/customers",
  },
  testimonial: {
    quote:
      "We've tried dozens of solutions, but nothing comes close to this platform. It's intuitive, powerful, and has completely transformed how we work. Our team productivity has increased by 60% in just three months.",
    author: {
      name: "Maria Rodriguez",
      role: "CTO",
      company: "InnovateTech",
      avatarUrl: "/placeholder.svg",
      avatarFallback: "MR",
    },
  },
};

/**
 * Alternative content variations for HeroWithTestimonial component
 */
export const contentVariations: HeroWithTestimonialProps[] = [
  {
    headline: "Join the best teams in the world",
    testimonial: {
      quote:
        "This is hands down the best investment we've made. The ROI was evident within weeks, and our entire engineering team loves using it daily.",
      author: {
        name: "Alex Thompson",
        role: "Engineering Manager",
        company: "Scale.io",
        avatarFallback: "AT",
      },
    },
    primaryCTA: {
      text: "Start Your Journey",
      href: "/trial",
    },
  },
  {
    headline: "Experience the difference",
    subheadline: "See what our customers have to say",
    testimonial: {
      quote:
        "The customer support alone is worth every penny. They've gone above and beyond to ensure our success, and the platform itself is incredibly robust.",
      author: {
        name: "Jennifer Wu",
        role: "Head of Operations",
        company: "Growth Labs",
        avatarUrl: "/placeholder.svg",
        avatarFallback: "JW",
      },
    },
    primaryCTA: {
      text: "Try It Free",
      href: "/trial",
    },
    secondaryCTA: {
      text: "Contact Sales",
      href: "/contact",
    },
  },
];
