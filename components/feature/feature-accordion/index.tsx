"use client";

import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Feature item configuration for accordion
 */
export interface FeatureAccordionItem {
  /** Unique value for the accordion item */
  value: string;
  /** Feature title/question */
  title: string;
  /** Feature description/answer */
  description: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional badge text */
  badge?: string;
  /** Optional list of benefits or points */
  points?: string[];
}

/**
 * Props for the FeatureAccordion component
 */
export interface FeatureAccordionProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of features */
  features: FeatureAccordionItem[];
  /** Type of accordion behavior */
  type?: "single" | "multiple";
  /** Default open item(s) */
  defaultValue?: string | string[];
  /** Visual style variant */
  variant?: "default" | "bordered" | "separated";
}

/**
 * Accordion-style feature section for expandable feature details.
 * Perfect for FAQs, detailed feature lists, or progressive disclosure.
 *
 * @example
 * ```tsx
 * <FeatureAccordion
 *   headline="Frequently asked questions"
 *   subheadline="Everything you need to know about our product"
 *   features={[
 *     {
 *       value: "item-1",
 *       title: "What makes your product different?",
 *       description: "Our product stands out with its unique approach to solving common problems...",
 *       badge: "Popular",
 *       points: [
 *         "Industry-leading performance",
 *         "Intuitive user interface",
 *         "24/7 customer support"
 *       ]
 *     },
 *     {
 *       value: "item-2",
 *       title: "How does the pricing work?",
 *       description: "We offer flexible pricing plans to suit businesses of all sizes...",
 *       icon: <DollarSign className="w-4 h-4" />
 *     }
 *   ]}
 *   type="single"
 *   defaultValue="item-1"
 *   variant="bordered"
 * />
 * ```
 */
export const FeatureAccordion = ({
  headline,
  subheadline,
  features,
  type = "single",
  defaultValue,
  variant = "default",
}: FeatureAccordionProps) => {
  const accordionClass = cn(
    variant === "bordered" && "border rounded-lg",
    variant === "separated" && "space-y-4"
  );

  const itemClass = cn(
    variant === "separated" && "border rounded-lg px-4"
  );

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground max-w-3xl">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Accordion */}
          <div className="max-w-4xl mx-auto w-full">
            {type === "single" ? (
              <Accordion
                type="single"
                defaultValue={defaultValue as string | undefined}
                className={accordionClass}
              >
              {features.map((feature) => (
                <AccordionItem
                  key={feature.value}
                  value={feature.value}
                  className={itemClass}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      {feature.icon && (
                        <span className="text-primary flex-shrink-0">
                          {feature.icon}
                        </span>
                      )}
                      <span className="font-medium">{feature.title}</span>
                      {feature.badge && (
                        <Badge variant="secondary" className="ml-auto mr-4">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Flex direction="column" gap={4}>
                      <p className="text-muted-foreground">{feature.description}</p>
                      {feature.points && feature.points.length > 0 && (
                        <ul className="space-y-2 ml-4">
                          {feature.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/10 p-1 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              </div>
                              <p className="text-sm">{point}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Flex>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            ) : (
              <Accordion
                type="multiple"
                defaultValue={defaultValue as string[] | undefined}
                className={accordionClass}
              >
              {features.map((feature) => (
                <AccordionItem
                  key={feature.value}
                  value={feature.value}
                  className={itemClass}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      {feature.icon && (
                        <span className="text-primary flex-shrink-0">
                          {feature.icon}
                        </span>
                      )}
                      <span className="font-medium">{feature.title}</span>
                      {feature.badge && (
                        <Badge variant="secondary" className="ml-auto mr-4">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Flex direction="column" gap={4}>
                      <p className="text-muted-foreground">{feature.description}</p>
                      {feature.points && feature.points.length > 0 && (
                        <ul className="space-y-2 ml-4">
                          {feature.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/10 p-1 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              </div>
                              <p className="text-sm">{point}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Flex>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            )}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureAccordion component
 */
export const featureAccordionSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline text",
    },
    features: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "Unique value for the accordion item",
          },
          title: {
            type: "string",
            description: "Feature title/question",
          },
          description: {
            type: "string",
            description: "Feature description/answer",
          },
          badge: {
            type: "string",
            description: "Optional badge text",
          },
          points: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Optional list of benefits or points",
          },
        },
        required: ["value", "title", "description"],
      },
      minItems: 1,
    },
    type: {
      type: "string",
      enum: ["single", "multiple"],
      description: "Type of accordion behavior",
      default: "single",
    },
    defaultValue: {
      oneOf: [
        { type: "string" },
        { type: "array", items: { type: "string" } },
      ],
      description: "Default open item(s)",
    },
    variant: {
      type: "string",
      enum: ["default", "bordered", "separated"],
      description: "Visual style variant",
      default: "default",
    },
  },
  required: ["headline", "features"],
};