import { cn } from "@/lib/utils";
import type { DSProps } from "./types";

/**
 * Section component to wrap content in a section element.
 *
 * @param {DSProps} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.id] - HTML id attribute.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element} A section element.
 */
export const Section = ({ children, className, id, style }: DSProps) => (
  <section className={cn("py-2 sm:py-4", className)} id={id} style={style}>
    {children}
  </section>
);
