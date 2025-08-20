/**
 * Page Template System Types
 * Defines the structure for complete landing page templates
 */

export interface SectionDefinition {
  componentSlug: string;
  order: number;
  contentGuidance: string;
  requiredProps: string[];
  defaultContent?: Record<string, any>;
  variations?: string[]; // Alternative component slugs that could be used
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  icon?: string;
  sections: SectionDefinition[];
  industries: string[];
  recommendedTone: string;
  keywords: string[]; // Help with template selection
  minSections: number;
  maxSections: number;
}

export interface GeneratedSection {
  id: string;
  componentSlug: string;
  props: Record<string, any>;
  order: number;
  visible: boolean;
}

export interface PageGenerationConfig {
  template: PageTemplate;
  companyName: string;
  industry: string;
  tone: string;
  additionalContext?: string;
  targetAudience?: string;
  uniqueSellingPoints?: string[];
  competitors?: string[];
}