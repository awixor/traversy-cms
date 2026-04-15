"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/top-nav";
import { SearchDialog } from "@/components/search-dialog";

interface AppShellProps {
  mobileNavSlot?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ mobileNavSlot, children }: AppShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <TopNav mobileNavSlot={mobileNavSlot} onSearchOpen={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      {children}
    </>
  );
}
