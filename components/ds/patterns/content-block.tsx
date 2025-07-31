import * as React from "react";
import { Section } from "../section";
import { Container } from "../container";
import { Stack } from "../stack";
import { Heading } from "../heading";
import { Text } from "../text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ContentBlockProps {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Optional badge text */
  badge?: string;
  /** Optional image URL */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Position of the image relative to content */
  imagePosition?: "left" | "right";
  /** Optional CTA button text */
  buttonText?: string;
  /** Optional CTA button href */
  buttonHref?: string;
  /** Additional content (like lists, additional buttons, etc.) */
  children?: React.ReactNode;
  /** Additional className for the section */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * ContentBlock pattern component for common content sections with optional image.
 * Combines Section, Container, Stack, Heading, Text, and Image components.
 * 
 * @example
 * ```tsx
 * // Simple content block
 * <ContentBlock
 *   title="Our Mission"
 *   description="We help teams build better products faster."
 * />
 * 
 * // With image on the right
 * <ContentBlock
 *   title="Powerful Features"
 *   description="Everything you need to succeed."
 *   image="/features.jpg"
 *   imagePosition="right"
 *   buttonText="Learn More"
 *   buttonHref="/features"
 * />
 * 
 * // With badge and custom content
 * <ContentBlock
 *   badge="New"
 *   title="Introducing AI Assistant"
 *   description="Get intelligent suggestions as you work."
 *   image="/ai-assistant.jpg"
 * >
 *   <ul>
 *     <li>Smart code completion</li>
 *     <li>Error detection</li>
 *     <li>Performance tips</li>
 *   </ul>
 * </ContentBlock>
 * ```
 */
export function ContentBlock({
  title,
  description,
  badge,
  image,
  imageAlt,
  imagePosition = "right",
  buttonText,
  buttonHref,
  children,
  className,
  containerClassName,
}: ContentBlockProps) {
  const content = (
    <Stack spacing="md">
      {badge && <Badge>{badge}</Badge>}
      <Heading size={2}>{title}</Heading>
      <Text subdued>{description}</Text>
      {children}
      {buttonText && (
        <div>
          <Button asChild={!!buttonHref}>
            {buttonHref ? (
              <a href={buttonHref}>{buttonText}</a>
            ) : (
              <span>{buttonText}</span>
            )}
          </Button>
        </div>
      )}
    </Stack>
  );

  const imageElement = image && (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        className="object-cover"
      />
    </div>
  );

  return (
    <Section className={className}>
      <Container className={containerClassName}>
        {image ? (
          <div className="grid items-center gap-12 md:grid-cols-2">
            {imagePosition === "left" ? (
              <>
                {imageElement}
                {content}
              </>
            ) : (
              <>
                {content}
                {imageElement}
              </>
            )}
          </div>
        ) : (
          content
        )}
      </Container>
    </Section>
  );
}