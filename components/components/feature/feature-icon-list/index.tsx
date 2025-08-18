import Link from "next/link";
import { Section, Container, Header, Flex, Grid } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export interface FeatureIconListProps {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Array<{
    icon?: keyof typeof Icons;
    title: string;
    description: string;
  }>;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  layout?: "two-column" | "three-column";
}

export const FeatureIconList = ({
  headline,
  subheadline,
  description,
  features,
  primaryCTA,
  secondaryCTA,
  layout = "two-column",
}: FeatureIconListProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4} className="max-w-3xl">
            {subheadline && (
              <p className="text-sm font-medium text-primary">{subheadline}</p>
            )}
            <Header as="h2">{headline}</Header>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </Flex>

          <Grid columns={layout === "three-column" ? 3 : 2}>
            {features.map((feature, index) => (
              <Flex key={index} gap={4}>
                {feature.icon && Icons[feature.icon] && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = Icons[feature.icon] as Icons.LucideIcon;
                      return <Icon className="h-5 w-5 text-primary" />;
                    })()}
                  </div>
                )}
                <div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Flex>
            ))}
          </Grid>

          {(primaryCTA || secondaryCTA) && (
            <Flex gap={4}>
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};