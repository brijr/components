import { Section, Container, Prose } from "@/components/ds";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Placeholder from "@/public/placeholder.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center">
        <Button size="sm" variant="outline">
          Lorem ipsum dolor sit amet <ArrowRight size={16} />
        </Button>
        <Prose isSpaced>
          <h1 className="!mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h1>
          <h3 className="text-muted-foreground">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
        </Prose>
        <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
          <Image
            className="not-prose h-full w-full object-cover object-bottom"
            src={Placeholder}
            width={1920}
            height={1080}
            alt="hero image"
            placeholder="blur"
          />
        </div>
      </Container>
    </Section>
  );
}
