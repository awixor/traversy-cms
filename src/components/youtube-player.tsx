"use client";

import { useEffect, useRef } from "react";

// Minimal local types for the YouTube IFrame API
interface YTPlayer {
  getCurrentTime(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  destroy(): void;
}

interface YTWindow {
  YT: {
    Player: new (
      el: HTMLElement,
      opts: {
        videoId: string;
        width?: string | number;
        height?: string | number;
        playerVars?: Record<string, number>;
        events?: {
          onReady?: (e: { target: YTPlayer }) => void;
          onStateChange?: (e: { data: number }) => void;
        };
      },
    ) => YTPlayer;
    PlayerState: { PLAYING: number };
  };
  onYouTubeIframeAPIReady: () => void;
}

declare global {
  interface Window extends YTWindow {}
}

interface YouTubePlayerProps {
  videoId: string;
  onTimeUpdate?: (currentTime: number) => void;
  onReady?: (player: YTPlayer) => void;
}

export function YouTubePlayer({ videoId, onTimeUpdate, onReady }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function initPlayer() {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: { modestbranding: 1, rel: 0 },
        events: {
          onReady: (event) => {
            onReady?.(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = setInterval(() => {
                const t = playerRef.current?.getCurrentTime?.() ?? 0;
                onTimeUpdate?.(t);
              }, 500);
            } else {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            }
          },
        },
      });
    }

    if (typeof window.YT !== "undefined" && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const script = document.createElement("script");
        script.id = "yt-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy?.();
    };
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}

export type { YTPlayer };
