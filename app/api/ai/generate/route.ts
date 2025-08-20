import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SimplePage } from "@/lib/schemas/page-simple.schema";
import { registry } from "@/registry";
import { generateComponentProps } from "@/lib/ai/helpers";
import { getComponentTemplate } from "@/lib/ai/templates";

const GenerateRequestSchema = z.object({
  prompt: z.string().min(1),
  componentType: z.enum(["hero", "feature", "pricing", "testimonial", "cta", "footer"]).optional(),
  mode: z.enum(["component", "page"]).default("component"),
  industry: z.string().optional(),
  tone: z.enum(["professional", "casual", "playful", "serious"]).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = GenerateRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { prompt, componentType, mode, industry, tone } = validation.data;

    // Determine component type from prompt if not specified
    const detectedType = componentType || detectComponentType(prompt);
    
    // Select appropriate component(s) based on mode
    if (mode === "page") {
      const page = await generateFullPage(prompt, industry, tone);
      return NextResponse.json({ page });
    } else {
      const page = await generateSingleComponent(prompt, detectedType, industry, tone);
      return NextResponse.json({ page });
    }
  } catch (error) {
    console.error("AI generation error:", error);
    
    // Return a fallback response with example data
    const fallbackPage = createFallbackPage();
    return NextResponse.json({ 
      page: fallbackPage,
      warning: "Using fallback data. AI generation will be implemented soon."
    });
  }
}

function detectComponentType(prompt: string): "hero" | "feature" | "pricing" | "testimonial" | "cta" | "footer" {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("hero") || lowerPrompt.includes("headline") || lowerPrompt.includes("banner")) {
    return "hero";
  }
  if (lowerPrompt.includes("feature") || lowerPrompt.includes("benefit") || lowerPrompt.includes("capability")) {
    return "feature";
  }
  if (lowerPrompt.includes("pricing") || lowerPrompt.includes("plan") || lowerPrompt.includes("tier")) {
    return "pricing";
  }
  if (lowerPrompt.includes("testimonial") || lowerPrompt.includes("review") || lowerPrompt.includes("customer")) {
    return "testimonial";
  }
  if (lowerPrompt.includes("cta") || lowerPrompt.includes("call to action") || lowerPrompt.includes("signup")) {
    return "cta";
  }
  if (lowerPrompt.includes("footer")) {
    return "footer";
  }
  
  return "hero"; // Default to hero
}

async function generateSingleComponent(
  prompt: string, 
  componentType: string,
  industry?: string,
  tone?: string
): Promise<SimplePage> {
  // Find suitable components of this type
  const components = registry.filter(c => c.type === componentType);
  
  if (components.length === 0) {
    throw new Error(`No components found for type: ${componentType}`);
  }

  // Select the most appropriate component based on prompt
  const selectedComponent = selectBestComponent(components, prompt);
  
  // Generate props for the component
  const props = await generateComponentProps(
    selectedComponent,
    prompt,
    { industry, tone }
  );

  return {
    id: `ai-${Date.now()}`,
    title: "AI Generated Component",
    slug: "ai-generated",
    sections: [{
      id: "section-1",
      componentSlug: selectedComponent.slug,
      props,
      order: 0,
      visible: true
    }],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: "ai",
      prompt,
      version: 1
    }
  };
}

