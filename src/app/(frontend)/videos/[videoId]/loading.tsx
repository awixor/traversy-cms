export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      {/* Back button skeleton */}
      <div className="mb-4 h-8 w-24 animate-pulse rounded-md bg-white/5" />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main video area skeleton */}
        <div className="flex-1 space-y-6">
          <div className="aspect-video w-full animate-pulse rounded-xl bg-white/5" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
          </div>
          <div className="h-32 w-full animate-pulse rounded-lg bg-white/5" />
        </div>

        {/* Sidebar skeleton */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="h-150 w-full animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>

      {/* Related videos skeleton */}
      <div className="mt-12 space-y-4">
        <div className="h-6 w-32 animate-pulse rounded bg-white/5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-video w-full animate-pulse rounded-lg bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
