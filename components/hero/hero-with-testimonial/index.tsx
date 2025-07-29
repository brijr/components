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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * Props for the testimonial author
 */
export interface TestimonialAuthor {
  /** Author's full name */
  name: string;
  /** Author's role or title */
  role: string;
  /** Author's company or organization */
  company?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Fallback initials if avatar fails to load */
  avatarFallback?: string;
}

/**
 * Props for the HeroWithTestimonial component
 */
export interface HeroWithTestimonialProps {
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
  /** Testimonial content */
  testimonial: {
    /** The testimonial quote */
    quote: string;
    /** Author information */
    author: TestimonialAuthor;
  };
}

/**
 * Hero section with a featured testimonial.
 * Great for building trust and social proof on landing pages.
 *
 * @example
 * ```tsx
 * <HeroWithTestimonial
 *   headline="Loved by teams everywhere"
 *   subheadline="See why thousands of companies trust our platform"
 *   primaryCTA={{ text: "Start Your Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "Read More Reviews", href: "/reviews" }}
 *   testimonial={{
 *     quote: "This platform transformed how our team collaborates. We've seen a 40% increase in productivity and our deployment times have been cut in half.",
 *     author: {
 *       name: "Sarah Chen",
 *       role: "VP of Engineering",
 *       company: "TechCorp",
 *       avatarUrl: "/avatars/sarah.jpg",
 *       avatarFallback: "SC"
 *     }
 *   }}
 * />
 * ```
 */
export const HeroWithTestimonial = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  testimonial,
}: HeroWithTestimonialProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Text content and CTAs */}
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

          {/* Testimonial card */}
          <Card className="max-w-3xl w-full">
            <CardContent className="pt-6">
              <Stack spacing="lg">
                <Text
                  variant="lead"
                  className="italic"
                  align="center"
                >
                  "{testimonial.quote}"
                </Text>
                
                <Stack spacing="sm" align="center">
                  <Avatar className="w-12 h-12">
                    {testimonial.author.avatarUrl && (
                      <AvatarImage
                        src={testimonial.author.avatarUrl}
                        alt={testimonial.author.name}
                      />
                    )}
                    <AvatarFallback>
                      {testimonial.author.avatarFallback || 
                       testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Stack spacing="xs" align="center">
                    <Text weight="semibold">
                      {testimonial.author.name}
                    </Text>
                    <Text variant="small" color="muted">
                      {testimonial.author.role}
                      {testimonial.author.company && `, ${testimonial.author.company}`}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithTestimonial component
 */
export const heroWithTestimonialSchema = {
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
    testimonial: {
      type: "object",
      properties: {
        quote: {
          type: "string",
          description: "The testimonial quote",
        },
        author: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Author's full name",
            },
            role: {
              type: "string",
              description: "Author's role or title",
            },
            company: {
              type: "string",
              description: "Author's company or organization",
            },
            avatarUrl: {
              type: "string",
              description: "Avatar image URL",
            },
            avatarFallback: {
              type: "string",
              description: "Fallback initials if avatar fails to load",
            },
          },
          required: ["name", "role"],
        },
      },
      required: ["quote", "author"],
      description: "Testimonial content",
    },
  },
  required: ["headline", "testimonial"],
};