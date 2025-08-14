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
 * Props for the CTASplit component
 */
export interface CTASplitProps {
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
 * Split layout CTA with text on one side and actions on the other.
 * Perfect for inline CTAs that need to balance content and actions.
 *
 * @example
 * ```tsx
 * <CTASplit
 *   headline="Boost your productivity"
 *   subheadline="Start using our tools to work smarter, not harder"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 *   variant="muted"
 * />
 * ```
 */
export const CTASplit = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = "default",
}: CTASplitProps) => {
  const variantStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

  return (
    <Section className={variantStyles[variant]}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Flex direction="column" gap={2} className="flex-1 max-w-2xl">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className={`text-xl ${variant === "primary" ? "" : "text-muted-foreground"}`}>
                {subheadline}
              </p>
            )}
          </Flex>

          <div className="flex-shrink-0">
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
          </div>
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for CTASplit component
 */
export const ctaSplitSchema = {
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