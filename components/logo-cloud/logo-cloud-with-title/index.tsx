import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

/**
 * Logo with metadata
 */
export interface TitledLogoItem {
  /** Company name */
  name: string;
  /** Logo image source */
  src: string;
  /** Logo width */
  width?: number;
  /** Logo height */
  height?: number;
  /** Optional description */
  description?: string;
  /** Optional link */
  href?: string;
}

/**
 * Props for the LogoCloudWithTitle component
 */
export interface LogoCloudWithTitleProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of logos to display */
  logos: TitledLogoItem[];
  /** Optional testimonial quote */
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  /** Layout variant */
  variant?: "grid" | "single-row" | "stacked";
  /** Number of columns for grid variant */
  columns?: 4 | 5 | 6;
  /** Logo display style */
  logoStyle?: "grayscale" | "color" | "dark";
  /** Show company descriptions */
  showDescriptions?: boolean;
}

/**
 * Logo cloud with section title and optional descriptions.
 * Perfect for partner showcases with context.
 *
 * @example
 * ```tsx
 * <LogoCloudWithTitle
 *   headline="Trusted by industry leaders"
 *   subheadline="Join thousands of companies already using our platform"
 *   logos={[
 *     {
 *       name: "Acme Corp",
 *       src: "/logos/acme.svg",
 *       width: 120,
 *       height: 40,
 *       description: "Leading innovation since 2010",
 *       href: "https://acme.com"
 *     },
 *     // ... more logos
 *   ]}
 *   testimonial={{
 *     quote: "This platform transformed how we work",
 *     author: "Jane Doe",
 *     role: "CEO",
 *     company: "TechCo"
 *   }}
 *   variant="grid"
 *   columns={5}
 *   logoStyle="grayscale"
 * />
 * ```
 */
export const LogoCloudWithTitle = ({
  headline,
  subheadline,
  logos,
  testimonial,
  variant = "grid",
  columns = 5,
  logoStyle = "grayscale",
  showDescriptions = false,
}: LogoCloudWithTitleProps) => {
  const gridCols = {
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  const getLogoClass = () => {
    const base = "transition-all duration-200";
    const styles = {
      grayscale: "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
      color: "opacity-80 hover:opacity-100",
      dark: "brightness-0 dark:brightness-100 opacity-60 hover:opacity-100",
    };
    return `${base} ${styles[logoStyle]}`;
  };

  const renderLogo = (logo: TitledLogoItem, index: number) => {
    const logoElement = (
      <div className="group">
        <div className="relative flex items-center justify-center">
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width || 120}
            height={logo.height || 40}
            className={`h-auto max-h-12 w-auto ${getLogoClass()}`}
          />
        </div>
        {showDescriptions && logo.description && (
          <Text
            variant="small"
            color="muted"
            align="center"
            className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {logo.description}
          </Text>
        )}
      </div>
    );

    if (logo.href) {
      return (
        <a
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4"
          aria-label={`Visit ${logo.name} website`}
        >
          {logoElement}
        </a>
      );
    }

    return (
      <div key={index} className="p-4">
        {logoElement}
      </div>
    );
  };

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md" align="center" className="text-center">
            <Heading level={2}>{headline}</Heading>
            {subheadline && (
              <Text variant="lead" color="muted" className="max-w-2xl">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Testimonial (if provided) */}
          {testimonial && (
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6 md:p-8">
                <Stack spacing="md" align="center">
                  <Quote className="w-8 h-8 text-muted-foreground" />
                  <blockquote className="text-center">
                    <Text variant="lead">&ldquo;{testimonial.quote}&rdquo;</Text>
                  </blockquote>
                  <div className="text-center">
                    <Text className="font-semibold">{testimonial.author}</Text>
                    <Text variant="small" color="muted">
                      {testimonial.role} at {testimonial.company}
                    </Text>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Logos */}
          {variant === "single-row" ? (
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-12">
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
          ) : variant === "stacked" ? (
            <Stack spacing="lg" align="center">
              {logos.map((logo, index) => (
                <div key={index} className="w-full max-w-xs">
                  {renderLogo(logo, index)}
                </div>
              ))}
            </Stack>
          ) : (
            <div className={`grid gap-4 ${gridCols[columns]}`}>
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for LogoCloudWithTitle component
 */
export const logoCloudWithTitleSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    logos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Company name",
          },
          src: {
            type: "string",
            description: "Logo image source",
          },
          width: {
            type: "number",
            description: "Logo width",
          },
          height: {
            type: "number",
            description: "Logo height",
          },
          description: {
            type: "string",
            description: "Optional description",
          },
          href: {
            type: "string",
            description: "Optional link",
          },
        },
        required: ["name", "src"],
      },
      description: "Array of logos to display",
      minItems: 3,
    },
    testimonial: {
      type: "object",
      properties: {
        quote: { type: "string" },
        author: { type: "string" },
        role: { type: "string" },
        company: { type: "string" },
      },
      required: ["quote", "author", "role", "company"],
      description: "Optional testimonial quote",
    },
    variant: {
      type: "string",
      enum: ["grid", "single-row", "stacked"],
      description: "Layout variant",
      default: "grid",
    },
    columns: {
      type: "number",
      enum: [4, 5, 6],
      description: "Number of columns for grid variant",
      default: 5,
    },
    logoStyle: {
      type: "string",
      enum: ["grayscale", "color", "dark"],
      description: "Logo display style",
      default: "grayscale",
    },
    showDescriptions: {
      type: "boolean",
      description: "Show company descriptions",
      default: false,
    },
  },
  required: ["headline", "logos"],
};