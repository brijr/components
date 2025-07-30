import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

/**
 * Props for the TestimonialSingle component
 */
export interface TestimonialSingleProps {
  /** Section headline */
  headline?: string;
  /** Customer quote */
  quote: string;
  /** Customer name */
  author: string;
  /** Customer role/title */
  role: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Company logo */
  companyLogo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Star rating (1-5) */
  rating?: number;
  /** Layout variant */
  variant?: "centered" | "split";
  /** Background variant */
  background?: "default" | "muted" | "primary";
}

/**
 * Featured single testimonial with prominent display.
 * Perfect for highlighting a key customer success story.
 *
 * @example
 * ```tsx
 * <TestimonialSingle
 *   headline="Customer spotlight"
 *   quote="This solution transformed our business operations..."
 *   author: "Jane Smith",
 *   role: "CEO",
 *   company: "TechCorp",
 *   avatar: "/avatars/jane.jpg",
 *   companyLogo={{
 *     src: "/logos/techcorp.svg",
 *     alt: "TechCorp",
 *     width: 120,
 *     height: 40
 *   }}
 *   rating={5}
 *   variant="centered"
 *   background="muted"
 * />
 * ```
 */
export const TestimonialSingle = ({
  headline,
  quote,
  author,
  role,
  company,
  avatar,
  companyLogo,
  rating,
  variant = "centered",
  background = "default",
}: TestimonialSingleProps) => {
  const backgroundStyles = {
    default: "",
    muted: "bg-muted/50",
    primary: "bg-primary text-primary-foreground",
  };

  const content = (
    <>
      {/* Rating */}
      {rating && (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? background === "primary"
                    ? "fill-primary-foreground text-primary-foreground"
                    : "fill-primary text-primary"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="relative">
        <Quote 
          className={`absolute -top-4 -left-4 w-12 h-12 ${
            background === "primary" 
              ? "text-primary-foreground/20" 
              : "text-muted-foreground/20"
          }`} 
        />
        <Text 
          variant="lead" 
          className="relative text-2xl md:text-3xl font-medium leading-relaxed"
        >
          "{quote}"
        </Text>
      </blockquote>

      {/* Author */}
      <div className={`flex items-center gap-4 ${
        variant === "centered" ? "justify-center" : ""
      }`}>
        {avatar && (
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback className="text-lg">
              {author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <div className="font-semibold text-lg">{author}</div>
          <Text 
            color={background === "primary" ? "default" : "muted"}
          >
            {role}
            {company && ` at ${company}`}
          </Text>
        </div>
      </div>

      {/* Company Logo */}
      {companyLogo && (
        <div className={variant === "centered" ? "mx-auto" : ""}>
          <Image
            src={companyLogo.src}
            alt={companyLogo.alt}
            width={companyLogo.width}
            height={companyLogo.height}
            className={`h-auto ${
              background === "primary" ? "brightness-0 invert" : "opacity-60"
            }`}
          />
        </div>
      )}
    </>
  );

  if (variant === "split") {
    return (
      <Section className={backgroundStyles[background]}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <Stack spacing="lg">
              {headline && (
                <Heading level={2}>{headline}</Heading>
              )}
              {content}
            </Stack>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={author}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback className="text-3xl">
                      {author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className={backgroundStyles[background]}>
      <Container>
        <Stack spacing="xl" align="center" className="max-w-4xl mx-auto text-center">
          {headline && (
            <Heading level={2} align="center">{headline}</Heading>
          )}
          {content}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialSingle component
 */
export const testimonialSingleSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    quote: {
      type: "string",
      description: "Customer quote",
    },
    author: {
      type: "string",
      description: "Customer name",
    },
    role: {
      type: "string",
      description: "Customer role/title",
    },
    company: {
      type: "string",
      description: "Company name",
    },
    avatar: {
      type: "string",
      description: "Avatar image URL",
    },
    companyLogo: {
      type: "object",
      properties: {
        src: { type: "string" },
        alt: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
      },
      required: ["src", "alt", "width", "height"],
      description: "Company logo",
    },
    rating: {
      type: "number",
      minimum: 1,
      maximum: 5,
      description: "Star rating (1-5)",
    },
    variant: {
      type: "string",
      enum: ["centered", "split"],
      description: "Layout variant",
      default: "centered",
    },
    background: {
      type: "string",
      enum: ["default", "muted", "primary"],
      description: "Background variant",
      default: "default",
    },
  },
  required: ["quote", "author", "role"],
};