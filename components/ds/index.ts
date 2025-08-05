/**
 * Design System Component Exports
 *
 * This file provides organized exports for all design system components.
 * Components are grouped by their purpose for easier discovery and use.
 */

// Layout Components
export { Container } from "./container";
export { Section } from "./section";
export { Nav } from "./nav";
export { Grid } from "./grid";
export { Center } from "./center";
export { AspectRatio } from "./aspect-ratio";

// Typography Components
export { Heading } from "./heading";
export { Prose } from "./prose";
export { Text } from "./text";

// Spacing Components
export { Inline } from "./inline";
export { Stack } from "./stack";
export { Spacer } from "./spacer";
export { Divider } from "./divider";

// Pattern Components (re-export for convenience)
export { PageHeader, ContentBlock, ButtonGroup } from "./patterns";

// Utilities
export { 
  type ResponsiveValue,
  responsive,
  isResponsiveValue,
  useBreakpoint,
  useResponsive,
  createResponsiveProp 
} from "./utils/responsive";

// Design Tokens (simplified)
export * from "./tokens";

// Examples
export { examples } from "./examples";

// Type Exports
export type { DSProps } from "./types";
