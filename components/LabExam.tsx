"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { LabCheck } from "@/lib/types";
import { markComplete } from "@/lib/progress";

export function LabExam({
  title,
  brief,
  starter,
  hint,
  checks,
  slug,
}: {
  title: string;
  brief: string;
  starter: string;
  hint: string;
  checks: LabCheck[];
  slug?: string;
}) {
  const [code, setCode] = useState(starter);
  const [results, setResults] = useState<boolean[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const nonceId = useId();
  const nonce = useRef(nonceId);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeStarter, setActiveStarter] = useState(starter);
  if (starter !== activeStarter) {
    setActiveStarter(starter);
    setCode(starter);
    setResults(null);
    setError(null);
    setShowHint(false);
  }

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const data = e.data;
      if (!data || data.nonce !== nonce.current) return;
      if (data.type === "lab-error") {
        setError(data.message);
        setResults(checks.map(() => false));
      }
      if (data.type === "lab-result") {
        setError(null);
        setResults(data.results);
        if (slug && data.results.every(Boolean)) markComplete(slug);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [checks, slug]);

  function run() {
    setError(null);
    setResults(null);
    const checkJs = checks
      .map(
        (c) =>
          `(function(){ try { return !!(${c.expression}); } catch (e) { return false; } })()`,
      )
      .join(",");
    const src = `<!DOCTYPE html><html><body><script>
      const nonce = ${JSON.stringify(nonce.current)};
      try {
        ${code}
        const results = [${checkJs}];
        parent.postMessage({ type: "lab-result", nonce, results }, "*");
      } catch (err) {
        parent.postMessage({ type: "lab-error", nonce, message: String(err && err.message ? err.message : err) }, "*");
      }
    </script></body></html>`;
    if (iframeRef.current) iframeRef.current.srcdoc = src;
  }

  const passed = results?.every(Boolean);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-card">
      <div className="border-b border-line px-5 py-4">
        <div className="text-sm uppercase tracking-widest text-pink">Mini lab</div>
        <h3 className="mt-1 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted">{brief}</p>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="min-h-[240px] w-full bg-[#0a1220] p-4 font-mono text-[13px] leading-6 outline-none"
      />
      <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
        <button
          onClick={run}
          className="rounded-lg bg-pink px-3 py-1.5 text-sm font-semibold text-black"
        >
          Run tests
        </button>
        <button
          onClick={() => setCode(starter)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted"
        >
          Reset
        </button>
        <button
          onClick={() => setShowHint((v) => !v)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted"
        >
          {showHint ? "Hide hint" : "Show hint"}
        </button>
        {passed ? (
          <span className="text-sm text-teal">All checks passed. Nice.</span>
        ) : null}
      </div>
      {showHint ? (
        <div className="border-t border-line px-4 py-3 text-sm text-amber-200">{hint}</div>
      ) : null}
      {error ? (
        <div className="border-t border-line px-4 py-3 font-mono text-sm text-pink">{error}</div>
      ) : null}
      <ul className="space-y-2 border-t border-line px-4 py-4">
        {checks.map((c, i) => (
          <li key={c.id} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-0.5 h-4 w-4 shrink-0 rounded-full ${
                results
                  ? results[i]
                    ? "bg-teal"
                    : "bg-pink"
                  : "bg-white/15"
              }`}
            />
            {c.description}
          </li>
        ))}
      </ul>
      <iframe ref={iframeRef} className="hidden" sandbox="allow-scripts" title="lab-runner" />
    </div>
  );
}
