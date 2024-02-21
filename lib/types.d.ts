declare module "!!raw-loader!*" {
  const content: string;
  export default content;
}

type ComponentTypes = "all" | "hero" | "cta" | "faq" | "feature" | "header";

type Components = {
  component: any;
  path: string;
  code: string;
  type: ComponentTypes;
};

// Types of components
const types: ComponentTypes[] = [
  "all",
  "hero",
  "feature",
  "cta",
  "header",
  "faq",
];
