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
        <Stack spacing="lg" align="start">
          <Stack spacing="md" align="start" className="max-w-3xl">
            <Heading level={1}>
              {headline}
            </Heading>
            {subheadline && (
              <Text
                variant="lead"
                color="muted"
              >
                {subheadline}
              </Text>
            )}
          </Stack>

          {(primaryCTA || secondaryCTA) && (
            <Inline spacing="md">
              {primaryCTA && (
                <Button size="lg" asChild>
                  <a href={primaryCTA.href}>{primaryCTA.text}</a>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                </Button>
              )}
            </Inline>
          )}
        </Stack>
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