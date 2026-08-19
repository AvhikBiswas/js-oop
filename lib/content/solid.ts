import type { Topic } from "../types";

export const solidTopics: Topic[] = [
  {
    slug: "srp",
    title: "Single Responsibility Principle",
    sectionId: "solid",
    minutes: 8,
    level: "beginner",
    summary: "Give a module or class one cohesive responsibility and one main reason to change. Split unrelated policy from storage, formatting, or delivery.",
    remember: [
      "SRP is about one axis of change, not literally one method.",
      "A class that calculates, formats, and sends has several responsibilities.",
      "Small focused functions are often enough; SRP does not require many classes.",
      "Separating responsibilities makes tests and changes more local."
    ],
    theory: [
      { heading: "Reason to change", body: "Ask what kind of product decision would require editing this code. A tax rule and a CSV layout are different reasons, even if both appear in one report feature." },
      { heading: "Cohesion", body: "High cohesion means a unit's data and operations belong together. A ReceiptFormatter can own formatting while a ReceiptCalculator owns totals." },
      { heading: "Practical split", body: "Split at a meaningful boundary, then pass the result between units. Avoid making tiny classes that only move one line of code without clarifying a responsibility." }
    ],
    analogy: "A kitchen station with one clear job is easier to improve than one person who cooks, prints menus, and handles every payment.",
    example: {
      title: "Separate calculation and formatting",
      code: `class OrderTotal {
  calculate(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
}
class OrderFormatter {
  format(total) {
    return "Total: $" + total;
  }
}
const total = new OrderTotal().calculate([{ price: 4 }, { price: 6 }]);
console.log(new OrderFormatter().format(total));`,
      output: "Total: $10"
    },
    extraExample: {
      title: "One function, one job",
      code: `function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function labelAverage(value) {
  return "Average: " + value;
}
console.log(labelAverage(average([2, 4, 6])));`,
      output: "Average: 4"
    },
    pitfalls: [
      "Treating SRP as a rule that every class must have exactly one method.",
      "Splitting code so aggressively that a simple operation requires navigating many meaningless wrappers.",
      "Keeping formatting, persistence, and business rules together because they happen in one user action."
    ],
    playground: {
      starter: `class ScoreCalculator {
  calculate(values) {
    // return the sum
  }
}
class ScoreLabel {
  label(value) {
    // return "Score: " + value
  }
}`,
      goal: "Keep calculation and presentation separate: calculate([2, 3]) returns 5 and label(5) returns 'Score: 5'."
    },
    quiz: [
      { id: "srp-q1", question: "What does one responsibility mainly mean?", options: ["One reason to change", "One line of code", "One property only", "One global variable"], answer: 0, explanation: "SRP focuses on a cohesive responsibility and a single axis of change." },
      { id: "srp-q2", question: "Which split follows SRP best?", options: ["Calculator totals and Formatter formats", "Every object logs and saves itself", "One class validates, emails, and writes SQL", "All behavior in one utility"], answer: 0, explanation: "Calculation and formatting are separate responsibilities with different change reasons." },
      { id: "srp-q3", question: "What is a likely benefit of SRP?", options: ["More local tests and changes", "No need for any interfaces", "Automatic performance gains", "No objects can collaborate"], answer: 0, explanation: "Focused units are easier to understand, test, and modify independently." }
    ],
    lab: {
      title: "Separate score jobs",
      brief: "Create ScoreCalculator with calculate(values) returning a sum and ScoreLabel with label(value) returning 'Score: ' plus value.",
      starter: `class ScoreCalculator {
  calculate(values) { return 0; }
}
class ScoreLabel {
  label(value) { return ""; }
}`,
      hint: "Use reduce in the calculator. Let the label class format only; do not calculate inside it.",
      checks: [
        { id: "srp-l1", description: "calculator owns summing", expression: "new ScoreCalculator().calculate([2,3,4]) === 9" },
        { id: "srp-l2", description: "label owns formatting", expression: "new ScoreLabel().label(9) === 'Score: 9'" },
        { id: "srp-l3", description: "both focused units work together", expression: "new ScoreLabel().label(new ScoreCalculator().calculate([1,4])) === 'Score: 5'" }
      ]
    }
  },
  {
    slug: "ocp",
    title: "Open/Closed Principle",
    sectionId: "solid",
    minutes: 9,
    level: "intermediate",
    summary: "Design code that is open to adding new behavior but closed to repeated edits in stable, tested code. In JavaScript, strategies and polymorphic objects are practical tools.",
    remember: [
      "Open for extension means new behavior can be added through an existing contract.",
      "Closed for modification means stable code need not be edited for each new case.",
      "A long if or switch that changes for every new type often signals an extension seam.",
      "OCP is a design goal, not a ban on all changes to existing code."
    ],
    theory: [
      { heading: "Extension contract", body: "A discount calculator can accept a strategy with discount(total). Adding StudentDiscount creates a new strategy while the calculator remains unchanged." },
      { heading: "Polymorphism without Java", body: "Plain objects and classes can satisfy the same duck-typed method contract. JavaScript does not need a formal interface keyword for this example." },
      { heading: "Avoid premature abstraction", body: "An extension point has a cost. Introduce one where new variants are likely or where repeated conditional edits are already creating risk." }
    ],
    analogy: "A power strip with standard sockets accepts new appliances without rewiring the house every time someone buys a lamp.",
    example: {
      title: "Discount strategies",
      code: `class Checkout {
  constructor(discount) { this.discount = discount; }
  total(amount) { return amount - this.discount.value(amount); }
}
class NoDiscount {
  value() { return 0; }
}
class TenPercentOff {
  value(amount) { return amount * 0.1; }
}
console.log(new Checkout(new TenPercentOff()).total(50));`,
      output: "45"
    },
    extraExample: {
      title: "Add a new strategy without editing Checkout",
      code: `class Checkout {
  constructor(rule) { this.rule = rule; }
  total(amount) { return this.rule(amount); }
}
const weekendRule = (amount) => amount - 5;
console.log(new Checkout(weekendRule).total(20));`,
      output: "15"
    },
    pitfalls: [
      "Creating an abstraction for every possible future variation makes the current code harder to use.",
      "Adding a subclass that violates the expected method result is not a successful OCP extension.",
      "A strategy with a different signature forces callers to know implementation details."
    ],
    playground: {
      starter: `class PriceCalculator {
  constructor(rule) {
    this.rule = rule;
  }
  finalPrice(amount) {
    // ask rule for a discount
  }
}
class FiveOff {
  discount(amount) { return 5; }
}`,
      goal: "Make PriceCalculator use any rule with discount(amount), so FiveOff produces 15 from 20 and a new rule can be added without editing PriceCalculator."
    },
    quiz: [
      { id: "ocp-q1", question: "What is the extension goal in OCP?", options: ["Add variants through a stable contract", "Never add code", "Edit every switch for each case", "Expose all private state"], answer: 0, explanation: "New behavior should plug into an established abstraction or contract where practical." },
      { id: "ocp-q2", question: "Which design is an OCP-friendly discount calculator?", options: ["It receives a rule object", "It hard-codes every customer type", "It edits itself through eval", "It only accepts one price"], answer: 0, explanation: "A rule object lets new discount behavior be added independently." },
      { id: "ocp-q3", question: "What is a danger of premature OCP abstraction?", options: ["Unnecessary complexity", "More accurate sums", "No extension possible", "Automatic mutation"], answer: 0, explanation: "Extension points have complexity and should match a real variation seam." }
    ],
    lab: {
      title: "Extend a price calculator",
      brief: "Create PriceCalculator(rule) with finalPrice(amount) subtracting rule.discount(amount). Create FiveOff with discount(amount) returning 5.",
      starter: `class PriceCalculator {
  constructor(rule) { this.rule = rule; }
  finalPrice(amount) { return amount; }
}
class FiveOff {
  discount(amount) { return 0; }
}`,
      hint: "PriceCalculator should call the contract, not inspect the rule's class name.",
      checks: [
        { id: "ocp-l1", description: "the provided strategy is used", expression: "new PriceCalculator(new FiveOff()).finalPrice(20) === 15" },
        { id: "ocp-l2", description: "another strategy can be added", expression: "new PriceCalculator({discount: amount => amount * 0.1}).finalPrice(50) === 45" },
        { id: "ocp-l3", description: "the rule receives the amount", expression: "new PriceCalculator({discount: amount => amount / 2}).finalPrice(10) === 5" }
      ]
    }
  },
  {
    slug: "lsp",
    title: "Liskov Substitution Principle",
    sectionId: "solid",
    minutes: 10,
    level: "intermediate",
    summary: "A subtype should be usable wherever its base contract is expected without surprising callers. Preserve meaningful inputs, outputs, and behavioral promises.",
    remember: [
      "LSP is about behavior, not merely passing instanceof.",
      "A subtype should honor the base method's usable input range.",
      "It should not strengthen required preconditions or weaken promised results.",
      "If a subtype cannot support the base contract, use a different abstraction or composition."
    ],
    theory: [
      { heading: "Contract over names", body: "If a Shape contract promises area(), a subtype should return a valid numeric area for the same normal inputs. A class name that sounds related is not enough." },
      { heading: "Preconditions and postconditions", body: "A subtype should not demand more restrictive inputs than its base, and it should provide at least the result quality callers were promised." },
      { heading: "The rectangle trap", body: "Making Square extend a mutable Rectangle can violate callers that expect width and height to change independently. Modeling immutable shapes or a common measurable Shape contract avoids that conflict." }
    ],
    analogy: "A replacement battery should fit the same device and deliver the promised voltage; a battery that fits physically but breaks the device is not substitutable.",
    example: {
      title: "Substitutable payment methods",
      code: `class Payment {
  pay(amount) { return "paid " + amount; }
}
class CardPayment extends Payment {
  pay(amount) { return "card paid " + amount; }
}
function checkout(payment) {
  return payment.pay(10);
}
console.log(checkout(new CardPayment()));`,
      output: "card paid 10"
    },
    extraExample: {
      title: "Share a narrow shape contract",
      code: `class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  area() { return this.width * this.height; }
}
class Square {
  constructor(side) { this.side = side; }
  area() { return this.side * this.side; }
}
function reportArea(shape) { return shape.area(); }
console.log(reportArea(new Rectangle(2, 3)), reportArea(new Square(3)));`,
      output: "6 9"
    },
    pitfalls: [
      "Checking only instanceof misses behavioral violations.",
      "A subtype that throws for valid base inputs or returns a different kind of result breaks callers.",
      "Forcing a square into a mutable rectangle contract creates surprising width and height behavior."
    ],
    playground: {
      starter: `class Notifier {
  notify(message) {
    return "notify:" + message;
  }
}
class EmailNotifier extends Notifier {
  notify(message) {
    // preserve the base result contract
  }
}`,
      goal: "Make EmailNotifier usable by sendAlert(notifier), returning a string for every normal message."
    },
    quiz: [
      { id: "lsp-q1", question: "What does LSP require of a subtype?", options: ["It preserves the base behavioral contract", "It must add private fields", "It must always be faster", "It cannot override methods"], answer: 0, explanation: "Substitution is about preserving expectations for callers." },
      { id: "lsp-q2", question: "Which is an LSP violation?", options: ["A subtype throws for a valid base input", "A subtype returns a valid string", "A subtype uses a different internal algorithm", "A subtype adds a helper method"], answer: 0, explanation: "Rejecting an input that the base accepts breaks substitutability." },
      { id: "lsp-q3", question: "Why is instanceof alone insufficient?", options: ["It checks structure, not behavior", "It always returns false", "It tests private fields", "It changes method results"], answer: 0, explanation: "A subtype can pass an identity test while violating method promises." }
    ],
    lab: {
      title: "Create a substitutable notifier",
      brief: "Create Notifier with notify(message) returning 'notify:' plus message. Create EmailNotifier extending it and preserving a string result.",
      starter: `class Notifier {
  notify(message) { return ""; }
}
class EmailNotifier extends Notifier {
  notify(message) { return ""; }
}
function sendAlert(notifier) {
  return notifier.notify("ready");
}`,
      hint: "The caller only needs the notify(message) contract. EmailNotifier may add a prefix, but it must return a string.",
      checks: [
        { id: "lsp-l1", description: "base notifier honors its contract", expression: "sendAlert(new Notifier()) === 'notify:ready'" },
        { id: "lsp-l2", description: "email notifier is substitutable", expression: "typeof sendAlert(new EmailNotifier()) === 'string' && sendAlert(new EmailNotifier()).includes('ready')" },
        { id: "lsp-l3", description: "email notifier is a notifier", expression: "new EmailNotifier() instanceof Notifier" }
      ]
    }
  },
  {
    slug: "isp",
    title: "Interface Segregation Principle",
    sectionId: "solid",
    minutes: 8,
    level: "intermediate",
    summary: "Prefer several small role contracts over one large interface that forces clients or implementations to depend on methods they do not use.",
    remember: [
      "JavaScript has no required interface keyword, but objects can still follow small contracts.",
      "A client should depend only on the methods it calls.",
      "Separate read, write, and print capabilities when consumers vary.",
      "A small object can implement one role without pretending to support unrelated work."
    ],
    theory: [
      { heading: "Role interfaces", body: "A report viewer may need read(), while an editor needs read() and write(). Treat those method sets as separate contracts rather than one giant Document interface." },
      { heading: "Client-specific needs", body: "ISP asks which methods each client actually uses. A printer should depend on print(), not on a repository's save() and delete() methods." },
      { heading: "Duck typing in JS", body: "Functions can accept the smallest object shape they need. This is an informal interface, checked by behavior and tests rather than by a TypeScript or Java declaration at runtime." }
    ],
    analogy: "A building gives visitors a doorbell and staff a keycard; it does not hand every person a key ring containing controls they should never use.",
    example: {
      title: "Separate reader and writer roles",
      code: `function showTitle(reader) {
  return reader.read().title;
}
const reader = {
  read() { return { title: "Guide" }; }
};
console.log(showTitle(reader));`,
      output: "Guide"
    },
    extraExample: {
      title: "A printer needs only print",
      code: `function printInvoice(printer, text) {
  return printer.print(text);
}
const simplePrinter = {
  print(text) { return "printed:" + text; }
};
console.log(printInvoice(simplePrinter, "A1"));`,
      output: "printed:A1"
    },
    pitfalls: [
      "Calling a broad object an interface does not make unused methods harmless.",
      "Splitting every single method into a role can make the API harder to discover.",
      "Checking for methods only at runtime may produce a late error; clear docs and tests still matter."
    ],
    playground: {
      starter: `function readName(reader) {
  // use only reader.read()
}
const nameReader = {
  read() { return { name: "Ada" }; }
};`,
      goal: "Make readName accept any object with read() and return the returned record's name."
    },
    quiz: [
      { id: "isp-q1", question: "What does ISP encourage?", options: ["Small client-focused contracts", "One interface with every method", "No collaboration", "Only static methods"], answer: 0, explanation: "Clients should depend on the smallest role they need." },
      { id: "isp-q2", question: "What should printInvoice require?", options: ["A printer with print()", "A full database repository", "A class named Invoice", "Every CRUD method"], answer: 0, explanation: "The function only needs the print behavior." },
      { id: "isp-q3", question: "How can JavaScript express an informal interface?", options: ["Accept an object with the required methods", "Require a Java interface keyword", "Use only private fields", "Use instanceof for every value"], answer: 0, explanation: "Duck typing lets a function depend on the methods it calls." }
    ],
    lab: {
      title: "Use a reader role",
      brief: "Create readName(reader) that calls reader.read() and returns its name. Do not require write or delete methods.",
      starter: `function readName(reader) {
  // call reader.read()
}
const nameReader = {
  read() { return { name: "Ada" }; }
};`,
      hint: "The function's only dependency is reader.read(). Return the name from that record.",
      checks: [
        { id: "isp-l1", description: "reader role returns a name", expression: "readName({read: () => ({name:'Ada'})}) === 'Ada'" },
        { id: "isp-l2", description: "a second small reader works", expression: "readName({read: () => ({name:'Jo'})}) === 'Jo'" }
      ]
    }
  },
  {
    slug: "dip",
    title: "Dependency Inversion Principle",
    sectionId: "solid",
    minutes: 10,
    level: "intermediate",
    summary: "Keep high-level policy independent from low-level details by making both depend on a small abstraction. In JavaScript, a function or object contract is often enough.",
    remember: [
      "High-level policy describes what the application wants to accomplish.",
      "Low-level details include storage, HTTP, clocks, and formatting mechanisms.",
      "An abstraction is a stable behavior contract such as save(record) or now().",
      "Composition at the boundary connects policy to a concrete implementation."
    ],
    theory: [
      { heading: "Direction of dependency", body: "A ReportService should depend on a repository.save contract, not on a specific FileRepository class. The concrete repository is supplied from outside." },
      { heading: "Abstraction in JavaScript", body: "A plain object with save(record) is a perfectly useful runtime abstraction. The consumer needs the method behavior, not the concrete constructor." },
      { heading: "Policy versus detail", body: "The high-level service decides that a report is saved. The low-level adapter decides whether bytes go to memory, a file, or a remote API." }
    ],
    analogy: "A wall outlet is the abstraction: an appliance depends on the outlet's shape, while the building decides which power plant supplies it.",
    example: {
      title: "Inject a repository contract",
      code: `class ReportService {
  constructor(repository) { this.repository = repository; }
  save(title) {
    return this.repository.save({ title: title });
  }
}
const memoryRepository = {
  save(report) { return "saved:" + report.title; }
};
console.log(new ReportService(memoryRepository).save("Q1"));`,
      output: "saved:Q1"
    },
    extraExample: {
      title: "Swap infrastructure at the boundary",
      code: `function buildCounter(clock) {
  return {
    year() { return clock.now().getFullYear(); }
  };
}
const fixedClock = { now: () => new Date("2024-01-01T00:00:00Z") };
console.log(buildCounter(fixedClock).year());`,
      output: "2024"
    },
    pitfalls: [
      "Calling a concrete database or fetch client directly inside policy code reverses the desired dependency direction.",
      "Naming an abstraction without keeping its contract small does not reduce coupling.",
      "Injecting every detail can make simple code noisy; invert the dependencies that vary or matter for tests."
    ],
    playground: {
      starter: `class UserService {
  constructor(store) {
    // store is the abstraction
  }
  findName(id) {
    // delegate to store.find(id)
  }
}`,
      goal: "Make UserService depend only on store.find(id), returning the user's name from the injected result."
    },
    quiz: [
      { id: "dip-q1", question: "What should high-level policy depend on?", options: ["A stable small abstraction", "A concrete database singleton", "Global mutable state", "A random implementation detail"], answer: 0, explanation: "DIP separates policy from details through an abstraction." },
      { id: "dip-q2", question: "Which is a JavaScript abstraction for ReportService?", options: ["An object with save(report)", "Only a class named AbstractRepository", "A global variable", "A SQL string"], answer: 0, explanation: "The service can depend on the behavior contract without requiring a particular class." },
      { id: "dip-q3", question: "Where should concrete wiring happen?", options: ["At a composition boundary", "Inside every policy method", "Inside the caller's test assertion", "Never"], answer: 0, explanation: "Composition code connects the high-level service to the chosen low-level adapter." }
    ],
    lab: {
      title: "Invert a user lookup dependency",
      brief: "Create UserService(store) with findName(id) returning store.find(id).name. The service must not construct a store.",
      starter: `class UserService {
  constructor(store) {
    // store dependency
  }
  findName(id) {
    // use store.find(id)
  }
}`,
      hint: "Store the injected collaborator, call its find method with id, and read the returned object's name.",
      checks: [
        { id: "dip-l1", description: "service uses the injected store", expression: "new UserService({find: id => ({name:'Ada', id:id})}).findName(1) === 'Ada'" },
        { id: "dip-l2", description: "a different store can be wired", expression: "new UserService({find: id => ({name:'Jo', id:id})}).findName(2) === 'Jo'" },
        { id: "dip-l3", description: "the collaborator is retained", expression: "(function(){ const store = {find: () => ({name:'Mina'})}; const service = new UserService(store); return service.store === store; })()" }
      ]
    }
  }
];
