"use client";

import * as React from "react";
import { Code2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import CopyButton from "./copy";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CodeDialogProps {
  code: string;
}

export const ViewCode: React.FC<CodeDialogProps> = ({ code }) => {
  return (
    <Dialog>
      <DialogTrigger className="absolute right-16 top-14 z-50">
        <Button asChild size="icon" variant="outline">
          <span>
            <Code2 size={16} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogTitle>Source Code</DialogTitle>
        <SyntaxHighlighter
          language="tsx"
          className="overflow-auto rounded-lg md:max-h-[596px]"
          style={atomDark}
          wrapLongLines
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
        <CopyButton textToCopy={code} />
      </DialogContent>
    </Dialog>
  );
};
