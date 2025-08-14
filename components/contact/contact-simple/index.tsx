"use client";

import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Contact form field configuration
 */
export interface ContactFormField {
  /** Field name (used for form data) */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type: "text" | "email" | "tel" | "textarea" | "select";
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Options for select fields */
  options?: Array<{
    value: string;
    label: string;
  }>;
  /** Number of rows for textarea */
  rows?: number;
}

/**
 * Props for the ContactSimple component
 */
export interface ContactSimpleProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Form fields configuration */
  fields: ContactFormField[];
  /** Submit button text */
  submitText?: string;
  /** Success message */
  successMessage?: string;
  /** Optional contact information */
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
}

/**
 * Simple contact form with configurable fields.
 * Perfect for basic contact pages and support forms.
 *
 * @example
 * ```tsx
 * <ContactSimple
 *   headline="Get in touch"
 *   subheadline="We'd love to hear from you"
 *   fields={[
 *     {
 *       name: "name",
 *       label: "Name",
 *       type: "text",
 *       placeholder: "Your name",
 *       required: true
 *     },
 *     {
 *       name: "email",
 *       label: "Email",
 *       type: "email",
 *       placeholder: "your@email.com",
 *       required: true
 *     },
 *     {
 *       name: "message",
 *       label: "Message",
 *       type: "textarea",
 *       placeholder: "How can we help?",
 *       rows: 4,
 *       required: true
 *     }
 *   ]}
 *   submitText="Send message"
 *   action="/api/contact"
 *   successMessage="Thanks for your message!"
 *   contactInfo={{
 *     email: "hello@example.com",
 *     phone: "+1 (555) 123-4567"
 *   }}
 * />
 * ```
 */
export const ContactSimple = ({
  headline,
  subheadline,
  fields,
  submitText = "Send message",
  successMessage = "Thank you for your message. We'll get back to you soon!",
  contactInfo,
}: ContactSimpleProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(successMessage);
      console.log(formData);

      // Reset form
      event.currentTarget.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center">
            <Header as="h2">{headline}</Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap={6}>
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      
                      {field.type === "textarea" ? (
                        <Textarea
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={field.rows || 4}
                          disabled={isSubmitting}
                        />
                      ) : field.type === "select" && field.options ? (
                        <Select name={field.name} required={field.required} disabled={isSubmitting}>
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder={field.placeholder || "Select an option"} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={isSubmitting}
                        />
                      )}
                    </div>
                  ))}

                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Sending..." : submitText}
                  </Button>
                </Flex>
              </form>
            </div>

            {/* Contact Info */}
            {contactInfo && (
              <div className="lg:col-span-1">
                <Flex direction="column" gap={6}>
                  {contactInfo.email && (
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-primary hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}

                  {contactInfo.phone && (
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-primary hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}

                  {contactInfo.address && (
                    <div>
                      <p className="font-medium mb-1">Address</p>
                      <p className="text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  )}

                  {contactInfo.hours && (
                    <div>
                      <p className="font-medium mb-1">Hours</p>
                      <p className="text-muted-foreground">{contactInfo.hours}</p>
                    </div>
                  )}
                </Flex>
              </div>
            )}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for ContactSimple component
 */
export const contactSimpleSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Field name",
          },
          label: {
            type: "string",
            description: "Field label",
          },
          type: {
            type: "string",
            enum: ["text", "email", "tel", "textarea", "select"],
            description: "Field type",
          },
          placeholder: {
            type: "string",
            description: "Placeholder text",
          },
          required: {
            type: "boolean",
            description: "Whether the field is required",
            default: false,
          },
          options: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                label: { type: "string" },
              },
              required: ["value", "label"],
            },
            description: "Options for select fields",
          },
          rows: {
            type: "number",
            description: "Number of rows for textarea",
            default: 4,
          },
        },
        required: ["name", "label", "type"],
      },
      description: "Form fields configuration",
      minItems: 1,
    },
    submitText: {
      type: "string",
      description: "Submit button text",
      default: "Send message",
    },
    action: {
      type: "string",
      description: "Form submission endpoint",
      default: "/api/contact",
    },
    successMessage: {
      type: "string",
      description: "Success message",
      default: "Thank you for your message. We'll get back to you soon!",
    },
    contactInfo: {
      type: "object",
      properties: {
        email: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        hours: { type: "string" },
      },
      description: "Optional contact information",
    },
  },
  required: ["headline", "fields"],
};