import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { 
  AIPageGenerationRequestSchema,
  aiPageGenerator 
} from "@/lib/ai/ai-page-generator";
import { getPageTemplate, findBestTemplate } from "@/lib/page-templates/templates";

/**
 * Enhanced request schema for AI page generation
 */
const GeneratePageAIRequestSchema = z.object({
  templateId: z.string().optional(),
  companyName: z.string().min(1),
  industry: z.string().min(1),
  tone: z.enum(["professional", "casual", "playful", "serious", "bold", "minimal"]),
  description: z.string().optional(),
  targetAudience: z.string().optional(),
  uniqueSellingPoints: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  useAI: z.boolean().default(true),
  useCache: z.boolean().default(true),
  temperature: z.number().min(0).max(1).default(0.7),
});

/**
 * POST endpoint for AI-powered page generation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = GeneratePageAIRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Invalid request", 
          details: validation.error.flatten() 
        },
        { status: 400 }
      );
    }

    const {
      templateId,
      companyName,
      industry,
      tone,
      description,
      targetAudience,
      uniqueSellingPoints,
      keywords,
      useAI,
      useCache,
      temperature,
    } = validation.data;

    // Get or find the appropriate template
    let template;
    if (templateId) {
      template = getPageTemplate(templateId);
      if (!template) {
        return NextResponse.json(
          { error: `Template not found: ${templateId}` },
          { status: 404 }
        );
      }
    } else {
      // Find best template based on description and industry
      const searchText = `${description || ""} ${industry}`;
      template = findBestTemplate(searchText);
    }

    // Prepare AI generation request
    const aiRequest = {
      template: {
        id: template.id,
        name: template.name,
        sections: template.sections.map(s => ({
          componentSlug: s.componentSlug,
          order: s.order,
          contentGuidance: s.contentGuidance,
          variations: s.variations,
        })),
      },
      context: {
        companyName,
        industry,
        tone,
        targetAudience,
        additionalContext: description,
        keywords,
        uniqueSellingPoints,
      },
      options: {
        useAI,
        useCache,
        temperature,
      },
    };

    // Generate the page with AI
    console.log(`🤖 AI Generation: ${template.name} page for ${companyName}`);
    const startTime = Date.now();
    
    const result = await aiPageGenerator.generatePage(aiRequest);
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!result.success || !result.page) {
      console.error("❌ AI generation failed:", result.error);
      return NextResponse.json(
        {
          error: "Failed to generate page",
          message: result.error || "Unknown error",
          warnings: result.warnings,
        },
        { status: 500 }
      );
    }

    // Log success with metrics
    console.log(
      `✅ AI Generation complete in ${duration}ms:`,
      `\n  - Sections: ${result.metadata?.sectionsGenerated}`,
      `\n  - AI sections: ${result.metadata?.aiSectionsCount}`,
      `\n  - Fallback sections: ${result.metadata?.fallbackSectionsCount}`,
      result.metadata?.tokensUsed ? `\n  - Tokens used: ${result.metadata.tokensUsed}` : ""
    );

    // Return successful response
    return NextResponse.json({
      success: true,
      page: result.page,
      template: {
        id: template.id,
        name: template.name,
        sectionsGenerated: result.metadata?.sectionsGenerated,
        expectedSections: template.sections.length,
      },
      metadata: {
        ...result.metadata,
        generationMethod: "ai",
        templateUsed: template.id,
        duration,
      },
      warnings: result.warnings,
    });

  } catch (error) {
    console.error("AI Page generation error:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate page",
        message: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" 
          ? (error as Error).stack 
          : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check AI availability and configuration
 */
export async function GET() {
  const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
  
  return NextResponse.json({
    aiEnabled: hasAnthropicKey,
    features: {
      progressiveContext: true,
      coherentContent: true,
      multiSectionGeneration: true,
      industrySpecific: true,
      toneAdaptation: true,
      fallbackSupport: true,
      caching: true,
    },
    supportedTones: [
      "professional",
      "casual", 
      "playful",
      "serious",
      "bold",
      "minimal"
    ],
    maxSectionsPerPage: 10,
    averageGenerationTime: "5-15 seconds",
    description: "AI-powered page generation with progressive context building for coherent, multi-section landing pages",
  });
}