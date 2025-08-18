"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export interface PricingCalculatorProps {
  headline: string;
  subheadline?: string;
  inputs: Array<{
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
    unit?: string;
    pricePerUnit: number;
  }>;
  basePrice?: number;
  currency?: string;
  breakdown?: boolean;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export const PricingCalculator = ({
  headline,
  subheadline,
  inputs,
  basePrice = 0,
  currency = "$",
  breakdown = true,
  primaryCTA,
  secondaryCTA,
}: PricingCalculatorProps) => {
  const [values, setValues] = useState<Record<string, number>>(
    inputs.reduce((acc, input) => ({ ...acc, [input.id]: input.default }), {})
  );

  const calculateTotal = () => {
    const usage = inputs.reduce(
      (total, input) => total + values[input.id] * input.pricePerUnit,
      0
    );
    return basePrice + usage;
  };

  const handleSliderChange = (id: string, newValue: number[]) => {
    setValues((prev) => ({ ...prev, [id]: newValue[0] }));
  };

  const total = calculateTotal();

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

          <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {inputs.map((input) => (
                  <div key={input.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={input.id}>{input.label}</Label>
                      <span className="font-semibold">
                        {values[input.id].toLocaleString()}
                        {input.unit && ` ${input.unit}`}
                      </span>
                    </div>
                    <Slider
                      id={input.id}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={[values[input.id]]}
                      onValueChange={(value) => handleSliderChange(input.id, value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {input.min.toLocaleString()}
                        {input.unit && ` ${input.unit}`}
                      </span>
                      <span>
                        {input.max.toLocaleString()}
                        {input.unit && ` ${input.unit}`}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Estimated Monthly Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold">
                    {currency}{total.toFixed(2)}
                  </div>
                  <p className="mt-2 text-muted-foreground">per month</p>
                </div>

                {breakdown && (
                  <div className="mt-8 space-y-2 border-t pt-6">
                    {basePrice > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Base price</span>
                        <span>
                          {currency}{basePrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {inputs.map((input) => {
                      const cost = values[input.id] * input.pricePerUnit;
                      if (cost > 0) {
                        return (
                          <div key={input.id} className="flex justify-between text-sm">
                            <span>
                              {values[input.id].toLocaleString()} {input.unit || input.label.toLowerCase()}
                            </span>
                            <span>
                              {currency}{cost.toFixed(2)}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Total</span>
                      <span>
                        {currency}{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {(primaryCTA || secondaryCTA) && (
                  <Flex direction="column" gap={3} className="mt-6">
                    {primaryCTA && (
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`${primaryCTA.href}?estimate=${total}`}>
                          {primaryCTA.text}
                        </Link>
                      </Button>
                    )}
                    {secondaryCTA && (
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                      </Button>
                    )}
                  </Flex>
                )}
              </CardContent>
            </Card>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};