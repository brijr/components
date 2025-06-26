import { Main, Section, Container } from "@/components/ds";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main>
      <Section>
        <Container>{children}</Container>
      </Section>
    </Main>
  );
}
