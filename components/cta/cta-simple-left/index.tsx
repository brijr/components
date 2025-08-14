import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";

/**
 * Props for the CTASimpleLeft component
 */
export interface CTASimpleLeftProps {
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
 * Left-aligned CTA section with headline, subheadline, and action buttons.
 * Perfect for integrating CTAs within content flow or when left alignment fits better.
 *
 * @example
 * ```tsx
 * <CTASimpleLeft
 *   headline="Start building today"
 *   subheadline="Get access to all features with our free plan"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "See Demo", href: "/demo" }}
 *   variant="muted"
 * />
 * ```
 */
export const CTASimpleLeft = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = "default",
}: CTASimpleLeftProps) => {
  const variantStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

  return (
    <Section className={variantStyles[variant]}>
      <Container>
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4} className="max-w-3xl">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className={`text-xl ${variant === "primary" ? "" : "text-muted-foreground"}`}>
                {subheadline}
              </p>
            )}
          </Flex>

          <Flex gap={4}>
            <Button 
              size="lg" 
              variant={variant === "primary" ? "secondary" : "default"}
              asChild
            >
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            {secondaryCTA && (
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className={variant === "primary" ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}
              >
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for CTASimpleLeft component
 */
export const ctaSimpleLeftSchema = {
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