import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, Container, Prose } from "@/components/ds";
import { cn } from "@/lib/utils";

/**
 * Props for the HeroTextImage component
 */
export interface HeroTextImageProps {
  /** Badge text displayed above the headline */
  badge?: string;
  /** Main headline text */
  headline: string;
  /** Subheadline or description text */
  subheadline?: string;
  /** Primary CTA button configuration */
  primaryCTA?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  /** Secondary CTA button configuration */
  secondaryCTA?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  /** Image configuration */
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };
  /** Text alignment */
  textAlign?: "left" | "center" | "right";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero section component with text content followed by an image
 * Uses the Prose component for automatic text styling
 * 
 * @example
 * ```tsx
 * <HeroTextImage
 *   badge="New Release"
 *   headline="Build Better Products Faster"
 *   subheadline="Our platform helps teams ship amazing software with confidence"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 *   image={{ 
 *     src: "/hero-image.jpg", 
 *     alt: "Product screenshot",
 *     priority: true 
 *   }}
 *   textAlign="center"
 * />
 * ```
 */
export const HeroTextImage: React.FC<HeroTextImageProps> = ({
  badge,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  textAlign = "center",
  className,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <Section className={cn("py-16 md:py-24", className)}>
      <Container>
        <div className="flex flex-col gap-12">
          {/* Text Content */}
          <div className={cn("flex flex-col", alignmentClasses[textAlign])}>
            {/* Badge */}
            {badge && (
              <Badge variant="secondary" className="mb-6 w-fit">
                {badge}
              </Badge>
            )}

            {/* Prose wrapper for all text content */}
            <Prose className={cn(alignmentClasses[textAlign], "mb-8")}>
              <h1>{headline}</h1>
              {subheadline && <p className="text-muted-foreground">{subheadline}</p>}
            </Prose>

            {/* CTAs - Outside Prose */}
            {(primaryCTA || secondaryCTA) && (
              <div className={cn(
                "flex flex-col sm:flex-row gap-4",
                textAlign === "center" && "justify-center",
                textAlign === "right" && "justify-end"
              )}>
                {primaryCTA && (
                  <Button
                    size="lg"
                    asChild={!!primaryCTA.href}
                    onClick={primaryCTA.onClick}
                  >
                    {primaryCTA.href ? (
                      <a href={primaryCTA.href}>{primaryCTA.text}</a>
                    ) : (
                      primaryCTA.text
                    )}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild={!!secondaryCTA.href}
                    onClick={secondaryCTA.onClick}
                  >
                    {secondaryCTA.href ? (
                      <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                    ) : (
                      secondaryCTA.text
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-2xl bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={image.priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroTextImage component
 */
export const heroTextImageSchema = {
  type: "object",
  properties: {
    badge: {
      type: "string",
      description: "Badge text displayed above the headline",
    },
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Subheadline or description text",
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
        onClick: { type: "function" },
      },
      required: ["text"],
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
        onClick: { type: "function" },
      },
      required: ["text"],
    },
    image: {
      type: "object",
      properties: {
        src: { type: "string" },
        alt: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
        priority: { type: "boolean" },
      },
      required: ["src", "alt"],
    },
    textAlign: {
      type: "string",
      enum: ["left", "center", "right"],
      default: "center",
    },
    className: {
      type: "string",
    },
  },
  required: ["headline", "image"],
};