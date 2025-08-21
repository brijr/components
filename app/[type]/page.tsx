import { ComponentWrapper } from "@/components/component-wrapper";
import { registry } from "@/registry";
import { notFound } from "next/navigation";

const validTypes = ["hero", "feature", "cta", "pricing", "testimonial", "footer"];

interface TypePageProps {
  params: {
    type: string;
  };
}

export default function TypePage({ params }: TypePageProps) {
  const { type } = params;

  if (!validTypes.includes(type)) {
    notFound();
  }

  const componentsOfType = registry.filter((component) => component.type === type);

  if (componentsOfType.length === 0) {
    return (
      <main>
        <div className="px-4 py-6">
          <h1 className="text-center font-mono text-sm">
            components.work / {type}
          </h1>
          <p className="text-center text-muted-foreground mt-4">
            No {type} components found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="px-4 py-6">
        <h1 className="text-center font-mono text-sm">
          components.work / {type}
        </h1>
      </div>
      <div className="grid gap-8 px-4">
        {componentsOfType.map(({ name, slug, Component, props, filePath }) => (
          <ComponentWrapper key={slug} name={name} filePath={filePath}>
            <Component {...(props || {})} />
          </ComponentWrapper>
        ))}
      </div>
      <div className="py-6 text-center">
        <p className="text-muted-foreground font-mono text-sm">
          {componentsOfType.length} {type} component{componentsOfType.length !== 1 ? 's' : ''}
        </p>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return validTypes.map((type) => ({
    type,
  }));
}