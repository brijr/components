import { Main } from "@/components/ds";
import { ComponentWrapper } from "@/components/component-wrapper";
import { registry } from "@/registry";

export default function HomePage() {
  return (
    <Main>
      <div className="py-6">
        <h1 className="text-center font-mono text-sm">components.bridger.to</h1>
      </div>
      <div className="grid gap-8">
        {registry.map(({ name, slug, Component, props, filePath }) => (
          <ComponentWrapper key={slug} name={name} filePath={filePath}>
            <Component {...(props || {})} />
          </ComponentWrapper>
        ))}
      </div>
      <div className="py-6 text-center">
        <p className="text-sm font-mono text-muted-foreground">
          created by{" "}
          <a href="https://bridger.to" className="text-foreground">
            Bridger Tower
          </a>
        </p>
      </div>
    </Main>
  );
}
