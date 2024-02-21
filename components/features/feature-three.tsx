import * as Craft from "@/components/craft/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Placeholder from "@/public/placeholder.jpg";

const Feature = () => {
  return (
    <Craft.Section>
      <Craft.Container className="grid md:grid-cols-2 md:gap-12 items-stretch">
        <div className="not-prose border relative rounded-lg overflow-hidden flex">
          <Image
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
            layout="fill"
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0">Lorem ipsum dolor sit</h3>
          <p className="font-light leading-[1.4] opacity-70">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">Learn More {"->"}</Link>
            </Button>
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Feature;
