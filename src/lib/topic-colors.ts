export const TOPIC_COLOR_POOL = [
  { dot: "bg-sky-400",     check: "data-[state=checked]:bg-sky-400 data-[state=checked]:border-sky-400",     hex: "#38bdf8" },
  { dot: "bg-violet-400",  check: "data-[state=checked]:bg-violet-400 data-[state=checked]:border-violet-400", hex: "#a78bfa" },
  { dot: "bg-emerald-400", check: "data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400", hex: "#34d399" },
  { dot: "bg-rose-400",    check: "data-[state=checked]:bg-rose-400 data-[state=checked]:border-rose-400",    hex: "#fb7185" },
  { dot: "bg-amber-400",   check: "data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400",  hex: "#fbbf24" },
  { dot: "bg-pink-400",    check: "data-[state=checked]:bg-pink-400 data-[state=checked]:border-pink-400",    hex: "#f472b6" },
  { dot: "bg-teal-400",    check: "data-[state=checked]:bg-teal-400 data-[state=checked]:border-teal-400",    hex: "#2dd4bf" },
  { dot: "bg-orange-400",  check: "data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400", hex: "#fb923c" },
  { dot: "bg-indigo-400",  check: "data-[state=checked]:bg-indigo-400 data-[state=checked]:border-indigo-400", hex: "#818cf8" },
  { dot: "bg-cyan-400",    check: "data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400",    hex: "#22d3ee" },
] as const;

export function getTopicColor(index: number) {
  return TOPIC_COLOR_POOL[index % TOPIC_COLOR_POOL.length];
}
