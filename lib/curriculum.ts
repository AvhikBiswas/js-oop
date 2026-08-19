import type { NavSection } from "./types";

export const curriculum: NavSection[] = [
  {
    id: "objects-classes",
    title: "Objects & Classes",
    blurb: "Blueprints, instances, this, and static vs instance members.",
    image: "/images/objects-classes.webp",
    accent: "#f7df1e",
    topics: [
      { slug: "objects", title: "Objects" },
      { slug: "classes", title: "Classes" },
      { slug: "constructors", title: "Constructors" },
      { slug: "this-keyword", title: "this Keyword" },
      { slug: "instance-properties", title: "Instance Properties" },
      { slug: "instance-methods", title: "Instance Methods" },
      { slug: "static-properties", title: "Static Properties" },
      { slug: "static-methods", title: "Static Methods" },
    ],
  },
  {
    id: "prototypes",
    title: "Prototypes",
    blurb: "The real engine of JS OOP: prototype chain, new, and Object.create.",
    image: "/images/prototypes.webp",
    accent: "#2dd4bf",
    topics: [
      { slug: "prototype", title: "Prototype" },
      { slug: "prototype-chain", title: "Prototype Chain" },
      { slug: "dunder-proto", title: "__proto__" },
      { slug: "prototype-property", title: "prototype" },
      { slug: "object-create", title: "Object.create()" },
      { slug: "get-prototype-of", title: "Object.getPrototypeOf()" },
      { slug: "set-prototype-of", title: "Object.setPrototypeOf()" },
      { slug: "constructor-functions", title: "Constructor Functions" },
      { slug: "new-keyword", title: "new Keyword" },
      { slug: "function-constructors", title: "Function Constructors" },
    ],
  },
  {
    id: "inheritance",
    title: "Inheritance",
    blurb: "How objects reuse behavior: trees, mixins, and delegation.",
    image: "/images/inheritance.webp",
    accent: "#60a5fa",
    topics: [
      { slug: "single-inheritance", title: "Single Inheritance" },
      { slug: "multilevel-inheritance", title: "Multilevel Inheritance" },
      { slug: "hierarchical-inheritance", title: "Hierarchical Inheritance" },
      { slug: "multiple-inheritance-limitations", title: "Multiple Inheritance Limitations" },
      { slug: "hybrid-inheritance", title: "Hybrid Inheritance" },
      { slug: "mixins", title: "Mixins" },
      { slug: "composition-vs-inheritance", title: "Composition vs Inheritance" },
      { slug: "delegation", title: "Delegation" },
    ],
  },
  {
    id: "polymorphism",
    title: "Polymorphism",
    blurb: "Same message, different behavior. Override, duck typing, instanceof.",
    image: "/images/polymorphism.webp",
    accent: "#c084fc",
    topics: [
      { slug: "method-overriding", title: "Method Overriding" },
      { slug: "method-overloading", title: "Method Overloading" },
      { slug: "duck-typing", title: "Duck Typing" },
      { slug: "instanceof", title: "instanceof" },
    ],
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    blurb: "Hide the vault. Public, private #, getters, setters, descriptors.",
    image: "/images/encapsulation.webp",
    accent: "#fb7185",
    topics: [
      { slug: "public-members", title: "Public Members" },
      { slug: "private-members", title: "Private Members (#)" },
      { slug: "protected-convention", title: "Protected-like Convention (_)" },
      { slug: "getters", title: "Getters" },
      { slug: "setters", title: "Setters" },
      { slug: "property-descriptors", title: "Property Descriptors" },
      { slug: "object-define-property", title: "Object.defineProperty()" },
    ],
  },
  {
    id: "abstraction",
    title: "Abstraction",
    blurb: "Show the steering wheel, hide the engine.",
    image: "/images/abstraction.webp",
    accent: "#34d399",
    topics: [
      { slug: "abstract-classes", title: "Abstract Classes Concept" },
      { slug: "abstract-methods", title: "Abstract Methods Concept" },
      { slug: "interface-concept", title: "Interface Concept" },
      { slug: "abstraction-using-classes", title: "Abstraction using Classes" },
      { slug: "abstraction-using-composition", title: "Abstraction using Composition" },
    ],
  },
  {
    id: "super-parent",
    title: "super & Parent Interaction",
    blurb: "Talk to the parent: super(), super.method(), init order.",
    image: "/images/super-parent.webp",
    accent: "#fbbf24",
    topics: [
      { slug: "super-call", title: "super()" },
      { slug: "super-method", title: "super.method()" },
      { slug: "parent-constructor", title: "Parent Constructor" },
      { slug: "parent-method", title: "Parent Method" },
      { slug: "constructor-initialization", title: "Constructor Initialization" },
    ],
  },
  {
    id: "object-utilities",
    title: "Object & Prototype Utilities",
    blurb: "Inspect, lock, and query objects like a language insider.",
    image: "/images/object-utilities.webp",
    accent: "#818cf8",
    topics: [
      { slug: "instanceof-util", title: "instanceof" },
      { slug: "is-prototype-of", title: "isPrototypeOf()" },
      { slug: "has-own-property", title: "hasOwnProperty()" },
      { slug: "object-has-own", title: "Object.hasOwn()" },
      { slug: "object-freeze", title: "Object.freeze()" },
      { slug: "object-seal", title: "Object.seal()" },
      { slug: "object-prevent-extensions", title: "Object.preventExtensions()" },
    ],
  },
  {
    id: "function-oop",
    title: "Function-Based OOP",
    blurb: "Factories, constructors, and the this-binding trio.",
    image: "/images/function-oop.webp",
    accent: "#22d3ee",
    topics: [
      { slug: "constructor-functions-fn", title: "Constructor Functions" },
      { slug: "factory-functions", title: "Factory Functions" },
      { slug: "new-keyword-fn", title: "new Keyword" },
      { slug: "call", title: "call()" },
      { slug: "apply", title: "apply()" },
      { slug: "bind", title: "bind()" },
      { slug: "this-binding", title: "this Binding" },
    ],
  },
  {
    id: "composition",
    title: "Composition",
    blurb: "Build objects from small capabilities instead of deep trees.",
    image: "/images/composition.webp",
    accent: "#a3e635",
    topics: [
      { slug: "composition", title: "Composition" },
      { slug: "delegation-comp", title: "Delegation" },
      { slug: "mixins-comp", title: "Mixins" },
      { slug: "dependency-injection", title: "Dependency Injection" },
      { slug: "composition-vs-inheritance-comp", title: "Composition vs Inheritance" },
    ],
  },
  {
    id: "solid",
    title: "SOLID Principles",
    blurb: "Five design rules that keep OOP code change-friendly.",
    image: "/images/solid.webp",
    accent: "#f472b6",
    topics: [
      { slug: "srp", title: "Single Responsibility (SRP)" },
      { slug: "ocp", title: "Open/Closed (OCP)" },
      { slug: "lsp", title: "Liskov Substitution (LSP)" },
      { slug: "isp", title: "Interface Segregation (ISP)" },
      { slug: "dip", title: "Dependency Inversion (DIP)" },
    ],
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    blurb: "Reusable object recipes: creational, structural, behavioral.",
    image: "/images/design-patterns.webp",
    accent: "#f59e0b",
    groups: [
      {
        id: "creational",
        title: "Creational Patterns",
        topics: [
          { slug: "factory-pattern", title: "Factory Pattern" },
          { slug: "abstract-factory-pattern", title: "Abstract Factory Pattern" },
          { slug: "builder-pattern", title: "Builder Pattern" },
          { slug: "singleton-pattern", title: "Singleton Pattern" },
          { slug: "prototype-pattern", title: "Prototype Pattern" },
        ],
      },
      {
        id: "structural",
        title: "Structural Patterns",
        topics: [
          { slug: "adapter-pattern", title: "Adapter Pattern" },
          { slug: "decorator-pattern", title: "Decorator Pattern" },
          { slug: "facade-pattern", title: "Facade Pattern" },
          { slug: "proxy-pattern", title: "Proxy Pattern" },
          { slug: "composite-pattern", title: "Composite Pattern" },
          { slug: "bridge-pattern", title: "Bridge Pattern" },
          { slug: "flyweight-pattern", title: "Flyweight Pattern" },
        ],
      },
      {
        id: "behavioral",
        title: "Behavioral Patterns",
        topics: [
          { slug: "observer-pattern", title: "Observer Pattern" },
          { slug: "strategy-pattern", title: "Strategy Pattern" },
          { slug: "command-pattern", title: "Command Pattern" },
          { slug: "state-pattern", title: "State Pattern" },
          { slug: "template-method-pattern", title: "Template Method Pattern" },
          { slug: "iterator-pattern", title: "Iterator Pattern" },
          { slug: "mediator-pattern", title: "Mediator Pattern" },
          { slug: "chain-of-responsibility-pattern", title: "Chain of Responsibility" },
          { slug: "visitor-pattern", title: "Visitor Pattern" },
          { slug: "memento-pattern", title: "Memento Pattern" },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced OOP Concepts",
    blurb: "Immutability, coupling, cohesion, lifecycle, and design tradeoffs.",
    image: "/images/advanced-oop.webp",
    accent: "#38bdf8",
    topics: [
      { slug: "immutability", title: "Immutability" },
      { slug: "encapsulation-vs-abstraction", title: "Encapsulation vs Abstraction" },
      { slug: "inheritance-vs-composition", title: "Inheritance vs Composition" },
      { slug: "runtime-polymorphism", title: "Runtime Polymorphism" },
      { slug: "duck-typing-advanced", title: "Duck Typing" },
      { slug: "dependency-injection-advanced", title: "Dependency Injection" },
      { slug: "loose-coupling", title: "Loose Coupling" },
      { slug: "high-cohesion", title: "High Cohesion" },
      { slug: "object-lifecycle", title: "Object Lifecycle" },
    ],
  },
];

export function flattenTopics() {
  return curriculum.flatMap((section) => {
    const direct = section.topics ?? [];
    const grouped = section.groups?.flatMap((g) => g.topics) ?? [];
    return [...direct, ...grouped].map((topic) => ({
      ...topic,
      sectionId: section.id,
      sectionTitle: section.title,
      image: section.image,
      accent: section.accent,
    }));
  });
}

export function getSection(id: string) {
  return curriculum.find((s) => s.id === id);
}

export function getTopicNav(slug: string) {
  return flattenTopics().find((t) => t.slug === slug);
}

export function neighbors(slug: string) {
  const all = flattenTopics();
  const i = all.findIndex((t) => t.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
    index: i,
    total: all.length,
  };
}
