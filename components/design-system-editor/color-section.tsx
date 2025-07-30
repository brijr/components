"use client";

import * as React from "react";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

function ColorInput({ label, value, onChange, description }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={label} className="text-sm font-medium">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded border"
            style={{ backgroundColor: value }}
          />
          <Input
            id={label}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-40 font-mono text-xs"
            placeholder="oklch(0.5 0.2 120)"
          />
        </div>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function ColorSection() {
  const { tokens, updateToken } = useDesignSystem();

  const colorGroups = [
    {
      title: "Primary Colors",
      description: "Main brand and UI colors",
      colors: [
        { key: "primary", label: "Primary", description: "Main brand color" },
        { key: "secondary", label: "Secondary", description: "Secondary brand color" },
        { key: "accent", label: "Accent", description: "Accent color for highlights" },
        { key: "destructive", label: "Destructive", description: "Error and warning states" },
      ],
    },
    {
      title: "Background & Foreground",
      description: "Base colors for content and surfaces",
      colors: [
        { key: "background", label: "Background", description: "Main background color" },
        { key: "foreground", label: "Foreground", description: "Main text color" },
        { key: "muted", label: "Muted", description: "Muted background color" },
        { key: "mutedForeground", label: "Muted Foreground", description: "Muted text color" },
      ],
    },
    {
      title: "UI Elements",
      description: "Colors for borders and UI components",
      colors: [
        { key: "border", label: "Border", description: "Default border color" },
        { key: "radius", label: "Border Radius", description: "Default border radius" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {colorGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-base">{group.title}</CardTitle>
            <CardDescription className="text-xs">{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.colors.map((color) => (
              <ColorInput
                key={color.key}
                label={color.label}
                value={tokens[color.key as keyof typeof tokens] as string}
                onChange={(value) => updateToken(color.key as keyof typeof tokens, value)}
                description={color.description}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}