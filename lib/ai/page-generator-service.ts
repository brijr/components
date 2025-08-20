/**
 * Enhanced Page Generation Service
 * Generates complete, coherent landing pages with 5-8 sections
 */

import { PageTemplate, GeneratedSection, PageGenerationConfig } from "@/lib/page-templates/types";
import { getPageTemplate, findBestTemplate } from "@/lib/page-templates/templates";
import { registry } from "@/registry";
import { generateWithClaude } from "./anthropic-service";
import { generateComponentProps, sanitizeProps } from "./helpers";
import { SimplePage } from "@/lib/schemas/page-simple.schema";

/**
 * Generate a complete landing page based on template and configuration
 */
export async function generateCompletePage(config: PageGenerationConfig): Promise<SimplePage> {
  const { template, companyName, industry, tone, additionalContext } = config;
  
  // Build context for content generation
  const context = buildPageContext(config);
  
  // Generate sections based on template
  const sections: GeneratedSection[] = [];
  
  for (const sectionDef of template.sections) {
    try {
      const section = await generateSection(
        sectionDef,
        context,
        sections, // Pass previous sections for context
        config
      );
      
      if (section) {
        sections.push(section);
      }
    } catch (error) {
      console.error(`Failed to generate section ${sectionDef.componentSlug}:`, error);
      // Continue with other sections even if one fails
    }
  }
  
  // Ensure we have at least the minimum number of sections
  if (sections.length < template.minSections) {
    console.warn(`Generated only ${sections.length} sections, expected at least ${template.minSections}`);
  }
  
  return {
    id: `page-${Date.now()}`,
    title: `${companyName} - ${template.name}`,
    slug: companyName.toLowerCase().replace(/\s+/g, "-"),
    sections,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: "ai",
      prompt: additionalContext || template.description,
      version: 1
    }
  };
}

/**
 * Generate a single section with context awareness
 */
async function generateSection(
  sectionDef: any,
  context: PageContext,
  previousSections: GeneratedSection[],
  config: PageGenerationConfig
): Promise<GeneratedSection | null> {
  // Try to use the primary component slug first
  let componentSlug = sectionDef.componentSlug;
  let component = registry.find(c => c.slug === componentSlug);
  
  // If not found, try variations
  if (!component && sectionDef.variations?.length > 0) {
    for (const variation of sectionDef.variations) {
      component = registry.find(c => c.slug === variation);
      if (component) {
        componentSlug = variation;
        break;
      }
    }
  }
  
  if (!component) {
    console.error(`Component not found: ${componentSlug}`);
    return null;
  }
  
  // Build section-specific prompt
  const sectionPrompt = buildSectionPrompt(
    sectionDef,
    context,
    previousSections,
    config
  );
  
  // Try Claude first if available
  if (process.env.ANTHROPIC_API_KEY) {
    const claudeResult = await generateWithClaude({
      prompt: sectionPrompt,
      componentType: component.type,
      mode: "component",
      industry: config.industry,
      tone: config.tone
    });
    
    if (claudeResult?.props) {
      return {
        id: `section-${Date.now()}-${sectionDef.order}`,
        componentSlug,
        props: sanitizeProps(claudeResult.props),
        order: sectionDef.order,
        visible: true
      };
    }
  }
  
  // Fallback to template-based generation
  const props = await generateSectionContent(
    component,
    sectionDef,
    context,
    config
  );
  
  return {
    id: `section-${Date.now()}-${sectionDef.order}`,
    componentSlug,
    props: sanitizeProps(props),
    order: sectionDef.order,
    visible: true
  };
}

/**
 * Build context for the entire page
 */
function buildPageContext(config: PageGenerationConfig): PageContext {
  return {
    companyName: config.companyName,
    industry: config.industry,
    tone: config.tone,
    targetAudience: config.targetAudience || getDefaultAudience(config.industry),
    uniqueSellingPoints: config.uniqueSellingPoints || generateDefaultUSPs(config.industry),
    competitors: config.competitors || [],
    templateName: config.template.name,
    additionalContext: config.additionalContext
  };
}

/**
 * Build a prompt for a specific section
 */
function buildSectionPrompt(
  sectionDef: any,
  context: PageContext,
  previousSections: GeneratedSection[],
  config: PageGenerationConfig
): string {
  let prompt = `Generate content for a ${sectionDef.componentSlug} section.\n`;
  prompt += `Company: ${context.companyName}\n`;
  prompt += `Industry: ${context.industry}\n`;
  prompt += `Tone: ${context.tone}\n`;
  prompt += `Guidance: ${sectionDef.contentGuidance}\n`;
  
  // Add context from previous sections
  if (previousSections.length > 0) {
    prompt += "\nPrevious sections context:\n";
    previousSections.forEach((section, index) => {
      const headline = section.props.headline || section.props.title;
      if (headline) {
        prompt += `- Section ${index + 1}: ${headline}\n`;
      }
    });
  }
  
  // Add USPs if this is a feature or benefit section
  if (sectionDef.componentSlug.includes("feature") && context.uniqueSellingPoints.length > 0) {
    prompt += `\nKey benefits to highlight: ${context.uniqueSellingPoints.join(", ")}\n`;
  }
  
  return prompt;
}

