"use client";

import * as React from "react";
import { useDesignSystem } from "@/providers/design-system-provider";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stack, Section, Container } from "@/components/ds";

interface SpacingSliderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  preview?: React.ReactNode;
}

function SpacingSlider({ label, value, onChange, min = 0, max = 8, step = 0.25, preview }: SpacingSliderProps) {
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

export function SpacingSection() {
  const { tokens, updateToken } = useDesignSystem();

  const spacingGroups = [
    {
      title: "Base Spacing Scale",
      description: "Control the spacing scale used throughout the design system",
      spaces: [
        {
          key: "space1",
          label: "Space 1 (xs)",
          preview: (
            <Stack spacing="xs">
              <div className="h-8 rounded bg-primary/20" />
              <div className="h-8 rounded bg-primary/20" />
            </Stack>
          ),
          min: 0,
          max: 1,
          step: 0.125,
        },
        {
          key: "space2",
          label: "Space 2 (sm)",
          preview: (
            <Stack spacing="sm">
              <div className="h-8 rounded bg-primary/20" />
              <div className="h-8 rounded bg-primary/20" />
            </Stack>
          ),
          min: 0,
          max: 2,
          step: 0.125,
        },
        {
          key: "space4",
          label: "Space 4 (md)",
          preview: (
            <Stack spacing="md">
              <div className="h-8 rounded bg-primary/20" />
              <div className="h-8 rounded bg-primary/20" />
            </Stack>
          ),
          min: 0,
          max: 3,
          step: 0.25,
        },
        {
          key: "space6",
          label: "Space 6 (lg)",
          preview: (
            <Stack spacing="lg">
              <div className="h-8 rounded bg-primary/20" />
              <div className="h-8 rounded bg-primary/20" />
            </Stack>
          ),
          min: 0,
          max: 4,
          step: 0.25,
        },
        {
          key: "space8",
          label: "Space 8 (xl)",
          preview: (
            <Stack spacing="xl">
              <div className="h-8 rounded bg-primary/20" />
              <div className="h-8 rounded bg-primary/20" />
            </Stack>
          ),
          min: 0,
          max: 6,
          step: 0.5,
        },
      ],
    },
    {
      title: "Component Spacing",
      description: "Control spacing for Section and Container components",
      spaces: [
        {
          key: "sectionPy",
          label: "Section Vertical Padding",
          preview: (
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded" />
              <Section className="relative">
                <div className="h-12 rounded bg-primary/20" />
              </Section>
            </div>
          ),
          min: 0,
          max: 4,
          step: 0.25,
        },
        {
          key: "containerP",
          label: "Container Padding",
          preview: (
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded" />
              <Container className="relative">
                <div className="h-12 rounded bg-primary/20" />
              </Container>
            </div>
          ),
          min: 0,
          max: 4,
          step: 0.25,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {spacingGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-base">{group.title}</CardTitle>
            <CardDescription className="text-xs">{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {group.spaces.map((space) => (
              <SpacingSlider
                key={space.key}
                label={space.label}
                value={tokens[space.key as keyof typeof tokens] as string}
                onChange={(value) => updateToken(space.key as keyof typeof tokens, value)}
                preview={space.preview}
                min={space.min}
                max={space.max}
                step={space.step}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}