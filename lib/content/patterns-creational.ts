import type { Topic } from "../types";

export const creationalTopics: Topic[] = [
  {
    slug: "factory-pattern",
    title: "Factory Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "A factory centralizes object creation so callers request a capability without knowing which concrete class to construct.",
    remember: [
      "The factory owns the decision about which product class to create.",
      "Callers depend on a shared product shape, such as a speak method.",
      "A factory can accept a simple type string or richer configuration.",
      "Adding a product usually changes the factory, while callers stay small.",
    ],
    theory: [
      { heading: "Creation behind a function", body: "Instead of scattering new statements throughout an application, one function translates a request into an object. The rest of the code uses the returned object's behavior." },
      { heading: "A small common contract", body: "JavaScript does not require an interface declaration. If every product supplies the method the caller needs, the factory can return different classes safely." },
      { heading: "When it helps", body: "Factories are useful when creation has branching, defaults, validation, or setup. They are unnecessary when constructing a plain object is already obvious." },
    ],
    analogy: "A restaurant host takes one menu request and chooses the right cook; the customer asks for a meal, not a particular pan or station.",
    example: {
      title: "Create notifications by kind",
      code: `class EmailNotification {
  send(message) { return "email: " + message; }
}
class SmsNotification {
  send(message) { return "sms: " + message; }
}
function notificationFactory(kind) {
  if (kind === "sms") return new SmsNotification();
  return new EmailNotification();
}
const notification = notificationFactory("sms");
console.log(notification.send("Ready"));`,
      output: "sms: Ready",
    },
    extraExample: {
      title: "Factory with normalized input",
      code: `function makeFormatter(kind) {
  const formatters = {
    upper: (text) => text.toUpperCase(),
    lower: (text) => text.toLowerCase(),
  };
  return formatters[kind] || formatters.lower;
}
console.log(makeFormatter("upper")("Hello"));`,
      output: "HELLO",
    },
    pitfalls: [
      "Turning a tiny factory into a giant conditional that knows every unrelated concern.",
      "Returning products with incompatible methods and expecting callers to guess their differences.",
      "Hiding important construction errors by silently falling back to the wrong product.",
    ],
    playground: {
      starter: `class Circle {
  area() { return "circle"; }
}
class Square {
  area() { return "square"; }
}
function shapeFactory(kind) {
  // return a Circle or Square
}`,
      goal: "Complete shapeFactory so each requested kind returns an object with the expected area method.",
    },
    quiz: [
      { id: "factory-q1", question: "What decision belongs in a factory?", options: ["How to consume a product", "Which concrete product to create", "How to render every product", "How to store all products"], answer: 1, explanation: "The factory hides the selection and construction decision." },
      { id: "factory-q2", question: "Why can a caller use EmailNotification and SmsNotification alike?", options: ["They share a send method", "They have the same constructor name", "They are both strings", "They inherit from Array"], answer: 0, explanation: "The caller relies on the common behavior, not the concrete class." },
      { id: "factory-q3", question: "Which change is a good factory use case?", options: ["Renaming a local variable", "Choosing a product from configuration", "Adding a semicolon", "Reading a constant"], answer: 1, explanation: "Configuration-driven creation is a common reason to centralize construction." },
    ],
    lab: {
      title: "Build a notification factory",
      brief: "Create Email and Sms classes with send(message), then make notificationFactory(kind) return the matching object.",
      starter: `class Email {
  send(message) { return ""; }
}
class Sms {
  send(message) { return ""; }
}
function notificationFactory(kind) {
  // choose a product
}`,
      hint: "Use kind to choose the class, and keep both products compatible through send.",
      checks: [
        { id: "factory-l1", description: "email product is created", expression: "notificationFactory('email') instanceof Email" },
        { id: "factory-l2", description: "sms product sends", expression: "notificationFactory('sms').send('go') === 'sms: go'" },
        { id: "factory-l3", description: "email product sends", expression: "notificationFactory('email').send('go') === 'email: go'" },
      ],
    },
  },
  {
    slug: "abstract-factory-pattern",
    title: "Abstract Factory Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "intermediate",
    summary: "An abstract factory creates a family of related objects that are designed to work together.",
    remember: [
      "The factory represents a product family, not one isolated product.",
      "A family keeps related choices consistent, such as dark button plus dark dialog.",
      "Clients call factory methods and avoid concrete family classes.",
      "Switching families can change a whole UI theme at one composition point.",
    ],
    theory: [
      { heading: "Families over single products", body: "A regular factory chooses one object. An abstract factory exposes several creation methods whose results belong to the same compatible family." },
      { heading: "Compatibility by construction", body: "The client does not need to remember that a dark button goes with a dark dialog. Selecting DarkFactory makes the pairing automatic." },
      { heading: "JavaScript expression", body: "In JavaScript, the abstract factory is commonly just an object or class with methods such as createButton and createDialog. The shared shape is a convention." },
    ],
    analogy: "A furniture catalog sells a matching living-room collection: choosing one collection gives you a coordinated sofa and table.",
    example: {
      title: "Theme product families",
      code: `class LightButton {
  paint() { return "light button"; }
}
class LightDialog {
  open() { return "light dialog"; }
}
class DarkButton {
  paint() { return "dark button"; }
}
class DarkDialog {
  open() { return "dark dialog"; }
}
class LightFactory {
  createButton() { return new LightButton(); }
  createDialog() { return new LightDialog(); }
}
class DarkFactory {
  createButton() { return new DarkButton(); }
  createDialog() { return new DarkDialog(); }
}
function render(factory) {
  return factory.createButton().paint() + " + " + factory.createDialog().open();
}
console.log(render(new DarkFactory()));`,
      output: "dark button + dark dialog",
    },
    extraExample: {
      title: "Factory object for a data family",
      code: `const jsonFamily = {
  createId(value) { return String(value); },
  createList(values) { return values.join("|"); },
};
console.log(jsonFamily.createId(7), jsonFamily.createList(["a", "b"]));`,
      output: "7 a|b",
    },
    pitfalls: [
      "Using an abstract factory when only one unrelated object needs creation.",
      "Mixing products from different families and losing the compatibility guarantee.",
      "Adding family methods without updating every family implementation.",
    ],
    playground: {
      starter: `class LightButton {
  paint() { return "light"; }
}
class DarkButton {
  paint() { return "dark"; }
}
const lightFactory = {
  createButton() { return new LightButton(); }
};
const darkFactory = {
  createButton() { return new DarkButton(); }
};`,
      goal: "Write useTheme(factory) so it creates and paints a button without checking a concrete button class.",
    },
    quiz: [
      { id: "abstract-factory-q1", question: "What does an abstract factory primarily create?", options: ["One primitive value", "A related product family", "Only database rows", "A single global instance"], answer: 1, explanation: "Its methods create several coordinated products." },
      { id: "abstract-factory-q2", question: "What is a benefit of selecting DarkFactory once?", options: ["It prevents all objects", "It keeps related products in the same theme", "It makes every method static", "It removes polymorphism"], answer: 1, explanation: "The selected family supplies compatible dark products." },
      { id: "abstract-factory-q3", question: "What should the client know about concrete product classes?", options: ["Every private field", "Nothing beyond the required behavior", "Their source file path", "Their exact memory address"], answer: 1, explanation: "The client uses factory methods and product behavior." },
    ],
    lab: {
      title: "Create matching media controls",
      brief: "Create CompactFactory and SpaciousFactory. Each must create a play button and a volume control from its own family.",
      starter: `class CompactPlay {
  size() { return "compact"; }
}
class SpaciousPlay {
  size() { return "spacious"; }
}
class CompactFactory {
  createPlay() { return new CompactPlay(); }
}
class SpaciousFactory {
  createPlay() { return new SpaciousPlay(); }
}`,
      hint: "Add a useControls(factory) function that calls createPlay rather than checking class names.",
      checks: [
        { id: "abstract-factory-l1", description: "compact family is selected", expression: "useControls(new CompactFactory()) === 'compact'" },
        { id: "abstract-factory-l2", description: "spacious family is selected", expression: "useControls(new SpaciousFactory()) === 'spacious'" },
      ],
    },
  },
  {
    slug: "builder-pattern",
    title: "Builder Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "beginner",
    summary: "A builder assembles a complex object through readable steps, then returns the finished result.",
    remember: [
      "Builders separate step-by-step configuration from the final object's shape.",
      "Each fluent method commonly returns this so calls can be chained.",
      "Defaults belong in the builder or final object, not in every caller.",
      "build should create a usable result and may validate required data.",
    ],
    theory: [
      { heading: "Readable construction", body: "Many optional settings make a constructor call difficult to scan. Named builder methods make each choice visible and let callers omit defaults." },
      { heading: "Mutable builder, stable result", body: "The builder may change while assembling. A good build method returns a separate object, so later builder changes do not unexpectedly mutate an already-built value." },
      { heading: "Fluent methods", body: "Returning this creates a small domain-specific language: new ReportBuilder().title('...').format('...').build(). The pattern is about clarity, not chaining alone." },
    ],
    analogy: "A sandwich counter lets you choose bread, filling, and sauce one step at a time before handing over the completed sandwich.",
    example: {
      title: "Build a report configuration",
      code: `class ReportBuilder {
  constructor() {
    this.settings = { format: "text", pageNumbers: false };
  }
  title(value) { this.settings.title = value; return this; }
  format(value) { this.settings.format = value; return this; }
  withPageNumbers() { this.settings.pageNumbers = true; return this; }
  build() { return { ...this.settings }; }
}
const report = new ReportBuilder()
  .title("Sales")
  .format("pdf")
  .withPageNumbers()
  .build();
console.log(report);`,
      output: "{ format: 'pdf', pageNumbers: true, title: 'Sales' }",
    },
    extraExample: {
      title: "Builder validation",
      code: `class UserBuilder {
  name(value) { this.value = value; return this; }
  build() {
    if (!this.value) throw new Error("name required");
    return { name: this.value };
  }
}
console.log(new UserBuilder().name("Lin").build().name);`,
      output: "Lin",
    },
    pitfalls: [
      "Returning the builder itself from build instead of the configured product.",
      "Sharing the same mutable settings object with every built result.",
      "Adding a builder for a simple object whose constructor is already clear.",
    ],
    playground: {
      starter: `class PizzaBuilder {
  constructor() {
    this.pizza = { size: "small", toppings: [] };
  }
  size(value) { return this; }
  addTopping(value) { return this; }
  build() { return {}; }
}`,
      goal: "Implement the fluent methods so build returns an independent pizza with its size and toppings.",
    },
    quiz: [
      { id: "builder-q1", question: "What is the main purpose of a builder?", options: ["Hide all methods", "Assemble a complex object in readable steps", "Guarantee one instance", "Replace every array"], answer: 1, explanation: "Builders make optional and ordered configuration easier to understand." },
      { id: "builder-q2", question: "What usually enables fluent chaining?", options: ["Returning this", "Throwing from every method", "Using only static fields", "Returning undefined"], answer: 0, explanation: "Each configuration method can return the builder." },
      { id: "builder-q3", question: "Why copy settings in build?", options: ["To make strings longer", "To keep built results independent", "To disable methods", "To create a subclass"], answer: 1, explanation: "A copied result is not affected by later builder mutations." },
    ],
    lab: {
      title: "Build a playlist",
      brief: "Implement PlaylistBuilder with name(value), add(song), and build(). The result needs a name and an independent songs array.",
      starter: `class PlaylistBuilder {
  constructor() {
    this.data = { name: "Untitled", songs: [] };
  }
  name(value) { return this; }
  add(song) { return this; }
  build() { return {}; }
}`,
      hint: "Push into the builder array and return a fresh object with songs: [...this.data.songs].",
      checks: [
        { id: "builder-l1", description: "fluent name and add work", expression: "new PlaylistBuilder().name('Road').add('Song').build().name === 'Road'" },
        { id: "builder-l2", description: "song is included", expression: "new PlaylistBuilder().add('Song').build().songs[0] === 'Song'" },
        { id: "builder-l3", description: "built songs are independent", expression: "(function(){ const b = new PlaylistBuilder().add('A'); const one=b.build(); b.add('B'); return one.songs.length === 1; })()" },
      ],
    },
  },
  {
    slug: "singleton-pattern",
    title: "Singleton Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "intermediate",
    summary: "A singleton exposes one shared instance, useful for deliberately centralized state such as a small application registry.",
    remember: [
      "The instance is created once at module level in this JavaScript example.",
      "Every caller receives the same reference, not merely equal-looking data.",
      "A singleton is shared mutable state and should be introduced carefully.",
      "Dependency injection is often easier to test than hidden singleton access.",
    ],
    theory: [
      { heading: "Module caching", body: "JavaScript modules are evaluated once and cached. Exporting or returning one module-level object naturally provides a single instance for that module." },
      { heading: "Identity matters", body: "The key property is reference identity: getConfig() === getConfig(). Two separate objects with the same fields are not a singleton." },
      { heading: "Use restraint", body: "A singleton can coordinate a truly process-wide resource, but hidden global state couples consumers and makes tests order-dependent. Prefer an explicit dependency when possible." },
    ],
    analogy: "A building has one shared front desk; everyone visits the same desk, rather than carrying a private desk around.",
    example: {
      title: "Module-level settings store",
      code: `class Settings {
  constructor() {
    this.values = {};
  }
  set(key, value) { this.values[key] = value; }
  get(key) { return this.values[key]; }
}
const settingsInstance = new Settings();
function getSettings() {
  return settingsInstance;
}
const first = getSettings();
first.set("theme", "dark");
console.log(getSettings() === first, getSettings().get("theme"));`,
      output: "true dark",
    },
    extraExample: {
      title: "One event bus reference",
      code: `const bus = {
  events: {},
  on(name, listener) { (this.events[name] ||= []).push(listener); },
  emit(name, value) { (this.events[name] || []).forEach((listener) => listener(value)); },
};
function getBus() { return bus; }
console.log(getBus() === getBus());`,
      output: "true",
    },
    pitfalls: [
      "Creating the instance inside getSettings on every call and calling it a singleton.",
      "Using a singleton as a shortcut for all dependencies and making behavior invisible.",
      "Allowing uncontrolled global mutation that leaks from one test or request to another.",
    ],
    playground: {
      starter: `class Counter {
  constructor() { this.value = 0; }
  increment() { this.value += 1; return this.value; }
}
const counterInstance = new Counter();
function getCounter() {
  // return the module-level instance
}`,
      goal: "Return the same counterInstance on every call and demonstrate shared identity.",
    },
    quiz: [
      { id: "singleton-q1", question: "What makes two singleton calls equivalent?", options: ["They return the same reference", "They return two equal numbers", "They use different constructors", "They clone state"], answer: 0, explanation: "Singleton identity means every access returns one shared object." },
      { id: "singleton-q2", question: "Why does a module-level instance work in this example?", options: ["Modules are evaluated and cached", "Classes cannot have methods", "Arrays are immutable", "new is prohibited"], answer: 0, explanation: "The module-level value is initialized once for the module." },
      { id: "singleton-q3", question: "What is a common singleton tradeoff?", options: ["No state is possible", "Hidden shared state hurts testing", "It always improves performance", "It removes all coupling"], answer: 1, explanation: "Shared mutable state can make dependencies and tests harder to reason about." },
    ],
    lab: {
      title: "Share a module-level logger",
      brief: "Create Logger with a messages array and log(message). Return the module-level loggerInstance from getLogger().",
      starter: `class Logger {
  constructor() { this.messages = []; }
  log(message) { this.messages.push(message); }
}
const loggerInstance = new Logger();
function getLogger() {
  // return loggerInstance
}`,
      hint: "Do not call new inside getLogger. Store exactly one Logger instance above it.",
      checks: [
        { id: "singleton-l1", description: "access returns a Logger", expression: "getLogger() instanceof Logger" },
        { id: "singleton-l2", description: "access has shared identity", expression: "getLogger() === getLogger()" },
        { id: "singleton-l3", description: "state is shared", expression: "(function(){ getLogger().log('x'); return getLogger().messages.includes('x'); })()" },
      ],
    },
  },
  {
    slug: "prototype-pattern",
    title: "Prototype Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "The prototype pattern creates a new object by copying or delegating to an existing configured object.",
    remember: [
      "A prototype is a ready example from which another object can be derived.",
      "Object.create shares a prototype; it does not deep-copy mutable fields.",
      "A clone function can explicitly copy the data that should be independent.",
      "Prototype-based reuse is built into JavaScript's object model.",
    ],
    theory: [
      { heading: "Clone versus delegation", body: "Object.create(prototype) creates a new object whose property lookup delegates to prototype. A spread copy creates own properties but does not preserve prototype methods." },
      { heading: "Copy the right depth", body: "A shallow copy duplicates the outer object while nested arrays and objects remain shared. Clone nested state when independent mutation is required." },
      { heading: "Why use it", body: "Prototype creation is handy when a configured template is expensive or when a family of objects shares behavior. It is not a substitute for thoughtful state ownership." },
    ],
    analogy: "A design template gives each new card the same layout, while each card can receive its own title and color.",
    example: {
      title: "Clone a task template",
      code: `const taskPrototype = {
  done: false,
  finish() { this.done = true; },
};
function cloneTask(title) {
  const task = Object.create(taskPrototype);
  task.title = title;
  return task;
}
const first = cloneTask("Read");
const second = cloneTask("Practice");
first.finish();
console.log(first.done, second.done, second.finish === first.finish);`,
      output: "true false true",
    },
    extraExample: {
      title: "Copy nested prototype state",
      code: `const template = { tags: ["js"], priority: 1 };
function copyCard(title) {
  return { ...template, title, tags: [...template.tags] };
}
const card = copyCard("Patterns");
card.tags.push("oop");
console.log(template.tags.length, card.tags.length);`,
      output: "1 2",
    },
    pitfalls: [
      "Assuming Object.create performs a deep clone of arrays or nested objects.",
      "Using a shared mutable prototype property when each clone needs its own value.",
      "Copying methods as data while accidentally losing the intended prototype relationship.",
    ],
    playground: {
      starter: `const taskPrototype = {
  done: false,
  finish() { this.done = true; }
};
function cloneTask(title) {
  // create an object based on taskPrototype
}`,
      goal: "Return independent task objects that inherit finish and have their own title.",
    },
    quiz: [
      { id: "prototype-q1", question: "What does Object.create(proto) establish?", options: ["A JSON string", "A prototype delegation relationship", "A deep copy", "A private field"], answer: 1, explanation: "The new object looks up missing properties through proto." },
      { id: "prototype-q2", question: "Why clone a nested tags array?", options: ["To share it more", "To prevent clone mutations changing the template", "To remove methods", "To freeze every string"], answer: 1, explanation: "A fresh nested array gives the clone independent mutable state." },
      { id: "prototype-q3", question: "What is commonly shared by prototype-created objects?", options: ["Behavior methods", "Every own data field", "Local variables", "Primitive identity"], answer: 0, explanation: "Methods can be shared through the prototype while own data differs." },
    ],
    lab: {
      title: "Clone a character template",
      brief: "Create characterPrototype with greet(), then implement cloneCharacter(name) using Object.create and an own name property.",
      starter: `const characterPrototype = {
  greet() { return "Hi " + this.name; }
};
function cloneCharacter(name) {
  // create a prototype-based character
}`,
      hint: "const character = Object.create(characterPrototype); character.name = name; return character.",
      checks: [
        { id: "prototype-l1", description: "clone has its own name", expression: "Object.hasOwn(cloneCharacter('Ada'), 'name')" },
        { id: "prototype-l2", description: "clone inherits greet", expression: "cloneCharacter('Ada').greet() === 'Hi Ada'" },
        { id: "prototype-l3", description: "clones are distinct", expression: "cloneCharacter('A') !== cloneCharacter('A')" },
      ],
    },
  },
];
