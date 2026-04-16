import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VideoGrid } from "@/components/video-grid";
import type { Where } from "payload";

interface HomeSearchParams {
  topic?: string | string[];
  skillLevel?: string;
  duration?: string;
}

interface HomeProps {
  searchParams: Promise<HomeSearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { topic, skillLevel, duration } = await searchParams;

  const payload = await getPayload({ config: configPromise });

  const where: Where = {};

  const topicIds = topic
    ? (Array.isArray(topic) ? topic : [topic]).map(Number).filter(Boolean)
    : [];

  if (topicIds.length > 0) {
    where["topics.id"] = { in: topicIds };
  }

  if (skillLevel) {
    where.skillLevel = { equals: skillLevel };
  }

  if (duration === "quick") {
    where.duration = { less_than: 1800 };
  } else if (duration === "standard") {
    where.duration = { greater_than_equal: 1800, less_than_equal: 7200 };
  } else if (duration === "deep") {
    where.duration = { greater_than: 7200 };
  }

  const [{ docs: videos }, { docs: allTopics }] = await Promise.all([
    payload.find({
      collection: "videos",
      where: Object.keys(where).length > 0 ? where : undefined,
      sort: "-publishedAt",
      limit: 100,
    }),
    payload.find({
      collection: "topics",
      sort: "name",
      limit: 50,
    }),
  ]);

  return (
    <main className="p-6">
      <VideoGrid videos={videos} allTopics={allTopics} />
    </main>
  );
}
