"use client";

import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type CopyButtonProps = {
  textToCopy: string;
  className?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className }) => {
  const [copyStatus, setCopyStatus] = React.useState(
    <>
      <span className="sr sr-only mr-1 text-xs lowercase">Copy Code</span>
      <Copy className="w-4" />
    </>,
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Code Copied to Clipboard");
  };

  return (
    <Button
      suppressHydrationWarning
      className="absolute right-4 top-14 z-50"
      size="icon"
      variant="outline"
      onClick={(e) => {
        handleCopy();
        e.stopPropagation();
      }}
    >
      {copyStatus}
    </Button>
  );
};

export default CopyButton;
