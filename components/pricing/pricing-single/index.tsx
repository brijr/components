import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
  Inline,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

/**
 * Props for the PricingSingle component
 */
export interface PricingSingleProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Price amount */
  price: string;
  /** Price period (e.g., "/month", "/year", "one-time") */
  period?: string;
  /** Price description */
  priceDescription?: string;
  /** List of features */
  features: string[];
  /** Primary CTA */
  primaryCTA: {
    text: string;
    href: string;
  };
  /** Optional secondary CTA */
  secondaryCTA?: {
    text: string;
    href: string;
  };
  /** Optional guarantee text */
  guarantee?: string;
}

/**
 * Single pricing option display for simple pricing models.
 * Perfect for products with one plan or a single purchase option.
 *
 * @example
 * ```tsx
 * <PricingSingle
 *   headline="Simple, transparent pricing"
 *   subheadline="Everything you need to get started"
 *   price="$49"
 *   period="/month"
 *   priceDescription="No hidden fees. Cancel anytime."
 *   features={[
 *     "Unlimited projects",
 *     "Advanced analytics",
 *     "24/7 support",
 *     "API access",
 *     "Custom integrations"
 *   ]}
 *   primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "Book a Demo", href: "/demo" }}
 *   guarantee="30-day money-back guarantee"
 * />
 * ```
 */
export const PricingSingle = ({
  headline,
  subheadline,
  price,
  period,
  priceDescription,
  features,
  primaryCTA,
  secondaryCTA,
  guarantee,
}: PricingSingleProps) => {
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

          {/* Pricing Card */}
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="p-8">
              <Stack spacing="xl" align="center">
                {/* Price */}
                <Stack spacing="sm" align="center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{price}</span>
                    {period && (
                      <span className="text-muted-foreground text-lg">
                        {period}
                      </span>
                    )}
                  </div>
                  {priceDescription && (
                    <Text size="sm" color="muted" align="center">
                      {priceDescription}
                    </Text>
                  )}
                </Stack>

                {/* Features */}
                <ul className="space-y-3 w-full">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <Stack spacing="md" align="center" className="w-full">
                  <Button size="lg" className="w-full" asChild>
                    <a href={primaryCTA.href}>{primaryCTA.text}</a>
                  </Button>
                  {secondaryCTA && (
                    <Button size="lg" variant="outline" className="w-full" asChild>
                      <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                    </Button>
                  )}
                </Stack>

                {/* Guarantee */}
                {guarantee && (
                  <Text size="sm" color="muted" align="center">
                    {guarantee}
                  </Text>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for PricingSingle component
 */
export const pricingSingleSchema = {
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
    price: {
      type: "string",
      description: "Price amount",
    },
    period: {
      type: "string",
      description: "Price period",
    },
    priceDescription: {
      type: "string",
      description: "Price description",
    },
    features: {
      type: "array",
      items: {
        type: "string",
      },
      description: "List of features",
      minItems: 1,
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Primary CTA",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Optional secondary CTA",
    },
    guarantee: {
      type: "string",
      description: "Optional guarantee text",
    },
  },
  required: ["headline", "price", "features", "primaryCTA"],
};