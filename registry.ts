// Hero components
import { HeroMinimal } from "./components/hero/hero-minimal";
import { HeroWithImage } from "./components/hero/hero-with-image";
import { HeroLeftAligned } from "./components/hero/hero-left-aligned";
import { HeroSplit } from "./components/hero/hero-split";
import { HeroWithBackground } from "./components/hero/hero-with-background";
import { HeroWithVideo } from "./components/hero/hero-with-video";
import { HeroWithFeatures } from "./components/hero/hero-with-features";
import { HeroWithBadge } from "./components/hero/hero-with-badge";
import { HeroWithStats } from "./components/hero/hero-with-stats";
import { HeroWithTestimonial } from "./components/hero/hero-with-testimonial";
import { HeroWithForm } from "./components/hero/hero-with-form";
import { HeroWithTabs } from "./components/hero/hero-with-tabs";
import { HeroCentered } from "./components/hero/hero-centered";
import { HeroMinimalLeft } from "./components/hero/hero-minimal-left";
import { HeroWithBadgeLeft } from "./components/hero/hero-with-badge-left";
import { HeroWithStatsLeft } from "./components/hero/hero-with-stats-left";
import { HeroWithTestimonialLeft } from "./components/hero/hero-with-testimonial-left";
import { HeroWithFormLeft } from "./components/hero/hero-with-form-left";
import { HeroWithTabsLeft } from "./components/hero/hero-with-tabs-left";

// Hero content
import { defaultContent as heroMinimalContent } from "./components/hero/hero-minimal/content";
import { defaultContent as heroWithImageContent } from "./components/hero/hero-with-image/content";
import { defaultContent as heroLeftAlignedContent } from "./components/hero/hero-left-aligned/content";
import { defaultContent as heroSplitContent } from "./components/hero/hero-split/content";
import { defaultContent as heroWithBackgroundContent } from "./components/hero/hero-with-background/content";
import { defaultContent as heroWithVideoContent } from "./components/hero/hero-with-video/content";
import { defaultContent as heroWithFeaturesContent } from "./components/hero/hero-with-features/content";
import { defaultContent as heroWithBadgeContent } from "./components/hero/hero-with-badge/content";
import { defaultContent as heroWithStatsContent } from "./components/hero/hero-with-stats/content";
import { defaultContent as heroWithTestimonialContent } from "./components/hero/hero-with-testimonial/content";
import { defaultContent as heroWithFormContent } from "./components/hero/hero-with-form/content";
import { defaultContent as heroWithTabsContent } from "./components/hero/hero-with-tabs/content";
import { defaultContent as heroCenteredContent } from "./components/hero/hero-centered/content";
import { defaultContent as heroMinimalLeftContent } from "./components/hero/hero-minimal-left/content";
import { defaultContent as heroWithBadgeLeftContent } from "./components/hero/hero-with-badge-left/content";
import { defaultContent as heroWithStatsLeftContent } from "./components/hero/hero-with-stats-left/content";
import { defaultContent as heroWithTestimonialLeftContent } from "./components/hero/hero-with-testimonial-left/content";
import { defaultContent as heroWithFormLeftContent } from "./components/hero/hero-with-form-left/content";
import { defaultContent as heroWithTabsLeftContent } from "./components/hero/hero-with-tabs-left/content";

// Feature components
import { FeatureGrid } from "./components/feature/feature-grid";
import { defaultContent as featureGridContent } from "./components/feature/feature-grid/content";
import { FeatureGridLeft } from "./components/feature/feature-grid-left";
import { defaultContent as featureGridLeftContent } from "./components/feature/feature-grid-left/content";
import { FeatureList } from "./components/feature/feature-list";
import { defaultContent as featureListContent } from "./components/feature/feature-list/content";
import { FeatureListLeft } from "./components/feature/feature-list-left";
import { defaultContent as featureListLeftContent } from "./components/feature/feature-list-left/content";
import { FeatureCards } from "./components/feature/feature-cards";
import { defaultContent as featureCardsContent } from "./components/feature/feature-cards/content";
import { FeatureCardsLeft } from "./components/feature/feature-cards-left";
import { defaultContent as featureCardsLeftContent } from "./components/feature/feature-cards-left/content";
import { FeatureComparison } from "./components/feature/feature-comparison";
import { defaultContent as featureComparisonContent } from "./components/feature/feature-comparison/content";
import { FeatureShowcase } from "./components/feature/feature-showcase";
import { defaultContent as featureShowcaseContent } from "./components/feature/feature-showcase/content";
import { FeatureShowcaseLeft } from "./components/feature/feature-showcase-left";
import { defaultContent as featureShowcaseLeftContent } from "./components/feature/feature-showcase-left/content";
import { FeatureTimeline } from "./components/feature/feature-timeline";
import { defaultContent as featureTimelineContent } from "./components/feature/feature-timeline/content";

