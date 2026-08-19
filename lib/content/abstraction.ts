import type { Topic } from "../types";

export const abstractionTopics: Topic[] = [
  {
    slug: "abstract-classes",
    title: "Abstract classes",
    sectionId: "abstraction",
    minutes: 10,
    level: "intermediate",
    summary: "An abstract class describes a shared concept and contract; JavaScript has no abstract keyword, so developers enforce the idea with conventions and runtime checks.",
    remember: [
      "JavaScript cannot declare a class as abstract with built-in syntax.",
      "A base constructor can throw when called directly.",
      "Shared concrete behavior can live in the base class.",
      "Child classes should complete the conceptual contract.",
    ],
    theory: [
      { heading: "Concept before implementation", body: "An abstract class is a design model for a family of objects. It may define common state and behavior while leaving some operations to concrete subclasses." },
      { heading: "A JavaScript convention", body: "A base class can inspect new.target and throw when instantiated directly. This is a runtime convention that approximates an abstract class." },
      { heading: "What remains concrete", body: "A useful base class can contain implemented helpers, such as describe(), while a subclass supplies the family-specific operation." },
    ],
    analogy: "An abstract class is a blueprint for a house style: it defines the rooms every house needs but leaves each builder to choose the final details.",
    example: {
      title: "A non-instantiable base",
      code: `class Payment {
  constructor() {
    if (new.target === Payment) throw new Error("Choose a payment type");
  }
  describe() {
    return "payment";
  }
}
class CardPayment extends Payment {}
console.log(new CardPayment().describe());`,
      output: "payment",
    },
    extraExample: {
      title: "Shared abstract-family behavior",
      code: `class Report {
  constructor(title) {
    if (new.target === Report) throw new Error("Report is abstract");
    this.title = title;
  }
  heading() {
    return "== " + this.title + " ==";
  }
}
class SalesReport extends Report {}
console.log(new SalesReport("Q1").heading());`,
      output: "== Q1 ==",
    },
    pitfalls: [
      "Saying JavaScript enforces abstract classes automatically; it does not.",
      "Throwing in a base constructor without considering legitimate subclass construction.",
      "Making the base class so generic that its shared behavior is not useful.",
    ],
    playground: {
      starter: `class Document {
  // Throw when Document itself is constructed.
}
class Invoice extends Document {}
console.log(new Invoice() instanceof Document);`,
      goal: "Use new.target in Document's constructor so direct Document construction throws while Invoice still works.",
    },
    quiz: [
      { id: "abstract-classes-q1", question: "Does JavaScript have a built-in abstract class keyword?", options: ["Yes, abstract class", "No", "Only in browsers", "Only for private classes"], answer: 1, explanation: "JavaScript has no native abstract-class declaration; it is modeled with conventions or runtime checks." },
      { id: "abstract-classes-q2", question: "What can new.target help a base constructor detect?", options: ["Whether the class was extended", "The constructor that was directly called", "Whether a method is private", "The object's JSON"], answer: 1, explanation: "In a constructor, new.target identifies the constructor used by new, including a subclass." },
      { id: "abstract-classes-q3", question: "What commonly belongs in an abstract base?", options: ["Only unrelated globals", "Shared state and behavior", "No code at all", "Only static JSON"], answer: 1, explanation: "Abstract bases can provide common implementation while defining a family contract." },
    ],
    lab: {
      title: "Model an abstract document",
      brief: "Create class Document that rejects direct construction and class Invoice extends Document. Document should provide kind() returning 'document'.",
      starter: `class Document {
  // constructor guard and kind()
}
class Invoice extends Document {
}`,
      hint: "Throw only when new.target === Document. Invoice inherits kind().",
      checks: [
        { id: "abstract-classes-l1", description: "Invoice inherits the base behavior", expression: "new Invoice().kind() === 'document'" },
        { id: "abstract-classes-l2", description: "Invoice is a Document", expression: "new Invoice() instanceof Document" },
        { id: "abstract-classes-l3", description: "direct construction is rejected", expression: "(() => { try { new Document(); return false; } catch (error) { return true; } })()" },
      ],
    },
  },
  {
    slug: "abstract-methods",
    title: "Abstract methods by convention",
    sectionId: "abstraction",
    minutes: 9,
    level: "intermediate",
    summary: "An abstract method specifies an operation that subclasses must implement; in JavaScript the base method can throw to expose a missing implementation at runtime.",
    remember: [
      "JavaScript has no abstract method syntax.",
      "A base method can throw a clear Error as a required-operation marker.",
      "Subclasses override the method with concrete behavior.",
      "Calling a missing implementation should fail close to the mistake.",
    ],
    theory: [
      { heading: "A method-shaped contract", body: "The base method communicates the name, arguments, and expected result of an operation without claiming to know the family-specific algorithm." },
      { heading: "Fail loudly", body: "Throwing from the base method prevents a silent placeholder such as undefined or zero from hiding an incomplete subclass." },
      { heading: "Polymorphic use", body: "Code can call the common method on many subclasses. Each concrete class supplies its own implementation while callers depend on the contract." },
    ],
    analogy: "An abstract method is a blank on a required form: every department receives the form, but each department must fill in its own answer.",
    example: {
      title: "Shapes must provide area",
      code: `class Shape {
  area() {
    throw new Error("Subclasses must implement area()");
  }
}
class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() {
    return this.side * this.side;
  }
}
console.log(new Square(5).area());`,
      output: "25",
    },
    extraExample: {
      title: "A missing implementation fails",
      code: `class Formatter {
  format() {
    throw new Error("Implement format()");
  }
}
class JsonFormatter extends Formatter {
  format(value) {
    return JSON.stringify(value);
  }
}
console.log(new JsonFormatter().format({ ok: true }));`,
      output: "{\"ok\":true}",
    },
    pitfalls: [
      "Returning a fake default from a required base method and hiding an incomplete subclass.",
      "Changing the method name or argument contract in only one subclass.",
      "Assuming a thrown base method makes the class abstract to every tool or runtime.",
    ],
    playground: {
      starter: `class Notifier {
  // Add send(message) that throws a clear Error.
}
class ConsoleNotifier extends Notifier {
  send(message) {
    return "sent: " + message;
  }
}
console.log(new ConsoleNotifier().send("hello"));`,
      goal: "Make Notifier communicate the required send method while ConsoleNotifier provides a working implementation.",
    },
    quiz: [
      { id: "abstract-methods-q1", question: "How can a base class mark a method as required?", options: ["Use the abstract keyword", "Throw from the base method", "Make it enumerable", "Use JSON.stringify"], answer: 1, explanation: "Throwing is a common JavaScript runtime convention for an unimplemented method." },
      { id: "abstract-methods-q2", question: "What should a concrete subclass normally do?", options: ["Override the required method", "Delete the base prototype", "Freeze every argument", "Return the method itself"], answer: 0, explanation: "The subclass supplies the family-specific implementation." },
      { id: "abstract-methods-q3", question: "Why throw instead of returning undefined?", options: ["To fail close to an incomplete implementation", "To make every method static", "To avoid inheritance", "To create a private field"], answer: 0, explanation: "A clear error makes a missing implementation visible instead of silently propagating undefined." },
    ],
    lab: {
      title: "Require a render method",
      brief: "Create View with render() throwing Error, then TextView extends View and render() returns its text.",
      starter: `class View {
  // render() should throw
}
class TextView extends View {
  // constructor(text), render()
}`,
      hint: "Store text on the instance and override render() in TextView.",
      checks: [
        { id: "abstract-methods-l1", description: "TextView renders text", expression: "new TextView('Hello').render() === 'Hello'" },
        { id: "abstract-methods-l2", description: "TextView inherits View", expression: "new TextView('Hello') instanceof View" },
        { id: "abstract-methods-l3", description: "base render fails clearly", expression: "(() => { try { new View().render(); return false; } catch (error) { return error instanceof Error; } })()" },
      ],
    },
  },
  {
    slug: "interface-concept",
    title: "The interface concept",
    sectionId: "abstraction",
    minutes: 8,
    level: "beginner",
    summary: "An interface is a contract describing capabilities and shapes; JavaScript has no runtime interface declaration, so compatible objects are often checked by behavior.",
    remember: [
      "An interface describes what an object can do, not how it does it.",
      "JavaScript does not provide a native interface keyword.",
      "Duck typing accepts an object when it has the needed behavior.",
      "A small contract is easier to implement and test.",
    ],
    theory: [
      { heading: "Shape of a capability", body: "A conceptual interface might require save(data) and return a result. The consumer can depend on that method without depending on the concrete class." },
      { heading: "Duck typing", body: "JavaScript commonly asks whether a value has the operation it needs, often with typeof. If it walks like a duck and provides the contract, it can be used." },
      { heading: "No TypeScript in this lesson", body: "TypeScript can describe interfaces during development, but JavaScript itself has no interface declaration or automatic runtime enforcement." },
    ],
    analogy: "An interface is a plug standard: a device qualifies because it has the right pins and behavior, regardless of the brand on its case.",
    example: {
      title: "Accept any saver",
      code: `function archive(saver, value) {
  if (typeof saver.save !== "function") throw new TypeError("Needs save()");
  return saver.save(value);
}
const memorySaver = {
  save(value) { return "stored " + value; },
};
console.log(archive(memorySaver, "notes"));`,
      output: "stored notes",
    },
    extraExample: {
      title: "Two implementations, one contract",
      code: `class UppercaseLogger {
  log(message) {
    return message.toUpperCase();
  }
}
const quietLogger = {
  log(message) { return message + "!"; },
};
function announce(logger) {
  return logger.log("ready");
}
console.log(announce(new UppercaseLogger()), announce(quietLogger));`,
      output: "READY ready!",
    },
    pitfalls: [
      "Claiming that a plain JavaScript object automatically implements a formally enforced interface.",
      "Checking only that a property exists instead of checking that it is callable.",
      "Making a consumer depend on methods beyond the stated contract.",
    ],
    playground: {
      starter: `function usePrinter(printer) {
  // Require printer.print(message), then call it.
}
const printer = {
  print(message) {
    return "PRINT: " + message;
  },
};
console.log(usePrinter(printer));`,
      goal: "Implement a small duck-typed contract check and return the result of printer.print('hello').",
    },
    quiz: [
      { id: "interface-concept-q1", question: "What does an interface primarily describe?", options: ["Implementation details", "Required capabilities", "Private memory layout", "A database table"], answer: 1, explanation: "An interface is a contract for the operations a consumer may use." },
      { id: "interface-concept-q2", question: "What is duck typing in JavaScript?", options: ["Checking an object's behavior or shape", "Checking only its class name", "Converting it to JSON", "Freezing it"], answer: 0, explanation: "Duck typing focuses on whether the value provides the needed operations." },
      { id: "interface-concept-q3", question: "Which check confirms save is callable?", options: ["'save' in saver", "typeof saver.save === 'function'", "saver.save === true", "saver instanceof Function only"], answer: 1, explanation: "typeof with 'function' verifies that the member can be called." },
    ],
    lab: {
      title: "Use a duck-typed printer",
      brief: "Write usePrinter(printer) that requires print(message), calls print('hello'), and returns its result.",
      starter: `function usePrinter(printer) {
  // Check the conceptual print interface.
}
const printer = {
  print(message) { return "PRINT: " + message; },
};`,
      hint: "Throw TypeError when typeof printer.print is not 'function'.",
      checks: [
        { id: "interface-concept-l1", description: "a compatible object is accepted", expression: "usePrinter({ print: message => 'PRINT: ' + message }) === 'PRINT: hello'" },
        { id: "interface-concept-l2", description: "a missing method is rejected", expression: "(() => { try { usePrinter({}); return false; } catch (error) { return error instanceof TypeError; } })()" },
      ],
    },
  },
  {
    slug: "abstraction-using-classes",
    title: "Abstraction using classes",
    sectionId: "abstraction",
    minutes: 9,
    level: "intermediate",
    summary: "Classes can hide construction details behind a small public method API, letting callers work with a concept instead of its representation.",
    remember: [
      "A class can expose operations while hiding setup details.",
      "Private fields protect representation, while methods define the abstraction.",
      "Callers should not need to know how the result is stored.",
      "Good abstractions have focused, meaningful responsibilities.",
    ],
    theory: [
      { heading: "Hide representation", body: "An abstraction separates what callers ask for from how the class performs it. Private fields make it harder for callers to couple themselves to storage details." },
      { heading: "A stable public API", body: "Methods such as add and total can remain stable if the implementation changes from an array to another representation." },
      { heading: "Abstraction is not just hiding", body: "A useful abstraction also gives names to domain actions and enforces invariants, rather than merely wrapping every field in a method." },
    ],
    analogy: "A coffee machine is an abstraction: you select a drink through a few controls without managing water temperature, pressure, or internal pipes.",
    example: {
      title: "A shopping cart abstraction",
      code: `class Cart {
  #items = [];
  add(name, price) {
    this.#items.push({ name, price });
  }
  total() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }
}
const cart = new Cart();
cart.add("Book", 12);
cart.add("Pen", 3);
console.log(cart.total());`,
      output: "15",
    },
    extraExample: {
      title: "Change the hidden representation",
      code: `class WordCounter {
  #counts = new Map();
  add(word) {
    this.#counts.set(word, (this.#counts.get(word) || 0) + 1);
  }
  count(word) {
    return this.#counts.get(word) || 0;
  }
}
const words = new WordCounter();
words.add("go");
words.add("go");
console.log(words.count("go"));`,
      output: "2",
    },
    pitfalls: [
      "Exposing the private collection and allowing callers to violate invariants.",
      "Adding a method for every internal detail instead of a useful domain operation.",
      "Assuming an abstraction can never change; public contracts still need versioning and care.",
    ],
    playground: {
      starter: `class TemperatureLog {
  // Keep readings private.
  add(value) {}
  average() {}
}
const log = new TemperatureLog();
log.add(20);
log.add(24);
console.log(log.average());`,
      goal: "Use a private collection so average() returns 22 while callers only use add and average.",
    },
    quiz: [
      { id: "abstraction-using-classes-q1", question: "What should a class abstraction hide?", options: ["The public contract", "Representation and setup details", "Every result", "All method names"], answer: 1, explanation: "Abstraction hides implementation details behind meaningful operations." },
      { id: "abstraction-using-classes-q2", question: "Why keep a cart's items private?", options: ["To prevent direct invariant-breaking edits", "To make total impossible", "To remove all methods", "To force inheritance"], answer: 0, explanation: "The class can control how items enter and how totals are computed." },
      { id: "abstraction-using-classes-q3", question: "Which is a good abstraction API?", options: ["cart.internalArraySlot7", "cart.add(item) and cart.total()", "cart.__allFields()", "cart.revealStorage()"], answer: 1, explanation: "Meaningful domain operations avoid coupling callers to representation." },
    ],
    lab: {
      title: "Build a private tally",
      brief: "Create Tally with private #values, add(value), and sum() that returns the sum of all values.",
      starter: `class Tally {
  // private values and public add/sum
}
`,
      hint: "Use a private array and reduce it in sum().",
      checks: [
        { id: "abstraction-using-classes-l1", description: "sum handles values", expression: "(() => { const t = new Tally(); t.add(2); t.add(5); return t.sum() === 7; })()" },
        { id: "abstraction-using-classes-l2", description: "the storage is not a public values field", expression: "!Object.hasOwn(new Tally(), 'values')" },
      ],
    },
  },
  {
    slug: "abstraction-using-composition",
    title: "Abstraction using composition",
    sectionId: "abstraction",
    minutes: 10,
    level: "intermediate",
    summary: "Composition builds a larger abstraction by giving it focused helper objects instead of inheriting every behavior from a base class.",
    remember: [
      "Composition means an object contains or delegates to collaborators.",
      "Each collaborator can own one focused responsibility.",
      "The outer object can expose a simpler facade.",
      "Composition often makes parts easier to replace and test.",
    ],
    theory: [
      { heading: "Has-a relationships", body: "Inheritance models an is-a relationship, while composition models has-a. A Checkout has a pricing strategy and asks it for a total." },
      { heading: "Delegate the detail", body: "The outer abstraction forwards a focused request to a collaborator. The caller does not need to know which helper performed the calculation." },
      { heading: "Replaceable collaborators", body: "A constructor can receive a collaborator, making behavior configurable without changing the facade or building a deep class hierarchy." },
    ],
    analogy: "A film director composes a crew: the audience sees one finished film, while specialists handle lighting, sound, and editing.",
    example: {
      title: "Checkout delegates pricing",
      code: `class FixedDiscount {
  constructor(amount) {
    this.amount = amount;
  }
  total(price) {
    return price - this.amount;
  }
}
class Checkout {
  constructor(pricing) {
    this.pricing = pricing;
  }
  total(price) {
    return this.pricing.total(price);
  }
}
const checkout = new Checkout(new FixedDiscount(5));
console.log(checkout.total(20));`,
      output: "15",
    },
    extraExample: {
      title: "Swap a collaborator",
      code: `const freeShipping = {
  cost(weight) { return weight > 10 ? 0 : 4; },
};
class Order {
  constructor(shipping) {
    this.shipping = shipping;
  }
  shippingCost(weight) {
    return this.shipping.cost(weight);
  }
}
console.log(new Order(freeShipping).shippingCost(12));`,
      output: "0",
    },
    pitfalls: [
      "Making the facade leak every collaborator detail and losing the abstraction.",
      "Giving one collaborator too many unrelated responsibilities.",
      "Creating collaborators internally when injecting one would make replacement and testing simpler.",
    ],
    playground: {
      starter: `const formatter = {
  format(value) { return "[" + value + "]"; },
};
class Label {
  // Compose formatter and expose text(value).
}
console.log(new Label(formatter).text("ready"));`,
      goal: "Have Label delegate formatting to its collaborator so the log prints [ready].",
    },
    quiz: [
      { id: "abstraction-using-composition-q1", question: "What relationship does composition usually model?", options: ["Has-a", "Only-is-a", "Never-related", "Is-identical-to"], answer: 0, explanation: "Composition gives an object collaborators that it has or uses." },
      { id: "abstraction-using-composition-q2", question: "What is a benefit of injecting a collaborator?", options: ["It can be replaced or tested", "It removes all behavior", "It prevents method calls", "It makes objects primitives"], answer: 0, explanation: "Dependency injection makes the focused helper replaceable." },
      { id: "abstraction-using-composition-q3", question: "What should a facade usually expose?", options: ["Every internal field", "A small domain-focused API", "Only private syntax", "The collaborator's prototype"], answer: 1, explanation: "The facade hides delegation details behind a simpler public operation." },
    ],
    lab: {
      title: "Compose a label formatter",
      brief: "Create Label(formatter) with text(value) delegating to formatter.format(value).",
      starter: `class Label {
  // constructor(formatter) and text(value)
}
const formatter = {
  format(value) { return value.toUpperCase(); },
};`,
      hint: "Store the formatter and return this.formatter.format(value) from text().",
      checks: [
        { id: "abstraction-using-composition-l1", description: "Label delegates formatting", expression: "new Label({ format: value => '<' + value + '>' }).text('ok') === '<ok>'" },
        { id: "abstraction-using-composition-l2", description: "the provided collaborator is used", expression: "(() => { const calls = []; const f = { format(value) { calls.push(value); return value; } }; new Label(f).text('x'); return calls[0] === 'x'; })()" },
      ],
    },
  },
];
