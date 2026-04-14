import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/40 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <SidebarContent />
    </aside>
  );
}
