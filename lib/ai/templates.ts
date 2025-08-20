/**
 * Component templates for AI understanding
 * These templates help AI generate appropriate props for each component type
 */

export interface ComponentTemplate {
  slug: string;
  name: string;
  description: string;
  propStructure: Record<string, PropDefinition>;
  examples: TemplateExample[];
  guidelines: string[];
  commonPatterns: string[];
}

export interface PropDefinition {
  type: "string" | "number" | "boolean" | "object" | "array";
  required: boolean;
  description: string;
  examples?: any[];
  subProps?: Record<string, PropDefinition>;
}

export interface TemplateExample {
  industry: string;
  tone: string;
  props: Record<string, any>;
}

// Hero Component Templates
export const heroTemplates: ComponentTemplate[] = [
  {
    slug: "hero-minimal",
    name: "Hero Minimal",
    description: "Simple centered hero with headline and CTAs",
    propStructure: {
      headline: {
        type: "string",
        required: true,
        description: "Main headline text",
        examples: ["Build Better Products", "Launch Your SaaS Today"]
      },
      subheadline: {
        type: "string",
        required: false,
        description: "Supporting text under headline",
        examples: ["The modern way to ship software", "Start your free trial today"]
      },
      primaryCTA: {
        type: "object",
        required: false,
        description: "Primary call-to-action button",
        subProps: {
          text: { type: "string", required: true, description: "Button text" },
          href: { type: "string", required: true, description: "Button link" }
        }
      },
      secondaryCTA: {
        type: "object",
        required: false,
        description: "Secondary call-to-action button",
        subProps: {
          text: { type: "string", required: true, description: "Button text" },
          href: { type: "string", required: true, description: "Button link" }
        }
      }
    },
    examples: [
      {
        industry: "SaaS",
        tone: "professional",
        props: {
          headline: "Accelerate Your Development Workflow",
          subheadline: "Ship features faster with our AI-powered development platform",
          primaryCTA: { text: "Start Free Trial", href: "/signup" },
          secondaryCTA: { text: "Watch Demo", href: "/demo" }
        }
      },
      {
        industry: "E-commerce",
        tone: "casual",
        props: {
          headline: "Shop Smarter, Not Harder",
          subheadline: "Discover amazing deals on everything you love",
          primaryCTA: { text: "Shop Now", href: "/products" },
          secondaryCTA: { text: "Learn More", href: "/about" }
        }
      }
    ],
    guidelines: [
      "Keep headlines concise and impactful (5-8 words)",
      "Subheadlines should expand on the value proposition",
      "Primary CTA should be action-oriented",
      "Secondary CTA can be informational"
    ],
    commonPatterns: [
      "Problem → Solution format",
      "Benefit-focused messaging",
      "Clear value proposition",
      "Urgency or exclusivity"
    ]
  },
  {
    slug: "hero-with-image",
    name: "Hero with Image",
    description: "Split hero with text on left and image on right",
    propStructure: {
      headline: {
        type: "string",
        required: true,
        description: "Main headline text"
      },
      subheadline: {
        type: "string",
        required: false,
        description: "Supporting text"
      },
      primaryCTA: {
        type: "object",
        required: false,
        description: "Primary button",
        subProps: {
          text: { type: "string", required: true, description: "Button text" },
          href: { type: "string", required: true, description: "Button link" }
        }
      },
      secondaryCTA: {
        type: "object",
        required: false,
        description: "Secondary button",
        subProps: {
          text: { type: "string", required: true, description: "Button text" },
          href: { type: "string", required: true, description: "Button link" }
        }
      },
      image: {
        type: "object",
        required: true,
        description: "Hero image",
        subProps: {
          src: { type: "string", required: true, description: "Image source" },
          alt: { type: "string", required: true, description: "Alt text" }
        }
      }
    },
    examples: [],
    guidelines: [
      "Image should complement the message",
      "Use high-quality product screenshots or illustrations",
      "Maintain visual balance between text and image"
    ],
    commonPatterns: []
  }
];

