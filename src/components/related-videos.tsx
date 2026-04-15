import type { Video } from "../../payload-types";
import { VideoCard } from "@/components/video-card";

interface RelatedVideosProps {
  videos: Video[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-base font-semibold text-foreground">Related Videos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
