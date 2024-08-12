import { Section, Container } from "@/components/craft";

import Link from "next/link";

export const Info = ({ title }: { title: string }) => {
  return (
    <Section className="">
      <Container className="not-prose grid gap-1">
        <h2>{title}</h2>
        <p className="text-sm">
          Read the{" "}
          <Link
            href="https://github.com/brijr/craft"
            className="underline underline-offset-4 transition-all hover:decoration-orange-500"
          >
            documentation on GitHub
          </Link>
          . Copy a component below and paste it into your application.
        </p>
      </Container>
    </Section>
  );
};
