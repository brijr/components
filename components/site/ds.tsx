import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helpers

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types

type SharedProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  dangerouslySetInnerHTML?: { __html: string };
  containerClassName?: string;
  isArticle?: boolean;
  isSpaced?: boolean;
};


type HeaderProps = SharedProps & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

type GridProps = SharedProps & {
  columns?: 1 | 2 | 3 | 4;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
};

type FlexProps = SharedProps & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: boolean;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
};

// Styles

const headingStyles = {
  h1: "text-4xl sm:text-5xl font-medium tracking-tight text-balance",
  h2: "text-3xl sm:text-4xl font-medium tracking-tight text-balance",
  h3: "text-2xl sm:text-3xl font-medium tracking-tight text-balance",
  h4: "text-xl sm:text-2xl tracking-tight text-balance",
  h5: "text-lg sm:text-xl tracking-tight text-balance",
  h6: "text-base sm:text-lg tracking-tight text-balance",
};

// Components


export const Main = ({ 
  children, 
  className, 
  id, 
  style
}: SharedProps) => {
  return (
    <main 
      className={cn(className)} 
      id={id} 
      style={style}
    >
      {children}
    </main>
  );
};

export const Nav = ({
  children,
  className,
  id,
  style,
  containerClassName,
}: SharedProps) => (
  <nav className={cn(className)} id={id} style={style}>
    <div
      id="nav-container"
      className={cn("max-w-5xl mx-auto px-4 sm:px-6 py-2", containerClassName)}
    >
      {children}
    </div>
  </nav>
);

export const Section = ({ children, className, id, style }: SharedProps) => (
  <section className={cn("py-2 sm:py-4", className)} id={id} style={style}>
    {children}
  </section>
);

export const Container = ({ children, className, id, style }: SharedProps) => (
  <div
    className={cn("max-w-5xl mx-auto p-4 sm:p-6", className)}
    id={id}
    style={style}
  >
    {children}
  </div>
);

export const Header = ({
  children,
  className,
  id,
  style,
  as = "h1",
}: HeaderProps) => {
  const Component = as;

  return (
    <Component
      className={cn(
        headingStyles[as],
        className
      )}
      id={id}
      style={style}
    >
      {children}
    </Component>
  );
};

