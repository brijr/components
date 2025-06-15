// Layout Imports
import { Main } from "@/components/ds";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/ds";

// Component Config
import { components, types } from "@/registry";

export default function Home() {
  return (
    <Main>
      <Info title="Feature Components" />
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components
          .filter((component) => component.type === "feature")
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
      </Craft.Section>
      <End />
    </Main>
  );
}
