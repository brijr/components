import { registry } from "@/registry";

export default function HomePage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">My Component Gallery</h1>
      {registry.map(({ name, slug, Component }) => (
        <div key={slug} className="border rounded p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">{name}</h2>
          <div className="p-4 bg-gray-100 rounded">
            <Component />
          </div>
        </div>
      ))}
    </div>
  );
}
