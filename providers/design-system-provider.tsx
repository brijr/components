"use client";

import * as React from "react";

interface DesignTokens {
  // Typography
  textXs: string;
  textSm: string;
  textBase: string;
  textLg: string;
  textXl: string;
  text2xl: string;
  text3xl: string;
  text4xl: string;
  text5xl: string;
  
  // Heading sizes
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  heading5: string;
  heading6: string;
  
  // Spacing
  space1: string;
  space2: string;
  space4: string;
  space6: string;
  space8: string;
  space12: string;
  space16: string;
  
  // Component specific
  sectionPy: string;
  containerP: string;
  containerMaxW: string;
  
  // Colors (from globals.css)
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  radius: string;
}

const defaultTokens: DesignTokens = {
  // Typography
  textXs: "0.75rem",
  textSm: "0.875rem",
  textBase: "1rem",
  textLg: "1.125rem",
  textXl: "1.25rem",
  text2xl: "1.5rem",
  text3xl: "1.875rem",
  text4xl: "2.25rem",
  text5xl: "3rem",
  
  // Heading sizes
  heading1: "2.25rem",
  heading2: "1.875rem",
  heading3: "1.5rem",
  heading4: "1.25rem",
  heading5: "1.125rem",
  heading6: "1rem",
  
  // Spacing
  space1: "0.25rem",
  space2: "0.5rem",
  space4: "1rem",
  space6: "1.5rem",
  space8: "2rem",
  space12: "3rem",
  space16: "4rem",
  
  // Component specific
  sectionPy: "1rem",
  containerP: "1rem",
  containerMaxW: "64rem",
  
  // Colors (default values from globals.css)
  primary: "oklch(0.205 0 0)",
  secondary: "oklch(0.97 0 0)",
  background: "oklch(1 0 0)",
  foreground: "oklch(0.145 0 0)",
  muted: "oklch(0.97 0 0)",
  mutedForeground: "oklch(0.556 0 0)",
  accent: "oklch(0.97 0 0)",
  accentForeground: "oklch(0.205 0 0)",
  destructive: "oklch(0.577 0.245 27.325)",
  border: "oklch(0.922 0 0)",
  radius: "0.625rem",
};

interface DesignSystemContextType {
  tokens: DesignTokens;
  updateToken: (key: keyof DesignTokens, value: string) => void;
  updateTokens: (tokens: Partial<DesignTokens>) => void;
  resetTokens: () => void;
  exportTokens: () => string;
  importTokens: (tokensJson: string) => void;
}

const DesignSystemContext = React.createContext<DesignSystemContextType | undefined>(undefined);

export function useDesignSystem() {
  const context = React.useContext(DesignSystemContext);
  if (!context) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider");
  }
  return context;
}

