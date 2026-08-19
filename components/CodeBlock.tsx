"use client";

export function CodeBlock({
  code,
  output,
  title,
}: {
  code: string;
  output?: string;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0a1220]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
        <span>{title ?? "example.js"}</span>
        <button
          className="rounded-md px-2 py-1 hover:bg-white/5"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 font-mono text-slate-200">
        <code>{highlight(code)}</code>
      </pre>
      {output ? (
        <div className="border-t border-line bg-black/30 px-4 py-3">
          <div className="mb-1 text-[10px] uppercase tracking-widest text-teal">
            Output
          </div>
          <pre className="font-mono text-[13px] text-emerald-200 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function highlight(code: string) {
  const tokens = code.split(/(\/\/.*$|`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b(?:class|constructor|extends|super|static|new|return|const|let|var|function|this|if|else|for|while|of|in|true|false|null|undefined|typeof|instanceof|export|import|from|try|catch|throw|async|await)\b)/gm);
  return tokens.map((tok, i) => {
    if (tok.startsWith("//")) {
      return (
        <span key={i} className="text-slate-500">
          {tok}
        </span>
      );
    }
    if (/^['"`]/.test(tok)) {
      return (
        <span key={i} className="text-amber-200">
          {tok}
        </span>
      );
    }
    if (
      /^(class|constructor|extends|super|static|new|return|const|let|var|function|this|if|else|for|while|of|in|true|false|null|undefined|typeof|instanceof|export|import|from|try|catch|throw|async|await)$/.test(
        tok,
      )
    ) {
      return (
        <span key={i} className="text-teal">
          {tok}
        </span>
      );
    }
    return <span key={i}>{tok}</span>;
  });
}
