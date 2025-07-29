"use client";

import { useState } from "react";
import { Code } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CodeSheet } from "./code-sheet";

interface ViewCodeButtonProps {
  filePath: string;
  componentName: string;
}

export function ViewCodeButton({
  filePath,
  componentName,
}: ViewCodeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <Code size={16} />
        <span className="sr-only">View code</span>
      </Button>
      <SheetContent
        side="right"
        className="w-[90%] sm:w-[80%] sm:max-w-4xl p-0 gap-0"
      >
        <SheetHeader className="border-b">
          <SheetTitle>{componentName}</SheetTitle>
          <SheetDescription>
            Component source code from {filePath}
          </SheetDescription>
        </SheetHeader>
        <CodeSheet filePath={filePath} />
      </SheetContent>
    </Sheet>
  );
}
