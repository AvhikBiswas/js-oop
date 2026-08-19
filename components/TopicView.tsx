"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Topic } from "@/lib/types";
import { neighbors } from "@/lib/curriculum";
import { CodeBlock } from "./CodeBlock";
import { Playground } from "./Playground";
import { Quiz } from "./Quiz";
import { LabExam } from "./LabExam";
import { ConceptDiagram } from "./ConceptDiagram";

const tabs = ["Theory", "Notes", "Examples", "Playground", "MCQ", "Lab"] as const;

export function TopicView({ topic, image }: { topic: Topic; image: string }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Theory");
  const { prev, next, index, total } = neighbors(topic.slug);

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="mb-6 flex items-center justify-between text-xs text-muted">
        <span>
          Lesson {index + 1} / {total}
        </span>
        <span className="rounded-full border border-line px-2 py-1 uppercase tracking-wider">
          {topic.level} · {topic.minutes} min
        </span>
      </div>
      <div className="overflow-hidden rounded-3xl border border-line">
        <div className="relative h-48 sm:h-64">
          <Image src={image} alt={topic.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">
              {topic.sectionId.replace(/-/g, " ")}
            </div>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{topic.title}</h1>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-lg text-muted">{topic.summary}</p>

      <div className="sticky top-16 z-10 mt-6 -mx-4 flex gap-1 overflow-x-auto border-b border-line bg-[#070b16]/90 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              tab === t ? "bg-accent text-black font-semibold" : "text-muted hover:text-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {tab === "Theory" ? (
          <>
            <ConceptDiagram slug={topic.slug} sectionId={topic.sectionId} />
            <div className="rounded-2xl border border-amber-200/20 bg-amber-200/10 p-5">
              <div className="text-xs uppercase tracking-widest text-accent">Analogy</div>
              <p className="mt-2 text-base">{topic.analogy}</p>
            </div>
            {topic.theory.map((block) => (
              <section key={block.heading}>
                <h2 className="text-xl font-semibold">{block.heading}</h2>
                <p className="mt-2 whitespace-pre-wrap text-muted leading-7">{block.body}</p>
              </section>
            ))}
          </>
        ) : null}

        {tab === "Notes" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {topic.remember.map((note) => (
              <div key={note} className="sticky-note rounded-md p-4 text-sm leading-6">
                {note}
              </div>
            ))}
            <div className="rounded-2xl border border-line p-4 sm:col-span-2">
              <h3 className="font-semibold">Watch-outs</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {topic.pitfalls.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {tab === "Examples" ? (
          <div className="space-y-6">
            <CodeBlock
              title={topic.example.title}
              code={topic.example.code}
              output={topic.example.output}
            />
            {topic.extraExample ? (
              <CodeBlock
                title={topic.extraExample.title}
                code={topic.extraExample.code}
                output={topic.extraExample.output}
              />
            ) : null}
          </div>
        ) : null}

        {tab === "Playground" ? (
          <Playground starter={topic.playground.starter} goal={topic.playground.goal} />
        ) : null}

        {tab === "MCQ" ? <Quiz questions={topic.quiz} slug={topic.slug} /> : null}

        {tab === "Lab" ? (
          <LabExam
            title={topic.lab.title}
            brief={topic.lab.brief}
            starter={topic.lab.starter}
            hint={topic.lab.hint}
            checks={topic.lab.checks}
            slug={topic.slug}
          />
        ) : null}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-sm">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="text-muted hover:text-text">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="text-muted hover:text-text">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
