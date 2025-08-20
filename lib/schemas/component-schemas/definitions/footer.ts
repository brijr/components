import { ComponentDefinition } from "../types";
import { FooterSchemas, generateJSONSchema } from "../generator";

/**
 * Footer Minimal Component Definition
 */
export const footerMinimalDefinition: ComponentDefinition = {
  slug: "footer-minimal",
  name: "Footer Minimal",
  category: "footer",
  description: "Simple footer with essential links and copyright",
  
  schema: generateJSONSchema(FooterSchemas.footerMinimal),
  zodSchema: FooterSchemas.footerMinimal,
  
  aiHints: {
    purpose: "Provide essential navigation and legal links at page bottom",
    whenToUse: [
      "End of every landing page",
      "Minimalist design approach",
      "Single-page websites",
      "When space is limited"
    ],
    commonPatterns: [
      "Logo + Copyright + Legal links",
      "Centered or left-aligned layout",
      "Copyright year + company name",
      "Privacy, Terms, Contact links"
    ],
    industryVariations: {
      saas: {
        companyName: "TechCorp",
        tagline: "Building the future of work",
        links: [
          { text: "Privacy Policy", href: "/privacy" },
          { text: "Terms of Service", href: "/terms" },
          { text: "Contact", href: "/contact" },
          { text: "Status", href: "/status" }
        ],
        copyright: "© 2024 TechCorp. All rights reserved."
      },
      ecommerce: {
        companyName: "ShopBrand",
        links: [
          { text: "Returns", href: "/returns" },
          { text: "Shipping", href: "/shipping" },
          { text: "FAQ", href: "/faq" },
          { text: "Contact", href: "/contact" }
        ],
        copyright: "© 2024 ShopBrand"
      }
    },
    toneVariations: {
      professional: {
        copyright: "© 2024 Company Name. All rights reserved."
      },
      casual: {
        copyright: "© 2024 Company • Made with ❤️"
      }
    }
  },
  
  templates: {
    default: {
      companyName: "Your Company",
      tagline: "Your tagline here",
      links: [
        { text: "Privacy", href: "/privacy" },
        { text: "Terms", href: "/terms" }
      ],
      copyright: "© 2024 Your Company"
    },
    minimal: {
      companyName: "Company",
      copyright: "© 2024"
    }
  },
  
  validation: {
    required: ["companyName"],
    constraints: [
      {
        prop: "companyName",
        type: "maxLength",
        value: 100,
        message: "Company name should be concise"
      }
    ]
  },
  
  composition: {
    compatible: ["cta-single", "cta-dual"],
    sequence: {
      prefersBefore: [], // Footer is always last
      prefersAfter: ["cta-single", "pricing-toggle", "hero-minimal"],
      neverBefore: ["hero-minimal", "feature-three-cards", "testimonial-grid"]
    }
  }
};

/**
 * Footer With CTA Component Definition
 */
export const footerWithCTADefinition: ComponentDefinition = {
  slug: "footer-with-cta",
  name: "Footer With CTA",
  category: "footer",
  description: "Footer with newsletter signup or final CTA",
  
  schema: generateJSONSchema(FooterSchemas.footerWithCTA),
  zodSchema: FooterSchemas.footerWithCTA,
  
  aiHints: {
    purpose: "Capture leads and provide comprehensive navigation at page end",
    whenToUse: [
      "Marketing-focused landing pages",
      "When building email list",
      "Multi-section footers",
      "Corporate websites"
    ],
    commonPatterns: [
      "Newsletter signup + link columns",
      "CTA section + navigation",
      "Social media links",
      "4-column layout (Product, Company, Support, Legal)"
    ],
    industryVariations: {
      saas: {
        companyName: "CloudPlatform",
        tagline: "Enterprise cloud solutions",
        cta: {
          headline: "Start your free trial today",
          primaryCTA: { text: "Get Started Free", href: "/signup" }
        },
        links: {
          product: [
            { text: "Features", href: "/features" },
            { text: "Pricing", href: "/pricing" },
            { text: "Integrations", href: "/integrations" }
          ],
          company: [
            { text: "About", href: "/about" },
            { text: "Blog", href: "/blog" },
            { text: "Careers", href: "/careers" }
          ],
          support: [
            { text: "Documentation", href: "/docs" },
            { text: "Help Center", href: "/help" },
            { text: "API Reference", href: "/api" }
          ],
          legal: [
            { text: "Privacy", href: "/privacy" },
            { text: "Terms", href: "/terms" },
            { text: "Security", href: "/security" }
          ]
        },
        social: [
          { platform: "Twitter", href: "https://twitter.com/company" },
          { platform: "LinkedIn", href: "https://linkedin.com/company" },
          { platform: "GitHub", href: "https://github.com/company" }
        ]
      },
      ecommerce: {
        companyName: "Fashion Store",
        cta: {
          headline: "Get 10% off your first order",
          primaryCTA: { text: "Subscribe", href: "/newsletter" }
        },
        links: {
          product: [
            { text: "New Arrivals", href: "/new" },
            { text: "Sale", href: "/sale" },
            { text: "Gift Cards", href: "/gift-cards" }
          ],
          company: [
            { text: "Our Story", href: "/story" },
            { text: "Sustainability", href: "/sustainability" },
            { text: "Press", href: "/press" }
          ]
        }
      }
    },
    toneVariations: {
      professional: {
        cta: {
          headline: "Ready to transform your business?",
          primaryCTA: { text: "Contact Sales", href: "/contact" }
        }
      },
      casual: {
        cta: {
          headline: "Don't be a stranger!",
          primaryCTA: { text: "Say Hello", href: "/contact" }
        }
      }
    }
  },
  
  templates: {
    default: {
      companyName: "Your Company",
      tagline: "Your tagline",
      cta: {
        headline: "Stay updated",
        primaryCTA: { text: "Subscribe", href: "/subscribe" }
      },
      links: {
        product: [{ text: "Features", href: "/features" }],
        company: [{ text: "About", href: "/about" }]
      }
    }
  },
  
  validation: {
    required: ["companyName"],
    conditional: [
      {
        if: { prop: "cta", condition: "exists" },
        then: {
          required: ["cta.headline", "cta.primaryCTA"]
        }
      }
    ]
  },
  
  composition: {
    compatible: ["cta-single", "pricing-toggle"],
    sequence: {
      prefersBefore: [], // Footer is always last
      prefersAfter: ["cta-single", "pricing-toggle"],
      neverBefore: ["hero-minimal", "feature-three-cards"]
    }
  }
};

/**
 * Get all footer definitions
 */
export const footerDefinitions = [
  footerMinimalDefinition,
  footerWithCTADefinition
];

/**
 * Get footer definition by slug
 */
export function getFooterDefinition(slug: string): ComponentDefinition | undefined {
  return footerDefinitions.find(def => def.slug === slug);
}