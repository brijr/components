/**
 * Shared types for design system components
 */

import * as React from "react";

/**
 * Props for layout components.
 *
 * @typedef {Object} DSProps
 * @property {string} [className] - Additional class names.
 * @property {React.ReactNode} [children] - Child elements to render.
 * @property {string} [id] - HTML id attribute.
 * @property {React.CSSProperties} [style] - Inline styles for the element.
 * @property {{ __html: string }} [dangerouslySetInnerHTML] - HTML content to set dangerously.
 * @property {string} [containerClassName] - Additional class names for inner container elements.
 * @property {boolean} [isArticle] - If true, renders the element as an article.
 * @property {boolean} [isSpaced] - If true, adds spacing between children elements.
 */

export type DSProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  dangerouslySetInnerHTML?: { __html: string };
  containerClassName?: string;
  isArticle?: boolean;
  isSpaced?: boolean;
};
