import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const CTA = () => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose rounded-lg md:rounded-xl p-6 md:p-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">Lorem ipsum dolor sit amet</h3>
          <h4 className="text-2xl opacity-70">
            <Balancer>
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Balancer>
          </h4>
          <div className="flex items-center gap-2">
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

export default CTA;
