import type { Topic } from "../types";

export const advancedTopics: Topic[] = [
  {
    slug: "immutability",
    title: "Immutability",
    sectionId: "advanced",
    minutes: 8,
    level: "advanced",
    summary: "Immutability means an existing value is not changed; updates create a new value that is easier to compare and reason about.",
    remember: [
      "const prevents rebinding, not mutation of an object.",
      "Spread creates a shallow copy, so nested values may still be shared.",
      "Immutable updates replace the changed object or array.",
      "Object.freeze is shallow and is a runtime guard rather than a full design.",
    ],
    theory: [
      { heading: "Values over hidden changes", body: "When a function returns a new state instead of changing its input, callers can keep the old value, compare references, and replay updates more easily." },
      { heading: "Shallow versus deep", body: "The expression { ...user } copies top-level properties only. If user.address is an object, both versions still refer to the same address unless it is copied too." },
      { heading: "Practical balance", body: "Use immutable updates at state boundaries and copy only the paths that change. Freezing every deeply nested value can cost work and does not replace clear ownership." },
    ],
    analogy: "A printed draft stays unchanged; a revision is a new sheet with the edit rather than an invisible change to the old sheet.",
    example: {
      title: "Update a nested profile",
      code: `function rename(profile, name) {
  return {
    ...profile,
    name,
    address: { ...profile.address },
  };
}
const before = { name: "Ada", address: { city: "London" } };
const after = rename(before, "Grace");
console.log(before.name, after.name, before !== after, before.address !== after.address);`,
      output: "Ada Grace true true",
    },
    extraExample: {
      title: "Immutable array update",
      code: `function addTag(tags, tag) {
  return [...tags, tag];
}
const oldTags = ["js"];
const newTags = addTag(oldTags, "oop");
console.log(oldTags.join(","), newTags.join(","));`,
      output: "js js,oop",
    },
    pitfalls: [
      "Assuming const makes object properties immutable.",
      "Using a shallow spread while mutating a shared nested object.",
      "Copying every object indiscriminately and creating needless allocations.",
    ],
    playground: {
      starter: `function setDone(task, done) {
  // return a new task
}
const task = { title: "Read", done: false };`,
      goal: "Return a new task with the requested done value while leaving task unchanged.",
    },
    quiz: [
      { id: "immutability-q1", question: "What does const protect for an object variable?", options: ["The binding", "Every nested property", "The prototype chain", "All arrays globally"], answer: 0, explanation: "const prevents reassignment of the variable, not object mutation." },
      { id: "immutability-q2", question: "What kind of copy is object spread?", options: ["Shallow", "Always deep", "A prototype-only copy", "A frozen copy"], answer: 0, explanation: "Spread copies own top-level properties." },
      { id: "immutability-q3", question: "What should an immutable update do?", options: ["Return a new changed value", "Mutate the input secretly", "Delete the old value", "Change a global"], answer: 0, explanation: "The original remains available and the update is represented by a new value." },
    ],
    lab: {
      title: "Update a task immutably",
      brief: "Implement setDone(task, done) to return a new object and preserve the original task.",
      starter: `function setDone(task, done) {
  return task;
}
const task = { title: "Read", done: false };`,
      hint: "Return { ...task, done }.",
      checks: [
        { id: "immutability-l1", description: "new object is returned", expression: "(function(){ const t={done:false}; return setDone(t,true)!==t; })()" },
        { id: "immutability-l2", description: "new value is done", expression: "setDone({done:false}, true).done === true" },
        { id: "immutability-l3", description: "original stays unchanged", expression: "(function(){ const t={done:false}; setDone(t,true); return t.done===false; })()" },
      ],
    },
  },
  {
    slug: "encapsulation-vs-abstraction",
    title: "Encapsulation vs Abstraction",
    sectionId: "advanced",
    minutes: 10,
    level: "advanced",
    summary: "Encapsulation controls access to state and behavior; abstraction presents the useful idea while hiding unnecessary implementation detail.",
    remember: [
      "Encapsulation is about boundaries and ownership.",
      "Abstraction is about a simpler model or contract for users.",
      "A private field is an encapsulation mechanism, not automatically a complete abstraction.",
      "A public method can abstract several private operations behind one meaningful action.",
    ],
    theory: [
      { heading: "Two different questions", body: "Encapsulation asks who may touch this state. Abstraction asks what useful operation should a caller think about. They often work together but are not synonyms." },
      { heading: "Private representation", body: "A class can keep #balance private and expose deposit and withdraw. The private field protects invariants; the methods form an account abstraction." },
      { heading: "Choose names at the domain level", body: "A method such as checkout is a stronger abstraction than exposing validateCart, reserveStock, and charge separately when the caller needs one purchase action." },
    ],
    analogy: "A vending machine hides its wiring (encapsulation) and offers a simple 'choose and buy' interaction (abstraction).",
    example: {
      title: "Private account and public actions",
      code: `class Account {
  #cents;
  constructor(cents) { this.#cents = cents; }
  deposit(cents) { if (cents < 0) throw new Error("positive"); this.#cents += cents; }
  balance() { return this.#cents; }
}
const account = new Account(100);
account.deposit(50);
console.log(account.balance(), Object.hasOwn(account, "#cents"));`,
      output: "150 false",
    },
    extraExample: {
      title: "Abstract a checkout",
      code: `function checkout(cart, payment) {
  const total = cart.reduce((sum, item) => sum + item, 0);
  return payment.pay(total);
}
console.log(checkout([3, 4], { pay: (amount) => "paid:" + amount }));`,
      output: "paid:7",
    },
    pitfalls: [
      "Calling any private field an abstraction even when callers still manage low-level steps.",
      "Exposing mutable internals through a getter and accidentally breaking encapsulation.",
      "Making an abstraction so vague that its contract cannot be used or tested.",
    ],
    playground: {
      starter: `class Wallet {
  #cents = 0;
  constructor(cents) { this.#cents = cents; }
  add(cents) {
    // protect the private balance
  }
  total() { return this.#cents; }
}`,
      goal: "Encapsulate balance updates in add(cents) while exposing only the meaningful total operation.",
    },
    quiz: [
      { id: "encap-abs-q1", question: "What is encapsulation mainly about?", options: ["Controlling access and ownership", "Choosing a loop style", "Naming a file", "Sorting numbers"], answer: 0, explanation: "Encapsulation protects state and controls how it changes." },
      { id: "encap-abs-q2", question: "What is abstraction mainly about?", options: ["Showing a useful simplified contract", "Making every field private", "Copying an object", "Creating a cache"], answer: 0, explanation: "Abstraction hides irrelevant detail behind a useful model." },
      { id: "encap-abs-q3", question: "Which is both a boundary and an abstraction?", options: ["A public deposit method over a private balance", "A public mutable balance field", "A random local variable", "A comment only"], answer: 0, explanation: "The private field protects state and deposit expresses a meaningful action." },
    ],
    lab: {
      title: "Protect a wallet",
      brief: "Implement Wallet.add(cents) to change the private balance and return the new total.",
      starter: `class Wallet {
  #cents = 0;
  constructor(cents) { this.#cents = cents; }
  add(cents) {}
  total() { return this.#cents; }
}`,
      hint: "Increase this.#cents and return it. The method can access the private field.",
      checks: [
        { id: "encap-abs-l1", description: "add returns new total", expression: "new Wallet(10).add(5) === 15" },
        { id: "encap-abs-l2", description: "total reads private state", expression: "(function(){ const w=new Wallet(10); w.add(2); return w.total()===12; })()" },
        { id: "encap-abs-l3", description: "private field is hidden", expression: "!Object.hasOwn(new Wallet(1), 'cents')" },
      ],
    },
  },
  {
    slug: "inheritance-vs-composition",
    title: "Inheritance vs Composition",
    sectionId: "advanced",
    minutes: 10,
    level: "advanced",
    summary: "Inheritance reuses a parent relationship; composition assembles an object from smaller collaborators and is often more flexible.",
    remember: [
      "Inheritance expresses an is-a relationship with a prototype chain.",
      "Composition expresses has-a or can-do relationships.",
      "Composed capabilities can be mixed and replaced independently.",
      "Choose based on substitutability and change, not on fewer lines of code.",
    ],
    theory: [
      { heading: "Tight hierarchy", body: "A subclass inherits implementation and identity from its parent. That is useful when the child truly satisfies the parent's contract and should be substitutable for it." },
      { heading: "Assemble behavior", body: "Composition injects collaborators or copies capabilities into an object. A robot can have a movement module and a speaking module without pretending to be a human." },
      { heading: "Change pressure", body: "When features vary independently, composition avoids a large class tree. When a stable taxonomy and shared invariants matter, inheritance can be a clear fit." },
    ],
    analogy: "Inheritance is joining a family tree; composition is packing a travel bag with interchangeable tools.",
    example: {
      title: "Compose a robot",
      code: `const canMove = (name) => ({ move: () => name + " moves" });
const canSpeak = (name) => ({ speak: () => name + " says hi" });
function makeRobot(name) {
  return { name, ...canMove(name), ...canSpeak(name) };
}
const robot = makeRobot("R1");
console.log(robot.move(), robot.speak());`,
      output: "R1 moves R1 says hi",
    },
    extraExample: {
      title: "Inheritance for a true subtype",
      code: `class Animal {
  eat() { return "eating"; }
}
class Dog extends Animal {
  bark() { return "bark"; }
}
console.log(new Dog().eat(), new Dog().bark());`,
      output: "eating bark",
    },
    pitfalls: [
      "Using inheritance only to reuse one method when no substitutable relationship exists.",
      "Creating deep hierarchies where a parent change surprises distant children.",
      "Calling object spread composition when methods accidentally depend on the wrong this value.",
    ],
    playground: {
      starter: `const canFly = (name) => ({
  fly() { return name + " flies"; }
});
const canSing = (name) => ({
  sing() { return name + " sings"; }
});
function makeBird(name) {
  // compose both capabilities
}`,
      goal: "Return a bird with name, fly, and sing behavior assembled from capabilities.",
    },
    quiz: [
      { id: "inherit-compose-q1", question: "What relationship does inheritance usually express?", options: ["Is-a", "Uses-a temporary value", "Sorts-a list", "Copies-a string"], answer: 0, explanation: "Inheritance models a subtype that can stand in for its parent." },
      { id: "inherit-compose-q2", question: "What is a composition relationship?", options: ["Has-a or can-do", "Always is-a", "Only owns a class name", "Never shares behavior"], answer: 0, explanation: "Composition assembles parts or capabilities." },
      { id: "inherit-compose-q3", question: "When is composition especially flexible?", options: ["When capabilities vary independently", "When every class must share one prototype", "When no behavior exists", "When all fields are constants"], answer: 0, explanation: "Independent collaborators can be replaced or combined without hierarchy changes." },
    ],
    lab: {
      title: "Compose a bird",
      brief: "Implement makeBird(name) with name plus the fly and sing capabilities.",
      starter: `const canFly = (name) => ({ fly() { return name + " flies"; } });
const canSing = (name) => ({ sing() { return name + " sings"; } });
function makeBird(name) {
  return {};
}`,
      hint: "Return { name, ...canFly(name), ...canSing(name) }.",
      checks: [
        { id: "inherit-compose-l1", description: "bird has name", expression: "makeBird('Sky').name === 'Sky'" },
        { id: "inherit-compose-l2", description: "bird can fly", expression: "makeBird('Sky').fly() === 'Sky flies'" },
        { id: "inherit-compose-l3", description: "bird can sing", expression: "makeBird('Sky').sing() === 'Sky sings'" },
      ],
    },
  },
  {
    slug: "runtime-polymorphism",
    title: "Runtime Polymorphism",
    sectionId: "advanced",
    minutes: 9,
    level: "advanced",
    summary: "Runtime polymorphism lets one call work with different concrete objects because the method implementation is selected at runtime.",
    remember: [
      "A common method name can represent different implementations.",
      "Overriding changes behavior while preserving the caller's operation.",
      "JavaScript also supports polymorphism through duck typing.",
      "The caller should rely on the smallest useful contract.",
    ],
    theory: [
      { heading: "Late method lookup", body: "When render is called on a value, JavaScript looks up the method on that value's prototype or own properties at runtime. A Circle and Square can render differently." },
      { heading: "Substitution", body: "A function such as drawAll can accept any object with render. It does not need a switch on constructor names." },
      { heading: "Stable caller", body: "Polymorphism keeps variation at the object boundary. Adding a new shape changes the new shape, not the loop that already calls render." },
    ],
    analogy: "A universal play button starts different media players; each player decides what playing means for itself.",
    example: {
      title: "Draw mixed shapes",
      code: `class Circle {
  render() { return "circle"; }
}
class Square {
  render() { return "square"; }
}
function drawAll(shapes) {
  return shapes.map((shape) => shape.render()).join(", ");
}
console.log(drawAll([new Circle(), new Square()]));`,
      output: "circle, square",
    },
    extraExample: {
      title: "Polymorphic payment",
      code: `const cash = { pay: (amount) => "cash:" + amount };
const card = { pay: (amount) => "card:" + amount };
function charge(method, amount) { return method.pay(amount); }
console.log(charge(card, 12));`,
      output: "card:12",
    },
    pitfalls: [
      "Checking every constructor and defeating the point of the shared method.",
      "Letting implementations return incompatible meanings from the same operation.",
      "Assuming inheritance is required when a small duck-typed contract is enough.",
    ],
    playground: {
      starter: `class Circle {
  render() { return "circle"; }
}
class Square {
  render() { return "square"; }
}
function drawAll(shapes) {
  // call render on every shape
}`,
      goal: "Return all render results joined with a comma and space.",
    },
    quiz: [
      { id: "runtime-poly-q1", question: "When is the concrete render implementation selected?", options: ["At runtime", "When a comment is parsed", "Only at database startup", "Never"], answer: 0, explanation: "The actual object's method is looked up when the call runs." },
      { id: "runtime-poly-q2", question: "What should drawAll depend on?", options: ["The render contract", "Every class name", "Private fields", "Array indexes only"], answer: 0, explanation: "It needs only the behavior it calls." },
      { id: "runtime-poly-q3", question: "What is duck typing?", options: ["Using an object because it has the needed method", "Checking its exact class every time", "Copying a prototype", "Making a singleton"], answer: 0, explanation: "Capability matters more than nominal class identity." },
    ],
    lab: {
      title: "Render polymorphic shapes",
      brief: "Implement drawAll(shapes) by calling render on each shape and joining results.",
      starter: `class Circle { render() { return "circle"; } }
class Square { render() { return "square"; } }
function drawAll(shapes) { return ""; }`,
      hint: "Use shapes.map(shape => shape.render()).join(', ').",
      checks: [
        { id: "runtime-poly-l1", description: "mixed shapes render", expression: "drawAll([new Circle(), new Square()]) === 'circle, square'" },
        { id: "runtime-poly-l2", description: "duck type also works", expression: "drawAll([{render:()=> 'triangle'}]) === 'triangle'" },
      ],
    },
  },
  {
    slug: "duck-typing-advanced",
    title: "Advanced Duck Typing",
    sectionId: "advanced",
    minutes: 8,
    level: "advanced",
    summary: "Duck typing accepts any value that supports the required behavior, regardless of its class or origin.",
    remember: [
      "Capability matters more than constructor identity.",
      "A small required contract makes functions reusable.",
      "Check or document required methods at the boundary.",
      "Duck typing can work with classes, object literals, and test fakes.",
    ],
    theory: [
      { heading: "Behavioral compatibility", body: "If a function calls writer.write(text), any object with a compatible write method can participate. It need not extend Writer." },
      { heading: "Explicit failure", body: "A useful boundary can validate typeof dependency.write and throw a clear error rather than failing later with a cryptic message." },
      { heading: "Testing advantage", body: "A tiny fake object can stand in for a network or file service. The test focuses on the collaboration contract instead of constructing infrastructure." },
    ],
    analogy: "A key works because it fits the lock, not because it came from a particular brand of key maker.",
    example: {
      title: "Send to any writer",
      code: `function saveMessage(writer, message) {
  if (typeof writer.write !== "function") throw new Error("writer required");
  return writer.write(message);
}
const memoryWriter = { write: (message) => "saved:" + message };
const fileLikeWriter = { write: (message) => "file:" + message };
console.log(saveMessage(memoryWriter, "hi"), saveMessage(fileLikeWriter, "hi"));`,
      output: "saved:hi file:hi",
    },
    extraExample: {
      title: "A test fake",
      code: `function greetWith(speaker) { return speaker.speak(); }
const fake = { speak: () => "test hello" };
console.log(greetWith(fake));`,
      output: "test hello",
    },
    pitfalls: [
      "Assuming a method exists without checking or documenting the required contract.",
      "Accepting an object with a same-named method whose arguments or result mean something else.",
      "Using broad capability checks that hide a dependency with too many responsibilities.",
    ],
    playground: {
      starter: `function renderWith(renderer, value) {
  // require renderer.render and return its result
}
const textRenderer = { render: (value) => "text:" + value };`,
      goal: "Make renderWith accept any renderer object that supplies render(value).",
    },
    quiz: [
      { id: "duck-q1", question: "What does duck typing care about?", options: ["Available behavior", "Exact class ancestry", "File extension", "Object color"], answer: 0, explanation: "The object qualifies by supporting the required operation." },
      { id: "duck-q2", question: "Why are fakes useful with duck typing?", options: ["They satisfy a small contract", "They must connect to production", "They remove all methods", "They require inheritance"], answer: 0, explanation: "A focused fake can supply the one behavior a test needs." },
      { id: "duck-q3", question: "What is a good boundary check?", options: ["typeof dependency.method === 'function'", "dependency instanceof Array always", "Object.freeze everything", "Compare random names"], answer: 0, explanation: "The check verifies the capability the function will use." },
    ],
    lab: {
      title: "Use a duck-typed renderer",
      brief: "Implement renderWith(renderer, value), validating render and delegating to it.",
      starter: `function renderWith(renderer, value) {
  return "";
}`,
      hint: "Check typeof renderer.render and return renderer.render(value).",
      checks: [
        { id: "duck-l1", description: "object renderer works", expression: "renderWith({render:v=>'x'+v}, 3) === 'x3'" },
        { id: "duck-l2", description: "different renderer works", expression: "renderWith({render:v=>v.toUpperCase()}, 'go') === 'GO'" },
        { id: "duck-l3", description: "bad dependency fails clearly", expression: "(function(){ try { renderWith({}, 'x'); return false; } catch (error) { return error.message === 'renderer required'; } })()" },
      ],
    },
  },
  {
    slug: "dependency-injection-advanced",
    title: "Advanced Dependency Injection",
    sectionId: "advanced",
    minutes: 10,
    level: "advanced",
    summary: "Dependency injection supplies collaborators from outside a class or function, making policy explicit and implementations replaceable.",
    remember: [
      "Constructor injection makes required collaborators visible.",
      "Injected dependencies can be real services, fakes, or alternate strategies.",
      "The consumer should depend on a small capability contract.",
      "Composition at the application boundary wires concrete implementations.",
    ],
    theory: [
      { heading: "Inversion of construction", body: "Without injection, a ReportService might construct its own database client. With injection, the caller supplies the client and controls the composition." },
      { heading: "Required versus optional", body: "Constructor arguments suit required dependencies. Defaults or setter methods suit optional behavior, but hidden defaults should not mask configuration mistakes." },
      { heading: "Testing seams", body: "A fake repository can record calls and return predictable data. The service test then checks its own rules without a real database." },
    ],
    analogy: "A chef receives ingredients from a supplier; the recipe does not secretly travel to a farm to grow its own ingredients.",
    example: {
      title: "Inject a repository",
      code: `class UserService {
  constructor(repository) { this.repository = repository; }
  label(id) {
    const user = this.repository.find(id);
    return user ? "user:" + user.name : "missing";
  }
}
const fakeRepository = { find: (id) => id === 1 ? { name: "Ada" } : null };
console.log(new UserService(fakeRepository).label(1));`,
      output: "user:Ada",
    },
    extraExample: {
      title: "Inject a clock",
      code: `function greeting(clock) {
  return clock.hour() < 12 ? "morning" : "day";
}
console.log(greeting({ hour: () => 9 }));`,
      output: "morning",
    },
    pitfalls: [
      "Constructing the real collaborator inside the consumer despite accepting a dependency.",
      "Injecting a giant service locator instead of focused capabilities.",
      "Making every tiny value a dependency and obscuring simple logic.",
    ],
    playground: {
      starter: `class OrderService {
  constructor(pricer) { this.pricer = pricer; }
  total(items) {
    // ask injected pricer
  }
}
const pricer = { total: (items) => items.reduce((a, b) => a + b, 0) };`,
      goal: "Make OrderService.total delegate to the injected pricer.total(items).",
    },
    quiz: [
      { id: "di-q1", question: "What does constructor injection do?", options: ["Supplies required collaborators explicitly", "Creates hidden globals", "Removes all constructors", "Freezes every dependency"], answer: 0, explanation: "The caller provides the dependency at construction time." },
      { id: "di-q2", question: "Why inject a fake repository in a test?", options: ["To isolate service behavior", "To require a real database", "To hide the contract", "To prevent calls"], answer: 0, explanation: "A fake makes the collaborator predictable and observable." },
      { id: "di-q3", question: "Where are concrete implementations commonly wired?", options: ["At the composition boundary", "Inside every method", "In a random getter", "Only in comments"], answer: 0, explanation: "The application boundary assembles concrete pieces." },
    ],
    lab: {
      title: "Inject a pricer",
      brief: "Implement OrderService.total(items) by calling the injected pricer's total method.",
      starter: `class OrderService {
  constructor(pricer) { this.pricer = pricer; }
  total(items) { return 0; }
}`,
      hint: "Return this.pricer.total(items).",
      checks: [
        { id: "di-l1", description: "injected pricer is used", expression: "new OrderService({total: items=>items.length}).total(['a','b']) === 2" },
        { id: "di-l2", description: "alternate policy works", expression: "new OrderService({total: items=>items.reduce((a,b)=>a+b,0)}).total([2,3]) === 5" },
      ],
    },
  },
  {
    slug: "loose-coupling",
    title: "Loose Coupling",
    sectionId: "advanced",
    minutes: 8,
    level: "advanced",
    summary: "Loose coupling keeps modules dependent on small stable contracts rather than concrete implementations or internal details.",
    remember: [
      "Depend on capabilities the consumer actually uses.",
      "Events and callbacks can reduce direct knowledge between modules.",
      "Small interfaces are easier to replace and test.",
      "Loose coupling does not mean no collaboration; it means controlled collaboration.",
    ],
    theory: [
      { heading: "Knowledge is coupling", body: "A module is coupled when it knows names, construction rules, and internals of another module. Reducing that knowledge makes changes safer." },
      { heading: "Boundary contracts", body: "If a notifier only needs send(message), pass that capability rather than a whole application object. The contract stays small and intentional." },
      { heading: "Events versus calls", body: "An event can decouple a publisher from the number and identity of subscribers. Direct calls remain clearer when a result is needed immediately." },
    ],
    analogy: "A wall outlet supplies a stable shape; appliances can change internally as long as they honor the plug contract.",
    example: {
      title: "Notify through a small contract",
      code: `function registerUser(user, notifier) {
  const message = "registered:" + user.name;
  notifier.send(message);
  return user;
}
const messages = [];
const notifier = { send: (message) => messages.push(message) };
registerUser({ name: "Ada" }, notifier);
console.log(messages[0]);`,
      output: "registered:Ada",
    },
    extraExample: {
      title: "Event boundary",
      code: `const events = [];
function publish(name, data) { events.push({ name, data }); }
function createSignupPublisher() {
  return { signup(user) { publish("signup", user.name); } };
}
createSignupPublisher().signup({ name: "Lin" });
console.log(events[0].name + ":" + events[0].data);`,
      output: "signup:Lin",
    },
    pitfalls: [
      "Passing a giant object because it is convenient instead of the capability needed.",
      "Replacing every direct call with events even when a return value is required.",
      "Calling a contract loose while relying on undocumented fields.",
    ],
    playground: {
      starter: `function announce(message, channel) {
  // use only channel.send(message)
}
const consoleChannel = {
  send(value) { return "sent:" + value; }
};`,
      goal: "Implement announce so it works with any channel that has send(message).",
    },
    quiz: [
      { id: "coupling-q1", question: "What should a loosely coupled consumer know?", options: ["A small stable contract", "Every internal field", "All subclasses", "The dependency's source code"], answer: 0, explanation: "Less knowledge means fewer reasons to change together." },
      { id: "coupling-q2", question: "When is a direct call clearer than an event?", options: ["When an immediate result is needed", "When no receiver exists", "When storage is hidden", "Always"], answer: 0, explanation: "Events are useful for notification, while direct calls express request/response clearly." },
      { id: "coupling-q3", question: "What is a coupling smell?", options: ["Passing a giant object for one method", "Using a small callback", "Documenting a contract", "Injecting a fake"], answer: 0, explanation: "Broad dependencies expose unnecessary knowledge." },
    ],
    lab: {
      title: "Announce through a channel",
      brief: "Implement announce(message, channel) using only the channel.send method and return its result.",
      starter: `function announce(message, channel) {
  return "";
}`,
      hint: "Return channel.send(message), without reading any other channel property.",
      checks: [
        { id: "coupling-l1", description: "channel result is returned", expression: "announce('hi', {send:v=>'ok:'+v}) === 'ok:hi'" },
        { id: "coupling-l2", description: "another channel works", expression: "announce('x', {send:v=>v.toUpperCase()}) === 'X'" },
      ],
    },
  },
  {
    slug: "high-cohesion",
    title: "High Cohesion",
    sectionId: "advanced",
    minutes: 8,
    level: "advanced",
    summary: "A cohesive module keeps closely related responsibilities together so its data and behavior form a focused purpose.",
    remember: [
      "A cohesive class has a clear reason to exist.",
      "Methods should use or support the class's central responsibility.",
      "High cohesion makes names, tests, and changes more local.",
      "Cohesion is about relatedness, not class size alone.",
    ],
    theory: [
      { heading: "One focused purpose", body: "A ShoppingCart should manage items and totals. Sending email belongs elsewhere because it changes for different reasons." },
      { heading: "Data and behavior together", body: "When the cart owns its items, add and total can preserve cart invariants in one place instead of exposing raw arrays to every caller." },
      { heading: "Find extraction boundaries", body: "If a method uses unrelated fields or has a different vocabulary, it may belong in another collaborator. Extract by responsibility, not by arbitrary line count." },
    ],
    analogy: "A toolbox drawer labeled 'screwdrivers' is easier to use than one drawer holding every tool in the house.",
    example: {
      title: "A focused cart",
      code: `class Cart {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  total() { return this.items.reduce((sum, item) => sum + item.price, 0); }
}
const cart = new Cart();
cart.add({ name: "Book", price: 8 });
console.log(cart.total());`,
      output: "8",
    },
    extraExample: {
      title: "Separate presentation",
      code: `class PriceCalculator {
  total(items) { return items.reduce((sum, item) => sum + item.price, 0); }
}
const calculator = new PriceCalculator();
console.log(calculator.total([{ price: 2 }, { price: 3 }]));`,
      output: "5",
    },
    pitfalls: [
      "Calling a class cohesive just because it is short while it mixes unrelated concerns.",
      "Moving every helper to a new class and losing the central domain relationship.",
      "Making a cart responsible for persistence, email, rendering, and payment at once.",
    ],
    playground: {
      starter: `class TemperatureLog {
  constructor() { this.values = []; }
  add(value) { this.values.push(value); }
  average() {
    // calculate this log's average
  }
}`,
      goal: "Keep the log focused by implementing average from its own values.",
    },
    quiz: [
      { id: "cohesion-q1", question: "What does high cohesion mean?", options: ["Related responsibility stays together", "Every module does everything", "No methods exist", "All data is global"], answer: 0, explanation: "A cohesive unit has a focused, related purpose." },
      { id: "cohesion-q2", question: "Where should cart total behavior live?", options: ["With cart items in Cart", "In an unrelated email class", "In every caller", "In CSS"], answer: 0, explanation: "Cart data and cart total behavior belong together." },
      { id: "cohesion-q3", question: "What can indicate a poor boundary?", options: ["A method uses unrelated vocabulary and fields", "A class has a clear name", "A test checks one rule", "An item is added"], answer: 0, explanation: "Different responsibility signals can indicate extraction." },
    ],
    lab: {
      title: "Average a temperature log",
      brief: "Implement TemperatureLog.average() to return the mean of its recorded values.",
      starter: `class TemperatureLog {
  constructor() { this.values = []; }
  add(value) { this.values.push(value); }
  average() { return 0; }
}`,
      hint: "Reduce values and divide by length; decide how an empty log should behave.",
      checks: [
        { id: "cohesion-l1", description: "average uses log values", expression: "(function(){ const l=new TemperatureLog(); l.add(10); l.add(20); return l.average()===15; })()" },
        { id: "cohesion-l2", description: "add remains focused", expression: "(function(){ const l=new TemperatureLog(); l.add(7); return l.values.length===1; })()" },
      ],
    },
  },
  {
    slug: "object-lifecycle",
    title: "Object Lifecycle",
    sectionId: "advanced",
    minutes: 9,
    level: "advanced",
    summary: "Object lifecycle design makes creation, active use, and cleanup explicit so resources do not outlive their owners.",
    remember: [
      "Construction should establish a valid usable state.",
      "Activation can acquire subscriptions, timers, or connections.",
      "Cleanup should be safe to call and should release owned resources.",
      "Garbage collection does not automatically unsubscribe external resources.",
    ],
    theory: [
      { heading: "Phases", body: "An object may be constructed, started, used, stopped, and discarded. Naming phases helps callers know when operations are valid." },
      { heading: "Ownership", body: "The code that creates a timer, listener, or connection should usually own its cleanup. A dispose method is an explicit handoff for that responsibility." },
      { heading: "Idempotent cleanup", body: "Calling dispose twice should not throw or remove unrelated resources. A flag or stored cleanup function can make teardown safe." },
    ],
    analogy: "Renting a room includes checking in, using it, and checking out; checkout returns keys and closes the account.",
    example: {
      title: "A subscription lifecycle",
      code: `class Subscription {
  constructor(source, listener) { this.source = source; this.listener = listener; this.stop = null; }
  start() { this.stop = this.source.subscribe(this.listener); return this; }
  dispose() {
    if (this.stop) { this.stop(); this.stop = null; }
  }
}
const source = {
  listeners: [],
  subscribe(listener) { this.listeners.push(listener); return () => this.listeners = this.listeners.filter((item) => item !== listener); },
};
const subscription = new Subscription(source, () => {});
subscription.start();
subscription.dispose();
console.log(source.listeners.length);`,
      output: "0",
    },
    extraExample: {
      title: "Idempotent resource cleanup",
      code: `class Connection {
  constructor() { this.open = false; }
  connect() { this.open = true; }
  close() { this.open = false; }
}
const connection = new Connection();
connection.connect();
connection.close();
connection.close();
console.log(connection.open);`,
      output: "false",
    },
    pitfalls: [
      "Relying on garbage collection to remove event listeners or clear timers.",
      "Allowing use before required initialization or after disposal without a defined policy.",
      "Making dispose remove resources owned by another object.",
    ],
    playground: {
      starter: `class Resource {
  constructor() { this.active = false; }
  start() { this.active = true; }
  dispose() {
    // release this resource
  }
}`,
      goal: "Make dispose deactivate the resource safely, including when called more than once.",
    },
    quiz: [
      { id: "lifecycle-q1", question: "What should construction establish?", options: ["A valid initial state", "A forgotten timer", "A random subscription", "A disposed object always"], answer: 0, explanation: "Constructed objects should satisfy their basic invariants." },
      { id: "lifecycle-q2", question: "Who should usually clean up a resource?", options: ["The owner that acquired it", "An unrelated caller", "The garbage collector only", "Every object"], answer: 0, explanation: "Ownership makes cleanup responsibility clear." },
      { id: "lifecycle-q3", question: "What is idempotent dispose?", options: ["Repeated dispose has no harmful extra effect", "Dispose always creates a resource", "Dispose changes the class", "Dispose requires inheritance"], answer: 0, explanation: "Safe repeated cleanup is useful during error and shutdown paths." },
    ],
    lab: {
      title: "Close a resource",
      brief: "Implement Resource.dispose() so active becomes false and repeated calls remain safe.",
      starter: `class Resource {
  constructor() { this.active = false; }
  start() { this.active = true; }
  dispose() { this.active = true; }
}`,
      hint: "Set this.active = false. No extra work is needed when already inactive.",
      checks: [
        { id: "lifecycle-l1", description: "start activates", expression: "(function(){ const r=new Resource(); r.start(); return r.active===true; })()" },
        { id: "lifecycle-l2", description: "dispose releases", expression: "(function(){ const r=new Resource(); r.start(); r.dispose(); return r.active===false; })()" },
        { id: "lifecycle-l3", description: "repeated dispose is safe", expression: "(function(){ const r=new Resource(); r.dispose(); r.dispose(); return r.active===false; })()" },
      ],
    },
  },
];
