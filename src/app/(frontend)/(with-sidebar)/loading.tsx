export default function Loading() {
  return (
    <main className="p-6 space-y-4">
      <div className="flex items-center gap-3 justify-end w-full">
        <div className="h-7 w-40 rounded-full bg-white/5 animate-pulse" />
        <div className="h-7 w-64 rounded-full bg-white/5 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card">
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-4 w-11/12 rounded bg-muted animate-pulse" />
        <div className="h-4 w-3/5 rounded bg-muted animate-pulse" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="h-3 w-20 rounded bg-muted animate-pulse" />
          <div className="flex gap-1.5">
            <div className="h-4 w-14 rounded bg-muted animate-pulse" />
            <div className="h-4 w-10 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
