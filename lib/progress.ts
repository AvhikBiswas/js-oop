const KEY = "js-oop-progress-v1";

export function getProgress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markComplete(slug: string) {
  const next = Array.from(new Set([...getProgress(), slug]));
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("oop-progress"));
}

export function isComplete(slug: string) {
  return getProgress().includes(slug);
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("oop-progress"));
}

export function examKey(sectionId: string) {
  return `exam:${sectionId}`;
}
