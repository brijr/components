# Component Creation Guide

## Project Context

This is a Next.js 15 marketing component gallery showcasing reusable UI components built with TypeScript and Tailwind CSS v4.

## Design System Overview

Use the design system from `@/components/site` for all components:

You can reference `@/components/site/site-ds.md`

### Import Structure

```tsx
// Site design system components
import {
  Main,
  Nav,
  Section,
  Container,
  Header,
  Grid,
  Flex,
  Prose,
} from "@/components/site/ds";
import { Form } from "@/components/site/form"; // Client component

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// ... any other shadcn component
```

### Typography

Use the `Header` component for all headings:

```tsx
<Header as="h1">Main Title</Header>
<Header as="h2" className="text-muted-foreground">Subtitle</Header>
<Header as="h3">Section Heading</Header>
```

For body text, use standard HTML elements or wrap in `Prose`:

```tsx
<p className="text-xl text-muted-foreground">Lead paragraph</p>
<p>Regular text</p>

// For rich text content
<Prose isArticle isSpaced>
  <h1>Article Title</h1>
  <p>This content will be automatically styled.</p>
</Prose>
```

### Layout Components

#### Section & Container

**CRITICAL: NEVER add padding or height to Section or Container**

```tsx
<Section> {/* Has built-in py-2 sm:py-4 - NO padding classes */}
  <Container> {/* Has built-in p-4 sm:p-6 - NO padding classes */}
    {/* Content */}
  </Container>
</Section>

<Section className="bg-muted"> {/* Only backgrounds/borders, NO padding */}
  <Container>
    {/* Content */}
  </Container>
</Section>
```

**Visual Hierarchy Rules:**

- Section provides vertical rhythm between page sections
- Container constrains content width and adds horizontal padding
- Content inside Container should handle its own spacing

#### Flex Layout

```tsx
<Flex justify="between" align="center">
  <div>Left content</div>
  <div>Right content</div>
</Flex>

<Flex direction="column" gap={6}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

Props:

- `direction`: "row" | "column" | "row-reverse" | "column-reverse"
- `justify`: "start" | "end" | "center" | "between" | "around" | "evenly"
- `align`: "start" | "end" | "center" | "baseline" | "stretch"
- `gap`: 0|1|2|3|4|5|6|8|10|12 (default: 4)

**Common Flex Patterns:**

```tsx
// Centered content
<Flex direction="column" align="center" className="text-center">

// Split layout with actions
<Flex justify="between" align="center">

// Vertical stack with consistent spacing
<Flex direction="column" gap={4}>

