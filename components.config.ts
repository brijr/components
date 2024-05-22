import { readFileSync } from "fs";
import { join } from "path";

// Hero Component Imports
import HeroOne from "@/components/heros/hero-one";
import HeroTwo from "@/components/heros/hero-two";
import HeroThree from "@/components/heros/hero-three";
import HeroFour from "@/components/heros/hero-four";
import HeroFive from "@/components/heros/hero-five";
import HeroSix from "@/components/heros/hero-six";

// CTA Component Imports
import CTAOne from "@/components/ctas/cta-one";
import CTATwo from "@/components/ctas/cta-two";
import CTAThree from "@/components/ctas/cta-three";
import CTAFour from "@/components/ctas/cta-four";

// FAQ Component Imports
import FAQOne from "@/components/faqs/faqs-one";
import FAQTwo from "@/components/faqs/faqs-two";

// Feature Component Imports
import FeatureOne from "@/components/features/feature-one";
import FeatureTwo from "@/components/features/feature-two";
import FeatureThree from "@/components/features/feature-three";
import FeatureFour from "@/components/features/feature-four";
import FeatureFive from "@/components/features/feature-five";
import FeatureSix from "@/components/features/feature-six";
import FeatureSeven from "@/components/features/feature-seven";
import FeatureEight from "@/components/features/feature-eight";

// Header Component Imports
import HeaderOne from "@/components/headers/header-one";
import HeaderTwo from "@/components/headers/header-two";

// Footer Component Imports
import FooterOne from "@/components/footers/footer-one";
import FooterTwo from "@/components/footers/footer-two";
import FooterThree from "@/components/footers/footer-three";
import FooterFour from "@/components/footers/footer-four";
import FooterFive from "@/components/footers/footer-five";

// Component Code Imports
// Hero Component Code Imports
const HeroOneCode = readFileSync(
  join(process.cwd(), "components/heros/hero-one.tsx"),
  "utf8"
);
const HeroTwoCode = readFileSync(
  join(process.cwd(), "components/heros/hero-two.tsx"),
  "utf8"
);
const HeroThreeCode = readFileSync(
  join(process.cwd(), "components/heros/hero-three.tsx"),
  "utf8"
);
const HeroFourCode = readFileSync(
  join(process.cwd(), "components/heros/hero-four.tsx"),
  "utf8"
);
const HeroFiveCode = readFileSync(
  join(process.cwd(), "components/heros/hero-five.tsx"),
  "utf8"
);
const HeroSixCode = readFileSync(
  join(process.cwd(), "components/heros/hero-six.tsx"),
  "utf8"
);

// CTA Component Code Imports
const CTAOneCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-one.tsx"),
  "utf8"
);
const CTATwoCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-two.tsx"),
  "utf8"
);
const CTAThreeCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-three.tsx"),
  "utf8"
);
const CTAFourCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-four.tsx"),
  "utf8"
);

// FAQ Component Code Imports
const FAQOneCode = readFileSync(
  join(process.cwd(), "components/faqs/faqs-one.tsx"),
  "utf8"
);
const FAQTwoCode = readFileSync(
  join(process.cwd(), "components/faqs/faqs-two.tsx"),
  "utf8"
);

// Feature Component Code Imports
const FeatureOneCode = readFileSync(
  join(process.cwd(), "components/features/feature-one.tsx"),
  "utf8"
);
const FeatureTwoCode = readFileSync(
  join(process.cwd(), "components/features/feature-two.tsx"),
  "utf8"
);
const FeatureThreeCode = readFileSync(
  join(process.cwd(), "components/features/feature-three.tsx"),
  "utf8"
);
const FeatureFourCode = readFileSync(
  join(process.cwd(), "components/features/feature-four.tsx"),
  "utf8"
);
const FeatureFiveCode = readFileSync(
  join(process.cwd(), "components/features/feature-five.tsx"),
  "utf8"
);
const FeatureSixCode = readFileSync(
  join(process.cwd(), "components/features/feature-six.tsx"),
  "utf8"
);
const FeatureSevenCode = readFileSync(
  join(process.cwd(), "components/features/feature-seven.tsx"),
  "utf8"
);
const FeatureEightCode = readFileSync(
  join(process.cwd(), "components/features/feature-eight.tsx"),
  "utf8"
);

// Header Component Code Imports
const HeaderOneCode = readFileSync(
  join(process.cwd(), "components/headers/header-one.tsx"),
  "utf8"
);
const HeaderTwoCode = readFileSync(
  join(process.cwd(), "components/headers/header-two.tsx"),
  "utf8"
);

