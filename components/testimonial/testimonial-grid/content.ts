import { TestimonialGridProps } from "./index";

export const defaultContent: TestimonialGridProps = {
  headline: "Loved by teams worldwide",
  subheadline: "See what our customers have to say about their experience",
  testimonials: [
    {
      quote: "This platform has transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 40%.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechFlow Inc",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "The best investment we've made this year. Customer support is exceptional, and the platform just keeps getting better with each update.",
      author: "Michael Rodriguez",
      role: "Product Manager",
      company: "InnovateCo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "We've tried many solutions, but this is the only one that truly understands our needs. It's scalable, reliable, and incredibly user-friendly.",
      author: "Emily Thompson",
      role: "CEO",
      company: "GrowthLabs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "Implementation was seamless, and we saw immediate results. Our team adoption rate was 95% within the first week.",
      author: "David Park",
      role: "CTO",
      company: "DataDrive",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 4,
    },
    {
      quote: "The ROI has been incredible. We've reduced our operational costs by 30% while improving our service quality.",
      author: "Lisa Martinez",
      role: "Operations Director",
      company: "ServicePro",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      quote: "Finally, a solution that grows with us. The flexibility and customization options are exactly what we needed.",
      author: "James Wilson",
      role: "Founder",
      company: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
    },
  ],
  columns: 3,
  showQuoteIcon: true,
};

export const contentVariations: TestimonialGridProps[] = [
  // Two column layout
  {
    headline: "Trusted by industry leaders",
    testimonials: [
      {
        quote: "The analytics dashboard gives us insights we never had before. It's been a game-changer for our decision-making process.",
        author: "Rachel Green",
        role: "Data Analyst",
        company: "Metrics Corp",
        rating: 5,
      },
      {
        quote: "Security and compliance were our top concerns, and this platform exceeded our expectations on both fronts.",
        author: "John Davis",
        role: "Security Officer",
        company: "SecureNet",
        rating: 5,
      },
      {
        quote: "The API documentation is excellent, and integration with our existing tools was straightforward.",
        author: "Anna Kumar",
        role: "Lead Developer",
        company: "DevTools Inc",
        rating: 4,
      },
      {
        quote: "Our customers love the new features we've been able to build using this platform. It's been transformative.",
        author: "Tom Anderson",
        role: "Product Lead",
        company: "CustomerFirst",
        rating: 5,
      },
    ],
    columns: 2,
  },
  // Without ratings
  {
    headline: "What people are saying",
    subheadline: "Real feedback from real users",
    testimonials: [
      {
        quote: "I can't imagine running our business without this tool. It's become absolutely essential to our daily operations.",
        author: "Maria Garcia",
        role: "Business Owner",
        company: "Local Boutique",
      },
      {
        quote: "The learning curve was minimal, and our team was productive from day one. Excellent onboarding experience.",
        author: "Chris Lee",
        role: "Training Manager",
        company: "EduTech",
      },
      {
        quote: "Customer support went above and beyond to help us customize the platform for our specific needs.",
        author: "Patricia Brown",
        role: "IT Director",
        company: "HealthCare Plus",
      },
    ],
    columns: 3,
    showQuoteIcon: true,
  },
  // Enterprise testimonials
  {
    headline: "Enterprise success stories",
    testimonials: [
      {
        quote: "Implementing this solution across our 10,000+ employee organization was surprisingly smooth. The enterprise features are robust and well-thought-out.",
        author: "Robert Kim",
        role: "Global IT Director",
        company: "Fortune 500 Corp",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        rating: 5,
      },
      {
        quote: "The scalability is impressive. We've grown 5x since implementation, and the platform has handled it effortlessly.",
        author: "Sandra White",
        role: "VP of Operations",
        company: "Global Logistics",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        rating: 5,
      },
      {
        quote: "Compliance reporting that used to take weeks now takes hours. The automation features have saved us countless resources.",
        author: "William Chen",
        role: "Compliance Manager",
        company: "FinanceGlobal",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        rating: 5,
      },
    ],
    columns: 3,
  },
  // Short quotes
  {
    headline: "Join thousands of happy customers",
    testimonials: [
      {
        quote: "Simply the best!",
        author: "Alex Johnson",
        role: "Designer",
        rating: 5,
      },
      {
        quote: "Exceeded all expectations.",
        author: "Sam Taylor",
        role: "Developer",
        rating: 5,
      },
      {
        quote: "Worth every penny.",
        author: "Jordan Lee",
        role: "Marketer",
        rating: 5,
      },
      {
        quote: "Game-changing platform.",
        author: "Casey Brown",
        role: "Founder",
        rating: 5,
      },
      {
        quote: "Incredible value.",
        author: "Morgan Davis",
        role: "Manager",
        rating: 5,
      },
      {
        quote: "Highly recommended!",
        author: "Riley Wilson",
        role: "Consultant",
        rating: 5,
      },
    ],
    columns: 3,
  },
];