// Feature Component Templates
export const featureTemplates: ComponentTemplate[] = [
  {
    slug: "feature-three-cards",
    name: "Feature Three Cards",
    description: "Grid of three feature cards",
    propStructure: {
      headline: {
        type: "string",
        required: true,
        description: "Section headline"
      },
      subheadline: {
        type: "string",
        required: false,
        description: "Section description"
      },
      features: {
        type: "array",
        required: true,
        description: "Array of feature objects",
        subProps: {
          title: { type: "string", required: true, description: "Feature title" },
          description: { type: "string", required: true, description: "Feature description" },
          icon: { type: "string", required: false, description: "Icon name" }
        }
      }
    },
    examples: [
      {
        industry: "SaaS",
        tone: "professional",
        props: {
          headline: "Powerful Features for Modern Teams",
          subheadline: "Everything you need to collaborate effectively",
          features: [
            {
              title: "Real-time Collaboration",
              description: "Work together seamlessly with live updates and instant sync",
              icon: "Users"
            },
            {
              title: "Advanced Analytics",
              description: "Track performance with detailed insights and custom reports",
              icon: "ChartBar"
            },
            {
              title: "Enterprise Security",
              description: "Bank-level encryption and compliance certifications",
              icon: "Shield"
            }
          ]
        }
      }
    ],
    guidelines: [
      "Keep feature titles short and descriptive",
      "Focus on benefits in descriptions",
      "Use consistent tone across all features",
      "3-6 features work best for this layout"
    ],
    commonPatterns: [
      "Problem-solving features",
      "Competitive advantages",
      "User benefits focus",
      "Technical capabilities"
    ]
  }
];

// Pricing Component Templates
export const pricingTemplates: ComponentTemplate[] = [
  {
    slug: "pricing-toggle",
    name: "Pricing Toggle",
    description: "Pricing with monthly/yearly toggle",
    propStructure: {
      headline: {
        type: "string",
        required: true,
        description: "Section headline"
      },
      subheadline: {
        type: "string",
        required: false,
        description: "Section description"
      },
      plans: {
        type: "array",
        required: true,
        description: "Array of pricing plans",
        subProps: {
          name: { type: "string", required: true, description: "Plan name" },
          monthlyPrice: { type: "number", required: true, description: "Monthly price" },
          yearlyPrice: { type: "number", required: true, description: "Yearly price" },
          description: { type: "string", required: true, description: "Plan description" },
          features: { type: "array", required: true, description: "List of features" },
          cta: { type: "object", required: true, description: "CTA button" },
          highlighted: { type: "boolean", required: false, description: "Highlight this plan" }
        }
      }
    },
    examples: [],
    guidelines: [
      "Highlight the most popular plan",
      "Show savings for annual billing",
      "List 5-8 key features per plan",
      "Use clear differentiation between plans"
    ],
    commonPatterns: []
  }
];

// CTA Component Templates
export const ctaTemplates: ComponentTemplate[] = [
  {
    slug: "cta-single",
    name: "CTA Single",
    description: "Simple centered call-to-action",
    propStructure: {
      headline: {
        type: "string",
        required: true,
        description: "CTA headline"
      },
      subheadline: {
        type: "string",
        required: false,
        description: "Supporting text"
      },
      primaryCTA: {
        type: "object",
        required: true,
        description: "Primary action button",
        subProps: {
          text: { type: "string", required: true, description: "Button text" },
          href: { type: "string", required: true, description: "Button link" }
        }
      }
    },
    examples: [],
    guidelines: [
      "Create urgency or exclusivity",
      "Keep message focused and clear",
      "Use action-oriented button text"
    ],
    commonPatterns: []
  }
];

// Get template by slug
export function getComponentTemplate(slug: string): ComponentTemplate | undefined {
  const allTemplates = [
    ...heroTemplates,
    ...featureTemplates,
    ...pricingTemplates,
    ...ctaTemplates
  ];
  
  return allTemplates.find(t => t.slug === slug);
}

// Get all templates for a component type
export function getTemplatesByType(type: string): ComponentTemplate[] {
  switch (type) {
    case "hero":
      return heroTemplates;
    case "feature":
      return featureTemplates;
    case "pricing":
      return pricingTemplates;
    case "cta":
      return ctaTemplates;
    default:
      return [];
  }
}

// Generate example props based on template
export function generateExampleProps(
  template: ComponentTemplate,
  options?: {
    industry?: string;
    tone?: string;
  }
): Record<string, any> {
  // Try to find a matching example
  if (options?.industry || options?.tone) {
    const example = template.examples.find(e => 
      (!options.industry || e.industry === options.industry) &&
      (!options.tone || e.tone === options.tone)
    );
    
    if (example) {
      return example.props;
    }
  }
  
  // Return first example or generate default
  if (template.examples.length > 0) {
    return template.examples[0].props;
  }
  
  // Generate default props based on structure
  const props: Record<string, any> = {};
  
  for (const [key, def] of Object.entries(template.propStructure)) {
    if (def.required) {
      switch (def.type) {
        case "string":
          props[key] = def.examples?.[0] || `Default ${key}`;
          break;
        case "number":
          props[key] = 0;
          break;
        case "boolean":
          props[key] = false;
          break;
        case "object":
          if (def.subProps) {
            props[key] = {};
            for (const [subKey, subDef] of Object.entries(def.subProps)) {
              if (subDef.required) {
                props[key][subKey] = subDef.examples?.[0] || `Default ${subKey}`;
              }
            }
          }
          break;
        case "array":
          props[key] = [];
          break;
      }
    }
  }
  
  return props;
}