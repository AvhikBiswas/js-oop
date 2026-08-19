import Image from "next/image";
import Link from "next/link";
import { curriculum, flattenTopics } from "@/lib/curriculum";

export default function HomePage() {
  const topics = flattenTopics();
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="relative h-[420px] sm:h-[520px]">
          <Image src="/images/hero.webp" alt="JavaScript OOP Academy" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b16] via-[#070b16]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-6 sm:px-10">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Public classroom · no account</p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
                Learn JavaScript OOP so it actually sticks.
              </h1>
              <p className="mt-4 text-lg text-muted">
                {topics.length} nested lessons with theory, sticky notes, diagrams, live playgrounds, MCQs, and mini lab exams.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/learn/objects" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-black">
                  Start with Objects
                </Link>
                <Link href="/playground" className="rounded-full border border-line px-5 py-2.5">
                  Open playground
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        <h2 className="text-2xl font-semibold">How a lesson works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Theory + visual", "Short explanations, an analogy, and a memory diagram."],
            ["Playground", "Edit real JavaScript and read the console instantly."],
            ["MCQ + lab exam", "Check recall, then write a tiny working snippet."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-line bg-bg-card p-5">
              <div className="font-semibold">{t}</div>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <h2 className="text-2xl font-semibold">Full syllabus</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {curriculum.map((s, i) => {
            const count =
              (s.topics?.length ?? 0) +
              (s.groups?.reduce((n, g) => n + g.topics.length, 0) ?? 0);
            const first = (s.topics ?? s.groups?.[0].topics)?.[0];
            return (
              <Link
                key={s.id}
                href={`/learn/${first?.slug ?? "objects"}`}
                className="group overflow-hidden rounded-3xl border border-line bg-bg-card"
              >
                <div className="relative h-40">
                  <Image src={s.image} alt={s.title} fill className="object-cover transition group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/50 px-2 py-1 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-teal">
                    {count} topics · lab exam included
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
