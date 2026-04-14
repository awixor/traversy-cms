"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const SKILL_LEVELS = [
  {
    label: "Beginner",
    value: "beginner",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    label: "Intermediate",
    value: "intermediate",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    label: "Advanced",
    value: "advanced",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
];

export function DifficultyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("skillLevel") ?? "";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete("skillLevel");
    } else {
      params.set("skillLevel", value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <RadioGroup value={selected} onValueChange={select} className="space-y-0.5">
      {/* All option */}
      <label
        htmlFor="difficulty-all"
        className={cn(
          "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
          selected === ""
            ? "bg-accent/50 text-foreground"
            : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
        )}
      >
        <RadioGroupItem value="" id="difficulty-all" className="h-3.5 w-3.5" />
        <span className="flex-1 leading-none">All</span>
      </label>

      {SKILL_LEVELS.map((level) => (
        <label
          key={level.value}
          htmlFor={`difficulty-${level.value}`}
          className={cn(
            "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
            selected === level.value
              ? "bg-accent/50 text-foreground"
              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
          )}
        >
          <RadioGroupItem
            value={level.value}
            id={`difficulty-${level.value}`}
            className="h-3.5 w-3.5"
          />
          <span className="flex-1 leading-none text-foreground/80">{level.label}</span>
          <span
            className={cn(
              "rounded border px-1.5 py-0.5 text-[10px] font-medium leading-none",
              level.color,
            )}
          >
            {level.label}
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
