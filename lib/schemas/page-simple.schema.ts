import { z } from "zod";

/**
 * Simple working schemas without complex features
 */
export const SimpleComponentInstanceSchema = z.object({
  id: z.string(),
  componentSlug: z.string(),
  props: z.record(z.unknown()),
  order: z.number(),
  visible: z.boolean().optional(),
});

export const SimplePageMetadataSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  generatedBy: z.enum(["ai", "manual"]),
  prompt: z.string().optional(),
  version: z.number().optional(),
});

export const SimplePageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  sections: z.array(SimpleComponentInstanceSchema),
  metadata: SimplePageMetadataSchema,
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

export type SimplePage = z.infer<typeof SimplePageSchema>;
export type SimpleComponentInstance = z.infer<typeof SimpleComponentInstanceSchema>;
export type SimplePageMetadata = z.infer<typeof SimplePageMetadataSchema>;