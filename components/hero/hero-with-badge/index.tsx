import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Props for the HeroWithBadge component
 */
export interface HeroWithBadgeProps {
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
 * Minimal hero section with a badge/announcement above the headline.
 * Perfect for highlighting new features, limited offers, or important announcements.
 *
 * @example
 * ```tsx
 * <HeroWithBadge
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
export const HeroWithBadge = ({
  badge,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroWithBadgeProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={6} align="center">
          {/* Badge */}
          {badge && (
            <Badge variant={badge.variant} asChild={!!badge.href}>
              {badge.href ? <Link href={badge.href}>{badge.text}</Link> : badge.text}
            </Badge>
          )}

          {/* Text content */}
          <Flex direction="column" gap={4} align="center">
            <Header as="h1" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground text-center max-w-2xl">
                {subheadline}
              </p>
            )}
          </Flex>

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
 * JSON Schema for HeroWithBadge component
 */
export const heroWithBadgeSchema = {
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
