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
import { Badge } from "@/components/ui/badge";

/**
 * Contact card configuration
 */
export interface ContactCard {
  /** Card icon */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Contact details */
  details: Array<{
    label: string;
    value: string;
    href?: string;
  }>;
  /** Primary action */
  action?: {
    text: string;
    href: string;
  };
  /** Optional badge */
  badge?: string;
  /** Whether this is a featured/highlighted card */
  featured?: boolean;
}

/**
 * Props for the ContactCards component
 */
export interface ContactCardsProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Contact cards */
  cards: ContactCard[];
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Optional CTA section */
  cta?: {
    title: string;
    description?: string;
    action: {
      text: string;
      href: string;
    };
  };
}

/**
 * Contact options displayed as cards for different departments or purposes.
 * Great for organizations with multiple contact points.
 *
 * @example
 * ```tsx
 * <ContactCards
 *   headline="How can we help?"
 *   subheadline="Choose the best way to reach our team"
 *   cards={[
 *     {
 *       icon: <Headphones className="w-6 h-6" />,
 *       title: "Customer Support",
 *       description: "Get help with your account or technical issues",
 *       details: [
 *         { label: "Email", value: "support@example.com", href: "mailto:support@example.com" },
 *         { label: "Phone", value: "+1 (555) 111-2222", href: "tel:+15551112222" },
 *         { label: "Hours", value: "24/7 support" }
 *       ],
 *       action: { text: "Open ticket", href: "/support" },
 *       badge: "Most popular",
 *       featured: true
 *     },
 *     {
 *       icon: <Briefcase className="w-6 h-6" />,
 *       title: "Sales Team",
 *       description: "Learn how our solutions can help your business",
 *       details: [
 *         { label: "Email", value: "sales@example.com", href: "mailto:sales@example.com" },
 *         { label: "Phone", value: "+1 (555) 999-8888", href: "tel:+15559998888" },
 *         { label: "Hours", value: "Mon-Fri 9AM-6PM EST" }
 *       ],
 *       action: { text: "Schedule demo", href: "/demo" }
 *     }
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export const ContactCards = ({
  headline,
  subheadline,
  cards,
  columns = 3,
  cta,
}: ContactCardsProps) => {
  const gridCols = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center">
            <Header as="h2">{headline}</Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Contact Cards */}
          <div className={`grid gap-6 md:grid-cols-2 ${gridCols[columns]}`}>
            {cards.map((card, index) => (
              <Card
                key={index}
                className={card.featured ? "border-primary shadow-lg" : ""}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {card.icon}
                    </div>
                    {card.badge && (
                      <Badge variant={card.featured ? "default" : "secondary"}>
                        {card.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Flex direction="column" gap={6}>
                    {/* Contact Details */}
                    <Flex direction="column" gap={4}>
                      {card.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex justify-between items-start">
                          <p className="text-sm font-medium">
                            {detail.label}:
                          </p>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-sm text-primary hover:underline"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground text-right">
                              {detail.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </Flex>

                    {/* Action Button */}
                    {card.action && (
                      <Button
                        variant={card.featured ? "default" : "outline"}
                        className="w-full"
                        asChild
                      >
                        <Link href={card.action.href}>{card.action.text}</Link>
                      </Button>
                    )}
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          {cta && (
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <Flex direction="column" gap={6} className="text-center">
                  <Flex direction="column" gap={4}>
                    <Header as="h3">{cta.title}</Header>
                    {cta.description && (
                      <p className="text-muted-foreground">{cta.description}</p>
                    )}
                  </Flex>
                  <Button size="lg" asChild>
                    <Link href={cta.action.href}>{cta.action.text}</Link>
                  </Button>
                </Flex>
              </CardContent>
            </Card>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for ContactCards component
 */
export const contactCardsSchema = {
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
    cards: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                label: { type: "string" },
                value: { type: "string" },
                href: { type: "string" },
              },
              required: ["label", "value"],
            },
          },
          action: {
            type: "object",
            properties: {
              text: { type: "string" },
              href: { type: "string" },
            },
            required: ["text", "href"],
          },
          badge: { type: "string" },
          featured: { type: "boolean" },
        },
        required: ["title", "description", "details"],
      },
      description: "Contact cards",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns on desktop",
      default: 3,
    },
    cta: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        action: {
          type: "object",
          properties: {
            text: { type: "string" },
            href: { type: "string" },
          },
          required: ["text", "href"],
        },
      },
      required: ["title", "action"],
      description: "Optional CTA section",
    },
  },
  required: ["headline", "cards"],
};