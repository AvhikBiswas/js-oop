"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LogMsg =
  | { type: "log"; data: string }
  | { type: "error"; message: string }
  | { type: "done"; logs: string[] }
  | { type: "lab"; results: boolean[] };

export function Playground({
  starter,
  goal,
  height = 280,
}: {
  starter: string;
  goal?: string;
  height?: number;
}) {
  const [code, setCode] = useState(starter);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeStarter, setActiveStarter] = useState(starter);
  if (starter !== activeStarter) {
    setActiveStarter(starter);
    setCode(starter);
    setLogs([]);
    setError(null);
  }

  useEffect(() => {
    const onMsg = (e: MessageEvent<LogMsg>) => {
      const msg = e.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "log") {
        setLogs((prev) => [...prev, msg.data]);
      } else if (msg.type === "error") {
        setError(msg.message);
      } else if (msg.type === "done") {
        setLogs(msg.logs);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const srcDoc = useMemo(() => wrap(code), [code]);

  function run() {
    setLogs([]);
    setError(null);
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.srcdoc = srcDoc;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0b1324]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Live playground</div>
          {goal ? <div className="text-xs text-muted">{goal}</div> : null}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCode(starter)}
            className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-text"
          >
            Reset
          </button>
          <button
            onClick={run}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-black"
          >
            Run
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{ height }}
          className="w-full resize-y border-b border-line bg-transparent p-4 font-mono text-[13px] leading-6 text-slate-100 outline-none lg:border-b-0 lg:border-r"
        />
        <div className="p-4" style={{ minHeight: height }}>
          <div className="mb-2 text-[10px] uppercase tracking-widest text-muted">
            Console
          </div>
          {error ? (
            <div className="rounded-lg bg-pink/10 p-3 font-mono text-sm text-pink">
              {error}
            </div>
          ) : logs.length ? (
            <div className="space-y-1 font-mono text-sm text-emerald-200">
              {logs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Press Run to see console.log output.</p>
          )}
        </div>
      </div>
      <iframe ref={iframeRef} className="hidden" sandbox="allow-scripts" title="playground" />
    </div>
  );
}

export function wrap(code: string, extra = "") {
  const payload = JSON.stringify(`${code}\n${extra}`);
  return `<!DOCTYPE html><html><body><script>
    const logs = [];
    const fmt = (v) => {
      if (typeof v === "string") return v;
      try { return JSON.stringify(v); } catch { return String(v); }
    };
    console.log = (...args) => {
      const line = args.map(fmt).join(" ");
      logs.push(line);
      parent.postMessage({ type: "log", data: line }, "*");
    };
    try {
      eval(${payload});
      ${extra ? "" : "parent.postMessage({ type: 'done', logs }, '*');"}
    } catch (err) {
      parent.postMessage({ type: "error", message: String(err && err.message ? err.message : err) }, "*");
    }
  </script></body></html>`;
}
