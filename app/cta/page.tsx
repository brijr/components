// Layout Imports
import { Section } from "@/components/ds";
import { Wrapper } from "@/components/wrapper";
import { Main } from "@/components/ds";
import { Info } from "@/components/info";
import { End } from "@/components/end";

// Component Config
import { components, types } from "@/registry";

export default function Home() {
  return (
    <Main>
      <Info title="CTA Components" />
      <Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components
          .filter((component) => component.type === "cta")
          .map((component) => (
            <Wrapper
              code={component.code}
              key={component.path}
              path={component.path}
              type={component.type}
            >
              <component.component />
            </Wrapper>
          ))}
      </Section>
      <End />
    </Main>
  );
}
