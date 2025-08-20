/**
 * Master Component Schema Registry
 * Central export for all component definitions and utilities
 */

// Import all component definitions
import { heroDefinitions, getHeroDefinition } from "./definitions/hero";
import { featureDefinitions, getFeatureDefinition } from "./definitions/feature";
import { testimonialDefinitions, getTestimonialDefinition } from "./definitions/testimonial";
import { pricingDefinitions, getPricingDefinition } from "./definitions/pricing";
import { ctaDefinitions, getCTADefinition } from "./definitions/cta";
import { footerDefinitions, getFooterDefinition } from "./definitions/footer";

// Import types
import { ComponentDefinition } from "./types";

// Export all types
export * from "./types";
export * from "./generator";
export * from "./validator";

/**
 * Complete registry of all component definitions
 */
export const componentDefinitions: ComponentDefinition[] = [
  ...heroDefinitions,
  ...featureDefinitions,
  ...testimonialDefinitions,
  ...pricingDefinitions,
  ...ctaDefinitions,
  ...footerDefinitions
];

/**
 * Get component definition by slug
 */
export function getComponentDefinition(slug: string): ComponentDefinition | undefined {
  return componentDefinitions.find(def => def.slug === slug);
}

/**
 * Get all component definitions by category
 */
export function getComponentsByCategory(category: ComponentDefinition["category"]): ComponentDefinition[] {
  return componentDefinitions.filter(def => def.category === category);
}

/**
 * Get all component slugs
 */
export function getAllComponentSlugs(): string[] {
  return componentDefinitions.map(def => def.slug);
}

/**
 * Get all component categories
 */
export function getAllCategories(): Array<ComponentDefinition["category"]> {
  const categories = new Set(componentDefinitions.map(def => def.category));
  return Array.from(categories);
}

/**
 * Component compatibility checker
 */
export function areComponentsCompatible(slug1: string, slug2: string): boolean {
  const def1 = getComponentDefinition(slug1);
  const def2 = getComponentDefinition(slug2);
  
  if (!def1 || !def2) return false;
  
  return def1.composition?.compatible?.includes(slug2) || 
         def2.composition?.compatible?.includes(slug1) || 
         false;
}

/**
 * Get recommended component sequence
 */
export function getRecommendedSequence(components: string[]): string[] {
  // Define the ideal order for component categories
  const categoryOrder: Record<string, number> = {
    hero: 1,
    feature: 2,
    testimonial: 3,
    pricing: 4,
    cta: 5,
    footer: 6
  };
  
  return components.sort((a, b) => {
    const defA = getComponentDefinition(a);
    const defB = getComponentDefinition(b);
    
    if (!defA || !defB) return 0;
    
    const orderA = categoryOrder[defA.category] || 99;
    const orderB = categoryOrder[defB.category] || 99;
    
    return orderA - orderB;
  });
}

/**
 * Validate component sequence
 */
export function validateComponentSequence(components: string[]): {
  valid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  for (let i = 0; i < components.length - 1; i++) {
    const current = components[i];
    const next = components[i + 1];
    
    const currentDef = getComponentDefinition(current);
    const nextDef = getComponentDefinition(next);
    
    if (!currentDef || !nextDef) continue;
    
    // Check "never before" rules
    if (currentDef.composition?.sequence?.neverAfter?.includes(next)) {
      warnings.push(`${current} should not be followed by ${next}`);
    }
    
    if (nextDef.composition?.sequence?.neverBefore?.includes(current)) {
      warnings.push(`${next} should not come after ${current}`);
    }
  }
  
  return {
    valid: warnings.length === 0,
    warnings
  };
}

/**
 * Get AI hints for a component
 */
export function getComponentAIHints(slug: string) {
  const definition = getComponentDefinition(slug);
  return definition?.aiHints || null;
}

/**
 * Get template variations for a component
 */
export function getComponentTemplates(slug: string) {
  const definition = getComponentDefinition(slug);
  return definition?.templates || null;
}

/**
 * Stats about the component library
 */
export const componentLibraryStats = {
  totalComponents: componentDefinitions.length,
  categories: getAllCategories().length,
  heroComponents: heroDefinitions.length,
  featureComponents: featureDefinitions.length,
  testimonialComponents: testimonialDefinitions.length,
  pricingComponents: pricingDefinitions.length,
  ctaComponents: ctaDefinitions.length,
  footerComponents: footerDefinitions.length
};

/**
 * Export individual category definitions for direct access
 */
export {
  heroDefinitions,
  featureDefinitions,
  testimonialDefinitions,
  pricingDefinitions,
  ctaDefinitions,
  footerDefinitions
};

/**
 * Export individual getters
 */
export {
  getHeroDefinition,
  getFeatureDefinition,
  getTestimonialDefinition,
  getPricingDefinition,
  getCTADefinition,
  getFooterDefinition
};