import { z } from "zod";

/**
 * Schema for a single component instance on a page
 */
export const ComponentInstanceSchema = z.object({
  id: z.string(),
  componentSlug: z.string(),
  props: z.record(z.unknown()),
  order: z.number(),
  visible: z.boolean().optional(),
  variants: z.object({
    mobile: z.record(z.unknown()).optional(),
    tablet: z.record(z.unknown()).optional(),
  }).optional(),
});

/**
 * Schema for page metadata
 */
export const PageMetadataSchema = z.object({
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  generatedBy: z.enum(["ai", "manual"]),
  prompt: z.string().optional(),
  version: z.number().optional(),
});

/**
 * Complete page schema
 */
export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  sections: z.array(ComponentInstanceSchema),
  metadata: PageMetadataSchema,
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

// TypeScript types derived from Zod schemas
export type ComponentInstance = z.infer<typeof ComponentInstanceSchema>;
export type PageMetadata = z.infer<typeof PageMetadataSchema>;
export type Page = z.infer<typeof PageSchema>;

/**
 * Example page creation
 */
export const createPage = (data: Partial<Page>): Page => {
  const defaultPage: Page = {
    id: crypto.randomUUID(),
    title: "Untitled Page",
    slug: "untitled",
    sections: [],
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      generatedBy: "manual",
      version: 1,
    },
    ...data,
  };

  return PageSchema.parse(defaultPage);
};

/**
 * Validate a page object
 */
export const validatePage = (page: unknown): Page => {
  return PageSchema.parse(page);
};

/**
 * Safe page validation that returns errors
 */
export const safeValidatePage = (page: unknown) => {
  return PageSchema.safeParse(page);
};