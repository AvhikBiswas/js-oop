"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { markComplete } from "@/lib/progress";

export function Quiz({
  questions,
  slug,
}: {
  questions: QuizQuestion[];
  slug?: string;
}) {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => questions.filter((q) => picked[q.id] === q.answer).length,
    [picked, questions],
  );

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        const choice = picked[q.id];
        return (
          <div key={q.id} className="rounded-2xl border border-line bg-bg-card p-4">
            <div className="mb-3 text-sm font-semibold">
              {idx + 1}. {q.question}
            </div>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const selected = choice === i;
                let cls = "border-line hover:border-white/20";
                if (submitted) {
                  if (i === q.answer) cls = "border-teal bg-teal/10";
                  else if (selected) cls = "border-pink bg-pink/10";
                } else if (selected) {
                  cls = "border-accent bg-accent/10";
                }
                return (
                  <button
                    key={`${q.id}-${i}`}
                    onClick={() => {
                      setSubmitted(false);
                      setPicked((p) => ({ ...p, [q.id]: i }));
                    }}
                    className={`block w-full rounded-xl border px-3 py-2 text-left text-sm ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted ? (
              <p className="mt-3 text-sm text-muted">{q.explanation}</p>
            ) : null}
          </div>
        );
      })}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setSubmitted(true);
            const s = questions.filter((q) => picked[q.id] === q.answer).length;
            if (slug && s === questions.length) markComplete(slug);
          }}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-bold text-black"
        >
          Check answers
        </button>
        {submitted ? (
          <span className="text-sm text-muted">
            Score {score}/{questions.length}
            {score === questions.length ? " — topic marked complete" : ""}
          </span>
        ) : null}
      </div>
    </div>
  );
}
