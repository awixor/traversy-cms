"use client";

import { useFilterNav } from "./filter-nav-provider";
import { cn } from "@/lib/utils";

export function DimmableContent({ children }: { children: React.ReactNode }) {
  const { isPending } = useFilterNav();

  return (
    <div
      aria-busy={isPending}
      className={cn(
        "transition-opacity duration-150",
        isPending && "opacity-60 pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}
