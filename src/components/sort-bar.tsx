"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterNav } from "./filter-nav-provider";

type Option = {
  value: string;
  label: string;
};

const SORT_OPTIONS: Option[] = [
  { value: "date_desc", label: "Newest" },
  { value: "date_asc", label: "Oldest" },
  { value: "duration_asc", label: "Shortest" },
  { value: "duration_desc", label: "Longest" },
];

const TYPE_OPTIONS: Option[] = [
  { value: "all", label: "All" },
  { value: "video", label: "Video" },
  { value: "short", label: "Short" },
];

function PillGroup({
  options,
  active,
  onChange,
}: {
  options: Option[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/3 p-0.5 backdrop-blur-sm">
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              "active:scale-95",
              isActive
                ? ["bg-white/12 text-foreground shadow-sm", "border border-white/15"]
                : ["text-muted-foreground/70", "hover:text-muted-foreground hover:bg-white/6"],
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function SortBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startNav } = useFilterNav();
  const currentSort = searchParams.get("sort") ?? "date_desc";
  const currentType = searchParams.get("type") ?? "all";

  function updateParam(key: string, value: string, defaultValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startNav(() => router.push(`?${params.toString()}`));
  }

  return (
    <div className="flex items-center gap-3 justify-end w-full">
      <PillGroup
        options={TYPE_OPTIONS}
        active={currentType}
        onChange={(v) => updateParam("type", v, "all")}
      />
      <PillGroup
        options={SORT_OPTIONS}
        active={currentSort}
        onChange={(v) => updateParam("sort", v, "date_desc")}
      />
    </div>
  );
}
