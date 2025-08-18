// Hero components
import { HeroMinimal } from "./components/components/hero/hero-minimal";
import { defaultContent as heroMinimalContent } from "./components/components/hero/hero-minimal/content";

type RegistryItem = {
  name: string;
  type: "hero";
  slug: string;
  Component: React.ComponentType<any>;
  description?: string;
  props?: any;
  filePath: string;
};

export const registry: RegistryItem[] = [
  {
    name: "Hero Minimal",
    type: "hero",
    slug: "hero-minimal",
    Component: HeroMinimal,
    description: "Minimal hero section with centered text and optional CTAs.",
    props: heroMinimalContent,
    filePath: "./components/components/hero/hero-minimal/index.tsx",
  },
];
