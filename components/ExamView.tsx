"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NavSection } from "@/lib/types";
import type { SectionExam } from "@/lib/content/exams";
import { Quiz } from "@/components/Quiz";
import { LabExam } from "@/components/LabExam";
import { Playground } from "@/components/Playground";

export default function ExamView({
  section,
  exam,
  topicCount,
  firstSlug,
}: {
  section: NavSection;
  exam: SectionExam;
  topicCount: number;
  firstSlug: string;
}) {
  const [tab, setTab] = useState<"mcq" | "lab" | "playground">("mcq");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="overflow-hidden rounded-3xl border border-line">
        <div className="relative h-52">
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] to-transparent" />
          <div className="absolute bottom-4 left-5">
            <div className="text-xs uppercase tracking-widest text-pink">Section lab exam</div>
            <h1 className="text-3xl font-semibold">{section.title}</h1>
          </div>
        </div>
      </div>
      <p className="mt-5 text-muted">
        {topicCount} topics in this chapter. Mix of MCQs, a lab, and a sandbox.
      </p>
      <div className="mt-6 flex gap-2">
        {(["mcq", "lab", "playground"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1.5 text-sm capitalize ${
              tab === t ? "bg-pink text-black font-semibold" : "border border-line text-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "mcq" ? <Quiz questions={exam.quiz} slug={`exam:${section.id}`} /> : null}
        {tab === "lab" ? (
          <LabExam
            title={exam.lab.title}
            brief={exam.lab.brief}
            starter={exam.lab.starter}
            hint={exam.lab.hint}
            checks={exam.lab.checks}
            slug={`exam:${section.id}`}
          />
        ) : null}
        {tab === "playground" ? (
          <Playground starter={exam.playground} goal="Experiment with this chapter's ideas." />
        ) : null}
      </div>
      <div className="mt-8 text-sm">
        <Link href={`/learn/${firstSlug}`} className="text-muted hover:text-text">
          ← Back to lessons
        </Link>
      </div>
    </div>
  );
}
