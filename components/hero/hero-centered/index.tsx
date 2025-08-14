import * as React from "react";
import Link from "next/link";
import { Section, Container, Flex, Header } from "@/components/site/ds";
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
        <Flex
          justify="center"
          align="center"
          className="min-h-[60vh]"
        >
          <Flex direction="column" gap={6} align="center">
            <Flex direction="column" gap={4} align="center">
              <Header as="h1" className="text-center font-bold">
                {headline}
              </Header>

              {subheadline && (
                <p className="text-xl text-muted-foreground text-center max-w-2xl">
                  {subheadline}
                </p>
              )}
            </Flex>

            {cta && (
              <Flex gap={4}>
                <Button size="lg" variant={cta.variant || "default"} asChild>
                  <Link href={cta.href}>{cta.text}</Link>
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
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
