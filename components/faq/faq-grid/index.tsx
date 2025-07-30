import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * FAQ item for grid layout
 */
export interface FAQGridItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

/**
 * Props for the FAQGrid component
 */
export interface FAQGridProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of FAQ items */
  items: FAQGridItem[];
  /** Number of columns */
  columns?: 2 | 3;
  /** Optional CTA */
  cta?: {
    text: string;
    href: string;
  };
  /** Contact information */
  contactInfo?: {
    headline: string;
    description: string;
    email?: string;
    phone?: string;
    cta?: {
      text: string;
      href: string;
    };
  };
}

/**
 * Two-column FAQ layout with cards for visual organization.
 * Perfect for categorized FAQs or when visual hierarchy is important.
 *
 * @example
 * ```tsx
 * <FAQGrid
 *   headline="Common questions"
 *   subheadline="Find quick answers to frequently asked questions"
 *   items={[
 *     {
 *       question: "What is your refund policy?",
 *       answer: "We offer a 30-day money-back guarantee..."
 *     },
 *     {
 *       question: "How do I upgrade my plan?",
 *       answer: "You can upgrade your plan anytime from your dashboard..."
 *     }
 *   ]}
 *   columns={2}
 *   contactInfo={{
 *     headline: "Need more help?",
 *     description: "Our support team is here to assist you",
 *     email: "support@example.com",
 *     cta: { text: "Contact Support", href: "/support" }
 *   }}
 * />
 * ```
 */
export const FAQGrid = ({
  headline,
  subheadline,
  items,
  columns = 2,
  cta,
  contactInfo,
}: FAQGridProps) => {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

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

          {/* FAQ Grid */}
          <div className={`grid gap-6 ${gridCols}`}>
            {items.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    {item.icon && (
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                    )}
                    <span>{item.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text color="muted">{item.answer}</Text>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA or Contact Section */}
          {(cta || contactInfo) && (
            <div className="text-center">
              {contactInfo ? (
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>{contactInfo.headline}</CardTitle>
                    <CardDescription>{contactInfo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing="md">
                      {contactInfo.email && (
                        <Text>
                          Email:{" "}
                          <a 
                            href={`mailto:${contactInfo.email}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {contactInfo.email}
                          </a>
                        </Text>
                      )}
                      {contactInfo.phone && (
                        <Text>
                          Phone:{" "}
                          <a 
                            href={`tel:${contactInfo.phone}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {contactInfo.phone}
                          </a>
                        </Text>
                      )}
                      {contactInfo.cta && (
                        <div className="pt-2">
                          <Button asChild>
                            <a href={contactInfo.cta.href}>{contactInfo.cta.text}</a>
                          </Button>
                        </div>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ) : cta && (
                <Stack spacing="md" align="center">
                  <Text color="muted">
                    Can&apos;t find what you&apos;re looking for?
                  </Text>
                  <Button asChild>
                    <a href={cta.href}>{cta.text}</a>
                  </Button>
                </Stack>
              )}
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FAQGrid component
 */
export const faqGridSchema = {
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
        },
        required: ["question", "answer"],
      },
      description: "Array of FAQ items",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3],
      description: "Number of columns",
      default: 2,
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
    contactInfo: {
      type: "object",
      properties: {
        headline: {
          type: "string",
          description: "Contact section headline",
        },
        description: {
          type: "string",
          description: "Contact section description",
        },
        email: {
          type: "string",
          description: "Contact email",
        },
        phone: {
          type: "string",
          description: "Contact phone",
        },
        cta: {
          type: "object",
          properties: {
            text: { type: "string" },
            href: { type: "string" },
          },
          required: ["text", "href"],
          description: "Contact CTA",
        },
      },
      required: ["headline", "description"],
      description: "Contact information",
    },
  },
  required: ["headline", "items"],
};