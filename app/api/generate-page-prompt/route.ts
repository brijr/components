import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { 
  PromptPageGenerationRequestSchema,
  aiPageGenerator 
} from "@/lib/ai/ai-page-generator";
import { promptAnalyzer } from "@/lib/ai/prompt-analyzer";

/**
 * Request schema for prompt-based page generation
 */
const GeneratePagePromptRequestSchema = z.object({
  prompt: z.string().min(10).max(2000),
  options: z.object({
    useAI: z.boolean().default(true),
    useCache: z.boolean().default(true),
    temperature: z.number().min(0).max(1).default(0.7),
    autoEnhance: z.boolean().default(true),
    showExtractedContext: z.boolean().default(false),
  }).optional(),
});

/**
 * POST endpoint for prompt-based page generation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = GeneratePagePromptRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Invalid request", 
          details: validation.error.flatten() 
        },
        { status: 400 }
      );
    }

    const { prompt, options } = validation.data;

    // Extract context from prompt first (for debugging/transparency)
    const extractedContext = promptAnalyzer.analyze(prompt);
    const enhancedContext = options?.autoEnhance !== false 
      ? promptAnalyzer.enhance(extractedContext)
      : extractedContext;

    console.log(`🤖 Prompt-based generation: "${prompt.substring(0, 100)}..."`);
    console.log(`📊 Extracted context:`, {
      company: enhancedContext.companyName,
      industry: enhancedContext.industry,
      tone: enhancedContext.tone,
      template: enhancedContext.suggestedTemplate,
      sections: enhancedContext.numberOfSections,
    });

    // Generate the page
    const startTime = Date.now();
    
    const result = await aiPageGenerator.generatePageFromPrompt({
      prompt,
      extractedContext: enhancedContext,
      options: {
        useAI: options?.useAI !== false,
        useCache: options?.useCache !== false,
        temperature: options?.temperature || 0.7,
        autoEnhance: false, // Already enhanced above
      },
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    if (!result.success || !result.page) {
      console.error("❌ Prompt generation failed:", result.error);
      return NextResponse.json(
        {
          error: "Failed to generate page",
          message: result.error || "Unknown error",
        },
        { status: 500 }
      );
    }

    // Log success
    console.log(
      `✅ Prompt generation complete in ${duration}ms:`,
      `\n  - Sections: ${result.metadata?.sectionsGenerated}`,
      `\n  - AI sections: ${result.metadata?.aiSectionsCount}`,
      `\n  - Method: prompt-based`
    );

    // Prepare response
    const response: any = {
      success: true,
      page: result.page,
      metadata: {
        ...result.metadata,
        duration,
        promptLength: prompt.length,
      },
    };

    // Optionally include extracted context for debugging
    if (options?.showExtractedContext) {
      response.extractedContext = enhancedContext;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error("Prompt generation error:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate page from prompt",
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
 * GET endpoint to check prompt analyzer capabilities
 */
export async function GET() {
  // Example prompts for testing
  const examplePrompts = [
    "Create a landing page for TechFlow, an AI-powered project management tool for developers",
    "I need a simple page for my bakery shop with menu and online ordering",
    "Build a professional website for our law firm Johnson & Associates",
    "Launch page for our new fitness app that helps people track workouts",
    "Educational platform for online courses about web development",
  ];

  // Analyze each example
  const analyses = examplePrompts.map(prompt => ({
    prompt,
    extracted: promptAnalyzer.analyze(prompt),
  }));

  return NextResponse.json({
    description: "Prompt-based page generation with natural language understanding",
    capabilities: {
      contextExtraction: [
        "Company/product name detection",
        "Industry inference",
        "Tone analysis",
        "Feature extraction",
        "Target audience identification",
        "Template suggestion",
        "Section count optimization",
      ],
      supportedTones: [
        "professional",
        "casual",
        "playful",
        "serious",
        "bold",
        "minimal"
      ],
      templates: [
        "saas-landing",
        "ecommerce-landing",
        "agency-landing",
        "startup-landing",
        "course-landing"
      ],
    },
    examples: analyses,
    usage: {
      endpoint: "POST /api/generate-page-prompt",
      body: {
        prompt: "Your natural language description",
        options: {
          useAI: true,
          useCache: true,
          temperature: 0.7,
          autoEnhance: true,
          showExtractedContext: false,
        }
      }
    }
  });
}