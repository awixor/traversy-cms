import { AppShell } from "@/components/app-shell";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { SidebarData } from "@/components/sidebar-data";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell mobileNavSlot={<MobileNav><SidebarData /></MobileNav>}>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
