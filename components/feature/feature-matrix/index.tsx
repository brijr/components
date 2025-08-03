import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Plan/tier configuration for feature matrix
 */
export interface MatrixPlan {
  /** Plan name */
  name: string;
  /** Plan description */
  description?: string;
  /** Plan price */
  price?: string;
  /** Price period (e.g., "per month") */
  period?: string;
  /** Highlight this plan */
  featured?: boolean;
  /** Custom badge text */
  badge?: string;
}

/**
 * Feature category configuration
 */
export interface MatrixCategory {
  /** Category name */
  name: string;
  /** Features in this category */
  features: MatrixFeature[];
}

/**
 * Individual feature configuration
 */
export interface MatrixFeature {
  /** Feature name */
  name: string;
  /** Feature tooltip/description */
  tooltip?: string;
  /** Feature availability per plan (true, false, or string for custom text) */
  availability: (boolean | string)[];
}

/**
 * Props for the FeatureMatrix component
 */
export interface FeatureMatrixProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of plans/tiers */
  plans: MatrixPlan[];
  /** Array of feature categories */
  categories: MatrixCategory[];
}

/**
 * Feature comparison matrix for showcasing plan differences.
 * Perfect for pricing pages and detailed feature comparisons.
 *
 * @example
 * ```tsx
 * <FeatureMatrix
 *   headline="Compare our plans"
 *   subheadline="Choose the perfect plan for your needs"
 *   plans={[
 *     {
 *       name: "Starter",
 *       price: "$9",
 *       period: "per month",
 *       description: "Perfect for individuals"
 *     },
 *     {
 *       name: "Pro",
 *       price: "$29",
 *       period: "per month",
 *       description: "For growing teams",
 *       featured: true,
 *       badge: "Most Popular"
 *     },
 *     {
 *       name: "Enterprise",
 *       price: "Custom",
 *       description: "For large organizations"
 *     }
 *   ]}
 *   categories={[
 *     {
 *       name: "Core Features",
 *       features: [
 *         {
 *           name: "User accounts",
 *           availability: ["5", "Unlimited", "Unlimited"]
 *         },
 *         {
 *           name: "API access",
 *           availability: [false, true, true]
 *         },
 *         {
 *           name: "Custom domain",
 *           availability: [false, true, true]
 *         }
 *       ]
 *     },
 *     {
 *       name: "Support",
 *       features: [
 *         {
 *           name: "Email support",
 *           availability: [true, true, true]
 *         },
 *         {
 *           name: "Priority support",
 *           availability: [false, true, true]
 *         },
 *         {
 *           name: "Dedicated manager",
 *           availability: [false, false, true]
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export const FeatureMatrix = ({
  headline,
  subheadline,
  plans,
  categories,
}: FeatureMatrixProps) => {
  const renderAvailability = (availability: boolean | string) => {
    if (typeof availability === "string") {
      return <span className="text-sm font-medium">{availability}</span>;
    }
    if (availability === true) {
      return <Check className="w-5 h-5 text-green-600" />;
    }
    if (availability === false) {
      return <X className="w-5 h-5 text-muted-foreground/50" />;
    }
    return <Minus className="w-5 h-5 text-muted-foreground/50" />;
  };

  return (
    <Section>
      <Container className="max-w-7xl">
        <Stack spacing="xl">
          {/* Header */}
          <Stack spacing="md" align="center">
            <Heading size={2} centered>
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" centered subdued className="max-w-3xl">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b">
                    <span className="sr-only">Features</span>
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={index}
                      className={cn(
                        "text-center p-4 border-b border-l",
                        plan.featured && "bg-primary/5"
                      )}
                    >
                      <Stack spacing="sm" align="center">
                        {plan.badge && (
                          <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
                            {plan.badge}
                          </span>
                        )}
                        <Heading size={4}>{plan.name}</Heading>
                        {plan.description && (
                          <Text variant="small" subdued>
                            {plan.description}
                          </Text>
                        )}
                        {plan.price && (
                          <div className="mt-2">
                            <span className="text-2xl font-bold">{plan.price}</span>
                            {plan.period && (
                              <Text variant="small" subdued>
                                {" "}{plan.period}
                              </Text>
                            )}
                          </div>
                        )}
                      </Stack>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((category, catIndex) => (
                  <React.Fragment key={catIndex}>
                    <tr>
                      <td
                        colSpan={plans.length + 1}
                        className="p-4 bg-muted/50"
                      >
                        <Heading size={5}>{category.name}</Heading>
                      </td>
                    </tr>
                    {category.features.map((feature, featIndex) => (
                      <tr key={`${catIndex}-${featIndex}`} className="hover:bg-muted/30">
                        <td className="p-4 border-b">
                          <div className="flex items-center gap-2">
                            <Text>{feature.name}</Text>
                            {feature.tooltip && (
                              <span
                                className="text-xs text-muted-foreground cursor-help"
                                title={feature.tooltip}
                              >
                                ⓘ
                              </span>
                            )}
                          </div>
                        </td>
                        {feature.availability.map((availability, planIndex) => (
                          <td
                            key={planIndex}
                            className={cn(
                              "p-4 border-b border-l text-center",
                              plans[planIndex]?.featured && "bg-primary/5"
                            )}
                          >
                            {renderAvailability(availability)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureMatrix component
 */
export const featureMatrixSchema = {
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
    plans: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Plan name",
          },
          description: {
            type: "string",
            description: "Plan description",
          },
          price: {
            type: "string",
            description: "Plan price",
          },
          period: {
            type: "string",
            description: "Price period",
          },
          featured: {
            type: "boolean",
            description: "Highlight this plan",
          },
          badge: {
            type: "string",
            description: "Custom badge text",
          },
        },
        required: ["name"],
      },
      minItems: 2,
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
                tooltip: {
                  type: "string",
                  description: "Feature tooltip/description",
                },
                availability: {
                  type: "array",
                  items: {
                    oneOf: [
                      { type: "boolean" },
                      { type: "string" },
                    ],
                  },
                  description: "Feature availability per plan",
                },
              },
              required: ["name", "availability"],
            },
            minItems: 1,
          },
        },
        required: ["name", "features"],
      },
      minItems: 1,
    },
  },
  required: ["headline", "plans", "categories"],
};