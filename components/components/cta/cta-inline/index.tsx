import Link from "next/link";
import { Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

export interface CTAInlineProps {
  text: string;
  cta: {
    text: string;
    href: string;
  };
  variant?: "card" | "banner" | "minimal";
  icon?: keyof typeof Icons;
}

export const CTAInline = ({
  text,
  cta,
  variant = "card",
  icon,
}: CTAInlineProps) => {
  if (variant === "minimal") {
    return (
      <Flex
        justify="between"
        align="center"
        className="rounded-lg border bg-muted/50 p-4"
      >
        <Flex gap={3} align="center">
          {icon && Icons[icon] && (() => {
            const Icon = Icons[icon] as Icons.LucideIcon;
            return <Icon className="h-5 w-5 text-primary" />;
          })()}
          <p className="text-sm font-medium">{text}</p>
        </Flex>
        <Button size="sm" asChild>
          <Link href={cta.href}>{cta.text}</Link>
        </Button>
      </Flex>
    );
  }

  if (variant === "banner") {
    return (
      <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <Flex
          justify="between"
          align="center"
          className="flex-col gap-4 sm:flex-row"
        >
          <Flex gap={3} align="center">
            {icon && Icons[icon] && (() => {
              const Icon = Icons[icon] as Icons.LucideIcon;
              return <Icon className="h-5 w-5 text-primary" />;
            })()}
            <p className="font-medium">{text}</p>
          </Flex>
          <Button asChild>
            <Link href={cta.href}>{cta.text}</Link>
          </Button>
        </Flex>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Flex
          justify="between"
          align="center"
          className="flex-col gap-4 sm:flex-row"
        >
          <Flex gap={3} align="center">
            {icon && Icons[icon] && (() => {
              const Icon = Icons[icon] as Icons.LucideIcon;
              return <Icon className="h-5 w-5 text-primary" />;
            })()}
            <p className="font-medium">{text}</p>
          </Flex>
          <Button asChild>
            <Link href={cta.href}>{cta.text}</Link>
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
};