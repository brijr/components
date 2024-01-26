"use client";

import { useClipboard } from "use-clipboard-copy";
import { toast } from "sonner";

export const CopyLink = ({ path }: { path: string }) => {
  const clipboard = useClipboard({ copiedTimeout: 1500 });

  const handleCopyLink = () => {
    const link = `https://components.bridger.to#${path}`;
    clipboard.copy(link);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <button onClick={handleCopyLink} className="text-xs">
      <span className="opacity-70">components/</span>
      {path}
    </button>
  );
};
