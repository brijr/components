"use client";

import Balancer from "react-wrap-balancer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { Container, Section } from "../craft";

interface PricingCardProps {
  title: "Basic" | "Standard" | "Pro";
  basePrice: number;
  pricePerUser: number;
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
    basePrice: 29,
    pricePerUser: 5,
    description: "Perfect for small businesses and individuals.",
    features: ["3 Pages", "Basic SEO", "Email Support", "Responsive Design"],
    cta: "Choose Basic",
    href: "https://stripe.com/",
  },
  {
    title: "Standard",
    basePrice: 59,
    pricePerUser: 8,
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
    basePrice: 99,
    pricePerUser: 12,
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
  const [userCount, setUserCount] = useState(1);

  return (
    <Section>
      <Container className="flex flex-col items-center  gap-4 text-center">
        <h2 className="!my-0">Pricing</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Customize your plan to fit your exact needs. Only pay for what you use.</Balancer>
        </p>

        <div className="mt-8 w-full max-w-md">
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium">Number of Users</span>
            <span className="text-sm font-bold">
              {userCount} {userCount === 1 ? "user" : "users"}
            </span>
          </div>
          <Slider
            defaultValue={[1]}
            max={20}
            step={1}
            min={1}
            onValueChange={(value) => setUserCount(value[0])}
            className="mb-6"
          />
        </div>

        <div className="not-prose mt-4 grid grid-cols-1 gap-6 min-[850px]:grid-cols-3">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} plan={plan} userCount={userCount} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

const PricingCard = ({
  plan,
  userCount,
}: {
  plan: PricingCardProps;
  userCount: number;
}) => {
  const totalPrice = plan.basePrice + plan.pricePerUser * (userCount - 1);

  return (
    <div
      className={`relative flex flex-col rounded-lg border p-6 transition-all duration-200 ${
        plan.isPopular
          ? "z-10 scale-105 border-primary shadow-lg dark:border-gray-300"
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
          ${totalPrice}/month
        </h4>
        <p className="text-sm opacity-70">{plan.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          ${plan.basePrice} base + ${plan.pricePerUser}/additional user
        </p>
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
