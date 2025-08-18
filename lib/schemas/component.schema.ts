import { z } from "zod";

/**
 * AI-specific metadata for components
 */
export const AIMetadataSchema = z.object({
  category: z.string(),
  tags: z.array(z.string()),
  complexity: z.enum(["simple", "moderate", "complex"]),
  compatibleWith: z.array(z.string()),
  conflictsWith: z.array(z.string()),
  commonUseCases: z.array(z.string()),
  contentGeneration: z.object({
    tone: z.array(z.enum(["professional", "casual", "friendly", "urgent", "technical"])),
    industry: z.array(z.string()),
    prompts: z.array(z.string()),
  }),
  positioning: z.object({
    preferredPosition: z.enum(["top", "middle", "bottom", "any"]),
    maxInstances: z.number().default(1),
  }),
});

/**
 * Enhanced component schema with AI capabilities
 */
export const AIComponentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  props: z.record(z.any()),
  ai: AIMetadataSchema,
  examples: z.array(z.record(z.any())),
});

// TypeScript types
export type AIMetadata = z.infer<typeof AIMetadataSchema>;
export type AIComponent = z.infer<typeof AIComponentSchema>;

/**
 * Hero Minimal AI Configuration
 */
export const heroMinimalAIConfig: AIComponent = {
  slug: "hero-minimal",
  name: "Hero Minimal",
  description: "Minimal hero section with centered text and optional CTAs",
  props: {
    headline: { type: "string", required: true },
    subheadline: { type: "string", required: false },
    primaryCTA: { 
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" }
      }
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" }
      }
    }
  },
  ai: {
    category: "hero",
    tags: ["landing", "above-fold", "introduction", "minimal", "clean"],
    complexity: "simple",
    compatibleWith: ["feature-grid", "testimonial", "cta-simple"],
    conflictsWith: ["hero-split", "hero-with-image"],
    commonUseCases: [
      "SaaS landing pages",
      "Product launches",
      "Marketing campaigns",
      "Coming soon pages"
    ],
    contentGeneration: {
      tone: ["professional", "friendly", "casual"],
      industry: ["saas", "tech", "startup", "agency", "ecommerce"],
      prompts: [
        "Create a hero for a SaaS startup",
        "Generate a landing page hero for a productivity app",
        "Build a hero section for an AI tool"
      ]
    },
    positioning: {
      preferredPosition: "top",
      maxInstances: 1
    }
  },
  examples: [
    {
      headline: "Ship Faster with Modern Tools",
      subheadline: "Everything you need to build, test, and deploy your next big idea",
      primaryCTA: { text: "Start Building", href: "/signup" },
      secondaryCTA: { text: "View Demo", href: "/demo" }
    },
    {
      headline: "The Future of Design Systems",
      primaryCTA: { text: "Explore Now", href: "/explore" }
    }
  ]
};

/**
 * Component intelligence for AI generation
 */
export const componentIntelligence = {
  "hero-minimal": {
    naturalFlow: {
      before: [],
      after: ["features", "testimonials", "stats"],
    },
    contentPatterns: {
      headline: {
        minLength: 20,
        maxLength: 80,
        patterns: [
          "Build [outcome] with [product]",
          "The [adjective] way to [action]",
          "[Action] your [subject] in [timeframe]",
          "Welcome to the future of [industry]"
        ]
      },
      subheadline: {
        minLength: 40,
        maxLength: 120,
        patterns: [
          "Join [number] [users] who [achievement]",
          "[Feature], [feature], and [feature] in one platform",
          "Everything you need to [goal]"
        ]
      },
      cta: {
        primary: ["Get Started", "Start Free Trial", "Try It Now", "Sign Up Free"],
        secondary: ["Learn More", "View Demo", "See How It Works", "Watch Video"]
      }
    }
  }
};