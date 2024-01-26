// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import { End } from "@/components/end";
import * as Craft from "@/components/craft/layout";

// Component Config
import { components } from "@/components.config";

export default function Home() {
  return (
    <Main>
      <Info />
      <Craft.Section className="flex flex-col py-12 gap-12 items-center">
        {/* Components */}
        {components.map((component) => (
          <Wrapper
            code={component.code}
            key={component.path}
            path={component.path}
          >
            <component.component />
          </Wrapper>
        ))}
      </Craft.Section>
      <End />
    </Main>
  );
}
