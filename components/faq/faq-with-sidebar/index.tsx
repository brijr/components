import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Mail, Phone, FileText } from "lucide-react";

/**
 * FAQ item configuration
 */
export interface FAQSidebarItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

/**
 * Sidebar content configuration
 */
export interface FAQSidebarContent {
  /** Sidebar headline */
  headline: string;
  /** Sidebar description */
  description?: string;
  /** Contact options */
  contactOptions?: {
    email?: {
      label: string;
      value: string;
    };
    phone?: {
      label: string;
      value: string;
    };
    chat?: {
      label: string;
      href: string;
    };
    docs?: {
      label: string;
      href: string;
    };
  };
  /** CTA button */
  cta?: {
    text: string;
    href: string;
  };
}

/**
 * Props for the FAQWithSidebar component
 */
export interface FAQWithSidebarProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of FAQ items */
  items: FAQSidebarItem[];
  /** Sidebar content */
  sidebar: FAQSidebarContent;
  /** Default open items (array of indices) */
  defaultOpen?: number[];
}

/**
 * FAQs with contact sidebar for integrated support options.
 * Perfect for help centers and support pages.
 *
 * @example
 * ```tsx
 * <FAQWithSidebar
 *   headline="How can we help?"
 *   subheadline="Find answers or get in touch"
 *   items={[
 *     {
 *       question: "How do I create an account?",
 *       answer: "Creating an account is simple..."
 *     }
 *   ]}
 *   sidebar={{
 *     headline: "Contact Support",
 *     description: "Can't find what you need? We're here to help.",
 *     contactOptions: {
 *       email: { label: "Email us", value: "support@example.com" },
 *       phone: { label: "Call us", value: "+1 (555) 123-4567" },
 *       chat: { label: "Live chat", href: "/chat" },
 *       docs: { label: "Browse docs", href: "/docs" }
 *     },
 *     cta: { text: "Submit a ticket", href: "/support/new" }
 *   }}
 *   defaultOpen={[0]}
 * />
 * ```
 */
export const FAQWithSidebar = ({
  headline,
  subheadline,
  items,
  sidebar,
  defaultOpen = [],
}: FAQWithSidebarProps) => {
  const defaultValue = defaultOpen.map(index => `item-${index}`);

  return (
    <Section>
      <Container>
        <Stack spacing="xl">
          {/* Header */}
          <Stack spacing="md">
            <Heading level={2}>{headline}</Heading>
            {subheadline && (
              <Text variant="lead" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* FAQ Accordion - Main Content */}
            <div className="lg:col-span-2">
              <Accordion
                type="multiple"
                defaultValue={defaultValue}
                className="w-full"
              >
                {items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Text color="muted">{item.answer}</Text>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{sidebar.headline}</CardTitle>
                  {sidebar.description && (
                    <CardDescription>{sidebar.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    {sidebar.contactOptions && (
                      <>
                        {sidebar.contactOptions.email && (
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <Text size="sm" className="font-medium">
                                {sidebar.contactOptions.email.label}
                              </Text>
                              <a
                                href={`mailto:${sidebar.contactOptions.email.value}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {sidebar.contactOptions.email.value}
                              </a>
                            </div>
                          </div>
                        )}

                        {sidebar.contactOptions.phone && (
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <Text size="sm" className="font-medium">
                                {sidebar.contactOptions.phone.label}
                              </Text>
                              <a
                                href={`tel:${sidebar.contactOptions.phone.value}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {sidebar.contactOptions.phone.value}
                              </a>
                            </div>
                          </div>
                        )}

                        {sidebar.contactOptions.chat && (
                          <a
                            href={sidebar.contactOptions.chat.href}
                            className="flex items-start gap-3 hover:text-primary transition-colors"
                          >
                            <MessageCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <Text size="sm" className="font-medium">
                                {sidebar.contactOptions.chat.label}
                              </Text>
                              <Text size="sm" color="muted">
                                Available 24/7
                              </Text>
                            </div>
                          </a>
                        )}

                        {sidebar.contactOptions.docs && (
                          <a
                            href={sidebar.contactOptions.docs.href}
                            className="flex items-start gap-3 hover:text-primary transition-colors"
                          >
                            <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <Text size="sm" className="font-medium">
                                {sidebar.contactOptions.docs.label}
                              </Text>
                              <Text size="sm" color="muted">
                                Guides & tutorials
                              </Text>
                            </div>
                          </a>
                        )}
                      </>
                    )}

                    {sidebar.contactOptions && sidebar.cta && (
                      <Separator className="my-4" />
                    )}

                    {sidebar.cta && (
                      <Button className="w-full" asChild>
                        <a href={sidebar.cta.href}>{sidebar.cta.text}</a>
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FAQWithSidebar component
 */
export const faqWithSidebarSchema = {
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
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Question text",
          },
          answer: {
            type: "string",
            description: "Answer text",
          },
        },
        required: ["question", "answer"],
      },
      description: "Array of FAQ items",
      minItems: 1,
    },
    sidebar: {
      type: "object",
      properties: {
        headline: {
          type: "string",
          description: "Sidebar headline",
        },
        description: {
          type: "string",
          description: "Sidebar description",
        },
        contactOptions: {
          type: "object",
          properties: {
            email: {
              type: "object",
              properties: {
                label: { type: "string" },
                value: { type: "string" },
              },
              required: ["label", "value"],
            },
            phone: {
              type: "object",
              properties: {
                label: { type: "string" },
                value: { type: "string" },
              },
              required: ["label", "value"],
            },
            chat: {
              type: "object",
              properties: {
                label: { type: "string" },
                href: { type: "string" },
              },
              required: ["label", "href"],
            },
            docs: {
              type: "object",
              properties: {
                label: { type: "string" },
                href: { type: "string" },
              },
              required: ["label", "href"],
            },
          },
          description: "Contact options",
        },
        cta: {
          type: "object",
          properties: {
            text: { type: "string" },
            href: { type: "string" },
          },
          required: ["text", "href"],
          description: "CTA button",
        },
      },
      required: ["headline"],
      description: "Sidebar content",
    },
    defaultOpen: {
      type: "array",
      items: {
        type: "number",
      },
      description: "Default open items (array of indices)",
    },
  },
  required: ["headline", "items", "sidebar"],
};