"use client";

import * as React from "react";
import { Container, Inline } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * Props for the CTAFloating component
 */
export interface CTAFloatingProps {
  /** CTA message text */
  message: string;
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
  /** Show dismiss button */
  dismissible?: boolean;
  /** Position of the floating bar */
  position?: "top" | "bottom";
  /** Delay before showing (in milliseconds) */
  showDelay?: number;
  /** Hide after scroll amount (in pixels) */
  hideOnScroll?: number;
}

/**
 * Sticky floating CTA bar that appears after user interaction.
 * Perfect for persistent calls-to-action that don't interrupt content.
 *
 * @example
 * ```tsx
 * <CTAFloating
 *   message="Ready to get started? Try our platform free for 14 days"
 *   primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 *   dismissible
 *   position="bottom"
 *   showDelay={3000}
 *   hideOnScroll={500}
 * />
 * ```
 */
export const CTAFloating = ({
  message,
  primaryCTA,
  secondaryCTA,
  dismissible = true,
  position = "bottom",
  showDelay = 3000,
  hideOnScroll,
}: CTAFloatingProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    if (isDismissed) return;

    // Show after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);

    // Hide on scroll if configured
    const handleScroll = () => {
      if (hideOnScroll && window.scrollY > hideOnScroll) {
        setIsVisible(false);
      } else if (!isDismissed && window.scrollY <= (hideOnScroll || 0)) {
        setIsVisible(true);
      }
    };

    if (hideOnScroll) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearTimeout(showTimer);
      if (hideOnScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [showDelay, hideOnScroll, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible) return null;

  const positionStyles = {
    top: "top-0 border-b animate-in slide-in-from-top-5",
    bottom: "bottom-0 border-t animate-in slide-in-from-bottom-5",
  };

  return (
    <div 
      className={`fixed left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ${positionStyles[position]} duration-300`}
    >
      <Container>
        <div className="py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium flex-1 pr-4">
            {message}
          </p>
          
          <div className="flex items-center gap-3">
            <Inline spacing="sm">
              <Button 
                size="sm" 
                asChild
              >
                <a href={primaryCTA.href}>{primaryCTA.text}</a>
              </Button>
              {secondaryCTA && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  asChild
                >
                  <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                </Button>
              )}
            </Inline>
            
            {dismissible && (
              <Button
                size="sm"
                variant="ghost"
                className="ml-2 p-1 h-auto"
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

/**
 * JSON Schema for CTAFloating component
 */
export const ctaFloatingSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "CTA message text",
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
    dismissible: {
      type: "boolean",
      description: "Show dismiss button",
      default: true,
    },
    position: {
      type: "string",
      enum: ["top", "bottom"],
      description: "Position of the floating bar",
      default: "bottom",
    },
    showDelay: {
      type: "number",
      description: "Delay before showing (in milliseconds)",
      default: 3000,
    },
    hideOnScroll: {
      type: "number",
      description: "Hide after scroll amount (in pixels)",
    },
  },
  required: ["message", "primaryCTA"],
};