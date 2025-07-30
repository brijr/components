import { ContactWithMapProps } from "./index";

export const defaultContent: ContactWithMapProps = {
  headline: "Visit our office",
  subheadline: "Come say hello at our headquarters or drop us a message",
  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Your name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "your@email.com",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "+1 (555) 123-4567",
        required: false,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us how we can help...",
        rows: 4,
        required: true,
      },
    ],
    submitText: "Send message",
    successMessage: "Thank you for your message. We'll get back to you within 24 hours.",
  },
  locations: [
    {
      name: "Headquarters",
      address: "123 Market Street, Suite 400, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "hello@example.com",
      hours: "Monday - Friday, 9:00 AM - 6:00 PM PST",
      isMain: true,
    },
  ],
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977765866394!2d-122.39798768468188!3d37.78744797975775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c3f4d4d17%3A0x6f4c4f4c4f4c4f4c!2s123%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1234567890123",
  showMap: true,
};

export const contentVariations: ContactWithMapProps[] = [
  // Multiple offices
  {
    headline: "Our offices worldwide",
    subheadline: "Find the office nearest to you",
    form: {
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "office",
          label: "Preferred office",
          type: "text",
          placeholder: "e.g., San Francisco",
          required: false,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          rows: 5,
          required: true,
        },
      ],
      submitText: "Get in touch",
    },
    locations: [
      {
        name: "San Francisco (HQ)",
        address: "123 Market Street, Suite 400, San Francisco, CA 94105",
        phone: "+1 (415) 555-0123",
        email: "sf@example.com",
        hours: "Mon-Fri 9AM-6PM PST",
        isMain: true,
      },
      {
        name: "New York",
        address: "456 Broadway, Floor 12, New York, NY 10013",
        phone: "+1 (212) 555-0456",
        email: "ny@example.com",
        hours: "Mon-Fri 9AM-6PM EST",
      },
      {
        name: "London",
        address: "789 King's Road, London SW3 5XP, UK",
        phone: "+44 20 7555 0789",
        email: "london@example.com",
        hours: "Mon-Fri 9AM-6PM GMT",
      },
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977765866394!2d-122.39798768468188!3d37.78744797975775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c3f4d4d17%3A0x6f4c4f4c4f4c4f4c!2s123%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1234567890123",
    showMap: true,
  },
  // Retail store
  {
    headline: "Visit our store",
    subheadline: "Experience our products in person",
    form: {
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "inquiry_type",
          label: "Inquiry about",
          type: "text",
          placeholder: "Product availability, appointments, etc.",
          required: true,
        },
        {
          name: "message",
          label: "Details",
          type: "textarea",
          rows: 3,
          required: false,
        },
      ],
      submitText: "Send inquiry",
      successMessage: "We'll respond to your inquiry within a few hours.",
    },
    locations: [
      {
        name: "Flagship Store",
        address: "1234 Shopping Avenue, Los Angeles, CA 90210",
        phone: "+1 (310) 555-1234",
        email: "store@example.com",
        hours: "Mon-Sat 10AM-9PM, Sun 11AM-7PM",
        isMain: true,
      },
    ],
    showMap: true,
  },
  // Service center
  {
    headline: "Service & support center",
    subheadline: "Get help with repairs and technical support",
    form: {
      fields: [
        {
          name: "name",
          label: "Full name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "phone",
          label: "Phone",
          type: "tel",
          required: true,
        },
        {
          name: "product_model",
          label: "Product model",
          type: "text",
          placeholder: "e.g., Model XYZ-123",
          required: true,
        },
        {
          name: "issue",
          label: "Describe the issue",
          type: "textarea",
          rows: 4,
          required: true,
        },
      ],
      submitText: "Submit service request",
      successMessage: "Service request submitted. We'll contact you to schedule an appointment.",
    },
    locations: [
      {
        name: "Authorized Service Center",
        address: "789 Tech Park Drive, Austin, TX 78701",
        phone: "+1 (512) 555-7890",
        email: "service@example.com",
        hours: "Mon-Fri 8AM-7PM, Sat 9AM-5PM CST",
        isMain: true,
      },
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.7858087192917!2d-97.74298668487713!3d30.271647981797415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a25a0c5b0b%3A0x79a5c3f3f3f3f3f3!2s789%20Tech%20Park%20Dr%2C%20Austin%2C%20TX%2078701!5e0!3m2!1sen!2sus!4v1234567890123",
    showMap: true,
  },
  // No map variant
  {
    headline: "Drop us a line",
    subheadline: "We're here to help and answer any questions",
    form: {
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "subject",
          label: "Subject",
          type: "text",
          required: true,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          rows: 6,
          required: true,
        },
      ],
    },
    locations: [
      {
        name: "Main Office",
        address: "100 First Street, Suite 200, Boston, MA 02110",
        phone: "+1 (617) 555-0100",
        email: "info@example.com",
        hours: "Business hours: 9AM-5PM EST (Mon-Fri)",
      },
    ],
    showMap: false,
  },
];