/**
 * Generate section content using templates and context
 */
async function generateSectionContent(
  component: any,
  sectionDef: any,
  context: PageContext,
  config: PageGenerationConfig
): Promise<Record<string, any>> {
  // Start with default props from the component
  let props = { ...(component.props || {}) };
  
  // Override with template-specific content
  if (sectionDef.defaultContent) {
    props = { ...props, ...sectionDef.defaultContent };
  }
  
  // Generate dynamic content based on section type
  switch (component.type) {
    case "hero":
      props = generateHeroContent(props, context, config);
      break;
    case "feature":
      props = generateFeatureContent(props, context, config);
      break;
    case "testimonial":
      props = generateTestimonialContent(props, context, config);
      break;
    case "pricing":
      props = generatePricingContent(props, context, config);
      break;
    case "cta":
      props = generateCTAContent(props, context, config);
      break;
    case "footer":
      props = generateFooterContent(props, context, config);
      break;
  }
  
  return props;
}

// Content generation functions for each section type
function generateHeroContent(props: any, context: PageContext, config: PageGenerationConfig) {
  return {
    ...props,
    headline: generateHeadline(context, "hero"),
    subheadline: generateSubheadline(context, "hero"),
    primaryCTA: {
      text: getIndustrySpecificCTA(context.industry, true),
      href: "/signup"
    },
    secondaryCTA: {
      text: getIndustrySpecificCTA(context.industry, false),
      href: "/demo"
    }
  };
}

function generateFeatureContent(props: any, context: PageContext, config: PageGenerationConfig) {
  const features = context.uniqueSellingPoints.slice(0, 3).map((usp, index) => ({
    title: usp,
    description: generateFeatureDescription(usp, context.industry),
    icon: getFeatureIcon(index)
  }));
  
  return {
    ...props,
    headline: generateHeadline(context, "feature"),
    subheadline: generateSubheadline(context, "feature"),
    features
  };
}

function generateTestimonialContent(props: any, context: PageContext, config: PageGenerationConfig) {
  return {
    ...props,
    headline: "What Our Customers Say",
    subheadline: `Join thousands of satisfied ${context.industry} professionals`,
    testimonials: generateTestimonials(context.industry, 3)
  };
}

function generatePricingContent(props: any, context: PageContext, config: PageGenerationConfig) {
  return {
    ...props,
    headline: "Choose Your Plan",
    subheadline: "Transparent pricing that scales with your business",
    plans: generatePricingPlans(context.industry)
  };
}

function generateCTAContent(props: any, context: PageContext, config: PageGenerationConfig) {
  return {
    ...props,
    headline: `Ready to Transform Your ${context.industry === "technology" ? "Business" : "Operations"}?`,
    subheadline: "Join thousands of companies already using " + context.companyName,
    primaryCTA: {
      text: "Start Free Trial",
      href: "/signup"
    }
  };
}

function generateFooterContent(props: any, context: PageContext, config: PageGenerationConfig) {
  return {
    ...props,
    companyName: context.companyName,
    tagline: `The leading ${context.industry} solution`,
    links: generateFooterLinks(context.industry)
  };
}

// Helper functions
function generateHeadline(context: PageContext, sectionType: string): string {
  const templates: Record<string, string[]> = {
    hero: [
      `Transform Your ${context.industry} with ${context.companyName}`,
      `The Future of ${context.industry} Starts Here`,
      `${context.companyName}: Revolutionizing ${context.industry}`
    ],
    feature: [
      "Powerful Features Built for You",
      "Everything You Need to Succeed",
      "Why Choose " + context.companyName
    ]
  };
  
  const options = templates[sectionType] || templates.hero;
  return options[Math.floor(Math.random() * options.length)];
}

function generateSubheadline(context: PageContext, sectionType: string): string {
  const templates: Record<string, string[]> = {
    hero: [
      `Empowering ${context.industry} professionals with cutting-edge solutions`,
      `Streamline your workflow and boost productivity`,
      `Join thousands of companies transforming their business`
    ],
    feature: [
      `Discover what makes ${context.companyName} the preferred choice`,
      `Built by experts, designed for excellence`,
      `Advanced capabilities that drive real results`
    ]
  };
  
  const options = templates[sectionType] || templates.hero;
  return options[Math.floor(Math.random() * options.length)];
}

