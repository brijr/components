# Design System Documentation

## Core Philosophy

This design system prioritizes semantic, composable components over raw utility classes. Instead of memorizing Tailwind combinations, use purpose-built components that handle spacing, typography, and responsive design automatically.

## Typography Components

### Heading Component

The `Heading` component provides consistent typography for all heading levels with built-in responsive sizing.

```tsx
import { Heading } from "@/components/ds";

// Basic usage
<Heading level={1}>Page Title</Heading>     // Renders as <h1>
<Heading level={2}>Section Title</Heading>  // Renders as <h2>
<Heading level={3}>Card Title</Heading>     // Renders as <h3>

// With props
<Heading level={2} color="muted">Subtle Section</Heading>
<Heading level={1} align="center">Centered Hero</Heading>
<Heading level={3} color="primary">Featured Title</Heading>
```

**Props:**

- `level`: 1-6 (required) - Determines both semantic HTML element and visual size
- `color`: "default" | "muted" | "primary" | "destructive" - Text color
- `align`: "left" | "center" | "right" - Text alignment
- `as`: Override semantic element while keeping visual style
- `className`: Additional Tailwind classes if needed

**Sizes:**

- Level 1: `text-4xl sm:text-5xl` - Main page titles
- Level 2: `text-3xl sm:text-4xl` - Major sections
- Level 3: `text-2xl sm:text-3xl` - Subsections
- Level 4: `text-xl sm:text-2xl` - Card titles
- Level 5: `text-lg sm:text-xl` - Small headings
- Level 6: `text-base sm:text-lg` - Smallest headings

### Text Component

The `Text` component handles all body text with consistent styling and variants.

```tsx
import { Text } from "@/components/ds";

// Common patterns
<Text>Regular body text with good readability</Text>
<Text variant="lead">Introductory text that's slightly larger</Text>
<Text variant="small">Legal text or disclaimers</Text>
<Text variant="muted">Secondary information</Text>
<Text variant="caption" color="muted">Image captions</Text>

// Special variants
<Text variant="code">monospace_text</Text>
<Text variant="link" as="a" href="/docs">Styled link</Text>

// With modifiers
<Text color="primary" weight="semibold">Important note</Text>
<Text align="center" variant="lead">Centered intro</Text>
<Text as="span" variant="small">Inline small text</Text>
```

**Props:**

- `variant`: Controls text size and style
  - "body" (default): Normal paragraph text
  - "lead": Larger intro text (`text-lg sm:text-xl`)
  - "large": Slightly larger body (`text-lg`)
  - "small": Smaller text (`text-sm`)
  - "muted": Small muted text (`text-sm text-muted-foreground`)
  - "caption": Tiny captions (`text-xs text-muted-foreground`)
  - "code": Monospace code style
  - "link": Link styling with hover states
- `color`: "default" | "muted" | "primary" | "destructive"
- `weight`: "normal" | "medium" | "semibold" | "bold"
- `align`: "left" | "center" | "right"
- `as`: HTML element (p, span, div, strong, em, etc.)

### Prose Component

The `Prose` component automatically styles rich HTML content, perfect for markdown or CMS content.

```tsx
import { Prose } from "@/components/ds";

// Basic usage
<Prose>
  <h1>This heading gets styled automatically</h1>
  <p>Paragraphs have proper spacing and typography.</p>
  <ul>
    <li>Lists are styled with custom bullets</li>
    <li>And proper spacing between items</li>
  </ul>
  <blockquote>Quotes stand out visually</blockquote>
</Prose>

// With options
<Prose isArticle>      // Adds max-width for readability
  {/* Long-form content */}
</Prose>

<Prose isSpaced>       // Extra spacing between elements
  {/* Content needing breathing room */}
</Prose>
```

**Features:**

- Auto-styles all HTML elements
- Responsive heading sizes
- Custom list bullets
- Styled blockquotes and code blocks
- Link styling with hover states
- Table formatting
- Image borders and spacing

## Spacing Components

### Stack Component

