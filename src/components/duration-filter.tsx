"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterNav } from "./filter-nav-provider";

const DURATIONS = [
  { label: "Quick Tips", value: "quick", range: "< 30 min" },
  { label: "Standard", value: "standard", range: "30–120 min" },
  { label: "Deep Dives", value: "deep", range: "2+ hrs" },
];

export function DurationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startNav } = useFilterNav();
  const selected = searchParams.get("duration") ?? "";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === selected) {
      params.delete("duration");
    } else {
      params.set("duration", value);
    }
    startNav(() => router.push(`?${params.toString()}`));
  }

  return (
    <ul className="space-y-0.5">
      <li>
        <button
          onClick={() => select("")}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
            selected === ""
              ? "bg-accent/50 text-foreground"
              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
          )}
        >
          All
        </button>
      </li>
      {DURATIONS.map((d) => (
        <li key={d.value}>
          <button
            onClick={() => select(d.value)}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
              selected === d.value
                ? "bg-accent/50 text-foreground"
                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
            )}
          >
            <span className="text-foreground/80">{d.label}</span>
            <span className="text-[10px] text-muted-foreground/50">{d.range}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
