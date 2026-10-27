import type { ReactNode } from "react";

// Just enough highlighting for the one snippet this shows: strings, keys, keywords.
const token = /("[^"]*")|(\b[a-zA-Z]+)(?=:)|\b(const|export)\b/g;

function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(token)) {
    out.push(line.slice(last, m.index));
    const kind = m[1] ? "str" : m[2] ? "key" : "kw";
    out.push(
      <span key={m.index} className={`tok-${kind}`}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return out;
}

/** A code-editor window. Screen readers get `label` instead of the code. */
export function CodePanel({ file, code, label }: { file: string; code: string; label: string }) {
  const lines = code.trim().split("\n");
  return (
    <figure className="code-panel" aria-label={label}>
      <div className="code-bar" aria-hidden="true">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-file">{file}</span>
      </div>
      <pre aria-hidden="true">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="code-line">
              {highlight(line)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
