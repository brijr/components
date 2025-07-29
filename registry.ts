import { HeroMinimal } from "./components/hero/hero-minimal";
import { defaultContent as heroMinimalContent } from "./components/hero/hero-minimal/content";
import { HeroWithImage } from "./components/hero/hero-with-image";
import { defaultContent as heroWithImageContent } from "./components/hero/hero-with-image/content";
import { HeroLeftAligned } from "./components/hero/hero-left-aligned";
import { defaultContent as heroLeftAlignedContent } from "./components/hero/hero-left-aligned/content";

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
  {
    name: "Hero with Image",
    type: "hero",
    slug: "hero-with-image",
    Component: HeroWithImage,
    description: "Hero section with centered text, CTAs, and an image below.",
    props: heroWithImageContent,
  },
  {
    name: "Hero Left Aligned",
    type: "hero",
    slug: "hero-left-aligned",
    Component: HeroLeftAligned,
    description: "Hero section with left-aligned text, CTAs, and an image below.",
    props: heroLeftAlignedContent,
  },
];
