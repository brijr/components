// Layout Imports
import { Main } from "@/components/craft";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import { TypeButton } from "@/components/type-button";
import * as Craft from "@/components/craft";

// Component Config
import { components, types } from "@/registry";

export default function Home() {
  return (
    <Main>
      <Info>
        <Craft.Container className="not-prose flex w-full flex-wrap items-center gap-2">
          <p className="sr-only">Sort by Type: </p>
          {types.map((type) => (
            <TypeButton
              className={
                type === "all"
                  ? "cursor-default text-muted-foreground hover:text-muted-foreground"
                  : ""
              }
              type={type}
              key={type}
            />
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components.map((component) => (
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
