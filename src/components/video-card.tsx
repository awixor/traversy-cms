import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Video } from "../../payload-types";

const FORMAT_LABELS: Record<NonNullable<Video["format"]>, string> = {
  crash_course: "Crash Course",
  project_build: "Project Build",
  quick_tip: "Quick Tip",
  live_stream: "Live Stream",
  podcast: "Podcast",
  course: "Course",
  other: "Other",
};

const SKILL_COLORS: Record<NonNullable<Video["skillLevel"]>, string> = {
  beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

function formatDuration(raw: string) {
  const match = raw.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return raw;
  const h = parseInt(match[1] ?? "0");
  const m = parseInt(match[2] ?? "0");
  const s = parseInt(match[3] ?? "0");
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface VideoCardProps {
  video: Video;
  shadowColor?: string;
}

export function VideoCard({ video, shadowColor }: VideoCardProps) {
  const { title, videoId, thumbnail, duration, format, skillLevel, publishedAt } = video;

  return (
    <Link
      href={`/video/${videoId}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-colors hover:border-border"
    >
      {/* Corner glow — bottom-right only */}
      {shadowColor && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-2/5 w-2/5 rounded-br-lg"
          style={{ background: `radial-gradient(circle at 100% 100%, ${shadowColor}55 0%, transparent 70%)` }}
        />
      )}
      {/* Thumbnail — 16:9 */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">No thumbnail</span>
          </div>
        )}

        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white tabular-nums">
            {formatDuration(duration)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2">
          {publishedAt && (
            <span className="text-[11px] text-muted-foreground">
              {formatDate(publishedAt)}
            </span>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {skillLevel && (
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 text-[10px] font-medium leading-none capitalize",
                  SKILL_COLORS[skillLevel],
                )}
              >
                {skillLevel}
              </span>
            )}
            {format && (
              <span className="rounded border border-border/50 bg-accent/50 px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">
                {FORMAT_LABELS[format]}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
