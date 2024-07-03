import { Main, Section, Container } from "@/components/craft";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main>
      <Section>
        <Container className="rounded-lg bg-background">{children}</Container>
      </Section>
    </Main>
  );
}
