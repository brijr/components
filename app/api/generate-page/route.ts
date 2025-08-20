import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCompletePage } from "@/lib/ai/page-generator-service";
import { getPageTemplate, findBestTemplate } from "@/lib/page-templates/templates";
import { PageGenerationConfig } from "@/lib/page-templates/types";

// Request validation schema
const GeneratePageRequestSchema = z.object({
  templateId: z.string().optional(),
  companyName: z.string().min(1),
  industry: z.string().min(1),
  tone: z.string().min(1),
  description: z.string().optional(),
  targetAudience: z.string().optional(),
  uniqueSellingPoints: z.array(z.string()).optional(),
  competitors: z.array(z.string()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = GeneratePageRequestSchema.safeParse(body);
    
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
      competitors
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

    // Create generation config
    const config: PageGenerationConfig = {
      template,
      companyName,
      industry,
      tone,
      additionalContext: description,
      targetAudience,
      uniqueSellingPoints,
      competitors
    };

    // Generate the complete page
    console.log(`Generating ${template.name} page for ${companyName}...`);
    const page = await generateCompletePage(config);

    // Validate we got a complete page
    if (!page.sections || page.sections.length < template.minSections) {
      console.warn(
        `Generated page has only ${page.sections?.length || 0} sections, ` +
        `expected at least ${template.minSections}`
      );
    }

    // Log success
    console.log(
      `Successfully generated page with ${page.sections.length} sections ` +
      `using template: ${template.id}`
    );

    return NextResponse.json({
      success: true,
      page,
      template: {
        id: template.id,
        name: template.name,
        sectionsGenerated: page.sections.length,
        expectedSections: template.sections.length
      }
    });

  } catch (error) {
    console.error("Page generation error:", error);
    
    // Return a detailed error response
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

// GET endpoint to retrieve available templates
export async function GET() {
  const templates = [
    {
      id: "saas-landing",
      name: "SaaS Product Landing",
      description: "Complete landing page for software products",
      sections: 7,
      industries: ["technology", "software", "startup"]
    },
    {
      id: "ecommerce-landing",
      name: "E-commerce Product Page",
      description: "Product showcase page with reviews and offers",
      sections: 6,
      industries: ["ecommerce", "retail", "fashion"]
    },
    {
      id: "agency-landing",
      name: "Agency/Consultancy",
      description: "Professional services page with case studies",
      sections: 7,
      industries: ["agency", "consulting", "services"]
    },
    {
      id: "startup-landing",
      name: "Startup Launch",
      description: "High-energy launch page for new products",
      sections: 6,
      industries: ["startup", "technology", "innovation"]
    },
    {
      id: "course-landing",
      name: "Online Course",
      description: "Educational course or program landing page",
      sections: 7,
      industries: ["education", "training", "coaching"]
    }
  ];

  return NextResponse.json({ templates });
}