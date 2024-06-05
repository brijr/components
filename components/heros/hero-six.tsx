import { Section, Container } from "@/components/craft";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import Link from "next/link";

const Hero = () => {
  return (
    <Section className="relative backdrop-blur-sm">
      <Container className="flex flex-col gap-8">
        <Badge className="w-fit not-prose" variant="outline">
          <Link
            className="flex items-center gap-1 group"
            href="https://9d8.dev"
          >
            Lorem ipsum dolor sit amet
            <ArrowRight className="w-4 group-hover:-rotate-45 transition-all" />
          </Link>
        </Badge>
        <h1 className="!mb-0">
          What if building landing pages was as easy as copy and paste?
        </h1>
        <h3 className="text-muted-foreground p-4 bg-muted/50 border rounded-md">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>

        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
