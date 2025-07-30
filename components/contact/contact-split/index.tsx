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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

/**
 * Contact method configuration
 */
export interface ContactMethod {
  /** Icon to display */
  icon: React.ReactNode;
  /** Method title */
  title: string;
  /** Method description */
  description: string;
  /** Action text (e.g., email address, phone number) */
  action: string;
  /** Action href (mailto:, tel:, etc.) */
  href: string;
  /** Optional badge text */
  badge?: string;
}

/**
 * Props for the ContactSplit component
 */
export interface ContactSplitProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Contact methods */
  contactMethods: ContactMethod[];
  /** Form configuration */
  form: {
    /** Form title */
    title?: string;
    /** Form description */
    description?: string;
    /** Form fields */
    fields: Array<{
      name: string;
      label: string;
      type: "text" | "email" | "tel" | "textarea";
      placeholder?: string;
      required?: boolean;
      rows?: number;
    }>;
    /** Submit button text */
    submitText?: string;
    /** Success message */
    successMessage?: string;
  };
  /** Additional information sections */
  additionalInfo?: Array<{
    title: string;
    items: string[];
  }>;
}

/**
 * Split layout contact section with methods on one side and form on the other.
 * Ideal for providing multiple contact options alongside a contact form.
 *
 * @example
 * ```tsx
 * <ContactSplit
 *   headline="Let's start a conversation"
 *   subheadline="Choose your preferred way to reach us"
 *   contactMethods={[
 *     {
 *       icon: <Mail className="w-5 h-5" />,
 *       title: "Email us",
 *       description: "Send us an email anytime",
 *       action: "hello@example.com",
 *       href: "mailto:hello@example.com"
 *     },
 *     {
 *       icon: <Phone className="w-5 h-5" />,
 *       title: "Call us",
 *       description: "Mon-Fri from 8am to 6pm",
 *       action: "+1 (555) 123-4567",
 *       href: "tel:+15551234567",
 *       badge: "Toll-free"
 *     }
 *   ]}
 *   form={{
 *     title: "Send us a message",
 *     description: "Fill out the form and we'll get back to you within 24 hours",
 *     fields: [
 *       {
 *         name: "name",
 *         label: "Name",
 *         type: "text",
 *         required: true
 *       },
 *       {
 *         name: "email",
 *         label: "Email",
 *         type: "email",
 *         required: true
 *       },
 *       {
 *         name: "message",
 *         label: "Message",
 *         type: "textarea",
 *         rows: 4,
 *         required: true
 *       }
 *     ],
 *     submitText: "Send message"
 *   }}
 * />
 * ```
 */
export const ContactSplit = ({
  headline,
  subheadline,
  contactMethods,
  form,
  additionalInfo,
}: ContactSplitProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(form.successMessage || "We'll get back to you soon.");

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
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md" className="max-w-3xl">
            <Heading level={2}>{headline}</Heading>
            {subheadline && (
              <Text variant="lead" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Methods */}
            <div>
              <Stack spacing="xl">
                {/* Methods List */}
                <Stack spacing="lg">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="group">
                      <a
                        href={method.href}
                        className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Text className="font-semibold">{method.title}</Text>
                            {method.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {method.badge}
                              </Badge>
                            )}
                          </div>
                          <Text className="mb-2">
                            {method.description}
                          </Text>
                          <Text className="text-primary group-hover:underline">
                            {method.action}
                          </Text>
                        </div>
                      </a>
                    </div>
                  ))}
                </Stack>

                {/* Additional Info */}
                {additionalInfo && additionalInfo.length > 0 && (
                  <>
                    <Separator />
                    <Stack spacing="lg">
                      {additionalInfo.map((info, index) => (
                        <div key={index}>
                          <Text className="font-semibold mb-3">{info.title}</Text>
                          <Stack spacing="sm">
                            {info.items.map((item, itemIndex) => (
                              <Text key={itemIndex}>
                                {item}
                              </Text>
                            ))}
                          </Stack>
                        </div>
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-lg border bg-card p-6 lg:p-8">
                <Stack spacing="lg">
                  {(form.title || form.description) && (
                    <div>
                      {form.title && (
                        <Heading level={3} className="mb-2">
                          {form.title}
                        </Heading>
                      )}
                      {form.description && (
                        <Text>
                          {form.description}
                        </Text>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Stack spacing="lg">
                      {form.fields.map((field) => (
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

                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full"
                      >
                        {isSubmitting ? "Sending..." : (form.submitText || "Send message")}
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for ContactSplit component
 */
export const contactSplitSchema = {
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
    contactMethods: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          action: { type: "string" },
          href: { type: "string" },
          badge: { type: "string" },
        },
        required: ["title", "description", "action", "href"],
      },
      description: "Contact methods",
      minItems: 1,
    },
    form: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              label: { type: "string" },
              type: {
                type: "string",
                enum: ["text", "email", "tel", "textarea"],
              },
              placeholder: { type: "string" },
              required: { type: "boolean" },
              rows: { type: "number" },
            },
            required: ["name", "label", "type"],
          },
          minItems: 1,
        },
        submitText: { type: "string" },
        successMessage: { type: "string" },
      },
      required: ["fields"],
    },
    additionalInfo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          items: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["title", "items"],
      },
      description: "Additional information sections",
    },
  },
  required: ["headline", "contactMethods", "form"],
};