// Responsive direction change
<Flex direction="column" className="md:flex-row">
```

#### Grid Layout

```tsx
<Grid columns={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

Responsive columns:

- 1 column: Always single column
- 2 columns: 1 on mobile, 2 on sm+
- 3 columns: 1 on mobile, 2 on sm, 3 on lg+
- 4 columns: 1 on mobile, 2 on sm, 4 on lg+

### When to Use Design System vs Tailwind

**Use Design System Components:**

- Page structure (Main, Nav, Section, Container)
- Typography (Header, Prose)
- Layout (Grid, Flex)
- Consistent spacing and responsive behavior

**Use Tailwind Classes:**

- Visual styling (backgrounds, borders - NO SHADOWS)
- Fine-tuned responsive modifiers
- Text colors and sizes
- Custom spacing for specific needs

**Use shadcn/ui Components:**

- Buttons, Cards, Forms, Dialogs
- Any interactive UI elements
- Complex components with built-in accessibility

## Clean Visual Design Principles

### NO Drop Shadows Policy

This design system uses a **flat, clean aesthetic** without drop shadows:

```tsx
// ❌ NEVER USE THESE:
className = "shadow";
className = "shadow-sm";
className = "shadow-md";
className = "shadow-lg";
className = "shadow-xl";
className = "shadow-2xl";
className = "drop-shadow-*";

// ✅ USE THESE INSTEAD:
className = "border"; // For subtle separation
className = "border-2"; // For emphasis
className = "bg-muted"; // For background depth
className = "bg-card"; // For card backgrounds
className = "divide-y"; // For list separators
```

### Creating Visual Hierarchy Without Shadows

**1. Use Borders:**

```tsx
<Card className="border">  // Default card with border
<div className="border-t">  // Top border for separation
<div className="divide-y">  // Dividers between items
```

**2. Use Background Colors:**

```tsx
<Section className="bg-muted">     // Subtle background
<div className="bg-primary/10">    // Tinted backgrounds
<Card className="bg-card">         // Card backgrounds
```

**3. Use Spacing:**

```tsx
<Flex gap={8}>              // Large gaps for separation
<div className="p-6">       // Padding for breathing room
<div className="mt-8">      // Margins for sections
```

**4. Use Typography:**

```tsx
<Header as="h1">            // Size hierarchy
<p className="text-muted-foreground">  // Color hierarchy
<p className="font-semibold">          // Weight hierarchy
```

## Layout & Alignment Best Practices

### Alignment Principles

**Text Alignment:**

- Center align for hero sections and CTAs
- Left align for body content and detailed information
- Use `text-center`, `text-left`, `text-right` classes
- Combine with Flex `align="center"` for vertical centering

**Content Width Control:**

```tsx
// Constrain text width for readability
<p className="max-w-2xl mx-auto">Long paragraph text</p>

// Center a fixed-width element
<div className="max-w-md mx-auto">

// Full width with padding
<div className="w-full px-4">
```

**Spacing Consistency:**

```tsx
// Vertical spacing between sections
<Flex direction="column" gap={8}>  // Large gap
<Flex direction="column" gap={6}>  // Medium gap
<Flex direction="column" gap={4}>  // Small gap

// Margin utilities for one-off spacing
className="mt-8"   // Top margin
className="mb-6"   // Bottom margin
className="my-4"   // Vertical margin
className="mx-auto" // Horizontal center
```

**Responsive Alignment:**

```tsx
// Mobile-first responsive alignment
<div className="text-center md:text-left">
<Flex direction="column" className="md:flex-row md:justify-between">
<Grid columns={1} className="md:grid-cols-2 lg:grid-cols-3">
```

### Common Layout Patterns

**Hero Section - Centered:**

```tsx
<Section>
  <Container>
    <Flex direction="column" align="center" gap={6} className="text-center">
      <Header as="h1" className="max-w-4xl">
        Headline
      </Header>
      <p className="text-muted-foreground max-w-2xl text-xl">Subheadline</p>
      <Flex gap={4}>
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </Flex>
    </Flex>
  </Container>
</Section>
```

**Hero Section - Left Aligned:**

```tsx
<Section>
  <Container>
    <Flex direction="column" gap={6} className="max-w-3xl">
      <Header as="h1">Headline</Header>
      <p className="text-muted-foreground text-xl">Subheadline</p>
      <Flex gap={4}>
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </Flex>
    </Flex>
  </Container>
</Section>
```

**Split Layout - 50/50:**

```tsx
<Section>
  <Container>
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div>{/* Text content */}</div>
      <div>{/* Image or other content */}</div>
    </div>
  </Container>
</Section>
```

**Feature Cards - Equal Height:**

```tsx
<Grid columns={3}>
  {features.map((feature) => (
    <Card className="h-full">
      {" "}
      {/* h-full ensures equal height */}
      <CardHeader>
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{feature.description}</p>
      </CardContent>
    </Card>
  ))}
</Grid>
```

### Visual Balance Guidelines

1. **Whitespace Management:**
   - Use consistent gap values (4, 6, 8)
   - Don't mix different spacing systems
   - Let Section/Container handle outer spacing

2. **Content Hierarchy:**
   - Largest text for h1 (Header as="h1")
   - Decreasing sizes for h2-h6
   - Muted colors for secondary text
   - Bold for emphasis, not headers

3. **Alignment Consistency:**
   - Pick one alignment per section
   - Center align for impact
   - Left align for readability
   - Maintain alignment in responsive views

4. **Grid vs Flex Decision:**
   - Use Grid for equal-width items
   - Use Flex for unequal or flexible layouts
   - Grid for cards and galleries
   - Flex for navigation and split layouts

5. **Visual Styling - Clean & Minimal:**
   - **NO DROP SHADOWS** - Avoid shadow-\* classes completely
   - Use borders for separation (border, border-t, etc.)
   - Use background colors for depth (bg-muted, bg-card)
   - Rely on whitespace for visual hierarchy
   - Keep the design flat and modern

## Critical Rules

### 🔗 All CTAs MUST Be Functional and Well-Aligned

Every button and link must have a working action AND proper alignment:

```tsx
import Link from "next/link";

// BUTTON ALIGNMENT PATTERNS:

// Centered buttons (heroes, CTAs)
<Flex gap={4} className="justify-center">
  <Button size="lg" asChild>
    <Link href="/contact">Get Started</Link>
  </Button>
  <Button size="lg" variant="outline" asChild>
    <a href="/demo">View Demo</a>
  </Button>
</Flex>

// Left-aligned buttons (content sections)
<Flex gap={4}>
  <Button asChild>
    <Link href="/learn">Learn More</Link>
  </Button>
</Flex>

// Right-aligned buttons (forms, modals)
<Flex gap={4} className="justify-end">
  <Button variant="outline">Cancel</Button>
  <Button>Submit</Button>
</Flex>

// Mobile-responsive button stack
<Flex direction="column" gap={2} className="sm:flex-row sm:gap-4">
  <Button className="w-full sm:w-auto">Primary</Button>
  <Button variant="outline" className="w-full sm:w-auto">Secondary</Button>
</Flex>

// ❌ NEVER do this
<Button>Get Started</Button> // No action!
<div><Button>Misaligned</Button></div> // No flex container!
```

### TypeScript Requirements

**NEVER use React.FC** - Use direct function declarations:

```tsx
// ❌ DO NOT USE
export const Component: React.FC<Props> = ({ prop }) => { ... }

// ✅ DO USE
export const Component = ({ prop }: Props) => { ... }
```

### Component Structure

```
/components/[type]/[component-name]/
  ├── index.tsx      # Component with named export
  └── content.ts     # Default content and variations
```

## Component Requirements

### 1. Named Export with TypeScript Interface

```tsx
export interface HeroMinimalProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const HeroMinimal = ({
  headline,
  subheadline,
  primaryCTA,
}: HeroMinimalProps) => {
  // Component implementation
};
```

### 2. Use Design System Components

```tsx
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export const HeroMinimal = ({
  headline,
  subheadline,
  primaryCTA,
}: HeroMinimalProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" align="center" className="text-center">
          <Header as="h1">{headline}</Header>
          {subheadline && (
            <p className="text-muted-foreground max-w-2xl text-xl">
              {subheadline}
            </p>
          )}
          {primaryCTA && (
            <Button size="lg" className="mt-8" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
          )}
        </Flex>
      </Container>
    </Section>
  );
};
```

### 3. Content File

```typescript
// content.ts
export const defaultContent = {
  headline: "Build Better Websites",
  subheadline:
    "Create beautiful, responsive websites with our component library",
  primaryCTA: {
    text: "Get Started",
    href: "/contact",
  },
};
```

### 4. Registry Integration

```typescript
// In registry.ts
import { HeroMinimal } from "./components/hero/hero-minimal";
import { defaultContent } from "./components/hero/hero-minimal/content";

// Add to registry array
{
  name: "Hero Minimal",
  type: "hero",
  slug: "hero-minimal",
  Component: HeroMinimal,
  props: defaultContent
}
```

## Form Component Usage

The Form component is a powerful client-side component that works in Server Components:

```tsx
<Form
  fields={[
    {
      name: "name",
      type: "text",
      label: "Full Name",
      validation: { required: true },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      validation: {
        required: true,
        validationType: "email",
      },
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone",
      phoneFormat: "auto", // Auto-formats phone numbers
      validation: {
        required: true,
        validationType: "phone",
      },
    },
    {
      name: "budget",
      type: "range",
      label: "Budget Range",
      min: 1000,
      max: 50000,
      step: 1000,
      showValue: true,
    },
    {
      name: "services",
      type: "multiselect",
      label: "Services Needed",
      options: [
        { label: "Web Design", value: "design" },
        { label: "SEO", value: "seo" },
      ],
    },
    {
      name: "urgent",
      type: "yesno",
      label: "Is this urgent?",
      validation: { required: true },
    },
  ]}
  webhookUrl="https://formspree.io/f/YOUR_ID"
  showSuccessMessage={true}
  resetOnSubmit={true}
  submitText="Send Message"
/>
```

## Common Patterns with Perfect Alignment

### Hero Section - Centered with Max Width

```tsx
<Section>
  <Container>
    <Flex direction="column" align="center" gap={6} className="text-center">
      <Header as="h1" className="max-w-4xl">
        Build Better Products
      </Header>
      <p className="text-muted-foreground max-w-2xl text-xl">
        The modern way to ship software
      </p>
      <Flex gap={4} className="mt-2">
        <Button size="lg" asChild>
          <Link href="/demo">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/docs">Learn More</a>
        </Button>
      </Flex>
    </Flex>
  </Container>
</Section>
```

### Feature Grid - With Icons (Clean, No Shadows)

```tsx
<Section>
  <Container>
    <Flex direction="column" gap={8}>
      <div className="text-center">
        <Header as="h2" className="mb-3">
          Features
        </Header>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Everything you need to build modern applications
        </p>
      </div>
      <Grid columns={3}>
        {features.map((feature) => (
          <Card key={feature.id} className="h-full">
            {/* Card component has built-in border styling - no shadows needed */}
            <CardHeader>
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                {feature.icon}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Grid>
    </Flex>
  </Container>
</Section>
```

### Split Layout - Text and Image

```tsx
<Section>
  <Container>
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
      <Flex direction="column" gap={4}>
        <Header as="h2">Advanced Analytics</Header>
        <p className="text-muted-foreground text-lg">
          Get insights into your performance with our powerful analytics
          dashboard
        </p>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <CheckIcon className="text-primary mt-0.5 h-5 w-5" />
            <span>Real-time data</span>
          </li>
          <li className="flex gap-2">
            <CheckIcon className="text-primary mt-0.5 h-5 w-5" />
            <span>Custom reports</span>
          </li>
        </ul>
        <div className="pt-2">
          <Button asChild>
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>
      </Flex>
      <div className="relative aspect-video">
        <Image
          src="/analytics.jpg"
          alt="Analytics dashboard"
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  </Container>
</Section>
```

### CTA Section - Centered with Background

```tsx
<Section className="bg-muted">
  <Container>
    <Flex
      direction="column"
      align="center"
      gap={4}
      className="py-8 text-center"
    >
      <Header as="h2" className="max-w-3xl">
        Ready to get started?
      </Header>
      <p className="text-muted-foreground max-w-xl text-lg">
        Join thousands of teams already using our platform
      </p>
      <Flex gap={4} className="mt-2">
        <Button size="lg" asChild>
          <Link href="/signup">Start Free Trial</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </Flex>
    </Flex>
  </Container>
</Section>
```

### Stats Section - Centered Numbers

```tsx
<Section>
  <Container>
    <div className="grid gap-8 text-center md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id}>
          <div className="text-4xl font-bold">{stat.value}</div>
          <div className="text-muted-foreground mt-1 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  </Container>
</Section>
```

## Image Requirements

- Use Next.js Image component
- Default to `/placeholder.webp`
- Always include width, height, and alt text
- Use priority={true} for above-the-fold images

```tsx
import Image from "next/image";

<Image
  src="/placeholder.webp"
  alt="Description"
  width={1200}
  height={600}
  priority
/>;
```

## Alignment Troubleshooting Guide

### Common Alignment Issues and Fixes

**Problem: Content not centered**

```tsx
// ❌ Wrong - missing centering utilities
<div>
  <Header as="h1">Title</Header>
</div>

// ✅ Correct - proper centering
<Flex direction="column" align="center" className="text-center">
  <Header as="h1">Title</Header>
</Flex>
```

**Problem: Uneven spacing**

```tsx
// ❌ Wrong - mixing spacing systems
<div className="mt-4 mb-8 space-y-2">

// ✅ Correct - consistent gap usage
<Flex direction="column" gap={4}>
```

**Problem: Content too wide on large screens**

```tsx
// ❌ Wrong - no width constraints
<p>Very long paragraph that stretches across the entire screen...</p>

// ✅ Correct - max-width for readability
<p className="max-w-2xl mx-auto">Very long paragraph...</p>
```

**Problem: Misaligned grid items**

```tsx
// ❌ Wrong - inconsistent card heights
<Grid columns={3}>
  <Card>Short content</Card>
  <Card>Much longer content that makes this card taller</Card>
</Grid>

// ✅ Correct - equal height cards
<Grid columns={3}>
  <Card className="h-full">Short content</Card>
  <Card className="h-full">Much longer content</Card>
</Grid>
```

**Problem: Poor mobile alignment**

```tsx
// ❌ Wrong - desktop-only alignment
<div className="text-left">

// ✅ Correct - responsive alignment
<div className="text-center md:text-left">
```

## Quality Checklist

- [ ] Uses design system components from `@/components/site/ds`
- [ ] All CTAs are functional with proper href/onClick
- [ ] No React.FC usage
- [ ] All content passed via props
- [ ] TypeScript interfaces with JSDoc comments
- [ ] Responsive on all devices
- [ ] Section/Container WITHOUT padding classes
- [ ] Proper heading hierarchy (one h1)
- [ ] Images use Next.js Image component
- [ ] Added to registry.ts
- [ ] Has defaultContent in content.ts

## Component Types to Build

- **Hero Sections**: Landing page heroes
- **Feature Sections**: Product features
- **CTA Sections**: Call-to-action blocks
- **Pricing Sections**: Pricing plans and calculators
- **Testimonial Sections**: Customer reviews and case studies

## Do NOT Use (Antipatterns)

1. **React.FC** - Never use function component types
2. **Padding on Section/Container** - They have built-in spacing
3. **Non-functional CTAs** - All buttons must work
4. **Hardcoded text** - Use props for all content
5. **Multiple h1 tags** - One per component
6. **Nested Containers** - One per Section
7. **Old design system** - Use site/ds, not components/ds
8. **Drop shadows** - Never use shadow-\* classes (shadow-sm, shadow-md, shadow-lg, etc.)
9. **Excessive visual effects** - Keep it clean and minimal

## Important Notes

- This is a showcase project for marketing components
- Components are RSC by default (add "use client" only when needed)
- Always prefer existing components from site/ds or shadcn/ui
- Follow the established patterns for consistency
- Run `pnpm lint` before committing
