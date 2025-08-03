# Component Creation Guide

## Project Context

I'm building a component library with Next.js 15, TypeScript, and Tailwind CSS. The library showcases various marketing UI components.

## Design System Overview

Use the design system from `@/components/ds` instead of raw Tailwind classes:

### Typography

```tsx
import { Heading, Text } from "@/components/ds";

<Heading size={1}>Main Title</Heading>         // H1
<Heading size={2} subdued>Section Title</Heading> // H2 with muted color
<Heading size={3} centered>Centered Title</Heading> // H3 centered

<Text variant="lead">Intro paragraph</Text>    // Large body text
<Text subdued>Secondary info</Text>            // Muted text
<Text variant="small" centered>Fine print</Text> // Small centered text
```

### Layout & Spacing

```tsx
import { Section, Container, Stack, Inline } from "@/components/ds";

<Section>
  {" "}
  // Has built-in padding (py-2 sm:py-4)
  <Container>
    {" "}
    // Has built-in padding and max-width
    <Stack spacing="lg">
      {" "}
      // Vertical spacing between children
      <Heading size={2}>Title</Heading>
      <Text>Description</Text>
      <Inline spacing="sm">
        {" "}
        // Horizontal spacing (auto-wraps)
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </Inline>
    </Stack>
  </Container>
</Section>;
```

### When to Use Design System vs Tailwind

**Use Design System Components:**

- Typography (Heading, Text, Prose)
- Layout structure (Section, Container, Main)
- Spacing between elements (Stack, Inline)
- Common patterns with built-in accessibility

**Use Tailwind Classes:**

- Visual styling (backgrounds, borders, shadows)
- Grid layouts (`grid grid-cols-3 gap-6`)
- Flexbox adjustments (`items-center justify-between`)
- Responsive modifiers (`md:flex lg:grid-cols-4`)
- Custom spacing for specific design needs

**IMPORTANT:**

- Section has built-in padding (`py-2 sm:py-4`). DO NOT add padding classes like `py-16` or `py-24`.
- Container has built-in padding (`p-4 sm:p-6`) and max-width (`max-w-5xl`). DO NOT add extra padding.
- Only add classes for styling needs like backgrounds, borders, or special effects.

### Spacing Scale

- `sm`: gap-2 (8px)
- `md`: gap-4 (16px) - default
- `lg`: gap-6 (24px)
- `xl`: gap-8 (32px)
- Custom: Any Tailwind gap class (e.g., `spacing="gap-12"`)

**New:** Use `compact` prop for tight spacing:

```tsx
<Stack compact>
  {" "}
  // Same as spacing="sm"
  <Badge>New</Badge>
  <Text>Compact layout</Text>
</Stack>
```

## Pattern Components

Use these pre-built patterns for common UI needs:

### PageHeader

Complete page header with title, subtitle, badge, and actions:

```tsx
import { PageHeader, ButtonGroup } from "@/components/ds/patterns";
import { Button } from "@/components/ui/button";

<PageHeader
  badge="New"
  title="Build Better Products"
  subtitle="The modern way to ship software"
  centered
>
  <ButtonGroup>
    <Button size="lg">Get Started</Button>
    <Button size="lg" variant="outline">
      Learn More
    </Button>
  </ButtonGroup>
</PageHeader>;
```

### ContentBlock

Feature sections with optional image:

```tsx
import { ContentBlock } from "@/components/ds/patterns";

<ContentBlock
  title="Advanced Analytics"
  description="Get insights into your performance"
  image="/analytics.jpg"
  imagePosition="right"
  buttonText="View Demo"
  buttonHref="/demo"
/>;
```

### ButtonGroup

Pre-configured button layouts:

```tsx
import { ButtonGroup } from "@/components/ds/patterns";
import { Button } from "@/components/ui/button";

<ButtonGroup spacing="md">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>;
```

### When to Use Patterns vs Primitives

**Use Pattern Components when:**

- Building common UI sections (heroes, features, CTAs)
- You want consistent, tested layouts
- Speed is more important than customization

**Use Primitive Components when:**

- Building custom layouts
- Need fine-grained control
- Creating new patterns

## TypeScript Best Practices

### Component Typing

**DO NOT use React.FC or React.FunctionComponent**. Instead, use direct function declarations with typed props:

```tsx
// ❌ DO NOT USE
export const Component: React.FC<Props> = ({ prop }) => { ... }

// ✅ DO USE
export const Component = ({ prop }: Props) => { ... }

// ✅ ALSO GOOD - with explicit return type if needed
export function Component({ prop }: Props): JSX.Element { ... }
```

### Why avoid React.FC?

- Adds unnecessary verbosity
- Implicitly adds `children` prop which may not be needed
- Modern TypeScript infers return types correctly
- Industry best practice has moved away from React.FC

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
- Default to `/placeholder.svg` for examples
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

// Option 1: Using pattern components (recommended for common patterns)
import { PageHeader, ButtonGroup } from "@/components/ds/patterns";
import { Button } from "@/components/ui/button";

// Option 2: Using primitive components (for custom layouts)
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
  Inline,
} from "@/components/ds";
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

export const HeroMinimal = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroMinimalProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="lg" align="center">
          <Stack spacing="md" align="center">
            <Heading size={1} centered>
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" centered subdued>
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

## Component Best Practices

### React Server Components (RSC)

- All components should be RSC by default
- Only add `"use client"` when absolutely necessary (forms, interactivity)
- Keep client components small and focused
- Pass server data to client components via props

### Performance

- Use dynamic imports for heavy client components
- Implement loading states with Suspense boundaries
- Optimize images with Next.js Image component
- Lazy load below-the-fold content when appropriate

