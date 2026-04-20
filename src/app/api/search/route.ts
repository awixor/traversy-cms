import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2)
    return NextResponse.json({ byTitle: [], byTranscript: [] });

  const payload = await getPayload({ config });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pool = (payload.db as any).pool;

  const [titleResult, transcriptResult] = await Promise.all([
    pool.query(
      `SELECT id, title, video_id, thumbnail
       FROM videos
       WHERE search_meta @@ websearch_to_tsquery('english', $1)
       LIMIT 5`,
      [q],
    ),
    pool.query(
      `WITH matching AS (
         SELECT DISTINCT ON (_parent_id) _parent_id, text, start, "end"
         FROM videos_transcript
         WHERE text_vector @@ websearch_to_tsquery('english', $1)
         ORDER BY _parent_id, _order
       )
       SELECT v.id, v.title, v.video_id, v.thumbnail,
              m.text AS segment_text, m.start AS segment_start, m."end" AS segment_end
       FROM matching m
       JOIN videos v ON v.id = m._parent_id
       LIMIT 5`,
      [q],
    ),
  ]);

  const titleIds = new Set(titleResult.rows.map((r: { id: number }) => r.id));

  const byTitle = titleResult.rows.map((r: { id: number; title: string; video_id: string; thumbnail: string }) => ({
    id: r.id,
    title: r.title,
    videoId: r.video_id,
    thumbnail: r.thumbnail,
  }));

  const byTranscript = transcriptResult.rows
    .filter((r: { id: number }) => !titleIds.has(r.id))
    .map((r: { id: number; title: string; video_id: string; thumbnail: string; segment_text: string; segment_start: number; segment_end: number }) => ({
      id: r.id,
      title: r.title,
      videoId: r.video_id,
      thumbnail: r.thumbnail,
      transcript: [{ text: r.segment_text, start: r.segment_start, end: r.segment_end }],
    }));

  return NextResponse.json({ byTitle, byTranscript });
}
