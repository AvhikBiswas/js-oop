import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold">That lesson is not on the map.</h1>
      <p className="mt-3 text-muted">Use the nested syllabus on the left, or jump home.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-2 font-semibold text-black">
        Back to academy
      </Link>
    </div>
  );
}
