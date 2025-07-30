import { TestimonialSingleProps } from "./index";

export const defaultContent: TestimonialSingleProps = {
  headline: "Customer spotlight",
  quote: "This platform has been a game-changer for our organization. We've seen a 300% increase in productivity and our team collaboration has never been better. The ROI was evident within the first quarter.",
  author: "Alexandra Mitchell",
  role: "Chief Technology Officer",
  company: "Innovation Labs",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  companyLogo: {
    src: "https://via.placeholder.com/120x40",
    alt: "Innovation Labs",
    width: 120,
    height: 40,
  },
  rating: 5,
  variant: "centered",
  background: "muted",
};

export const contentVariations: TestimonialSingleProps[] = [
  // Split layout
  {
    headline: "Transforming businesses worldwide",
    quote: "We evaluated dozens of solutions, and this was the only one that met all our requirements. The implementation was smooth, the support is exceptional, and the results speak for themselves.",
    author: "Marcus Chen",
    role: "VP of Operations",
    company: "Global Enterprises",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    variant: "split",
  },
  // Primary background
  {
    quote: "In 20 years of running this business, I've never seen such immediate and lasting impact from a single tool. It's revolutionized how we operate.",
    author: "Sarah Williams",
    role: "Founder & CEO",
    company: "Williams & Co",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    variant: "centered",
    background: "primary",
  },
  // Without company logo
  {
    headline: "Real results from real customers",
    quote: "The customer support alone is worth the investment. They don't just solve problems; they proactively help us optimize our usage to get the most value.",
    author: "David Thompson",
    role: "Director of Customer Success",
    company: "ServiceFirst",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5,
    variant: "centered",
  },
  // Enterprise testimonial
  {
    headline: "Enterprise success at scale",
    quote: "Implementing this across our 50,000+ employee organization seemed daunting, but their enterprise team made it seamless. We achieved 95% adoption in just 3 months.",
    author: "Jennifer Rodriguez",
    role: "Global IT Director",
    company: "Fortune 500 Corp",
    companyLogo: {
      src: "https://via.placeholder.com/150x50",
      alt: "Fortune 500 Corp",
      width: 150,
      height: 50,
    },
    variant: "split",
    background: "muted",
  },
  // Short impactful quote
  {
    quote: "Simply put: this is the future of our industry.",
    author: "Robert Kim",
    role: "Industry Analyst",
    company: "Tech Research Group",
    rating: 5,
    variant: "centered",
  },
  // Startup testimonial
  {
    headline: "Growing with startups",
    quote: "As a bootstrap startup, every dollar counts. This platform gave us enterprise-level capabilities at a price we could afford, and it's scaled perfectly as we've grown.",
    author: "Lisa Park",
    role: "Co-founder",
    company: "NextGen Startup",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    variant: "split",
  },
  // Without rating
  {
    headline: "Trusted by leaders",
    quote: "The integration capabilities are unmatched. It connected seamlessly with our existing tech stack and actually made our other tools more powerful.",
    author: "Thomas Anderson",
    role: "Chief Digital Officer",
    company: "Digital Transform Inc",
    companyLogo: {
      src: "https://via.placeholder.com/100x40",
      alt: "Digital Transform Inc",
      width: 100,
      height: 40,
    },
    variant: "centered",
    background: "muted",
  },
];