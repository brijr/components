// Layout
import * as Craft from "@/components/craft/layout";
import Balancer from "react-wrap-balancer";

// Icons
import { HomeIcon, HeartIcon, StarIcon } from "@radix-ui/react-icons";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <StarIcon className="w-6 h-6" />,
    title: "Veteran Disability",
    description:
      "Many veterans bear the mental and physical scars sustained during their service. Veteran disability benefits provides veterans with compensation for their sacrifice.",
  },
  {
    icon: <HomeIcon className="w-6 h-6" />,
    title: "Housing Benefits",
    description:
      "Whether it's moving into a new home, or remodeling a current home to be better suited to life with a disability, there are mortgage and loan services that only veterans can access.",
  },
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: "VA Healthcare",
    description:
      "Service to our nation has guaranteed many veterans access to quality healthcare for the rest of their lives. However, knowing what is covered and where to get medical help can be tough.",
  },
];

const Feature = () => {
  return (
    <Craft.Section className="border-b">
      <Craft.Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              Uncover the benefits you&apos;ve earned through service to our
              nation
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Your tireless and valiant service has not gone unnoticed. Our
              great nation recognizes your sacrifice by providing you and other
              heroes with exclusive veteran benefits.
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
