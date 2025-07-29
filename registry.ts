import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
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
    name: "Button",
    type: "hero",
    slug: "button",
    Component: Button,
    description: "A customizable button component.",
  },
  {
    name: "Card",

    type: "hero",
    slug: "card",
    Component: Card,
    description: "A customizable card component.",
  },
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
