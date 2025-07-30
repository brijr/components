import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/**
 * FAQ item configuration
 */
export interface FAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Optional category */
  category?: string;
}

/**
 * Props for the FAQAccordion component
 */
export interface FAQAccordionProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of FAQ items */
  items: FAQItem[];
  /** Optional CTA */
  cta?: {
    text: string;
    href: string;
  };
  /** Show contact prompt */
  showContactPrompt?: boolean;
  /** Default open items (array of indices) */
  defaultOpen?: number[];
}

/**
 * Collapsible FAQ accordion for easy Q&A navigation.
 * Perfect for support pages and product information.
 *
 * @example
 * ```tsx
 * <FAQAccordion
 *   headline="Frequently asked questions"
 *   subheadline="Everything you need to know about our product"
 *   items={[
 *     {
 *       question: "How do I get started?",
 *       answer: "Getting started is easy. Simply sign up for a free account..."
 *     },
 *     {
 *       question: "What payment methods do you accept?",
 *       answer: "We accept all major credit cards, PayPal, and wire transfers."
 *     }
 *   ]}
 *   cta={{ text: "Contact Support", href: "/support" }}
 *   showContactPrompt
 *   defaultOpen={[0]}
 * />
 * ```
 */
export const FAQAccordion = ({
  headline,
  subheadline,
  items,
  cta,
  showContactPrompt = false,
  defaultOpen = [],
}: FAQAccordionProps) => {
  const defaultValue = defaultOpen.map(index => `item-${index}`);

  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Header */}
          <Stack spacing="md" align="center" className="max-w-3xl">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* FAQ Accordion */}
          <Accordion
            type="multiple"
            defaultValue={defaultValue}
            className="w-full max-w-3xl mx-auto"
          >
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <Text color="muted">{item.answer}</Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Prompt */}
          {showContactPrompt && (
            <Stack spacing="md" align="center" className="max-w-xl text-center">
              <Heading level={3} align="center">
                Still have questions?
              </Heading>
              <Text align="center" color="muted">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </Text>
              {cta && (
                <Button asChild>
                  <a href={cta.href}>{cta.text}</a>
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FAQAccordion component
 */
export const faqAccordionSchema = {
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
          category: {
            type: "string",
            description: "Optional category",
          },
        },
        required: ["question", "answer"],
      },
      description: "Array of FAQ items",
      minItems: 1,
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
    showContactPrompt: {
      type: "boolean",
      description: "Show contact prompt",
      default: false,
    },
    defaultOpen: {
      type: "array",
      items: {
        type: "number",
      },
      description: "Default open items (array of indices)",
    },
  },
  required: ["headline", "items"],
};