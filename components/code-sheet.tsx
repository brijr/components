"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { codeToHtml } from "shiki";

interface CodeSheetProps {
  filePath: string;
}

export function CodeSheet({ filePath }: CodeSheetProps) {
  const [code, setCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAndHighlightCode = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the component source code
        const response = await fetch(
          `/api/component-source?path=${encodeURIComponent(filePath)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch component source");
        }

        const { source } = await response.json();
        setCode(source);

        // Highlight the code using shiki
        const html = await codeToHtml(source, {
          lang: "tsx",
          theme: "github-light",
        });

        setHighlightedCode(html);
      } catch (err) {
        console.error("Failed to fetch code:", err);
        setError(err instanceof Error ? err.message : "Failed to load code");
      } finally {
        setLoading(false);
      }
    };

    fetchAndHighlightCode();
  }, [filePath]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy code");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-destructive">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="h-full overflow-auto pb-24 no-scrollbar">
        <div
          className="p-6 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
