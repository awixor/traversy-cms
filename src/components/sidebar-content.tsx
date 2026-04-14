export function SidebarContent() {
  return (
    <nav className="flex flex-col gap-6 p-4">
      {/* Technology */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Technology
        </h3>
        <ul className="space-y-1">
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
        </ul>
      </section>

      {/* Difficulty */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Difficulty
        </h3>
        <ul className="space-y-1">
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
        </ul>
      </section>

      {/* Duration */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Duration
        </h3>
        <ul className="space-y-1">
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
          <li className="h-6 rounded bg-muted/40 animate-pulse" />
        </ul>
      </section>
    </nav>
  );
}
