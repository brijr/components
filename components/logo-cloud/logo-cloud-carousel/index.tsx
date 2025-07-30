"use client";

import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
} from "@/components/ds";

/**
 * Logo configuration for carousel
 */
export interface CarouselLogoItem {
  /** Company name (used for alt text) */
  name: string;
  /** Logo image source */
  src: string;
  /** Logo width */
  width?: number;
  /** Logo height */
  height?: number;
}

/**
 * Props for the LogoCloudCarousel component
 */
export interface LogoCloudCarouselProps {
  /** Array of logos to display */
  logos: CarouselLogoItem[];
  /** Animation speed in seconds */
  speed?: number;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Direction of scroll */
  direction?: "left" | "right";
  /** Logo display style */
  logoStyle?: "grayscale" | "color" | "dark";
}

/**
 * Auto-scrolling logo carousel with infinite loop.
 * Great for showcasing many partners in limited space.
 *
 * @example
 * ```tsx
 * <LogoCloudCarousel
 *   logos={[
 *     {
 *       name: "Company A",
 *       src: "/logos/company-a.svg",
 *       width: 120,
 *       height: 40
 *     },
 *     {
 *       name: "Company B",
 *       src: "/logos/company-b.svg",
 *       width: 100,
 *       height: 40
 *     },
 *     // ... more logos (minimum 8-10 recommended)
 *   ]}
 *   speed={30}
 *   pauseOnHover
 *   direction="left"
 *   logoStyle="grayscale"
 * />
 * ```
 */
export const LogoCloudCarousel = ({
  logos,
  speed = 30,
  pauseOnHover = true,
  direction = "left",
  logoStyle = "grayscale",
}: LogoCloudCarouselProps) => {
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  const getLogoClass = () => {
    const base = "transition-all duration-200";
    const styles = {
      grayscale: "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
      color: "opacity-80 hover:opacity-100",
      dark: "brightness-0 dark:brightness-100 opacity-60 hover:opacity-100",
    };
    return `${base} ${styles[logoStyle]}`;
  };

  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  
  return (
    <Section className="overflow-hidden">
      <Container className="relative">
        <div className="relative">
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
          
          {/* Scrolling container */}
          <div
            className="flex items-center"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          >
            <div
              className={`flex items-center gap-12 ${animationClass}`}
              style={{
                "--scroll-speed": `${speed}s`,
                animationPlayState: isPaused ? "paused" : "running",
              } as React.CSSProperties}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width || 120}
                    height={logo.height || 40}
                    className={`h-auto max-h-12 w-auto ${getLogoClass()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Custom styles for animation */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-scroll-left {
            animation: scroll-left var(--scroll-speed) linear infinite;
          }
          
          .animate-scroll-right {
            animation: scroll-right var(--scroll-speed) linear infinite;
          }
        `}</style>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for LogoCloudCarousel component
 */
export const logoCloudCarouselSchema = {
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
        },
        required: ["name", "src"],
      },
      description: "Array of logos to display",
      minItems: 8,
    },
    speed: {
      type: "number",
      description: "Animation speed in seconds",
      default: 30,
    },
    pauseOnHover: {
      type: "boolean",
      description: "Pause animation on hover",
      default: true,
    },
    direction: {
      type: "string",
      enum: ["left", "right"],
      description: "Direction of scroll",
      default: "left",
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