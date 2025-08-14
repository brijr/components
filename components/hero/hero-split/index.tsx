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
export const HeroSplit = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  reverse = false,
}: HeroSplitProps) => {
  return (
    <Section>
      <Container>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center`}>
          {/* Text content */}
          <Flex
            direction="column"
            gap={4}
            align="start"
            className={reverse ? "lg:col-start-2" : ""}
          >
            <Flex direction="column" gap={2} align="start">
              <Header as="h1">{headline}</Header>
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
          <div className={`bg-muted relative overflow-hidden rounded-xl shadow-xl aspect-[3/2] ${reverse ? "lg:col-start-1" : ""}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              priority={image.priority}
              className="h-full w-full object-cover"
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
