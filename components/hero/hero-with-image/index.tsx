import * as React from "react";
import Image from "next/image";
import { Section, Container, Stack, Heading, Text, Inline } from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Props for the HeroWithImage component
 */
export interface HeroWithImageProps {
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
 * Hero section with centered text, CTAs, and an image below.
 * Perfect for showcasing products, features, or services with visual context.
 *
 * @example
 * ```tsx
 * <HeroWithImage
 *   headline="Powerful analytics at your fingertips"
 *   subheadline="Get insights that help you make better decisions"
 *   primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "Watch Demo", href: "/demo" }}
 *   image={{
 *     src: "/dashboard-screenshot.png",
 *     alt: "Analytics dashboard showing key metrics",
 *     width: 1200,
 *     height: 675,
 *     priority: true
 *   }}
 * />
 * ```
 */
export const HeroWithImage: React.FC<HeroWithImageProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
}) => {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Text content */}
          <Stack spacing="lg" align="center">
            <Stack spacing="md" align="center">
              <Heading level={1} align="center">
                {headline}
              </Heading>
              {subheadline && (
                <Text variant="lead" align="center" color="muted" className="max-w-2xl">
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

          {/* Hero image */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 1200}
              height={image.height || 675}
              priority={image.priority}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithImage component
 */
export const heroWithImageSchema = {
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
          description: "Button text"
        },
        href: { 
          type: "string",
          description: "Button link URL"
        },
      },
      required: ["text", "href"],
      description: "Primary call-to-action button"
    },
    secondaryCTA: {
      type: "object", 
      properties: {
        text: { 
          type: "string",
          description: "Button text"
        },
        href: { 
          type: "string",
          description: "Button link URL"
        },
      },
      required: ["text", "href"],
      description: "Secondary call-to-action button"
    },
    image: {
      type: "object",
      properties: {
        src: {
          type: "string",
          description: "Image source URL"
        },
        alt: {
          type: "string",
          description: "Alt text for accessibility"
        },
        width: {
          type: "number",
          description: "Image width in pixels"
        },
        height: {
          type: "number",
          description: "Image height in pixels"
        },
        priority: {
          type: "boolean",
          description: "Priority loading for LCP"
        }
      },
      required: ["src", "alt"],
      description: "Hero image configuration"
    }
  },
  required: ["headline", "image"],
};