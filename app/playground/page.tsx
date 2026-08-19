import Image from "next/image";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import { Playground } from "@/components/Playground";

const starter = `// Free playground — try any JavaScript OOP idea.
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return this.name + " barks";
  }
}

const rex = new Dog("Rex");
console.log(rex.speak());
console.log(rex instanceof Animal);
`;

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="overflow-hidden rounded-3xl border border-line">
        <div className="relative h-52">
          <Image src="/images/playground.webp" alt="Playground" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h1 className="text-3xl font-semibold">Open playground</h1>
            <p className="text-muted">No login. Run JavaScript in a sandbox and watch the console.</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Playground starter={starter} goal="Print something using classes, prototypes, or composition." height={360} />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {curriculum.slice(0, 6).map((s) => (
          <Link key={s.id} href={`/learn/${(s.topics ?? s.groups?.[0].topics)?.[0].slug}`} className="rounded-2xl border border-line p-4 hover:bg-white/5">
            <div className="text-sm font-semibold">{s.title}</div>
            <div className="text-xs text-muted">{s.blurb}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
