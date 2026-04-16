"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type SortOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { value: "date_desc", label: "Newest" },
  { value: "date_asc", label: "Oldest" },
  { value: "duration_asc", label: "Shortest" },
  { value: "duration_desc", label: "Longest" },
];

export function SortBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "date_desc";

  function setSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "date_desc") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3 justify-end w-full">
      {/* Glass pill container */}
      <div className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/3 p-0.5 backdrop-blur-sm">
        {SORT_OPTIONS.map((opt) => {
          const isActive = current === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                "active:scale-95",
                isActive
                  ? [
                      "bg-white/12 text-foreground shadow-sm",
                      "border border-white/15",
                    ]
                  : [
                      "text-muted-foreground/70",
                      "hover:text-muted-foreground hover:bg-white/6",
                    ],
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
