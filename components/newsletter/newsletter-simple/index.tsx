"use client";

import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/**
 * Props for the NewsletterSimple component
 */
export interface NewsletterSimpleProps {
  /** Section headline */
  headline: string;
  /** Supporting description */
  description?: string;
  /** Form configuration */
  form: {
    /** Input placeholder */
    placeholder: string;
    /** Button text */
    buttonText: string;
    /** Success message */
    successMessage?: string;
    /** Input field name */
    inputName?: string;
    /** Whether to show name field */
    showNameField?: boolean;
    /** Name field placeholder */
    namePlaceholder?: string;
  };
  /** Privacy text */
  privacyText?: string;
  /** Privacy link */
  privacyLink?: string;
  /** Background variant */
  variant?: "default" | "accent" | "muted";
}

/**
 * Simple newsletter signup form.
 * Clean design focused on email capture.
 *
 * @example
 * ```tsx
 * <NewsletterSimple
 *   headline="Stay in the loop"
 *   description="Get the latest updates delivered to your inbox"
 *   form={{
 *     placeholder: "Enter your email",
 *     buttonText: "Subscribe",
 *     successMessage: "Thanks for subscribing!"
 *   }}
 *   privacyText="We respect your privacy. Unsubscribe at any time."
 *   privacyLink="/privacy"
 *   variant="accent"
 * />
 * ```
 */
export const NewsletterSimple = ({
  headline,
  description,
  form,
  privacyText,
  privacyLink,
  variant = "default",
}: NewsletterSimpleProps) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const backgroundClasses = {
    default: "",
    accent: "bg-accent",
    muted: "bg-muted/50",
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
      setName("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className={backgroundClasses[variant]}>
      <Container>
        <div className="max-w-2xl mx-auto">
          <Stack spacing="lg" align="center">
            {/* Text content */}
            <Stack spacing="md" align="center">
              <Heading level={2} align="center">
                {headline}
              </Heading>
              {description && (
                <Text
                  variant="lead"
                  align="center"
                  color="muted"
                  className="max-w-xl"
                >
                  {description}
                </Text>
              )}
            </Stack>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <Stack spacing="md">
                {form.showNameField && (
                  <div>
                    <Label htmlFor="newsletter-name" className="sr-only">
                      Name
                    </Label>
                    <Input
                      id="newsletter-name"
                      type="text"
                      name="name"
                      placeholder={form.namePlaceholder || "Your name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    name={form.inputName || "email"}
                    placeholder={form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : form.buttonText}
                  </Button>
                </div>
              </Stack>
            </form>

            {/* Privacy text */}
            {privacyText && (
              <Text variant="small" color="muted" align="center">
                {privacyText}
                {privacyLink && (
                  <>
                    {" "}
                    <a
                      href={privacyLink}
                      className="underline hover:no-underline"
                    >
                      Privacy Policy
                    </a>
                  </>
                )}
              </Text>
            )}
          </Stack>
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for NewsletterSimple component
 */
export const newsletterSimpleSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    description: {
      type: "string",
      description: "Supporting description",
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
        inputName: {
          type: "string",
          description: "Input field name",
          default: "email",
        },
        showNameField: {
          type: "boolean",
          description: "Whether to show name field",
          default: false,
        },
        namePlaceholder: {
          type: "string",
          description: "Name field placeholder",
          default: "Your name",
        },
      },
      required: ["placeholder", "buttonText"],
      description: "Form configuration",
    },
    privacyText: {
      type: "string",
      description: "Privacy text",
    },
    privacyLink: {
      type: "string",
      description: "Privacy link",
    },
    variant: {
      type: "string",
      enum: ["default", "accent", "muted"],
      description: "Background variant",
      default: "default",
    },
  },
  required: ["headline", "form"],
};