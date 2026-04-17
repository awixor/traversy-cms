"use client";

import { createContext, useContext, useTransition } from "react";

type FilterNavContextValue = {
  isPending: boolean;
  startNav: (fn: () => void) => void;
};

const FilterNavContext = createContext<FilterNavContextValue | null>(null);

export function FilterNavProvider({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <FilterNavContext.Provider
      value={{ isPending, startNav: (fn) => startTransition(fn) }}
    >
      {children}
    </FilterNavContext.Provider>
  );
}

export function useFilterNav() {
  const ctx = useContext(FilterNavContext);
  if (!ctx) {
    return { isPending: false, startNav: (fn: () => void) => fn() };
  }
  return ctx;
}
