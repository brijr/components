import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";

/**
 * Timeline step configuration
 */
export interface TimelineStep {
  /** Step number or label */
  label: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Optional icon component */
  icon?: React.ReactNode;
}

/**
 * Props for the FeatureTimeline component
 */
export interface FeatureTimelineProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of timeline steps */
  steps: TimelineStep[];
  /** Timeline orientation */
  orientation?: "vertical" | "horizontal";
}

/**
 * Timeline/process steps layout showcasing a sequence of features or processes.
 * Perfect for onboarding flows, process explanations, or feature roadmaps.
 *
 * @example
 * ```tsx
 * <FeatureTimeline
 *   headline="Get started in minutes"
 *   subheadline="Simple steps to launch your first project"
 *   steps={[
 *     {
 *       label: "1",
 *       title: "Sign up",
 *       description: "Create your free account in seconds",
 *       icon: <User className="w-5 h-5" />
 *     },
 *     // ... more steps
 *   ]}
 *   orientation="vertical"
 * />
 * ```
 */
export const FeatureTimeline = ({
  headline,
  subheadline,
  steps,
  orientation = "vertical",
}: FeatureTimelineProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Header */}
          <Stack spacing="md" align="center" className="max-w-3xl">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Timeline */}
          {orientation === "vertical" ? (
            <div className="relative max-w-3xl mx-auto w-full">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              <Stack spacing="lg">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex gap-6">
                    {/* Step indicator */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      {step.icon ? (
                        <div className="text-primary">{step.icon}</div>
                      ) : (
                        <span className="text-sm font-semibold text-primary">
                          {step.label}
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <Heading level={3} className="mb-2">
                        {step.title}
                      </Heading>
                      <Text color="muted">
                        {step.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </Stack>
            </div>
          ) : (
            /* Horizontal timeline */
            <div className="w-full overflow-x-auto">
              <div className="min-w-max">
                {/* Horizontal line */}
                <div className="relative">
                  <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
                  
                  <div className="relative grid grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center max-w-xs">
                        {/* Step indicator */}
                        <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4">
                          {step.icon ? (
                            <div className="text-primary">{step.icon}</div>
                          ) : (
                            <span className="text-sm font-semibold text-primary">
                              {step.label}
                            </span>
                          )}
                        </div>
                        
                        {/* Content */}
                        <Heading level={3} className="mb-2">
                          {step.title}
                        </Heading>
                        <Text color="muted" align="center">
                          {step.description}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureTimeline component
 */
export const featureTimelineSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            description: "Step number or label",
          },
          title: {
            type: "string",
            description: "Step title",
          },
          description: {
            type: "string",
            description: "Step description",
          },
        },
        required: ["label", "title", "description"],
      },
      description: "Array of timeline steps",
      minItems: 1,
    },
    orientation: {
      type: "string",
      enum: ["vertical", "horizontal"],
      description: "Timeline orientation",
      default: "vertical",
    },
  },
  required: ["headline", "steps"],
};