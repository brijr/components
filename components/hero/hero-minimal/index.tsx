import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
  ButtonGroup,
} from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Props for the HeroMinimal component
 */
export interface HeroMinimalProps {
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
 * Minimal hero section with centered text and optional CTAs.
 * Perfect for landing pages that need a clean, focused message.
 *
 * @example
 * ```tsx
 * <HeroMinimal
 *   headline="Build something amazing"
 *   subheadline="Start your journey with our powerful platform"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 * />
 * ```
 */
export const HeroMinimal = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroMinimalProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="md" align="center">
          <Stack spacing="sm" align="center">
            <Heading size={{ base: 2, md: 1 }} centered>
              {headline}
            </Heading>
            {subheadline && (
              <Text
                variant="lead"
                centered
                subdued
                className="max-w-2xl"
              >
                {subheadline}
              </Text>
            )}
          </Stack>

          {(primaryCTA || secondaryCTA) && (
            <ButtonGroup>
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
            </ButtonGroup>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroMinimal component
 */
export const heroMinimalSchema = {
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
