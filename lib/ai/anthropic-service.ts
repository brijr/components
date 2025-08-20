/**
 * Anthropic AI Service for component generation
 */

import Anthropic from "@anthropic-ai/sdk";
import { getComponentTemplate } from "./templates";
import { sanitizeProps } from "./helpers";
import { registry } from "@/registry";

// Initialize Anthropic client (API key should be in env)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface GenerateWithClaudeOptions {
  prompt: string;
  componentType?: string;
  mode?: "component" | "page";
  industry?: string;
  tone?: string;
}

/**
 * Generate component props using Claude
 */
export async function generateWithClaude(
  options: GenerateWithClaudeOptions
): Promise<any> {
  const { prompt, componentType, mode = "component", industry, tone } = options;

  // If no API key, return null to fall back to template system
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("No Anthropic API key found, using fallback system");
    return null;
  }

  try {
    // Construct the system prompt
    const systemPrompt = constructSystemPrompt(componentType, mode);
    
    // Construct the user prompt with context
    const userPrompt = constructUserPrompt(prompt, industry, tone);

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Fast and cost-effective for this use case
      max_tokens: 2000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt
        }
      ]
    });

    // Parse Claude's response
    const content = response.content[0];
    if (content.type === "text") {
      const parsed = parseClaudeResponse(content.text);
      return sanitizeProps(parsed);
    }

    return null;
  } catch (error) {
    console.error("Claude API error:", error);
    return null;
  }
}

/**
 * Construct system prompt for Claude
 */
function constructSystemPrompt(componentType?: string, mode?: string): string {
  const basePrompt = `You are an expert UI component generator for a React/Next.js component library.
Your task is to generate appropriate props for marketing website components.

IMPORTANT RULES:
1. Return ONLY valid JSON - no markdown, no explanations
2. Follow the exact prop structure for each component type
3. Use professional, engaging marketing copy
4. Keep text concise and impactful
5. All CTAs must have both 'text' and 'href' properties
6. Never use placeholder text like "Lorem ipsum"
7. Create realistic, industry-appropriate content`;

  if (mode === "page") {
    return `${basePrompt}

For page generation:
- Return an array of component configurations
- Each should have: componentSlug, props
- Order components logically (hero first, footer last)
- Ensure good flow between sections`;
  }

  if (componentType) {
    const components = registry.filter(c => c.type === componentType);
    const availableComponents = components.map(c => c.slug).join(", ");
    
    return `${basePrompt}

Available ${componentType} components: ${availableComponents}

Return JSON in this format:
{
  "componentSlug": "selected-component-slug",
  "props": {
    // component-specific props
  }
}`;
  }

  return basePrompt;
}

/**
 * Construct user prompt with context
 */
function constructUserPrompt(prompt: string, industry?: string, tone?: string): string {
  let contextualPrompt = prompt;
  
  if (industry) {
    contextualPrompt += `\n\nIndustry context: ${industry}`;
  }
  
  if (tone) {
    contextualPrompt += `\nTone: ${tone}`;
  }

  // Add examples of expected output format
  contextualPrompt += `

Example of expected JSON format for a hero component:
{
  "componentSlug": "hero-minimal",
  "props": {
    "headline": "Your compelling headline here",
    "subheadline": "Supporting text that expands on the value",
    "primaryCTA": {
      "text": "Get Started",
      "href": "/signup"
    }
  }
}

Now generate appropriate content for: ${prompt}`;

  return contextualPrompt;
}

/**
 * Parse Claude's response and extract JSON
 */
function parseClaudeResponse(response: string): any {
  try {
    // Try to parse as-is first
    return JSON.parse(response);
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    
    // If still no valid JSON, return null
    console.error("Could not parse Claude response as JSON");
    return null;
  }
}

/**
 * Generate complete page with Claude
 */
export async function generatePageWithClaude(
  prompt: string,
  options?: { industry?: string; tone?: string }
): Promise<any[]> {
  const systemPrompt = `You are an expert at creating complete marketing pages.
Generate a full page structure with multiple sections.

Return a JSON array of components, each with:
- componentSlug: the exact slug from the registry
- props: appropriate props for that component

Available components by type:
- hero: hero-minimal, hero-centered, hero-split, hero-with-image, hero-with-video
- feature: feature-three-cards, feature-icon-list, feature-alternating-media
- testimonial: testimonial-grid, testimonial-carousel
- pricing: pricing-toggle, pricing-highlight
- cta: cta-single, cta-dual
- footer: footer-minimal, footer-with-cta

Example format:
[
  {
    "componentSlug": "hero-minimal",
    "props": { "headline": "...", "subheadline": "..." }
  },
  {
    "componentSlug": "feature-three-cards",
    "props": { "headline": "...", "features": [...] }
  }
]`;

  const userPrompt = `Create a complete landing page for: ${prompt}
${options?.industry ? `Industry: ${options.industry}` : ""}
${options?.tone ? `Tone: ${options.tone}` : ""}

Include appropriate sections in logical order.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    });

    const content = response.content[0];
    if (content.type === "text") {
      const parsed = parseClaudeResponse(content.text);
      if (Array.isArray(parsed)) {
        return parsed.map(item => ({
          ...item,
          props: sanitizeProps(item.props)
        }));
      }
    }
  } catch (error) {
    console.error("Failed to generate page with Claude:", error);
  }

  return [];
}

/**
 * Enhance existing props with Claude
 */
export async function enhancePropsWithClaude(
  componentSlug: string,
  existingProps: any,
  enhancementPrompt: string
): Promise<any> {
  const component = registry.find(c => c.slug === componentSlug);
  if (!component) return existingProps;

  const systemPrompt = `You are enhancing props for a ${component.type} component.
The component slug is: ${componentSlug}

Current props: ${JSON.stringify(existingProps, null, 2)}

Return ONLY the enhanced props as JSON, maintaining the same structure.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2000,
      temperature: 0.5,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Enhancement request: ${enhancementPrompt}`
        }
      ]
    });

    const content = response.content[0];
    if (content.type === "text") {
      const parsed = parseClaudeResponse(content.text);
      return sanitizeProps(parsed);
    }
  } catch (error) {
    console.error("Failed to enhance props with Claude:", error);
  }

  return existingProps;
}