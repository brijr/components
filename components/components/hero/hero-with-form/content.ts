export const defaultContent = {
  headline: "Get Started with a Free Account",
  subheadline: "NO CREDIT CARD REQUIRED",
  description:
    "Join over 50,000 companies using our platform to grow their business. Start your free trial today.",
  form: {
    fields: [
      {
        name: "fullName",
        type: "text",
        label: "Full Name",
        placeholder: "John Smith",
        validation: { required: true },
      },
      {
        name: "email",
        type: "email",
        label: "Work Email",
        placeholder: "john@company.com",
        validation: {
          required: true,
          validationType: "email",
        },
      },
      {
        name: "company",
        type: "text",
        label: "Company Name",
        placeholder: "Acme Inc.",
        validation: { required: true },
      },
      {
        name: "employees",
        type: "select",
        label: "Company Size",
        options: [
          { label: "1-10 employees", value: "1-10" },
          { label: "11-50 employees", value: "11-50" },
          { label: "51-200 employees", value: "51-200" },
          { label: "201-500 employees", value: "201-500" },
          { label: "500+ employees", value: "500+" },
        ],
        validation: { required: true },
      },
    ],
    submitText: "Start Free Trial",
    webhookUrl: "https://formspree.io/f/YOUR_FORM_ID",
  },
  testimonial: {
    quote:
      "This platform transformed how we manage our operations. We've seen a 40% increase in productivity within the first quarter.",
    author: "Sarah Johnson",
    role: "VP of Operations",
    company: "TechCorp",
  },
  trustedBy: {
    text: "Trusted by industry leaders",
    logos: [
      {
        name: "Company 1",
        src: "/logo-placeholder.svg",
      },
      {
        name: "Company 2",
        src: "/logo-placeholder.svg",
      },
      {
        name: "Company 3",
        src: "/logo-placeholder.svg",
      },
      {
        name: "Company 4",
        src: "/logo-placeholder.svg",
      },
    ],
  },
};