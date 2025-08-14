import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
    <Flex direction="column" gap={12}>
      <Flex direction="column" gap={4}>
        <Header as="h2">
          {headline}
        </Header>
        {subheadline && (
          <p className={`text-xl ${variant === "primary" ? "" : "text-muted-foreground"}`}>
            {subheadline}
          </p>
        )}
      </Flex>

      <Flex gap={4}>
        <Button 
          size="lg" 
          variant={variant === "primary" ? "secondary" : "default"}
          asChild
        >
          <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
        </Button>
        {secondaryCTA && (
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className={variant === "primary" ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}
          >
            <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
          </Button>
        )}
      </Flex>
    </Flex>
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