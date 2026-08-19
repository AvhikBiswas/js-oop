import type { Topic } from "../types";

export const structuralTopics: Topic[] = [
  {
    slug: "adapter-pattern",
    title: "Adapter Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "An adapter translates one object's interface into the interface the rest of the program already expects.",
    remember: [
      "The adapter wraps an existing object instead of rewriting it.",
      "The client depends on the adapter's target method names.",
      "Translation can include argument order, names, units, or return values.",
      "Adapters are useful at boundaries between old and new APIs.",
    ],
    theory: [
      { heading: "Target and adaptee", body: "The target is the shape the client wants. The adaptee is the useful but incompatible object already available. The adapter connects the two." },
      { heading: "Translation layer", body: "A method such as getTemperature can call a legacy readCelsius method and convert the result. The client never needs to know the legacy vocabulary." },
      { heading: "Small boundary", body: "Good adapters remain thin. They clarify integration without becoming a second business layer full of unrelated rules." },
    ],
    analogy: "A travel plug adapter lets a familiar device connect to a different wall socket without changing the device.",
    example: {
      title: "Adapt a legacy weather sensor",
      code: `class LegacySensor {
  readCelsius() { return 20; }
}
class FahrenheitSensorAdapter {
  constructor(sensor) { this.sensor = sensor; }
  readFahrenheit() { return this.sensor.readCelsius() * 9 / 5 + 32; }
}
function showTemperature(sensor) {
  return sensor.readFahrenheit() + "F";
}
console.log(showTemperature(new FahrenheitSensorAdapter(new LegacySensor())));`,
      output: "68F",
    },
    extraExample: {
      title: "Adapt a callback API",
      code: `function oldLookup(key, callback) { callback("value:" + key); }
function lookupAsPromise(key) {
  return new Promise((resolve) => oldLookup(key, resolve));
}
lookupAsPromise("id").then((value) => console.log(value));`,
      output: "value:id",
    },
    pitfalls: [
      "Changing the adaptee globally when a local wrapper would isolate the compatibility code.",
      "Forgetting to translate units or argument order at the boundary.",
      "Calling an adapter an abstraction while it still exposes every legacy detail.",
    ],
    playground: {
      starter: `class OldPrinter {
  printText(text) { return "printed:" + text; }
}
class PrinterAdapter {
  constructor(printer) { this.printer = printer; }
  print(text) {
    // translate to printText
  }
}`,
      goal: "Make PrinterAdapter satisfy the modern print(text) shape while reusing OldPrinter.",
    },
    quiz: [
      { id: "adapter-q1", question: "What does an adapter change?", options: ["The client's expected interface", "The adaptee's source code", "The JavaScript runtime", "The object's identity"], answer: 0, explanation: "It presents a target interface while translating calls to the adaptee." },
      { id: "adapter-q2", question: "Where is an adapter especially useful?", options: ["At an API boundary", "Inside a number literal", "For deleting arrays", "Only in CSS"], answer: 0, explanation: "Adapters isolate incompatible external or legacy interfaces." },
      { id: "adapter-q3", question: "What should an adapter usually be?", options: ["A thin translation layer", "A global database", "A replacement compiler", "An unrelated subclass"], answer: 0, explanation: "Its focused job is interface translation." },
    ],
    lab: {
      title: "Adapt an old printer",
      brief: "Implement PrinterAdapter.print(text) by delegating to OldPrinter.printText(text).",
      starter: `class OldPrinter {
  printText(text) { return "printed:" + text; }
}
class PrinterAdapter {
  constructor(printer) { this.printer = printer; }
  print(text) {}
}`,
      hint: "Return this.printer.printText(text).",
      checks: [
        { id: "adapter-l1", description: "adapter keeps the adaptee", expression: "new PrinterAdapter(new OldPrinter()).printer instanceof OldPrinter" },
        { id: "adapter-l2", description: "modern print delegates", expression: "new PrinterAdapter(new OldPrinter()).print('hi') === 'printed:hi'" },
      ],
    },
  },
  {
    slug: "decorator-pattern",
    title: "Decorator Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A decorator wraps an object to add behavior while preserving the same usable interface.",
    remember: [
      "Decorators compose behavior around a component at runtime.",
      "A decorator forwards the methods it does not replace.",
      "Several decorators can be stacked in a deliberate order.",
      "The wrapped component and decorator share the client-facing contract.",
    ],
    theory: [
      { heading: "Wrap, then forward", body: "A logging decorator can call service.save and add a log around it. Consumers still call save on the decorated object." },
      { heading: "Composition over subclass lists", body: "Decorators allow combinations such as cached, authorized, and logged without creating a subclass for every possible combination." },
      { heading: "Order is behavior", body: "cache(log(service)) differs from log(cache(service)). Decide whether a concern should happen before or after another wrapper." },
    ],
    analogy: "A phone case adds protection around the same phone controls; another case or sticker can add another layer.",
    example: {
      title: "Decorate a greeting",
      code: `const greeting = {
  greet(name) { return "Hello " + name; }
};
function withExcitement(component) {
  return {
    greet(name) { return component.greet(name) + "!"; }
  };
}
function withBrackets(component) {
  return {
    greet(name) { return "[" + component.greet(name) + "]"; }
  };
}
const decorated = withBrackets(withExcitement(greeting));
console.log(decorated.greet("Ada"));`,
      output: "[Hello Ada!]",
    },
    extraExample: {
      title: "Decorator that preserves another method",
      code: `function withTiming(worker) {
  return {
    run() { return "timed:" + worker.run(); },
    reset() { return worker.reset(); },
  };
}
const worker = { run: () => "done", reset: () => "clear" };
console.log(withTiming(worker).run(), withTiming(worker).reset());`,
      output: "timed:done clear",
    },
    pitfalls: [
      "Adding a method but forgetting to forward required methods from the component contract.",
      "Stacking wrappers in an order that changes security, caching, or logging semantics.",
      "Using a decorator when a simple function would express one transformation more clearly.",
    ],
    playground: {
      starter: `const coffee = {
  cost() { return 3; }
};
function withMilk(drink) {
  return {
    cost() {
      // include drink.cost()
    }
  };
}`,
      goal: "Return a decorated drink whose cost includes one dollar for milk.",
    },
    quiz: [
      { id: "decorator-q1", question: "What must a decorator usually preserve?", options: ["The component's client-facing interface", "The component's variable name", "Every private implementation detail", "A global singleton"], answer: 0, explanation: "The client should be able to use the wrapper like the original component." },
      { id: "decorator-q2", question: "What is a benefit of stacking decorators?", options: ["Runtime behavior composition", "Automatic type declarations", "Removing all methods", "Preventing object creation"], answer: 0, explanation: "Wrappers can be combined for flexible behavior." },
      { id: "decorator-q3", question: "Why can decorator order matter?", options: ["Wrappers execute in a sequence", "Methods are always random", "Strings cannot be wrapped", "Objects lose identity"], answer: 0, explanation: "The outer and inner wrapper order determines when each concern runs." },
    ],
    lab: {
      title: "Add milk to coffee",
      brief: "Implement withMilk(drink) with cost() returning the original cost plus one.",
      starter: `const coffee = {
  cost() { return 3; }
};
function withMilk(drink) {
  return { cost() { return 0; } };
}`,
      hint: "Call drink.cost() inside the returned cost method.",
      checks: [
        { id: "decorator-l1", description: "base drink still works", expression: "coffee.cost() === 3" },
        { id: "decorator-l2", description: "milk adds a cost", expression: "withMilk(coffee).cost() === 4" },
      ],
    },
  },
  {
    slug: "facade-pattern",
    title: "Facade Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "A facade offers one simple entry point over several subsystem operations.",
    remember: [
      "The facade simplifies a workflow, not necessarily the subsystems themselves.",
      "Clients call a focused method instead of coordinating many collaborators.",
      "The facade can enforce a useful order for subsystem calls.",
      "Subsystem objects remain available when advanced callers need them.",
    ],
    theory: [
      { heading: "One useful story", body: "A checkout facade can validate a cart, charge payment, and reserve stock through one checkout call. The caller sees the use case rather than the plumbing." },
      { heading: "Lower cognitive load", body: "The value is fewer details at the call site. The facade can also translate subsystem errors into a stable application-level result." },
      { heading: "Not a black hole", body: "A facade should stay cohesive around a workflow. If it grows into a class for every operation in the system, split it into smaller facades." },
    ],
    analogy: "A hotel concierge handles several departments for one guest request, so the guest does not call housekeeping, transport, and billing separately.",
    example: {
      title: "Start a video call",
      code: `const camera = { start: () => "camera on" };
const audio = { connect: () => "audio connected" };
const meeting = { join: () => "meeting joined" };
function videoCallFacade() {
  return {
    join() {
      return [camera.start(), audio.connect(), meeting.join()].join(" | ");
    },
  };
}
console.log(videoCallFacade().join());`,
      output: "camera on | audio connected | meeting joined",
    },
    extraExample: {
      title: "Facade around storage",
      code: `const memory = new Map();
function storageFacade() {
  return {
    save(key, value) { memory.set(key, JSON.stringify(value)); },
    load(key) { return JSON.parse(memory.get(key)); },
  };
}
const store = storageFacade();
store.save("user", { name: "Jo" });
console.log(store.load("user").name);`,
      output: "Jo",
    },
    pitfalls: [
      "Making the facade expose every subsystem method and recreating the complexity.",
      "Putting unrelated business workflows behind one enormous facade.",
      "Assuming a facade prevents direct subsystem use when the design does not require that.",
    ],
    playground: {
      starter: `const lights = { on: () => "lights on" };
const music = { play: () => "music playing" };
function movieFacade() {
  return {
    start() {
      // combine both subsystem calls
    }
  };
}`,
      goal: "Make start return both subsystem results in order, joined with a comma.",
    },
    quiz: [
      { id: "facade-q1", question: "What does a facade primarily provide?", options: ["A simpler entry point", "A new programming language", "A deep clone", "A private field"], answer: 0, explanation: "It gives clients a focused interface over subsystem work." },
      { id: "facade-q2", question: "Who coordinates the subsystem order?", options: ["The facade", "Every caller separately", "The garbage collector", "The browser tab"], answer: 0, explanation: "Centralized coordination is the facade's main convenience." },
      { id: "facade-q3", question: "What is a warning sign for a facade?", options: ["One cohesive workflow", "A method for every unrelated subsystem operation", "A stable result", "A small client API"], answer: 1, explanation: "An all-purpose facade can become a new source of complexity." },
    ],
    lab: {
      title: "Start a movie night",
      brief: "Implement movieFacade().start() to turn on lights and play music, returning the two messages joined by a comma.",
      starter: `const lights = { on: () => "lights on" };
const music = { play: () => "music playing" };
function movieFacade() {
  return {
    start() { return ""; }
  };
}`,
      hint: "Call lights.on() and music.play() in start.",
      checks: [
        { id: "facade-l1", description: "facade starts both systems", expression: "movieFacade().start() === 'lights on, music playing'" },
        { id: "facade-l2", description: "facade exposes start", expression: "typeof movieFacade().start === 'function'" },
      ],
    },
  },
  {
    slug: "proxy-pattern",
    title: "Proxy Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A proxy stands in front of another object to control access, add checks, or delay expensive work.",
    remember: [
      "A proxy presents a similar interface to its real subject.",
      "Access control, caching, logging, and lazy loading are common proxy jobs.",
      "The proxy decides when and whether to forward an operation.",
      "The real subject can remain unaware of the proxy policy.",
    ],
    theory: [
      { heading: "A controlled stand-in", body: "The client talks to the proxy as if it were the service. The proxy can reject a request or forward it to the real subject." },
      { heading: "Lazy initialization", body: "A proxy can hold a null real subject and create it on the first call. This saves setup cost when the service is never used." },
      { heading: "Stable contract", body: "The proxy is most useful when it keeps the same important method shape. The caller does not need a separate code path for proxied and direct access." },
    ],
    analogy: "A security guard stands at the door, checks a badge, and only then lets a visitor reach the office.",
    example: {
      title: "Protect a document",
      code: `class Document {
  read() { return "private report"; }
}
class DocumentProxy {
  constructor(user, document) {
    this.user = user;
    this.document = document;
  }
  read() {
    if (this.user !== "admin") return "access denied";
    return this.document.read();
  }
}
console.log(new DocumentProxy("guest", new Document()).read());
console.log(new DocumentProxy("admin", new Document()).read());`,
      output: "access denied\nprivate report",
    },
    extraExample: {
      title: "Lazy proxy",
      code: `function lazyService(create) {
  let service;
  return {
    run() {
      service ||= create();
      return service.run();
    },
  };
}
const service = lazyService(() => ({ run: () => "loaded" }));
console.log(service.run());`,
      output: "loaded",
    },
    pitfalls: [
      "Calling the real service before authorization or other proxy checks.",
      "Changing return values or errors so much that the proxy is not substitutable.",
      "Adding a proxy for trivial work that obscures the direct call.",
    ],
    playground: {
      starter: `class Report {
  read() { return "report"; }
}
class ReportProxy {
  constructor(allowed) {
    this.allowed = allowed;
    this.report = new Report();
  }
  read() {
    // allow or deny
  }
}`,
      goal: "Return the report only when allowed is true; otherwise return access denied.",
    },
    quiz: [
      { id: "proxy-q1", question: "What does a proxy control?", options: ["Access to a subject", "The spelling of JavaScript", "Only array length", "The compiler version"], answer: 0, explanation: "A proxy stands in front of a real subject to control or augment access." },
      { id: "proxy-q2", question: "Which is a lazy proxy behavior?", options: ["Create the service only on first use", "Delete the service before use", "Always create ten services", "Avoid forwarding forever"], answer: 0, explanation: "Lazy proxies defer expensive creation until it is needed." },
      { id: "proxy-q3", question: "Why keep a similar interface?", options: ["So clients need no separate access path", "So the real object has no methods", "So checks are impossible", "So all objects become singletons"], answer: 0, explanation: "A similar interface makes the stand-in usable by existing clients." },
    ],
    lab: {
      title: "Gate a report",
      brief: "Complete ReportProxy.read() so allowed users get the real report and others get access denied.",
      starter: `class Report {
  read() { return "report"; }
}
class ReportProxy {
  constructor(allowed) {
    this.allowed = allowed;
    this.report = new Report();
  }
  read() { return ""; }
}`,
      hint: "Use a conditional expression and delegate with this.report.read().",
      checks: [
        { id: "proxy-l1", description: "allowed user reads", expression: "new ReportProxy(true).read() === 'report'" },
        { id: "proxy-l2", description: "blocked user is denied", expression: "new ReportProxy(false).read() === 'access denied'" },
      ],
    },
  },
  {
    slug: "composite-pattern",
    title: "Composite Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "intermediate",
    summary: "A composite lets clients treat an individual object and a group of objects through the same interface.",
    remember: [
      "Leaves perform work; composites delegate work to children.",
      "The shared interface makes nested trees easy to traverse.",
      "A composite can contain leaves and other composites.",
      "Tree operations such as total size naturally use recursion.",
    ],
    theory: [
      { heading: "Uniform tree nodes", body: "A file is a leaf and a folder is a composite, but both can expose size(). A caller can ask either node for its size without inspecting its kind." },
      { heading: "Recursive delegation", body: "A composite usually maps an operation over children and combines the results. Nested composites work automatically because children share the same method." },
      { heading: "Useful boundaries", body: "Menus, folders, UI groups, and organization charts often form trees. Composite is less useful when the data is naturally flat." },
    ],
    analogy: "A shipping box can contain one item or smaller boxes; asking for total weight works at every level.",
    example: {
      title: "Calculate a file tree",
      code: `class File {
  constructor(name, size) { this.name = name; this.size = size; }
  totalSize() { return this.size; }
}
class Folder {
  constructor(name) { this.name = name; this.children = []; }
  add(child) { this.children.push(child); return this; }
  totalSize() { return this.children.reduce((sum, child) => sum + child.totalSize(), 0); }
}
const root = new Folder("root").add(new File("a.txt", 2))
  .add(new Folder("src").add(new File("b.js", 3)));
console.log(root.totalSize());`,
      output: "5",
    },
    extraExample: {
      title: "Render nested menu items",
      code: `const item = (label) => ({ render: () => label });
function group(children) {
  return { render: () => children.map((child) => child.render()).join("/") };
}
console.log(group([item("Home"), group([item("Docs"), item("Lab")])]).render());`,
      output: "Home/Docs/Lab",
    },
    pitfalls: [
      "Giving leaves child-management responsibilities they do not need.",
      "Forgetting recursion and counting only direct children of a composite.",
      "Making composite and leaf methods return incompatible result types.",
    ],
    playground: {
      starter: `class Item {
  constructor(price) { this.price = price; }
  total() { return this.price; }
}
class Box {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); return this; }
  total() {
    // sum every child total
  }
}`,
      goal: "Make Box.total recursively sum any Item or nested Box.",
    },
    quiz: [
      { id: "composite-q1", question: "What do leaf and composite nodes share?", options: ["A client-facing operation", "The same data size", "A single memory slot", "No methods"], answer: 0, explanation: "The common operation lets clients treat both node types uniformly." },
      { id: "composite-q2", question: "How does a composite total usually work?", options: ["It delegates recursively to children", "It ignores children", "It always returns zero", "It creates a proxy"], answer: 0, explanation: "Each child contributes through the shared operation." },
      { id: "composite-q3", question: "Which structure best fits Composite?", options: ["A tree of folders", "One unrelated number", "A flat constant", "A single boolean"], answer: 0, explanation: "Composite is designed for part-whole tree structures." },
    ],
    lab: {
      title: "Sum nested boxes",
      brief: "Implement Box.total() to sum the total() value of every direct child, including nested boxes.",
      starter: `class Item {
  constructor(price) { this.price = price; }
  total() { return this.price; }
}
class Box {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); return this; }
  total() { return 0; }
}`,
      hint: "Use reduce and call child.total() rather than reading a child type.",
      checks: [
        { id: "composite-l1", description: "leaf total works", expression: "new Item(4).total() === 4" },
        { id: "composite-l2", description: "box sums leaves", expression: "new Box().add(new Item(2)).add(new Item(3)).total() === 5" },
        { id: "composite-l3", description: "box sums nested box", expression: "(function(){ const inner=new Box().add(new Item(2)); return new Box().add(inner).add(new Item(3)).total()===5; })()" },
      ],
    },
  },
  {
    slug: "bridge-pattern",
    title: "Bridge Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "advanced",
    summary: "A bridge separates a high-level abstraction from its implementation so both can vary independently.",
    remember: [
      "The abstraction holds an implementation object instead of inheriting every implementation.",
      "Changing the renderer does not require changing the shape abstraction.",
      "The two dimensions can grow independently.",
      "Composition at construction time is the bridge's key move.",
    ],
    theory: [
      { heading: "Two dimensions", body: "Suppose shapes vary by type and drawing engines vary by renderer. A subclass for every pair grows quickly; a Shape abstraction can delegate to a renderer instead." },
      { heading: "Delegation boundary", body: "The shape knows what should be drawn, while the renderer knows how to perform that drawing. Each side owns one reason to change." },
      { heading: "Bridge versus adapter", body: "An adapter usually reconciles an existing mismatch. A bridge is designed up front to keep two evolving hierarchies separate." },
    ],
    analogy: "A universal remote is the abstraction and a TV brand is the implementation; the same remote concept can operate many brands.",
    example: {
      title: "Shapes and renderers",
      code: `class TextRenderer {
  drawCircle(radius) { return "text circle " + radius; }
}
class SvgRenderer {
  drawCircle(radius) { return "<circle r=\\"" + radius + "\\"/>"; }
}
class Circle {
  constructor(renderer, radius) { this.renderer = renderer; this.radius = radius; }
  draw() { return this.renderer.drawCircle(this.radius); }
}
console.log(new Circle(new TextRenderer(), 3).draw());
console.log(new Circle(new SvgRenderer(), 3).draw());`,
      output: "text circle 3\n<circle r=\"3\"/>",
    },
    extraExample: {
      title: "Remote and device bridge",
      code: `const device = { on: false, power() { this.on = !this.on; return this.on; } };
class Remote {
  constructor(device) { this.device = device; }
  toggle() { return this.device.power(); }
}
console.log(new Remote(device).toggle());`,
      output: "true",
    },
    pitfalls: [
      "Creating a subclass for every abstraction and implementation combination.",
      "Letting the abstraction reach into renderer-specific details.",
      "Confusing a bridge with a wrapper whose only job is legacy API translation.",
    ],
    playground: {
      starter: `class ConsoleRenderer {
  drawSquare(size) { return "square:" + size; }
}
class Square {
  constructor(renderer, size) {
    this.renderer = renderer;
    this.size = size;
  }
  draw() {
    // delegate to renderer
  }
}`,
      goal: "Complete Square.draw so a Square can use any renderer with drawSquare(size).",
    },
    quiz: [
      { id: "bridge-q1", question: "What does a bridge separate?", options: ["Abstraction and implementation", "Two unrelated variables", "A function and its return", "A loop and an array"], answer: 0, explanation: "The two dimensions vary independently through composition." },
      { id: "bridge-q2", question: "How does Circle use its renderer?", options: ["By delegating to it", "By copying its source", "By extending every renderer", "By ignoring it"], answer: 0, explanation: "Circle forwards drawing work to the injected renderer." },
      { id: "bridge-q3", question: "What is the design advantage?", options: ["Independent variation", "No objects are needed", "All methods become private", "Only one implementation is allowed"], answer: 0, explanation: "New shapes and renderers can be added without a cross-product of subclasses." },
    ],
    lab: {
      title: "Bridge a square renderer",
      brief: "Implement Square.draw() so it delegates size to the renderer supplied to its constructor.",
      starter: `class ConsoleRenderer {
  drawSquare(size) { return "square:" + size; }
}
class Square {
  constructor(renderer, size) { this.renderer = renderer; this.size = size; }
  draw() { return ""; }
}`,
      hint: "Return this.renderer.drawSquare(this.size).",
      checks: [
        { id: "bridge-l1", description: "square delegates", expression: "new Square(new ConsoleRenderer(), 5).draw() === 'square:5'" },
        { id: "bridge-l2", description: "renderer is injected", expression: "(function(){ const r={drawSquare:n=>'custom:'+n}; return new Square(r,2).draw()==='custom:2'; })()" },
      ],
    },
  },
  {
    slug: "flyweight-pattern",
    title: "Flyweight Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "advanced",
    summary: "A flyweight shares repeated intrinsic data while callers provide changing extrinsic data separately.",
    remember: [
      "Intrinsic state is reusable and shared, such as a character's font.",
      "Extrinsic state belongs to each use, such as a character's position.",
      "A factory or cache returns one flyweight for each intrinsic key.",
      "Sharing is valuable only when repeated objects make memory meaningful.",
    ],
    theory: [
      { heading: "Split stable and changing data", body: "A text editor can share the style object for every occurrence of a font while storing each character's x and y outside the flyweight." },
      { heading: "Cache by key", body: "The flyweight factory keeps a Map from intrinsic data to one shared object. Repeated requests for the same key return the same reference." },
      { heading: "Tradeoff", body: "The caller must pass extrinsic values into an operation. This saves memory but makes state ownership more explicit and can add lookup complexity." },
    ],
    analogy: "A theater reuses one stage-light design while each seat booking records its own row and seat number.",
    example: {
      title: "Share tree species data",
      code: `class TreeType {
  constructor(name, color) { this.name = name; this.color = color; }
  draw(x, y) { return this.name + " " + this.color + " at " + x + "," + y; }
}
const treeTypes = new Map();
function getTreeType(name, color) {
  const key = name + ":" + color;
  if (!treeTypes.has(key)) treeTypes.set(key, new TreeType(name, color));
  return treeTypes.get(key);
}
const oak = getTreeType("oak", "green");
console.log(oak === getTreeType("oak", "green"));
console.log(oak.draw(4, 8));`,
      output: "true\noak green at 4,8",
    },
    extraExample: {
      title: "Cached text styles",
      code: `const styles = new Map();
function styleFor(font) {
  if (!styles.has(font)) styles.set(font, { font, weight: font === "bold" ? 700 : 400 });
  return styles.get(font);
}
console.log(styleFor("bold") === styleFor("bold"), styleFor("bold").weight);`,
      output: "true 700",
    },
    pitfalls: [
      "Putting per-instance position or ownership data inside the shared flyweight.",
      "Using a cache without considering unbounded keys and memory retention.",
      "Optimizing before measuring whether repeated intrinsic data is actually expensive.",
    ],
    playground: {
      starter: `class Icon {
  constructor(name) { this.name = name; }
  render(x, y) { return this.name + "@" + x + "," + y; }
}
const icons = new Map();
function getIcon(name) {
  // cache one Icon per name
}`,
      goal: "Return one shared Icon for each name while keeping x and y arguments outside the cached object.",
    },
    quiz: [
      { id: "flyweight-q1", question: "What belongs in a flyweight?", options: ["Shared intrinsic state", "Each object's current position", "A request-specific callback", "A unique owner"], answer: 0, explanation: "Flyweights store data that many uses can share." },
      { id: "flyweight-q2", question: "What proves a cache reused a flyweight?", options: ["The references are identical", "The objects have different keys", "The method is static", "The array is sorted"], answer: 0, explanation: "The same key should return the same object reference." },
      { id: "flyweight-q3", question: "Where should changing position live?", options: ["In the caller or operation arguments", "In every shared flyweight", "In the Map key only", "In the class name"], answer: 0, explanation: "Position is extrinsic and varies per use." },
    ],
    lab: {
      title: "Cache icons",
      brief: "Complete getIcon(name) so repeated names share an Icon while render receives position as arguments.",
      starter: `class Icon {
  constructor(name) { this.name = name; }
  render(x, y) { return this.name + "@" + x + "," + y; }
}
const icons = new Map();
function getIcon(name) {}`,
      hint: "Check icons.has(name), create only when absent, and return icons.get(name).",
      checks: [
        { id: "flyweight-l1", description: "first request creates Icon", expression: "getIcon('star') instanceof Icon" },
        { id: "flyweight-l2", description: "same name is shared", expression: "getIcon('star') === getIcon('star')" },
        { id: "flyweight-l3", description: "position stays extrinsic", expression: "getIcon('star').render(1, 2) === 'star@1,2'" },
      ],
    },
  },
];
