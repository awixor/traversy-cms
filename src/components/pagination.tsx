"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterNav } from "./filter-nav-provider";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");

  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startNav } = useFilterNav();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    startNav(() => {
      router.push(`?${params.toString()}`);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  const pages = getPageNumbers(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const btnBase =
    "flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 active:scale-95";

  return (
    <div className="flex items-center justify-center">
      {/* Glass pill container */}
      <div className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/3 p-0.5 backdrop-blur-sm">
        {/* Prev */}
        <button
          onClick={() => !isFirst && goTo(currentPage - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          className={cn(
            btnBase,
            isFirst
              ? "cursor-not-allowed text-muted-foreground/30"
              : "text-muted-foreground/70 hover:bg-white/6 hover:text-muted-foreground",
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-7 w-6 items-center justify-center text-xs text-muted-foreground/40 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              className={cn(
                btnBase,
                p === currentPage
                  ? "bg-white/12 border border-white/15 text-foreground shadow-sm"
                  : "text-muted-foreground/70 hover:bg-white/6 hover:text-muted-foreground",
              )}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => !isLast && goTo(currentPage + 1)}
          disabled={isLast}
          aria-label="Next page"
          className={cn(
            btnBase,
            isLast
              ? "cursor-not-allowed text-muted-foreground/30"
              : "text-muted-foreground/70 hover:bg-white/6 hover:text-muted-foreground",
          )}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
