import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface CTADualProps {
  headline: string;
  subheadline?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  variant?: "default" | "muted" | "primary";
  layout?: "horizontal" | "vertical";
}

export const CTADual = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = "default",
  layout = "horizontal",
}: CTADualProps) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case "muted":
        return "bg-muted";
      case "primary":
        return "bg-primary text-primary-foreground";
      default:
        return "";
    }
  };

  return (
    <Section className={getBackgroundClass()}>
      <Container>
        <Flex
          direction="column"
          align="center"
          gap={6}
          className="py-12 text-center md:py-16"
        >
          <Header
            as="h2"
            className={`max-w-3xl ${
              variant === "primary" ? "text-primary-foreground" : ""
            }`}
          >
            {headline}
          </Header>
          {subheadline && (
            <p
              className={`max-w-2xl text-lg ${
                variant === "primary"
                  ? "text-primary-foreground/90"
                  : "text-muted-foreground"
              }`}
            >
              {subheadline}
            </p>
          )}
          <Flex
            direction={layout === "vertical" ? "column" : "row"}
            gap={4}
            className={layout === "vertical" ? "w-full max-w-sm" : ""}
          >
            <Button
              size="lg"
              variant={variant === "primary" ? "secondary" : "default"}
              className={layout === "vertical" ? "w-full" : ""}
              asChild
            >
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${
                layout === "vertical" ? "w-full" : ""
              } ${
                variant === "primary"
                  ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  : ""
              }`}
              asChild
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};