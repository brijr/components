// Layout Imports
import { Main } from "@/components/craft";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/craft";
import { TypeButton } from "@/components/type-button";

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
              type={type}
              key={type}
              className={
                type === "cta"
                  ? "cursor-default bg-background/50 text-muted-foreground hover:text-muted-foreground"
                  : ""
              }
            />
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
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
      </Craft.Section>
      <End />
    </Main>
  );
}
