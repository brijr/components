/**
 * Prompt Analyzer Service
 * Extracts structured context from natural language prompts
 */

import { z } from "zod";

/**
 * Extracted context from a prompt
 */
export const ExtractedContextSchema = z.object({
  companyName: z.string().optional(),
  productName: z.string().optional(),
  industry: z.string().optional(),
  tone: z.enum(["professional", "casual", "playful", "serious", "bold", "minimal"]).optional(),
  targetAudience: z.string().optional(),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  suggestedTemplate: z.string().optional(),
  numberOfSections: z.number().min(3).max(10).optional(),
  includePricing: z.boolean().optional(),
  includeTestimonials: z.boolean().optional(),
  primaryColor: z.string().optional(),
  callToAction: z.string().optional(),
});

export type ExtractedContext = z.infer<typeof ExtractedContextSchema>;

/**
 * Prompt analysis patterns
 */
const patterns = {
  companyName: /(?:for|called|named|^\s*)([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)*)/,
  industry: {
    software: /\b(software|saas|app|application|platform|tool|api|sdk)\b/i,
    ecommerce: /\b(ecommerce|e-commerce|shop|store|retail|product|merchandise)\b/i,
    agency: /\b(agency|consulting|services|freelance|studio|creative)\b/i,
    education: /\b(education|course|learning|training|academy|school|tutorial)\b/i,
    healthcare: /\b(health|medical|clinic|hospital|wellness|therapy|care)\b/i,
    finance: /\b(finance|banking|investment|trading|crypto|fintech|money)\b/i,
    realestate: /\b(real estate|property|housing|rental|apartment|home)\b/i,
  },
  tone: {
    professional: /\b(professional|formal|corporate|business|serious)\b/i,
    casual: /\b(casual|friendly|relaxed|informal|conversational)\b/i,
    playful: /\b(playful|fun|creative|quirky|vibrant|energetic)\b/i,
    bold: /\b(bold|strong|powerful|impactful|striking)\b/i,
    minimal: /\b(minimal|simple|clean|minimalist|sleek)\b/i,
  },
  features: /(?:features?|includes?|offers?|provides?|with|has)\s*:?\s*([^.!?]+)/gi,
  pricing: /\b(pricing|price|cost|plans?|tiers?|packages?)\b/i,
  testimonials: /\b(testimonials?|reviews?|feedback|social proof|customers? say)\b/i,
  cta: /\b(cta|call to action|button|sign up|get started|try|demo|free trial)\b/i,
};

/**
 * Template keywords for matching
 */
const templateKeywords = {
  "saas-landing": ["software", "app", "platform", "tool", "saas", "subscription", "features", "pricing"],
  "ecommerce-landing": ["shop", "store", "product", "buy", "sell", "commerce", "retail"],
  "agency-landing": ["agency", "services", "consulting", "portfolio", "clients", "projects"],
  "startup-landing": ["startup", "launch", "new", "innovative", "disrupt", "beta"],
  "course-landing": ["course", "education", "learning", "training", "teach", "students"],
};

/**
 * Prompt Analyzer Class
 */
export class PromptAnalyzer {
  /**
   * Analyze a natural language prompt and extract structured context
   */
  analyze(prompt: string): ExtractedContext {
    const context: ExtractedContext = {};

    // Extract company/product name
    const companyMatch = prompt.match(patterns.companyName);
    if (companyMatch) {
      context.companyName = companyMatch[1].trim();
    }

    // Detect industry
    for (const [industry, pattern] of Object.entries(patterns.industry)) {
      if (pattern.test(prompt)) {
        context.industry = industry;
        break;
      }
    }

    // Detect tone
    for (const [tone, pattern] of Object.entries(patterns.tone)) {
      if (pattern.test(prompt)) {
        context.tone = tone as any;
        break;
      }
    }
    // Default to professional if not specified
    if (!context.tone) {
      context.tone = "professional";
    }

    // Extract features and benefits
    const features = this.extractFeatures(prompt);
    if (features.length > 0) {
      context.features = features;
    }

    // Extract keywords
    context.keywords = this.extractKeywords(prompt);

    // Check for specific section requests
    context.includePricing = patterns.pricing.test(prompt);
    context.includeTestimonials = patterns.testimonials.test(prompt);

    // Suggest template based on content
    context.suggestedTemplate = this.suggestTemplate(prompt, context);

    // Determine number of sections
    context.numberOfSections = this.determineNumberOfSections(prompt, context);

    // Extract target audience
    const audienceMatch = prompt.match(/for\s+(developers?|designers?|businesses?|teams?|students?|professionals?|entrepreneurs?|startups?|enterprises?)/i);
    if (audienceMatch) {
      context.targetAudience = audienceMatch[1];
    }

    // Extract call to action
    const ctaMatch = prompt.match(/(?:cta|button|action)(?:\s+(?:text|says?|reads?))?\s*:?\s*"([^"]+)"/i);
    if (ctaMatch) {
      context.callToAction = ctaMatch[1];
    }

