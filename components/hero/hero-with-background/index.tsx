import * as React from "react";
import Image from "next/image";
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
 * Props for the HeroWithBackground component
 */
export interface HeroWithBackgroundProps {
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
  /** Background image configuration */
  backgroundImage: {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Overlay opacity (0-100) */
    overlayOpacity?: number;
  };
  /** Minimum height of the hero section */
  minHeight?: string;
}

/**
 * Hero section with full-width background image and text overlay.
 * Creates dramatic, immersive hero sections perfect for landing pages and marketing sites.
 *
 * @example
 * ```tsx
 * <HeroWithBackground
 *   headline="Welcome to the future of work"
 *   subheadline="Join thousands of teams already transforming their workflow"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/about" }}
 *   backgroundImage={{
 *     src: "/hero-background.jpg",
 *     alt: "Modern office workspace",
 *     overlayOpacity: 60
 *   }}
 *   minHeight="600px"
 * />
 * ```
 */
export const HeroWithBackground: React.FC<HeroWithBackgroundProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  minHeight = "500px",
}) => {
  const overlayOpacity = backgroundImage.overlayOpacity ?? 50;

  return (
    <Section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <Container>
        <div
          className="flex items-center justify-center"
          style={{ minHeight }}
        >
          <Stack spacing="lg" align="center" className="max-w-3xl">
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
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithBackground component
 */
export const heroWithBackgroundSchema = {
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
    backgroundImage: {
      type: "object",
      properties: {
        src: {
          type: "string",
          description: "Image source URL",
        },
        alt: {
          type: "string",
          description: "Alt text for accessibility",
        },
        overlayOpacity: {
          type: "number",
          description: "Overlay opacity (0-100)",
          minimum: 0,
          maximum: 100,
          default: 50,
        },
      },
      required: ["src", "alt"],
      description: "Background image configuration",
    },
    minHeight: {
      type: "string",
      description: "Minimum height of the hero section",
      default: "500px",
    },
  },
  required: ["headline", "backgroundImage"],
};