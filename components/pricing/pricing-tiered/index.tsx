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
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

/**
 * Tiered pricing plan configuration
 */
export interface TieredPlan {
  /** Plan name */
  name: string;
  /** Plan description */
  description: string;
  /** Price amount */
  price: string;
  /** Price period */
  period?: string;
  /** Original price (for showing discounts) */
  originalPrice?: string;
  /** List of features */
  features: string[];
  /** CTA button configuration */
  cta: {
    text: string;
    href: string;
  };
  /** Whether this is the recommended plan */
  recommended?: boolean;
  /** Optional badge text */
  badge?: string;
}

/**
 * Props for the PricingTiered component
 */
export interface PricingTieredProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of pricing tiers */
  tiers: TieredPlan[];
  /** Show decorative elements */
  showDecorations?: boolean;
}

/**
 * Tiered pricing with visual hierarchy and recommended badge.
 * Perfect for SaaS products with clear good-better-best pricing strategy.
 *
 * @example
 * ```tsx
 * <PricingTiered
 *   headline="Choose your plan"
 *   subheadline="Upgrade or downgrade at any time"
 *   tiers={[
 *     {
 *       name: "Basic",
 *       description: "For individuals",
 *       price: "$9",
 *       period: "/month",
 *       features: ["Feature 1", "Feature 2"],
 *       cta: { text: "Get Started", href: "/signup" }
 *     },
 *     {
 *       name: "Pro",
 *       description: "For teams",
 *       price: "$29",
 *       period: "/month",
 *       recommended: true,
 *       badge: "Most Popular",
 *       features: ["Everything in Basic", "Feature 3", "Feature 4"],
 *       cta: { text: "Start Free Trial", href: "/trial" }
 *     }
 *   ]}
 *   showDecorations
 * />
 * ```
 */
export const PricingTiered = ({
  headline,
  subheadline,
  tiers,
  showDecorations = false,
}: PricingTieredProps) => {
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

          {/* Pricing Tiers */}
          <div className={`grid gap-6 w-full max-w-6xl mx-auto ${
            tiers.length === 2 ? "md:grid-cols-2 md:max-w-4xl" : 
            tiers.length >= 3 ? "lg:grid-cols-3" : ""
          } ${showDecorations ? "lg:items-center" : ""}`}>
            {tiers.map((tier, index) => {
              const isRecommended = tier.recommended;
              const scale = showDecorations && isRecommended ? "lg:scale-105" : "";
              const shadow = isRecommended ? "shadow-xl" : "";
              
              return (
                <Card 
                  key={index} 
                  className={`relative ${scale} ${shadow} ${
                    isRecommended ? "border-primary" : ""
                  }`}
                >
                  {/* Badge */}
                  {(tier.badge || isRecommended) && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="default" className="gap-1">
                        {showDecorations && isRecommended && (
                          <Star className="w-3 h-3 fill-current" />
                        )}
                        {tier.badge || "Recommended"}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Stack spacing="lg">
                      <div className="text-center">
                        {tier.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {tier.originalPrice}
                          </div>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">{tier.price}</span>
                          {tier.period && (
                            <span className="text-muted-foreground">{tier.period}</span>
                          )}
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={isRecommended ? "default" : "outline"}
                      size={isRecommended && showDecorations ? "lg" : "default"}
                      asChild
                    >
                      <a href={tier.cta.href}>{tier.cta.text}</a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for PricingTiered component
 */
export const pricingTieredSchema = {
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
    tiers: {
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
          originalPrice: {
            type: "string",
            description: "Original price (for showing discounts)",
          },
          features: {
            type: "array",
            items: {
              type: "string",
            },
            description: "List of features",
            minItems: 1,
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
          badge: {
            type: "string",
            description: "Optional badge text",
          },
        },
        required: ["name", "description", "price", "features", "cta"],
      },
      description: "Array of pricing tiers",
      minItems: 2,
    },
    showDecorations: {
      type: "boolean",
      description: "Show decorative elements",
      default: false,
    },
  },
  required: ["headline", "tiers"],
};