// Hero components
import { HeroMinimal } from "./components/components/hero/hero-minimal";
import { defaultContent as heroMinimalContent } from "./components/components/hero/hero-minimal/content";
import { HeroCentered } from "./components/components/hero/hero-centered";
import { defaultContent as heroCenteredContent } from "./components/components/hero/hero-centered/content";
import { HeroSplit } from "./components/components/hero/hero-split";
import { defaultContent as heroSplitContent } from "./components/components/hero/hero-split/content";
import { HeroWithImage } from "./components/components/hero/hero-with-image";
import { defaultContent as heroWithImageContent } from "./components/components/hero/hero-with-image/content";
import { HeroWithVideo } from "./components/components/hero/hero-with-video";
import { defaultContent as heroWithVideoContent } from "./components/components/hero/hero-with-video/content";

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
  {
    name: "Hero Centered",
    type: "hero",
    slug: "hero-centered",
    Component: HeroCentered,
    description: "Centered hero with badge, headline, subheadline and CTAs.",
    props: heroCenteredContent,
    filePath: "./components/components/hero/hero-centered/index.tsx",
  },
  {
    name: "Hero Split",
    type: "hero",
    slug: "hero-split",
    Component: HeroSplit,
    description: "Split hero with text on one side and image on the other.",
    props: heroSplitContent,
    filePath: "./components/components/hero/hero-split/index.tsx",
  },
  {
    name: "Hero with Image",
    type: "hero",
    slug: "hero-with-image",
    Component: HeroWithImage,
    description: "Hero with centered text and large image below.",
    props: heroWithImageContent,
    filePath: "./components/components/hero/hero-with-image/index.tsx",
  },
  {
    name: "Hero with Video",
    type: "hero",
    slug: "hero-with-video",
    Component: HeroWithVideo,
    description: "Hero with video background or video play button.",
    props: heroWithVideoContent,
    filePath: "./components/components/hero/hero-with-video/index.tsx",
  },
];
