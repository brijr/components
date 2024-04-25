"use client";

import * as React from "react";
import { Code, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

interface CodeDialogProps {
  code: string;
}

export const ViewCode: React.FC<CodeDialogProps> = ({ code }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        className="absolute right-16 top-4 z-50"
        size="icon"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Code size={16} />
        <span className="sr-only">{isOpen ? "Close Code" : "View Code"}</span>
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            transition={{ duration: 0.4, ease: "easeOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bg-background/50 z-20 backdrop-blur-md h-full w-full not-prose overflow-none px-4 pt-16 pb-6"
          >
            <Button
              variant="outline"
              className="absolute left-4 top-4 z-10"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
            <SyntaxHighlighter
              language="tsx"
              className="overflow-auto h-full md:max-h-[720px] rounded-lg"
              style={atomDark}
              showLineNumbers
              wrapLines
            >
              {code}
            </SyntaxHighlighter>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
