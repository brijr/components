import { TestimonialWithStatsProps } from "./index";

export const defaultContent: TestimonialWithStatsProps = {
  headline: "Proven results that speak for themselves",
  subheadline: "Join thousands of successful businesses",
  stats: [
    {
      value: "98",
      label: "Customer satisfaction",
      suffix: "%",
    },
    {
      value: "2.5M",
      label: "Active users",
      suffix: "+",
    },
    {
      value: "150",
      label: "Countries served",
      suffix: "+",
    },
    {
      value: "99.9",
      label: "Uptime guarantee",
      suffix: "%",
    },
  ],
  testimonial: {
    quote: "The metrics don't lie. Since implementing this solution, we've seen dramatic improvements across every KPI. Our team is more productive, our customers are happier, and our revenue has grown significantly.",
    author: "Michael Chen",
    role: "Chief Operating Officer",
    company: "DataDriven Corp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
  },
  layout: "centered",
};

export const contentVariations: TestimonialWithStatsProps[] = [
  // Split layout
  {
    headline: "Transform your business with proven results",
    subheadline: "See the impact our platform can have",
    stats: [
      {
        value: "45",
        label: "Faster deployment",
        suffix: "%",
      },
      {
        value: "3x",
        label: "ROI increase",
      },
      {
        value: "60",
        label: "Time saved weekly",
        suffix: "hrs",
      },
    ],
    testimonial: {
      quote: "The efficiency gains have been remarkable. What used to take days now takes hours, and our error rate has dropped to near zero.",
      author: "Sarah Thompson",
      role: "VP of Engineering",
      company: "TechForward",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
    },
    layout: "split",
  },
  // E-commerce focus
  {
    headline: "Driving e-commerce success",
    stats: [
      {
        value: "250",
        label: "Revenue increase",
        suffix: "%",
      },
      {
        value: "68",
        label: "Cart abandonment reduction",
        suffix: "%",
      },
      {
        value: "4.2M",
        label: "Transactions processed",
        suffix: "+",
      },
    ],
    testimonial: {
      quote: "Our online sales have exploded since implementing this platform. The conversion optimization features alone paid for the entire investment in the first month.",
      author: "David Martinez",
      role: "E-commerce Director",
      company: "RetailPlus",
      rating: 5,
    },
    layout: "centered",
  },
  // SaaS metrics
  {
    headline: "SaaS growth metrics",
    subheadline: "Accelerate your subscription business",
    stats: [
      {
        value: "85",
        label: "MRR growth",
        suffix: "%",
      },
      {
        value: "2.3",
        label: "Churn reduction",
        suffix: "%",
      },
      {
        value: "156",
        label: "NPS score increase",
        suffix: "%",
      },
      {
        value: "92",
        label: "Customer retention",
        suffix: "%",
      },
    ],
    testimonial: {
      quote: "The analytics and automation features helped us identify and fix churn issues we didn't even know we had. Our MRR has never been stronger.",
      author: "Lisa Park",
      role: "Founder & CEO",
      company: "SaaSify",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    layout: "split",
  },
  // Enterprise scale
  {
    headline: "Enterprise-grade performance",
    stats: [
      {
        value: "10M",
        label: "Daily transactions",
        suffix: "+",
      },
      {
        value: "0.01",
        label: "Error rate",
        suffix: "%",
      },
      {
        value: "50ms",
        label: "Average response time",
      },
      {
        value: "99.99",
        label: "Uptime",
        suffix: "%",
      },
      {
        value: "24/7",
        label: "Global support",
      },
    ],
    testimonial: {
      quote: "Running at our scale requires absolute reliability. This platform has exceeded every performance benchmark and scaled effortlessly with our growth.",
      author: "Robert Kim",
      role: "CTO",
      company: "Global Systems Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
    },
    layout: "centered",
  },
  // Customer support focus
  {
    headline: "Exceptional support that delivers",
    stats: [
      {
        value: "< 2min",
        label: "Average response time",
      },
      {
        value: "98",
        label: "First contact resolution",
        suffix: "%",
      },
      {
        value: "4.9/5",
        label: "Support rating",
      },
    ],
    testimonial: {
      quote: "I've never experienced support like this. They don't just solve problems; they proactively help us optimize and get more value from the platform.",
      author: "Emma Wilson",
      role: "Customer Success Manager",
      company: "ServiceFirst",
      rating: 5,
    },
    layout: "centered",
  },
];