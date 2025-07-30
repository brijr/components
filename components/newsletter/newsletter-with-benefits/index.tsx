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
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Props for the NewsletterWithBenefits component
 */
export interface NewsletterWithBenefitsProps {
  /** Section headline */
  headline: string;
  /** Supporting description */
  description?: string;
  /** List of benefits */
  benefits: string[];
  /** Form configuration */
  form: {
    /** Input placeholder */
    placeholder: string;
    /** Button text */
    buttonText: string;
    /** Success message */
    successMessage?: string;
    /** Layout style */
    layout?: "inline" | "stacked";
  };
  /** Trust indicators */
  trustIndicators?: {
    /** Subscriber count */
    subscriberCount?: string;
    /** Frequency text */
    frequency?: string;
    /** Other trust text */
    customText?: string;
  };
  /** Background style */
  backgroundStyle?: "default" | "gradient" | "pattern";
}

/**
 * Newsletter signup with benefits list.
 * Emphasizes value proposition with clear benefits.
 *
 * @example
 * ```tsx
 * <NewsletterWithBenefits
 *   headline="Level up your skills"
 *   description="Join our community and get exclusive content"
 *   benefits={[
 *     "Weekly tutorials and guides",
 *     "Early access to new features",
 *     "Exclusive discounts and offers",
 *     "Direct access to our team"
 *   ]}
 *   form={{
 *     placeholder: "Enter your email",
 *     buttonText: "Get started",
 *     layout: "inline"
 *   }}
 *   trustIndicators={{
 *     subscriberCount: "50,000+ developers",
 *     frequency: "Weekly updates"
 *   }}
 *   backgroundStyle="gradient"
 * />
 * ```
 */
export const NewsletterWithBenefits = ({
  headline,
  description,
  benefits,
  form,
  trustIndicators,
  backgroundStyle = "default",
}: NewsletterWithBenefitsProps) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const backgroundClasses = {
    default: "",
    gradient: "bg-gradient-to-br from-primary/5 to-primary/10",
    pattern: "bg-muted/50",
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
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className={backgroundClasses[backgroundStyle]}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content side */}
          <div>
            <Stack spacing="lg">
              <Stack spacing="md">
                <Heading level={2}>{headline}</Heading>
                {description && (
                  <Text variant="lead" color="muted">
                    {description}
                  </Text>
                )}
              </Stack>

              {/* Benefits list */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <Text>{benefit}</Text>
                  </li>
                ))}
              </ul>

              {/* Trust indicators */}
              {trustIndicators && (
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {trustIndicators.subscriberCount && (
                    <span>{trustIndicators.subscriberCount}</span>
                  )}
                  {trustIndicators.subscriberCount && trustIndicators.frequency && (
                    <span aria-hidden="true">·</span>
                  )}
                  {trustIndicators.frequency && (
                    <span>{trustIndicators.frequency}</span>
                  )}
                  {((trustIndicators.subscriberCount || trustIndicators.frequency) && trustIndicators.customText) && (
                    <span aria-hidden="true">·</span>
                  )}
                  {trustIndicators.customText && (
                    <span>{trustIndicators.customText}</span>
                  )}
                </div>
              )}
            </Stack>
          </div>

          {/* Form side */}
          <div>
            <form onSubmit={handleSubmit}>
              {form.layout === "inline" ? (
                <div className="flex gap-2">
                  <Label htmlFor="newsletter-email-benefits" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="newsletter-email-benefits"
                    type="email"
                    placeholder={form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSubmitting} size="lg">
                    {isSubmitting ? "Subscribing..." : form.buttonText}
                  </Button>
                </div>
              ) : (
                <Stack spacing="sm">
                  <Label htmlFor="newsletter-email-benefits" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="newsletter-email-benefits"
                    type="email"
                    placeholder={form.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                    {isSubmitting ? "Subscribing..." : form.buttonText}
                  </Button>
                </Stack>
              )}
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for NewsletterWithBenefits component
 */
export const newsletterWithBenefitsSchema = {
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
    benefits: {
      type: "array",
      items: {
        type: "string",
      },
      description: "List of benefits",
      minItems: 1,
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
        layout: {
          type: "string",
          enum: ["inline", "stacked"],
          description: "Layout style",
          default: "inline",
        },
      },
      required: ["placeholder", "buttonText"],
      description: "Form configuration",
    },
    trustIndicators: {
      type: "object",
      properties: {
        subscriberCount: {
          type: "string",
          description: "Subscriber count",
        },
        frequency: {
          type: "string",
          description: "Frequency text",
        },
        customText: {
          type: "string",
          description: "Other trust text",
        },
      },
      description: "Trust indicators",
    },
    backgroundStyle: {
      type: "string",
      enum: ["default", "gradient", "pattern"],
      description: "Background style",
      default: "default",
    },
  },
  required: ["headline", "benefits", "form"],
};