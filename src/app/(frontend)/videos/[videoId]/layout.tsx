import { AppShell } from "@/components/app-shell";

export default function VideoDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <main className="flex-1">
        {children}
      </main>
    </AppShell>
  );
}
