"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useFilterNav } from "./filter-nav-provider";

const FILTER_KEYS = ["topic", "skillLevel", "duration"];

export function ClearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startNav } = useFilterNav();

  const hasFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  if (!hasFilters) return null;

  function clear() {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));
    startNav(() => router.push(`?${params.toString()}`));
  }

  return (
    <button
      onClick={clear}
      className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
    >
      <X className="h-3 w-3" />
      Clear all
    </button>
  );
}
