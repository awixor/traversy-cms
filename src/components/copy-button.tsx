"use client";

import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded border border-border/50 bg-background px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
