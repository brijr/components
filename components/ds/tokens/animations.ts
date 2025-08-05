/**
 * Animation tokens
 * Consistent animation and transition values
 */

/**
 * Animation durations
 */
export const durations = {
  instant: "0ms",
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "700ms",
  slowest: "1000ms",
} as const;

export type Duration = keyof typeof durations;

/**
 * Animation easings
 */
export const easings = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

export type Easing = keyof typeof easings;

/**
 * Transition presets
 */
export const transitions = {
  none: "transition-none",
  all: "transition-all duration-300 ease-in-out",
  colors: "transition-colors duration-300 ease-in-out",
  opacity: "transition-opacity duration-300 ease-in-out",
  shadow: "transition-shadow duration-300 ease-in-out",
  transform: "transition-transform duration-300 ease-in-out",
  
  // Common combinations
  fade: "transition-opacity duration-300 ease-in-out",
  slide: "transition-transform duration-300 ease-out",
  scale: "transition-transform duration-300 ease-in-out",
  
  // Component-specific
  button: "transition-all duration-150 ease-in-out",
  card: "transition-all duration-300 ease-in-out",
  input: "transition-colors duration-150 ease-in-out",
  dropdown: "transition-all duration-200 ease-out",
} as const;

/**
 * Keyframe animations
 */
export const animations = {
  // Fade animations
  fadeIn: "animate-in fade-in duration-300",
  fadeOut: "animate-out fade-out duration-300",
  
  // Slide animations
  slideInFromTop: "animate-in slide-in-from-top duration-300",
  slideInFromBottom: "animate-in slide-in-from-bottom duration-300",
  slideInFromLeft: "animate-in slide-in-from-left duration-300",
  slideInFromRight: "animate-in slide-in-from-right duration-300",
  
  slideOutToTop: "animate-out slide-out-to-top duration-300",
  slideOutToBottom: "animate-out slide-out-to-bottom duration-300",
  slideOutToLeft: "animate-out slide-out-to-left duration-300",
  slideOutToRight: "animate-out slide-out-to-right duration-300",
  
  // Zoom animations
  zoomIn: "animate-in zoom-in duration-300",
  zoomOut: "animate-out zoom-out duration-300",
  
  // Spin animation
  spin: "animate-spin",
  
  // Pulse animation
  pulse: "animate-pulse",
  
  // Bounce animation
  bounce: "animate-bounce",
} as const;

/**
 * Animation delays
 */
export const delays = {
  none: "0ms",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
} as const;

export type Delay = keyof typeof delays;