type RegistryItem = {
  name: string;
  type: "hero" | "feature" | "cta" | "pricing" | "testimonial" | "faq" | "contact" | "stats" | "logo" | "team" | "footer" | "newsletter" | "blog";
  slug: string;
  Component: React.ComponentType<any>;
  description?: string;
  props?: any;
  filePath: string;
};

export const registry: RegistryItem[] = [
  {
    name: "Hero Left Aligned",
    type: "hero",
    slug: "hero-left-aligned",
    Component: HeroLeftAligned,
    description:
      "Hero section with left-aligned text, CTAs, and an image below.",
    props: heroLeftAlignedContent,
    filePath: "./components/hero/hero-left-aligned/index.tsx",
  },
  {
    name: "Hero Minimal",
    type: "hero",
    slug: "hero-minimal",
    Component: HeroMinimal,
    description: "Minimal hero section with centered text and optional CTAs.",
    props: heroMinimalContent,
    filePath: "./components/hero/hero-minimal/index.tsx",
  },
  {
    name: "Hero with Image",
    type: "hero",
    slug: "hero-with-image",
    Component: HeroWithImage,
    description: "Hero section with centered text, CTAs, and an image below.",
    props: heroWithImageContent,
    filePath: "./components/hero/hero-with-image/index.tsx",
  },
  {
    name: "Hero Split",
    type: "hero",
    slug: "hero-split",
    Component: HeroSplit,
    description:
      "Hero section with split layout - text on one side, image on the other.",
    props: heroSplitContent,
    filePath: "./components/hero/hero-split/index.tsx",
  },
  {
    name: "Hero with Background",
    type: "hero",
    slug: "hero-with-background",
    Component: HeroWithBackground,
    description:
      "Hero section with full-width background image and text overlay.",
    props: heroWithBackgroundContent,
    filePath: "./components/hero/hero-with-background/index.tsx",
  },
  {
    name: "Hero with Video",
    type: "hero",
    slug: "hero-with-video",
    Component: HeroWithVideo,
    description: "Hero section with centered text and embedded video below.",
    props: heroWithVideoContent,
    filePath: "./components/hero/hero-with-video/index.tsx",
  },
  {
    name: "Hero with Features",
    type: "hero",
    slug: "hero-with-features",
    Component: HeroWithFeatures,
    description: "Hero section with headline, CTAs, and feature cards below.",
    props: heroWithFeaturesContent,
    filePath: "./components/hero/hero-with-features/index.tsx",
  },
  {
    name: "Hero with Badge",
    type: "hero",
    slug: "hero-with-badge",
    Component: HeroWithBadge,
    description:
      "Minimal hero section with a badge/announcement above the headline.",
    props: heroWithBadgeContent,
    filePath: "./components/hero/hero-with-badge/index.tsx",
  },
  {
    name: "Hero with Stats",
    type: "hero",
    slug: "hero-with-stats",
    Component: HeroWithStats,
    description: "Hero section with prominent statistics display.",
    props: heroWithStatsContent,
    filePath: "./components/hero/hero-with-stats/index.tsx",
  },
  {
    name: "Hero with Testimonial",
    type: "hero",
    slug: "hero-with-testimonial",
    Component: HeroWithTestimonial,
    description: "Hero section with a featured testimonial for social proof.",
    props: heroWithTestimonialContent,
    filePath: "./components/hero/hero-with-testimonial/index.tsx",
  },
  {
    name: "Hero with Form",
    type: "hero",
    slug: "hero-with-form",
    Component: HeroWithForm,
    description: "Hero section with an inline form for lead capture.",
    props: heroWithFormContent,
    filePath: "./components/hero/hero-with-form/index.tsx",
  },
  {
    name: "Hero with Tabs",
    type: "hero",
    slug: "hero-with-tabs",
    Component: HeroWithTabs,
    description: "Hero section with tabbed content panels.",
    props: heroWithTabsContent,
    filePath: "./components/hero/hero-with-tabs/index.tsx",
  },
  {
    name: "Hero Centered",
    type: "hero",
    slug: "hero-centered",
    Component: HeroCentered,
    description: "Ultra-minimal centered hero with large typography.",
    props: heroCenteredContent,
    filePath: "./components/hero/hero-centered/index.tsx",
  },

  // Left-aligned variants
  {
    name: "Hero Minimal (Left)",
    type: "hero",
    slug: "hero-minimal-left",
    Component: HeroMinimalLeft,
    description:
      "Minimal hero section with left-aligned text and optional CTAs.",
    props: heroMinimalLeftContent,
    filePath: "./components/hero/hero-minimal-left/index.tsx",
  },
  {
    name: "Hero with Badge (Left)",
    type: "hero",
    slug: "hero-with-badge-left",
    Component: HeroWithBadgeLeft,
    description:
      "Hero section with a badge/announcement above the left-aligned headline.",
    props: heroWithBadgeLeftContent,
    filePath: "./components/hero/hero-with-badge-left/index.tsx",
  },
  {
    name: "Hero with Stats (Left)",
    type: "hero",
    slug: "hero-with-stats-left",
    Component: HeroWithStatsLeft,
    description:
      "Hero section with left-aligned text and prominent statistics display.",
    props: heroWithStatsLeftContent,
    filePath: "./components/hero/hero-with-stats-left/index.tsx",
  },
  {
    name: "Hero with Testimonial (Left)",
    type: "hero",
    slug: "hero-with-testimonial-left",
    Component: HeroWithTestimonialLeft,
    description:
      "Hero section with left-aligned text and a featured testimonial for social proof.",
    props: heroWithTestimonialLeftContent,
    filePath: "./components/hero/hero-with-testimonial-left/index.tsx",
  },
  {
    name: "Hero with Form (Left)",
    type: "hero",
    slug: "hero-with-form-left",
    Component: HeroWithFormLeft,
    description:
      "Hero section with left-aligned text and an inline form for lead capture.",
    props: heroWithFormLeftContent,
    filePath: "./components/hero/hero-with-form-left/index.tsx",
  },
  {
    name: "Hero with Tabs (Left)",
    type: "hero",
    slug: "hero-with-tabs-left",
    Component: HeroWithTabsLeft,
    description:
      "Hero section with left-aligned text and tabbed content panels.",
    props: heroWithTabsLeftContent,
    filePath: "./components/hero/hero-with-tabs-left/index.tsx",
  },

  // Feature components
  {
    name: "Feature Grid",
    type: "feature",
    slug: "feature-grid",
    Component: FeatureGrid,
    description: "Grid layout for showcasing multiple features with icons, centered text.",
    props: featureGridContent,
    filePath: "./components/feature/feature-grid/index.tsx",
  },
  {
    name: "Feature Grid (Left)",
    type: "feature",
    slug: "feature-grid-left",
    Component: FeatureGridLeft,
    description: "Grid layout for showcasing multiple features with icons, left-aligned text.",
    props: featureGridLeftContent,
    filePath: "./components/feature/feature-grid-left/index.tsx",
  },
  {
    name: "Feature List",
    type: "feature",
    slug: "feature-list",
    Component: FeatureList,
    description: "List layout with alternating sides for features with images.",
    props: featureListContent,
    filePath: "./components/feature/feature-list/index.tsx",
  },
  {
    name: "Feature List (Left)",
    type: "feature",
    slug: "feature-list-left",
    Component: FeatureListLeft,
    description: "List layout with consistent left-aligned features and images.",
    props: featureListLeftContent,
    filePath: "./components/feature/feature-list-left/index.tsx",
  },
  {
    name: "Feature Cards",
    type: "feature",
    slug: "feature-cards",
    Component: FeatureCards,
    description: "Card-based feature layout with hover effects, centered design.",
    props: featureCardsContent,
    filePath: "./components/feature/feature-cards/index.tsx",
  },
  {
    name: "Feature Cards (Left)",
    type: "feature",
    slug: "feature-cards-left",
    Component: FeatureCardsLeft,
    description: "Card-based feature layout with hover effects, left-aligned content.",
    props: featureCardsLeftContent,
    filePath: "./components/feature/feature-cards-left/index.tsx",
  },
  {
    name: "Feature Comparison",
    type: "feature",
    slug: "feature-comparison",
    Component: FeatureComparison,
    description: "Comparison table for plans, products, or feature sets.",
    props: featureComparisonContent,
    filePath: "./components/feature/feature-comparison/index.tsx",
  },
  {
    name: "Feature Showcase",
    type: "feature",
    slug: "feature-showcase",
    Component: FeatureShowcase,
    description: "Large feature showcase with screenshot and key points, centered text.",
    props: featureShowcaseContent,
    filePath: "./components/feature/feature-showcase/index.tsx",
  },
  {
    name: "Feature Showcase (Left)",
    type: "feature",
    slug: "feature-showcase-left",
    Component: FeatureShowcaseLeft,
    description: "Large feature showcase with screenshot and key points, left-aligned text.",
    props: featureShowcaseLeftContent,
    filePath: "./components/feature/feature-showcase-left/index.tsx",
  },
  {
    name: "Feature Timeline",
    type: "feature",
    slug: "feature-timeline",
    Component: FeatureTimeline,
    description: "Timeline/process steps layout for onboarding flows or roadmaps.",
    props: featureTimelineContent,
    filePath: "./components/feature/feature-timeline/index.tsx",
  },
];
