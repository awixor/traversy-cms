"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getTopicColor } from "@/lib/topic-colors";
import { useFilterNav } from "./filter-nav-provider";

export type Topic = { id: number; name: string };

interface TopicFilterProps {
  topics: Topic[];
}

export function TopicFilter({ topics }: TopicFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startNav } = useFilterNav();
  const selected = searchParams.getAll("topic");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function toggle(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("topic");

    const next = selected.includes(id)
      ? selected.filter((t) => t !== id)
      : [...selected, id];

    next.forEach((t) => params.append("topic", t));
    startNav(() => router.push(`?${params.toString()}`));
  }

  const filtered = query.trim()
    ? topics.filter((t) =>
        t.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : topics;

  return (
    <div className="flex flex-col gap-2">
      {/* Search input */}
      <div className="relative flex items-center">
        <Search className="absolute left-2.5 h-3 w-3 text-muted-foreground/50 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Filter topics…"
          className={cn(
            "w-full rounded-md border border-border/30 bg-background/30 py-1 pl-7 pr-7",
            "text-xs text-foreground placeholder:text-muted-foreground/40",
            "focus:outline-none focus:ring-1 focus:ring-border/60",
            "transition-colors",
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Scrollable topics list */}
      <ul className="sidebar-scrollbar max-h-60 overflow-y-auto space-y-0.5 pr-0.5">
        {filtered.length === 0 ? (
          <li className="px-2 py-1.5 text-xs text-muted-foreground/50">
            No topics match
          </li>
        ) : (
          filtered.map((topic) => {
            const color = getTopicColor(topic.id);
            const id = String(topic.id);
            const isChecked = selected.includes(id);

            return (
              <li key={topic.id}>
                <label
                  htmlFor={`topic-${id}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isChecked
                      ? "bg-accent/50 text-foreground"
                      : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                  )}
                >
                  <Checkbox
                    id={`topic-${id}`}
                    checked={isChecked}
                    onCheckedChange={() => toggle(id)}
                    className="h-3.5 w-3.5 rounded-sm border-muted-foreground/40"
                  />
                  <span className="flex-1 leading-none capitalize">
                    {topic.name}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color.hsl }}
                  />
                </label>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
