import * as React from "react";
import { Container, Inline } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * Props for the CTABanner component
 */
export interface CTABannerProps {
  /** Banner message text */
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
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Banner variant */
  variant?: "default" | "primary" | "warning" | "success";
  /** Banner position */
  position?: "top" | "bottom";
}

/**
 * Full-width banner CTA for announcements and urgent actions.
 * Perfect for promotions, alerts, or important notifications.
 *
 * @example
 * ```tsx
 * <CTABanner
 *   message="Limited time offer: Get 50% off annual plans"
 *   primaryCTA={{ text: "Claim Offer", href: "/offer" }}
 *   secondaryCTA={{ text: "Learn More", href: "/pricing" }}
 *   dismissible
 *   variant="primary"
 *   position="top"
 * />
 * ```
 */
export const CTABanner = ({
  message,
  primaryCTA,
  secondaryCTA,
  dismissible = false,
  onDismiss,
  variant = "default",
  position = "top",
}: CTABannerProps) => {
  const variantStyles = {
    default: "bg-background border-b",
    primary: "bg-primary text-primary-foreground",
    warning: "bg-warning text-warning-foreground",
    success: "bg-success text-success-foreground",
  };

  const positionStyles = {
    top: "border-b",
    bottom: "border-t",
  };

  return (
    <div className={`${variantStyles[variant]} ${positionStyles[position]}`}>
      <Container>
        <div className="py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium flex-1 pr-4">
            {message}
          </p>
          
          <div className="flex items-center gap-3">
            <Inline spacing="sm">
              <Button 
                size="sm" 
                variant={variant === "default" ? "default" : "secondary"}
                asChild
              >
                <a href={primaryCTA.href}>{primaryCTA.text}</a>
              </Button>
              {secondaryCTA && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  asChild
                  className={variant !== "default" ? "hover:bg-white/20" : ""}
                >
                  <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                </Button>
              )}
            </Inline>
            
            {dismissible && (
              <Button
                size="sm"
                variant="ghost"
                className={`ml-2 p-1 h-auto ${variant !== "default" ? "hover:bg-white/20" : ""}`}
                onClick={onDismiss}
                aria-label="Dismiss banner"
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
 * JSON Schema for CTABanner component
 */
export const ctaBannerSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Banner message text",
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
      default: false,
    },
    variant: {
      type: "string",
      enum: ["default", "primary", "warning", "success"],
      description: "Banner variant",
      default: "default",
    },
    position: {
      type: "string",
      enum: ["top", "bottom"],
      description: "Banner position",
      default: "top",
    },
  },
  required: ["message", "primaryCTA"],
};