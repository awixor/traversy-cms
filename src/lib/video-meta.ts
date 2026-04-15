import type { Video } from "../../payload-types";

export const SKILL_COLORS: Record<NonNullable<Video["skillLevel"]>, string> = {
  beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export const FORMAT_LABELS: Record<NonNullable<Video["format"]>, string> = {
  crash_course: "Crash Course",
  project_build: "Project Build",
  quick_tip: "Quick Tip",
  live_stream: "Live Stream",
  podcast: "Podcast",
  course: "Course",
  other: "Other",
};
