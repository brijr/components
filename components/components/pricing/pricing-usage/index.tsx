import Link from "next/link";
import { Section, Container, Header, Flex, Grid } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface PricingUsageProps {
  headline: string;
  subheadline?: string;
  basePrice?: {
    amount: number;
    currency?: string;
    description: string;
  };
  usageTiers: Array<{
    name: string;
    range: string;
    pricePerUnit: number;
    unit: string;
    features?: string[];
  }>;
  examples?: Array<{
    usage: string;
    cost: string;
    description?: string;
  }>;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export const PricingUsage = ({
  headline,
  subheadline,
  basePrice,
  usageTiers,
  examples,
  primaryCTA,
  secondaryCTA,
}: PricingUsageProps) => {
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

          {basePrice && (
            <Card className="mx-auto max-w-md border-primary">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold">
                  {basePrice.currency || "$"}{basePrice.amount}/month
                </div>
                <p className="mt-2 text-muted-foreground">
                  {basePrice.description}
                </p>
              </CardContent>
            </Card>
          )}

          <div>
            <h3 className="mb-6 text-center text-lg font-semibold">
              Usage-Based Pricing Tiers
            </h3>
            <Grid columns={usageTiers.length > 3 ? 4 : 3}>
              {usageTiers.map((tier, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <CardDescription>{tier.range}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${tier.pricePerUnit}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      per {tier.unit}
                    </p>
                    {tier.features && tier.features.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>

          {examples && examples.length > 0 && (
            <div className="mx-auto max-w-3xl">
              <h3 className="mb-6 text-center text-lg font-semibold">
                Pricing Examples
              </h3>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{example.usage}</p>
                      {example.description && (
                        <p className="text-sm text-muted-foreground">
                          {example.description}
                        </p>
                      )}
                    </div>
                    <div className="text-xl font-bold">{example.cost}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(primaryCTA || secondaryCTA) && (
            <Flex gap={4} className="justify-center">
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