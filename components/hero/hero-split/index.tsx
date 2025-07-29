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
 * Props for the HeroSplit component
 */
export interface HeroSplitProps {
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
  /** Reverse the layout (image on left, text on right) */
  reverse?: boolean;
}

/**
 * Hero section with split layout - text on one side, image on the other.
 * Perfect for product showcases, feature highlights, or any content that benefits from a side-by-side presentation.
 *
 * @example
 * ```tsx
 * <HeroSplit
 *   headline="Powerful analytics at your fingertips"
 *   subheadline="Get insights that matter with our intuitive dashboard and real-time data visualization tools."
 *   primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "View Demo", href: "/demo" }}
 *   image={{
 *     src: "/analytics-dashboard.png",
 *     alt: "Analytics dashboard showing real-time data",
 *     width: 600,
 *     height: 400,
 *     priority: true
 *   }}
 * />
 * ```
 */
export const HeroSplit: React.FC<HeroSplitProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  reverse = false,
}) => {
  return (
    <Section>
      <Container>
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Text content */}
          <Stack spacing="lg" align="start" className={reverse ? "lg:col-start-2" : ""}>
            <Stack spacing="md" align="start">
              <Heading level={1}>{headline}</Heading>
              {subheadline && (
                <Text variant="lead" color="muted">
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
          <div className={`relative overflow-hidden rounded-xl shadow-xl bg-muted ${reverse ? "lg:col-start-1" : ""}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              priority={image.priority}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroSplit component
 */
export const heroSplitSchema = {
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
    reverse: {
      type: "boolean",
      description: "Reverse the layout (image on left, text on right)",
      default: false,
    },
  },
  required: ["headline", "image"],
};