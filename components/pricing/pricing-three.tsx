import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Container, Section } from "../ds";

interface PricingCardProps {
  title: "Basic" | "Standard" | "Pro";
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  isPopular?: boolean;
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Basic",
    price: "$29/month",
    description: "Perfect for small businesses and individuals.",
    features: ["3 Pages", "Basic SEO", "Email Support", "Responsive Design"],
    cta: "Choose Basic",
    href: "https://stripe.com/",
  },
  {
    title: "Standard",
    price: "$59/month",
    description: "Best for growing businesses with more needs.",
    features: [
      "10 Pages",
      "Advanced SEO",
      "CMS Integration",
      "24/7 Chat Support",
    ],
    cta: "Choose Standard",
    href: "https://stripe.com/",
    isPopular: true,
  },
  {
    title: "Pro",
    price: "$99/month",
    description: "Ideal for larger businesses that need scalability.",
    features: [
      "Unlimited Pages",
      "E-commerce Integration",
      "Priority Support",
      "Custom API Integration",
    ],
    cta: "Choose Pro",
    href: "https://stripe.com/",
  },
];

const Pricing = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="!my-0">Pricing</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Select the plan that best suits your needs.</Balancer>
        </p>

        <div className="not-prose mt-10 grid grid-cols-1 gap-6 min-[850px]:grid-cols-3">
          {pricingData.map((plan, index) => (
            <PricingCard plan={plan} key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
const PricingCard = ({ plan }: { plan: PricingCardProps }) => {
  return (
    <div
      className={`relative flex flex-col rounded-lg border p-6 transition-all duration-200 ${
        plan.isPopular
          ? "z-10 scale-105 border-primary dark:border-gray-300 shadow-lg"
          : ""
      }`}
    >
      <div className="text-center">
        <Badge variant={plan.isPopular ? "default" : "outline"}>
          {plan.title}
          {plan.isPopular && (
            <span className="ml-2 text-xs font-normal">★ Popular</span>
          )}
        </Badge>
        <h4 className="mb-2 mt-4 text-2xl font-bold text-primary">
          {plan.price}
        </h4>
        <p className="text-sm opacity-70">{plan.description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank">
          <Button
            size={"sm"}
            className="w-full"
            variant={plan.isPopular ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