`Stack` creates consistent vertical spacing between elements, replacing manual margin utilities.

```tsx
import { Stack } from "@/components/ds";

// Basic usage - vertical layout with spacing
<Stack spacing="md">
  <Heading level={2}>Title</Heading>
  <Text>Description paragraph</Text>
  <Button>Call to action</Button>
</Stack>

// Card content with tight spacing
<Stack spacing="sm">
  <Badge>New</Badge>
  <Heading level={3}>Feature Name</Heading>
  <Text variant="small" color="muted">Brief description</Text>
</Stack>

// Hero section with generous spacing
<Stack spacing="xl" align="center">
  <Badge>Announcement</Badge>
  <Heading level={1} align="center">Big Launch</Heading>
  <Text variant="lead" align="center">Exciting news</Text>
  <Stack spacing="md" align="center">
    <Button size="lg">Get Started</Button>
    <Text variant="small" color="muted">No credit card required</Text>
  </Stack>
</Stack>
```

**Props:**

- `spacing`: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  - xs: `gap-1` (4px)
  - sm: `gap-2` (8px)
  - md: `gap-4` (16px) - default
  - lg: `gap-6` (24px)
  - xl: `gap-8` (32px)
  - 2xl: `gap-12` (48px)
  - 3xl: `gap-16` (64px)
- `align`: "start" | "center" | "end" | "stretch" (default)
- `justify`: "start" | "center" | "end" | "between" | "around" | "evenly"
- `as`: Custom HTML element (defaults to div)

### Inline Component

`Inline` handles horizontal layouts with automatic wrapping, perfect for button groups, tags, or any horizontal list.

```tsx
import { Inline } from "@/components/ds";

// Button group
<Inline spacing="md">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Reset</Button>
</Inline>

// Tag list that wraps nicely
<Inline spacing="sm">
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Tailwind</Badge>
  <Badge>Next.js</Badge>
</Inline>

// Mixed content with alignment
<Inline spacing="md" align="center">
  <Text weight="semibold">Sort by:</Text>
  <Button variant="ghost" size="sm">Date</Button>
  <Button variant="ghost" size="sm">Name</Button>
  <Text color="muted">•</Text>
  <Button variant="link" size="sm">Clear filters</Button>
</Inline>
```

**Props:**

- `spacing`: Same scale as Stack
- `align`: "start" | "center" | "end" | "baseline" | "stretch"
- `justify`: "start" | "center" | "end" | "between" | "around" | "evenly"
- `wrap`: "wrap" (default) | "nowrap" | "reverse"

## Layout Components

### Section Component

`Section` provides consistent page sections with built-in vertical padding.

```tsx
import { Section } from "@/components/ds";

// Basic section
<Section>
  <Container>{/* Content */}</Container>
</Section>

// With custom styling (additive)
<Section className="bg-muted/50">
  <Container>{/* Highlighted section */}</Container>
</Section>

// Full example
<Section>
  <Container>
    <Stack spacing="lg">
      <Heading level={2}>Features</Heading>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Feature cards */}
      </div>
    </Stack>
  </Container>
</Section>
```

**Built-in styles:**

- Padding: `py-2 sm:py-4` (8px mobile, 16px desktop)
- Additional classes are merged, not replaced
- Semantic `<section>` element

### Container Component

`Container` centers content and provides consistent horizontal padding.

```tsx
import { Container } from "@/components/ds";

// Standard centered content
<Container>
  <Heading level={1}>Page Title</Heading>
  <Text>Centered and properly padded</Text>
</Container>

// With additional classes
<Container className="py-16">
  {/* Extra vertical padding */}
</Container>
```

**Built-in styles:**

- Max width: `max-w-5xl` (1024px)
- Centering: `mx-auto`
- Padding: `p-4 sm:p-6` (16px mobile, 24px desktop)

### Main Component

`Main` wraps the primary page content area.

```tsx
import { Main } from "@/components/ds";

<Main>
  <Section>
    <Container>{/* Page content */}</Container>
  </Section>
</Main>;
```