### Images

- Vary aspect ratios based on content type (16:9 for dashboards, 4:3 for products, etc.)
- Always include width and height for Next.js Image optimization
- Use priority={true} for above-the-fold images

### Layout

- Let Container handle max-widths - don't add your own
- Use Prose with isArticle for long-form content max-width
- Trust the design system components to handle responsive behavior

### CTAs and Links

- ALWAYS use Button with asChild pattern for link buttons:
  ```tsx
  <Button asChild>
    <a href="/path">Text</a>
  </Button>
  ```
- This ensures proper styling and accessibility with shadcn/ui

### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Management**: Visible focus indicators on all interactive elements
- **ARIA Labels**: Use aria-label for icon-only buttons
- **Semantic HTML**: Use proper HTML5 elements (nav, main, article, etc.)
- **Skip Links**: Include skip-to-content links for keyboard users
- **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for normal text)
- **Screen Reader Announcements**: Use aria-live for dynamic content
- **Form Labels**: All form inputs must have associated labels

### Spacing

- Use Stack/Inline for ALL spacing needs
- Never add margins between elements
- Section and Container have built-in padding - don't add more

## Do NOT Use (Antipatterns)

1. **React.FC** - Never use `React.FC<Props>` or `React.FunctionComponent<Props>`
2. **Raw padding on Section/Container** - These have built-in spacing
3. **Inline styles** - Use Tailwind classes or design system props
4. **Hardcoded text** - All content must come from props
5. **Direct margins between components** - Use Stack/Inline for spacing
6. **className on design system components** - Use their props instead
7. **Nested Containers** - One Container per Section is enough
8. **Multiple H1s** - Only one H1 per page/component

## Quality Checklist

- [ ] Uses design system components (Stack, Inline, Heading, Text, etc.)
- [ ] All content is passed via props
- [ ] TypeScript interfaces are complete with JSDoc
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Accessible (proper semantics, alt text)
- [ ] Includes JSON schema
- [ ] Has defaultContent in content.ts
- [ ] Added to registry.ts
- [ ] Section components used WITHOUT extra padding classes
- [ ] Container components used WITHOUT extra padding classes

## Common Patterns

### Text with CTA

```tsx
<Stack spacing="md" align="center">
  <Heading size={2}>Section Title</Heading>
  <Text variant="lead" subdued>
    Description
  </Text>
  <Button>Action</Button>
</Stack>
```

### Side-by-side Layout

```tsx
<div className="grid items-center gap-8 md:grid-cols-2">
  <Stack spacing="md">
    <Heading size={2}>Feature</Heading>
    <Text>Description</Text>
  </Stack>
  <div>{/* Image or other content */}</div>
</div>
```

**Or use ContentBlock pattern:**

```tsx
<ContentBlock
  title="Feature"
  description="Description"
  image="/feature.jpg"
  imagePosition="right"
/>
```

### Card Grid

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <Heading size={3}>{item.title}</Heading>
      </CardHeader>
      <CardContent>
        <Text>{item.description}</Text>
      </CardContent>
    </Card>
  ))}
</div>
```

## Error Handling Patterns

### Loading States

```tsx
if (isLoading) {
  return (
    <Section>
      <Container>
        <Stack spacing="md" align="center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </Stack>
      </Container>
    </Section>
  );
}
```

### Error States

```tsx
if (error) {
  return (
    <Section>
      <Container>
        <Stack spacing="md" align="center">
          <Heading size={2}>Something went wrong</Heading>
          <Text subdued>{error.message}</Text>
          <Button onClick={retry}>Try again</Button>
        </Stack>
      </Container>
    </Section>
  );
}
```

### Empty States

```tsx
if (!data || data.length === 0) {
  return (
    <Section>
      <Container>
        <Stack spacing="md" align="center">
          <Heading size={2}>No items found</Heading>
          <Text subdued>Try adjusting your filters or search terms</Text>
        </Stack>
      </Container>
    </Section>
  );
}
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

## Migration Guide

### Updated Design System API

If you're updating existing components to use the new design system:

#### Heading Changes

```tsx
// Old
<Heading level={1}>Title</Heading>
<Heading level={2} align="center" color="muted">Subtitle</Heading>

// New
<Heading size={1}>Title</Heading>
<Heading size={2} centered subdued>Subtitle</Heading>
```

#### Text Changes

```tsx
// Old
<Text variant="h1">Heading Text</Text>
<Text variant="large">Large Text</Text>
<Text variant="caption">Caption</Text>
<Text color="muted">Muted Text</Text>

// New
<Heading size={1}>Heading Text</Heading>  // Use Heading for h1-h6
<Text variant="lead">Large Text</Text>
<Text variant="small" subdued>Caption</Text>
<Text subdued>Muted Text</Text>
```

#### Stack/Inline Changes

```tsx
// Old
<Stack spacing="2xl">
<Stack spacing="xs">

// New
<Stack spacing="xl">     // or spacing="gap-12" for custom
<Stack compact>          // replaces spacing="xs"
```

#### Pattern Components

Consider replacing common component patterns with the new pattern components:

```tsx
// Old: Manual hero composition
<Section>
  <Container>
    <Stack spacing="lg" align="center">
      <Heading size={1} centered>{title}</Heading>
      <Text variant="lead" centered subdued>{subtitle}</Text>
      <Inline spacing="md">
        <Button>CTA</Button>
      </Inline>
    </Stack>
  </Container>
</Section>

// New: Use PageHeader pattern
<PageHeader
  title={title}
  subtitle={subtitle}
  centered
>
  <Button>CTA</Button>
</PageHeader>
```
