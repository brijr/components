"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, Container, Header, Flex, Grid } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface PricingToggleProps {
  headline: string;
  subheadline?: string;
  billingOptions: {
    monthly: string;
    annual: string;
    annualSavings?: string;
  };
  plans: Array<{
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    currency?: string;
    features: string[];
    cta: {
      text: string;
      href: string;
    };
    featured?: boolean;
    badge?: string;
  }>;
}

export const PricingToggle = ({
  headline,
  subheadline,
  billingOptions,
  plans,
}: PricingToggleProps) => {
  const [isAnnual, setIsAnnual] = useState(true);

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

          <Flex align="center" gap={3} className="justify-center">
            <span className={!isAnnual ? "font-semibold" : "text-muted-foreground"}>
              {billingOptions.monthly}
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={isAnnual ? "font-semibold" : "text-muted-foreground"}>
              {billingOptions.annual}
            </span>
            {billingOptions.annualSavings && isAnnual && (
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {billingOptions.annualSavings}
              </span>
            )}
          </Flex>

          <Grid columns={plans.length > 2 ? 3 : 2}>
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative h-full ${
                  plan.featured ? "border-primary" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.currency || "$"}
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? "year" : "month"}
                    </span>
                    {isAnnual && plan.annualPrice < plan.monthlyPrice * 12 && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Billed annually
                      </p>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.cta.href}>{plan.cta.text}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
};