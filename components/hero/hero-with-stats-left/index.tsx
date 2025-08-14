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
 * Props for the HeroWithStatsLeft component
 */
export interface HeroWithStatsLeftProps {
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
 * Left-aligned hero section with prominent statistics display.
 * Perfect for showcasing achievements, metrics, or key performance indicators with left-aligned layout.
 *
 * @example
 * ```tsx
 * <HeroWithStatsLeft
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
export const HeroWithStatsLeft = ({
  headline,
  subheadline,
  stats,
  primaryCTA,
  secondaryCTA,
}: HeroWithStatsLeftProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12} align="start">
          {/* Text content */}
          <Flex direction="column" gap={4} align="start" className="max-w-3xl">
            <Header as="h1">{headline}</Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Stats grid */}
          <div className="grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat, index) => (
              <Flex key={index} direction="column" gap={1} align="start">
                <div className="text-4xl font-bold sm:text-5xl">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </Flex>
            ))}
          </div>

          {/* CTAs */}
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
 * JSON Schema for HeroWithStatsLeft component
 */
export const heroWithStatsLeftSchema = {
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
