import { cn } from "@/lib/utils";
import type { DSProps } from "./types";

/**
 * Main component to wrap the primary content of the page.
 *
 * @param {DSProps} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.id] - HTML id attribute.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element} A main element.
 */
export const Main = ({ children, className, id, style }: DSProps) => (
  <main className={cn("", className)} id={id} style={style}>
    {children}
  </main>
);
