import { ComponentDefinition } from "../types";
import { HeroSchemas, generateJSONSchema } from "../generator";
import { defaultContent as heroMinimalContent } from "@/components/components/hero/hero-minimal/content";
import { defaultContent as heroCenteredContent } from "@/components/components/hero/hero-centered/content";

/**
 * Hero Minimal Component Definition
 */
export const heroMinimalDefinition: ComponentDefinition = {
  // Metadata
  slug: "hero-minimal",
  name: "Hero Minimal",
  category: "hero",
  description: "Simple centered hero with headline and CTAs",
  
  // Schema
  schema: generateJSONSchema(HeroSchemas.heroMinimal),
  zodSchema: HeroSchemas.heroMinimal,
  
  // AI Hints
  aiHints: {
    purpose: "Main landing section to capture attention and communicate core value proposition",
    whenToUse: [
      "First section of landing page",
      "Product launch announcements",
      "Simple value proposition presentation",
      "Minimalist design approach"
    ],
    commonPatterns: [
      "Problem → Solution format",
      "Benefit-focused messaging",
      "Clear value proposition",
      "Urgency or exclusivity",
      "Social proof integration"
    ],
    industryVariations: {
      saas: {
        headline: "Accelerate Your Development Workflow",
        subheadline: "Ship features faster with our AI-powered development platform",
        primaryCTA: { text: "Start Free Trial", href: "/signup" },
        secondaryCTA: { text: "Watch Demo", href: "/demo" }
      },
      ecommerce: {
        headline: "Shop Smarter, Not Harder",
        subheadline: "Discover amazing deals on everything you love",
        primaryCTA: { text: "Shop Now", href: "/products" },
        secondaryCTA: { text: "View Catalog", href: "/catalog" }
      },
      agency: {
        headline: "Transform Your Digital Presence",
        subheadline: "Award-winning design and development for ambitious brands",
        primaryCTA: { text: "Get Started", href: "/contact" },
        secondaryCTA: { text: "View Portfolio", href: "/work" }
      },
      startup: {
        headline: "The Future Starts Here",
        subheadline: "Join thousands of early adopters shaping tomorrow",
        primaryCTA: { text: "Request Access", href: "/early-access" },
        secondaryCTA: { text: "Learn More", href: "/about" }
      }
    },
    toneVariations: {
      professional: {
        headline: "Enterprise-Grade Solutions for Modern Teams",
        subheadline: "Streamline operations with our comprehensive platform"
      },
      casual: {
        headline: "Hey There! Ready to Level Up?",
        subheadline: "We make the complicated stuff simple"
      },
      playful: {
        headline: "🚀 Blast Off Into Awesome",
        subheadline: "Where boring goes to die and amazing begins"
      },
      serious: {
        headline: "Trusted Security for Critical Infrastructure",
        subheadline: "Protecting what matters most with advanced technology"
      },
      bold: {
        headline: "Disrupting the Status Quo",
        subheadline: "Because average is not in our vocabulary"
      }
    }
  },
  
  // Templates
  templates: {
    default: heroMinimalContent,
    minimal: {
      headline: "Welcome to Our Platform",
      primaryCTA: { text: "Get Started", href: "/start" }
    },
    full: {
      headline: "Build Something Amazing Today",
      subheadline: "Everything you need to turn your ideas into reality, all in one place",
      primaryCTA: { text: "Start Building", href: "/signup" },
      secondaryCTA: { text: "Explore Features", href: "/features" }
    },
    variations: {
      cta_only: {
        headline: "Ready to Get Started?",
        primaryCTA: { text: "Sign Up Now", href: "/signup" }
      },
      dual_cta: {
        headline: "Choose Your Path",
        primaryCTA: { text: "For Individuals", href: "/personal" },
        secondaryCTA: { text: "For Teams", href: "/business" }
      },
      long_form: {
        headline: "The Complete Solution for Modern Development",
        subheadline: "From ideation to deployment, we provide all the tools, resources, and support you need to build exceptional products that users love",
        primaryCTA: { text: "Start Free Trial", href: "/trial" },
        secondaryCTA: { text: "Book a Demo", href: "/demo" }
      }
    }
  },
  
  // Validation
  validation: {
    required: ["headline"],
    conditional: [
      {
        if: { prop: "secondaryCTA", condition: "exists" },
        then: { required: ["primaryCTA"] }
      }
    ],
    constraints: [
      {
        prop: "headline",
        type: "minLength",
        value: 5,
        message: "Headline should be at least 5 characters"
      },
      {
        prop: "headline",
        type: "maxLength",
        value: 100,
        message: "Headline should be concise (max 100 characters)"
      },
      {
        prop: "subheadline",
        type: "maxLength",
        value: 200,
        message: "Subheadline should be under 200 characters"
      }
    ]
  },
  
  // Composition
  composition: {
    compatible: [
      "feature-three-cards",
      "feature-icon-list",
      "testimonial-grid",
      "pricing-toggle",
      "cta-single"
    ],
    sequence: {
      prefersBefore: [],  // Hero usually comes first
      prefersAfter: ["feature-three-cards", "testimonial-grid"],
      neverBefore: ["footer-minimal", "footer-with-cta"],
      neverAfter: []
    },
    contentFlow: {
      sharesPropsWith: ["cta-single", "cta-dual"],  // Can share CTA content
      inheritsPropsFrom: []  // Doesn't inherit from others
    }
  }
};

