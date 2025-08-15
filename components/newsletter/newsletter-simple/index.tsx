import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Form } from "@/components/site/form";

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
    /** Webhook URL for form submission */
    webhookUrl?: string;
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
  const backgroundClasses = {
    default: "",
    accent: "bg-accent",
    muted: "bg-muted/50",
  };

  // Build form fields configuration
  const fields = [];
  
  if (form.showNameField) {
    fields.push({
      name: "name",
      type: "text" as const,
      label: "Name",
      placeholder: form.namePlaceholder || "Your name",
      showLabel: false,
    });
  }
  
  fields.push({
    name: form.inputName || "email",
    type: "email" as const,
    label: "Email address",
    placeholder: form.placeholder,
    validation: {
      required: true,
    },
    showLabel: false,
  });

  return (
    <Section className={backgroundClasses[variant]}>
      <Container>
        <div className="max-w-2xl mx-auto">
          <Flex direction="column" gap={8} className="items-center">
            {/* Text content */}
            <Flex direction="column" gap={6} className="items-center">
              <Header as="h2" className="text-center">
                {headline}
              </Header>
              {description && (
                <p className="text-xl text-center text-muted-foreground max-w-xl">
                  {description}
                </p>
              )}
            </Flex>

            {/* Form */}
            <div className="w-full max-w-md">
              <Form
                fields={fields}
                webhookUrl={form.webhookUrl || "/api/newsletter"}
                showSuccessMessage={true}
                successMessage={form.successMessage || "Thanks for subscribing!"}
                resetOnSubmit={true}
                submitText={form.buttonText}
                columns={1}
                gap={4}
                showLabels={false}
                inlineErrors={false}
              />
            </div>

            {/* Privacy text */}
            {privacyText && (
              <p className="text-sm text-muted-foreground text-center">
                {privacyText}
                {privacyLink && (
                  <>
                    {" "}
                    <Link
                      href={privacyLink}
                      className="underline hover:no-underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                )}
              </p>
            )}
          </Flex>
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
        webhookUrl: {
          type: "string",
          description: "Webhook URL for form submission",
          default: "/api/newsletter",
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