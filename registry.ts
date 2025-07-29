import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

type RegistryItem = {
  name: string;
  slug: string;
  Component: React.ComponentType<any>;
  description?: string;
};

export const registry: RegistryItem[] = [
  {
    name: "Button",
    slug: "button",
    Component: Button,
    description: "A customizable button component.",
  },
  {
    name: "Card",
    slug: "card",
    Component: Card,
    description: "A customizable card component.",
  },
];
