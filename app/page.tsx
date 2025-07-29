import { registry } from "@/registry";

export default function HomePage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">My Component Gallery</h1>
      {registry.map(({ name, slug, Component, props }) => (
        <div key={slug}>
          <Component {...(props || {})} />
        </div>
      ))}
    </div>
  );
}
