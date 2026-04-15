"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
}

interface VideoResult {
  id: number;
  title: string;
  videoId: string;
  thumbnail?: string;
  description?: string;
  transcript?: TranscriptSegment[];
}

interface SearchResults {
  byTitle: VideoResult[];
  byTranscript: VideoResult[];
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function findSnippet(transcript: TranscriptSegment[], query: string) {
  const lower = query.toLowerCase();
  return transcript.find((seg) => seg.text.toLowerCase().includes(lower));
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    byTitle: [],
    byTranscript: [],
  });
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query || query.trim().length < 2) {
      setResults({ byTitle: [], byTranscript: [] });
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`,
        );
        const data: SearchResults = await res.json();
        setResults(data);
      } catch {
        setResults({ byTitle: [], byTranscript: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults({ byTitle: [], byTranscript: [] });
    }
  }, [open]);

  function navigateTo(videoId: string, t?: number) {
    const url =
      t !== undefined ? `/videos/${videoId}?t=${t}` : `/videos/${videoId}`;
    router.push(url);
    onOpenChange(false);
  }

  const hasResults =
    results.byTitle.length > 0 || results.byTranscript.length > 0;
  const showEmpty = query.trim().length >= 2 && !loading && !hasResults;

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search videos"
      description="Search across video titles, descriptions, and transcripts"
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search videos..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {loading && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          {showEmpty && (
            <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>
          )}

          {results.byTitle.length > 0 && (
            <CommandGroup heading="Videos">
              {results.byTitle.map((video) => (
                <CommandItem
                  key={video.id}
                  value={`title-${video.id}`}
                  onSelect={() => navigateTo(video.videoId)}
                  className="cursor-pointer"
                >
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt=""
                      width={48}
                      height={27}
                      className="rounded shrink-0 object-cover"
                    />
                  )}
                  <span className="truncate font-medium">{video.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.byTranscript.length > 0 && (
            <CommandGroup heading="Transcript Matches">
              {results.byTranscript.map((video) => {
                const segment = video.transcript
                  ? findSnippet(video.transcript, query)
                  : undefined;
                return (
                  <CommandItem
                    key={video.id}
                    value={`transcript-${video.id}`}
                    onSelect={() => navigateTo(video.videoId, segment?.start)}
                    className="cursor-pointer"
                  >
                    {video.thumbnail && (
                      <Image
                        src={video.thumbnail}
                        alt=""
                        width={48}
                        height={27}
                        className="rounded shrink-0 object-cover"
                      />
                    )}
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <span className="truncate font-medium">
                        {video.title}
                      </span>
                      {segment && (
                        <span className="truncate text-xs text-muted-foreground">
                          &ldquo;{segment.text}&rdquo;
                        </span>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
