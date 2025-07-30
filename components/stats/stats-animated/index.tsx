"use client";

import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Animated stat configuration
 */
export interface AnimatedStatItem {
  /** The target numeric value */
  value: number;
  /** Label describing the stat */
  label: string;
  /** Optional prefix (e.g., "$", "+") */
  prefix?: string;
  /** Optional suffix (e.g., "%", "k") */
  suffix?: string;
  /** Duration of animation in milliseconds */
  duration?: number;
  /** Optional icon */
  icon?: React.ReactNode;
  /** For progress stats - max value */
  maxValue?: number;
  /** Show as progress bar instead of number */
  showProgress?: boolean;
  /** Optional description */
  description?: string;
}

/**
 * Props for the StatsAnimated component
 */
export interface StatsAnimatedProps {
  /** Section headline */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of animated stats */
  stats: AnimatedStatItem[];
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Animation trigger */
  trigger?: "onMount" | "onScroll";
  /** Stagger animation delay between items (ms) */
  staggerDelay?: number;
}

/**
 * Custom hook for count-up animation
 */
const useCountUp = (
  end: number,
  duration: number = 2000,
  isInView: boolean = true
) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(0);
  const rafRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(updateCount);
      }
    };

    updateCount();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, isInView]);

  return count;
};

/**
 * Custom hook for intersection observer
 */
const useInView = (threshold = 0.1) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once animated, don't re-animate
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
};

/**
 * Animated stat component
 */
const AnimatedStat = ({
  stat,
  isInView,
  delay,
}: {
  stat: AnimatedStatItem;
  isInView: boolean;
  delay: number;
}) => {
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, hasStarted]);

  const animatedValue = useCountUp(
    stat.value,
    stat.duration || 2000,
    hasStarted
  );

  const progressValue = stat.maxValue
    ? (animatedValue / stat.maxValue) * 100
    : animatedValue;

  if (stat.showProgress) {
    return (
      <Stack spacing="sm">
        {stat.icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {stat.icon}
          </div>
        )}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <Text className="font-semibold">{stat.label}</Text>
            <Text className="text-2xl font-bold">
              {stat.prefix}
              {animatedValue}
              {stat.suffix}
            </Text>
          </div>
          <Progress value={progressValue} className="h-2" />
          {stat.description && (
            <Text variant="small" color="muted" className="mt-2">
              {stat.description}
            </Text>
          )}
        </div>
      </Stack>
    );
  }

  return (
    <Stack spacing="xs" align="center">
      {stat.icon && (
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {stat.icon}
        </div>
      )}
      <div className="text-4xl sm:text-5xl font-bold">
        {stat.prefix}
        {animatedValue}
        {stat.suffix}
      </div>
      <Text color="muted" align="center">
        {stat.label}
      </Text>
      {stat.description && (
        <Text variant="small" color="muted" align="center">
          {stat.description}
        </Text>
      )}
    </Stack>
  );
};

/**
 * Stats with animation on scroll or mount.
 * Features count-up animations and progress bars for engaging data display.
 *
 * @example
 * ```tsx
 * <StatsAnimated
 *   headline="Our achievements"
 *   subheadline="Numbers that speak for themselves"
 *   stats={[
 *     {
 *       value: 1000000,
 *       label: "Happy Customers",
 *       suffix: "+",
 *       duration: 2500,
 *       icon: <Users className="w-6 h-6" />
 *     },
 *     {
 *       value: 98,
 *       label: "Customer Satisfaction",
 *       suffix: "%",
 *       maxValue: 100,
 *       showProgress: true,
 *       icon: <Heart className="w-6 h-6" />
 *     }
 *   ]}
 *   columns={3}
 *   trigger="onScroll"
 *   staggerDelay={200}
 * />
 * ```
 */
export const StatsAnimated = ({
  headline,
  subheadline,
  stats,
  columns = 3,
  trigger = "onScroll",
  staggerDelay = 150,
}: StatsAnimatedProps) => {
  const { ref, isInView } = useInView(0.2);
  const shouldAnimate = trigger === "onMount" ? true : isInView;

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const hasProgressStats = stats.some(stat => stat.showProgress);

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          {(headline || subheadline) && (
            <Stack spacing="md" align="center" className="text-center">
              {headline && <Heading level={2}>{headline}</Heading>}
              {subheadline && (
                <Text variant="lead" color="muted">
                  {subheadline}
                </Text>
              )}
            </Stack>
          )}

          {/* Animated Stats */}
          <div ref={ref} className={`grid gap-8 ${gridCols[columns]}`}>
            {stats.map((stat, index) => (
              <div key={index}>
                {stat.showProgress ? (
                  <Card>
                    <CardContent className="p-6">
                      <AnimatedStat
                        stat={stat}
                        isInView={shouldAnimate}
                        delay={index * staggerDelay}
                      />
                    </CardContent>
                  </Card>
                ) : hasProgressStats ? (
                  <Card className="h-full">
                    <CardContent className="p-6 flex items-center justify-center h-full">
                      <AnimatedStat
                        stat={stat}
                        isInView={shouldAnimate}
                        delay={index * staggerDelay}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <AnimatedStat
                    stat={stat}
                    isInView={shouldAnimate}
                    delay={index * staggerDelay}
                  />
                )}
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for StatsAnimated component
 */
export const statsAnimatedSchema = {
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
    stats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "number",
            description: "The target numeric value",
          },
          label: {
            type: "string",
            description: "Label describing the stat",
          },
          prefix: {
            type: "string",
            description: "Optional prefix",
          },
          suffix: {
            type: "string",
            description: "Optional suffix",
          },
          duration: {
            type: "number",
            description: "Animation duration in milliseconds",
            default: 2000,
          },
          maxValue: {
            type: "number",
            description: "For progress stats - max value",
          },
          showProgress: {
            type: "boolean",
            description: "Show as progress bar",
            default: false,
          },
          description: {
            type: "string",
            description: "Optional description",
          },
        },
        required: ["value", "label"],
      },
      description: "Array of animated stats",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns on desktop",
      default: 3,
    },
    trigger: {
      type: "string",
      enum: ["onMount", "onScroll"],
      description: "Animation trigger",
      default: "onScroll",
    },
    staggerDelay: {
      type: "number",
      description: "Stagger delay between items (ms)",
      default: 150,
    },
  },
  required: ["stats"],
};