"use client";

import * as React from "react";
import { Code, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./copy";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CodeDialogProps {
  code: string;
}

export const ViewCode: React.FC<CodeDialogProps> = ({ code }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            asChild
            className="absolute right-16 top-4 z-50"
            size="icon"
            variant="outline"
          >
            <span>
              <Code size={16} />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogTitle>Source Code</DialogTitle>
          <div>
            <SyntaxHighlighter
              language="tsx"
              className="h-full overflow-auto rounded-lg md:max-h-[720px]"
              style={atomDark}
              wrapLongLines
              showLineNumbers
              wrapLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
          <CopyButton textToCopy={code} />
        </DialogContent>
      </Dialog>
    </>
  );
};
