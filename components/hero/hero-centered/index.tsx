import * as React from "react";
import { Section, Container, Stack, Heading, Text, Center, ButtonGroup } from "@/components/ds";
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
    <Section>
      <Container>
        <Center minH="60vh">
          <Stack spacing="md" align="center">
            <Stack spacing="sm" align="center">
              <Heading
                size={1}
                centered
                className="font-bold"
              >
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

            {cta && (
              <ButtonGroup>
                <Button
                  size="lg"
                  variant={cta.variant || "default"}
                  asChild
                >
                  <a href={cta.href}>{cta.text}</a>
                </Button>
              </ButtonGroup>
            )}
          </Stack>
        </Center>
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
