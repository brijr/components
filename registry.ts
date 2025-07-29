import { HeroMinimal } from "./components/hero/hero-minimal";
import { defaultContent as heroMinimalContent } from "./components/hero/hero-minimal/content";
import { HeroWithImage } from "./components/hero/hero-with-image";
import { defaultContent as heroWithImageContent } from "./components/hero/hero-with-image/content";
import { HeroLeftAligned } from "./components/hero/hero-left-aligned";
import { defaultContent as heroLeftAlignedContent } from "./components/hero/hero-left-aligned/content";
import { HeroSplit } from "./components/hero/hero-split";
import { defaultContent as heroSplitContent } from "./components/hero/hero-split/content";
import { HeroWithBackground } from "./components/hero/hero-with-background";
import { defaultContent as heroWithBackgroundContent } from "./components/hero/hero-with-background/content";
import { HeroWithVideo } from "./components/hero/hero-with-video";
import { defaultContent as heroWithVideoContent } from "./components/hero/hero-with-video/content";
import { HeroWithFeatures } from "./components/hero/hero-with-features";
import { defaultContent as heroWithFeaturesContent } from "./components/hero/hero-with-features/content";
import { HeroWithBadge } from "./components/hero/hero-with-badge";
import { defaultContent as heroWithBadgeContent } from "./components/hero/hero-with-badge/content";
import { HeroWithStats } from "./components/hero/hero-with-stats";
import { defaultContent as heroWithStatsContent } from "./components/hero/hero-with-stats/content";
import { HeroWithTestimonial } from "./components/hero/hero-with-testimonial";
import { defaultContent as heroWithTestimonialContent } from "./components/hero/hero-with-testimonial/content";
import { HeroWithForm } from "./components/hero/hero-with-form";
import { defaultContent as heroWithFormContent } from "./components/hero/hero-with-form/content";
import { HeroWithTabs } from "./components/hero/hero-with-tabs";
import { defaultContent as heroWithTabsContent } from "./components/hero/hero-with-tabs/content";
import { HeroCentered } from "./components/hero/hero-centered";
import { defaultContent as heroCenteredContent } from "./components/hero/hero-centered/content";

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
  {
    name: "Hero Split",
    type: "hero",
    slug: "hero-split",
    Component: HeroSplit,
    description: "Hero section with split layout - text on one side, image on the other.",
    props: heroSplitContent,
  },
  {
    name: "Hero with Background",
    type: "hero",
    slug: "hero-with-background",
    Component: HeroWithBackground,
    description: "Hero section with full-width background image and text overlay.",
    props: heroWithBackgroundContent,
  },
  {
    name: "Hero with Video",
    type: "hero",
    slug: "hero-with-video",
    Component: HeroWithVideo,
    description: "Hero section with centered text and embedded video below.",
    props: heroWithVideoContent,
  },
  {
    name: "Hero with Features",
    type: "hero",
    slug: "hero-with-features",
    Component: HeroWithFeatures,
    description: "Hero section with headline, CTAs, and feature cards below.",
    props: heroWithFeaturesContent,
  },
  {
    name: "Hero with Badge",
    type: "hero",
    slug: "hero-with-badge",
    Component: HeroWithBadge,
    description: "Minimal hero section with a badge/announcement above the headline.",
    props: heroWithBadgeContent,
  },
  {
    name: "Hero with Stats",
    type: "hero",
    slug: "hero-with-stats",
    Component: HeroWithStats,
    description: "Hero section with prominent statistics display.",
    props: heroWithStatsContent,
  },
  {
    name: "Hero with Testimonial",
    type: "hero",
    slug: "hero-with-testimonial",
    Component: HeroWithTestimonial,
    description: "Hero section with a featured testimonial for social proof.",
    props: heroWithTestimonialContent,
  },
  {
    name: "Hero with Form",
    type: "hero",
    slug: "hero-with-form",
    Component: HeroWithForm,
    description: "Hero section with an inline form for lead capture.",
    props: heroWithFormContent,
  },
  {
    name: "Hero with Tabs",
    type: "hero",
    slug: "hero-with-tabs",
    Component: HeroWithTabs,
    description: "Hero section with tabbed content panels.",
    props: heroWithTabsContent,
  },
  {
    name: "Hero Centered",
    type: "hero",
    slug: "hero-centered",
    Component: HeroCentered,
    description: "Ultra-minimal centered hero with large typography.",
    props: heroCenteredContent,
  },
];
