import { ComponentDefinition } from "../types";
import { PricingSchemas, generateJSONSchema } from "../generator";

/**
 * Pricing Toggle Component Definition
 */
export const pricingToggleDefinition: ComponentDefinition = {
  slug: "pricing-toggle",
  name: "Pricing Toggle",
  category: "pricing",
  description: "Pricing plans with monthly/yearly toggle",
  
  schema: generateJSONSchema(PricingSchemas.pricingToggle),
  zodSchema: PricingSchemas.pricingToggle,
  
  aiHints: {
    purpose: "Display pricing options with billing period toggle for maximum conversion",
    whenToUse: [
      "Main pricing section of landing page",
      "SaaS subscription models",
      "When offering monthly/yearly discounts",
      "Comparison of multiple tiers"
    ],
    commonPatterns: [
      "3 tiers (Starter, Pro, Enterprise)",
      "Monthly/Yearly toggle with discount",
      "Highlighted recommended plan",
      "Feature comparison lists",
      "CTA per plan"
    ],
    industryVariations: {
      saas: {
        headline: "Simple, Transparent Pricing",
        subheadline: "Choose the plan that fits your needs",
        plans: [
          {
            name: "Starter",
            description: "Perfect for individuals",
            monthlyPrice: 29,
            yearlyPrice: 290,
            currency: "USD",
            features: [
              "Up to 5 users",
              "10GB storage",
              "Basic support",
              "Core features"
            ],
            cta: { text: "Start Free Trial", href: "/signup?plan=starter" }
          },
          {
            name: "Professional",
            description: "For growing teams",
            monthlyPrice: 99,
            yearlyPrice: 990,
            currency: "USD",
            features: [
              "Up to 50 users",
              "100GB storage",
              "Priority support",
              "Advanced features",
              "API access",
              "Custom integrations"
            ],
            cta: { text: "Start Free Trial", href: "/signup?plan=pro" },
            highlighted: true,
            badge: "Most Popular"
          },
          {
            name: "Enterprise",
            description: "For large organizations",
            monthlyPrice: 299,
            yearlyPrice: 2990,
            currency: "USD",
            features: [
              "Unlimited users",
              "Unlimited storage",
              "24/7 phone support",
              "All features",
              "Custom contracts",
              "Dedicated account manager"
            ],
            cta: { text: "Contact Sales", href: "/contact" }
          }
        ],
        discount: {
          yearly: 20,
          text: "Save 20% with annual billing"
        }
      },
      ecommerce: {
        headline: "Membership Plans",
        plans: [
          {
            name: "Basic",
            monthlyPrice: 9.99,
            features: ["Free shipping on orders over $50", "Member prices"],
            cta: { text: "Join Now", href: "/membership/basic" }
          },
          {
            name: "Premium",
            monthlyPrice: 19.99,
            features: ["Free shipping on all orders", "Exclusive deals", "Early access"],
            cta: { text: "Join Premium", href: "/membership/premium" },
            highlighted: true
          }
        ]
      }
    },
    toneVariations: {
      professional: {
        headline: "Transparent Enterprise Pricing",
        subheadline: "Scale with confidence"
      },
      casual: {
        headline: "Pick Your Plan",
        subheadline: "No hidden fees, cancel anytime"
      },
      playful: {
        headline: "Choose Your Superpower",
        subheadline: "Every plan comes with awesome"
      }
    }
  },
  
  templates: {
    default: {
      headline: "Choose Your Plan",
      plans: [
        {
          name: "Basic",
          monthlyPrice: 10,
          features: ["Feature 1", "Feature 2"],
          cta: { text: "Get Started", href: "/signup" }
        }
      ]
    }
  },
  
  validation: {
    required: ["plans"],
    constraints: [
      {
        prop: "plans",
        type: "minLength",
        value: 1,
        message: "At least one pricing plan required"
      },
      {
        prop: "plans",
        type: "maxLength",
        value: 5,
        message: "Maximum 5 plans for clarity"
      }
    ]
  },
  
  composition: {
    compatible: ["feature-three-cards", "testimonial-grid", "cta-single"],
    sequence: {
      prefersBefore: ["cta-single", "footer-minimal"],
      prefersAfter: ["feature-three-cards", "testimonial-grid"]
    }
  }
};

/**
 * Pricing Highlight Component Definition
 */
export const pricingHighlightDefinition: ComponentDefinition = {
  slug: "pricing-highlight",
  name: "Pricing Highlight",
  category: "pricing",
  description: "Pricing with one prominently highlighted plan",
  
  schema: generateJSONSchema(PricingSchemas.pricingHighlight),
  zodSchema: PricingSchemas.pricingHighlight,
  
  aiHints: {
    purpose: "Guide users to a specific recommended plan",
    whenToUse: [
      "When you have a clear best-value option",
      "Simpler pricing presentation",
      "Mobile-optimized pricing",
      "Focus on conversion to specific tier"
    ],
    commonPatterns: [
      "2-3 plans with one highlighted",
      "Visual emphasis on recommended",
      "Simplified feature lists",
      "Strong CTA on highlighted plan"
    ],
    industryVariations: {
      saas: {
        plans: [
          {
            name: "Free",
            monthlyPrice: 0,
            features: ["1 user", "Basic features"],
            cta: { text: "Start Free", href: "/signup?plan=free" }
          },
          {
            name: "Pro",
            monthlyPrice: 49,
            features: ["Unlimited users", "All features", "Priority support"],
            cta: { text: "Go Pro", href: "/signup?plan=pro" },
            highlighted: true,
            badge: "Best Value"
          },
          {
            name: "Enterprise",
            monthlyPrice: 199,
            features: ["Everything in Pro", "Custom contracts", "Dedicated support"],
            cta: { text: "Contact Us", href: "/contact" }
          }
        ]
      }
    }
  },
  
  templates: {
    default: {
      plans: [
        {
          name: "Standard",
          monthlyPrice: 29,
          features: ["All features"],
          cta: { text: "Get Started", href: "/signup" },
          highlighted: true
        }
      ]
    }
  },
  
  validation: {
    required: ["plans"],
    conditional: [
      {
        if: { prop: "plans", condition: "exists" },
        then: {
          constraints: [
            {
              prop: "plans",
              type: "custom",
              value: "one-highlighted",
              message: "Exactly one plan should be highlighted"
            }
          ]
        }
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "feature-three-cards", "testimonial-grid"],
    sequence: {
      prefersBefore: ["cta-single", "footer-minimal"],
      prefersAfter: ["testimonial-grid"]
    }
  }
};

/**
 * Get all pricing definitions
 */
export const pricingDefinitions = [
  pricingToggleDefinition,
  pricingHighlightDefinition
];

/**
 * Get pricing definition by slug
 */
export function getPricingDefinition(slug: string): ComponentDefinition | undefined {
  return pricingDefinitions.find(def => def.slug === slug);
}