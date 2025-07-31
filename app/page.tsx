import { ComponentWrapper } from "@/components/component-wrapper";
import { registry } from "@/registry";

export default function HomePage() {
  return (
    <main>
      <div className="py-6">
        <h1 className="text-center font-mono text-sm">components.bridger.to</h1>
        <p className="mt-2 text-center text-2xl font-semibold">
          All Components
        </p>
      </div>
      <div className="grid gap-8 px-4">
        {registry.map(({ name, slug, Component, props, filePath }) => (
          <ComponentWrapper key={slug} name={name} filePath={filePath}>
            <Component {...(props || {})} />
          </ComponentWrapper>
        ))}
      </div>
      <div className="py-6 text-center">
        <p className="text-muted-foreground font-mono text-sm">
          created by{" "}
          <a href="https://bridger.to" className="text-foreground">
            Bridger Tower
          </a>
        </p>
      </div>
    </main>
  );
}