// Footer Component Code Imports
const FooterOneCode = readFileSync(
  join(process.cwd(), "components/footers/footer-one.tsx"),
  "utf8"
);
const FooterTwoCode = readFileSync(
  join(process.cwd(), "components/footers/footer-two.tsx"),
  "utf8"
);
const FooterThreeCode = readFileSync(
  join(process.cwd(), "components/footers/footer-three.tsx"),
  "utf8"
);
const FooterFourCode = readFileSync(
  join(process.cwd(), "components/footers/footer-four.tsx"),
  "utf8"
);
const FooterFiveCode = readFileSync(
  join(process.cwd(), "components/footers/footer-five.tsx"),
  "utf8"
);

// Component Interface
export const components: Components[] = [
  // Hero Components
  {
    component: HeroOne,
    path: "heros/hero-one",
    code: HeroOneCode,
    type: "hero",
  },
  {
    component: HeroTwo,
    path: "heros/hero-two",
    code: HeroTwoCode,
    type: "hero",
  },
  {
    component: HeroThree,
    path: "heros/hero-three",
    code: HeroThreeCode,
    type: "hero",
  },
  {
    component: HeroFour,
    path: "heros/hero-four",
    code: HeroFourCode,
    type: "hero",
  },
  {
    component: HeroFive,
    path: "heros/hero-five",
    code: HeroFiveCode,
    type: "hero",
  },
  {
    component: HeroSix,
    path: "heros/hero-six",
    code: HeroSixCode,
    type: "hero",
  },

  // CTA Components
  {
    component: CTAOne,
    path: "ctas/cta-one",
    code: CTAOneCode,
    type: "cta",
  },
  {
    component: CTATwo,
    path: "ctas/cta-two",
    code: CTATwoCode,
    type: "cta",
  },
  {
    component: CTAThree,
    path: "ctas/cta-three",
    code: CTAThreeCode,
    type: "cta",
  },
  {
    component: CTAFour,
    path: "ctas/cta-four",
    code: CTAFourCode,
    type: "cta",
  },

  // FAQ Components
  {
    component: FAQOne,
    path: "faqs/faqs-one",
    code: FAQOneCode,
    type: "faq",
  },
  {
    component: FAQTwo,
    path: "faqs/faqs-two",
    code: FAQTwoCode,
    type: "faq",
  },

  // Feature Components
  {
    component: FeatureOne,
    path: "features/feature-one",
    code: FeatureOneCode,
    type: "feature",
  },
  {
    component: FeatureTwo,
    path: "features/feature-two",
    code: FeatureTwoCode,
    type: "feature",
  },
  {
    component: FeatureThree,
    path: "features/feature-three",
    code: FeatureThreeCode,
    type: "feature",
  },
  {
    component: FeatureFour,
    path: "features/feature-four",
    code: FeatureFourCode,
    type: "feature",
  },
  {
    component: FeatureFive,
    path: "features/feature-five",
    code: FeatureFiveCode,
    type: "feature",
  },
  {
    component: FeatureSix,
    path: "features/feature-six",
    code: FeatureSixCode,
    type: "feature",
  },
  {
    component: FeatureSeven,
    path: "features/feature-seven",
    code: FeatureSevenCode,
    type: "feature",
  },
  {
    component: FeatureEight,
    path: "features/feature-eight",
    code: FeatureEightCode,
    type: "feature",
  },

  // Header Components
  {
    component: HeaderOne,
    path: "headers/header-one",
    code: HeaderOneCode,
    type: "header",
  },
  {
    component: HeaderTwo,
    path: "headers/header-two",
    code: HeaderTwoCode,
    type: "header",
  },

  // Footer Components
  {
    component: FooterOne,
    path: "footers/footer-one",
    code: FooterOneCode,
    type: "footer",
  },
  {
    component: FooterTwo,
    path: "footers/footer-two",
    code: FooterTwoCode,
    type: "footer",
  },
  {
    component: FooterThree,
    path: "footers/footer-three",
    code: FooterThreeCode,
    type: "footer",
  },
  {
    component: FooterFour,
    path: "footers/footer-four",
    code: FooterFourCode,
    type: "footer",
  },
  {
    component: FooterFive,
    path: "footers/footer-five",
    code: FooterFiveCode,
    type: "footer",
  },
];

export const types = [
  "all",
  "hero",
  "cta",
  "faq",
  "feature",
  "header",
  "footer",
];
