"use client";

import * as React from "react";
import { Stack, Text } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/**
 * Props for the NewsletterInline component
 */
export interface NewsletterInlineProps {
  /** Headline text */
  headline: string;
  /** Form configuration */
  form: {
    /** Input placeholder */
    placeholder: string;
    /** Button text */
    buttonText: string;
    /** Success message */
    successMessage?: string;
  };
  /** Component variant */
  variant?: "default" | "compact";
  /** Alignment */
  align?: "left" | "center" | "right";
}

/**
 * Inline newsletter form for embedding in other components.
 * Minimal design that fits well in headers, footers, or sidebars.
 *
 * @example
 * ```tsx
 * <NewsletterInline
 *   headline="Get updates in your inbox"
 *   form={{
 *     placeholder: "Enter your email",
 *     buttonText: "Subscribe"
 *   }}
 *   variant="compact"
 *   align="center"
 * />
 * ```
 */
export const NewsletterInline = ({
  headline,
  form,
  variant = "default",
  align = "left",
}: NewsletterInlineProps) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(form.successMessage || "Thanks for subscribing!");
      
      // Reset form
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Stack spacing={variant === "compact" ? "sm" : "md"} className={alignmentClasses[align]}>
        <Text className={variant === "compact" ? "font-medium" : "font-semibold text-lg"}>
          {headline}
        </Text>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex gap-2">
            <Label htmlFor="newsletter-inline-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-inline-email"
              type="email"
              placeholder={form.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1"
              size={variant === "compact" ? "sm" : "default"}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              size={variant === "compact" ? "sm" : "default"}
            >
              {isSubmitting ? "..." : form.buttonText}
            </Button>
          </div>
        </form>
      </Stack>
    </div>
  );
};

/**
 * JSON Schema for NewsletterInline component
 */
export const newsletterInlineSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Headline text",
    },
    form: {
      type: "object",
      properties: {
        placeholder: {
          type: "string",
          description: "Input placeholder",
        },
        buttonText: {
          type: "string",
          description: "Button text",
        },
        successMessage: {
          type: "string",
          description: "Success message",
        },
      },
      required: ["placeholder", "buttonText"],
      description: "Form configuration",
    },
    variant: {
      type: "string",
      enum: ["default", "compact"],
      description: "Component variant",
      default: "default",
    },
    align: {
      type: "string",
      enum: ["left", "center", "right"],
      description: "Alignment",
      default: "left",
    },
  },
  required: ["headline", "form"],
};