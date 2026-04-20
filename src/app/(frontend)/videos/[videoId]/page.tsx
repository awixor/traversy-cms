import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { VideoDetailShell } from "@/components/video-detail-shell";
import { BackButton } from "@/components/back-button";
import { ResourcesSection } from "@/components/resources-section";
import { RelatedVideosSection } from "@/components/related-videos-section";
import { RelatedVideosSkeleton } from "@/components/related-videos-skeleton";
import { secondsToISO8601Duration } from "@/lib/duration";
import { SITE_URL } from "@/lib/site";
import { getThumb } from "@/lib/thumbnail";

interface VideoDetailPageProps {
  params: Promise<{ videoId: string }>;
  searchParams: Promise<{ t?: string }>;
}

const getVideo = cache(async (videoId: string) => {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "videos",
    where: { videoId: { equals: videoId } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

export async function generateMetadata({
  params,
}: VideoDetailPageProps): Promise<Metadata> {
  const { videoId } = await params;
  const video = await getVideo(videoId);
  if (!video) return {};

  const pageUrl = `${SITE_URL}/videos/${video.videoId}`;
  const thumbnail = getThumb(video);
  const description = video.description
    ? video.description.slice(0, 160).replace(/\n/g, " ")
    : "Watch this Traversy Media tutorial.";

  return {
    title: video.title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: video.title,
      description,
      url: pageUrl,
      type: "video.other",
      images: [{ url: thumbnail, width: 1280, height: 720, alt: video.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description,
      images: [thumbnail],
    },
  };
}

export default async function VideoDetailPage({
  params,
  searchParams,
}: VideoDetailPageProps) {
  const { videoId } = await params;
  const { t } = await searchParams;
  const initialTime = t ? parseFloat(t) || undefined : undefined;

  const video = await getVideo(videoId);
  if (!video) notFound();

  const thumbnail = getThumb(video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description?.slice(0, 500).replace(/\n/g, " ") ?? "",
    thumbnailUrl: thumbnail,
    uploadDate: video.publishedAt ?? undefined,
    duration: video.duration ? secondsToISO8601Duration(video.duration) : undefined,
    contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    url: `${SITE_URL}/videos/${video.videoId}`,
  };

  const topicIds =
    video.topics
      ?.map((t) => (typeof t === "number" ? t : t.id))
      .filter(Boolean) ?? [];

  const transcript = video.transcript ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackButton />
      <VideoDetailShell
        video={video}
        transcript={transcript}
        initialTime={initialTime}
        description={video.description ?? undefined}
      />

      {video.resources && video.resources.length > 0 && (
        <ResourcesSection resources={video.resources} />
      )}

      <Suspense fallback={<RelatedVideosSkeleton />}>
        <RelatedVideosSection videoId={videoId} topicIds={topicIds} />
      </Suspense>
    </div>
  );
}
