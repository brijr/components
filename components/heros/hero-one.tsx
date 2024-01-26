import * as Craft from "@/components/craft/layout";
import Placeholder from "@/public/placeholder.jpg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <Craft.Section>
      <Craft.Container>
        <div className="not-prose flex flex-col gap-6">
          <Button asChild className="w-fit" size={"sm"} variant={"outline"}>
            <Link href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="w-4" />
            </Link>
          </Button>
          <h1 className="text-primary-500 text-4xl md:text-6xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h1>
          <h2 className="text-xl md:text-3xl font-light">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h2>
          <div className="my-8 h-96 w-full overflow-hidden border rounded-lg md:rounded-xl md:h-[480px]">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Hero;
