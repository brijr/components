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

/**
 * Props for the HeroWithVideo component
 */
export interface HeroWithVideoProps {
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
  /** Video configuration */
  video: {
    /** Video embed URL (YouTube or Vimeo) */
    embedUrl: string;
    /** Video title for accessibility */
    title: string;
    /** Aspect ratio (default: 16:9) */
    aspectRatio?: string;
  };
}

/**
 * Hero section with centered text and embedded video below.
 * Perfect for product demos, explainer videos, or any content that benefits from video demonstration.
 *
 * @example
 * ```tsx
 * <HeroWithVideo
 *   headline="See our platform in action"
 *   subheadline="Watch how teams are transforming their workflow in minutes"
 *   primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "Book a Demo", href: "/demo" }}
 *   video={{
 *     embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
 *     title: "Product demo video",
 *     aspectRatio: "16:9"
 *   }}
 * />
 * ```
 */
export const HeroWithVideo = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  video,
}: HeroWithVideoProps) => {
  // Parse aspect ratio for padding calculation
  const aspectRatio = video.aspectRatio || "16:9";
  const [width, height] = aspectRatio.split(":").map(Number);
  const paddingBottom = `${(height / width) * 100}%`;

  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Text content */}
          <Stack spacing="lg" align="center">
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

          {/* Video embed */}
          <div className="w-full max-w-4xl">
            <div
              className="bg-muted relative overflow-hidden rounded-xl shadow-2xl"
              style={{ paddingBottom }}
            >
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithVideo component
 */
export const heroWithVideoSchema = {
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
    video: {
      type: "object",
      properties: {
        embedUrl: {
          type: "string",
          description: "Video embed URL (YouTube or Vimeo)",
        },
        title: {
          type: "string",
          description: "Video title for accessibility",
        },
        aspectRatio: {
          type: "string",
          description: "Aspect ratio (default: 16:9)",
          pattern: "^\\d+:\\d+$",
          default: "16:9",
        },
      },
      required: ["embedUrl", "title"],
      description: "Video configuration",
    },
  },
  required: ["headline", "video"],
};
