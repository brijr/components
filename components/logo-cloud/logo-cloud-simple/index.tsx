import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Section,
  Container,
} from "@/components/site/ds";

/**
 * Logo configuration
 */
export interface LogoItem {
  /** Company name (used for alt text) */
  name: string;
  /** Logo image source */
  src: string;
  /** Logo width */
  width?: number;
  /** Logo height */
  height?: number;
  /** Optional link to company website */
  href?: string;
}

/**
 * Props for the LogoCloudSimple component
 */
export interface LogoCloudSimpleProps {
  /** Array of logos to display */
  logos: LogoItem[];
  /** Number of columns on desktop */
  columns?: 4 | 5 | 6;
  /** Visual variant */
  variant?: "default" | "bordered" | "contained";
  /** Logo display style */
  logoStyle?: "grayscale" | "color" | "dark";
}

/**
 * Basic logo grid showcasing partner or client companies.
 * Perfect for building trust with recognizable brands.
 *
 * @example
 * ```tsx
 * <LogoCloudSimple
 *   logos={[
 *     {
 *       name: "Acme Corp",
 *       src: "/logos/acme.svg",
 *       width: 120,
 *       height: 40,
 *       href: "https://acme.com"
 *     },
 *     {
 *       name: "TechCo",
 *       src: "/logos/techco.svg",
 *       width: 100,
 *       height: 40
 *     },
 *     // ... more logos
 *   ]}
 *   columns={5}
 *   variant="default"
 *   logoStyle="grayscale"
 * />
 * ```
 */
export const LogoCloudSimple = ({
  logos,
  columns = 5,
  variant = "default",
  logoStyle = "grayscale",
}: LogoCloudSimpleProps) => {
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

  const getContainerClass = () => {
    switch (variant) {
      case "bordered":
        return "divide-x divide-y divide-border";
      case "contained":
        return "gap-px bg-border p-px";
      default:
        return "gap-8 lg:gap-12";
    }
  };

  const getCellClass = () => {
    switch (variant) {
      case "bordered":
        return "flex items-center justify-center p-8";
      case "contained":
        return "flex items-center justify-center bg-background p-8";
      default:
        return "flex items-center justify-center";
    }
  };

  const renderLogo = (logo: LogoItem, index: number) => {
    const logoElement = (
      <div className="relative">
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.width || 120}
          height={logo.height || 40}
          className={`h-auto max-h-12 w-auto ${getLogoClass()}`}
        />
      </div>
    );

    if (logo.href) {
      return (
        <Link
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={getCellClass()}
          aria-label={`Visit ${logo.name} website`}
        >
          {logoElement}
        </Link>
      );
    }

    return (
      <div key={index} className={getCellClass()}>
        {logoElement}
      </div>
    );
  };

  return (
    <Section>
      <Container>
        {variant === "contained" ? (
          <div className="rounded-lg overflow-hidden">
            <div className={`grid ${gridCols[columns]} ${getContainerClass()}`}>
              {logos.map((logo, index) => renderLogo(logo, index))}
            </div>
          </div>
        ) : (
          <div className={`grid ${gridCols[columns]} ${getContainerClass()}`}>
            {logos.map((logo, index) => renderLogo(logo, index))}
          </div>
        )}
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for LogoCloudSimple component
 */
export const logoCloudSimpleSchema = {
  type: "object",
  properties: {
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
          href: {
            type: "string",
            description: "Optional link to company website",
          },
        },
        required: ["name", "src"],
      },
      description: "Array of logos to display",
      minItems: 4,
    },
    columns: {
      type: "number",
      enum: [4, 5, 6],
      description: "Number of columns on desktop",
      default: 5,
    },
    variant: {
      type: "string",
      enum: ["default", "bordered", "contained"],
      description: "Visual variant",
      default: "default",
    },
    logoStyle: {
      type: "string",
      enum: ["grayscale", "color", "dark"],
      description: "Logo display style",
      default: "grayscale",
    },
  },
  required: ["logos"],
};