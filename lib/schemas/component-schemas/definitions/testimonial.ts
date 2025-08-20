import { ComponentDefinition } from "../types";
import { TestimonialSchemas, generateJSONSchema } from "../generator";

/**
 * Testimonial Grid Component Definition
 */
export const testimonialGridDefinition: ComponentDefinition = {
  slug: "testimonial-grid",
  name: "Testimonial Grid",
  category: "testimonial",
  description: "Grid layout of customer testimonials",
  
  schema: generateJSONSchema(TestimonialSchemas.testimonialGrid),
  zodSchema: TestimonialSchemas.testimonialGrid,
  
  aiHints: {
    purpose: "Build trust and social proof through customer testimonials",
    whenToUse: [
      "Middle of landing page for social proof",
      "After feature sections to validate claims",
      "Before pricing to reduce objections",
      "Customer success stories"
    ],
    commonPatterns: [
      "3-6 testimonials in grid",
      "Quote + Author + Role + Company",
      "Star ratings optional",
      "Mix of industries/roles for diversity"
    ],
    industryVariations: {
      saas: {
        headline: "Trusted by 10,000+ Teams Worldwide",
        testimonials: [
          {
            quote: "This platform transformed how we work. We're 3x more productive now.",
            author: "Sarah Chen",
            role: "VP of Engineering",
            company: "TechCorp",
            rating: 5
          },
          {
            quote: "The best investment we've made this year. ROI was immediate.",
            author: "Michael Rodriguez",
            role: "CEO",
            company: "StartupXYZ",
            rating: 5
          },
          {
            quote: "Customer support is outstanding. They truly care about our success.",
            author: "Emily Thompson",
            role: "Product Manager",
            company: "Innovation Labs",
            rating: 5
          }
        ]
      },
      ecommerce: {
        headline: "What Our Customers Say",
        testimonials: [
          {
            quote: "Amazing quality and super fast shipping! Will definitely order again.",
            author: "Jessica M.",
            rating: 5
          },
          {
            quote: "Best online shopping experience I've had. Products exceeded expectations.",
            author: "David K.",
            rating: 5
          },
          {
            quote: "Great prices and excellent customer service. Highly recommend!",
            author: "Maria S.",
            rating: 5
          }
        ]
      }
    },
    toneVariations: {
      professional: {
        headline: "Client Success Stories",
        subheadline: "See how industry leaders achieve results with our solution"
      },
      casual: {
        headline: "People Love Us (And We Love Them Back)",
        subheadline: "Don't just take our word for it"
      }
    }
  },
  
  templates: {
    default: {
      headline: "What Our Customers Say",
      testimonials: [
        {
          quote: "This product has completely transformed our workflow.",
          author: "Jane Doe",
          role: "CEO",
          company: "Acme Corp"
        }
      ]
    },
    minimal: {
      testimonials: [
        {
          quote: "Great product!",
          author: "Customer Name"
        }
      ]
    }
  },
  
  validation: {
    required: ["testimonials"],
    constraints: [
      {
        prop: "testimonials",
        type: "minLength",
        value: 1,
        message: "At least one testimonial required"
      },
      {
        prop: "testimonials[].quote",
        type: "minLength",
        value: 20,
        message: "Testimonial quotes should be substantial"
      }
    ]
  },
  
  composition: {
    compatible: ["feature-three-cards", "pricing-toggle", "cta-single"],
    sequence: {
      prefersBefore: ["pricing-toggle", "cta-single"],
      prefersAfter: ["feature-three-cards", "feature-icon-list"]
    }
  }
};

/**
 * Testimonial Carousel Component Definition
 */
export const testimonialCarouselDefinition: ComponentDefinition = {
  slug: "testimonial-carousel",
  name: "Testimonial Carousel",
  category: "testimonial",
  description: "Rotating carousel of testimonials",
  
  schema: generateJSONSchema(TestimonialSchemas.testimonialCarousel),
  zodSchema: TestimonialSchemas.testimonialCarousel,
  
  aiHints: {
    purpose: "Showcase many testimonials in limited space with engaging interaction",
    whenToUse: [
      "When you have many testimonials",
      "Limited vertical space",
      "Want interactive element",
      "Mobile-friendly testimonial display"
    ],
    commonPatterns: [
      "Auto-rotating testimonials",
      "Navigation dots/arrows",
      "3-5 second intervals",
      "Pause on hover"
    ],
    industryVariations: {
      saas: {
        testimonials: [
          {
            quote: "Implementation was seamless. We were up and running in minutes.",
            author: "Alex Kim",
            role: "CTO",
            company: "FastGrowth Inc"
          },
          {
            quote: "The analytics alone are worth the price. Game-changing insights.",
            author: "Rachel Green",
            role: "Data Analyst",
            company: "DataDriven Co"
          }
        ],
        autoplay: true,
        interval: 5000
      }
    }
  },
  
  templates: {
    default: {
      testimonials: [
        {
          quote: "Excellent product with great support.",
          author: "Happy Customer"
        },
        {
          quote: "Highly recommend to everyone.",
          author: "Satisfied User"
        }
      ]
    }
  },
  
  validation: {
    required: ["testimonials"],
    constraints: [
      {
        prop: "testimonials",
        type: "minLength",
        value: 2,
        message: "Carousel needs at least 2 testimonials"
      }
    ]
  },
  
  composition: {
    compatible: ["hero-minimal", "feature-three-cards", "cta-single"],
    sequence: {
      prefersBefore: ["pricing-toggle", "cta-single"],
      prefersAfter: ["feature-three-cards"]
    }
  }
};

/**
 * Get all testimonial definitions
 */
export const testimonialDefinitions = [
  testimonialGridDefinition,
  testimonialCarouselDefinition
];

/**
 * Get testimonial definition by slug
 */
export function getTestimonialDefinition(slug: string): ComponentDefinition | undefined {
  return testimonialDefinitions.find(def => def.slug === slug);
}