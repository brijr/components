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
 * Props for the HeroMinimalLeft component
 */
export interface HeroMinimalLeftProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline?: string;
  /** Primary call-to-action button */
  primaryCTA?: {
    /** Button text */
    text: string;
    /** Button link URL */
    href: string;
  };
  /** Secondary call-to-action button */
  secondaryCTA?: {
    /** Button text */
    text: string;
    /** Button link URL */
    href: string;
  };
}

/**
 * Minimal hero section with left-aligned text and optional CTAs.
 * Perfect for landing pages that need a clean, focused message with left alignment.
 *
 * @example
 * ```tsx
 * <HeroMinimalLeft
 *   headline="Build something amazing"
 *   subheadline="Start your journey with our powerful platform"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 * />
 * ```
 */
export const HeroMinimalLeft = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroMinimalLeftProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={6} align="start">
          <Flex direction="column" gap={4} align="start" className="max-w-3xl">
            <Header as="h1">{headline}</Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {(primaryCTA || secondaryCTA) && (
            <Flex gap={4}>
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroMinimalLeft component
 */
export const heroMinimalLeftSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Supporting subheadline text",
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Button text",
        },
        href: {
          type: "string",
          description: "Button link URL",
        },
      },
      required: ["text", "href"],
      description: "Primary call-to-action button",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Button text",
        },
        href: {
          type: "string",
          description: "Button link URL",
        },
      },
      required: ["text", "href"],
      description: "Secondary call-to-action button",
    },
  },
  required: ["headline"],
};
