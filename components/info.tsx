import { Section, Container } from "@/components/craft";

export const Info = ({ title }: { title: string }) => {
  return (
    <Section className="">
      <Container className="not-prose">
        <h2>{title}</h2>
      </Container>
    </Section>
  );
};
