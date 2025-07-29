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
import Image from "next/image";

/**
 * Props for the CTAWithImage component
 */
export interface CTAWithImageProps {
  /** Main headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Primary call-to-action button */
  primaryCTA: {
    text: string;
    href: string;
  };
  /** Optional secondary call-to-action button */
  secondaryCTA?: {
    text: string;
    href: string;
  };
  /** Image configuration */
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Image position */
  imagePosition?: "left" | "right";
  /** Optional background variant */
  variant?: "default" | "muted" | "primary";
}

/**
 * CTA section with supporting image to enhance visual appeal.
 * Perfect for showcasing product screenshots or visual benefits.
 *
 * @example
 * ```tsx
 * <CTAWithImage
 *   headline="See the difference"
 *   subheadline="Our intuitive interface makes complex tasks simple"
 *   primaryCTA={{ text: "Try It Now", href: "/demo" }}
 *   secondaryCTA={{ text: "Watch Video", href: "/video" }}
 *   image={{
 *     src: "/images/dashboard.png",
 *     alt: "Product dashboard",
 *     width: 600,
 *     height: 400
 *   }}
 *   imagePosition="right"
 *   variant="muted"
 * />
 * ```
 */
export const CTAWithImage = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  imagePosition = "right",
  variant = "default",
}: CTAWithImageProps) => {
  const variantStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

  const imageComponent = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );

  const contentComponent = (
    <Stack spacing="xl">
      <Stack spacing="md">
        <Heading level={2}>
          {headline}
        </Heading>
        {subheadline && (
          <Text 
            variant="lead" 
            color={variant === "primary" ? "default" : "muted"}
          >
            {subheadline}
          </Text>
        )}
      </Stack>

      <Inline spacing="md">
        <Button 
          size="lg" 
          variant={variant === "primary" ? "secondary" : "default"}
          asChild
        >
          <a href={primaryCTA.href}>{primaryCTA.text}</a>
        </Button>
        {secondaryCTA && (
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className={variant === "primary" ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}
          >
            <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
          </Button>
        )}
      </Inline>
    </Stack>
  );

  return (
    <Section className={variantStyles[variant]}>
      <Container>
        <div className="grid gap-8 items-center md:grid-cols-2 md:gap-12">
          {imagePosition === "left" ? (
            <>
              {imageComponent}
              {contentComponent}
            </>
          ) : (
            <>
              {contentComponent}
              {imageComponent}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for CTAWithImage component
 */
export const ctaWithImageSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline text",
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string", description: "Button text" },
        href: { type: "string", description: "Button link" },
      },
      required: ["text", "href"],
      description: "Primary call-to-action button",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string", description: "Button text" },
        href: { type: "string", description: "Button link" },
      },
      required: ["text", "href"],
      description: "Optional secondary call-to-action button",
    },
    image: {
      type: "object",
      properties: {
        src: { type: "string", description: "Image source URL" },
        alt: { type: "string", description: "Image alt text" },
        width: { type: "number", description: "Image width" },
        height: { type: "number", description: "Image height" },
      },
      required: ["src", "alt", "width", "height"],
      description: "Image configuration",
    },
    imagePosition: {
      type: "string",
      enum: ["left", "right"],
      description: "Image position",
      default: "right",
    },
    variant: {
      type: "string",
      enum: ["default", "muted", "primary"],
      description: "Optional background variant",
      default: "default",
    },
  },
  required: ["headline", "primaryCTA", "image"],
};