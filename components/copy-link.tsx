"use client";

import { useClipboard } from "use-clipboard-copy";
import { toast } from "sonner";
import { Link } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CopyLink = ({ path }: { path: string }) => {
  const clipboard = useClipboard({ copiedTimeout: 1500 });

  const handleCopyLink = () => {
    const link = `https://components.work#${path}`;
    clipboard.copy(link);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={handleCopyLink} className="text-xs">
            <span className="opacity-70">components/</span>
            {path}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          <p className="not-prose flex items-center gap-2 text-xs">
            <Link className="w-3" /> Copy Link to Component
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
