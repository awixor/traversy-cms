"use client";

const URL_REGEX = /https?:\/\/[^\s"<>]+[^\s"<>.,;:!?)]/g;
const TIMESTAMP_REGEX = /\b(\d{1,2}:\d{2}(?::\d{2})?)\b/g;

function parseTimestamp(timestamp: string): number | null {
  const parts = timestamp.split(":").map(Number);
  if (parts.some(Number.isNaN)) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return null;
}

interface TimestampedTextProps {
  text: string;
  className?: string;
  onSeek?: (seconds: number) => void;
}

export function TimestampedText({ text, className, onSeek }: TimestampedTextProps) {
  const normalized = text.replace(/^"|"$/g, "").replace(/\\n/g, "\n").trim();
  const paragraphs = normalized.split(/\n+/).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const nodes: React.ReactNode[] = [];
        let lastIndex = 0;

        // Collect all matches (URLs and timestamps) sorted by position
        const matches: { index: number; length: number; node: React.ReactNode }[] = [];

        for (const urlMatch of paragraph.matchAll(URL_REGEX)) {
          matches.push({
            index: urlMatch.index!,
            length: urlMatch[0].length,
            node: (
              <a
                key={`url-${urlMatch.index}`}
                href={urlMatch[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                {urlMatch[0]}
              </a>
            ),
          });
        }

        for (const tsMatch of paragraph.matchAll(TIMESTAMP_REGEX)) {
          const tsIndex = tsMatch.index!;
          // Skip if inside a URL match
          const insideUrl = matches.some(
            (url) => tsIndex >= url.index && tsIndex < url.index + url.length,
          );
          if (insideUrl) continue;

          const seconds = parseTimestamp(tsMatch[1]);
          if (seconds === null) continue;

          matches.push({
            index: tsIndex,
            length: tsMatch[0].length,
            node: onSeek ? (
              <button
                key={`ts-${tsIndex}`}
                onClick={() => onSeek(seconds)}
                className="font-mono text-primary hover:underline cursor-pointer"
              >
                {tsMatch[0]}
              </button>
            ) : (
              <span key={`ts-${tsIndex}`} className="font-mono">
                {tsMatch[0]}
              </span>
            ),
          });
        }

        matches.sort((a, b) => a.index - b.index);

        for (const match of matches) {
          if (match.index > lastIndex) nodes.push(paragraph.slice(lastIndex, match.index));
          nodes.push(match.node);
          lastIndex = match.index + match.length;
        }
        if (lastIndex < paragraph.length) nodes.push(paragraph.slice(lastIndex));

        return (
          <p key={paragraphIndex} className="mb-2 last:mb-0">
            {nodes}
          </p>
        );
      })}
    </div>
  );
}
