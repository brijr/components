import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

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
    name: "Button",
    type: "hero",
    slug: "button",
    Component: Button,
    description: "A customizable button component.",
  },
  {
    name: "Card",
    type: "hero",
    slug: "card",
    Component: Card,
    description: "A customizable card component.",
  },
];
