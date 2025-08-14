import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";

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
        <Flex direction="column" gap={8} className="text-center">
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center max-w-3xl">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-lg text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Timeline */}
          {orientation === "vertical" ? (
            <div className="relative max-w-3xl mx-auto w-full">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              <Flex direction="column" gap={6}>
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
                      <Header as="h3" className="mb-2">
                        {step.title}
                      </Header>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Flex>
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
                        <Header as="h3" className="mb-2">
                          {step.title}
                        </Header>
                        <p className="text-muted-foreground text-center">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Flex>
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