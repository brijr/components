import Link from "next/link";
import { Section, Container, Header, Grid, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Icons from "lucide-react";

export interface FeatureThreeCardsProps {
  headline: string;
  subheadline?: string;
  features: Array<{
    icon?: keyof typeof Icons;
    title: string;
    description: string;
    link?: {
      text: string;
      href: string;
    };
  }>;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const FeatureThreeCards = ({
  headline,
  subheadline,
  features,
  primaryCTA,
}: FeatureThreeCardsProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          <div className="text-center">
            <Header as="h2" className="mb-3">
              {headline}
            </Header>
            {subheadline && (
              <p className="mx-auto max-w-2xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </div>
          
          <Grid columns={3}>
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  {feature.icon && Icons[feature.icon] && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {(() => {
                        const Icon = Icons[feature.icon] as Icons.LucideIcon;
                        return <Icon className="h-6 w-6 text-primary" />;
                      })()}
                    </div>
                  )}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                {feature.link && (
                  <CardContent>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={feature.link.href}>
                        {feature.link.text} →
                      </Link>
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </Grid>

          {primaryCTA && (
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};