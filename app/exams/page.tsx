import Image from "next/image";
import Link from "next/link";
import { curriculum, flattenTopics } from "@/lib/curriculum";

export default function ExamsPage() {
  const total = flattenTopics().length;
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="overflow-hidden rounded-3xl border border-line">
        <div className="relative h-52">
          <Image src="/images/lab-exam.webp" alt="Lab exams" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h1 className="text-3xl font-semibold">Lab exams</h1>
            <p className="text-muted">
              {curriculum.length} chapter exams covering {total} topics. Public, scored in your browser.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {curriculum.map((s, i) => (
          <Link
            key={s.id}
            href={`/exam/${s.id}`}
            className="overflow-hidden rounded-2xl border border-line bg-bg-card hover:border-white/20"
          >
            <div className="relative h-32">
              <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-4">
              <div className="text-xs text-muted">Exam {String(i + 1).padStart(2, "0")}</div>
              <div className="font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted">{s.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
