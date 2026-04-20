import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";
import type { Video } from "../../payload-types";

type Resource = NonNullable<Video["resources"]>[number];

interface ResourcesSectionProps {
  resources: Resource[];
}

async function CodeBlock({
  language,
  code,
}: {
  language?: string | null;
  code: string;
}) {
  const lang = language ?? "plaintext";
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  }).catch(() => codeToHtml(code, { lang: "plaintext", theme: "github-dark" }));

  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-4 py-1.5">
        <span className="text-[11px] text-muted-foreground">{lang}</span>
        <CopyButton code={code} />
      </div>
      <div
        className="overflow-x-auto p-4 text-sm [&>pre]:m-0 [&>pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export async function ResourcesSection({ resources }: ResourcesSectionProps) {
  const codeSnippets = resources.filter((r) => r.blockType === "codeSnippet");
  const externalLinks = resources.filter((r) => r.blockType === "externalLink");

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Resources
      </h2>

      {codeSnippets.length > 0 && (
        <div className="flex flex-col gap-4">
          {codeSnippets.map((r, i) => {
            if (r.blockType !== "codeSnippet") return null;
            return (
              <CodeBlock key={i} language={r.language} code={r.code ?? ""} />
            );
          })}
        </div>
      )}

      {externalLinks.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {externalLinks.map((r, i) => {
            if (r.blockType !== "externalLink") return null;
            return (
              <li key={i}>
                <a
                  href={r.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline-offset-4 hover:underline"
                >
                  {r.label ?? r.url}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
