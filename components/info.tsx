import { Section, Container } from "@/components/craft";

import Link from "next/link";

export const Info = ({ title }: { title: string }) => {
  return (
    <Section className="">
      <Container className="not-prose grid gap-1">
        <h2>{title}</h2>
        <p className="text-sm">
          Read the{" "}
          <a
            href="https://github.com/brijr/components"
            className="underline underline-offset-4 transition-all hover:decoration-orange-500"
            target="_blank"
          >
            documentation on GitHub
          </a>
          . Copy a component below and paste it into your application.
        </p>
      </Container>
    </Section>
  );
};
