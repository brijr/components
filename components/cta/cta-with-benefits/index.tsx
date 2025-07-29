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
import { Check } from "lucide-react";

/**
 * Benefit item configuration
 */
export interface BenefitItem {
  /** Benefit text */
  text: string;
}

/**
 * Props for the CTAWithBenefits component
 */
export interface CTAWithBenefitsProps {
  /** Main headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** List of benefits */
  benefits: BenefitItem[];
  /** Primary call-to-action button */
  primaryCTA: {
    text: string;
    href: string;
  };
  /** Optional secondary call-to-action button */
  secondaryCTA?: {
    text: string;
    href: string;
  };
  /** Layout variant */
  layout?: "centered" | "split";
  /** Optional background variant */
  variant?: "default" | "muted" | "primary";
}

/**
 * CTA section with a list of benefits to reinforce value proposition.
 * Perfect for highlighting key features or advantages before conversion.
 *
 * @example
 * ```tsx
 * <CTAWithBenefits
 *   headline="Everything you need to succeed"
 *   subheadline="Join thousands of teams already using our platform"
 *   benefits={[
 *     { text: "Unlimited projects and collaborators" },
 *     { text: "Advanced analytics and reporting" },
 *     { text: "24/7 priority support" },
 *     { text: "99.9% uptime guarantee" }
 *   ]}
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Compare Plans", href: "/pricing" }}
 *   layout="centered"
 *   variant="muted"
 * />
 * ```
 */
export const CTAWithBenefits = ({
  headline,
  subheadline,
  benefits,
  primaryCTA,
  secondaryCTA,
  layout = "centered",
  variant = "default",
}: CTAWithBenefitsProps) => {
  const variantStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

  const benefitsList = (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            variant === "primary" ? "text-primary-foreground" : "text-primary"
          }`} />
          <Text className="flex-1">
            {benefit.text}
          </Text>
        </li>
      ))}
    </ul>
  );

  const ctaButtons = (
    <Inline spacing="md">
      <Button 
        size="lg" 
        variant={variant === "primary" ? "secondary" : "default"}
        asChild
      >
        <a href={primaryCTA.href}>{primaryCTA.text}</a>
      </Button>
      {secondaryCTA && (
        <Button 
          size="lg" 
          variant="outline" 
          asChild
          className={variant === "primary" ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}
        >
          <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
        </Button>
      )}
    </Inline>
  );

  if (layout === "split") {
    return (
      <Section className={variantStyles[variant]}>
        <Container>
          <div className="grid gap-8 items-center md:grid-cols-2 md:gap-12">
            <Stack spacing="lg">
              <Stack spacing="md">
                <Heading level={2}>
                  {headline}
                </Heading>
                {subheadline && (
                  <Text 
                    variant="lead" 
                    color={variant === "primary" ? "default" : "muted"}
                  >
                    {subheadline}
                  </Text>
                )}
              </Stack>
              {ctaButtons}
            </Stack>
            
            <div>
              {benefitsList}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className={variantStyles[variant]}>
      <Container>
        <Stack spacing="xl" align="center">
          <Stack spacing="md" align="center" className="max-w-3xl">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text 
                variant="lead" 
                align="center" 
                color={variant === "primary" ? "default" : "muted"}
              >
                {subheadline}
              </Text>
            )}
          </Stack>

          <div className="max-w-md">
            {benefitsList}
          </div>

          {ctaButtons}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for CTAWithBenefits component
 */
export const ctaWithBenefitsSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline text",
    },
    benefits: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Benefit text",
          },
        },
        required: ["text"],
      },
      description: "List of benefits",
      minItems: 1,
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string", description: "Button text" },
        href: { type: "string", description: "Button link" },
      },
      required: ["text", "href"],
      description: "Primary call-to-action button",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string", description: "Button text" },
        href: { type: "string", description: "Button link" },
      },
      required: ["text", "href"],
      description: "Optional secondary call-to-action button",
    },
    layout: {
      type: "string",
      enum: ["centered", "split"],
      description: "Layout variant",
      default: "centered",
    },
    variant: {
      type: "string",
      enum: ["default", "muted", "primary"],
      description: "Optional background variant",
      default: "default",
    },
  },
  required: ["headline", "benefits", "primaryCTA"],
};