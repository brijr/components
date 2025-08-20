import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JSONSchema7 } from "json-schema";

/**
 * Generate JSON Schema from Zod schema
 */
export function generateJSONSchema(zodSchema: z.ZodSchema): JSONSchema7 {
  const jsonSchema = zodToJsonSchema(zodSchema, {
    name: "ComponentProps",
    $refStrategy: "none",
    target: "jsonSchema7",
    strictUnions: true,
  });
  
  return jsonSchema as JSONSchema7;
}

/**
 * Common Zod schemas for reusable prop types
 */
export const CommonSchemas = {
  // CTA Button schema
  ctaSchema: z.object({
    text: z.string()
      .min(1, "Button text is required")
      .max(30, "Button text should be concise"),
    href: z.string()
      .url("Must be a valid URL")
      .or(z.string().regex(/^\//, "Must be a valid path")),
    variant: z.enum(["primary", "secondary", "outline", "ghost"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    target: z.enum(["_self", "_blank"]).optional(),
  }),
  
  // Image schema
  imageSchema: z.object({
    src: z.string().url("Must be a valid image URL"),
    alt: z.string().min(1, "Alt text is required for accessibility"),
    width: z.number().positive().optional(),
    height: z.number().positive().optional(),
    loading: z.enum(["lazy", "eager"]).optional(),
  }),
  
  // Link schema
  linkSchema: z.object({
    text: z.string().min(1),
    href: z.string().url().or(z.string().regex(/^\//)),
    target: z.enum(["_self", "_blank"]).optional(),
  }),
  
  // Feature schema
  featureSchema: z.object({
    icon: z.string().optional(),
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(500),
    link: z.object({
      text: z.string(),
      href: z.string(),
    }).optional(),
  }),
  
  // Testimonial schema
  testimonialSchema: z.object({
    quote: z.string().min(20).max(500),
    author: z.string().min(1).max(100),
    role: z.string().optional(),
    company: z.string().optional(),
    avatar: z.string().url().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
  
  // Pricing plan schema
  pricingPlanSchema: z.object({
    name: z.string().min(1).max(50),
    description: z.string().optional(),
    monthlyPrice: z.number().min(0),
    yearlyPrice: z.number().min(0).optional(),
    currency: z.string().default("USD"),
    features: z.array(z.string()),
    cta: z.object({
      text: z.string(),
      href: z.string(),
    }),
    highlighted: z.boolean().optional(),
    badge: z.string().optional(),
  }),
};

/**
 * Hero component schemas
 */
export const HeroSchemas = {
  heroMinimal: z.object({
    headline: z.string()
      .min(5, "Headline too short")
      .max(100, "Headline too long"),
    subheadline: z.string()
      .max(200, "Subheadline too long")
      .optional(),
    primaryCTA: CommonSchemas.ctaSchema.optional(),
    secondaryCTA: CommonSchemas.ctaSchema.optional(),
  }),
  
  heroCentered: z.object({
    badge: z.string().max(30).optional(),
    headline: z.string().min(5).max(100),
    subheadline: z.string().max(200).optional(),
    primaryCTA: CommonSchemas.ctaSchema.optional(),
    secondaryCTA: CommonSchemas.ctaSchema.optional(),
  }),
  
  heroSplit: z.object({
    headline: z.string().min(5).max(100),
    subheadline: z.string().max(200).optional(),
    primaryCTA: CommonSchemas.ctaSchema.optional(),
    secondaryCTA: CommonSchemas.ctaSchema.optional(),
    image: CommonSchemas.imageSchema.optional(),
    features: z.array(z.string()).max(4).optional(),
  }),
  
  heroWithImage: z.object({
    headline: z.string().min(5).max(100),
    subheadline: z.string().max(200).optional(),
    primaryCTA: CommonSchemas.ctaSchema.optional(),
    secondaryCTA: CommonSchemas.ctaSchema.optional(),
    image: CommonSchemas.imageSchema,
    imagePosition: z.enum(["left", "right", "center"]).optional(),
  }),
};

/**
 * Feature component schemas
 */
export const FeatureSchemas = {
  featureThreeCards: z.object({
    headline: z.string().min(5).max(100).optional(),
    subheadline: z.string().max(200).optional(),
    features: z.array(CommonSchemas.featureSchema)
      .min(1, "At least one feature required")
      .max(3, "Maximum 3 features for this layout"),
    primaryCTA: CommonSchemas.ctaSchema.optional(),
  }),
  
  featureIconList: z.object({
    headline: z.string().min(5).max(100).optional(),
    subheadline: z.string().max(200).optional(),
    features: z.array(CommonSchemas.featureSchema)
      .min(1)
      .max(12),
    columns: z.number().min(1).max(4).optional(),
  }),
  
  featureAlternatingMedia: z.object({
    headline: z.string().min(5).max(100).optional(),
    features: z.array(
      CommonSchemas.featureSchema.extend({
        image: CommonSchemas.imageSchema.optional(),
      })
    ).min(1).max(6),
  }),
};

/**
 * Testimonial component schemas
 */
export const TestimonialSchemas = {
  testimonialGrid: z.object({
    headline: z.string().min(5).max(100).optional(),
    subheadline: z.string().max(200).optional(),
    testimonials: z.array(CommonSchemas.testimonialSchema)
      .min(1)
      .max(12),
    columns: z.number().min(1).max(4).optional(),
  }),
  
  testimonialCarousel: z.object({
    headline: z.string().min(5).max(100).optional(),
    testimonials: z.array(CommonSchemas.testimonialSchema)
      .min(2),
    autoplay: z.boolean().optional(),
    interval: z.number().min(1000).max(10000).optional(),
  }),
};

/**
 * Pricing component schemas
 */
export const PricingSchemas = {
  pricingToggle: z.object({
    headline: z.string().min(5).max(100).optional(),
    subheadline: z.string().max(200).optional(),
    plans: z.array(CommonSchemas.pricingPlanSchema)
      .min(1)
      .max(5),
    billingPeriods: z.array(z.enum(["monthly", "yearly"])).optional(),
    discount: z.object({
      yearly: z.number().min(0).max(100),
      text: z.string().optional(),
    }).optional(),
  }),
  
  pricingHighlight: z.object({
    headline: z.string().min(5).max(100).optional(),
    plans: z.array(CommonSchemas.pricingPlanSchema)
      .min(1)
      .max(4),
  }),
};

/**
 * CTA component schemas
 */
export const CTASchemas = {
  ctaSingle: z.object({
    headline: z.string().min(5).max(100),
    subheadline: z.string().max(200).optional(),
    primaryCTA: CommonSchemas.ctaSchema,
  }),
  
  ctaDual: z.object({
    headline: z.string().min(5).max(100),
    subheadline: z.string().max(200).optional(),
    primaryCTA: CommonSchemas.ctaSchema,
    secondaryCTA: CommonSchemas.ctaSchema,
  }),
};

/**
 * Footer component schemas
 */
export const FooterSchemas = {
  footerMinimal: z.object({
    companyName: z.string().min(1).max(100),
    tagline: z.string().max(200).optional(),
    links: z.array(CommonSchemas.linkSchema).optional(),
    copyright: z.string().optional(),
  }),
  
  footerWithCTA: z.object({
    companyName: z.string().min(1).max(100),
    tagline: z.string().max(200).optional(),
    cta: z.object({
      headline: z.string(),
      primaryCTA: CommonSchemas.ctaSchema,
    }).optional(),
    links: z.object({
      product: z.array(CommonSchemas.linkSchema).optional(),
      company: z.array(CommonSchemas.linkSchema).optional(),
      support: z.array(CommonSchemas.linkSchema).optional(),
      legal: z.array(CommonSchemas.linkSchema).optional(),
    }).optional(),
    social: z.array(z.object({
      platform: z.string(),
      href: z.string().url(),
      icon: z.string().optional(),
    })).optional(),
  }),
};

/**
 * Get all component schemas mapped by slug
 */
export const ComponentSchemaMap = {
  // Hero components
  "hero-minimal": HeroSchemas.heroMinimal,
  "hero-centered": HeroSchemas.heroCentered,
  "hero-split": HeroSchemas.heroSplit,
  "hero-with-image": HeroSchemas.heroWithImage,
  
  // Feature components
  "feature-three-cards": FeatureSchemas.featureThreeCards,
  "feature-icon-list": FeatureSchemas.featureIconList,
  "feature-alternating-media": FeatureSchemas.featureAlternatingMedia,
  
  // Testimonial components
  "testimonial-grid": TestimonialSchemas.testimonialGrid,
  "testimonial-carousel": TestimonialSchemas.testimonialCarousel,
  
  // Pricing components
  "pricing-toggle": PricingSchemas.pricingToggle,
  "pricing-highlight": PricingSchemas.pricingHighlight,
  
  // CTA components
  "cta-single": CTASchemas.ctaSingle,
  "cta-dual": CTASchemas.ctaDual,
  
  // Footer components
  "footer-minimal": FooterSchemas.footerMinimal,
  "footer-with-cta": FooterSchemas.footerWithCTA,
};

/**
 * Get JSON schema for a component by slug
 */
export function getComponentJSONSchema(slug: string): JSONSchema7 | null {
  const zodSchema = ComponentSchemaMap[slug as keyof typeof ComponentSchemaMap];
  if (!zodSchema) return null;
  
  return generateJSONSchema(zodSchema);
}

/**
 * Validate props against a component schema
 */
export function validateComponentProps(
  slug: string,
  props: any
): { success: boolean; data?: any; error?: z.ZodError } {
  const zodSchema = ComponentSchemaMap[slug as keyof typeof ComponentSchemaMap];
  if (!zodSchema) {
    return {
      success: false,
      error: new z.ZodError([{
        code: "custom",
        message: `No schema found for component: ${slug}`,
        path: [],
      }]),
    };
  }
  
  return zodSchema.safeParse(props);
}