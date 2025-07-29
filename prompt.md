# Component Creation Guide

## Project Context
I'm building a component library with Next.js 15, TypeScript, and Tailwind CSS. The library showcases various marketing UI components.

## Design System Overview
Use the design system from `@/components/ds` instead of raw Tailwind classes:

### Typography
```tsx
import { Heading, Text } from "@/components/ds";

<Heading level={1}>Main Title</Heading>        // H1
<Text variant="lead">Intro paragraph</Text>    // Large body text
<Text color="muted">Secondary info</Text>      // Muted text
```

### Layout & Spacing
```tsx
import { Section, Container, Stack, Inline } from "@/components/ds";

<Section>                                      // Has built-in padding (py-2 sm:py-4)
  <Container>                                  // Has built-in padding and max-width
    <Stack spacing="lg">                       // Vertical spacing between children
      <Heading>Title</Heading>
      <Text>Description</Text>
      <Inline spacing="sm">                    // Horizontal spacing (auto-wraps)
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </Inline>
    </Stack>
  </Container>
</Section>
```

**Note:** Section and Container have built-in padding. Only add extra classes for special cases.

### Spacing Scale
- `xs`: gap-1
- `sm`: gap-2  
- `md`: gap-4 (default)
- `lg`: gap-6
- `xl`: gap-8
- `2xl`: gap-12
- `3xl`: gap-16

## Component Requirements

### File Structure
```
/components/[component-type]/[component-name]/
  ├── index.tsx      # Main component file
  └── content.ts     # Example content and variations
```

Component types: `hero`, `feature`, `cta`, `pricing`, `testimonial`, `faq`, etc.

### Component File (index.tsx)
1. **Named Export**: `export const ComponentName`
2. **TypeScript Interface**: Define all props with JSDoc comments
3. **Design System**: Use components from `@/components/ds`
4. **UI Components**: Use shadcn/ui from `@/components/ui/*`
5. **Props-based Content**: No hardcoded text - everything via props
6. **JSON Schema**: Include schema definition for the component
7. **Responsive**: Mobile-first, works on all screen sizes
8. **Accessible**: Proper heading hierarchy, alt text, ARIA labels

### Content File (content.ts)
```typescript
export const defaultContent = {
  // All text, images, and configuration
};

export const contentVariations = [
  // Alternative content examples
];
```

### Image Requirements
- Use Next.js Image component from `next/image`
- Default to `/placeholder.webp` for examples
- Include width/height in props
- Always include alt text

## Registry Integration

After creating each component:

1. Import in `registry.ts`:
```typescript
import { ComponentName } from "./components/[type]/[component-name]";
import { defaultContent } from "./components/[type]/[component-name]/content";
```

2. Add registry entry:
```typescript
{
  name: "Component Name",        // Human-readable
  type: "hero",                 // Component category
  slug: "component-name",       // URL-friendly
  Component: ComponentName,     // Component reference
  description: "Brief description of what this component does",
  props: defaultContent         // Default props from content.ts
}
```

## Example Component Structure

```tsx
// components/hero/hero-minimal/index.tsx
import * as React from "react";
import { Section, Container, Stack, Heading, Text, Inline } from "@/components/ds";
import { Button } from "@/components/ui/button";

export interface HeroMinimalProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export const HeroMinimal: React.FC<HeroMinimalProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}) => {
  return (
    <Section>
      <Container>
        <Stack spacing="lg" align="center">
          <Stack spacing="md" align="center">
            <Heading level={1} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>
          
          {(primaryCTA || secondaryCTA) && (
            <Inline spacing="md">
              {primaryCTA && (
                <Button size="lg" asChild>
                  <a href={primaryCTA.href}>{primaryCTA.text}</a>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                </Button>
              )}
            </Inline>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

// JSON Schema
export const heroMinimalSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Supporting subheadline text",
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
    },
    secondaryCTA: {
      type: "object", 
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
    },
  },
  required: ["headline"],
};
```

## Quality Checklist
- [ ] Uses design system components (Stack, Inline, Heading, Text, etc.)
- [ ] All content is passed via props
- [ ] TypeScript interfaces are complete with JSDoc
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Accessible (proper semantics, alt text)
- [ ] Includes JSON schema
- [ ] Has defaultContent in content.ts
- [ ] Added to registry.ts

## Common Patterns

### Text with CTA
```tsx
<Stack spacing="md" align="center">
  <Heading level={2}>Section Title</Heading>
  <Text variant="lead" color="muted">Description</Text>
  <Button>Action</Button>
</Stack>
```

### Side-by-side Layout
```tsx
<div className="grid md:grid-cols-2 gap-8 items-center">
  <Stack spacing="md">
    <Heading level={2}>Feature</Heading>
    <Text>Description</Text>
  </Stack>
  <div>
    {/* Image or other content */}
  </div>
</div>
```

### Card Grid
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <Heading level={3}>{item.title}</Heading>
      </CardHeader>
      <CardContent>
        <Text>{item.description}</Text>
      </CardContent>
    </Card>
  ))}
</div>
```

## Component Types to Build
- **Hero Sections**: Landing page heroes with various layouts
- **Feature Sections**: Showcase product features
- **CTA Sections**: Call-to-action blocks
- **Pricing Tables**: Pricing plans and comparisons
- **Testimonials**: Customer reviews and social proof
- **FAQ Sections**: Frequently asked questions
- **Contact Forms**: Contact and lead capture
- **Stats/Metrics**: Numbers and achievements
- **Logo Clouds**: Partner/client logos
- **Team Sections**: Team member showcases
- **Footer Sections**: Site footers with links
- **Newsletter**: Email signup forms
- **Blog Sections**: Blog post previews
- **Gallery**: Image/video galleries