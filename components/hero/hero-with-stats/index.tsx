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
 * Props for individual stat items
 */
export interface StatItem {
  /** The numeric value or main stat */
  value: string;
  /** Label describing the stat */
  label: string;
  /** Optional prefix (e.g., "$", "+") */
  prefix?: string;
  /** Optional suffix (e.g., "%", "k") */
  suffix?: string;
}

/**
 * Props for the HeroWithStats component
 */
export interface HeroWithStatsProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline?: string;
  /** Array of statistics to display */
  stats: StatItem[];
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
 * Hero section with prominent statistics display.
 * Perfect for showcasing achievements, metrics, or key performance indicators.
 *
 * @example
 * ```tsx
 * <HeroWithStats
 *   headline="Trusted by teams worldwide"
 *   subheadline="Join thousands of companies already transforming their workflow"
 *   stats={[
 *     { value: "10", suffix: "M+", label: "Active Users" },
 *     { value: "99.9", suffix: "%", label: "Uptime SLA" },
 *     { value: "24/7", label: "Support" },
 *     { value: "150", suffix: "+", label: "Countries" }
 *   ]}
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "View Case Studies", href: "/customers" }}
 * />
 * ```
 */
export const HeroWithStats = ({
  headline,
  subheadline,
  stats,
  primaryCTA,
  secondaryCTA,
}: HeroWithStatsProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Text content */}
          <Stack spacing="md" align="center">
            <Heading level={1} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text
                variant="lead"
                align="center"
                color="muted"
                className="max-w-2xl"
              >
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl">
            {stats.map((stat, index) => (
              <Stack key={index} spacing="xs" align="center">
                <Text
                  className="text-4xl sm:text-5xl font-bold"
                  as="div"
                >
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </Text>
                <Text
                  variant="small"
                  color="muted"
                  align="center"
                >
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </div>

          {/* CTAs */}
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
 * JSON Schema for HeroWithStats component
 */
export const heroWithStatsSchema = {
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
    stats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "The numeric value or main stat",
          },
          label: {
            type: "string",
            description: "Label describing the stat",
          },
          prefix: {
            type: "string",
            description: "Optional prefix (e.g., '$', '+')",
          },
          suffix: {
            type: "string",
            description: "Optional suffix (e.g., '%', 'k')",
          },
        },
        required: ["value", "label"],
      },
      description: "Array of statistics to display",
      minItems: 1,
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
  required: ["headline", "stats"],
};