"use client";

export function ConceptDiagram({ slug, sectionId }: { slug: string; sectionId: string }) {
  const kind = diagramKind(slug, sectionId);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0b1324] p-4">
      <div className="mb-3 text-[10px] uppercase tracking-widest text-muted">
        Visual memory map
      </div>
      <svg viewBox="0 0 720 220" className="h-auto w-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#f7df1e" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#2dd4bf" />
          </marker>
        </defs>
        {kind === "class" ? <ClassDiagram /> : null}
        {kind === "proto" ? <ProtoDiagram /> : null}
        {kind === "inherit" ? <InheritDiagram /> : null}
        {kind === "poly" ? <PolyDiagram /> : null}
        {kind === "encap" ? <EncapDiagram /> : null}
        {kind === "solid" ? <SolidDiagram /> : null}
        {kind === "compose" ? <ComposeDiagram /> : null}
        {kind === "pattern" ? <PatternDiagram /> : null}
        {kind === "bind" ? <BindDiagram /> : null}
        {kind === "lock" ? <LockDiagram /> : null}
      </svg>
    </div>
  );
}

function diagramKind(slug: string, sectionId: string) {
  if (sectionId === "prototypes") return "proto";
  if (sectionId === "inheritance") return "inherit";
  if (sectionId === "polymorphism" || slug.includes("duck") || slug.includes("runtime-poly"))
    return "poly";
  if (sectionId === "encapsulation") return "encap";
  if (sectionId === "solid") return "solid";
  if (sectionId === "composition" || slug.includes("composition") || slug.includes("mixin"))
    return "compose";
  if (sectionId === "design-patterns") return "pattern";
  if (sectionId === "function-oop" || slug.includes("bind") || slug.includes("this"))
    return "bind";
  if (sectionId === "object-utilities") return "lock";
  return "class";
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  fill = "#151d33",
  stroke = "#2dd4bf",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  fill?: string;
  stroke?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={fill} stroke={stroke} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} textAnchor="middle" fill="#e8eefc" fontSize="14" fontFamily="Outfit, sans-serif">
        {label}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fill="#93a0c0" fontSize="11" fontFamily="Outfit, sans-serif">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g1)" strokeWidth="2" markerEnd="url(#arrow)" />
  );
}

function ClassDiagram() {
  return (
    <g>
      <Box x={40} y={40} w={180} h={70} label="class Car" sub="blueprint" stroke="#f7df1e" />
      <Box x={320} y={20} w={150} h={60} label="honda" sub="instance" />
      <Box x={500} y={20} w={150} h={60} label="tesla" sub="instance" />
      <Box x={410} y={130} w={150} h={60} label="this" sub="current instance" stroke="#fb7185" />
      <Arrow x1={220} y1={70} x2={320} y2={50} />
      <Arrow x1={220} y1={70} x2={500} y2={50} />
      <Arrow x1={395} y1={80} x2={480} y2={130} />
    </g>
  );
}

function ProtoDiagram() {
  return (
    <g>
      <Box x={40} y={80} w={140} h={60} label="obj" sub="own props" />
      <Box x={250} y={80} w={160} h={60} label="obj.__proto__" sub="shared methods" stroke="#60a5fa" />
      <Box x={490} y={80} w={190} h={60} label="Object.prototype" sub="toString, hasOwn" stroke="#f7df1e" />
      <Arrow x1={180} y1={110} x2={250} y2={110} />
      <Arrow x1={410} y1={110} x2={490} y2={110} />
    </g>
  );
}

function InheritDiagram() {
  return (
    <g>
      <Box x={280} y={20} w={150} h={50} label="Animal" stroke="#f7df1e" />
      <Box x={80} y={130} w={140} h={50} label="Dog" />
      <Box x={290} y={130} w={140} h={50} label="Cat" />
      <Box x={500} y={130} w={140} h={50} label="Bird" />
      <Arrow x1={155} y1={130} x2={320} y2={70} />
      <Arrow x1={360} y1={130} x2={355} y2={70} />
      <Arrow x1={570} y1={130} x2={390} y2={70} />
    </g>
  );
}

function PolyDiagram() {
  return (
    <g>
      <Box x={250} y={20} w={220} h={50} label="speak()" stroke="#c084fc" />
      <Box x={40} y={130} w={140} h={50} label="Dog: woof" />
      <Box x={290} y={130} w={140} h={50} label="Duck: quack" />
      <Box x={540} y={130} w={140} h={50} label="Robot: beep" />
      <Arrow x1={110} y1={130} x2={310} y2={70} />
      <Arrow x1={360} y1={130} x2={360} y2={70} />
      <Arrow x1={610} y1={130} x2={410} y2={70} />
    </g>
  );
}

function EncapDiagram() {
  return (
    <g>
      <rect x="160" y="30" width="400" height="160" rx="18" fill="#151d33" stroke="#fb7185" />
      <text x="360" y="58" textAnchor="middle" fill="#fb7185" fontSize="14">
        object wall
      </text>
      <Box x={190} y={80} w={140} h={70} label="#secret" sub="private" fill="#2a1420" stroke="#fb7185" />
      <Box x={390} y={80} w={140} h={70} label="get/set" sub="public door" stroke="#2dd4bf" />
    </g>
  );
}

function SolidDiagram() {
  const items = ["SRP", "OCP", "LSP", "ISP", "DIP"];
  return (
    <g>
      {items.map((label, i) => (
        <Box key={label} x={30 + i * 140} y={70} w={120} h={70} label={label} stroke={i % 2 ? "#f7df1e" : "#2dd4bf"} />
      ))}
    </g>
  );
}

function ComposeDiagram() {
  return (
    <g>
      <Box x={40} y={80} w={110} h={55} label="canFly" />
      <Box x={170} y={80} w={110} h={55} label="canSwim" />
      <Box x={300} y={80} w={110} h={55} label="canWalk" stroke="#f7df1e" />
      <Box x={500} y={70} w={170} h={75} label="Duck" sub="has fly + swim + walk" stroke="#2dd4bf" />
      <Arrow x1={410} y1={110} x2={500} y2={110} />
    </g>
  );
}

function PatternDiagram() {
  return (
    <g>
      <Box x={40} y={70} w={180} h={70} label="Creational" sub="make objects" stroke="#f59e0b" />
      <Box x={270} y={70} w={180} h={70} label="Structural" sub="shape objects" stroke="#60a5fa" />
      <Box x={500} y={70} w={180} h={70} label="Behavioral" sub="talk & flow" stroke="#c084fc" />
    </g>
  );
}

function BindDiagram() {
  return (
    <g>
      <Box x={40} y={75} w={140} h={60} label="fn.call" sub="this + args" />
      <Box x={250} y={75} w={140} h={60} label="fn.apply" sub="this + array" stroke="#60a5fa" />
      <Box x={460} y={75} w={200} h={60} label="fn.bind" sub="new function + this" stroke="#f7df1e" />
    </g>
  );
}

function LockDiagram() {
  return (
    <g>
      <Box x={40} y={75} w={180} h={60} label="freeze" sub="no change at all" stroke="#fb7185" />
      <Box x={270} y={75} w={180} h={60} label="seal" sub="no add/remove" stroke="#f59e0b" />
      <Box x={500} y={75} w={180} h={60} label="preventExt" sub="no add" stroke="#2dd4bf" />
    </g>
  );
}
