"use client";

import * as React from "react";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text, Heading } from "@/components/ds";

interface SizeSliderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  preview?: React.ReactNode;
}

function SizeSlider({ label, value, onChange, min = 0.5, max = 5, step = 0.125, preview }: SizeSliderProps) {
  const numValue = parseFloat(value);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm font-mono text-muted-foreground">{value}</span>
      </div>
      <Slider
        value={[numValue]}
        onValueChange={([v]) => onChange(`${v}rem`)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      {preview && (
        <div className="rounded border p-3 bg-muted/20">
          {preview}
        </div>
      )}
    </div>
  );
}

export function TypographySection() {
  const { tokens, updateToken } = useDesignSystem();

  const typographyGroups = [
    {
      title: "Heading Sizes",
      description: "Control the size of heading elements",
      sizes: [
        {
          key: "heading1",
          label: "Heading 1",
          preview: <Heading level={1}>Main Page Title</Heading>,
          min: 2,
          max: 4,
          step: 0.125,
        },
        {
          key: "heading2",
          label: "Heading 2",
          preview: <Heading level={2}>Section Title</Heading>,
          min: 1.5,
          max: 3,
          step: 0.125,
        },
        {
          key: "heading3",
          label: "Heading 3",
          preview: <Heading level={3}>Subsection Title</Heading>,
          min: 1.25,
          max: 2.5,
          step: 0.125,
        },
        {
          key: "heading4",
          label: "Heading 4",
          preview: <Heading level={4}>Card Title</Heading>,
          min: 1,
          max: 2,
          step: 0.0625,
        },
        {
          key: "heading5",
          label: "Heading 5",
          preview: <Heading level={5}>Small Heading</Heading>,
          min: 0.875,
          max: 1.5,
          step: 0.0625,
        },
        {
          key: "heading6",
          label: "Heading 6",
          preview: <Heading level={6}>Tiny Heading</Heading>,
          min: 0.75,
          max: 1.25,
          step: 0.0625,
        },
      ],
    },
    {
      title: "Text Sizes",
      description: "Control the size of text elements",
      sizes: [
        {
          key: "textXs",
          label: "Text XS",
          preview: <Text variant="caption">Extra small text for captions</Text>,
          min: 0.5,
          max: 1,
          step: 0.0625,
        },
        {
          key: "textSm",
          label: "Text SM",
          preview: <Text variant="small">Small text for secondary content</Text>,
          min: 0.625,
          max: 1.125,
          step: 0.0625,
        },
        {
          key: "textBase",
          label: "Text Base",
          preview: <Text>Default body text size</Text>,
          min: 0.75,
          max: 1.5,
          step: 0.0625,
        },
        {
          key: "textLg",
          label: "Text LG",
          preview: <Text variant="large">Large text for emphasis</Text>,
          min: 1,
          max: 2,
          step: 0.125,
        },
        {
          key: "textXl",
          label: "Text XL",
          preview: <Text variant="lead">Extra large lead text</Text>,
          min: 1.125,
          max: 2.5,
          step: 0.125,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {typographyGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-base">{group.title}</CardTitle>
            <CardDescription className="text-xs">{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {group.sizes.map((size) => (
              <SizeSlider
                key={size.key}
                label={size.label}
                value={tokens[size.key as keyof typeof tokens] as string}
                onChange={(value) => updateToken(size.key as keyof typeof tokens, value)}
                preview={size.preview}
                min={size.min}
                max={size.max}
                step={size.step}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}