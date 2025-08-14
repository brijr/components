import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
 * Props for the HeroWithTestimonialLeft component
 */
export interface HeroWithTestimonialLeftProps {
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
 * Left-aligned hero section with a featured testimonial.
 * Great for building trust and social proof on landing pages with left-aligned layout.
 *
 * @example
 * ```tsx
 * <HeroWithTestimonialLeft
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
export const HeroWithTestimonialLeft = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  testimonial,
}: HeroWithTestimonialLeftProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12} align="start">
          {/* Text content and CTAs */}
          <Flex direction="column" gap={6} align="start">
            <Flex direction="column" gap={4} align="start" className="max-w-3xl">
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

          {/* Testimonial card */}
          <Card className="w-full max-w-3xl">
            <CardContent className="pt-6">
              <Flex direction="column" gap={6}>
                <p className="text-xl italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <Flex direction="row" gap={2} align="center">
                  <Avatar className="h-12 w-12">
                    {testimonial.author.avatarUrl && (
                      <AvatarImage
                        src={testimonial.author.avatarUrl}
                        alt={testimonial.author.name}
                      />
                    )}
                    <AvatarFallback>
                      {testimonial.author.avatarFallback ||
                        testimonial.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <Flex direction="column" gap={1} align="start">
                    <p className="font-semibold">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.author.role}
                      {testimonial.author.company &&
                        `, ${testimonial.author.company}`}
                    </p>
                  </Flex>
                </Flex>
              </Flex>
            </CardContent>
          </Card>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithTestimonialLeft component
 */
export const heroWithTestimonialLeftSchema = {
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
