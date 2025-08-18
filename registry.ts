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
import { HeroLeftMedia } from "./components/components/hero/hero-left-media";
import { defaultContent as heroLeftMediaContent } from "./components/components/hero/hero-left-media/content";
import { HeroBackgroundImage } from "./components/components/hero/hero-background-image";
import { defaultContent as heroBackgroundImageContent } from "./components/components/hero/hero-background-image/content";
import { HeroVideoFirst } from "./components/components/hero/hero-video-first";
import { defaultContent as heroVideoFirstContent } from "./components/components/hero/hero-video-first/content";
import { HeroWithForm } from "./components/components/hero/hero-with-form";
import { defaultContent as heroWithFormContent } from "./components/components/hero/hero-with-form/content";

// Feature components
import { FeatureThreeCards } from "./components/components/feature/feature-three-cards";
import { defaultContent as featureThreeCardsContent } from "./components/components/feature/feature-three-cards/content";
import { FeatureIconList } from "./components/components/feature/feature-icon-list";
import { defaultContent as featureIconListContent } from "./components/components/feature/feature-icon-list/content";
import { FeatureAlternatingMedia } from "./components/components/feature/feature-alternating-media";
import { defaultContent as featureAlternatingMediaContent } from "./components/components/feature/feature-alternating-media/content";
import { FeatureTabbed } from "./components/components/feature/feature-tabbed";
import { defaultContent as featureTabbedContent } from "./components/components/feature/feature-tabbed/content";

// Testimonial components
import { TestimonialCarousel } from "./components/components/testimonial/testimonial-carousel";
import { defaultContent as testimonialCarouselContent } from "./components/components/testimonial/testimonial-carousel/content";
import { TestimonialGrid } from "./components/components/testimonial/testimonial-grid";
import { defaultContent as testimonialGridContent } from "./components/components/testimonial/testimonial-grid/content";
import { TestimonialCaseStudy } from "./components/components/testimonial/testimonial-case-study";
import { defaultContent as testimonialCaseStudyContent } from "./components/components/testimonial/testimonial-case-study/content";
import { TestimonialStarRating } from "./components/components/testimonial/testimonial-star-rating";
import { defaultContent as testimonialStarRatingContent } from "./components/components/testimonial/testimonial-star-rating/content";

// Pricing components
import { PricingToggle } from "./components/components/pricing/pricing-toggle";
import { defaultContent as pricingToggleContent } from "./components/components/pricing/pricing-toggle/content";
import { PricingHighlight } from "./components/components/pricing/pricing-highlight";
import { defaultContent as pricingHighlightContent } from "./components/components/pricing/pricing-highlight/content";
import { PricingUsage } from "./components/components/pricing/pricing-usage";
import { defaultContent as pricingUsageContent } from "./components/components/pricing/pricing-usage/content";
import { PricingCalculator } from "./components/components/pricing/pricing-calculator";
import { defaultContent as pricingCalculatorContent } from "./components/components/pricing/pricing-calculator/content";

// CTA components
import { CTASingle } from "./components/components/cta/cta-single";
import { defaultContent as ctaSingleContent } from "./components/components/cta/cta-single/content";
import { CTADual } from "./components/components/cta/cta-dual";
import { defaultContent as ctaDualContent } from "./components/components/cta/cta-dual/content";
import { CTASticky } from "./components/components/cta/cta-sticky";
import { defaultContent as ctaStickyContent } from "./components/components/cta/cta-sticky/content";
import { CTAInline } from "./components/components/cta/cta-inline";
import { defaultContent as ctaInlineContent } from "./components/components/cta/cta-inline/content";

