"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Video } from "../../payload-types";

type Segment = NonNullable<Video["transcript"]>[number];

interface TranscriptSidebarProps {
  transcript: Segment[];
  currentTime?: number;
  onSeek?: (seconds: number) => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function TranscriptSidebar({
  transcript,
  currentTime = 0,
  onSeek,
}: TranscriptSidebarProps) {
  const [query, setQuery] = useState("");
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = useMemo(() => {
    for (let i = transcript.length - 1; i >= 0; i--) {
      const seg = transcript[i];
      if (currentTime >= (seg.start ?? 0)) return i;
    }
    return 0;
  }, [transcript, currentTime]);

  const filtered = useMemo(() => {
    if (!query.trim()) return transcript.map((seg, i) => ({ seg, i }));
    const q = query.toLowerCase();
    return transcript
      .map((seg, i) => ({ seg, i }))
      .filter(({ seg }) => seg.text?.toLowerCase().includes(q));
  }, [transcript, query]);

  // Auto-scroll active segment into view when not searching
  useEffect(() => {
    if (query.trim()) return;
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex, query]);

  return (
    <div className="flex h-130 flex-col rounded-lg border border-border/50 bg-card">
      {/* Search */}
      <div className="border-b border-border/50 px-3 py-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transcript..."
          className="w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Segments */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-3 py-4 text-center text-sm text-muted-foreground">
            No results
          </p>
        ) : (
          filtered.map(({ seg, i }) => {
            const isActive = i === activeIndex && !query.trim();
            return (
              <button
                key={i}
                ref={isActive ? activeRef : undefined}
                onClick={() => onSeek?.(seg.start ?? 0)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-2 px-3 py-2 text-left transition-colors hover:bg-accent/40",
                  isActive && "bg-accent/60",
                )}
              >
                <span className="mt-0.5 shrink-0 tabular-nums text-[11px] text-muted-foreground">
                  {formatTime(seg.start ?? 0)}
                </span>
                <span
                  className={cn(
                    "text-sm leading-snug",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {seg.text}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
