import { HeroMinimal } from "./components/hero/hero-minimal";
import { defaultContent as heroMinimalContent } from "./components/hero/hero-minimal/content";

type RegistryItem = {
  name: string;
  type: "hero" | "utility" | "feature";
  slug: string;
  Component: React.ComponentType<any>;
  description?: string;
  props?: any;
};

export const registry: RegistryItem[] = [
  {
    name: "Hero Minimal",
    type: "hero",
    slug: "hero-minimal",
    Component: HeroMinimal,
    description: "Minimal hero section with centered text and optional CTAs.",
    props: heroMinimalContent,
  },
];
