import { Main } from "@/components/ds";
import { registry } from "@/registry";

export default function HomePage() {
  return (
    <Main>
      <div className="py-12 bg-accent/40 border-t">
        <h1 className="text-center font-mono">My Component Gallery</h1>
      </div>
      {registry.map(({ name, slug, Component, props }) => (
        <div className="border-t" key={slug}>
          <Component {...(props || {})} />
        </div>
      ))}
    </Main>
  );
}
