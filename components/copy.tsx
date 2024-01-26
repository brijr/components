"use client";

import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  textToCopy: string;
  className?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className }) => {
  const [copyStatus, setCopyStatus] = React.useState(
    <>
      <span className="sr-only mr-1 text-sm">Copy Code</span>
      <Copy className="w-4" />
    </>
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Code Copied to Clipboard");
  };

  return (
    <button
      suppressHydrationWarning
      className={`min-w-30 absolute right-0 top-0 m-4 flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg bg-secondary px-2 py-1 transition-all hover:scale-95 focus:scale-110 ${className}`}
      onClick={(e) => {
        handleCopy();
        e.stopPropagation();
      }}
    >
      {copyStatus}
    </button>
  );
};

export default CopyButton;
