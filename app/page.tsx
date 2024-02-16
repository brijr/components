// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import { End } from "@/components/end";
import * as Craft from "@/components/craft/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Component Config
import { components } from "@/components.config";

// Types of components
const types: ComponentTypes[] = ["hero", "feature", "cta", "header", "faq"];

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const typeFilter = searchParams.type as string | undefined;
  const filteredComponents = typeFilter
    ? components.filter((component) => component.type === typeFilter)
    : components;

  return (
    <Main>
      <Info />
      <Craft.Section className="flex flex-col py-12 gap-12 items-center">
        <div className="flex not-prose gap-4">
          <p>Sort by Type: </p>
          {types.map((type) => (
            <Button asChild variant="outline" key={type}>
              <Link className="block" href={`/?type=${type}`} passHref>
                {type}
              </Link>
            </Button>
          ))}
        </div>
        {/* Filtered Components */}
        {/* Filtered Components */}
        {filteredComponents.map((component) => (
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
