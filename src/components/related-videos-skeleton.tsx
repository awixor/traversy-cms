export function RelatedVideosSkeleton() {
  return (
    <div className="mt-10">
      <div className="mb-4 h-5 w-32 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-border">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
