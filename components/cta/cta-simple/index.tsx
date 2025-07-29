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

/**
 * Props for the CTASimple component
 */
export interface CTASimpleProps {
  /** Main headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
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
  /** Optional background variant */
  variant?: "default" | "muted" | "primary";
}

/**
 * Basic centered CTA section with headline, subheadline, and action buttons.
 * Perfect for encouraging user action with clear messaging.
 *
 * @example
 * ```tsx
 * <CTASimple
 *   headline="Ready to get started?"
 *   subheadline="Join thousands of satisfied customers today"
 *   primaryCTA={{ text: "Start Free Trial", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 *   variant="muted"
 * />
 * ```
 */
export const CTASimple = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = "default",
}: CTASimpleProps) => {
  const variantStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

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
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for CTASimple component
 */
export const ctaSimpleSchema = {
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
    variant: {
      type: "string",
      enum: ["default", "muted", "primary"],
      description: "Optional background variant",
      default: "default",
    },
  },
  required: ["headline", "primaryCTA"],
};