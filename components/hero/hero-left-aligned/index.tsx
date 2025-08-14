import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, Container, Flex, Header } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

/**
 * Props for the HeroLeftAligned component
 */
export interface HeroLeftAlignedProps {
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
  /** Hero image configuration */
  image: {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Image width in pixels */
    width?: number;
    /** Image height in pixels */
    height?: number;
    /** Priority loading for LCP */
    priority?: boolean;
  };
}

/**
 * Hero section with left-aligned text, CTAs, and an image below.
 * Great for content-heavy heroes that need a strong visual hierarchy.
 *
 * @example
 * ```tsx
 * <HeroLeftAligned
 *   headline="Transform your workflow with intelligent automation"
 *   subheadline="Save hours every week by automating repetitive tasks and focusing on what matters most to your business growth."
 *   primaryCTA={{ text: "Start Automating", href: "/get-started" }}
 *   secondaryCTA={{ text: "See How It Works", href: "/demo" }}
 *   image={{
 *     src: "/workflow-automation.png",
 *     alt: "Workflow automation dashboard interface",
 *     width: 1200,
 *     height: 675,
 *     priority: true
 *   }}
 * />
 * ```
 */
export const HeroLeftAligned = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroLeftAlignedProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Text content - left aligned */}
          <Flex direction="column" gap={6} align="start">
            <Flex direction="column" gap={4} align="start" className="max-w-3xl">
              <Header as="h1">
                {headline}
              </Header>
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

          {/* Hero image */}
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg object-fill shadow-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 1200}
              height={image.height || 675}
              priority={image.priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroLeftAligned component
 */
export const heroLeftAlignedSchema = {
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
    image: {
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
        width: {
          type: "number",
          description: "Image width in pixels",
        },
        height: {
          type: "number",
          description: "Image height in pixels",
        },
        priority: {
          type: "boolean",
          description: "Priority loading for LCP",
        },
      },
      required: ["src", "alt"],
      description: "Hero image configuration",
    },
  },
  required: ["headline", "image"],
};
