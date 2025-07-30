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

  const updateToken = React.useCallback((key: keyof DesignTokens, value: string) => {
    setTokens((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("design-system-tokens", JSON.stringify(updated));
      
      // Update CSS variable
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border"].includes(key)) {
        updateCSSVariable(key.replace(/([A-Z])/g, "-$1").toLowerCase(), value);
      }
      
      return updated;
    });
  }, []);

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
  }, []);

  const resetTokens = React.useCallback(() => {
    setTokens(defaultTokens);
    localStorage.removeItem("design-system-tokens");
    
    // Reset all CSS variables
    Object.entries(defaultTokens).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border"].includes(key)) {
        updateCSSVariable(key.replace(/([A-Z])/g, "-$1").toLowerCase(), value);
      }
    });
  }, []);

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

  // Apply tokens on mount
  React.useEffect(() => {
    Object.entries(tokens).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "ds-");
      updateCSSVariable(cssVarName, value);
      
      // Special handling for color variables
      if (["primary", "secondary", "background", "foreground", "muted", "mutedForeground", "accent", "accentForeground", "destructive", "border", "radius"].includes(key)) {
        updateCSSVariable(key.replace(/([A-Z])/g, "-$1").toLowerCase(), value);
      }
    });
  }, [tokens]);

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