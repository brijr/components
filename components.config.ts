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

// Component Code Imports
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
const CTAOneCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-one.tsx"),
  "utf8"
);
const CTATwoCode = readFileSync(
  join(process.cwd(), "components/ctas/cta-two.tsx"),
  "utf8"
);
const FAQOneCode = readFileSync(
  join(process.cwd(), "components/faqs/faqs-one.tsx"),
  "utf8"
);

export const components = [
  {
    component: HeroOne,
    path: "heros/hero-one",
    code: HeroOneCode,
  },
  {
    component: HeroTwo,
    path: "heros/hero-two",
    code: HeroTwoCode,
  },
  {
    component: HeroThree,
    path: "heros/hero-three",
    code: HeroThreeCode,
  },
  {
    component: HeroFour,
    path: "heros/hero-four",
    code: HeroFourCode,
  },
  {
    component: CTAOne,
    path: "ctas/cta-one",
    code: CTAOneCode,
  },
  {
    component: CTATwo,
    path: "ctas/cta-two",
    code: CTATwoCode,
  },
  {
    component: FAQOne,
    path: "faqs/faqs-one",
    code: FAQOneCode,
  },
];
