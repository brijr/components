"use client";

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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

/**
 * Pricing plan configuration with monthly and annual options
 */
export interface PricingPlanWithToggle {
  /** Plan name */
  name: string;
  /** Plan description */
  description: string;
  /** Monthly price */
  monthlyPrice: string;
  /** Annual price */
  annualPrice: string;
  /** List of features */
  features: string[];
  /** CTA button configuration */
  cta: {
    text: string;
    href: string;
  };
  /** Whether this is the recommended plan */
  recommended?: boolean;
}

/**
 * Props for the PricingWithToggle component
 */
export interface PricingWithToggleProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Monthly billing label */
  monthlyLabel?: string;
  /** Annual billing label */
  annualLabel?: string;
  /** Annual discount text */
  annualDiscount?: string;
  /** Array of pricing plans */
  plans: PricingPlanWithToggle[];
}

/**
 * Pricing cards with monthly/annual toggle for flexible billing options.
 * Perfect for SaaS products offering discounts on annual plans.
 *
 * @example
 * ```tsx
 * <PricingWithToggle
 *   headline="Choose your plan"
 *   subheadline="Save up to 20% with annual billing"
 *   monthlyLabel="Monthly"
 *   annualLabel="Annual"
 *   annualDiscount="Save 20%"
 *   plans={[
 *     {
 *       name: "Starter",
 *       description: "For individuals",
 *       monthlyPrice: "$19",
 *       annualPrice: "$15",
 *       features: ["Feature 1", "Feature 2"],
 *       cta: { text: "Get Started", href: "/signup" }
 *     },
 *     // ... more plans
 *   ]}
 * />
 * ```
 */
export const PricingWithToggle = ({
  headline,
  subheadline,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  annualDiscount = "Save 20%",
  plans,
}: PricingWithToggleProps) => {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Header */}
          <Stack spacing="lg" align="center" className="max-w-3xl">
            <Stack spacing="md" align="center">
              <Heading level={2} align="center">
                {headline}
              </Heading>
              {subheadline && (
                <Text variant="lead" align="center" color="muted">
                  {subheadline}
                </Text>
              )}
            </Stack>

            {/* Billing Toggle */}
            <div className="flex items-center gap-3">
              <Label htmlFor="billing-toggle" className={!isAnnual ? "font-semibold" : ""}>
                {monthlyLabel}
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <div className="flex items-center gap-2">
                <Label htmlFor="billing-toggle" className={isAnnual ? "font-semibold" : ""}>
                  {annualLabel}
                </Label>
                {annualDiscount && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {annualDiscount}
                  </span>
                )}
              </div>
            </div>
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
                      <span className="text-4xl font-bold">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        /{isAnnual ? "month" : "month"}
                      </span>
                      {isAnnual && (
                        <div className="text-sm text-muted-foreground mt-1">
                          billed annually
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                          <span>{feature}</span>
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
                    <a href={`${plan.cta.href}?billing=${isAnnual ? 'annual' : 'monthly'}`}>
                      {plan.cta.text}
                    </a>
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
 * JSON Schema for PricingWithToggle component
 */
export const pricingWithToggleSchema = {
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
    monthlyLabel: {
      type: "string",
      description: "Monthly billing label",
      default: "Monthly",
    },
    annualLabel: {
      type: "string",
      description: "Annual billing label",
      default: "Annual",
    },
    annualDiscount: {
      type: "string",
      description: "Annual discount text",
      default: "Save 20%",
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
          monthlyPrice: {
            type: "string",
            description: "Monthly price",
          },
          annualPrice: {
            type: "string",
            description: "Annual price",
          },
          features: {
            type: "array",
            items: {
              type: "string",
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
        required: ["name", "description", "monthlyPrice", "annualPrice", "features", "cta"],
      },
      description: "Array of pricing plans",
      minItems: 1,
    },
  },
  required: ["headline", "plans"],
};