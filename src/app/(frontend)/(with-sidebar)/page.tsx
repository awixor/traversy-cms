import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VideoGrid } from "@/components/video-grid";
import { SortBar } from "@/components/sort-bar";
import { Pagination } from "@/components/pagination";
import type { Where } from "payload";

const LIMIT = 12;

const SORT_MAP: Record<string, string> = {
  date_desc: "-publishedAt",
  date_asc: "publishedAt",
  duration_asc: "duration",
  duration_desc: "-duration",
};

interface HomeSearchParams {
  topic?: string | string[];
  skillLevel?: string;
  duration?: string;
  sort?: string;
  page?: string;
}

interface HomeProps {
  searchParams: Promise<HomeSearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { topic, skillLevel, duration, sort, page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);

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

  const [videosResult, { docs: allTopics }] = await Promise.all([
    payload.find({
      collection: "videos",
      where: Object.keys(where).length > 0 ? where : undefined,
      sort: SORT_MAP[sort ?? ""] ?? "-publishedAt",
      limit: LIMIT,
      page: currentPage,
    }),
    payload.find({
      collection: "topics",
      sort: "name",
      limit: 50,
    }),
  ]);

  const { docs: videos, totalPages } = videosResult;

  return (
    <main className="p-6 space-y-4">
      <SortBar />
      <VideoGrid videos={videos} allTopics={allTopics} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
