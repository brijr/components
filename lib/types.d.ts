declare module "!!raw-loader!*" {
  const content: string;
  export default content;
}

type ComponentTypes = "hero" | "cta" | "faq" | "feature" | "header";

type Components = {
  component: any;
  path: string;
  code: string;
  type: ComponentTypes;
};