    return context;
  }

  /**
   * Extract features from prompt
   */
  private extractFeatures(prompt: string): string[] {
    const features: string[] = [];
    const sentences = prompt.split(/[.!?]+/);

    for (const sentence of sentences) {
      // Look for feature indicators
      if (/\b(features?|includes?|offers?|provides?|with|has)\b/i.test(sentence)) {
        // Extract comma-separated items
        const items = sentence.split(",").map(s => s.trim());
        for (const item of items) {
          // Clean up and add if it looks like a feature
          const cleaned = item.replace(/^(and|or|with|including)\s+/i, "").trim();
          if (cleaned.length > 3 && cleaned.length < 100 && !cleaned.includes("landing page")) {
            features.push(cleaned);
          }
        }
      }

      // Look for benefit statements
      if (/\b(helps?|enables?|allows?|makes?|provides?|gives?)\b/i.test(sentence)) {
        const benefitMatch = sentence.match(/(?:helps?|enables?|allows?|makes?|provides?|gives?)\s+(.+)/i);
        if (benefitMatch) {
          const benefit = benefitMatch[1].trim();
          if (benefit.length > 5 && benefit.length < 100) {
            features.push(benefit);
          }
        }
      }
    }

    // Remove duplicates and limit to 6 features
    return [...new Set(features)].slice(0, 6);
  }

  /**
   * Extract keywords from prompt
   */
  private extractKeywords(prompt: string): string[] {
    const keywords: string[] = [];
    const importantWords = prompt.match(/\b[A-Za-z]{4,}\b/g) || [];
    
    const stopWords = new Set([
      "create", "make", "build", "need", "want", "page", "landing", "website",
      "with", "that", "this", "from", "have", "should", "would", "could",
      "please", "help", "include", "about", "more", "very", "really"
    ]);

    for (const word of importantWords) {
      const lower = word.toLowerCase();
      if (!stopWords.has(lower) && keywords.length < 10) {
        keywords.push(lower);
      }
    }

    return [...new Set(keywords)];
  }

  /**
   * Suggest a template based on prompt content
   */
  private suggestTemplate(prompt: string, context: ExtractedContext): string {
    let bestMatch = "saas-landing"; // default
    let highestScore = 0;

    for (const [templateId, keywords] of Object.entries(templateKeywords)) {
      let score = 0;
      for (const keyword of keywords) {
        if (prompt.toLowerCase().includes(keyword)) {
          score++;
        }
      }

      // Boost score if industry matches
      if (context.industry) {
        if (templateId.includes(context.industry) || 
            (context.industry === "software" && templateId === "saas-landing") ||
            (context.industry === "ecommerce" && templateId === "ecommerce-landing")) {
          score += 3;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = templateId;
      }
    }

    return bestMatch;
  }

  /**
   * Determine optimal number of sections
   */
  private determineNumberOfSections(prompt: string, context: ExtractedContext): number {
    let sections = 6; // default

    // Add sections based on explicit requests
    if (context.includePricing) sections++;
    if (context.includeTestimonials) sections++;
    
    // Add sections based on features
    if (context.features && context.features.length > 3) {
      sections++; // Add extra feature section
    }

    // Check for explicit requests
    if (/\b(comprehensive|detailed|full|complete)\b/i.test(prompt)) {
      sections = Math.max(sections, 8);
    } else if (/\b(simple|basic|minimal|quick)\b/i.test(prompt)) {
      sections = Math.min(sections, 5);
    }

    return Math.min(Math.max(sections, 4), 10);
  }

  /**
   * Generate a refined prompt from extracted context
   */
  generateRefinedPrompt(context: ExtractedContext, originalPrompt: string): string {
    let refined = originalPrompt;

    // Add missing context
    const additions: string[] = [];

    if (!context.companyName && !context.productName) {
      additions.push("Company: [Your Company Name]");
    }

    if (!context.industry) {
      additions.push("Industry: technology");
    }

    if (context.features && context.features.length > 0) {
      additions.push(`Key features: ${context.features.slice(0, 3).join(", ")}`);
    }

    if (additions.length > 0) {
      refined += "\n\nAdditional context:\n" + additions.join("\n");
    }

    return refined;
  }

  /**
   * Validate and enhance extracted context
   */
  enhance(context: ExtractedContext): ExtractedContext {
    const enhanced = { ...context };

    // Ensure we have a company name
    if (!enhanced.companyName && !enhanced.productName) {
      enhanced.companyName = "Your Company";
    }

    // Default industry if not detected
    if (!enhanced.industry) {
      enhanced.industry = "technology";
    }

    // Default tone
    if (!enhanced.tone) {
      enhanced.tone = "professional";
    }

    // Ensure we have some features
    if (!enhanced.features || enhanced.features.length === 0) {
      enhanced.features = [
        "Innovative solutions",
        "User-friendly interface", 
        "24/7 support"
      ];
    }

    // Set default sections
    if (!enhanced.numberOfSections) {
      enhanced.numberOfSections = 6;
    }

    return enhanced;
  }
}

// Export singleton instance
export const promptAnalyzer = new PromptAnalyzer();