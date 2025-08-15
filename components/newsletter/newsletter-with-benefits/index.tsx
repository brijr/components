import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Form } from "@/components/site/form";
import { CheckCircle2 } from "lucide-react";

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
    /** Webhook URL for form submission */
    webhookUrl?: string;
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
  const backgroundClasses = {
    default: "",
    gradient: "bg-gradient-to-br from-primary/5 to-primary/10",
    pattern: "bg-muted/50",
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
    <Section className={backgroundClasses[backgroundStyle]}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content side */}
          <div>
            <Flex direction="column" gap={8}>
              <Flex direction="column" gap={6}>
                <Header as="h2">{headline}</Header>
                {description && (
                  <p className="text-xl text-muted-foreground">
                    {description}
                  </p>
                )}
              </Flex>

              {/* Benefits list */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>{benefit}</p>
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
            </Flex>
          </div>

          {/* Form side */}
          <div>
            <Form
              fields={fields}
              webhookUrl={form.webhookUrl || "/api/newsletter"}
              showSuccessMessage={true}
              successMessage={form.successMessage || "Thanks for subscribing!"}
              resetOnSubmit={true}
              submitText={form.buttonText}
              columns={1}
              gap={form.layout === "stacked" ? 3 : 2}
              showLabels={false}
              inlineErrors={false}
            />
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
        webhookUrl: {
          type: "string",
          description: "Webhook URL for form submission",
          default: "/api/newsletter",
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