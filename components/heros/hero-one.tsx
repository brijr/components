import * as Craft from "@/components/craft/layout";
import Placeholder from "@/public/placeholder.jpg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <Craft.Section className="border-b">
      <Craft.Container>
        <div className="not-prose flex flex-col gap-6">
          <a
            href="https://9d8.dev"
            className="flex gap-1 text-xs items-center border w-fit rounded-lg px-2 py-1 opacity-70 hover:opacity-100 transition-all"
          >
            Lorem ipsum dolor sit amet <ArrowRight className="w-4" />
          </a>
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
