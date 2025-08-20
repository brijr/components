import { ComponentDefinition } from "../types";
import { CTASchemas, generateJSONSchema } from "../generator";

/**
 * CTA Single Component Definition
 */
export const ctaSingleDefinition: ComponentDefinition = {
  slug: "cta-single",
  name: "CTA Single",
  category: "cta",
  description: "Simple call-to-action with single button",
  
  schema: generateJSONSchema(CTASchemas.ctaSingle),
  zodSchema: CTASchemas.ctaSingle,
  
  aiHints: {
    purpose: "Final push to convert visitors with clear, focused action",
    whenToUse: [
      "End of landing page before footer",
      "After presenting all value props",
      "Conversion-focused sections",
      "Newsletter signups"
    ],
    commonPatterns: [
      "Question headline + action button",
      "Urgency or scarcity messaging",
      "Value reinforcement",
      "Risk reversal (free trial, money-back)"
    ],
    industryVariations: {
      saas: {
        headline: "Ready to Transform Your Workflow?",
        subheadline: "Join 10,000+ teams already using our platform",
        primaryCTA: { text: "Start Your Free Trial", href: "/signup" }
      },
      ecommerce: {
        headline: "Don't Miss Out on Exclusive Deals",
        subheadline: "Subscribe to get 15% off your first order",
        primaryCTA: { text: "Get My Discount", href: "/subscribe" }
      },
      agency: {
        headline: "Let's Build Something Amazing Together",
        subheadline: "Schedule a free consultation to discuss your project",
        primaryCTA: { text: "Book Your Call", href: "/schedule" }
      }
    },
    toneVariations: {
      professional: {
        headline: "Ready to Get Started?",
        subheadline: "Take the next step toward your goals"
      },
      casual: {
        headline: "What Are You Waiting For?",
        subheadline: "Seriously, it's free to try"
      },
      urgent: {
        headline: "Limited Time Offer Ending Soon",
        subheadline: "Act now before prices increase"
      }
    }
  },
  
  templates: {
    default: {
      headline: "Ready to Get Started?",
      subheadline: "Join thousands of satisfied customers",
      primaryCTA: { text: "Start Now", href: "/signup" }
    },
    minimal: {
      headline: "Start Your Journey",
      primaryCTA: { text: "Get Started", href: "/start" }
    }
  },
  
  validation: {
    required: ["headline", "primaryCTA"],
    constraints: [
      {
        prop: "headline",
        type: "maxLength",
        value: 100,
        message: "CTA headline should be concise and impactful"
      }
    ]
  },
  
  composition: {
    compatible: ["pricing-toggle", "testimonial-grid", "feature-three-cards"],
    sequence: {
      prefersBefore: ["footer-minimal", "footer-with-cta"],
      prefersAfter: ["pricing-toggle", "testimonial-grid", "feature-alternating-media"]
    },
    contentFlow: {
      sharesPropsWith: ["hero-minimal"],
      inheritsPropsFrom: ["pricing-toggle"]
    }
  }
};

/**
 * CTA Dual Component Definition
 */
export const ctaDualDefinition: ComponentDefinition = {
  slug: "cta-dual",
  name: "CTA Dual",
  category: "cta",
  description: "Call-to-action with primary and secondary buttons",
  
  schema: generateJSONSchema(CTASchemas.ctaDual),
  zodSchema: CTASchemas.ctaDual,
  
  aiHints: {
    purpose: "Offer two clear paths for different user intents",
    whenToUse: [
      "When users need options (buy vs try)",
      "Different user segments",
      "Primary action with alternative",
      "Commitment levels (high vs low)"
    ],
    commonPatterns: [
      "Start Free vs Contact Sales",
      "Sign Up vs Learn More",
      "Buy Now vs View Demo",
      "Individual vs Team options"
    ],
    industryVariations: {
      saas: {
        headline: "Choose Your Path to Success",
        subheadline: "Start free or talk to our team",
        primaryCTA: { text: "Start Free Trial", href: "/trial" },
        secondaryCTA: { text: "Schedule Demo", href: "/demo" }
      },
      ecommerce: {
        headline: "Ready to Shop?",
        subheadline: "Browse our collection or get personalized recommendations",
        primaryCTA: { text: "Shop Now", href: "/shop" },
        secondaryCTA: { text: "Take Style Quiz", href: "/quiz" }
      },
      education: {
        headline: "Start Learning Today",
        subheadline: "Choose self-paced or instructor-led",
        primaryCTA: { text: "Enroll Now", href: "/enroll" },
        secondaryCTA: { text: "Download Syllabus", href: "/syllabus" }
      }
    },
    toneVariations: {
      professional: {
        primaryCTA: { text: "Get Started", href: "/start" },
        secondaryCTA: { text: "Learn More", href: "/info" }
      },
      casual: {
        primaryCTA: { text: "Jump In", href: "/start" },
        secondaryCTA: { text: "Tell Me More", href: "/info" }
      }
    }
  },
  
  templates: {
    default: {
      headline: "Two Ways to Get Started",
      subheadline: "Choose the option that works best for you",
      primaryCTA: { text: "Primary Action", href: "/primary" },
      secondaryCTA: { text: "Secondary Action", href: "/secondary" }
    }
  },
  
  validation: {
    required: ["headline", "primaryCTA", "secondaryCTA"],
    conditional: [
      {
        if: { prop: "secondaryCTA", condition: "exists" },
        then: {
          required: ["primaryCTA"],
          constraints: [
            {
              prop: "primaryCTA.text",
              type: "custom",
              value: "different-from-secondary",
              message: "Primary and secondary CTAs should have different text"
            }
          ]
        }
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "pricing-toggle", "testimonial-grid"],
    sequence: {
      prefersBefore: ["footer-minimal"],
      prefersAfter: ["pricing-toggle", "feature-alternating-media"]
    }
  }
};

/**
 * Get all CTA definitions
 */
export const ctaDefinitions = [
  ctaSingleDefinition,
  ctaDualDefinition
];

/**
 * Get CTA definition by slug
 */
export function getCTADefinition(slug: string): ComponentDefinition | undefined {
  return ctaDefinitions.find(def => def.slug === slug);
}