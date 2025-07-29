import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Button } from "@/components/ui/button";

/**
 * Props for the HeroCentered component
 */
export interface HeroCenteredProps {
  /** Main headline text - displayed extra large */
  headline: string;
  /** Optional supporting text */
  subheadline?: string;
  /** Optional call-to-action button */
  cta?: {
    /** Button text */
    text: string;
    /** Button link URL */
    href: string;
    /** Button variant */
    variant?: "default" | "outline" | "ghost";
  };
}

/**
 * Ultra-minimal centered hero with large typography.
 * Perfect for brand statements, coming soon pages, or high-impact messages.
 *
 * @example
 * ```tsx
 * <HeroCentered
 *   headline="Think different"
 *   subheadline="Innovation starts here"
 *   cta={{
 *     text: "Explore",
 *     href: "/explore",
 *     variant: "outline"
 *   }}
 * />
 * ```
 */
export const HeroCentered = ({
  headline,
  subheadline,
  cta,
}: HeroCenteredProps) => {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container>
        <Stack spacing="xl" align="center">
          <Stack spacing="lg" align="center">
            <Heading 
              level={1} 
              align="center"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              {headline}
            </Heading>
            
            {subheadline && (
              <Text
                variant="lead"
                align="center"
                color="muted"
                className="text-xl sm:text-2xl"
              >
                {subheadline}
              </Text>
            )}
          </Stack>

          {cta && (
            <Button 
              size="lg" 
              variant={cta.variant || "default"}
              asChild
              className="text-base"
            >
              <a href={cta.href}>{cta.text}</a>
            </Button>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroCentered component
 */
export const heroCenteredSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text - displayed extra large",
    },
    subheadline: {
      type: "string",
      description: "Optional supporting text",
    },
    cta: {
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
        variant: {
          type: "string",
          enum: ["default", "outline", "ghost"],
          description: "Button variant",
          default: "default",
        },
      },
      required: ["text", "href"],
      description: "Optional call-to-action button",
    },
  },
  required: ["headline"],
};