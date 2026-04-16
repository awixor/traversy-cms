"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TOPIC_COLOR_POOL } from "@/lib/topic-colors";

export type Topic = { id: number; name: string };

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
        const color = TOPIC_COLOR_POOL[i % TOPIC_COLOR_POOL.length];
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
                className={cn(
                  "h-3.5 w-3.5 rounded-sm border-muted-foreground/40",
                  color.check,
                )}
              />
              <span className="flex-1 leading-none capitalize">
                {topic.name}
              </span>
              <span
                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", color.dot)}
              />
            </label>
          </li>
        );
      })}
    </ul>
  );
}
