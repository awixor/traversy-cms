const URL_REGEX = /https?:\/\/[^\s"]+/g;

interface PlainTextProps {
  text: string;
  className?: string;
}

export function PlainText({ text, className }: PlainTextProps) {
  // Strip wrapping quotes, replace literal \n with real newlines
  const normalized = text.replace(/^"|"$/g, "").replace(/\\n/g, "\n").trim();

  const paragraphs = normalized.split(/\n+/).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((para, i) => {
        const parts: React.ReactNode[] = [];
        let last = 0;

        for (const match of para.matchAll(URL_REGEX)) {
          const start = match.index!;
          if (start > last) parts.push(para.slice(last, start));
          parts.push(
            <a
              key={start}
              href={match[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {match[0]}
            </a>,
          );
          last = start + match[0].length;
        }
        if (last < para.length) parts.push(para.slice(last));

        return <p key={i} className="mb-2 last:mb-0">{parts}</p>;
      })}
    </div>
  );
}
