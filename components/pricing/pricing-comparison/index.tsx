import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Feature category with features
 */
export interface FeatureCategory {
  /** Category name */
  name: string;
  /** Features in this category */
  features: {
    /** Feature name */
    name: string;
    /** Feature description/tooltip */
    description?: string;
  }[];
}

/**
 * Plan column configuration
 */
export interface ComparisonPlan {
  /** Plan name */
  name: string;
  /** Plan price */
  price: string;
  /** Price period */
  period?: string;
  /** Plan description */
  description?: string;
  /** Whether this is recommended */
  recommended?: boolean;
  /** CTA configuration */
  cta: {
    text: string;
    href: string;
  };
  /** Feature availability - maps feature name to value */
  features: Record<string, string | boolean>;
}

/**
 * Props for the PricingComparison component
 */
export interface PricingComparisonProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Feature categories */
  categories: FeatureCategory[];
  /** Plans to compare */
  plans: ComparisonPlan[];
}

/**
 * Detailed feature comparison table for plans.
 * Perfect for complex products with many features to compare.
 *
 * @example
 * ```tsx
 * <PricingComparison
 *   headline="Compare plans"
 *   subheadline="See which plan is right for you"
 *   categories={[
 *     {
 *       name: "Core Features",
 *       features: [
 *         { name: "Projects", description: "Number of active projects" },
 *         { name: "Storage", description: "Total storage space" }
 *       ]
 *     }
 *   ]}
 *   plans={[
 *     {
 *       name: "Basic",
 *       price: "$19",
 *       period: "/month",
 *       features: {
 *         "Projects": "5",
 *         "Storage": "10 GB"
 *       },
 *       cta: { text: "Get Started", href: "/signup" }
 *     }
 *   ]}
 * />
 * ```
 */
export const PricingComparison = ({
  headline,
  subheadline,
  categories,
  plans,
}: PricingComparisonProps) => {
  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
      );
    }
    return <span>{value}</span>;
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={10}>
          {/* Header */}
          <Flex direction="column" gap={4} className="items-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px]">Features</TableHead>
                  {plans.map((plan, index) => (
                    <TableHead key={index} className="text-center min-w-[200px]">
                      <Flex direction="column" gap={2} className="items-center">
                        {plan.recommended && (
                          <Badge variant="default" className="mb-2">
                            Recommended
                          </Badge>
                        )}
                        <div className="font-semibold text-base">
                          {plan.name}
                        </div>
                        {plan.description && (
                          <p className="text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        )}
                        <div className="mt-2">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          {plan.period && (
                            <span className="text-muted-foreground text-sm">
                              {plan.period}
                            </span>
                          )}
                        </div>
                      </Flex>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* CTA Row */}
                <TableRow>
                  <TableCell></TableCell>
                  {plans.map((plan, index) => (
                    <TableCell key={index} className="text-center">
                      <Button 
                        variant={plan.recommended ? "default" : "outline"}
                        size="sm"
                        className="w-full max-w-[160px]"
                        asChild
                      >
                        <Link href={plan.cta.href}>{plan.cta.text}</Link>
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Feature Categories */}
                {categories.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <TableRow>
                      <TableCell 
                        colSpan={plans.length + 1} 
                        className="bg-muted/50 font-semibold"
                      >
                        {category.name}
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature, featureIndex) => (
                      <TableRow key={featureIndex}>
                        <TableCell>
                          <div>
                            {feature.name}
                            {feature.description && (
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        {plans.map((plan, planIndex) => (
                          <TableCell key={planIndex} className="text-center">
                            {renderFeatureValue(plan.features[feature.name] || false)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}

                {/* Bottom CTA Row */}
                <TableRow>
                  <TableCell></TableCell>
                  {plans.map((plan, index) => (
                    <TableCell key={index} className="text-center pt-6">
                      <Button 
                        variant={plan.recommended ? "default" : "outline"}
                        className="w-full max-w-[160px]"
                        asChild
                      >
                        <Link href={plan.cta.href}>{plan.cta.text}</Link>
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for PricingComparison component
 */
export const pricingComparisonSchema = {
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
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Category name",
          },
          features: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Feature name",
                },
                description: {
                  type: "string",
                  description: "Feature description/tooltip",
                },
              },
              required: ["name"],
            },
          },
        },
        required: ["name", "features"],
      },
      description: "Feature categories",
      minItems: 1,
    },
    plans: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Plan name",
          },
          price: {
            type: "string",
            description: "Plan price",
          },
          period: {
            type: "string",
            description: "Price period",
          },
          description: {
            type: "string",
            description: "Plan description",
          },
          recommended: {
            type: "boolean",
            description: "Whether this is recommended",
            default: false,
          },
          cta: {
            type: "object",
            properties: {
              text: { type: "string" },
              href: { type: "string" },
            },
            required: ["text", "href"],
            description: "CTA configuration",
          },
          features: {
            type: "object",
            additionalProperties: {
              oneOf: [
                { type: "string" },
                { type: "boolean" }
              ],
            },
            description: "Feature availability",
          },
        },
        required: ["name", "price", "cta", "features"],
      },
      description: "Plans to compare",
      minItems: 2,
    },
  },
  required: ["headline", "categories", "plans"],
};