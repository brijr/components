import { cn } from "@/lib/utils";
import type { DSProps } from "./types";

/**
 * Container component to wrap content within a centered div with padding.
 *
 * @param {DSProps} props - Component props.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.id] - HTML id attribute.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element} A div element acting as a container.
 */
export const Container = ({ children, className, id, style }: DSProps) => (
  <div
    className={cn("mx-auto max-w-5xl p-4 sm:p-6", className)}
    id={id}
    style={style}
  >
    {children}
  </div>
);
