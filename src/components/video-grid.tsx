import { LucideSearch } from "lucide-react";
import type { Video } from "../../payload-types";
import { VideoCard } from "./video-card";
import { getTopicColor } from "@/lib/topic-colors";

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-3 py-24 text-center">
      <LucideSearch className="h-10 w-10 text-muted-foreground/40" />
      <p className="text-sm font-medium text-muted-foreground">
        No Results Found
      </p>
      <p className="text-xs text-muted-foreground/60">
        Try adjusting your filters.
      </p>
    </div>
  );
}

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  function getShadowColor(video: Video): string | undefined {
    const first = video.topics?.[0];
    if (!first) return undefined;
    const id = typeof first === "number" ? first : first.id;
    return getTopicColor(id).hex;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.length === 0 ? (
        <EmptyState />
      ) : (
        videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            shadowColor={getShadowColor(video)}
            priority={index < 3}
          />
        ))
      )}
    </div>
  );
}
