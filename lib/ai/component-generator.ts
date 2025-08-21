/**
 * AI Component Generator
 * Intelligently generates component props using Claude and schemas
 */

import { Anthropic } from "@anthropic-ai/sdk";
import { 
  ComponentDefinition, 
  GenerationContext,
  ValidationResult 
} from "@/lib/schemas/component-schemas/types";
import { 
  getComponentDefinition,
  componentValidator,
  getComponentJSONSchema
} from "@/lib/schemas/component-schemas";
import { z } from "zod";

/**
 * Component generation request schema
 */
export const ComponentGenerationRequestSchema = z.object({
  componentSlug: z.string(),
  context: z.object({
    companyName: z.string(),
    industry: z.string().optional(),
    tone: z.enum(["professional", "casual", "playful", "serious", "bold", "minimal"]).optional(),
    targetAudience: z.string().optional(),
    additionalContext: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
  options: z.object({
    useCache: z.boolean().default(true),
    maxRetries: z.number().min(1).max(3).default(2),
    temperature: z.number().min(0).max(1).default(0.7),
    includeVariations: z.boolean().default(false),
  }).optional(),
});

export type ComponentGenerationRequest = z.infer<typeof ComponentGenerationRequestSchema>;

/**
 * Component generation response
 */
export interface ComponentGenerationResponse {
  success: boolean;
  componentSlug: string;
  props: any;
  validation?: ValidationResult;
  metadata?: {
    generatedBy: "claude" | "fallback" | "cache";
    generationTime: number;
    tokensUsed?: number;
    model?: string;
    cached?: boolean;
  };
  error?: string;
}

/**
 * AI Component Generator Class
 */
export class AIComponentGenerator {
  private anthropic: Anthropic | null = null;
  private cache: Map<string, any> = new Map();
  private metrics = {
    totalGenerations: 0,
    successfulGenerations: 0,
    cacheHits: 0,
    claudeGenerations: 0,
    fallbackGenerations: 0,
    averageTime: 0,
  };

  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  /**
   * Generate component props with AI
   */
  async generate(request: ComponentGenerationRequest): Promise<ComponentGenerationResponse> {
    const startTime = Date.now();
    this.metrics.totalGenerations++;

    try {
      // Validate request
      const validatedRequest = ComponentGenerationRequestSchema.parse(request);
      const { componentSlug, context, options } = validatedRequest;

      // Get component definition
      const definition = getComponentDefinition(componentSlug);
      if (!definition) {
        throw new Error(`Component not found: ${componentSlug}`);
      }

      // Check cache
      const cacheKey = this.getCacheKey(componentSlug, context);
      if (options?.useCache !== false && this.cache.has(cacheKey)) {
        this.metrics.cacheHits++;
        const cachedProps = this.cache.get(cacheKey);
        
        return {
          success: true,
          componentSlug,
          props: cachedProps,
          metadata: {
            generatedBy: "cache",
            generationTime: Date.now() - startTime,
            cached: true,
          },
        };
      }

      // Try Claude generation
      let props: any;
      let generatedBy: "claude" | "fallback" = "claude";

      if (this.anthropic) {
        console.log("🤖 Using Claude AI for generation");
        console.log("🔧 Context:", context);
        try {
          props = await this.generateWithClaude(definition, context, options);
          console.log("✅ Claude generation successful");
          this.metrics.claudeGenerations++;
        } catch (error) {
          console.warn("❌ Claude generation failed, using fallback:", error);
          props = this.generateWithFallback(definition, context);
          generatedBy = "fallback";
          this.metrics.fallbackGenerations++;
        }
      } else {
        console.log("⚠️ No Anthropic API key found, using fallback generation");
        props = this.generateWithFallback(definition, context);
        generatedBy = "fallback";
        this.metrics.fallbackGenerations++;
      }

      // Validate and fix props
      const validation = componentValidator.validateProps(componentSlug, props, definition);
      if (validation.fixedProps) {
        props = validation.fixedProps;
      }

      // Cache successful generation
      if (validation.valid && options?.useCache !== false) {
        this.cache.set(cacheKey, props);
      }

      // Update metrics
      if (validation.valid) {
        this.metrics.successfulGenerations++;
      }
      const generationTime = Date.now() - startTime;
      this.metrics.averageTime = 
        (this.metrics.averageTime * (this.metrics.totalGenerations - 1) + generationTime) / 
        this.metrics.totalGenerations;

      return {
        success: validation.valid,
        componentSlug,
        props,
        validation,
        metadata: {
          generatedBy,
          generationTime,
          model: generatedBy === "claude" ? "claude-3-opus-20240229" : undefined,
        },
      };

    } catch (error) {
      return {
        success: false,
        componentSlug: request.componentSlug,
        props: {},
        error: error instanceof Error ? error.message : "Unknown error",
        metadata: {
          generatedBy: "fallback",
          generationTime: Date.now() - startTime,
        },
      };
    }
  }

  /**
   * Generate with Claude
   */
  private async generateWithClaude(
    definition: ComponentDefinition,
    context: GenerationContext,
    options?: ComponentGenerationRequest["options"]
  ): Promise<any> {
    if (!this.anthropic) {
      throw new Error("Anthropic client not initialized");
    }

    const prompt = this.buildClaudePrompt(definition, context);
    const systemPrompt = this.buildSystemPrompt(definition);

    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: options?.temperature || 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract JSON from response
    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/```json\n?([\s\S]*?)\n?```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content.text;
    
    try {
      return JSON.parse(jsonStr);
    } catch (error) {
      // Try to extract JSON object directly
      const objectMatch = content.text.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        return JSON.parse(objectMatch[0]);
      }
      throw new Error("Failed to parse JSON from Claude response");
    }
  }

  /**
   * Build Claude prompt
   */
  private buildClaudePrompt(definition: ComponentDefinition, context: GenerationContext): string {
    const { aiHints } = definition;
    
    // Get industry-specific template if available
    const industryTemplate = context.industry && aiHints.industryVariations?.[context.industry];
    const toneTemplate = context.tone && aiHints.toneVariations?.[context.tone];

    return `Generate props for a ${definition.name} component.

CONTEXT:
- Company: ${context.companyName}
${context.industry ? `- Industry: ${context.industry}` : ""}
${context.tone ? `- Tone: ${context.tone}` : ""}
${context.targetAudience ? `- Target Audience: ${context.targetAudience}` : ""}
${context.additionalContext ? `- Additional Context: ${context.additionalContext}` : ""}
${context.keywords?.length ? `- Keywords: ${context.keywords.join(", ")}` : ""}

COMPONENT PURPOSE:
${aiHints.purpose}

WHEN TO USE:
${aiHints.whenToUse.slice(0, 3).join("\n")}

${industryTemplate ? `
INDUSTRY TEMPLATE:
${JSON.stringify(industryTemplate, null, 2)}
` : ""}

${toneTemplate ? `
TONE VARIATIONS:
${JSON.stringify(toneTemplate, null, 2)}
` : ""}

REQUIRED JSON SCHEMA:
${JSON.stringify(definition.schema, null, 2)}

Generate creative, engaging content that:
1. Matches the company and industry context
2. Follows the specified tone
3. Validates against the schema
4. Is unique and compelling
5. Avoids generic placeholder text

Return ONLY valid JSON that matches the schema. No explanation or additional text.`;
  }

  /**
   * Build system prompt
   */
  private buildSystemPrompt(definition: ComponentDefinition): string {
    return `You are an expert UI content generator specializing in creating compelling, conversion-focused content for web components.

You understand:
- Marketing psychology and conversion optimization
- Industry-specific language and terminology
- Brand voice and tone adaptation
- JSON schema validation

Component: ${definition.name}
Category: ${definition.category}

Common patterns for this component:
${definition.aiHints.commonPatterns.join("\n")}

Always return valid JSON that exactly matches the provided schema.`;
  }

  /**
   * Fallback generation using templates
   */
  private generateWithFallback(
    definition: ComponentDefinition,
    context: GenerationContext
  ): any {
    console.log("🔄 Generating fallback content for:", definition.slug);
    console.log("📝 Using context:", context);

    // Start with default template
    let props = { ...definition.templates.default };

    // Priority 1: Product-specific context (highest priority)
    if (context.uniqueSellingPoints && context.uniqueSellingPoints.length > 0) {
      console.log("🎯 Using unique selling points:", context.uniqueSellingPoints);
      
      // For feature components, use the USPs as features
      if (definition.category === "feature" && definition.slug.includes("feature-three-cards")) {
        props = this.generateProductFeatures(context, definition);
        console.log("✨ Generated product-specific features:", props);
        return this.personalizeProps(props, context);
      }
    }

    // Priority 2: Check if we have a product name and selling intent (generate custom content)
    if (context.companyName && context.additionalContext && 
        context.additionalContext.toLowerCase().includes("selling")) {
      console.log("🛍️ Detected product selling context, generating custom content");
      
      if (definition.category === "feature" && definition.slug.includes("feature-three-cards")) {
        props = this.generateProductFeaturesFromContext(context, definition);
        console.log("🎨 Generated custom product features:", props);
        return this.personalizeProps(props, context);
      }
    }

    // Priority 3: Industry variations (lower priority, only if no product context)
    if (context.industry && definition.aiHints.industryVariations?.[context.industry]) {
      console.log("🏭 Using industry variations for:", context.industry);
      props = { ...props, ...definition.aiHints.industryVariations[context.industry] };
    }

    // Priority 4: Apply tone variations
    if (context.tone && definition.aiHints.toneVariations?.[context.tone]) {
      props = { ...props, ...definition.aiHints.toneVariations[context.tone] };
    }

    // Customize with company name
    props = this.personalizeProps(props, context);

    console.log("📄 Generated fallback props:", props);
    return props;
  }

  /**
   * Generate product-specific features from context
   */
  private generateProductFeatures(context: GenerationContext, definition: ComponentDefinition): any {
    const productName = context.companyName || "Product";
    const features = context.uniqueSellingPoints || [];
    
    // Create features based on USPs
    const generatedFeatures = features.slice(0, 3).map((feature, index) => {
      const icons = ["Zap", "Shield", "Star"];
      return {
        icon: icons[index] || "CheckCircle",
        title: feature,
        description: `${productName} offers ${feature.toLowerCase()} to give you the best experience possible.`
      };
    });

    // Fill remaining slots if needed
    while (generatedFeatures.length < 3) {
      const defaultFeatures = [
        { icon: "Heart", title: "Premium Quality", description: `${productName} is built with the highest quality materials.` },
        { icon: "Users", title: "Customer Focused", description: `${productName} is designed with customers in mind.` },
        { icon: "Award", title: "Proven Results", description: `${productName} delivers results you can count on.` }
      ];
      const nextFeature = defaultFeatures[generatedFeatures.length];
      if (nextFeature) generatedFeatures.push(nextFeature);
    }

    return {
      headline: `Why Choose ${productName}?`,
      subheadline: `Everything you need for the best experience`,
      features: generatedFeatures
    };
  }

  /**
   * Generate product features by analyzing context text intelligently
   */
  private generateProductFeaturesFromContext(context: GenerationContext, definition: ComponentDefinition): any {
    const productName = context.companyName || "Product";
    const contextText = context.additionalContext || "";
    
    console.log("🔍 Analyzing context for product features:", contextText);

    // Extract product details from context
    const productMatch = contextText.match(/selling\s+([^.]+?)(?:\s+(?:for|that|to)|\.|\,|$)/i);
    const product = productMatch ? productMatch[1].trim() : productName;
    
    // Extract intended use/benefit
    const benefitMatch = contextText.match(/(?:for|that|to)\s+([^.]+)/i);
    const benefit = benefitMatch ? benefitMatch[1].trim() : "better performance";
    
    console.log("🎯 Extracted product:", product);
    console.log("💡 Extracted benefit:", benefit);

    // Generate context-aware features
    let features = [];

    // Feature 1: Core product benefit
    features.push({
      icon: "Target",
      title: "Perfect for " + benefit.charAt(0).toUpperCase() + benefit.slice(1),
      description: `${product} is specifically designed to help with ${benefit}.`
    });

    // Feature 2: Quality/performance based on product type
    if (product.toLowerCase().includes("sock")) {
      features.push({
        icon: "Shield",
        title: "Durable & Comfortable",
        description: `Made with high-quality materials that provide comfort and durability for ${benefit}.`
      });
    } else {
      features.push({
        icon: "Zap",
        title: "High Performance",
        description: `Built for reliable performance that you can count on.`
      });
    }

    // Feature 3: User-focused benefit
    if (benefit.includes("stick")) {
      features.push({
        icon: "Lock",
        title: "Superior Grip",
        description: "Advanced grip technology keeps you secure and confident."
      });
    } else if (benefit.includes("surf")) {
      features.push({
        icon: "Waves",
        title: "Water Ready",
        description: "Designed to perform in wet conditions and water sports."
      });
    } else {
      features.push({
        icon: "Star",
        title: "Proven Results",
        description: `Join thousands who have improved their ${benefit.replace("better ", "")}.`
      });
    }

    return {
      headline: `Why Choose ${product}?`,
      subheadline: `The perfect solution for ${benefit}`,
      features: features
    };
  }

  /**
   * Personalize props with context
   */
  private personalizeProps(props: any, context: GenerationContext): any {
    const personalized = JSON.parse(JSON.stringify(props)); // Deep clone

    const replaceInObject = (obj: any): any => {
      if (typeof obj === "string") {
        return obj
          .replace(/\{companyName\}/g, context.companyName)
          .replace(/\{industry\}/g, context.industry || "business")
          .replace(/\{audience\}/g, context.targetAudience || "customers");
      } else if (Array.isArray(obj)) {
        return obj.map(item => replaceInObject(item));
      } else if (obj && typeof obj === "object") {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = replaceInObject(value);
        }
        return result;
      }
      return obj;
    };

    return replaceInObject(personalized);
  }

  /**
   * Generate cache key
   */
  private getCacheKey(componentSlug: string, context: GenerationContext): string {
    return `${componentSlug}-${context.companyName}-${context.industry}-${context.tone}`.toLowerCase();
  }

  /**
   * Get generation metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Batch generate multiple components
   */
  async batchGenerate(
    requests: ComponentGenerationRequest[]
  ): Promise<ComponentGenerationResponse[]> {
    // Process in parallel with max concurrency of 3
    const results: ComponentGenerationResponse[] = [];
    const batchSize = 3;

    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(request => this.generate(request))
      );
      results.push(...batchResults);
    }

    return results;
  }
}

// Singleton instance
export const componentGenerator = new AIComponentGenerator();