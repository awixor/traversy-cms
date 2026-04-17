import { AppShell } from "@/components/app-shell";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { SidebarData } from "@/components/sidebar-data";
import { FilterNavProvider } from "@/components/filter-nav-provider";
import { DimmableContent } from "@/components/dimmable-content";
import { Suspense } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      mobileNavSlot={
        <Suspense>
          <MobileNav>
            <SidebarData />
          </MobileNav>
        </Suspense>
      }
    >
      <FilterNavProvider>
        <div className="flex flex-1">
          <Suspense>
            <Sidebar />
          </Suspense>
          <div className="flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl px-4 py-6">
              <DimmableContent>{children}</DimmableContent>
            </div>
          </div>
        </div>
      </FilterNavProvider>
    </AppShell>
  );
}
