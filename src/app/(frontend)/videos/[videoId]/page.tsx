import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import type { Video, Topic } from "../../../../../payload-types";
import { VideoDetailShell } from "@/components/video-detail-shell";
import { BackButton } from "@/components/back-button";
import { ResourcesSection } from "@/components/resources-section";
import { RelatedVideos } from "@/components/related-videos";

interface VideoDetailPageProps {
  params: Promise<{ videoId: string }>;
  searchParams: Promise<{ t?: string }>;
}

export default async function VideoDetailPage({ params, searchParams }: VideoDetailPageProps) {
  const { videoId } = await params;
  const { t } = await searchParams;
  const initialTime = t ? (parseFloat(t) || undefined) : undefined;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "videos",
    where: { videoId: { equals: videoId } },
    limit: 1,
    depth: 1, // Reduced from 2
  });

  const video = docs[0] as Video | undefined;
  if (!video) notFound();

  const topicIds = (video.topics as Topic[])
    ?.map((t) => (typeof t === "number" ? t : t.id))
    .filter(Boolean) ?? [];

  const { docs: relatedDocs } = await payload.find({
    collection: "videos",
    where: {
      and: [
        { "topics.id": { in: topicIds } },
        { videoId: { not_equals: videoId } },
      ],
    },
    limit: 4,
    sort: "-publishedAt",
    depth: 1, // Reduced from 2
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

  const relatedVideos = relatedDocs as Video[];
  const transcript = (video.transcript ?? []) as NonNullable<Video["transcript"]>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <BackButton />
      <VideoDetailShell video={video} transcript={transcript} initialTime={initialTime} description={video.description ?? undefined} />

      {/* Resources */}
      {video.resources && video.resources.length > 0 && (
        <ResourcesSection resources={video.resources} />
      )}

      {/* Related videos */}
      {relatedVideos.length > 0 && (
        <RelatedVideos videos={relatedVideos} />
      )}
    </div>
  );
}
