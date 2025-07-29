import { cn } from "@/lib/utils";
import type { DSProps } from "./types";

/**
 * Layout component that renders the root HTML element with global settings.
 *
 * @param {DSProps} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element} An HTML element wrapping the entire document.
 */
export const Layout = ({ children, className, style }: DSProps) => (
  <html
    lang="en"
    suppressHydrationWarning
    className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
    style={style}
  >
    {children}
  </html>
);
