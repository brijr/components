import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface CTASingleProps {
  headline: string;
  subheadline?: string;
  cta: {
    text: string;
    href: string;
  };
  variant?: "default" | "muted" | "primary";
}

export const CTASingle = ({
  headline,
  subheadline,
  cta,
  variant = "default",
}: CTASingleProps) => {
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
          <Button
            size="lg"
            variant={variant === "primary" ? "secondary" : "default"}
            asChild
          >
            <Link href={cta.href}>{cta.text}</Link>
          </Button>
        </Flex>
      </Container>
    </Section>
  );
};