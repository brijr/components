import * as React from "react";
import { Flex } from "@/components/site/ds";
import { Form } from "@/components/site/form";

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
    /** Webhook URL for form submission */
    webhookUrl?: string;
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
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const fields = [
    {
      name: "email",
      type: "email" as const,
      label: "Email address",
      placeholder: form.placeholder,
      validation: {
        required: true,
      },
      showLabel: false,
    },
  ];

  return (
    <div className="w-full">
      <Flex 
        direction="column" 
        gap={variant === "compact" ? 3 : 6} 
        className={alignmentClasses[align]}
      >
        <p className={variant === "compact" ? "font-medium" : "font-semibold text-lg"}>
          {headline}
        </p>
        
        <div className="w-full max-w-sm">
          <Form
            fields={fields}
            webhookUrl={form.webhookUrl || "/api/newsletter"}
            showSuccessMessage={true}
            successMessage={form.successMessage || "Thanks for subscribing!"}
            resetOnSubmit={true}
            submitText={form.buttonText}
            columns={1}
            gap={2}
            showLabels={false}
            inlineErrors={false}
          />
        </div>
      </Flex>
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
        webhookUrl: {
          type: "string",
          description: "Webhook URL for form submission",
          default: "/api/newsletter",
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