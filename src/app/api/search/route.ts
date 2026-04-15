import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json({ byTitle: [], byTranscript: [] });

  const payload = await getPayload({ config });

  const [byTitle, byTranscript] = await Promise.all([
    payload.find({
      collection: "videos",
      where: {
        or: [{ title: { like: q } }, { description: { like: q } }],
      },
      limit: 5,
      depth: 0,
    }),
    payload.find({
      collection: "videos",
      where: { "transcript.text": { like: q } },
      limit: 5,
      depth: 0,
    }),
  ]);

  // Dedupe transcript results that already appear in title results
  const titleIds = new Set(byTitle.docs.map((v) => v.id));
  const uniqueTranscript = byTranscript.docs.filter((v) => !titleIds.has(v.id));

  return NextResponse.json({
    byTitle: byTitle.docs,
    byTranscript: uniqueTranscript,
  });
}
