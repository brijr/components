import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
        <Flex direction="column" gap={12} className="text-center">
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center max-w-3xl">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

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
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Prompt */}
          {showContactPrompt && (
            <Flex direction="column" gap={4} className="text-center max-w-xl text-center">
              <Header as="h3" className="text-center">
                Still have questions?
              </Header>
              <p className="text-center text-muted-foreground">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              {cta && (
                <Button asChild>
                  <Link href={cta.href}>{cta.text}</Link>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
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