import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

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
                  <p className="text-muted-foreground">{item.answer}</p>
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
                    <Flex direction="column" gap={4}>
                      {contactInfo.email && (
                        <p>
                          Email:{" "}
                          <a 
                            href={`mailto:${contactInfo.email}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {contactInfo.email}
                          </a>
                        </p>
                      )}
                      {contactInfo.phone && (
                        <p>
                          Phone:{" "}
                          <a 
                            href={`tel:${contactInfo.phone}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {contactInfo.phone}
                          </a>
                        </p>
                      )}
                      {contactInfo.cta && (
                        <div className="pt-2">
                          <Button asChild>
                            <Link href={contactInfo.cta.href}>{contactInfo.cta.text}</Link>
                          </Button>
                        </div>
                      )}
                    </Flex>
                  </CardContent>
                </Card>
              ) : cta && (
                <Flex direction="column" gap={4} className="text-center">
                  <p className="text-muted-foreground">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <Button asChild>
                    <Link href={cta.href}>{cta.text}</Link>
                  </Button>
                </Flex>
              )}
            </div>
          )}
        </Flex>
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