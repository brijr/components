"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CopyButtonProps {
  filePath: string;
}

export function CopyButton({ filePath }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Fetch the component source code
      const response = await fetch(
        `/api/component-source?path=${encodeURIComponent(filePath)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch component source");
      }

      const { source } = await response.json();

      await navigator.clipboard.writeText(source);
      setCopied(true);
      toast.success("Component code copied to clipboard!");

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy component code");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="cursor-pointer"
    >
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} />
      )}
    </Button>
  );
}
