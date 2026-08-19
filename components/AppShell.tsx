"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { curriculum, flattenTopics } from "@/lib/curriculum";
import { getProgress } from "@/lib/progress";

function subscribeProgress(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("oop-progress", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("oop-progress", cb);
  };
}

function progressSnapshot() {
  return JSON.stringify(getProgress());
}

function emptyProgress() {
  return "[]";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const done = JSON.parse(
    useSyncExternalStore(subscribeProgress, progressSnapshot, emptyProgress),
  ) as string[];
  const [pathForMenu, setPathForMenu] = useState(pathname);
  if (pathname !== pathForMenu) {
    setPathForMenu(pathname);
    setOpen(false);
  }

  const total = flattenTopics().length;
  const pct = Math.round((done.length / total) * 100);

  const navLink = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        href={href}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          active
            ? "bg-accent text-black font-semibold"
            : "text-muted hover:text-text hover:bg-white/5"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-[#070b16]/85 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-3 sm:px-5">
          <button
            className="lg:hidden rounded-lg border border-line px-2.5 py-1.5 text-sm text-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle topics"
          >
            Topics
          </button>
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-black text-black">
              JS
            </span>
            <span className="truncate font-semibold tracking-tight">
              OOP Academy
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navLink("/", "Home")}
            {navLink("/learn/objects", "Learn")}
            {navLink("/playground", "Playground")}
            {navLink("/exams", "Lab Exams")}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-teal"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {pct}%
            </div>
            <SearchBox query={query} setQuery={setQuery} />
          </div>
        </div>
      </header>
      <div className="flex">
        <aside
          className={`${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-[300px] shrink-0 border-r border-line bg-[#0a1222] transition-transform`}
        >
          <Sidebar done={done} query={query} />
        </aside>
        {open ? (
          <button
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
        ) : null}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function SearchBox({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flattenTopics()
      .filter((t) => t.title.toLowerCase().includes(q) || t.slug.includes(q))
      .slice(0, 8);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search topics"
        className="w-36 sm:w-52 rounded-full border border-line bg-white/5 px-3 py-1.5 text-sm outline-none placeholder:text-muted/70 focus:border-teal/50"
      />
      {results.length > 0 ? (
        <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-line bg-[#121a30] shadow-2xl">
          {results.map((t) => (
            <Link
              key={t.slug}
              href={`/learn/${t.slug}`}
              onClick={() => setQuery("")}
              className="block px-3 py-2 text-sm hover:bg-white/5"
            >
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-muted">{t.sectionTitle}</div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Sidebar({ done, query }: { done: string[]; query: string }) {
  return <TopicNav done={done} filter={query} />;
}

function TopicNav({ done, filter }: { done: string[]; filter: string }) {
  return (
    <nav className="scrollbar-thin h-full overflow-y-auto p-3 pb-10">
      <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-muted">
        Nested syllabus
      </p>
      <TopicTree done={done} filter={filter} />
    </nav>
  );
}

function TopicTree({ done, filter }: { done: string[]; filter: string }) {
  const pathname = usePathname();
  const q = filter.trim().toLowerCase();

  return (
    <div className="space-y-1">
      {curriculum.map((section) => {
        const topics = [
          ...(section.topics ?? []),
          ...(section.groups?.flatMap((g) => g.topics) ?? []),
        ];
        const visible =
          !q ||
          section.title.toLowerCase().includes(q) ||
          topics.some(
            (t) => t.title.toLowerCase().includes(q) || t.slug.includes(q),
          );
        if (!visible) return null;
        return (
          <details
            key={section.id}
            open={
              pathname.includes(`/exam/${section.id}`) ||
              topics.some((t) => pathname === `/learn/${t.slug}`) ||
              Boolean(q)
            }
            className="rounded-xl border border-transparent open:border-line open:bg-white/[0.03]"
          >
            <summary className="cursor-pointer list-none px-2 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: section.accent }} />
              {section.title}
            </summary>
            <div className="pb-2 pl-3">
              {section.topics?.map((t) => (
                <TopicLink
                  key={t.slug}
                  slug={t.slug}
                  title={t.title}
                  active={pathname === `/learn/${t.slug}`}
                  done={done.includes(t.slug)}
                />
              ))}
              {section.groups?.map((g) => (
                <details key={g.id} open className="ml-1 mt-1">
                  <summary className="cursor-pointer list-none px-2 py-1 text-xs uppercase tracking-wider text-teal">
                    {g.title}
                  </summary>
                  {g.topics.map((t) => (
                    <TopicLink
                      key={t.slug}
                      slug={t.slug}
                      title={t.title}
                      active={pathname === `/learn/${t.slug}`}
                      done={done.includes(t.slug)}
                    />
                  ))}
                </details>
              ))}
              <Link
                href={`/exam/${section.id}`}
                className={`mt-1 ml-2 block rounded-lg px-2 py-1 text-xs ${
                  pathname === `/exam/${section.id}`
                    ? "bg-pink/20 text-pink"
                    : "text-muted hover:text-text"
                }`}
              >
                Section lab exam
              </Link>
            </div>
          </details>
        );
      })}
    </div>
  );
}

function TopicLink({
  slug,
  title,
  active,
  done,
}: {
  slug: string;
  title: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <Link
      href={`/learn/${slug}`}
      className={`ml-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] ${
        active ? "bg-accent/15 text-accent" : "text-muted hover:bg-white/5 hover:text-text"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${done ? "bg-teal" : "bg-white/20"}`}
      />
      {title}
    </Link>
  );
}