function getDefaultAudience(industry: string): string {
  const audiences: Record<string, string> = {
    technology: "tech-savvy professionals and startups",
    ecommerce: "online shoppers and retail businesses",
    finance: "financial professionals and investors",
    healthcare: "healthcare providers and patients",
    education: "students and educators"
  };
  
  return audiences[industry] || "professionals and businesses";
}

function generateDefaultUSPs(industry: string): string[] {
  const uspTemplates: Record<string, string[]> = {
    technology: [
      "Lightning-fast performance",
      "Enterprise-grade security",
      "Seamless integrations",
      "24/7 expert support",
      "AI-powered insights"
    ],
    ecommerce: [
      "Free shipping worldwide",
      "30-day money-back guarantee",
      "Exclusive member discounts",
      "Same-day delivery",
      "Secure checkout"
    ],
    default: [
      "Industry-leading solution",
      "Trusted by thousands",
      "Award-winning support",
      "Competitive pricing",
      "Easy to get started"
    ]
  };
  
  return uspTemplates[industry] || uspTemplates.default;
}

function getIndustrySpecificCTA(industry: string, isPrimary: boolean): string {
  const ctas: Record<string, { primary: string; secondary: string }> = {
    technology: { primary: "Start Free Trial", secondary: "View Demo" },
    ecommerce: { primary: "Shop Now", secondary: "Browse Catalog" },
    finance: { primary: "Open Account", secondary: "Learn More" },
    healthcare: { primary: "Book Consultation", secondary: "See How It Works" },
    education: { primary: "Enroll Now", secondary: "View Courses" }
  };
  
  const industryCTAs = ctas[industry] || ctas.technology;
  return isPrimary ? industryCTAs.primary : industryCTAs.secondary;
}

function generateFeatureDescription(feature: string, industry: string): string {
  return `Experience the power of ${feature.toLowerCase()} designed specifically for the ${industry} industry.`;
}

function getFeatureIcon(index: number): string {
  const icons = ["Zap", "Shield", "Globe", "Users", "ChartBar", "Clock"];
  return icons[index % icons.length];
}

function generateTestimonials(industry: string, count: number): any[] {
  const names = ["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", "Lisa Thompson"];
  const companies = ["TechCorp", "Innovation Labs", "Digital Solutions", "Future Systems", "Cloud Dynamics"];
  
  return Array.from({ length: count }, (_, i) => ({
    quote: `This solution has transformed how we operate in the ${industry} space. Highly recommended!`,
    author: names[i % names.length],
    role: `${["CEO", "CTO", "Director", "Manager"][i % 4]} at ${companies[i % companies.length]}`,
    rating: 5
  }));
}

function generatePricingPlans(industry: string): any[] {
  const basePrice = industry === "enterprise" ? 99 : 29;
  
  return [
    {
      name: "Starter",
      monthlyPrice: basePrice,
      yearlyPrice: basePrice * 10,
      description: "Perfect for individuals and small teams",
      features: [
        "Up to 5 users",
        "Basic features",
        "Email support",
        "1GB storage"
      ],
      cta: { text: "Start Free", href: "/signup" },
      highlighted: false
    },
    {
      name: "Professional",
      monthlyPrice: basePrice * 3,
      yearlyPrice: basePrice * 3 * 10,
      description: "For growing teams and businesses",
      features: [
        "Up to 20 users",
        "Advanced features",
        "Priority support",
        "10GB storage",
        "API access",
        "Custom integrations"
      ],
      cta: { text: "Start Trial", href: "/signup" },
      highlighted: true
    },
    {
      name: "Enterprise",
      monthlyPrice: basePrice * 10,
      yearlyPrice: basePrice * 10 * 10,
      description: "For large organizations",
      features: [
        "Unlimited users",
        "All features",
        "Dedicated support",
        "Unlimited storage",
        "Custom training",
        "SLA guarantee"
      ],
      cta: { text: "Contact Sales", href: "/contact" },
      highlighted: false
    }
  ];
}

function generateFooterLinks(industry: string): any {
  return {
    product: ["Features", "Pricing", "Integrations", "API"],
    company: ["About", "Blog", "Careers", "Press"],
    support: ["Help Center", "Documentation", "Contact", "Status"],
    legal: ["Privacy", "Terms", "Security", "Compliance"]
  };
}

// Type definitions
interface PageContext {
  companyName: string;
  industry: string;
  tone: string;
  targetAudience: string;
  uniqueSellingPoints: string[];
  competitors: string[];
  templateName: string;
  additionalContext?: string;
}