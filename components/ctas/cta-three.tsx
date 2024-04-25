import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const CTA = () => {
  return (
    <Section>
      <Container className="border rounded-lg bg-accent/50 items-center flex flex-col text-center md:rounded-xl p-6 md:p-12 gap-6">
        <h2>Lorem ipsum dolor sit amet</h2>
        <h3 className="text-muted-foreground">
          <Balancer>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </Balancer>
        </h3>
        <div className="flex items-center not-prose gap-2 mt-4 mx-auto">
          <Button className="w-fit" asChild>
            <Link href="#">Get Started</Link>
          </Button>
          <Button className="w-fit" variant="link" asChild>
            <Link href="#">Learn More {"->"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
