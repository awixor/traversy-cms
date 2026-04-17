import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2)
    return NextResponse.json({ byTitle: [], byTranscript: [] });

  const payload = await getPayload({ config });

  const [byTitle, byTranscript] = await Promise.all([
    payload.find({
      collection: "videos",
      where: {
        or: [{ title: { like: q } }, { description: { like: q } }],
      },
      limit: 5,
      depth: 0,
      select: {
        id: true,
        title: true,
        videoId: true,
        thumbnail: true,
      },
    }),
    payload.find({
      collection: "videos",
      where: { "transcript.text": { like: q } },
      limit: 5,
      depth: 0,
      select: {
        id: true,
        title: true,
        videoId: true,
        thumbnail: true,
        transcript: true,
      },
    }),
  ]);

  // Strip transcript to only include matching segments for search results
  const processedTranscriptResults = byTranscript.docs.map((video) => {
    const matchingSegments = (video.transcript ?? []).filter((seg) =>
      seg.text.toLowerCase().includes(q.toLowerCase()),
    );
    return {
      ...video,
      transcript: matchingSegments.slice(0, 1), // Only return the first matching segment
    };
  });

  // Dedupe transcript results that already appear in title results
  const titleIds = new Set(byTitle.docs.map((v) => v.id));
  const uniqueTranscript = processedTranscriptResults.filter(
    (v) => !titleIds.has(v.id),
  );

  return NextResponse.json({
    byTitle: byTitle.docs,
    byTranscript: uniqueTranscript,
  });
}
