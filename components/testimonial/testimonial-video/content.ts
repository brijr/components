import { TestimonialVideoProps } from "./index";

export const defaultContent: TestimonialVideoProps = {
  headline: "See what our customers have to say",
  subheadline: "Real stories from businesses that transformed with our platform",
  testimonials: [
    {
      thumbnail: {
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
        alt: "Sarah Chen testimonial",
      },
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "This platform revolutionized our workflow. We've seen a 40% increase in productivity across all departments.",
      author: "Sarah Chen",
      role: "Chief Executive Officer",
      company: "TechVentures Inc",
      duration: "2:45",
    },
    {
      thumbnail: {
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
        alt: "Michael Rodriguez testimonial",
      },
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "The ROI was immediate. We recovered our investment in just 3 months.",
      author: "Michael Rodriguez",
      role: "VP of Operations",
      company: "ScaleUp Solutions",
      duration: "3:12",
    },
    {
      thumbnail: {
        src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop",
        alt: "Emily Thompson testimonial",
      },
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "Customer support is exceptional. They're true partners in our success.",
      author: "Emily Thompson",
      role: "Director of Customer Success",
      company: "Global Innovations",
      duration: "1:58",
    },
  ],
  layout: "grid",
};

export const contentVariations: TestimonialVideoProps[] = [
  // Featured layout
  {
    headline: "Customer success stories",
    subheadline: "Hear directly from our customers about their experience",
    testimonials: [
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&h=800&fit=crop",
          alt: "Featured testimonial",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "This is hands down the best investment we've made. The platform paid for itself within the first quarter, and our team efficiency has skyrocketed.",
        author: "James Wilson",
        role: "Founder & CEO",
        company: "Innovation Labs",
        duration: "4:23",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
          alt: "Lisa Martinez testimonial",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Lisa Martinez",
        role: "Head of Marketing",
        company: "BrandBoost",
        duration: "2:15",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
          alt: "David Park testimonial",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "David Park",
        role: "CTO",
        company: "TechForward",
        duration: "3:07",
      },
    ],
    layout: "featured",
  },
  // Two testimonials
  {
    headline: "Trusted by industry leaders",
    testimonials: [
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          alt: "Enterprise testimonial",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "Implementing this solution across our 10,000+ employee organization was seamless. The enterprise features are world-class.",
        author: "Robert Chen",
        role: "Global IT Director",
        company: "Fortune 500 Corp",
        duration: "5:45",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=600&fit=crop",
          alt: "Startup testimonial",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "As a startup, we needed something that could scale with us. This platform has been perfect from day one to series B.",
        author: "Amanda Foster",
        role: "Co-founder",
        company: "NextGen Startup",
        duration: "3:30",
      },
    ],
    layout: "grid",
  },
  // Many short testimonials
  {
    headline: "Happy customers worldwide",
    subheadline: "Quick insights from our global community",
    testimonials: [
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&h=600&fit=crop",
          alt: "Short testimonial 1",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Alex Johnson",
        role: "Product Manager",
        company: "DesignCo",
        duration: "0:45",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&h=600&fit=crop",
          alt: "Short testimonial 2",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Sophie Liu",
        role: "Developer",
        company: "CodeCraft",
        duration: "1:12",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&h=600&fit=crop",
          alt: "Short testimonial 3",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Marcus Brown",
        role: "Sales Director",
        company: "SalesForce",
        duration: "0:58",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&h=600&fit=crop",
          alt: "Short testimonial 4",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Emma Wilson",
        role: "HR Manager",
        company: "PeopleFirst",
        duration: "1:05",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=600&fit=crop",
          alt: "Short testimonial 5",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Ryan Taylor",
        role: "Marketing Lead",
        company: "GrowthHub",
        duration: "1:20",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
          alt: "Short testimonial 6",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Daniel Kim",
        role: "Operations Manager",
        company: "EfficiencyPro",
        duration: "0:52",
      },
    ],
    layout: "grid",
  },
  // Case study style
  {
    headline: "In-depth customer case studies",
    testimonials: [
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
          alt: "Healthcare case study",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "See how we transformed patient care and reduced administrative overhead by 60% with this platform.",
        author: "Dr. Patricia Johnson",
        role: "Chief Medical Officer",
        company: "HealthCare Plus",
        duration: "8:30",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
          alt: "Finance case study",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "Learn how we automated compliance reporting and saved millions in operational costs.",
        author: "Richard Chang",
        role: "CFO",
        company: "Global Finance Corp",
        duration: "10:15",
      },
      {
        thumbnail: {
          src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
          alt: "Retail case study",
        },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        quote: "Discover how we unified our omnichannel experience and increased sales by 250%.",
        author: "Maria Santos",
        role: "VP of Digital",
        company: "RetailGiant",
        duration: "7:45",
      },
    ],
    layout: "grid",
  },
];