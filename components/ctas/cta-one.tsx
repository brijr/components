// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "@/components/ui/button";

// Custom components
import { Container, Section } from "@/components/ds";

const CTA = () => {
  return (
    <Section>
      <Container className="flex flex-col gap-6">
        <h2 className="!my-0">Lorem ipsum dolor sit amet</h2>
        <h4 className="text-muted-foreground">
          <Balancer>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </Balancer>
        </h4>
        <div className="not-prose flex items-center gap-2">
          <Button asChild>
            <Link href="#">Get Started</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Learn More {"->"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