interface DesignSystemProviderProps {
  children: React.ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  const [tokens, setTokens] = React.useState<DesignTokens>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("design-system-tokens");
      if (saved) {
        try {
          return { ...defaultTokens, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse saved tokens:", e);
        }
      }
    }
    return defaultTokens;
  });

  const updateCSSVariable = (name: string, value: string) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(`--${name}`, value);
    }
  };
  
  // Create or update a style element for dynamic color overrides
  const updateDynamicStyles = React.useCallback(() => {
    if (typeof window === "undefined") return;
    
    let styleEl = document.getElementById("design-system-dynamic-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "design-system-dynamic-styles";
      document.head.appendChild(styleEl);
    }
    
    // Generate CSS that directly uses the CSS variables
    const dynamicCSS = `
      /* Dynamic color overrides */
      .text-primary { color: var(--primary) !important; }
      .bg-primary { background-color: var(--primary) !important; }
      .border-primary { border-color: var(--primary) !important; }
      
      .text-secondary { color: var(--secondary) !important; }
      .bg-secondary { background-color: var(--secondary) !important; }
      .border-secondary { border-color: var(--secondary) !important; }
      
      .text-background { color: var(--background) !important; }
      .bg-background { background-color: var(--background) !important; }
      .border-background { border-color: var(--background) !important; }
      
      .text-foreground { color: var(--foreground) !important; }
      .bg-foreground { background-color: var(--foreground) !important; }
      .border-foreground { border-color: var(--foreground) !important; }
      
      .text-muted { color: var(--muted) !important; }
      .bg-muted { background-color: var(--muted) !important; }
      .border-muted { border-color: var(--muted) !important; }
      
      .text-muted-foreground { color: var(--muted-foreground) !important; }
      .bg-muted-foreground { background-color: var(--muted-foreground) !important; }
      .border-muted-foreground { border-color: var(--muted-foreground) !important; }
      
      .text-accent { color: var(--accent) !important; }
      .bg-accent { background-color: var(--accent) !important; }
      .border-accent { border-color: var(--accent) !important; }
      
      .text-accent-foreground { color: var(--accent-foreground) !important; }
      .bg-accent-foreground { background-color: var(--accent-foreground) !important; }
      .border-accent-foreground { border-color: var(--accent-foreground) !important; }
      
      .text-destructive { color: var(--destructive) !important; }
      .bg-destructive { background-color: var(--destructive) !important; }
      .border-destructive { border-color: var(--destructive) !important; }
      
      .text-border { color: var(--border) !important; }
      .bg-border { background-color: var(--border) !important; }
      .border-border { border-color: var(--border) !important; }
      
      .border { border-color: var(--border) !important; }
      .bg-card { background-color: var(--card) !important; }
      .bg-popover { background-color: var(--popover) !important; }
      .text-card-foreground { color: var(--card-foreground) !important; }
      .text-popover-foreground { color: var(--popover-foreground) !important; }
      .text-primary-foreground { color: var(--primary-foreground) !important; }
      .text-secondary-foreground { color: var(--secondary-foreground) !important; }
      .text-destructive-foreground { color: var(--destructive-foreground) !important; }
      
      /* Common background utilities */
      .bg-background/5 { background-color: color-mix(in oklch, var(--background) 5%, transparent) !important; }
      .bg-background/10 { background-color: color-mix(in oklch, var(--background) 10%, transparent) !important; }
      .bg-background/20 { background-color: color-mix(in oklch, var(--background) 20%, transparent) !important; }
      .bg-background/30 { background-color: color-mix(in oklch, var(--background) 30%, transparent) !important; }
      .bg-background/40 { background-color: color-mix(in oklch, var(--background) 40%, transparent) !important; }
      .bg-background/50 { background-color: color-mix(in oklch, var(--background) 50%, transparent) !important; }
      .bg-background/60 { background-color: color-mix(in oklch, var(--background) 60%, transparent) !important; }
      .bg-background/70 { background-color: color-mix(in oklch, var(--background) 70%, transparent) !important; }
      .bg-background/80 { background-color: color-mix(in oklch, var(--background) 80%, transparent) !important; }
      .bg-background/90 { background-color: color-mix(in oklch, var(--background) 90%, transparent) !important; }
      
      .bg-primary/5 { background-color: color-mix(in oklch, var(--primary) 5%, transparent) !important; }
      .bg-primary/10 { background-color: color-mix(in oklch, var(--primary) 10%, transparent) !important; }
      .bg-primary/20 { background-color: color-mix(in oklch, var(--primary) 20%, transparent) !important; }
      .bg-primary/30 { background-color: color-mix(in oklch, var(--primary) 30%, transparent) !important; }
      .bg-primary/40 { background-color: color-mix(in oklch, var(--primary) 40%, transparent) !important; }
      .bg-primary/50 { background-color: color-mix(in oklch, var(--primary) 50%, transparent) !important; }
      
      .bg-accent/5 { background-color: color-mix(in oklch, var(--accent) 5%, transparent) !important; }
      .bg-accent/10 { background-color: color-mix(in oklch, var(--accent) 10%, transparent) !important; }
      .bg-accent/20 { background-color: color-mix(in oklch, var(--accent) 20%, transparent) !important; }
      .bg-accent/30 { background-color: color-mix(in oklch, var(--accent) 30%, transparent) !important; }
      .bg-accent/40 { background-color: color-mix(in oklch, var(--accent) 40%, transparent) !important; }
      .bg-accent/50 { background-color: color-mix(in oklch, var(--accent) 50%, transparent) !important; }
      
      .bg-muted/5 { background-color: color-mix(in oklch, var(--muted) 5%, transparent) !important; }
      .bg-muted/10 { background-color: color-mix(in oklch, var(--muted) 10%, transparent) !important; }
      .bg-muted/20 { background-color: color-mix(in oklch, var(--muted) 20%, transparent) !important; }
      .bg-muted/30 { background-color: color-mix(in oklch, var(--muted) 30%, transparent) !important; }
      .bg-muted/40 { background-color: color-mix(in oklch, var(--muted) 40%, transparent) !important; }
      .bg-muted/50 { background-color: color-mix(in oklch, var(--muted) 50%, transparent) !important; }
      .bg-muted/60 { background-color: color-mix(in oklch, var(--muted) 60%, transparent) !important; }
      .bg-muted/70 { background-color: color-mix(in oklch, var(--muted) 70%, transparent) !important; }
      .bg-muted/80 { background-color: color-mix(in oklch, var(--muted) 80%, transparent) !important; }
      .bg-muted/90 { background-color: color-mix(in oklch, var(--muted) 90%, transparent) !important; }
      
      /* Ring utilities */
      .ring-primary { --tw-ring-color: var(--primary) !important; }
      .ring-secondary { --tw-ring-color: var(--secondary) !important; }
      .ring-accent { --tw-ring-color: var(--accent) !important; }
      .ring-muted { --tw-ring-color: var(--muted) !important; }
      .ring-destructive { --tw-ring-color: var(--destructive) !important; }
      .ring-border { --tw-ring-color: var(--border) !important; }
      
      /* Focus utilities */
      .focus-visible\\:ring-primary:focus-visible { --tw-ring-color: var(--primary) !important; }
      .focus-visible\\:ring-secondary:focus-visible { --tw-ring-color: var(--secondary) !important; }
      .focus-visible\\:ring-accent:focus-visible { --tw-ring-color: var(--accent) !important; }
      
      /* Dark mode utilities */
      .dark\\:text-primary:is(.dark *) { color: var(--primary) !important; }
      .dark\\:bg-primary:is(.dark *) { background-color: var(--primary) !important; }
      .dark\\:border-primary:is(.dark *) { border-color: var(--primary) !important; }
      
      /* Hover utilities */
      .hover\\:text-primary:hover { color: var(--primary) !important; }
      .hover\\:bg-primary:hover { background-color: var(--primary) !important; }
      .hover\\:border-primary:hover { border-color: var(--primary) !important; }
      
      .hover\\:text-accent:hover { color: var(--accent) !important; }
      .hover\\:bg-accent:hover { background-color: var(--accent) !important; }
      .hover\\:border-accent:hover { border-color: var(--accent) !important; }
      
      .hover\\:text-muted:hover { color: var(--muted) !important; }
      .hover\\:bg-muted:hover { background-color: var(--muted) !important; }
      .hover\\:border-muted:hover { border-color: var(--muted) !important; }
    `;
    
    styleEl.textContent = dynamicCSS;
  }, []);

  const updateToken = React.useCallback((key: keyof DesignTokens, value: string) => {
    setTokens((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("design-system-tokens", JSON.stringify(updated));
      
      // Update CSS variable
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border"].includes(key)) {
        // Convert camelCase to kebab-case for CSS variable names
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        updateCSSVariable(kebabKey, value);
        
        // Also update card and popover colors which use the same as background/foreground
        if (key === "background") {
          updateCSSVariable("card", value);
          updateCSSVariable("popover", value);
        }
        if (key === "foreground") {
          updateCSSVariable("card-foreground", value);
          updateCSSVariable("popover-foreground", value);
        }
        if (key === "primary") {
          updateCSSVariable("primary-foreground", "oklch(0.985 0 0)");
        }
        if (key === "secondary") {
          updateCSSVariable("secondary-foreground", "oklch(0.205 0 0)");
        }
        if (key === "destructive") {
          updateCSSVariable("destructive-foreground", "oklch(0.985 0 0)");
        }
      }
      
      return updated;
    });
    
    // Update dynamic styles after state change
    updateDynamicStyles();
  }, [updateDynamicStyles]);

  const updateTokens = React.useCallback((newTokens: Partial<DesignTokens>) => {
    setTokens((prev) => {
      const updated = { ...prev, ...newTokens };
      localStorage.setItem("design-system-tokens", JSON.stringify(updated));
      
      // Update all CSS variables
      Object.entries(newTokens).forEach(([key, value]) => {
        const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
        updateCSSVariable(cssVarName, value);
        
        // Special handling for color variables
        if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border"].includes(key)) {
          updateCSSVariable(key.replace(/([A-Z])/g, "-$1").toLowerCase(), value);
        }
      });
      
      return updated;
    });
    
    // Update dynamic styles after state change
    updateDynamicStyles();
  }, [updateDynamicStyles]);

  const resetTokens = React.useCallback(() => {
    setTokens(defaultTokens);
    localStorage.removeItem("design-system-tokens");
    
    // Reset all CSS variables
    Object.entries(defaultTokens).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border"].includes(key)) {
        // Convert camelCase to kebab-case for CSS variable names
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        updateCSSVariable(kebabKey, value);
        
        // Also update card and popover colors which use the same as background/foreground
        if (key === "background") {
          updateCSSVariable("card", value);
          updateCSSVariable("popover", value);
        }
        if (key === "foreground") {
          updateCSSVariable("card-foreground", value);
          updateCSSVariable("popover-foreground", value);
        }
        if (key === "primary") {
          updateCSSVariable("primary-foreground", "oklch(0.985 0 0)");
        }
        if (key === "secondary") {
          updateCSSVariable("secondary-foreground", "oklch(0.205 0 0)");
        }
        if (key === "destructive") {
          updateCSSVariable("destructive-foreground", "oklch(0.985 0 0)");
        }
      }
    });
    
    // Update dynamic styles after state change  
    updateDynamicStyles();
  }, [updateDynamicStyles]);

  const exportTokens = React.useCallback(() => {
    return JSON.stringify(tokens, null, 2);
  }, [tokens]);

  const importTokens = React.useCallback((tokensJson: string) => {
    try {
      const imported = JSON.parse(tokensJson);
      updateTokens(imported);
    } catch (e) {
      console.error("Failed to import tokens:", e);
      throw new Error("Invalid JSON format");
    }
  }, [updateTokens]);

  // Apply tokens on mount and create dynamic styles
  React.useEffect(() => {
    Object.entries(tokens).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border", "radius"].includes(key)) {
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        updateCSSVariable(kebabKey, value);
        
        // Also update card and popover colors which use the same as background/foreground
        if (key === "background") {
          updateCSSVariable("card", value);
          updateCSSVariable("popover", value);
        }
        if (key === "foreground") {
          updateCSSVariable("card-foreground", value);
          updateCSSVariable("popover-foreground", value);
        }
        if (key === "primary") {
          updateCSSVariable("primary-foreground", "oklch(0.985 0 0)");
        }
        if (key === "secondary") {
          updateCSSVariable("secondary-foreground", "oklch(0.205 0 0)");
        }
        if (key === "destructive") {
          updateCSSVariable("destructive-foreground", "oklch(0.985 0 0)");
        }
      }
    });
    
    // Create dynamic styles on mount
    updateDynamicStyles();
  }, [tokens, updateDynamicStyles]);

  return (
    <DesignSystemContext.Provider
      value={{
        tokens,
        updateToken,
        updateTokens,
        resetTokens,
        exportTokens,
        importTokens,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
}