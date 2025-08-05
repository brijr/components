import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
  AspectRatio,
  ButtonGroup,
} from "@/components/ds";
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
export const HeroWithImage = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroWithImageProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing={{ base: "md", md: "lg" }} align="center">
          {/* Text content */}
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

          {/* Hero image */}
          <div className="w-full max-w-5xl mx-auto">
            <AspectRatio ratio="16/9">
              <div className="bg-muted relative h-full w-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 1200}
                  height={image.height || 675}
                  priority={image.priority}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            </AspectRatio>
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
