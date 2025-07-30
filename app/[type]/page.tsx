import { Main } from "@/components/ds";
import { ComponentWrapper } from "@/components/component-wrapper";
import { registry } from "@/registry";
import { notFound } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const componentTypes = [
  "hero",
  "feature",
  "cta",
  "pricing",
  "testimonial",
  "faq",
  "contact",
  "stats",
  "logo",
  "footer",
  "newsletter",
  "blog",
] as const;

type ComponentType = (typeof componentTypes)[number];

const typeLabels: Record<ComponentType, string> = {
  hero: "Hero Sections",
  feature: "Feature Sections",
  cta: "Call to Action",
  pricing: "Pricing Tables",
  testimonial: "Testimonials",
  faq: "FAQ Sections",
  contact: "Contact Forms",
  stats: "Statistics",
  logo: "Logo Clouds",
  footer: "Footers",
  newsletter: "Newsletter Forms",
  blog: "Blog Sections",
};

export default async function TypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const componentType = type as ComponentType;

  if (!componentTypes.includes(componentType)) {
    notFound();
  }

  const components = registry.filter(
    (component) => component.type === componentType,
  );
  const label = typeLabels[componentType];

  return (
    <Main>
      <div className="flex items-center gap-2 py-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1">
          <h1 className="text-center font-mono text-sm">
            components.bridger.to / {componentType}
          </h1>
          <p className="mt-2 text-center text-2xl font-semibold">{label}</p>
        </div>
      </div>
      <div className="grid gap-8 px-4">
        {components.map(({ name, slug, Component, props, filePath }) => (
          <ComponentWrapper key={slug} name={name} filePath={filePath}>
            <Component {...(props || {})} />
          </ComponentWrapper>
        ))}
      </div>
      {components.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No {label.toLowerCase()} components found.
          </p>
        </div>
      )}
      <div className="py-6 text-center">
        <p className="text-muted-foreground font-mono text-sm">
          created by{" "}
          <a href="https://bridger.to" className="text-foreground">
            Bridger Tower
          </a>
        </p>
      </div>
    </Main>
  );
}

export function generateStaticParams() {
  return componentTypes.map((type) => ({
    type,
  }));
}
