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
        try {
          props = await this.generateWithClaude(definition, context, options);
          this.metrics.claudeGenerations++;
        } catch (error) {
          console.warn("Claude generation failed, using fallback:", error);
          props = this.generateWithFallback(definition, context);
          generatedBy = "fallback";
          this.metrics.fallbackGenerations++;
        }
      } else {
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
    // Start with default template
    let props = { ...definition.templates.default };

    // Apply industry variations
    if (context.industry && definition.aiHints.industryVariations?.[context.industry]) {
      props = { ...props, ...definition.aiHints.industryVariations[context.industry] };
    }

    // Apply tone variations
    if (context.tone && definition.aiHints.toneVariations?.[context.tone]) {
      props = { ...props, ...definition.aiHints.toneVariations[context.tone] };
    }

    // Customize with company name
    props = this.personalizeProps(props, context);

    return props;
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