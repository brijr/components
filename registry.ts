import { HeroTextImage } from "./components/heros/hero-text-image";
import { defaultContent as heroTextImageContent } from "./components/heros/hero-text-image/content";

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
    name: "Hero Text Image",
    type: "hero",
    slug: "hero-text-image",
    Component: HeroTextImage,
    description:
      "Hero section with text content followed by a full-width image.",
    props: heroTextImageContent,
  },
];
