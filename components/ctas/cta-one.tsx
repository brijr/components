import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const CTA = () => {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6">
          <h2 className="!my-0">Lorem ipsum dolor sit amet</h2>
          <h4 className="text-muted-foreground">
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
      </Container>
    </Section>
  );
};

export default CTA;
