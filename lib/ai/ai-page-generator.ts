/**
 * AI Page Generator Service
 * Orchestrates intelligent multi-section page generation with progressive context
 */

import { 
  ComponentGenerationRequest,
  ComponentGenerationResponse,
  componentGenerator 
} from "./component-generator";
import { 
  ComponentDefinition,
  GenerationContext
} from "@/lib/schemas/component-schemas/types";
import { getComponentDefinition } from "@/lib/schemas/component-schemas";
import { SimplePage, GeneratedSection } from "@/lib/schemas/page-simple.schema";
import { PageTemplate } from "@/lib/page-templates/types";
import { z } from "zod";

/**
 * AI Page Generation Request Schema
 */
export const AIPageGenerationRequestSchema = z.object({
  template: z.object({
    id: z.string(),
    name: z.string(),
    sections: z.array(z.object({
      componentSlug: z.string(),
      order: z.number(),
      contentGuidance: z.string().optional(),
      variations: z.array(z.string()).optional(),
    })),
  }),
  context: z.object({
    companyName: z.string(),
    industry: z.string(),
    tone: z.enum(["professional", "casual", "playful", "serious", "bold", "minimal"]),
    targetAudience: z.string().optional(),
    additionalContext: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    uniqueSellingPoints: z.array(z.string()).optional(),
  }),
  options: z.object({
    useAI: z.boolean().default(true),
    useCache: z.boolean().default(true),
    maxRetries: z.number().min(1).max(3).default(2),
    temperature: z.number().min(0).max(1).default(0.7),
    progressCallback: z.function().optional(),
  }).optional(),
});

export type AIPageGenerationRequest = z.infer<typeof AIPageGenerationRequestSchema>;

/**
 * Progressive context that builds as we generate sections
 */
interface ProgressiveContext {
  companyName: string;
  industry: string;
  tone: string;
  targetAudience?: string;
  sectionsSoFar: {
    componentSlug: string;
    headline?: string;
    subheadline?: string;
    keyPoints?: string[];
    features?: string[];
    benefits?: string[];
  }[];
  mentionedFeatures: Set<string>;
  mentionedBenefits: Set<string>;
  usedCTAs: Set<string>;
  primaryMessage?: string;
  valueProposition?: string;
}

/**
 * AI Page Generation Response
 */
export interface AIPageGenerationResponse {
  success: boolean;
  page?: SimplePage;
  metadata?: {
    sectionsGenerated: number;
    aiSectionsCount: number;
    fallbackSectionsCount: number;
    totalGenerationTime: number;
    averageTimePerSection: number;
    tokensUsed?: number;
  };
  error?: string;
  warnings?: string[];
}

/**
 * AI Page Generator Class
 */
export class AIPageGenerator {
  private componentGenerator = componentGenerator;

