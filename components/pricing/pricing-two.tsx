"use client"

import Balancer from "react-wrap-balancer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section,Container } from "../ds"

interface PricingCardProps {
  title: "Basic" | "Standard" | "Pro"
  monthlyPrice: string
  yearlyPrice: string
  description?: string
  features: string[]
  cta: string
  href: string
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Basic",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    description: "Perfect for small businesses and individuals.",
    features: ["3 Pages", "Basic SEO", "Email Support", "Responsive Design"],
    cta: "Choose Basic",
    href: "https://stripe.com/",
  },
  {
    title: "Standard",
    monthlyPrice: "$59",
    yearlyPrice: "$590",
    description: "Best for growing businesses with more needs.",
    features: ["10 Pages", "Advanced SEO", "CMS Integration", "24/7 Chat Support"],
    cta: "Choose Standard",
    href: "https://stripe.com/",
  },
  {
    title: "Pro",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    description: "Ideal for larger businesses that need scalability.",
    features: ["Unlimited Pages", "E-commerce Integration", "Priority Support", "Custom API Integration"],
    cta: "Choose Pro",
    href: "https://stripe.com/",
  },
]

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <Section>
      <Container className="flex flex-col items-center  gap-4 text-center">
        <h2 className="!my-0">Pricing</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Select the plan that best suits your needs.</Balancer>
        </p>

        <div className="w-full not-prose mt-4 flex justify-center">
          <Tabs
            defaultValue="monthly"
            onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                  Save 17%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="not-prose mt-8 grid grid-cols-1 gap-6 min-[850px]:grid-cols-3">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} plan={plan} billingPeriod={billingPeriod} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

const PricingCard = ({
  plan,
  billingPeriod,
}: {
  plan: PricingCardProps
  billingPeriod: "monthly" | "yearly"
}) => {
  const price = billingPeriod === "monthly" ? `${plan.monthlyPrice}/month` : `${plan.yearlyPrice}/year`

  return (
    <div className="flex flex-col rounded-lg border p-6">
      <div className="text-center">
        <Badge>{plan.title}</Badge>
        <h4 className="mb-2 mt-4 text-2xl text-primary">{price}</h4>
        <p className="text-sm opacity-70">{plan.description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="mr-2 h-4 w-4" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank">
          <Button size={"sm"} className="w-full">
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Pricing

