import type { Topic } from "../types";

export const compositionTopics: Topic[] = [
  {
    slug: "composition",
    title: "Composition",
    sectionId: "composition",
    minutes: 8,
    level: "beginner",
    summary: "Compose an object from small capabilities so each capability can be selected, tested, and reused without building a deep inheritance tree.",
    remember: [
      "Composition builds a whole object from smaller parts or behaviors.",
      "A capability should have a focused job and a small contract.",
      "Object spread can combine data and methods into a new object.",
      "Composition favors assembling what an object can do over predicting its place in a class hierarchy."
    ],
    theory: [
      { heading: "Capabilities as pieces", body: "A canMove or canLog function can add one focused behavior to a base object. A composer decides which pieces a particular object receives." },
      { heading: "Assembly", body: "Object spread copies enumerable own properties into a new object. Later properties win when names collide, so composition order is part of the design." },
      { heading: "Loose relationships", body: "Composed parts can be replaced independently. A robot can receive a different movement capability without changing a parent class or affecting unrelated robots." }
    ],
    analogy: "Composition is packing a travel bag from useful modules: choose shoes, a book, and a charger for this trip instead of inheriting every item from one giant suitcase.",
    example: {
      title: "Compose a robot",
      code: `const canMove = (robot) => ({
  ...robot,
  move() { return robot.name + " moves"; }
});
const canSpeak = (robot) => ({
  ...robot,
  speak() { return robot.name + " says hello"; }
});
const robot = canSpeak(canMove({ name: "R1" }));
console.log(robot.move(), robot.speak());`,
      output: "R1 moves R1 says hello"
    },
    extraExample: {
      title: "Select capabilities per object",
      code: `const canCharge = (device) => ({
  ...device,
  charge() { return device.name + " charging"; }
});
const phone = canCharge({ name: "Phone" });
const lamp = { name: "Lamp" };
console.log(phone.charge(), typeof lamp.charge);`,
      output: "Phone charging undefined"
    },
    pitfalls: [
      "Mutating the input object inside every capability creates hidden coupling between assemblers.",
      "Using the same method name twice silently lets the last spread overwrite the first.",
      "Copying an object with spread is shallow; nested objects remain shared references."
    ],
    playground: {
      starter: `const canSave = (item) => ({
  ...item,
  save() { /* return a message */ }
});
const canShare = (item) => ({
  ...item,
  share() { /* return a message */ }
});`,
      goal: "Compose a document with name 'Plan' so save() returns 'Plan saved' and share() returns 'Plan shared'."
    },
    quiz: [
      { id: "composition-q1", question: "What is the main idea of composition?", options: ["One enormous base class", "Assembling focused parts into a whole", "Copying every global variable", "Avoiding all objects"], answer: 1, explanation: "Composition creates behavior by combining smaller, focused parts." },
      { id: "composition-q2", question: "What happens when two spreads provide the same property?", options: ["The first always wins", "The later property overwrites the earlier one", "JavaScript throws", "Both values merge automatically"], answer: 1, explanation: "Object literal evaluation applies later properties after earlier ones." },
      { id: "composition-q3", question: "What does object spread copy?", options: ["All nested objects deeply", "Enumerable own properties shallowly", "Prototype methods", "Private class fields"], answer: 1, explanation: "Spread copies enumerable own properties and does not deep-clone nested values." }
    ],
    lab: {
      title: "Compose a document",
      brief: "Create canSave(item) and canShare(item), then compose document from { name: 'Plan' }. Each method returns a name-based message.",
      starter: `const canSave = (item) => ({ ...item, save() {} });
const canShare = (item) => ({ ...item, share() {} });
const document = canShare(canSave({ name: "Plan" }));`,
      hint: "Use item.name inside each method and return a new object from each capability.",
      checks: [
        { id: "composition-l1", description: "save capability is composed", expression: "document.save() === 'Plan saved'" },
        { id: "composition-l2", description: "share capability is composed", expression: "document.share() === 'Plan shared'" },
        { id: "composition-l3", description: "the composed object retains data", expression: "document.name === 'Plan'" }
      ]
    }
  },
  {
    slug: "delegation-comp",
    title: "Delegation",
    sectionId: "composition",
    minutes: 7,
    level: "intermediate",
    summary: "Use delegation when one object forwards a focused operation to another object instead of inheriting its implementation.",
    remember: [
      "Delegation forwards work to a collaborator that owns the behavior.",
      "The delegating object can expose a smaller, domain-friendly method.",
      "Pass arguments and return the collaborator's result deliberately.",
      "Delegation creates a has-a relationship rather than an is-a relationship."
    ],
    theory: [
      { heading: "Forwarding", body: "A Cart can call pricing.calculate(items) instead of implementing pricing rules itself. Cart coordinates the request; Pricing owns the calculation." },
      { heading: "Stable boundary", body: "The delegator depends on a small method contract, so a fake collaborator can be supplied in tests and a real implementation can change behind the boundary." },
      { heading: "Context choice", body: "Calling this.printer.print(text) preserves the printer receiver. Extracting print and calling it separately may lose this unless the method is bound or context-free." }
    ],
    analogy: "A receptionist delegates a delivery question to the shipping desk: the receptionist provides a useful front door but does not become a shipping specialist.",
    example: {
      title: "A report delegates formatting",
      code: `const formatter = {
  format(value) { return "Report: " + value; }
};
function Report(formatter) {
  this.formatter = formatter;
}
Report.prototype.render = function (value) {
  return this.formatter.format(value);
};
console.log(new Report(formatter).render(12));`,
      output: "Report: 12"
    },
    extraExample: {
      title: "Replace a collaborator",
      code: `function AlertService(sender) {
  this.sender = sender;
}
AlertService.prototype.send = function (message) {
  return this.sender.send(message);
};
const fake = { send(message) { return "fake:" + message; } };
console.log(new AlertService(fake).send("ready"));`,
      output: "fake:ready"
    },
    pitfalls: [
      "Delegating to a concrete global singleton makes the relationship hard to replace and test.",
      "Returning nothing from the forwarding method loses useful collaborator results.",
      "Forwarding every internal method creates a leaky wrapper rather than a focused boundary."
    ],
    playground: {
      starter: `function Checkout(tax) {
  this.tax = tax;
}
Checkout.prototype.total = function (price) {
  // delegate to this.tax.calculate(price)
};
const tax = { calculate(price) { return price + 2; } };`,
      goal: "Make Checkout.total(price) return the result of its injected tax collaborator."
    },
    quiz: [
      { id: "delegation-comp-q1", question: "What does delegation primarily do?", options: ["Forwards work to a collaborator", "Copies a whole class hierarchy", "Hides all return values", "Requires private fields"], answer: 0, explanation: "The delegator asks another object to perform the specialized operation." },
      { id: "delegation-comp-q2", question: "Why inject a collaborator?", options: ["To make replacement and testing easier", "To force global state", "To remove all methods", "To make objects immutable automatically"], answer: 0, explanation: "An injected small contract can be replaced by a fake or alternate implementation." },
      { id: "delegation-comp-q3", question: "Which relationship best describes delegation?", options: ["Has-a", "Is-a only", "Always-a primitive", "No relationship"], answer: 0, explanation: "The delegator has a collaborator and forwards selected work to it." }
    ],
    lab: {
      title: "Delegate a checkout total",
      brief: "Create Checkout(calculator) and total(items) that returns calculator.total(items). Name the class exactly Checkout.",
      starter: `class Checkout {
  constructor(calculator) {
    // store calculator
  }
  total(items) {
    // delegate
  }
}`,
      hint: "Keep Checkout small: store the collaborator, call its total method, and return the result.",
      checks: [
        { id: "delegation-comp-l1", description: "Checkout delegates the array", expression: "new Checkout({total: items => items.reduce((a,b) => a + b, 0)}).total([2,3]) === 5" },
        { id: "delegation-comp-l2", description: "another calculator can be substituted", expression: "new Checkout({total: items => items.length}).total(['a','b','c']) === 3" }
      ]
    }
  },
  {
    slug: "mixins-comp",
    title: "Mixins",
    sectionId: "composition",
    minutes: 8,
    level: "intermediate",
    summary: "A mixin is a function or object that adds a focused capability to another object or class. Mixins provide a practical form of horizontal reuse.",
    remember: [
      "A mixin adds behavior without becoming the primary type of the target.",
      "Mixin functions can return a new object or a subclass of a supplied base.",
      "Keep mixins narrow so their contracts and name collisions stay visible.",
      "Applying the same mixin twice can overwrite methods or duplicate setup."
    ],
    theory: [
      { heading: "Object mixins", body: "Object.assign(target, source) copies methods into target. This mutates target, so a spread-based return is safer when the original should remain unchanged." },
      { heading: "Class mixins", body: "function Timestamped(Base) { return class extends Base { ... }; } returns a new class that combines the base with timestamp behavior." },
      { heading: "Collision policy", body: "Mixins do not provide automatic conflict resolution. Decide which capability wins, rename methods, or compose smaller methods explicitly." }
    ],
    analogy: "A mixin is an add-on kit for a vehicle: it can add GPS or heated seats to many models without claiming the vehicle is a GPS.",
    example: {
      title: "Add timestamp behavior",
      code: `const Timestamped = (Base) => class extends Base {
  mark() {
    this.marked = true;
    return this.marked;
  }
};
class Note {
  constructor(text) { this.text = text; }
}
class TimedNote extends Timestamped(Note) {}
const note = new TimedNote("draft");
console.log(note.text, note.mark(), note instanceof Note);`,
      output: "draft true true"
    },
    extraExample: {
      title: "Combine object capabilities",
      code: `const auditable = {
  audit() { return this.id + " audited"; }
};
const printable = {
  print() { return "[" + this.id + "]"; }
};
const record = Object.assign({ id: "A1" }, auditable, printable);
console.log(record.audit(), record.print());`,
      output: "A1 audited [A1]"
    },
    pitfalls: [
      "Object.assign mutates its first argument, which can unexpectedly alter a shared object.",
      "A mixin method that depends on undocumented fields breaks when applied to a different target.",
      "Two mixins with the same method name silently create an order-dependent override."
    ],
    playground: {
      starter: `const CanArchive = (Base) => class extends Base {
  // archive() sets archived and returns a message
};
class FileRecord {
  constructor(name) { this.name = name; }
}
class ArchivedFile extends CanArchive(FileRecord) {}`,
      goal: "Make new ArchivedFile('notes').archive() return 'notes archived' and set archived to true."
    },
    quiz: [
      { id: "mixins-comp-q1", question: "What is a mixin intended to provide?", options: ["A focused reusable capability", "A required root class", "A database connection", "A replacement for every object"], answer: 0, explanation: "Mixins add a narrow behavior that can be reused across otherwise unrelated types." },
      { id: "mixins-comp-q2", question: "What does a class mixin commonly receive and return?", options: ["An instance and a number", "A base class and a derived class", "A string and a promise", "A prototype and JSON"], answer: 1, explanation: "A class mixin is often a function Base => class extends Base." },
      { id: "mixins-comp-q3", question: "What happens with duplicate method names in Object.assign?", options: ["The later source wins", "Both methods run", "JavaScript throws by default", "The target is frozen"], answer: 0, explanation: "Later copied properties overwrite earlier properties." }
    ],
    lab: {
      title: "Add a reusable archive mixin",
      brief: "Create CanArchive(Base) as a class mixin and use it to define ArchivedFile. archive() must set archived and return a message.",
      starter: `const CanArchive = (Base) => class extends Base {};
class FileRecord {
  constructor(name) { this.name = name; }
}
class ArchivedFile extends CanArchive(FileRecord) {}`,
      hint: "Implement archive() in the class returned by CanArchive. It can use this.name and this.archived.",
      checks: [
        { id: "mixins-comp-l1", description: "archive returns a useful message", expression: "new ArchivedFile('notes').archive() === 'notes archived'" },
        { id: "mixins-comp-l2", description: "archive changes state", expression: "(function(){ const file = new ArchivedFile('notes'); file.archive(); return file.archived === true; })()" },
        { id: "mixins-comp-l3", description: "the mixed class retains its base", expression: "new ArchivedFile('notes') instanceof FileRecord" }
      ]
    }
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection",
    sectionId: "composition",
    minutes: 8,
    level: "intermediate",
    summary: "Supply collaborators from outside an object instead of constructing them inside it. Dependency injection makes behavior replaceable and tests focused.",
    remember: [
      "A dependency is an object or function another component needs to do its work.",
      "Injection supplies that dependency through a constructor, parameter, or setter.",
      "Depend on a small behavior contract rather than a concrete implementation.",
      "A fake dependency can make tests deterministic and fast."
    ],
    theory: [
      { heading: "Constructor injection", body: "class Welcome { constructor(clock, sender) { ... } } makes required collaborators explicit when the object is created. The object can fail early if a required contract is missing." },
      { heading: "Function injection", body: "A function such as sendReceipt(order, send) can receive a callback directly. This is often the smallest form of dependency injection." },
      { heading: "Inversion of control", body: "The service no longer decides which clock or sender to construct. Composition code makes that decision, giving the service control over its core behavior but not its infrastructure." }
    ],
    analogy: "Instead of a chef buying one specific oven, injection lets the restaurant provide any oven that can bake; a test can provide a tiny pretend oven.",
    example: {
      title: "Inject a clock",
      code: `function Greeting(clock) {
  this.clock = clock;
}
Greeting.prototype.message = function (name) {
  return "Good " + this.clock.period() + ", " + name;
};
const fixedClock = { period: () => "morning" };
console.log(new Greeting(fixedClock).message("Ada"));`,
      output: "Good morning, Ada"
    },
    extraExample: {
      title: "Inject a sender function",
      code: `function notify(message, send) {
  return send("NOTICE: " + message);
}
const sent = [];
const fakeSend = (value) => { sent.push(value); return true; };
console.log(notify("Ready", fakeSend), sent[0]);`,
      output: "true NOTICE: Ready"
    },
    pitfalls: [
      "Constructing the dependency inside the class defeats replacement and couples the class to infrastructure.",
      "Injecting a huge object with dozens of methods hides the actual contract.",
      "A fake that behaves differently from the real dependency can make tests pass for the wrong reason."
    ],
    playground: {
      starter: `class Messenger {
  constructor(sender) {
    // store sender
  }
  send(name) {
    // delegate sender.send
  }
}`,
      goal: "Inject a sender with send(name) and make new Messenger(sender).send('Ada') return the sender's result."
    },
    quiz: [
      { id: "dependency-injection-q1", question: "What does dependency injection change?", options: ["Who supplies a collaborator", "Whether JavaScript has objects", "The meaning of addition", "The need for functions"], answer: 0, explanation: "The component receives a needed collaborator instead of choosing and constructing it internally." },
      { id: "dependency-injection-q2", question: "Why is a fake sender useful?", options: ["It makes a test deterministic", "It always adds inheritance", "It hides all failures", "It changes arrow binding"], answer: 0, explanation: "A fake can record calls and avoid real network or file side effects." },
      { id: "dependency-injection-q3", question: "A good injected dependency usually has what?", options: ["A small clear contract", "Every method in the application", "No callable behavior", "Only global state"], answer: 0, explanation: "Small contracts reduce coupling and clarify what the consumer actually needs." }
    ],
    lab: {
      title: "Inject a message sender",
      brief: "Create Messenger(sender) with send(name) that calls sender.send('Hello ' + name) and returns the result.",
      starter: `class Messenger {
  constructor(sender) {
    // store sender
  }
  send(name) {
    // call sender.send
  }
}`,
      hint: "The sender is already the dependency. Messenger should coordinate the message, not construct a sender.",
      checks: [
        { id: "dependency-injection-l1", description: "the injected sender receives the message", expression: "new Messenger({send: message => message}).send('Ada') === 'Hello Ada'" },
        { id: "dependency-injection-l2", description: "a different sender can be substituted", expression: "new Messenger({send: message => message.toUpperCase()}).send('Ada') === 'HELLO ADA'" }
      ]
    }
  },
  {
    slug: "composition-vs-inheritance-comp",
    title: "Composition vs Inheritance",
    sectionId: "composition",
    minutes: 10,
    level: "intermediate",
    summary: "Choose inheritance for a stable subtype relationship and shared substitutable contract; choose composition when capabilities vary or collaborators should be replaceable.",
    remember: [
      "Inheritance expresses an is-a relationship and shares a prototype chain.",
      "Composition expresses has-a or can-do relationships through parts.",
      "Composition usually makes behavior selection and replacement more local.",
      "Neither technique is automatically best; the domain contract and change pattern decide."
    ],
    theory: [
      { heading: "Subtype promise", body: "If every Square truly can be used anywhere a Shape is expected, inheritance may communicate a useful substitutable contract. A subclass should preserve the expectations of its base." },
      { heading: "Capability assembly", body: "A document can be printable and shareable without being a subtype of a single universal DocumentBase. Independent capabilities avoid unrelated methods in every subtype." },
      { heading: "Change pressure", body: "Deep inheritance spreads changes through ancestors and descendants. Composition localizes change by replacing one capability or collaborator at the assembly boundary." }
    ],
    analogy: "Inheritance is joining a family with inherited rules; composition is assembling a toolkit whose contents can change for each job.",
    example: {
      title: "Compose payment behavior",
      code: `const withRefunds = (payment) => ({
  ...payment,
  refund() { return payment.provider + " refunded"; }
});
const withReceipts = (payment) => ({
  ...payment,
  receipt() { return "receipt for " + payment.provider; }
});
const payment = withReceipts(withRefunds({ provider: "Card" }));
console.log(payment.refund(), payment.receipt());`,
      output: "Card refunded receipt for Card"
    },
    extraExample: {
      title: "A clear inheritance subtype",
      code: `class Shape {
  area() { return 0; }
}
class Rectangle extends Shape {
  constructor(width, height) { super(); this.width = width; this.height = height; }
  area() { return this.width * this.height; }
}
console.log(new Rectangle(3, 4) instanceof Shape, new Rectangle(3, 4).area());`,
      output: "true 12"
    },
    pitfalls: [
      "Choosing inheritance only to reuse code can create a false subtype relationship.",
      "Composition can also become tangled if one composed object knows too much about every other part.",
      "Replacing inheritance with composition does not remove the need for clear contracts and names."
    ],
    playground: {
      starter: `const canExport = (item) => ({
  ...item,
  exportText() { /* return item.name */ }
});
const canArchive = (item) => ({
  ...item,
  archive() { /* return item.name */ }
});`,
      goal: "Compose a Record named 'Report' with independent exportText() and archive() capabilities."
    },
    quiz: [
      { id: "composition-vs-inheritance-comp-q1", question: "What relationship does inheritance usually communicate?", options: ["Is-a", "Uses-a-number", "Never-related", "Only-has-a"], answer: 0, explanation: "A subclass claims to be usable as an instance of its base type." },
      { id: "composition-vs-inheritance-comp-q2", question: "When is composition especially useful?", options: ["When capabilities vary independently", "When every class must share one constructor", "When no behavior exists", "When you want hidden globals"], answer: 0, explanation: "Independent capabilities can be assembled and replaced without a rigid hierarchy." },
      { id: "composition-vs-inheritance-comp-q3", question: "What should guide the choice?", options: ["The relationship and expected changes", "Which keyword is shorter", "The class name length", "Whether arrays exist"], answer: 0, explanation: "The domain relationship, contracts, and change pressure matter more than a blanket rule." }
    ],
    lab: {
      title: "Assemble a flexible record",
      brief: "Create canExport(item) and canArchive(item), then compose record from { name: 'Report' }. Return 'Report exported' and 'Report archived'.",
      starter: `const canExport = (item) => ({ ...item, exportText() {} });
const canArchive = (item) => ({ ...item, archive() {} });
const record = canArchive(canExport({ name: "Report" }));`,
      hint: "Use focused capabilities and keep each method independent. Do not create a base class just for reuse.",
      checks: [
        { id: "composition-vs-inheritance-comp-l1", description: "record exports", expression: "record.exportText() === 'Report exported'" },
        { id: "composition-vs-inheritance-comp-l2", description: "record archives", expression: "record.archive() === 'Report archived'" },
        { id: "composition-vs-inheritance-comp-l3", description: "record keeps its name", expression: "record.name === 'Report'" }
      ]
    }
  }
];
