import { NextRequest, NextResponse } from "next/server";
import { 
  componentGenerator, 
  ComponentGenerationRequestSchema 
} from "@/lib/ai/component-generator";
import { z } from "zod";

/**
 * POST /api/generate-component
 * Generate component props using AI
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    const validation = ComponentGenerationRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Generate component
    const result = await componentGenerator.generate(validation.data);

    // Return response with appropriate status
    const status = result.success ? 200 : 422;
    
    return NextResponse.json(result, { status });

  } catch (error) {
    console.error("Component generation error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate component",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate-component
 * Get generation metrics and info
 */
export async function GET() {
  const metrics = componentGenerator.getMetrics();
  
  return NextResponse.json({
    status: "ready",
    anthropicConfigured: !!process.env.ANTHROPIC_API_KEY,
    metrics,
    info: {
      endpoint: "/api/generate-component",
      method: "POST",
      body: {
        componentSlug: "string (required)",
        context: {
          companyName: "string (required)",
          industry: "string (optional)",
          tone: "professional | casual | playful | serious | bold | minimal (optional)",
          targetAudience: "string (optional)",
          additionalContext: "string (optional)",
          keywords: "string[] (optional)",
        },
        options: {
          useCache: "boolean (default: true)",
          maxRetries: "number 1-3 (default: 2)",
          temperature: "number 0-1 (default: 0.7)",
          includeVariations: "boolean (default: false)",
        },
      },
      example: {
        componentSlug: "hero-minimal",
        context: {
          companyName: "TechStartup",
          industry: "saas",
          tone: "professional",
          targetAudience: "developers",
          additionalContext: "AI-powered code editor",
        },
      },
    },
  });
}