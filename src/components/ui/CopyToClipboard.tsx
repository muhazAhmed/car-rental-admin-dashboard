"use client";

import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";
import CustomTooltip from "./CustomTooltip";

interface CopyToClipboardProps {
  value: string;
  IconSize?: number;
  children: React.ReactNode;
}

const CopyToClipboard = ({
  value,
  IconSize = 12,
  children,
}: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative group flex items-center gap-1">
      {children}

      <div
        onClick={handleCopy}
        className="cursor-pointer invisible group-hover:visible relative"
      >
        <CustomTooltip content="Copy">
          <Copy size={IconSize} />
        </CustomTooltip>

        {copied && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
            <CheckCheck size={12} /> Copied
          </span>
        )}
      </div>
    </div>
  );
};

export default CopyToClipboard;
