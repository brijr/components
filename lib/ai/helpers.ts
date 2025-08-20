/**
 * AI Helper functions for component generation
 */

import { getComponentTemplate, generateExampleProps } from "./templates";

export interface GenerationOptions {
  industry?: string;
  tone?: string;
  style?: string;
  targetAudience?: string;
}

/**
 * Parse natural language prompt to extract key information
 */
export function parsePrompt(prompt: string): {
  intent: string;
  keywords: string[];
  entities: Record<string, string>;
  sentiment: "positive" | "neutral" | "negative";
} {
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract intent
  let intent = "create";
  if (lowerPrompt.includes("build")) intent = "build";
  if (lowerPrompt.includes("generate")) intent = "generate";
  if (lowerPrompt.includes("make")) intent = "make";
  if (lowerPrompt.includes("design")) intent = "design";
  
  // Extract keywords
  const keywords: string[] = [];
  const keywordPatterns = [
    "hero", "feature", "pricing", "testimonial", "cta", "footer",
    "minimal", "simple", "complex", "modern", "clean",
    "professional", "casual", "playful", "serious",
    "saas", "ecommerce", "blog", "portfolio", "landing"
  ];
  
  for (const pattern of keywordPatterns) {
    if (lowerPrompt.includes(pattern)) {
      keywords.push(pattern);
    }
  }
  
  // Extract entities (quoted strings, specific values)
  const entities: Record<string, string> = {};
  
  // Extract quoted strings
  const quotedStrings = prompt.match(/"([^"]+)"|'([^']+)'/g);
  if (quotedStrings) {
    quotedStrings.forEach((str, index) => {
      const cleaned = str.replace(/["']/g, "");
      if (lowerPrompt.includes("headline") && index === 0) {
        entities.headline = cleaned;
      } else if (lowerPrompt.includes("subheadline") && index === 1) {
        entities.subheadline = cleaned;
      } else {
        entities[`text_${index}`] = cleaned;
      }
    });
  }
  
  // Detect sentiment
  let sentiment: "positive" | "neutral" | "negative" = "neutral";
  const positiveWords = ["amazing", "awesome", "great", "excellent", "perfect", "best"];
  const negativeWords = ["bad", "poor", "terrible", "worst", "awful"];
  
  for (const word of positiveWords) {
    if (lowerPrompt.includes(word)) {
      sentiment = "positive";
      break;
    }
  }
  
  for (const word of negativeWords) {
    if (lowerPrompt.includes(word)) {
      sentiment = "negative";
      break;
    }
  }
  
  return { intent, keywords, entities, sentiment };
}

/**
 * Generate component props based on prompt and template
 */
export async function generateComponentProps(
  component: any,
  prompt: string,
  options?: GenerationOptions
): Promise<Record<string, any>> {
  const template = getComponentTemplate(component.slug);
  
  if (!template) {
    // Return default props from registry if no template
    return component.props || {};
  }
  
  // Parse the prompt
  const { keywords, entities } = parsePrompt(prompt);
  
  // Start with example props based on options
  const baseProps = generateExampleProps(template, options);
  
  // Override with entities from prompt
  if (entities.headline) {
    baseProps.headline = entities.headline;
  }
  
  if (entities.subheadline) {
    baseProps.subheadline = entities.subheadline;
  }
  
  // Generate content based on keywords and options
  const content = generateContent(prompt, keywords, options);
  
  // Apply generated content
  if (content.headline && !entities.headline) {
    baseProps.headline = content.headline;
  }
  
  if (content.subheadline && !entities.subheadline) {
    baseProps.subheadline = content.subheadline;
  }
  
  if (content.primaryCTA) {
    baseProps.primaryCTA = content.primaryCTA;
  }
  
  if (content.secondaryCTA) {
    baseProps.secondaryCTA = content.secondaryCTA;
  }
  
  // Handle component-specific props
  if (component.type === "feature" && baseProps.features) {
    baseProps.features = generateFeatures(prompt, options);
  }
  
  if (component.type === "testimonial" && baseProps.testimonials) {
    baseProps.testimonials = generateTestimonials(prompt, options);
  }
  
  if (component.type === "pricing" && baseProps.plans) {
    baseProps.plans = generatePricingPlans(prompt, options);
  }
  
  return baseProps;
}

/**
 * Generate content based on prompt analysis
 */
function generateContent(
  prompt: string,
  keywords: string[],
  options?: GenerationOptions
): Record<string, any> {
  const content: Record<string, any> = {};
  
  // Industry-specific content generation
  const industry = options?.industry || detectIndustry(keywords);
  const tone = options?.tone || detectTone(keywords);
  
  // Generate headlines based on industry and tone
  content.headline = generateHeadline(industry, tone, prompt);
  content.subheadline = generateSubheadline(industry, tone, prompt);
  
  // Generate CTAs
  content.primaryCTA = {
    text: generateCTAText(true, industry, tone),
    href: "/contact"
  };
  
  if (keywords.includes("demo") || prompt.toLowerCase().includes("demo")) {
    content.secondaryCTA = {
      text: "Watch Demo",
      href: "/demo"
    };
  } else if (keywords.includes("learn") || prompt.toLowerCase().includes("learn")) {
    content.secondaryCTA = {
      text: "Learn More",
      href: "/about"
    };
  }
  
  return content;
}

/**
 * Generate industry-appropriate headline
 */
function generateHeadline(industry: string, tone: string, prompt: string): string {
  const headlines: Record<string, Record<string, string[]>> = {
    saas: {
      professional: [
        "Streamline Your Workflow",
        "Accelerate Team Productivity",
        "Transform Your Business"
      ],
      casual: [
        "Work Smarter, Not Harder",
        "Get Things Done Faster",
        "Your New Favorite Tool"
      ]
    },
    ecommerce: {
      professional: [
        "Elevate Your Shopping Experience",
        "Premium Quality, Exceptional Value",
        "Discover Excellence"
      ],
      casual: [
        "Shop the Latest Trends",
        "Find What You Love",
        "Amazing Deals Daily"
      ]
    },
    default: {
      professional: [
        "Excellence Delivered",
        "Your Success, Our Mission",
        "Innovation at Its Best"
      ],
      casual: [
        "Welcome to Something Special",
        "Let's Get Started",
        "Made Just for You"
      ]
    }
  };
  
  const industryHeadlines = headlines[industry] || headlines.default;
  const toneHeadlines = industryHeadlines[tone] || industryHeadlines.professional;
  
  // Check if prompt has specific headline request
  if (prompt.toLowerCase().includes("headline")) {
    const match = prompt.match(/headline[:\s]+["']?([^"'\n]+)["']?/i);
    if (match) return match[1];
  }
  
  return toneHeadlines[Math.floor(Math.random() * toneHeadlines.length)];
}

/**
 * Generate subheadline based on context
 */
function generateSubheadline(industry: string, tone: string, prompt: string): string {
  const subheadlines: Record<string, Record<string, string[]>> = {
    saas: {
      professional: [
        "Enterprise-grade solutions for modern teams",
        "Powerful features designed for scale",
        "Trusted by thousands of companies worldwide"
      ],
      casual: [
        "Everything you need in one place",
        "Simple, powerful, and easy to use",
        "Join thousands of happy users"
      ]
    },
    ecommerce: {
      professional: [
        "Curated collections for discerning customers",
        "Quality products, exceptional service",
        "Your trusted shopping destination"
      ],
      casual: [
        "Free shipping on orders over $50",
        "New arrivals every week",
        "Shop now, pay later available"
      ]
    },
    default: {
      professional: [
        "Professional solutions for modern challenges",
        "Innovative approaches to drive success",
        "Expertise you can trust"
      ],
      casual: [
        "Simple solutions for everyday needs",
        "Making life a little easier",
        "Here to help you succeed"
      ]
    }
  };
  
  const industrySubheadlines = subheadlines[industry] || subheadlines.default;
  const toneSubheadlines = industrySubheadlines[tone] || industrySubheadlines.professional;
  
  return toneSubheadlines[Math.floor(Math.random() * toneSubheadlines.length)];
}

/**
 * Generate CTA button text
 */
function generateCTAText(isPrimary: boolean, industry: string, tone: string): string {
  if (isPrimary) {
    const primaryCTAs: Record<string, string[]> = {
      saas: ["Start Free Trial", "Get Started", "Try It Free"],
      ecommerce: ["Shop Now", "Browse Collection", "View Products"],
      default: ["Get Started", "Learn More", "Contact Us"]
    };
    
    const options = primaryCTAs[industry] || primaryCTAs.default;
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return tone === "casual" ? "Learn More" : "Discover More";
  }
}

/**
 * Detect industry from keywords
 */
function detectIndustry(keywords: string[]): string {
  if (keywords.includes("saas") || keywords.includes("software")) return "saas";
  if (keywords.includes("ecommerce") || keywords.includes("shop")) return "ecommerce";
  if (keywords.includes("blog") || keywords.includes("content")) return "blog";
  if (keywords.includes("portfolio")) return "portfolio";
  return "default";
}

/**
 * Detect tone from keywords
 */
function detectTone(keywords: string[]): string {
  if (keywords.includes("professional") || keywords.includes("serious")) return "professional";
  if (keywords.includes("casual") || keywords.includes("friendly")) return "casual";
  if (keywords.includes("playful") || keywords.includes("fun")) return "playful";
  return "professional";
}

/**
 * Generate feature items
 */
function generateFeatures(prompt: string, options?: GenerationOptions): any[] {
  const industry = options?.industry || "default";
  
  const featureSets: Record<string, any[]> = {
    saas: [
      {
        title: "Real-time Collaboration",
        description: "Work together seamlessly with your team",
        icon: "Users"
      },
      {
        title: "Advanced Analytics",
        description: "Get insights that drive better decisions",
        icon: "ChartBar"
      },
      {
        title: "Secure & Compliant",
        description: "Enterprise-grade security for your data",
        icon: "Shield"
      }
    ],
    ecommerce: [
      {
        title: "Free Shipping",
        description: "On all orders over $50",
        icon: "Truck"
      },
      {
        title: "30-Day Returns",
        description: "Hassle-free return policy",
        icon: "RefreshCw"
      },
      {
        title: "Secure Checkout",
        description: "Your payment info is always safe",
        icon: "Lock"
      }
    ],
    default: [
      {
        title: "Premium Quality",
        description: "Excellence in every detail",
        icon: "Star"
      },
      {
        title: "24/7 Support",
        description: "We're here when you need us",
        icon: "HeadphonesIcon"
      },
      {
        title: "Fast & Reliable",
        description: "Consistent performance you can trust",
        icon: "Zap"
      }
    ]
  };
  
  return featureSets[industry] || featureSets.default;
}

/**
 * Generate testimonials
 */
function generateTestimonials(prompt: string, options?: GenerationOptions): any[] {
  return [
    {
      quote: "This product has transformed how we work. Couldn't imagine going back.",
      author: "Sarah Johnson",
      role: "CEO at TechCorp",
      rating: 5
    },
    {
      quote: "Outstanding service and incredible results. Highly recommended!",
      author: "Michael Chen",
      role: "Product Manager",
      rating: 5
    },
    {
      quote: "The best investment we've made for our team this year.",
      author: "Emily Rodriguez",
      role: "CTO at StartupCo",
      rating: 5
    }
  ];
}

/**
 * Generate pricing plans
 */
function generatePricingPlans(prompt: string, options?: GenerationOptions): any[] {
  return [
    {
      name: "Starter",
      monthlyPrice: 9,
      yearlyPrice: 90,
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Email support",
        "1GB storage"
      ],
      cta: { text: "Start Free", href: "/signup" },
      highlighted: false
    },
    {
      name: "Professional",
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: "For growing teams and businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Team collaboration",
        "Custom integrations"
      ],
      cta: { text: "Start Trial", href: "/signup" },
      highlighted: true
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: "For large organizations with custom needs",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Dedicated support",
        "Custom training",
        "SLA guarantee",
        "Advanced security"
      ],
      cta: { text: "Contact Sales", href: "/contact" },
      highlighted: false
    }
  ];
}

