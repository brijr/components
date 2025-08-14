import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
export const HeroWithBackground = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  minHeight = "500px",
}: HeroWithBackgroundProps) => {
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
          className="bg-background absolute inset-0"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <Container>
        <div className="flex items-center justify-center" style={{ minHeight }}>
          <Flex direction="column" gap={6} align="center" className="max-w-3xl">
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
