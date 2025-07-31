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

interface DesignSystemContextValue {
  tokens: DesignTokens;
  updateToken: (key: keyof DesignTokens, value: string) => void;
  resetTokens: () => void;
  exportTokens: () => string;
  importTokens: (jsonString: string) => void;
}

const DesignSystemContext = React.createContext<DesignSystemContextValue | undefined>(undefined);

export function useDesignSystem() {
  const context = React.useContext(DesignSystemContext);
  if (!context) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider");
  }
  return context;
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = React.useState<DesignTokens>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("design-tokens");
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

  // Update CSS variables on the root element
  const updateCSSVariables = React.useCallback((tokens: DesignTokens) => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    
    // Typography sizes
    root.style.setProperty("--ds-text-xs", tokens.textXs);
    root.style.setProperty("--ds-text-sm", tokens.textSm);
    root.style.setProperty("--ds-text-base", tokens.textBase);
    root.style.setProperty("--ds-text-lg", tokens.textLg);
    root.style.setProperty("--ds-text-xl", tokens.textXl);
    root.style.setProperty("--ds-text-2xl", tokens.text2xl);
    root.style.setProperty("--ds-text-3xl", tokens.text3xl);
    root.style.setProperty("--ds-text-4xl", tokens.text4xl);
    root.style.setProperty("--ds-text-5xl", tokens.text5xl);
    
    // Also update responsive sizes for consistency
    root.style.setProperty("--ds-text-xl-sm", tokens.textXl);
    root.style.setProperty("--ds-text-2xl-sm", tokens.text2xl);
    root.style.setProperty("--ds-text-3xl-sm", tokens.text3xl);
    root.style.setProperty("--ds-text-4xl-sm", tokens.text4xl);
    root.style.setProperty("--ds-text-5xl-sm", tokens.text5xl);
    
    // Heading sizes
    root.style.setProperty("--ds-heading-1", tokens.heading1);
    root.style.setProperty("--ds-heading-2", tokens.heading2);
    root.style.setProperty("--ds-heading-3", tokens.heading3);
    root.style.setProperty("--ds-heading-4", tokens.heading4);
    root.style.setProperty("--ds-heading-5", tokens.heading5);
    root.style.setProperty("--ds-heading-6", tokens.heading6);
    
    // Also update responsive heading sizes
    root.style.setProperty("--ds-heading-1-sm", tokens.heading1);
    root.style.setProperty("--ds-heading-2-sm", tokens.heading2);
    root.style.setProperty("--ds-heading-3-sm", tokens.heading3);
    root.style.setProperty("--ds-heading-4-sm", tokens.heading4);
    root.style.setProperty("--ds-heading-5-sm", tokens.heading5);
    root.style.setProperty("--ds-heading-6-sm", tokens.heading6);
    
    // Spacing
    root.style.setProperty("--ds-space-1", tokens.space1);
    root.style.setProperty("--ds-space-2", tokens.space2);
    root.style.setProperty("--ds-space-4", tokens.space4);
    root.style.setProperty("--ds-space-6", tokens.space6);
    root.style.setProperty("--ds-space-8", tokens.space8);
    root.style.setProperty("--ds-space-12", tokens.space12);
    root.style.setProperty("--ds-space-16", tokens.space16);
    
    // Component specific
    root.style.setProperty("--ds-section-py", tokens.sectionPy);
    root.style.setProperty("--ds-container-p", tokens.containerP);
    root.style.setProperty("--ds-container-max-w", tokens.containerMaxW);
    
    // Update stack gap variables that reference space variables
    root.style.setProperty("--ds-stack-gap-xs", tokens.space1);
    root.style.setProperty("--ds-stack-gap-sm", tokens.space2);
    root.style.setProperty("--ds-stack-gap-md", tokens.space4);
    root.style.setProperty("--ds-stack-gap-lg", tokens.space6);
    root.style.setProperty("--ds-stack-gap-xl", tokens.space8);
    
    // Colors
    root.style.setProperty("--primary", tokens.primary);
    root.style.setProperty("--secondary", tokens.secondary);
    root.style.setProperty("--background", tokens.background);
    root.style.setProperty("--foreground", tokens.foreground);
    root.style.setProperty("--muted", tokens.muted);
    root.style.setProperty("--muted-foreground", tokens.mutedForeground);
    root.style.setProperty("--accent", tokens.accent);
    root.style.setProperty("--accent-foreground", tokens.accentForeground);
    root.style.setProperty("--destructive", tokens.destructive);
    root.style.setProperty("--border", tokens.border);
    root.style.setProperty("--radius", tokens.radius);
  }, []);

  // Update CSS variables whenever tokens change
  React.useEffect(() => {
    updateCSSVariables(tokens);
  }, [tokens, updateCSSVariables]);

  // Save to localStorage whenever tokens change
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("design-tokens", JSON.stringify(tokens));
    }
  }, [tokens]);

  const updateToken = React.useCallback((key: keyof DesignTokens, value: string) => {
    setTokens((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetTokens = React.useCallback(() => {
    setTokens(defaultTokens);
  }, []);

  const exportTokens = React.useCallback(() => {
    return JSON.stringify(tokens, null, 2);
  }, [tokens]);

  const importTokens = React.useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      setTokens({ ...defaultTokens, ...imported });
    } catch (error) {
      console.error("Failed to import tokens:", error);
      throw error;
    }
  }, []);

  const value = React.useMemo(
    () => ({
      tokens,
      updateToken,
      resetTokens,
      exportTokens,
      importTokens,
    }),
    [tokens, updateToken, resetTokens, exportTokens, importTokens]
  );

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}