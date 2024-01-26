// Layout
import * as Craft from "@/components/craft/layout";
import Balancer from "react-wrap-balancer";

// Icons
import { Coins } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Lorem Ipsum",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Lorem Ipsum",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Feature = () => {
  return (
    <Craft.Section className="border-b">
      <Craft.Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Balancer>
          </h4>

          <div className="grid md:grid-cols-3 mt-6 gap-6 md:mt-12">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="grid gap-4" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Feature;
