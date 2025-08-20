/**
 * Complete Page Templates
 * Each template defines a full landing page structure with 5-8 sections
 */

import { PageTemplate } from "./types";

export const saasLandingTemplate: PageTemplate = {
  id: "saas-landing",
  name: "SaaS Product Landing",
  description: "Complete landing page for software products with hero, features, testimonials, pricing, and CTAs",
  sections: [
    {
      componentSlug: "hero-centered",
      order: 0,
      contentGuidance: "Main value proposition with product name, key benefit, and primary CTA",
      requiredProps: ["headline", "subheadline", "primaryCTA"],
      variations: ["hero-minimal", "hero-with-image", "hero-split"]
    },
    {
      componentSlug: "feature-three-cards",
      order: 1,
      contentGuidance: "Three core features or benefits with icons and descriptions",
      requiredProps: ["headline", "features"],
      variations: ["feature-icon-list"]
    },
    {
      componentSlug: "feature-alternating-media",
      order: 2,
      contentGuidance: "Detailed feature explanations with alternating layout",
      requiredProps: ["features"],
      variations: ["feature-tabbed"]
    },
    {
      componentSlug: "testimonial-grid",
      order: 3,
      contentGuidance: "Customer testimonials showing social proof",
      requiredProps: ["headline", "testimonials"],
      variations: ["testimonial-carousel", "testimonial-star-rating"]
    },
    {
      componentSlug: "pricing-toggle",
      order: 4,
      contentGuidance: "Pricing plans with monthly/yearly toggle, typically 3 tiers",
      requiredProps: ["headline", "plans"],
      variations: ["pricing-highlight", "pricing-calculator"]
    },
    {
      componentSlug: "cta-single",
      order: 5,
      contentGuidance: "Final call-to-action to convert visitors",
      requiredProps: ["headline", "primaryCTA"],
      variations: ["cta-dual"]
    },
    {
      componentSlug: "footer-with-cta",
      order: 6,
      contentGuidance: "Footer with links, social media, and newsletter signup",
      requiredProps: ["companyName", "links"],
      variations: ["footer-minimal", "footer-with-newsletter"]
    }
  ],
  industries: ["technology", "software", "startup"],
  recommendedTone: "professional",
  keywords: ["software", "app", "platform", "tool", "solution", "saas", "product"],
  minSections: 6,
  maxSections: 8
};

export const ecommerceLandingTemplate: PageTemplate = {
  id: "ecommerce-landing",
  name: "E-commerce Product Page",
  description: "Product showcase page with hero, categories, products, reviews, and offers",
  sections: [
    {
      componentSlug: "hero-with-image",
      order: 0,
      contentGuidance: "Featured product or promotion with strong visual",
      requiredProps: ["headline", "subheadline", "primaryCTA", "image"],
      variations: ["hero-split", "hero-background-image"]
    },
    {
      componentSlug: "feature-three-cards",
      order: 1,
      contentGuidance: "Product categories or key shopping benefits (free shipping, returns, etc)",
      requiredProps: ["features"],
      variations: ["feature-icon-list"]
    },
    {
      componentSlug: "testimonial-star-rating",
      order: 2,
      contentGuidance: "Customer reviews with ratings",
      requiredProps: ["testimonials"],
      variations: ["testimonial-grid"]
    },
    {
      componentSlug: "feature-alternating-media",
      order: 3,
      contentGuidance: "Featured products with images and descriptions",
      requiredProps: ["features"],
      variations: []
    },
    {
      componentSlug: "cta-dual",
      order: 4,
      contentGuidance: "Special offers or promotional CTAs",
      requiredProps: ["headline", "primaryCTA"],
      variations: ["cta-sticky"]
    },
    {
      componentSlug: "footer-with-newsletter",
      order: 5,
      contentGuidance: "Footer with newsletter signup for deals",
      requiredProps: ["companyName"],
      variations: ["footer-with-social"]
    }
  ],
  industries: ["ecommerce", "retail", "fashion", "marketplace"],
  recommendedTone: "casual",
  keywords: ["shop", "buy", "product", "store", "deals", "sale"],
  minSections: 5,
  maxSections: 7
};

export const agencyLandingTemplate: PageTemplate = {
  id: "agency-landing",
  name: "Agency/Consultancy",
  description: "Professional services page with expertise showcase and case studies",
  sections: [
    {
      componentSlug: "hero-split",
      order: 0,
      contentGuidance: "Professional introduction with services overview",
      requiredProps: ["headline", "subheadline", "primaryCTA"],
      variations: ["hero-minimal", "hero-centered"]
    },
    {
      componentSlug: "feature-icon-list",
      order: 1,
      contentGuidance: "Services offered with clear descriptions",
      requiredProps: ["headline", "features"],
      variations: ["feature-three-cards"]
    },
    {
      componentSlug: "testimonial-case-study",
      order: 2,
      contentGuidance: "Detailed case study with results and metrics",
      requiredProps: ["caseStudy"],
      variations: []
    },
    {
      componentSlug: "testimonial-grid",
      order: 3,
      contentGuidance: "Client testimonials and logos",
      requiredProps: ["testimonials"],
      variations: ["testimonial-carousel"]
    },
    {
      componentSlug: "pricing-highlight",
      order: 4,
      contentGuidance: "Service packages or engagement models",
      requiredProps: ["plans"],
      variations: ["pricing-toggle"]
    },
    {
      componentSlug: "cta-single",
      order: 5,
      contentGuidance: "Contact or consultation CTA",
      requiredProps: ["headline", "primaryCTA"],
      variations: []
    },
    {
      componentSlug: "footer-minimal",
      order: 6,
      contentGuidance: "Professional footer with contact info",
      requiredProps: ["companyName"],
      variations: ["footer-with-cta"]
    }
  ],
  industries: ["agency", "consulting", "professional-services"],
  recommendedTone: "professional",
  keywords: ["agency", "consulting", "services", "expertise", "team"],
  minSections: 6,
  maxSections: 7
};

