import { Main } from "@/components/ds";

import { registry } from "@/registry";

export default function HomePage() {
  return (
    <Main>
      <div className="py-6 bg-accent/30">
        <h1 className="text-center font-mono text-sm">components.bridger.to</h1>
      </div>
      {registry.map(({ name, slug, Component, props }) => (
        <div className="border-t" key={slug}>
          <Component {...(props || {})} />
        </div>
      ))}
    </Main>
  );
}

