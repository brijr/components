import { cn } from "@/lib/utils";
import type { DSProps } from "./types";

/**
 * Nav component to render a navigation container with an inner div.
 *
 * @param {DSProps} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className] - Additional class names for the nav element.
 * @param {string} [props.id] - HTML id attribute.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @param {string} [props.containerClassName] - Additional class names for the inner container.
 * @returns {JSX.Element} A nav element with a centered inner container.
 */

export const Nav = ({
  children,
  className,
  id,
  style,
  containerClassName,
}: DSProps) => (
  <nav className={cn(className)} id={id} style={style}>
    <div
      id="nav-container"
      className={cn("mx-auto max-w-5xl px-4 py-2 sm:px-6", containerClassName)}
    >
      {children}
    </div>
  </nav>
);
