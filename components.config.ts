import { readFileSync } from "fs";
import { join } from "path";

// Hero Component Imports
import HeroOne from "@/components/heros/hero-one";
import HeroTwo from "@/components/heros/hero-two";
import HeroThree from "@/components/heros/hero-three";
import HeroFour from "@/components/heros/hero-four";

// CTA Component Imports
import CTAOne from "@/components/ctas/cta-one";
import CTATwo from "@/components/ctas/cta-two";

// FAQ Component Imports
import FAQOne from "@/components/faqs/faqs-one";

// Feature Component Imports
import FeatureOne from "@/components/features/feature-one";

// Header Component Imports
import HeaderOne from "@/components/headers/header-one";
import HeaderTwo from "@/components/headers/header-two";

// Component Code Imports and Interface
export const components: Components[] = [
  {
    component: HeroOne,
    path: "heros/hero-one",
    code: readFileSync(
      join(process.cwd(), "components/heros/hero-one.tsx"),
      "utf8"
    ),
    type: "hero",
  },
  {
    component: HeroTwo,
    path: "heros/hero-two",
    code: readFileSync(
      join(process.cwd(), "components/heros/hero-two.tsx"),
      "utf8"
    ),
    type: "hero",
  },
  {
    component: HeroThree,
    path: "heros/hero-three",
    code: readFileSync(
      join(process.cwd(), "components/heros/hero-three.tsx"),
      "utf8"
    ),
    type: "hero",
  },
  {
    component: HeroFour,
    path: "heros/hero-four",
    code: readFileSync(
      join(process.cwd(), "components/heros/hero-four.tsx"),
      "utf8"
    ),
    type: "hero",
  },
  {
    component: CTAOne,
    path: "ctas/cta-one",
    code: readFileSync(
      join(process.cwd(), "components/ctas/cta-one.tsx"),
      "utf8"
    ),
    type: "cta",
  },
  {
    component: CTATwo,
    path: "ctas/cta-two",
    code: readFileSync(
      join(process.cwd(), "components/ctas/cta-two.tsx"),
      "utf8"
    ),
    type: "cta",
  },
  {
    component: FAQOne,
    path: "faqs/faqs-one",
    code: readFileSync(
      join(process.cwd(), "components/faqs/faqs-one.tsx"),
      "utf8"
    ),
    type: "faq",
  },
  {
    component: FeatureOne,
    path: "features/feature-one",
    code: readFileSync(
      join(process.cwd(), "components/features/feature-one.tsx"),
      "utf8"
    ),
    type: "feature",
  },
  {
    component: HeaderOne,
    path: "headers/header-one",
    code: readFileSync(
      join(process.cwd(), "components/headers/header-one.tsx"),
      "utf8"
    ),
    type: "header",
  },
  {
    component: HeaderTwo,
    path: "headers/header-two",
    code: readFileSync(
      join(process.cwd(), "components/headers/header-two.tsx"),
      "utf8"
    ),
    type: "header",
  },
];