**Usage:**

- Semantic `<main>` element
- Typically one per page
- Can add classes for min-height, background, etc.

### Nav Component

`Nav` provides a navigation container with built-in responsive padding.

```tsx
import { Nav } from "@/components/ds";

<Nav className="border-b">
  <Inline spacing="md" align="center" justify="between">
    <Text weight="semibold">Logo</Text>
    <Inline spacing="lg">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Contact</Button>
    </Inline>
  </Inline>
</Nav>;
```

**Built-in styles:**

- Inner container: `max-w-5xl mx-auto px-4 sm:px-6 py-2`
- Use `containerClassName` to modify inner container

## Common Patterns

### Hero Section with CTA

```tsx
<Section className="py-16 md:py-24">
  <Container>
    <Stack spacing="lg" align="center">
      <Stack spacing="md" align="center">
        <Badge variant="secondary">New Release</Badge>
        <Heading level={1} align="center">
          Ship faster with our design system
        </Heading>
        <Text variant="lead" align="center" color="muted" className="max-w-2xl">
          Build beautiful, consistent interfaces in half the time
        </Text>
      </Stack>
      <Inline spacing="md">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          View Examples
        </Button>
      </Inline>
    </Stack>
  </Container>
</Section>
```

### Feature Grid

```tsx
<Section>
  <Container>
    <Stack spacing="xl">
      <Stack spacing="md" align="center">
        <Heading level={2} align="center">
          Everything you need
        </Heading>
        <Text variant="lead" align="center" color="muted" className="max-w-2xl">
          Our design system includes all the components you need
        </Text>
      </Stack>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <Stack spacing="sm">
                <div className="text-primary">{feature.icon}</div>
                <Heading level={3}>{feature.title}</Heading>
              </Stack>
            </CardHeader>
            <CardContent>
              <Text color="muted">{feature.description}</Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </Stack>
  </Container>
</Section>
```

### Content Section

```tsx
<Section>
  <Container>
    <div className="grid items-center gap-12 md:grid-cols-2">
      <Stack spacing="md">
        <Badge>Case Study</Badge>
        <Heading level={2}>How we increased conversions by 150%</Heading>
        <Prose>
          <p>
            By implementing consistent spacing and typography across all
            touchpoints, we created a more trustworthy experience.
          </p>
          <ul>
            <li>Reduced cognitive load</li>
            <li>Improved readability</li>
            <li>Faster development time</li>
          </ul>
        </Prose>
        <Button>Read the full story</Button>
      </Stack>
      <div>
        <Image
          src="/case-study.png"
          alt="Conversion graph"
          width={600}
          height={400}
          className="rounded-lg"
        />
      </div>
    </div>
  </Container>
</Section>
```

## Best Practices

### Do's

- Use Stack/Inline for spacing instead of margins
- Use semantic Heading levels (1 → 6)
- Combine components for complex layouts
- Use Text variants for consistent typography
- Let Section/Container handle page spacing

### Don'ts

- Don't add padding to Section/Container (they have it)
- Don't skip heading levels (h1 → h3)
- Don't use raw margins between elements
- Don't mix Text sizes - use variants
- Don't nest Containers

### Responsive Design

All components handle responsive sizing automatically:

- Headings scale up on larger screens
- Container padding adjusts for mobile
- Text remains readable at all sizes
- Spacing scales appropriately

### Accessibility

- Heading levels create proper document outline
- Text colors meet contrast requirements
- Interactive elements have focus states
- Semantic HTML throughout

## Quick Reference

```tsx
// Import everything
import {
  Section,
  Container,
  Main,
  Nav, // Layout
  Heading,
  Text,
  Prose, // Typography
  Stack,
  Inline, // Spacing
} from "@/components/ds";

// Most common pattern
<Section>
  <Container>
    <Stack spacing="lg">
      <Heading level={2}>Title</Heading>
      <Text>Content</Text>
    </Stack>
  </Container>
</Section>;
```
