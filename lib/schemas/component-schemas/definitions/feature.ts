import { ComponentDefinition } from "../types";
import { FeatureSchemas, generateJSONSchema } from "../generator";
import { defaultContent as featureThreeCardsContent } from "@/components/components/feature/feature-three-cards/content";
import { defaultContent as featureIconListContent } from "@/components/components/feature/feature-icon-list/content";
import { defaultContent as featureAlternatingMediaContent } from "@/components/components/feature/feature-alternating-media/content";

/**
 * Feature Three Cards Component Definition
 */
export const featureThreeCardsDefinition: ComponentDefinition = {
  slug: "feature-three-cards",
  name: "Feature Three Cards",
  category: "feature",
  description: "Three feature cards with icons, perfect for highlighting key benefits",
  
  schema: generateJSONSchema(FeatureSchemas.featureThreeCards),
  zodSchema: FeatureSchemas.featureThreeCards,
  
  aiHints: {
    purpose: "Showcase 3 main features or benefits in a visually balanced layout",
    whenToUse: [
      "After hero section to expand on value proposition",
      "Highlighting product benefits",
      "Showing service offerings",
      "Displaying key differentiators"
    ],
    commonPatterns: [
      "Icon + Title + Description + Link",
      "Three pillars approach",
      "Problem-Solution-Result",
      "Feature-Benefit-Outcome"
    ],
    industryVariations: {
      saas: {
        features: [
          {
            icon: "Zap",
            title: "Lightning Fast",
            description: "Process data 10x faster with our optimized engine"
          },
          {
            icon: "Shield",
            title: "Enterprise Security",
            description: "Bank-level encryption and compliance built-in"
          },
          {
            icon: "Globe",
            title: "Global Scale",
            description: "Deploy worldwide with automatic scaling"
          }
        ]
      },
      ecommerce: {
        features: [
          {
            icon: "Truck",
            title: "Free Shipping",
            description: "On all orders over $50, delivered in 2-3 days"
          },
          {
            icon: "RefreshCw",
            title: "Easy Returns",
            description: "30-day money-back guarantee, no questions asked"
          },
          {
            icon: "CreditCard",
            title: "Secure Payment",
            description: "Multiple payment options with buyer protection"
          }
        ]
      }
    },
    toneVariations: {
      professional: {
        headline: "Enterprise-Grade Features",
        subheadline: "Built for scale, designed for reliability"
      },
      casual: {
        headline: "Why You'll Love Us",
        subheadline: "Three reasons we're different (and better)"
      }
    }
  },
  
  templates: {
    default: featureThreeCardsContent,
    minimal: {
      features: [
        { title: "Feature 1", description: "Description of feature 1" },
        { title: "Feature 2", description: "Description of feature 2" },
        { title: "Feature 3", description: "Description of feature 3" }
      ]
    }
  },
  
  validation: {
    required: ["features"],
    constraints: [
      {
        prop: "features",
        type: "custom",
        value: "array-length",
        message: "Should have exactly 3 features for optimal layout"
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "testimonial-grid", "cta-single"],
    sequence: {
      prefersBefore: ["pricing-toggle", "testimonial-grid"],
      prefersAfter: ["hero-minimal", "hero-centered"]
    }
  }
};

/**
 * Feature Icon List Component Definition
 */
export const featureIconListDefinition: ComponentDefinition = {
  slug: "feature-icon-list",
  name: "Feature Icon List",
  category: "feature",
  description: "Grid of features with icons, scalable from 1-12 items",
  
  schema: generateJSONSchema(FeatureSchemas.featureIconList),
  zodSchema: FeatureSchemas.featureIconList,
  
  aiHints: {
    purpose: "Display multiple features in a clean grid layout",
    whenToUse: [
      "Comprehensive feature listing",
      "Service catalog display",
      "Product capabilities overview",
      "Tool integrations showcase"
    ],
    commonPatterns: [
      "4-6 features in 2 columns",
      "8-12 features in 3-4 columns",
      "Icon + Short Title + Brief Description"
    ],
    industryVariations: {
      saas: {
        headline: "Everything You Need in One Platform",
        features: [
          { icon: "Code", title: "API Access", description: "RESTful API with comprehensive documentation" },
          { icon: "Lock", title: "SSO Support", description: "SAML, OAuth, and Active Directory" },
          { icon: "BarChart", title: "Analytics", description: "Real-time insights and reporting" },
          { icon: "Users", title: "Team Management", description: "Roles, permissions, and collaboration" },
          { icon: "Cloud", title: "Cloud Storage", description: "Unlimited secure cloud storage" },
          { icon: "Zap", title: "Integrations", description: "Connect with 1000+ apps" }
        ]
      }
    }
  },
  
  templates: {
    default: featureIconListContent,
    minimal: {
      features: [
        { title: "Feature 1", description: "Brief description" },
        { title: "Feature 2", description: "Brief description" },
        { title: "Feature 3", description: "Brief description" },
        { title: "Feature 4", description: "Brief description" }
      ]
    }
  },
  
  validation: {
    required: ["features"],
    constraints: [
      {
        prop: "features",
        type: "minLength",
        value: 1,
        message: "At least one feature required"
      },
      {
        prop: "features",
        type: "maxLength",
        value: 12,
        message: "Maximum 12 features for optimal display"
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "pricing-toggle", "cta-single"],
    sequence: {
      prefersBefore: ["pricing-toggle", "testimonial-grid"],
      prefersAfter: ["hero-minimal", "feature-three-cards"]
    }
  }
};

/**
 * Feature Alternating Media Component Definition
 */
export const featureAlternatingMediaDefinition: ComponentDefinition = {
  slug: "feature-alternating-media",
  name: "Feature Alternating Media",
  category: "feature",
  description: "Features with alternating left/right media layout",
  
  schema: generateJSONSchema(FeatureSchemas.featureAlternatingMedia),
  zodSchema: FeatureSchemas.featureAlternatingMedia,
  
  aiHints: {
    purpose: "Deep dive into features with visual support",
    whenToUse: [
      "Detailed feature explanations",
      "Step-by-step process showcase",
      "Product screenshots with context",
      "Before/after comparisons"
    ],
    commonPatterns: [
      "Left image, right content",
      "Alternating layout for visual rhythm",
      "Screenshot + explanation",
      "3-4 major features with visuals"
    ],
    industryVariations: {
      saas: {
        features: [
          {
            title: "Intuitive Dashboard",
            description: "Get insights at a glance with our customizable dashboard",
            image: { src: "/dashboard.png", alt: "Dashboard screenshot" }
          },
          {
            title: "Powerful Automation",
            description: "Set up workflows that save hours of manual work",
            image: { src: "/automation.png", alt: "Automation workflow" }
          },
          {
            title: "Real-time Collaboration",
            description: "Work together seamlessly with your team",
            image: { src: "/collaboration.png", alt: "Team collaboration" }
          }
        ]
      }
    }
  },
  
  templates: {
    default: featureAlternatingMediaContent,
    minimal: {
      features: [
        { title: "Feature 1", description: "Detailed explanation of this feature" },
        { title: "Feature 2", description: "Detailed explanation of this feature" }
      ]
    }
  },
  
  validation: {
    required: ["features"],
    constraints: [
      {
        prop: "features",
        type: "maxLength",
        value: 6,
        message: "Maximum 6 features for optimal page length"
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "testimonial-grid", "cta-single"],
    sequence: {
      prefersBefore: ["testimonial-grid", "pricing-toggle"],
      prefersAfter: ["feature-three-cards", "feature-icon-list"]
    }
  }
};

/**
 * Get all feature definitions
 */
export const featureDefinitions = [
  featureThreeCardsDefinition,
  featureIconListDefinition,
  featureAlternatingMediaDefinition
];

/**
 * Get feature definition by slug
 */
export function getFeatureDefinition(slug: string): ComponentDefinition | undefined {
  return featureDefinitions.find(def => def.slug === slug);
}