import { getPayload } from "payload";
import configPromise from "@payload-config";
import { RelatedVideos } from "@/components/related-videos";

interface RelatedVideosSectionProps {
  videoId: string;
  topicIds: number[];
}

export async function RelatedVideosSection({
  videoId,
  topicIds,
}: RelatedVideosSectionProps) {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "videos",
    where: {
      and: [
        { "topics.id": { in: topicIds } },
        { videoId: { not_equals: videoId } },
      ],
    },
    limit: 4,
    sort: "-publishedAt",
    depth: 0,
    select: {
      id: true,
      title: true,
      videoId: true,
      thumbnail: true,
      duration: true,
      format: true,
      skillLevel: true,
      publishedAt: true,
    },
  });

  if (!docs.length) return null;
  return <RelatedVideos videos={docs} />;
}
