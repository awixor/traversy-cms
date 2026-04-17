"use client";

import { useState, useCallback } from "react";
import { YouTubePlayer, type YTPlayer } from "@/components/youtube-player";
import { TranscriptSidebar } from "@/components/transcript-sidebar";
import { TimestampedText } from "@/components/timestamped-text";
import { cn } from "@/lib/utils";
import { SKILL_COLORS, FORMAT_LABELS } from "@/lib/video-meta";
import type { Video } from "../../payload-types";

interface VideoDetailShellProps {
  video: Video;
  transcript: NonNullable<Video["transcript"]>;
  initialTime?: number;
  description?: string;
}

export function VideoDetailShell({ video, transcript, initialTime, description }: VideoDetailShellProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<YTPlayer | null>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(true);

  const handlePlayerReady = useCallback(
    (p: YTPlayer) => {
      setPlayer(p);
      if (initialTime !== undefined) {
        p.seekTo(initialTime, true);
        p.playVideo();
      }
    },
    [initialTime],
  );

  const handleSeek = useCallback(
    (seconds: number) => {
      player?.seekTo(seconds, true);
      player?.playVideo();
    },
    [player],
  );

  return (
    <>
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Player */}
      <div className="flex-1 min-w-0">
        <YouTubePlayer
          videoId={video.videoId}
          onTimeUpdate={setCurrentTime}
          onReady={handlePlayerReady}
        />

        <h1 className="mt-4 text-xl font-bold leading-snug text-foreground">
          {video.title}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {video.publishedAt && (
            <span>
              {new Date(video.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {video.skillLevel && (
            <span
              className={cn(
                "capitalize rounded border px-2 py-0.5 text-xs",
                SKILL_COLORS[video.skillLevel],
              )}
            >
              {video.skillLevel}
            </span>
          )}
          {video.format && (
            <span className="rounded border border-border/50 bg-accent/50 px-2 py-0.5 text-xs text-muted-foreground">
              {FORMAT_LABELS[video.format]}
            </span>
          )}
          {transcript.length > 0 && (
            <button
              onClick={() => setTranscriptOpen((o) => !o)}
              className="ml-auto cursor-pointer flex items-center gap-1 rounded border border-border/50 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              {transcriptOpen ? "Hide Transcript" : "Show Transcript"}
            </button>
          )}
        </div>
      </div>

      {/* Transcript sidebar — only rendered when open so video takes full width when closed */}
      {transcript.length > 0 && transcriptOpen && (
        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <TranscriptSidebar
            transcript={transcript}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
        </div>
      )}
    </div>
    {description && (
      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-foreground">Description</h2>
        <TimestampedText
          text={description}
          className="text-sm text-muted-foreground"
          onSeek={handleSeek}
        />
      </div>
    )}
    </>
  );
}
