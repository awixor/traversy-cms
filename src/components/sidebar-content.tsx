import { SlidersHorizontal } from "lucide-react";
import { Topic, TopicFilter } from "./topic-filter";
import { DifficultyFilter } from "./difficulty-filter";
import { DurationFilter } from "./duration-filter";
import { ClearFilters } from "./clear-filters";

export type { Topic } from "./topic-filter";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
      {children}
    </h3>
  );
}

interface SidebarContentProps {
  topics: Topic[];
}

export function SidebarContent({ topics }: SidebarContentProps) {
  return (
    <nav className="flex flex-col gap-5 p-3">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
            Filters
          </span>
        </div>
        <ClearFilters />
      </div>

      {/* Topics — multiselect */}
      <section>
        <SectionLabel>Topics</SectionLabel>
        <TopicFilter topics={topics} />
      </section>

      <div className="mx-2 border-t border-border/30" />

      {/* Difficulty — single select RadioGroup */}
      <section>
        <SectionLabel>Difficulty</SectionLabel>
        <DifficultyFilter />
      </section>

      <div className="mx-2 border-t border-border/30" />

      {/* Duration — single select toggle */}
      <section>
        <SectionLabel>Duration</SectionLabel>
        <DurationFilter />
      </section>
    </nav>
  );
}
