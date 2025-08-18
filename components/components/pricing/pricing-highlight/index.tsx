import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PricingHighlightProps {
  headline: string;
  subheadline?: string;
  plans: Array<{
    name: string;
    description: string;
    price: number | string;
    currency?: string;
    period?: string;
    features: Array<{
      text: string;
      included: boolean;
    }>;
    cta: {
      text: string;
      href: string;
    };
    highlighted?: boolean;
    badge?: string;
  }>;
}

export const PricingHighlight = ({
  headline,
  subheadline,
  plans,
}: PricingHighlightProps) => {
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

          <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? "scale-105 border-primary lg:-mt-4 lg:mb-4"
                    : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.currency || "$"}
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        {feature.included ? (
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
                        ) : (
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "" : "text-muted-foreground line-through"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size={plan.highlighted ? "lg" : "default"}
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.cta.href}>{plan.cta.text}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};