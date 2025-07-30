"use client";

import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

/**
 * Location details 
 */
export interface ContactLocation {
  /** Location name/title */
  name: string;
  /** Full address */
  address: string;
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Business hours */
  hours?: string;
  /** Map embed URL or coordinates */
  mapUrl?: string;
  /** Whether this is the main/default location */
  isMain?: boolean;
}

/**
 * Props for the ContactWithMap component
 */
export interface ContactWithMapProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Form configuration */
  form: {
    /** Form fields */
    fields: Array<{
      name: string;
      label: string;
      type: "text" | "email" | "tel" | "textarea";
      placeholder?: string;
      required?: boolean;
      rows?: number;
    }>;
    /** Submit button text */
    submitText?: string;
    /** Success message */
    successMessage?: string;
  };
  /** Location(s) to display */
  locations: ContactLocation[];
  /** Map embed URL (if different from location mapUrl) */
  mapEmbedUrl?: string;
  /** Show map */
  showMap?: boolean;
}

/**
 * Contact form with integrated map and location details.
 * Perfect for businesses with physical locations.
 *
 * @example
 * ```tsx
 * <ContactWithMap
 *   headline="Visit our office"
 *   subheadline="Come say hello at our HQ"
 *   form={{
 *     fields: [
 *       {
 *         name: "name",
 *         label: "Name",
 *         type: "text",
 *         required: true
 *       },
 *       {
 *         name: "email",
 *         label: "Email",
 *         type: "email",
 *         required: true
 *       },
 *       {
 *         name: "message",
 *         label: "Message",
 *         type: "textarea",
 *         rows: 4,
 *         required: true
 *       }
 *     ],
 *     submitText: "Send message"
 *   }}
 *   locations={[
 *     {
 *       name: "Headquarters",
 *       address: "123 Main St, San Francisco, CA 94105",
 *       phone: "+1 (555) 123-4567",
 *       email: "hello@example.com",
 *       hours: "Mon-Fri 9AM-6PM PST",
 *       isMain: true
 *     }
 *   ]}
 *   mapEmbedUrl="https://maps.google.com/..."
 *   showMap
 * />
 * ```
 */
export const ContactWithMap = ({
  headline,
  subheadline,
  form,
  locations,
  mapEmbedUrl,
  showMap = true,
}: ContactWithMapProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const mainLocation = locations.find(loc => loc.isMain) || locations[0];
  const mapUrl = mapEmbedUrl || mainLocation?.mapUrl;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(form.successMessage || "We'll get back to you soon.");

      event.currentTarget.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md" align="center" className="text-center">
            <Heading level={2}>{headline}</Heading>
            {subheadline && (
              <Text variant="lead" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <Stack spacing="lg">
                      {form.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                          </Label>
                          
                          {field.type === "textarea" ? (
                            <Textarea
                              id={field.name}
                              name={field.name}
                              placeholder={field.placeholder}
                              required={field.required}
                              rows={field.rows || 4}
                              disabled={isSubmitting}
                            />
                          ) : (
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              required={field.required}
                              disabled={isSubmitting}
                            />
                          )}
                        </div>
                      ))}

                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full"
                      >
                        {isSubmitting ? "Sending..." : (form.submitText || "Send message")}
                      </Button>
                    </Stack>
                  </form>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Stack spacing="lg" className="mt-6">
                {locations.map((location, index) => (
                  <div key={index}>
                    {locations.length > 1 && (
                      <Text className="font-semibold mb-3">{location.name}</Text>
                    )}
                    
                    <Stack spacing="md">
                      {location.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <Text as="p" color="muted">
                            {location.address}
                          </Text>
                        </div>
                      )}

                      {location.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <a
                            href={`tel:${location.phone}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {location.phone}
                          </a>
                        </div>
                      )}

                      {location.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <a
                            href={`mailto:${location.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {location.email}
                          </a>
                        </div>
                      )}

                      {location.hours && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <Text as="p" color="muted">
                            {location.hours}
                          </Text>
                        </div>
                      )}
                    </Stack>
                  </div>
                ))}
              </Stack>
            </div>

            {/* Map */}
            {showMap && mapUrl && (
              <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full rounded-lg"
                  title="Location map"
                />
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for ContactWithMap component
 */
export const contactWithMapSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    form: {
      type: "object",
      properties: {
        fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              label: { type: "string" },
              type: {
                type: "string",
                enum: ["text", "email", "tel", "textarea"],
              },
              placeholder: { type: "string" },
              required: { type: "boolean" },
              rows: { type: "number" },
            },
            required: ["name", "label", "type"],
          },
          minItems: 1,
        },
        submitText: { type: "string" },
        successMessage: { type: "string" },
      },
      required: ["fields"],
    },
    locations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          hours: { type: "string" },
          mapUrl: { type: "string" },
          isMain: { type: "boolean" },
        },
        required: ["name", "address"],
      },
      minItems: 1,
    },
    mapEmbedUrl: {
      type: "string",
      description: "Map embed URL",
    },
    showMap: {
      type: "boolean",
      description: "Show map",
      default: true,
    },
  },
  required: ["headline", "form", "locations"],
};