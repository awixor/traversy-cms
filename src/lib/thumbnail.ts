export function getThumb(video: {
  videoId: string;
  thumbnail?: string | null;
}): string {
  return (
    video.thumbnail ??
    `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
  );
}