async function generateFullPage(
  prompt: string,
  industry?: string,
  tone?: string
): Promise<SimplePage> {
  // Analyze prompt to determine page structure
  const pageStructure = analyzePageRequirements(prompt);
  
  const sections = [];
  let order = 0;

  // Add hero section
  if (pageStructure.includeHero) {
    const heroComponent = registry.find(c => c.slug === "hero-minimal");
    if (heroComponent) {
      sections.push({
        id: `section-${++order}`,
        componentSlug: heroComponent.slug,
        props: await generateComponentProps(heroComponent, prompt, { industry, tone }),
        order,
        visible: true
      });
    }
  }

  // Add feature section
  if (pageStructure.includeFeatures) {
    const featureComponent = registry.find(c => c.slug === "feature-three-cards");
    if (featureComponent) {
      sections.push({
        id: `section-${++order}`,
        componentSlug: featureComponent.slug,
        props: await generateComponentProps(featureComponent, prompt, { industry, tone }),
        order,
        visible: true
      });
    }
  }

  // Add testimonial section
  if (pageStructure.includeTestimonials) {
    const testimonialComponent = registry.find(c => c.slug === "testimonial-grid");
    if (testimonialComponent) {
      sections.push({
        id: `section-${++order}`,
        componentSlug: testimonialComponent.slug,
        props: await generateComponentProps(testimonialComponent, prompt, { industry, tone }),
        order,
        visible: true
      });
    }
  }

  // Add CTA section
  if (pageStructure.includeCTA) {
    const ctaComponent = registry.find(c => c.slug === "cta-single");
    if (ctaComponent) {
      sections.push({
        id: `section-${++order}`,
        componentSlug: ctaComponent.slug,
        props: await generateComponentProps(ctaComponent, prompt, { industry, tone }),
        order,
        visible: true
      });
    }
  }

  return {
    id: `ai-page-${Date.now()}`,
    title: "AI Generated Page",
    slug: "ai-generated-page",
    sections,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: "ai",
      prompt,
      version: 1
    }
  };
}

function selectBestComponent(components: typeof registry, prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Look for specific component indicators in the prompt
  for (const component of components) {
    const slug = component.slug.toLowerCase();
    const name = component.name.toLowerCase();
    
    if (lowerPrompt.includes(slug) || lowerPrompt.includes(name)) {
      return component;
    }
  }
  
  // Check for specific keywords
  if (lowerPrompt.includes("minimal") || lowerPrompt.includes("simple")) {
    const minimal = components.find(c => c.slug.includes("minimal"));
    if (minimal) return minimal;
  }
  
  if (lowerPrompt.includes("video")) {
    const video = components.find(c => c.slug.includes("video"));
    if (video) return video;
  }
  
  if (lowerPrompt.includes("image") || lowerPrompt.includes("screenshot")) {
    const image = components.find(c => c.slug.includes("image"));
    if (image) return image;
  }
  
  if (lowerPrompt.includes("form") || lowerPrompt.includes("signup")) {
    const form = components.find(c => c.slug.includes("form"));
    if (form) return form;
  }
  
  // Default to first component
  return components[0];
}

function analyzePageRequirements(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  
  return {
    includeHero: true, // Always include a hero
    includeFeatures: lowerPrompt.includes("feature") || lowerPrompt.includes("benefit") || lowerPrompt.includes("complete"),
    includeTestimonials: lowerPrompt.includes("testimonial") || lowerPrompt.includes("review") || lowerPrompt.includes("complete"),
    includePricing: lowerPrompt.includes("pricing") || lowerPrompt.includes("plan"),
    includeCTA: lowerPrompt.includes("cta") || lowerPrompt.includes("signup") || lowerPrompt.includes("complete"),
    includeFooter: lowerPrompt.includes("footer") || lowerPrompt.includes("complete")
  };
}

function createFallbackPage(): SimplePage {
  const heroComponent = registry.find(c => c.slug === "hero-minimal");
  
  if (!heroComponent) {
    throw new Error("No hero component found in registry");
  }

  return {
    id: `fallback-${Date.now()}`,
    title: "AI Playground Demo",
    slug: "ai-playground-demo",
    sections: [{
      id: "section-1",
      componentSlug: heroComponent.slug,
      props: {
        headline: "AI-Powered Component Generation",
        subheadline: "Transform your ideas into beautiful React components with natural language",
        primaryCTA: {
          text: "Get Started",
          href: "/contact"
        },
        secondaryCTA: {
          text: "Learn More",
          href: "/docs"
        }
      },
      order: 0,
      visible: true
    }],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: "ai",
      version: 1
    }
  };
}