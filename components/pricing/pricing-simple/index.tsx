import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

/**
 * Feature item for pricing plans
 */
export interface PricingFeature {
  /** Feature text */
  text: string;
  /** Whether feature is included */
  included?: boolean;
}

/**
 * Individual pricing plan configuration
 */
export interface PricingPlan {
  /** Plan name */
  name: string;
  /** Plan description */
  description: string;
  /** Price amount */
  price: string;
  /** Price period (e.g., "/month", "/year") */
  period?: string;
  /** List of features */
  features: PricingFeature[];
  /** CTA button configuration */
  cta: {
    text: string;
    href: string;
  };
  /** Whether this is the recommended plan */
  recommended?: boolean;
}

/**
 * Props for the PricingSimple component
 */
export interface PricingSimpleProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of pricing plans */
  plans: PricingPlan[];
}

/**
 * Basic pricing cards displaying multiple pricing tiers.
 * Perfect for SaaS products with clear pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingSimple
 *   headline="Choose your plan"
 *   subheadline="Start free, upgrade anytime"
 *   plans={[
 *     {
 *       name: "Starter",
 *       description: "For individuals",
 *       price: "$9",
 *       period: "/month",
 *       features: [
 *         { text: "Up to 3 projects", included: true },
 *         { text: "Basic analytics", included: true },
 *         { text: "24/7 support", included: false }
 *       ],
 *       cta: { text: "Start Free", href: "/signup" }
 *     },
 *     // ... more plans
 *   ]}
 * />
 * ```
 */
export const PricingSimple = ({
  headline,
  subheadline,
  plans,
}: PricingSimpleProps) => {
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

          {/* Pricing Cards */}
          <div className={`grid gap-6 w-full max-w-6xl mx-auto ${
            plans.length === 2 ? "md:grid-cols-2 md:max-w-4xl" : 
            plans.length >= 3 ? "md:grid-cols-3" : ""
          }`}>
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={plan.recommended ? "border-primary shadow-lg relative" : ""}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Stack spacing="lg">
                    <div>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            feature.included !== false ? "text-primary" : "text-muted-foreground/30"
                          }`} />
                          <span className={feature.included === false ? "text-muted-foreground line-through" : ""}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? "default" : "outline"}
                    asChild
                  >
                    <a href={plan.cta.href}>{plan.cta.text}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for PricingSimple component
 */
export const pricingSimpleSchema = {
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
    plans: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Plan name",
          },
          description: {
            type: "string",
            description: "Plan description",
          },
          price: {
            type: "string",
            description: "Price amount",
          },
          period: {
            type: "string",
            description: "Price period",
          },
          features: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  description: "Feature text",
                },
                included: {
                  type: "boolean",
                  description: "Whether feature is included",
                  default: true,
                },
              },
              required: ["text"],
            },
            description: "List of features",
          },
          cta: {
            type: "object",
            properties: {
              text: { type: "string" },
              href: { type: "string" },
            },
            required: ["text", "href"],
            description: "CTA button configuration",
          },
          recommended: {
            type: "boolean",
            description: "Whether this is the recommended plan",
            default: false,
          },
        },
        required: ["name", "description", "price", "features", "cta"],
      },
      description: "Array of pricing plans",
      minItems: 1,
    },
  },
  required: ["headline", "plans"],
};