/**
 * Validate generated props against component schema
 */
export function validateProps(
  componentSlug: string,
  props: Record<string, any>
): { valid: boolean; errors: string[] } {
  const template = getComponentTemplate(componentSlug);
  
  if (!template) {
    return { valid: true, errors: [] }; // No template to validate against
  }
  
  const errors: string[] = [];
  
  // Check required props
  for (const [key, def] of Object.entries(template.propStructure)) {
    if (def.required && !(key in props)) {
      errors.push(`Missing required prop: ${key}`);
    }
    
    if (key in props) {
      // Type checking
      const actualType = Array.isArray(props[key]) ? "array" : typeof props[key];
      if (actualType !== def.type && props[key] !== null && props[key] !== undefined) {
        errors.push(`Invalid type for ${key}: expected ${def.type}, got ${actualType}`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize and clean generated props
 */
export function sanitizeProps(props: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }
    
    if (typeof value === "string") {
      // Clean up strings
      sanitized[key] = value.trim().replace(/\s+/g, " ");
    } else if (Array.isArray(value)) {
      // Recursively sanitize arrays
      sanitized[key] = value.map(item => 
        typeof item === "object" ? sanitizeProps(item) : item
      );
    } else if (typeof value === "object") {
      // Recursively sanitize objects
      sanitized[key] = sanitizeProps(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}