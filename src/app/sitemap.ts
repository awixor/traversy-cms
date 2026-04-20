import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "videos",
    limit: 10000,
    select: { videoId: true, publishedAt: true },
  });

  const videoEntries: MetadataRoute.Sitemap = docs.map((video) => ({
    url: `${SITE_URL}/videos/${video.videoId}`,
    lastModified: video.publishedAt ? new Date(video.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...videoEntries,
  ];
}