/**
 * Hero Centered Component Definition
 */
export const heroCenteredDefinition: ComponentDefinition = {
  slug: "hero-centered",
  name: "Hero Centered",
  category: "hero",
  description: "Centered hero with badge, headline, subheadline and CTAs",
  
  schema: generateJSONSchema(HeroSchemas.heroCentered),
  zodSchema: HeroSchemas.heroCentered,
  
  aiHints: {
    purpose: "Premium hero section with badge for announcements or credibility",
    whenToUse: [
      "Product launches with awards or recognition",
      "Feature announcements",
      "When you need to highlight a key achievement",
      "Professional services landing pages"
    ],
    commonPatterns: [
      "Badge → Headline → Subheadline → CTAs",
      "Award or certification display",
      "New feature announcement",
      "Limited time offers"
    ],
    industryVariations: {
      saas: {
        badge: "🎉 New Feature",
        headline: "Introducing AI-Powered Analytics",
        subheadline: "Get insights 10x faster with our latest update",
        primaryCTA: { text: "Try It Now", href: "/features/ai" }
      },
      ecommerce: {
        badge: "Limited Time Offer",
        headline: "Summer Sale - Up to 50% Off",
        subheadline: "Don't miss out on our biggest sale of the year",
        primaryCTA: { text: "Shop Sale", href: "/sale" }
      }
    }
  },
  
  templates: {
    default: heroCenteredContent,
    minimal: {
      headline: "Welcome to Excellence",
      primaryCTA: { text: "Get Started", href: "/start" }
    },
    full: {
      badge: "Award Winner 2024",
      headline: "The Industry-Leading Solution",
      subheadline: "Trusted by over 10,000 companies worldwide",
      primaryCTA: { text: "Start Free Trial", href: "/trial" },
      secondaryCTA: { text: "See Why", href: "/testimonials" }
    }
  },
  
  validation: {
    required: ["headline"],
    constraints: [
      {
        prop: "badge",
        type: "maxLength",
        value: 30,
        message: "Badge text should be short and impactful"
      }
    ]
  },
  
  composition: {
    compatible: ["feature-three-cards", "testimonial-grid", "pricing-toggle"],
    sequence: {
      prefersBefore: [],
      prefersAfter: ["feature-three-cards"],
      neverBefore: ["footer-minimal"],
      neverAfter: []
    }
  }
};

/**
 * Get all hero definitions
 */
export const heroDefinitions = [
  heroMinimalDefinition,
  heroCenteredDefinition,
  // Add more hero definitions here
];

/**
 * Get hero definition by slug
 */
export function getHeroDefinition(slug: string): ComponentDefinition | undefined {
  return heroDefinitions.find(def => def.slug === slug);
}