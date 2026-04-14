import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Topic, TopicFilter } from "./topic-filter";

export type { Topic } from "./topic-filter";

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

const DURATIONS = [
  { label: "Quick Tips", value: "quick", range: "< 30 min" },
  { label: "Standard", value: "standard", range: "30–120 min" },
  { label: "Deep Dives", value: "deep", range: "2+ hrs" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
      {children}
    </h3>
  );
}

function NavItem({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors",
          "hover:bg-accent/60 hover:text-foreground",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}

interface SidebarContentProps {
  topics: Topic[];
}

export function SidebarContent({ topics }: SidebarContentProps) {
  return (
    <nav className="flex flex-col gap-5 p-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 pt-1">
        <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
          Filters
        </span>
      </div>

      {/* Technology — multiselect */}
      <section>
        <SectionLabel>Technology</SectionLabel>
        <TopicFilter topics={topics} />
      </section>

      <div className="mx-2 border-t border-border/30" />

      {/* Difficulty */}
      <section>
        <SectionLabel>Difficulty</SectionLabel>
        <ul className="space-y-0.5">
          <NavItem href="/">
            <span>All</span>
          </NavItem>
          {SKILL_LEVELS.map((level) => (
            <NavItem key={level.value} href={`/?skillLevel=${level.value}`}>
              <span className="text-foreground/80">{level.label}</span>
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 text-[10px] font-medium leading-none",
                  level.color,
                )}
              >
                {level.label}
              </span>
            </NavItem>
          ))}
        </ul>
      </section>

      <div className="mx-2 border-t border-border/30" />

      {/* Duration */}
      <section>
        <SectionLabel>Duration</SectionLabel>
        <ul className="space-y-0.5">
          <NavItem href="/">
            <span>All</span>
          </NavItem>
          {DURATIONS.map((d) => (
            <NavItem key={d.value} href={`/?duration=${d.value}`}>
              <span className="text-foreground/80">{d.label}</span>
              <span className="text-[10px] text-muted-foreground/50">
                {d.range}
              </span>
            </NavItem>
          ))}
        </ul>
      </section>
    </nav>
  );
}
