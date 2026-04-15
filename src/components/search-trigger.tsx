"use client";

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex w-full max-w-md items-center gap-2 rounded-lg border border-border/60 bg-muted/50 px-4 py-2 text-sm text-muted-foreground outline-none transition-colors hover:border-primary/60 hover:bg-muted"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="flex-1 text-left">Search videos...</span>
      <kbd className="pointer-events-none hidden select-none items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
