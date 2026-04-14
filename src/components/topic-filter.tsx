"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type Topic = { id: number; name: string };

// Deterministic color pool — cycles by topic index
const TOPIC_COLORS = [
  { dot: "bg-sky-400",      check: "data-[state=checked]:bg-sky-400 data-[state=checked]:border-sky-400" },
  { dot: "bg-violet-400",   check: "data-[state=checked]:bg-violet-400 data-[state=checked]:border-violet-400" },
  { dot: "bg-emerald-400",  check: "data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400" },
  { dot: "bg-rose-400",     check: "data-[state=checked]:bg-rose-400 data-[state=checked]:border-rose-400" },
  { dot: "bg-amber-400",    check: "data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400" },
  { dot: "bg-pink-400",     check: "data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400" },
  { dot: "bg-teal-400",     check: "data-[state=checked]:bg-teal-400 data-[state=checked]:border-teal-400" },
  { dot: "bg-orange-400",   check: "data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400" },
  { dot: "bg-indigo-400",   check: "data-[state=checked]:bg-indigo-400 data-[state=checked]:border-indigo-400" },
  { dot: "bg-cyan-400",     check: "data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400" },
];

interface TopicFilterProps {
  topics: Topic[];
}

export function TopicFilter({ topics }: TopicFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.getAll("topic");

  function toggle(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("topic");

    const next = selected.includes(id)
      ? selected.filter((t) => t !== id)
      : [...selected, id];

    next.forEach((t) => params.append("topic", t));
    router.push(`?${params.toString()}`);
  }

  return (
    <ul className="space-y-0.5">
      {topics.map((topic, i) => {
        const color = TOPIC_COLORS[i % TOPIC_COLORS.length];
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
                  : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              )}
            >
              <Checkbox
                id={`topic-${id}`}
                checked={isChecked}
                onCheckedChange={() => toggle(id)}
                className={cn("h-3.5 w-3.5 rounded-sm border-muted-foreground/40", color.check)}
              />
              <span className="flex-1 leading-none">{topic.name}</span>
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", color.dot)} />
            </label>
          </li>
        );
      })}
    </ul>
  );
}
