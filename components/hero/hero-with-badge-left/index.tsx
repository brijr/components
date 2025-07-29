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
import { Badge } from "@/components/ui/badge";

/**
 * Props for the HeroWithBadgeLeft component
 */
export interface HeroWithBadgeLeftProps {
  /** Badge configuration */
  badge?: {
    /** Badge text */
    text: string;
    /** Badge variant */
    variant?: "default" | "secondary" | "destructive" | "outline";
    /** Optional link for the badge */
    href?: string;
  };
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
 * Left-aligned hero section with a badge/announcement above the headline.
 * Perfect for highlighting new features, limited offers, or important announcements with left-aligned layout.
 *
 * @example
 * ```tsx
 * <HeroWithBadgeLeft
 *   badge={{
 *     text: "New Feature",
 *     variant: "secondary",
 *     href: "/changelog"
 *   }}
 *   headline="Introducing AI-powered insights"
 *   subheadline="Transform your data into actionable intelligence with our latest AI features"
 *   primaryCTA={{ text: "Try It Now", href: "/ai-features" }}
 *   secondaryCTA={{ text: "Learn More", href: "/docs/ai" }}
 * />
 * ```
 */
export const HeroWithBadgeLeft = ({
  badge,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroWithBadgeLeftProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="lg" align="start">
          {/* Badge */}
          {badge && (
            <Badge variant={badge.variant} asChild={!!badge.href}>
              {badge.href ? <a href={badge.href}>{badge.text}</a> : badge.text}
            </Badge>
          )}

          {/* Text content */}
          <Stack spacing="md" align="start" className="max-w-3xl">
            <Heading level={1}>{headline}</Heading>
            {subheadline && (
              <Text variant="lead" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

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
 * JSON Schema for HeroWithBadgeLeft component
 */
export const heroWithBadgeLeftSchema = {
  type: "object",
  properties: {
    badge: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Badge text",
        },
        variant: {
          type: "string",
          enum: ["default", "secondary", "destructive", "outline"],
          description: "Badge variant",
          default: "default",
        },
        href: {
          type: "string",
          description: "Optional link for the badge",
        },
      },
      required: ["text"],
      description: "Badge configuration",
    },
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
