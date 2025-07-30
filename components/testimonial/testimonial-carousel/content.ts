import { TestimonialCarouselProps } from "./index";

export const defaultContent: TestimonialCarouselProps = {
  headline: "Customer success stories",
  subheadline: "See how businesses transform with our platform",
  testimonials: [
    {
      quote: "This platform has completely revolutionized our workflow. What used to take hours now takes minutes. The efficiency gains have been incredible, and our team loves using it every day.",
      author: "Jennifer Walsh",
      role: "Director of Operations",
      company: "StreamlineOps",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "The ROI was evident within the first month. We've reduced costs by 35% while significantly improving our output quality. It's rare to find a solution that delivers on all its promises.",
      author: "Marcus Thompson",
      role: "CFO",
      company: "FinanceFlow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "Implementation was a breeze, and the support team was with us every step of the way. Our employees adopted it immediately, and we've seen productivity soar across all departments.",
      author: "Priya Patel",
      role: "Head of IT",
      company: "TechGlobal Solutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "As a startup, we needed something that could scale with us. This platform has grown alongside our business, adapting to our changing needs without missing a beat.",
      author: "Alex Chen",
      role: "Founder & CEO",
      company: "InnovateLabs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
    },
  ],
  autoPlayInterval: 5000,
  showDots: true,
  showArrows: true,
};

export const contentVariations: TestimonialCarouselProps[] = [
  // Without auto-play
  {
    headline: "What our users say",
    testimonials: [
      {
        quote: "The best decision we made this year. Simple, powerful, and exactly what we needed.",
        author: "Robert Kim",
        role: "Product Manager",
        company: "DesignStudio",
        rating: 5,
      },
      {
        quote: "Customer support is unmatched. They genuinely care about our success and it shows.",
        author: "Lisa Anderson",
        role: "Customer Success Lead",
        company: "ServicePro",
        rating: 5,
      },
      {
        quote: "The analytics features give us insights we never had before. Game-changing!",
        author: "David Martinez",
        role: "Data Analyst",
        company: "MetricsPlus",
        rating: 5,
      },
    ],
    showDots: true,
    showArrows: true,
  },
  // Minimal with dots only
  {
    headline: "Trusted by thousands",
    subheadline: "Join our growing community of satisfied customers",
    testimonials: [
      {
        quote: "Incredible value for money. We've tried competitors, but nothing comes close to this level of quality and service.",
        author: "Emma Wilson",
        role: "Marketing Director",
        company: "BrandBoost",
      },
      {
        quote: "The integration capabilities are fantastic. It works seamlessly with all our existing tools.",
        author: "James Brown",
        role: "Technical Lead",
        company: "IntegrateNow",
      },
    ],
    autoPlayInterval: 4000,
    showDots: true,
    showArrows: false,
  },
  // Enterprise testimonials
  {
    headline: "Enterprise success at scale",
    testimonials: [
      {
        quote: "Rolling out to 50,000+ employees globally was seamless. The enterprise features and support are world-class. We couldn't have asked for a better partner in our digital transformation.",
        author: "Catherine Moore",
        role: "Global CTO",
        company: "Fortune 500 Corp",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        rating: 5,
      },
      {
        quote: "Security and compliance were non-negotiable for us. This platform exceeded every requirement and gave us peace of mind. The audit trails and access controls are exactly what we needed.",
        author: "Richard Chang",
        role: "CISO",
        company: "SecureFinance Inc",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        rating: 5,
      },
      {
        quote: "The scalability is impressive. We've grown 10x since implementation, and performance has remained consistently excellent. It's rare to find a solution that truly scales with you.",
        author: "Natasha Volkov",
        role: "VP of Engineering",
        company: "GlobalTech",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        rating: 5,
      },
    ],
    autoPlayInterval: 6000,
    showDots: true,
    showArrows: true,
  },
  // Short impactful quotes
  {
    headline: "Making a difference",
    testimonials: [
      {
        quote: "Life-changing platform!",
        author: "Sophie Turner",
        role: "Entrepreneur",
        rating: 5,
      },
      {
        quote: "Simply the best in the market.",
        author: "Mohammed Ali",
        role: "Industry Expert",
        rating: 5,
      },
      {
        quote: "Exceeded every expectation.",
        author: "Chen Wei",
        role: "Business Owner",
        rating: 5,
      },
      {
        quote: "10/10 would recommend!",
        author: "Maria Garcia",
        role: "Consultant",
        rating: 5,
      },
    ],
    autoPlayInterval: 3000,
    showDots: true,
    showArrows: false,
  },
];