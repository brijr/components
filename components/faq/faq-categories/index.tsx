"use client";

import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * FAQ item with category
 */
export interface CategorizedFAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Whether this is a popular/featured question */
  popular?: boolean;
}

/**
 * FAQ category configuration
 */
export interface FAQCategory {
  /** Category ID (used for tab value) */
  id: string;
  /** Category name */
  name: string;
  /** Category description */
  description?: string;
  /** Icon for the category */
  icon?: React.ReactNode;
  /** FAQ items in this category */
  items: CategorizedFAQItem[];
}

/**
 * Props for the FAQCategories component
 */
export interface FAQCategoriesProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of FAQ categories */
  categories: FAQCategory[];
  /** Default active category (ID) */
  defaultCategory?: string;
  /** Show popular badge */
  showPopularBadge?: boolean;
  /** Optional CTA */
  cta?: {
    text: string;
    href: string;
  };
}

/**
 * Categorized FAQs with tab navigation for organized content.
 * Perfect for comprehensive help centers with many FAQs.
 *
 * @example
 * ```tsx
 * <FAQCategories
 *   headline="Help Center"
 *   subheadline="Browse by category to find what you need"
 *   categories={[
 *     {
 *       id: "general",
 *       name: "General",
 *       description: "Common questions about our service",
 *       items: [
 *         {
 *           question: "What is your service?",
 *           answer: "We provide...",
 *           popular: true
 *         }
 *       ]
 *     },
 *     {
 *       id: "billing",
 *       name: "Billing",
 *       description: "Questions about payments and subscriptions",
 *       items: [...]
 *     }
 *   ]}
 *   defaultCategory="general"
 *   showPopularBadge
 *   cta={{ text: "Contact Support", href: "/support" }}
 * />
 * ```
 */
export const FAQCategories = ({
  headline,
  subheadline,
  categories,
  defaultCategory,
  showPopularBadge = true,
  cta,
}: FAQCategoriesProps) => {
  const defaultValue = defaultCategory || categories[0]?.id;

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md" align="center" className="max-w-3xl mx-auto">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Categorized FAQs */}
          <Tabs defaultValue={defaultValue} className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full" style={{
              gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
            }}>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <Stack spacing="lg">
                  {category.description && (
                    <Text color="muted" className="text-center">
                      {category.description}
                    </Text>
                  )}

                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          <span className="flex items-center gap-2">
                            {item.question}
                            {showPopularBadge && item.popular && (
                              <Badge variant="secondary" className="ml-2">
                                Popular
                              </Badge>
                            )}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Text color="muted">{item.answer}</Text>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Stack>
              </TabsContent>
            ))}
          </Tabs>

          {/* CTA */}
          {cta && (
            <Stack spacing="md" align="center" className="max-w-xl mx-auto text-center">
              <Text color="muted">
                Can&apos;t find what you&apos;re looking for?
              </Text>
              <Button asChild>
                <a href={cta.href}>{cta.text}</a>
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FAQCategories component
 */
export const faqCategoriesSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Category ID",
          },
          name: {
            type: "string",
            description: "Category name",
          },
          description: {
            type: "string",
            description: "Category description",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description: "Question text",
                },
                answer: {
                  type: "string",
                  description: "Answer text",
                },
                popular: {
                  type: "boolean",
                  description: "Whether this is a popular question",
                  default: false,
                },
              },
              required: ["question", "answer"],
            },
            description: "FAQ items in this category",
            minItems: 1,
          },
        },
        required: ["id", "name", "items"],
      },
      description: "Array of FAQ categories",
      minItems: 2,
    },
    defaultCategory: {
      type: "string",
      description: "Default active category (ID)",
    },
    showPopularBadge: {
      type: "boolean",
      description: "Show popular badge",
      default: true,
    },
    cta: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Optional CTA",
    },
  },
  required: ["headline", "categories"],
};