// Footer components
import { FooterMinimal } from "./components/components/footer/footer-minimal";
import { defaultContent as footerMinimalContent } from "./components/components/footer/footer-minimal/content";
import { FooterWithCTA } from "./components/components/footer/footer-with-cta";
import { defaultContent as footerWithCTAContent } from "./components/components/footer/footer-with-cta/content";
import { FooterWithSocial } from "./components/components/footer/footer-with-social";
import { defaultContent as footerWithSocialContent } from "./components/components/footer/footer-with-social/content";
import { FooterWithNewsletter } from "./components/components/footer/footer-with-newsletter";
import { defaultContent as footerWithNewsletterContent } from "./components/components/footer/footer-with-newsletter/content";

type RegistryItem = {
  name: string;
  type: "hero" | "feature" | "testimonial" | "pricing" | "cta" | "footer";
  slug: string;
  Component: React.ComponentType<any>;
  description?: string;
  props?: any;
  filePath: string;
};

export const registry: RegistryItem[] = [
  // Hero components
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
  {
    name: "Hero Left Media",
    type: "hero",
    slug: "hero-left-media",
    Component: HeroLeftMedia,
    description: "Hero with media on the left and content on the right.",
    props: heroLeftMediaContent,
    filePath: "./components/components/hero/hero-left-media/index.tsx",
  },
  {
    name: "Hero Background Image",
    type: "hero",
    slug: "hero-background-image",
    Component: HeroBackgroundImage,
    description: "Hero with full background image and overlay.",
    props: heroBackgroundImageContent,
    filePath: "./components/components/hero/hero-background-image/index.tsx",
  },
  {
    name: "Hero Video First",
    type: "hero",
    slug: "hero-video-first",
    Component: HeroVideoFirst,
    description: "Video-focused hero with prominent video player.",
    props: heroVideoFirstContent,
    filePath: "./components/components/hero/hero-video-first/index.tsx",
  },
  {
    name: "Hero with Form",
    type: "hero",
    slug: "hero-with-form",
    Component: HeroWithForm,
    description: "Hero with integrated signup or contact form.",
    props: heroWithFormContent,
    filePath: "./components/components/hero/hero-with-form/index.tsx",
  },

  // Feature components
  {
    name: "Feature Three Cards",
    type: "feature",
    slug: "feature-three-cards",
    Component: FeatureThreeCards,
    description: "Three feature cards in a grid layout.",
    props: featureThreeCardsContent,
    filePath: "./components/components/feature/feature-three-cards/index.tsx",
  },
  {
    name: "Feature Icon List",
    type: "feature",
    slug: "feature-icon-list",
    Component: FeatureIconList,
    description: "Feature list with icons in a grid layout.",
    props: featureIconListContent,
    filePath: "./components/components/feature/feature-icon-list/index.tsx",
  },
  {
    name: "Feature Alternating Media",
    type: "feature",
    slug: "feature-alternating-media",
    Component: FeatureAlternatingMedia,
    description: "Features with alternating media placement.",
    props: featureAlternatingMediaContent,
    filePath: "./components/components/feature/feature-alternating-media/index.tsx",
  },
  {
    name: "Feature Tabbed",
    type: "feature",
    slug: "feature-tabbed",
    Component: FeatureTabbed,
    description: "Tab-based feature showcase.",
    props: featureTabbedContent,
    filePath: "./components/components/feature/feature-tabbed/index.tsx",
  },

  // Testimonial components
  {
    name: "Testimonial Carousel",
    type: "testimonial",
    slug: "testimonial-carousel",
    Component: TestimonialCarousel,
    description: "Testimonial quotes in a carousel format.",
    props: testimonialCarouselContent,
    filePath: "./components/components/testimonial/testimonial-carousel/index.tsx",
  },
  {
    name: "Testimonial Grid",
    type: "testimonial",
    slug: "testimonial-grid",
    Component: TestimonialGrid,
    description: "Grid layout of testimonial cards.",
    props: testimonialGridContent,
    filePath: "./components/components/testimonial/testimonial-grid/index.tsx",
  },
  {
    name: "Testimonial Case Study",
    type: "testimonial",
    slug: "testimonial-case-study",
    Component: TestimonialCaseStudy,
    description: "Detailed case study with results and metrics.",
    props: testimonialCaseStudyContent,
    filePath: "./components/components/testimonial/testimonial-case-study/index.tsx",
  },
  {
    name: "Testimonial Star Rating",
    type: "testimonial",
    slug: "testimonial-star-rating",
    Component: TestimonialStarRating,
    description: "Star rating summary with breakdown.",
    props: testimonialStarRatingContent,
    filePath: "./components/components/testimonial/testimonial-star-rating/index.tsx",
  },

  // Pricing components
  {
    name: "Pricing Toggle",
    type: "pricing",
    slug: "pricing-toggle",
    Component: PricingToggle,
    description: "Pricing with monthly/annual toggle.",
    props: pricingToggleContent,
    filePath: "./components/components/pricing/pricing-toggle/index.tsx",
  },
  {
    name: "Pricing Highlight",
    type: "pricing",
    slug: "pricing-highlight",
    Component: PricingHighlight,
    description: "Pricing plans with featured option.",
    props: pricingHighlightContent,
    filePath: "./components/components/pricing/pricing-highlight/index.tsx",
  },
  {
    name: "Pricing Usage",
    type: "pricing",
    slug: "pricing-usage",
    Component: PricingUsage,
    description: "Usage-based pay-as-you-go pricing.",
    props: pricingUsageContent,
    filePath: "./components/components/pricing/pricing-usage/index.tsx",
  },
  {
    name: "Pricing Calculator",
    type: "pricing",
    slug: "pricing-calculator",
    Component: PricingCalculator,
    description: "Interactive pricing calculator.",
    props: pricingCalculatorContent,
    filePath: "./components/components/pricing/pricing-calculator/index.tsx",
  },

  // CTA components
  {
    name: "CTA Single",
    type: "cta",
    slug: "cta-single",
    Component: CTASingle,
    description: "Simple CTA with single action button.",
    props: ctaSingleContent,
    filePath: "./components/components/cta/cta-single/index.tsx",
  },
  {
    name: "CTA Dual",
    type: "cta",
    slug: "cta-dual",
    Component: CTADual,
    description: "CTA with primary and secondary actions.",
    props: ctaDualContent,
    filePath: "./components/components/cta/cta-dual/index.tsx",
  },
  {
    name: "CTA Sticky",
    type: "cta",
    slug: "cta-sticky",
    Component: CTASticky,
    description: "Sticky CTA bar that appears on scroll.",
    props: ctaStickyContent,
    filePath: "./components/components/cta/cta-sticky/index.tsx",
  },
  {
    name: "CTA Inline",
    type: "cta",
    slug: "cta-inline",
    Component: CTAInline,
    description: "Inline CTA for placement between sections.",
    props: ctaInlineContent,
    filePath: "./components/components/cta/cta-inline/index.tsx",
  },
  
  // Footer components
  {
    name: "Footer Minimal",
    type: "footer",
    slug: "footer-minimal",
    Component: FooterMinimal,
    description: "Minimal footer with copyright and essential links.",
    props: footerMinimalContent,
    filePath: "./components/components/footer/footer-minimal/index.tsx",
  },
  {
    name: "Footer with CTA",
    type: "footer",
    slug: "footer-with-cta",
    Component: FooterWithCTA,
    description: "Footer that reinforces the main conversion goal.",
    props: footerWithCTAContent,
    filePath: "./components/components/footer/footer-with-cta/index.tsx",
  },
  {
    name: "Footer with Social",
    type: "footer",
    slug: "footer-with-social",
    Component: FooterWithSocial,
    description: "Footer with social media links and trust badges.",
    props: footerWithSocialContent,
    filePath: "./components/components/footer/footer-with-social/index.tsx",
  },
  {
    name: "Footer with Newsletter",
    type: "footer",
    slug: "footer-with-newsletter",
    Component: FooterWithNewsletter,
    description: "Footer with newsletter signup and comprehensive links.",
    props: footerWithNewsletterContent,
    filePath: "./components/components/footer/footer-with-newsletter/index.tsx",
  },
];