export const Grid = ({
  children,
  className,
  id,
  style,
  columns = 1,
  gap = 4,
}: GridProps) => {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  return (
    <div
      className={cn("grid", gapClasses[gap], gridColumns[columns], className)}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export const Flex = ({
  children,
  className,
  id,
  style,
  direction = "row",
  wrap = false,
  justify = "start",
  align = "stretch",
  gap = 4,
}: FlexProps) => {
  const flexDirection = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  const justifyContent = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignItems = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  return (
    <div
      className={cn(
        "flex",
        gapClasses[gap],
        flexDirection[direction],
        wrap && "flex-wrap",
        justifyContent[justify],
        alignItems[align],
        className
      )}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export const Prose = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
  style,
  isArticle = false,
  isSpaced = false,
}: SharedProps) => {
  const Component = isArticle ? "article" : "div";

  return (
    <Component
      className={cn(
        // Base classes
        "antialiased text-base leading-7",
        // Heading styles
        "[&_h1]:text-4xl sm:[&_h1]:text-5xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-balance",
        "[&_h2]:text-3xl sm:[&_h2]:text-4xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-balance",
        "[&_h3]:text-2xl sm:[&_h3]:text-3xl [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-balance",
        "[&_h4]:text-xl sm:[&_h4]:text-2xl [&_h4]:tracking-tight [&_h4]:text-balance",
        "[&_h5]:text-lg sm:[&_h5]:text-xl [&_h5]:tracking-tight [&_h5]:text-balance",
        "[&_h6]:text-base sm:[&_h6]:text-lg [&_h6]:tracking-tight [&_h6]:text-balance",
        // Paragraph styles
        "[&_p]:text-pretty [&_p]:text-base",
        // Inline text styles
        "[&_strong]:font-semibold",
        "[&_muted]:text-muted-foreground",
        "[&_em]:italic",
        "[&_del]:line-through",
        "[&_small]:text-sm [&_small]:leading-snug",
        "[&_sub]:text-sm [&_sub]:align-baseline [&_sup]:text-sm [&_sup]:align-baseline",
        // Links (except in headings)
        "[&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:text-primary dark:[&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:text-primary/50 [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:transition-all [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:no-underline [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:hover:underline [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:hover:text-primary/100 [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:underline-offset-2 [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:decoration-primary/50 [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:focus-visible:outline-hidden [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:focus-visible:ring-2 [&_a:not(h1_a,h2_a,h3_a,h4_a,h5_a,h6_a)]:focus-visible:ring-primary/50",
        // Lists
        "[&_ul]:pl-0 [&_ul]:py-3 [&_ul]:list-none [&_ul]:space-y-1",
        "[&_ul>li]:relative [&_ul>li]:pl-6",
        "[&_ul>li]:before:absolute [&_ul>li]:before:left-1 [&_ul>li]:before:top-[0.6875em] [&_ul>li]:before:h-1.5 [&_ul>li]:before:w-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-foreground/80 [&_ul>li]:before:content-['']",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:py-3 [&_ol]:space-y-1",
        "[&_ol>ol]:list-[lower-alpha]",
        "[&_ol>ol>ol]:list-[lower-roman]",
        // Definition list
        "[&_dl]:py-3 [&_dl]:space-y-1",
        "[&_dt]:font-medium [&_dt]:text-sm [&_dt]:leading-snug [&_dt:not(:first-child)]:mt-3",
        "[&_dd]:text-sm [&_dd]:leading-snug [&_dd]:text-muted-foreground",
        // List item base styling
        "[&_li]:pl-2 [&_li]:marker:text-foreground/80",
        "[&_li>ul]:mt-2 [&_li>ul]:mb-0 [&_li>ol]:mt-2 [&_li>ol]:mb-0",
        "[&_ul>ul>li]:before:bg-foreground/60",
        "[&_ul>ul>ul>li]:before:bg-foreground/40",
        // Code blocks
        "[&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:border [&_code:not(pre_code)]:bg-muted/50 [&_code:not(pre_code)]:px-1 [&_code:not(pre_code)]:py-px [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-medium",
        // Title code blocks
        "[&_h1>code:not(pre_code)]:text-inherit [&_h1>code:not(pre_code)]:tracking-tight",
        "[&_h2>code:not(pre_code)]:text-inherit [&_h2>code:not(pre_code)]:tracking-tight",
        "[&_h3>code:not(pre_code)]:text-inherit [&_h3>code:not(pre_code)]:tracking-tight",
        "[&_h4>code:not(pre_code)]:text-inherit [&_h4>code:not(pre_code)]:tracking-tight",
        "[&_h5>code:not(pre_code)]:text-inherit [&_h5>code:not(pre_code)]:tracking-tight",
        "[&_h6>code:not(pre_code)]:text-inherit [&_h6>code:not(pre_code)]:tracking-tight",
        // Specific heading code block sizes
        "[&_h1>code:not(pre_code)]:text-4xl sm:[&_h1>code:not(pre_code)]:text-5xl",
        "[&_h2>code:not(pre_code)]:text-3xl sm:[&_h2>code:not(pre_code)]:text-4xl",
        "[&_h3>code:not(pre_code)]:text-2xl sm:[&_h3>code:not(pre_code)]:text-3xl",
        "[&_h4>code:not(pre_code)]:text-xl sm:[&_h4>code:not(pre_code)]:text-2xl",
        "[&_h5>code:not(pre_code)]:text-lg sm:[&_h5>code:not(pre_code)]:text-xl",
        "[&_h6>code:not(pre_code)]:text-base sm:[&_h6>code:not(pre_code)]:text-lg",
        // Pre blocks
        "[&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:my-4",
        "[&_pre>code]:bg-transparent [&_pre>code]:p-0",
        // Tables
        "[&_table]:w-full [&_table]:my-4 [&_table]:overflow-hidden [&_table]:rounded-sm [&_table]:border",
        "[&_thead]:bg-muted/50",
        "[&_tr]:border-b [&_tr:nth-child(even)]:bg-muted/20",
        "[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:border-r",
        "[&_td]:px-4 [&_td]:py-2 [&_td]:border-r",
        // Media
        "[&_img]:border [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-sm",
        "[&_video]:border [&_video]:my-4 [&_video]:max-w-full [&_video]:h-auto [&_video]:rounded-sm",
        "[&_figure]:my-4",
        "[&_figcaption]:text-sm [&_figcaption]:mb-6! [&_figcaption]:text-muted-foreground",
        // Block elements
        "[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4! [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground [&_blockquote]:bg-muted/30",
        "[&_hr]:my-8! [&_hr]:border-t-2 [&_hr]:border-border/50",
        "[&_p:has(>hr)]:my-8! [&_p:has(>hr)]:border-t-2 [&_p:has(>hr)]:border-border/50",
        "[&_details]:rounded-sm [&_details]:border [&_details]:px-4 [&_details]:py-2 [&_details]:my-4",
        "[&_summary]:cursor-pointer [&_summary]:font-semibold focus-visible:[&_summary]:outline-hidden",
        // Interactive elements
        "[&_kbd]:rounded-sm [&_kbd]:border [&_kbd]:bg-muted [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:text-sm [&_kbd]:font-mono [&_kbd]:shadow-xs [&_kbd]:align-middle",
        // Abbreviations
        "[&_abbr]:border-b [&_abbr]:border-dotted [&_abbr]:decoration-muted-foreground [&_abbr]:underline-offset-2 [&_abbr]:cursor-help",
        isArticle && "max-w-prose",
        // Space between children
        isSpaced ? "space-y-6" : "",
        // Heading spacing
        isSpaced ? "[&_h1:not(:first-child)]:mt-8 [&_h1]:mb-4" : "",
        isSpaced ? "[&_h2:not(:first-child)]:mt-8 [&_h2]:mb-4" : "",
        isSpaced ? "[&_h3:not(:first-child)]:mt-6 [&_h3]:mb-3" : "",
        isSpaced ? "[&_h4:not(:first-child)]:mt-6 [&_h4]:mb-3" : "",
        isSpaced ? "[&_h5:not(:first-child)]:mt-6 [&_h5]:mb-2" : "",
        isSpaced ? "[&_h6:not(:first-child)]:mt-4 [&_h6]:mb-2" : "",
        className
      )}
      id={id}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      style={style}
    >
      {children}
    </Component>
  );
};
