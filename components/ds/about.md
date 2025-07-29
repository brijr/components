# Design System Quick Reference

## Core Principle

Instead of writing raw Tailwind classes, use semantic components that handle spacing, typography, and layout consistently.

## Typography - Just pick what you need

```tsx
// For headings (automatically uses the right HTML element)
<Heading level={1}>Page Title</Heading>           // H1, largest
<Heading level={2}>Section Title</Heading>        // H2
<Heading level={3}>Subsection</Heading>          // H3

// For body text (with variants)
<Text variant="lead">Intro paragraph</Text>       // Larger body text
<Text>Regular paragraph</Text>                    // Default body text
<Text variant="small">Fine print</Text>           // Smaller text
<Text color="muted">Secondary info</Text>         // Muted color
<Text variant="caption">Image caption</Text>      // Tiny muted text

// For rich content (auto-styles all HTML inside)
<Prose>
  <h1>Auto-styled heading</h1>
  <p>Auto-styled paragraph with <a href="#">links</a></p>
  <ul><li>Auto-styled lists</li></ul>
</Prose>
```

## Spacing - No more guessing margins

```tsx
// Vertical spacing (replaces manual mb-4, mt-6, etc.)
<Stack spacing="md">          // gap-4 between children
  <Heading level={2}>Title</Heading>
  <Text>Description</Text>
  <Button>Action</Button>
</Stack>

// Horizontal spacing (auto-wraps)
<Inline spacing="sm">         // gap-2 between children
  <Badge>New</Badge>
  <Badge>Featured</Badge>
</Inline>

// Spacing scale: xs (gap-1), sm (gap-2), md (gap-4), lg (gap-6), xl (gap-8), 2xl (gap-12)
```

## Layout - Consistent page structure

```tsx
// Page wrapper
<Main>
  {/* Page content */}
</Main>

// Centered content container
<Container>
  {/* Max-width content with padding */}
</Container>

// Page sections
<Section>
  <Container>
    {/* Section content */}
  </Container>
</Section>
```

## Common Patterns

### Hero Section:

```tsx
<Section className="py-16">
  <Container>
    <Stack spacing="lg" align="center">
      <Heading level={1} align="center">
        Welcome
      </Heading>
      <Text variant="lead" align="center" color="muted">
        Build something amazing
      </Text>
      <Inline spacing="md">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </Inline>
    </Stack>
  </Container>
</Section>
```

### Feature Card:

```tsx
<Card>
  <CardHeader>
    <Stack spacing="sm">
      <Heading level={3}>Feature Name</Heading>
      <Text color="muted">Brief description</Text>
    </Stack>
  </CardHeader>
  <CardContent>
    <Text>Detailed explanation...</Text>
  </CardContent>
</Card>
```

### Content Section:

```tsx
<Section>
  <Container>
    <Stack spacing="xl">
      <Stack spacing="md">
        <Heading level={2}>About Us</Heading>
        <Text variant="lead">We make great things</Text>
      </Stack>
      <Prose>{/* Rich markdown/HTML content */}</Prose>
    </Stack>
  </Container>
</Section>
```

## Key Benefits for AI/Developers:

1. **No memorizing Tailwind classes** - Components have semantic names
2. **Consistent spacing** - Use Stack/Inline instead of manual margins
3. **Automatic responsive sizing** - Components handle sm: breakpoints
4. **Type-safe props** - TypeScript tells you available options
5. **Composable** - Nest components naturally

## When to use what:

- **Heading/Text**: For any text that needs consistent styling
- **Stack/Inline**: For ANY layout that needs spacing between elements
- **Prose**: For user-generated content or markdown
- **Container/Section**: For page-level layout structure

This system means you can focus on the content structure rather than remembering specific Tailwind classes or spacing values.