  /**
   * Generate a complete page with AI-powered content
   */
  async generatePage(request: AIPageGenerationRequest): Promise<AIPageGenerationResponse> {
    const startTime = Date.now();
    const warnings: string[] = [];
    
    try {
      // Validate request
      const validatedRequest = AIPageGenerationRequestSchema.parse(request);
      const { template, context, options } = validatedRequest;

      // Initialize progressive context
      const progressiveContext: ProgressiveContext = {
        companyName: context.companyName,
        industry: context.industry,
        tone: context.tone,
        targetAudience: context.targetAudience,
        sectionsSoFar: [],
        mentionedFeatures: new Set(),
        mentionedBenefits: new Set(),
        usedCTAs: new Set(),
      };

      // Extract primary message from additional context
      if (context.additionalContext) {
        progressiveContext.primaryMessage = this.extractPrimaryMessage(context.additionalContext);
        progressiveContext.valueProposition = this.extractValueProposition(
          context.additionalContext,
          context.industry
        );
      }

      // Generate sections progressively
      const sections: GeneratedSection[] = [];
      let aiSectionsCount = 0;
      let fallbackSectionsCount = 0;
      let totalTokensUsed = 0;

      for (const sectionDef of template.sections) {
        try {
          // Report progress
          if (options?.progressCallback) {
            options.progressCallback({
              current: sections.length,
              total: template.sections.length,
              currentSection: sectionDef.componentSlug,
            });
          }

          // Generate section with progressive context
          const sectionResult = await this.generateSection(
            sectionDef,
            progressiveContext,
            context,
            options
          );

          if (sectionResult.section) {
            sections.push(sectionResult.section);
            
            // Update metrics
            if (sectionResult.generatedBy === "ai") {
              aiSectionsCount++;
            } else {
              fallbackSectionsCount++;
            }
            
            if (sectionResult.tokensUsed) {
              totalTokensUsed += sectionResult.tokensUsed;
            }

            // Extract context from generated section
            this.updateProgressiveContext(
              progressiveContext,
              sectionResult.section,
              sectionDef.componentSlug
            );
          } else if (sectionResult.warning) {
            warnings.push(sectionResult.warning);
          }
        } catch (error) {
          const errorMsg = `Failed to generate ${sectionDef.componentSlug}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`;
          warnings.push(errorMsg);
          console.error(errorMsg);
        }
      }

      // Ensure we have enough sections
      if (sections.length < 3) {
        warnings.push(`Only generated ${sections.length} sections, minimum recommended is 3`);
      }

      // Create the page
      const page: SimplePage = {
        id: `ai-page-${Date.now()}`,
        title: `${context.companyName} - ${progressiveContext.primaryMessage || template.name}`,
        slug: context.companyName.toLowerCase().replace(/\s+/g, "-"),
        sections,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          generatedBy: "ai",
          prompt: context.additionalContext,
          version: 1,
        },
      };

      const totalTime = Date.now() - startTime;

      return {
        success: true,
        page,
        metadata: {
          sectionsGenerated: sections.length,
          aiSectionsCount,
          fallbackSectionsCount,
          totalGenerationTime: totalTime,
          averageTimePerSection: Math.round(totalTime / sections.length),
          tokensUsed: totalTokensUsed || undefined,
        },
        warnings: warnings.length > 0 ? warnings : undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Generate a single section with progressive context awareness
   */
  private async generateSection(
    sectionDef: any,
    progressiveContext: ProgressiveContext,
    baseContext: AIPageGenerationRequest["context"],
    options?: AIPageGenerationRequest["options"]
  ): Promise<{
    section?: GeneratedSection;
    generatedBy?: "ai" | "fallback";
    tokensUsed?: number;
    warning?: string;
  }> {
    // Find the component definition
    let componentSlug = sectionDef.componentSlug;
    let definition = getComponentDefinition(componentSlug);

    // Try variations if primary not found
    if (!definition && sectionDef.variations?.length > 0) {
      for (const variation of sectionDef.variations) {
        definition = getComponentDefinition(variation);
        if (definition) {
          componentSlug = variation;
          break;
        }
      }
    }

    if (!definition) {
      return {
        warning: `Component definition not found: ${sectionDef.componentSlug}`,
      };
    }

    // Build enriched context for this section
    const enrichedContext = this.buildEnrichedContext(
      baseContext,
      progressiveContext,
      sectionDef,
      definition
    );

    // Generate with AI if enabled
    if (options?.useAI !== false) {
      const generationRequest: ComponentGenerationRequest = {
        componentSlug,
        context: enrichedContext,
        options: {
          useCache: options?.useCache !== false,
          maxRetries: options?.maxRetries || 2,
          temperature: options?.temperature || 0.7,
        },
      };

      const response = await this.componentGenerator.generate(generationRequest);

      if (response.success && response.props) {
        return {
          section: {
            id: `section-${Date.now()}-${sectionDef.order}`,
            componentSlug,
            props: response.props,
            order: sectionDef.order,
            visible: true,
          },
          generatedBy: response.metadata?.generatedBy === "claude" ? "ai" : "fallback",
          tokensUsed: response.metadata?.tokensUsed,
        };
      }
    }

    // Fallback to template-based generation
    const fallbackProps = this.generateFallbackProps(definition, enrichedContext);
    
    return {
      section: {
        id: `section-${Date.now()}-${sectionDef.order}`,
        componentSlug,
        props: fallbackProps,
        order: sectionDef.order,
        visible: true,
      },
      generatedBy: "fallback",
    };
  }

  /**
   * Build enriched context for section generation
   */
  private buildEnrichedContext(
    baseContext: AIPageGenerationRequest["context"],
    progressiveContext: ProgressiveContext,
    sectionDef: any,
    definition: ComponentDefinition
  ): GenerationContext {
    // Start with base context
    const enrichedContext: GenerationContext = {
      companyName: baseContext.companyName,
      industry: baseContext.industry,
      tone: baseContext.tone as any,
      targetAudience: baseContext.targetAudience,
      keywords: baseContext.keywords,
    };

    // Add progressive context hints
    let additionalContext = baseContext.additionalContext || "";

    // Add section-specific guidance
    if (sectionDef.contentGuidance) {
      additionalContext += `\n${sectionDef.contentGuidance}`;
    }

    // Add context from previous sections
    if (progressiveContext.sectionsSoFar.length > 0) {
      additionalContext += "\n\nPrevious sections context:";
      
      progressiveContext.sectionsSoFar.forEach((section, index) => {
        if (section.headline) {
          additionalContext += `\n- Section ${index + 1} (${section.componentSlug}): ${section.headline}`;
        }
        
        // For feature sections, mention what features we've already covered
        if (section.features && section.features.length > 0) {
          additionalContext += `\n  Features mentioned: ${section.features.join(", ")}`;
        }
      });

      // Ensure we don't repeat features or benefits
      if (definition.category === "feature" && progressiveContext.mentionedFeatures.size > 0) {
        additionalContext += `\n\nAvoid repeating these features: ${Array.from(progressiveContext.mentionedFeatures).join(", ")}`;
      }

      // Maintain consistent value proposition
      if (progressiveContext.valueProposition) {
        additionalContext += `\n\nCore value proposition to maintain: ${progressiveContext.valueProposition}`;
      }

      // For CTA sections, avoid repeating CTAs
      if (definition.category === "cta" && progressiveContext.usedCTAs.size > 0) {
        additionalContext += `\n\nAlready used CTAs: ${Array.from(progressiveContext.usedCTAs).join(", ")}. Please use different wording.`;
      }
    }

    // Add unique selling points for feature/benefit sections
    if ((definition.category === "feature" || definition.category === "hero") && baseContext.uniqueSellingPoints) {
      const unusedUSPs = baseContext.uniqueSellingPoints.filter(
        usp => !progressiveContext.mentionedBenefits.has(usp)
      );
      if (unusedUSPs.length > 0) {
        additionalContext += `\n\nKey benefits to highlight: ${unusedUSPs.slice(0, 3).join(", ")}`;
      }
    }

    enrichedContext.additionalContext = additionalContext;

    return enrichedContext;
  }

  /**
   * Update progressive context with information from generated section
   */
  private updateProgressiveContext(
    progressiveContext: ProgressiveContext,
    section: GeneratedSection,
    componentSlug: string
  ) {
    const props = section.props;
    const sectionContext: any = {
      componentSlug,
    };

    // Extract headline/title
    if (props.headline) {
      sectionContext.headline = props.headline;
    } else if (props.title) {
      sectionContext.headline = props.title;
    }

    // Extract subheadline/subtitle
    if (props.subheadline) {
      sectionContext.subheadline = props.subheadline;
    } else if (props.subtitle) {
      sectionContext.subheadline = props.subtitle;
    }

    // Extract features
    if (props.features && Array.isArray(props.features)) {
      sectionContext.features = props.features.map((f: any) => f.title || f.name || f.heading);
      sectionContext.features.forEach((f: string) => progressiveContext.mentionedFeatures.add(f));
    }

    // Extract benefits from various prop structures
    if (props.benefits && Array.isArray(props.benefits)) {
      sectionContext.benefits = props.benefits.map((b: any) => b.title || b.name || b);
      sectionContext.benefits.forEach((b: string) => progressiveContext.mentionedBenefits.add(b));
    }

    // Track CTAs
    if (props.primaryCTA?.text) {
      progressiveContext.usedCTAs.add(props.primaryCTA.text);
    }
    if (props.secondaryCTA?.text) {
      progressiveContext.usedCTAs.add(props.secondaryCTA.text);
    }
    if (props.cta?.text) {
      progressiveContext.usedCTAs.add(props.cta.text);
    }

    // Add key points from content
    if (props.content) {
      sectionContext.keyPoints = this.extractKeyPoints(props.content);
    }

    progressiveContext.sectionsSoFar.push(sectionContext);
  }

  /**
   * Generate fallback props when AI is unavailable
   */
  private generateFallbackProps(
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

    // Personalize with company name
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
          .replace(/{companyName}/g, context.companyName)
          .replace(/{industry}/g, context.industry || "business")
          .replace(/{audience}/g, context.targetAudience || "customers");
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
   * Extract primary message from context
   */
  private extractPrimaryMessage(text: string): string {
    // Simple extraction - take first sentence or line
    const firstLine = text.split("\n")[0];
    const firstSentence = firstLine.split(".")[0];
    return firstSentence.length > 10 ? firstSentence : firstLine;
  }

  /**
   * Extract value proposition
   */
  private extractValueProposition(text: string, industry: string): string {
    // Look for key phrases that indicate value prop
    const valuePhrases = [
      /we help/i,
      /our mission/i,
      /we provide/i,
      /we offer/i,
      /designed to/i,
      /built for/i,
    ];

    for (const phrase of valuePhrases) {
      const match = text.match(new RegExp(`.*${phrase.source}.*`, "i"));
      if (match) {
        return match[0];
      }
    }

    // Fallback to a generic value prop
    return `Leading ${industry} solution for modern businesses`;
  }

  /**
   * Extract key points from content
   */
  private extractKeyPoints(content: string): string[] {
    const points: string[] = [];
    
    // Split by common delimiters
    const lines = content.split(/[.\n]/);
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 20 && trimmed.length < 200) {
        points.push(trimmed);
      }
      if (points.length >= 3) break;
    }

    return points;
  }

  /**
   * Generate multiple pages in batch
   */
  async batchGeneratePages(
    requests: AIPageGenerationRequest[]
  ): Promise<AIPageGenerationResponse[]> {
    // Process with limited concurrency
    const results: AIPageGenerationResponse[] = [];
    const batchSize = 2; // Limit concurrent generations

    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(request => this.generatePage(request))
      );
      results.push(...batchResults);
    }

    return results;
  }
}

// Singleton instance
export const aiPageGenerator = new AIPageGenerator();