import { curriculum, getSection } from "@/lib/curriculum";
import { topicsForSection } from "@/lib/content";
import { getSectionExam } from "@/lib/content/exams";
import ExamView from "@/components/ExamView";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return curriculum.map((s) => ({ section: s.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionId } = await params;
  const section = getSection(sectionId);
  const exam = getSectionExam(sectionId);
  const topics = topicsForSection(sectionId);
  if (!section || !exam) notFound();
  return (
    <ExamView
      section={section}
      exam={exam}
      topicCount={topics.length}
      firstSlug={topics[0]?.slug ?? "objects"}
    />
  );
}
