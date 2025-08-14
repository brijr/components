"use client";

import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Props for the HeroWithForm component
 */
export interface HeroWithFormProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline?: string;
  /** Form configuration */
  form: {
    /** Placeholder text for the input field */
    placeholder: string;
    /** Button text */
    buttonText: string;
    /** Form action URL */
    action?: string;
    /** Form method */
    method?: "GET" | "POST";
    /** Input field name attribute */
    inputName?: string;
    /** Input field type */
    inputType?: "email" | "text" | "tel";
  };
  /** Helper text below the form */
  helperText?: string;
  /** Secondary call-to-action link */
  secondaryCTA?: {
    /** Link text */
    text: string;
    /** Link URL */
    href: string;
  };
}

/**
 * Hero section with an inline form for lead capture.
 * Perfect for email signups, early access, or simple contact forms.
 *
 * @example
 * ```tsx
 * <HeroWithForm
 *   headline="Get early access"
 *   subheadline="Be the first to experience our revolutionary new platform"
 *   form={{
 *     placeholder: "Enter your email",
 *     buttonText: "Join Waitlist",
 *     inputType: "email",
 *     inputName: "email"
 *   }}
 *   helperText="No spam, unsubscribe anytime. 5,234 people joined this week."
 *   secondaryCTA={{
 *     text: "Learn more about our launch",
 *     href: "/about"
 *   }}
 * />
 * ```
 */
export const HeroWithForm = ({
  headline,
  subheadline,
  form,
  helperText,
  secondaryCTA,
}: HeroWithFormProps) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (!form.action) {
      e.preventDefault();
      // Handle form submission in JavaScript if no action is provided
      console.log("Form submitted with value:", value);
    }
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={6} align="center">
          {/* Text content */}
          <Flex direction="column" gap={4} align="center">
            <Header as="h1" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground text-center max-w-2xl">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            action={form.action}
            method={form.method || "POST"}
            className="w-full max-w-md"
          >
            <Flex direction="column" gap={2} align="center">
              <Flex gap={2} className="w-full">
                <Input
                  type={form.inputType || "email"}
                  name={form.inputName || "email"}
                  placeholder={form.placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="lg">
                  {form.buttonText}
                </Button>
              </Flex>

              {helperText && (
                <p className="text-sm text-muted-foreground text-center">
                  {helperText}
                </p>
              )}
            </Flex>
          </form>

          {/* Secondary CTA */}
          {secondaryCTA && (
            <Button variant="link" asChild>
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithForm component
 */
export const heroWithFormSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Supporting subheadline text",
    },
    form: {
      type: "object",
      properties: {
        placeholder: {
          type: "string",
          description: "Placeholder text for the input field",
        },
        buttonText: {
          type: "string",
          description: "Button text",
        },
        action: {
          type: "string",
          description: "Form action URL",
        },
        method: {
          type: "string",
          enum: ["GET", "POST"],
          description: "Form method",
          default: "POST",
        },
        inputName: {
          type: "string",
          description: "Input field name attribute",
          default: "email",
        },
        inputType: {
          type: "string",
          enum: ["email", "text", "tel"],
          description: "Input field type",
          default: "email",
        },
      },
      required: ["placeholder", "buttonText"],
      description: "Form configuration",
    },
    helperText: {
      type: "string",
      description: "Helper text below the form",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Link text",
        },
        href: {
          type: "string",
          description: "Link URL",
        },
      },
      required: ["text", "href"],
      description: "Secondary call-to-action link",
    },
  },
  required: ["headline", "form"],
};
