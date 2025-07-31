import * as React from "react";
import { Section } from "../section";
import { Container } from "../container";
import { Stack } from "../stack";
import { Heading } from "../heading";
import { Text } from "../text";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional badge text to display above title */
  badge?: string;
  /** Center align all content */
  centered?: boolean;
  /** Additional content to render below subtitle */
  children?: React.ReactNode;
  /** Additional className for the section */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * PageHeader pattern component that combines Section, Container, Stack, Heading, and Text
 * for consistent page headers across the application.
 * 
 * @example
 * ```tsx
 * // Simple header
 * <PageHeader 
 *   title="Welcome to our platform" 
 *   subtitle="Build something amazing today"
 * />
 * 
 * // With badge and centered
 * <PageHeader
 *   title="New Features"
 *   subtitle="Discover what's new in version 2.0"
 *   badge="Update"
 *   centered
 * />
 * 
 * // With additional content
 * <PageHeader
 *   title="Get Started"
 *   subtitle="Choose your path"
 *   centered
 * >
 *   <Inline spacing="md">
 *     <Button size="lg">Start Free Trial</Button>
 *     <Button size="lg" variant="outline">View Docs</Button>
 *   </Inline>
 * </PageHeader>
 * ```
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  centered,
  children,
  className,
  containerClassName,
}: PageHeaderProps) {
  const alignment = centered ? "center" : undefined;
  
  return (
    <Section className={cn("py-16 md:py-24", className)}>
      <Container className={containerClassName}>
        <Stack spacing="lg" align={alignment}>
          <Stack spacing="md" align={alignment}>
            {badge && (
              <div>
                <Badge variant="secondary">{badge}</Badge>
              </div>
            )}
            <Heading size={1} centered={centered}>
              {title}
            </Heading>
            {subtitle && (
              <Text 
                variant="lead" 
                subdued 
                centered={centered}
                className={centered ? "max-w-2xl" : undefined}
              >
                {subtitle}
              </Text>
            )}
          </Stack>
          {children}
        </Stack>
      </Container>
    </Section>
  );
}