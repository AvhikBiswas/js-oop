import { getTopic } from "@/lib/content";
import { flattenTopics, getTopicNav } from "@/lib/curriculum";
import { TopicView } from "@/components/TopicView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return flattenTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return {
    title: topic ? `${topic.title} · JS OOP Academy` : "JS OOP Academy",
    description: topic?.summary,
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  const nav = getTopicNav(slug);
  if (!topic || !nav) notFound();
  return <TopicView topic={topic} image={nav.image} />;
}