export const startupLandingTemplate: PageTemplate = {
  id: "startup-landing",
  name: "Startup Launch",
  description: "High-energy launch page for new startups and products",
  sections: [
    {
      componentSlug: "hero-video-first",
      order: 0,
      contentGuidance: "Bold announcement with video or strong visual",
      requiredProps: ["headline", "subheadline", "primaryCTA"],
      variations: ["hero-with-video", "hero-background-image"]
    },
    {
      componentSlug: "feature-three-cards",
      order: 1,
      contentGuidance: "Three key innovations or differentiators",
      requiredProps: ["features"],
      variations: []
    },
    {
      componentSlug: "feature-tabbed",
      order: 2,
      contentGuidance: "Detailed product features in tabs",
      requiredProps: ["features"],
      variations: ["feature-alternating-media"]
    },
    {
      componentSlug: "testimonial-carousel",
      order: 3,
      contentGuidance: "Early adopter testimonials or endorsements",
      requiredProps: ["testimonials"],
      variations: ["testimonial-grid"]
    },
    {
      componentSlug: "cta-dual",
      order: 4,
      contentGuidance: "Beta signup or early access CTA",
      requiredProps: ["headline", "primaryCTA", "secondaryCTA"],
      variations: []
    },
    {
      componentSlug: "footer-with-social",
      order: 5,
      contentGuidance: "Footer with social media links",
      requiredProps: ["companyName"],
      variations: []
    }
  ],
  industries: ["startup", "technology", "innovation"],
  recommendedTone: "bold",
  keywords: ["launch", "new", "innovative", "disrupt", "beta", "early access"],
  minSections: 5,
  maxSections: 6
};

export const courseLandingTemplate: PageTemplate = {
  id: "course-landing",
  name: "Online Course",
  description: "Educational course or program landing page",
  sections: [
    {
      componentSlug: "hero-with-form",
      order: 0,
      contentGuidance: "Course title with enrollment form",
      requiredProps: ["headline", "subheadline", "form"],
      variations: ["hero-centered", "hero-split"]
    },
    {
      componentSlug: "feature-icon-list",
      order: 1,
      contentGuidance: "Course curriculum or learning outcomes",
      requiredProps: ["headline", "features"],
      variations: ["feature-three-cards"]
    },
    {
      componentSlug: "testimonial-star-rating",
      order: 2,
      contentGuidance: "Student testimonials with ratings",
      requiredProps: ["testimonials"],
      variations: ["testimonial-grid"]
    },
    {
      componentSlug: "feature-alternating-media",
      order: 3,
      contentGuidance: "Instructor bio and credentials",
      requiredProps: ["features"],
      variations: []
    },
    {
      componentSlug: "pricing-highlight",
      order: 4,
      contentGuidance: "Course pricing with payment options",
      requiredProps: ["plans"],
      variations: ["pricing-toggle"]
    },
    {
      componentSlug: "cta-single",
      order: 5,
      contentGuidance: "Enrollment CTA with urgency",
      requiredProps: ["headline", "primaryCTA"],
      variations: []
    },
    {
      componentSlug: "footer-minimal",
      order: 6,
      contentGuidance: "Footer with course policies",
      requiredProps: ["companyName"],
      variations: []
    }
  ],
  industries: ["education", "training", "coaching"],
  recommendedTone: "professional",
  keywords: ["course", "learn", "training", "education", "instructor", "curriculum"],
  minSections: 6,
  maxSections: 7
};

// Template registry
export const pageTemplates: PageTemplate[] = [
  saasLandingTemplate,
  ecommerceLandingTemplate,
  agencyLandingTemplate,
  startupLandingTemplate,
  courseLandingTemplate
];

// Helper function to get template by ID
export function getPageTemplate(id: string): PageTemplate | undefined {
  return pageTemplates.find(template => template.id === id);
}

// Helper function to find best matching template based on keywords
export function findBestTemplate(prompt: string): PageTemplate {
  const lowerPrompt = prompt.toLowerCase();
  
  // Score each template based on keyword matches
  const scores = pageTemplates.map(template => {
    let score = 0;
    
    // Check keywords
    template.keywords.forEach(keyword => {
      if (lowerPrompt.includes(keyword)) {
        score += 2;
      }
    });
    
    // Check industries
    template.industries.forEach(industry => {
      if (lowerPrompt.includes(industry)) {
        score += 3;
      }
    });
    
    // Check template name
    if (lowerPrompt.includes(template.id.replace("-", " "))) {
      score += 5;
    }
    
    return { template, score };
  });
  
  // Sort by score and return the best match
  scores.sort((a, b) => b.score - a.score);
  
  // Default to SaaS template if no good match
  return scores[0]?.score > 0 ? scores[0].template : saasLandingTemplate;
}