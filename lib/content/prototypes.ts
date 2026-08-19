import type { Topic } from "../types";

export const prototypesTopics: Topic[] = [
  {
    slug: "prototype",
    title: "The prototype object",
    sectionId: "prototypes",
    minutes: 8,
    level: "beginner",
    summary: "Every ordinary JavaScript object can delegate property lookup to another object called its prototype. Prototypes let objects share behavior without copying every method.",
    remember: ["Prototype is another object.", "Lookup can delegate.", "Own properties win.", "Shared behavior saves copies."],
    theory: [
      { heading: "Lookup has a fallback", body: "When JavaScript evaluates object.method, it first checks the object itself. If the property is absent, it checks the object's prototype, then that prototype's prototype, continuing until it finds a value or reaches null." },
      { heading: "Methods are shared values", body: "A method placed on a prototype is available to every object linked to that prototype. The method still receives the calling instance as this, so one function can work with many objects' own state." },
      { heading: "Own properties shadow inherited ones", body: "If an object and its prototype both have a property with the same name, the object's own property is returned first. Deleting the own property can reveal the inherited value again." },
    ],
    analogy: "A prototype is a neighborhood tool shed: if your own toolbox lacks a tool, you borrow the shared one.",
    example: {
      title: "Sharing a speak method",
      code: `const animalActions = {
  speak() {
    return this.name + " makes a sound";
  },
};
const cat = Object.create(animalActions);
cat.name = "Mochi";
console.log(cat.speak());
console.log(Object.hasOwn(cat, "speak"));`,
      output: `Mochi makes a sound
false`,
    },
    extraExample: {
      title: "Shadow and reveal",
      code: `const defaults = { color: "blue" };
const paint = Object.create(defaults);
console.log(paint.color);
paint.color = "red";
console.log(paint.color);
delete paint.color;
console.log(paint.color);`,
      output: `blue
red
blue`,
    },
    pitfalls: ["Calling every inherited property an own property.", "Assuming a prototype value is copied into the object.", "Mutating a shared prototype when one object needs a special case."],
    playground: {
      starter: `const vehicle = {
  move() {
    return this.name + " moves";
  },
};
const bike = Object.create(vehicle);
bike.name = "Bike";
console.log(bike.move());`,
      goal: "Add a stop() method to vehicle that returns this.name + ' stops', then call it through bike.",
    },
    quiz: [
      { id: "prototype-1", question: "What happens when an object lacks a requested property?", options: ["JavaScript searches its prototype chain", "JavaScript copies the whole prototype", "The class is always called", "The property is created automatically"], answer: 0, explanation: "Property lookup delegates to linked prototypes when the receiver has no own property." },
      { id: "prototype-2", question: "Which property wins when both object and prototype define color?", options: ["The object's own color", "The prototype's color", "Whichever was defined first", "Neither property"], answer: 0, explanation: "Own properties shadow inherited properties during lookup." },
      { id: "prototype-3", question: "Does Object.create(proto) copy proto's methods?", options: ["No; it links the new object to proto", "Yes; it deep-clones proto", "Only if proto is a class", "It converts methods to static fields"], answer: 0, explanation: "Object.create establishes a prototype link without copying the prototype's properties." },
    ],
    lab: {
      title: "Create a shared animal action",
      brief: "Define const animalTools with method eat() returning this.name + ' eats'. Define const fox = Object.create(animalTools), set fox.name to 'Fennel'.",
      starter: `const animalTools = {
  // add eat()
};
const fox = Object.create(animalTools);
// set fox.name`,
      hint: "Use a concise method named eat and let this.name come from fox.",
      checks: [
        { id: "c1", description: "fox uses the shared method", expression: "fox.eat() === 'Fennel eats'" },
        { id: "c2", description: "eat is inherited rather than copied", expression: "!Object.hasOwn(fox, 'eat') && animalTools.isPrototypeOf(fox)" },
      ],
    },
  },
  {
    slug: "prototype-chain",
    title: "Walking the prototype chain",
    sectionId: "prototypes",
    minutes: 9,
    level: "intermediate",
    summary: "A prototype chain is a sequence of objects used for fallback property lookup. Understanding each link explains inherited methods, shadowing, and why plain objects can call methods such as toString.",
    remember: ["Lookup walks upward.", "The first match wins.", "null ends the chain.", "Inheritance is delegation."],
    theory: [
      { heading: "Chains are ordered", body: "An object points to one prototype, which can point to another. JavaScript checks each link from the receiver upward, so the nearest definition wins and distant definitions are only fallbacks." },
      { heading: "Object.prototype is common heritage", body: "Object literals normally reach Object.prototype after their own prototype. That shared object supplies methods such as toString, unless a nearer object shadows the same property." },
      { heading: "Null creates a dictionary-like object", body: "Object.create(null) has no prototype at all. It avoids inherited names such as constructor and toString, which can be useful for key maps, but it also lacks those convenient methods." },
    ],
    analogy: "A prototype chain is a family recipe search: check your card, then a parent card, then an older card until the recipe is found.",
    example: {
      title: "Three levels of lookup",
      code: `const grandparent = { color: "gold" };
const parent = Object.create(grandparent);
parent.size = "medium";
const child = Object.create(parent);
console.log(child.color, child.size);
child.color = "green";
console.log(child.color, grandparent.color);`,
      output: `gold medium
green gold`,
    },
    extraExample: {
      title: "A prototype-less map",
      code: `const scores = Object.create(null);
scores.ada = 10;
console.log(scores.ada);
console.log(Object.getPrototypeOf(scores));`,
      output: `10
null`,
    },
    pitfalls: ["Thinking a chain can have two direct prototypes at once.", "Using an inherited key as if every map were prototype-less.", "Assuming changing a distant prototype only affects objects with no nearer override."],
    playground: {
      starter: `const base = { kind: "base" };
const middle = Object.create(base);
const item = Object.create(middle);
item.id = 3;
console.log(item.kind, item.id);`,
      goal: "Add a label property to base and prove item can read it through the chain with console.log.",
    },
    quiz: [
      { id: "prototype-chain-1", question: "What determines which duplicate property is returned?", options: ["The closest definition to the receiver", "The oldest definition", "The longest string value", "Random selection"], answer: 0, explanation: "Lookup stops at the first matching property while walking upward." },
      { id: "prototype-chain-2", question: "What is special about Object.create(null)?", options: ["Its prototype is null", "It inherits from every prototype", "It is automatically frozen", "It can only store numbers"], answer: 0, explanation: "The object has no prototype link, so lookup ends after its own properties." },
      { id: "prototype-chain-3", question: "Which object commonly ends a normal object literal's lookup before null?", options: ["Object.prototype", "Array.prototype", "Function.prototype", "The object itself twice"], answer: 0, explanation: "Ordinary object literals normally delegate to Object.prototype, whose prototype is null." },
    ],
    lab: {
      title: "Build a three-level chain",
      brief: "Define const root = { greet() { return 'hello ' + this.name } }, const branch = Object.create(root), and const leaf = Object.create(branch) with leaf.name = 'Ivy'.",
      starter: `const root = {
  // add greet()
};
const branch = Object.create(root);
const leaf = Object.create(branch);
// set leaf.name`,
      hint: "The method can be defined only on root; lookup will find it from leaf.",
      checks: [
        { id: "c1", description: "leaf reaches root", expression: "leaf.greet() === 'hello Ivy'" },
        { id: "c2", description: "the chain has the requested links", expression: "Object.getPrototypeOf(leaf) === branch && Object.getPrototypeOf(branch) === root" },
      ],
    },
  },
  {
    slug: "dunder-proto",
    title: "The __proto__ accessor",
    sectionId: "prototypes",
    minutes: 7,
    level: "intermediate",
    summary: "__proto__ is a legacy accessor that reads or changes an object's prototype. Prefer Object.getPrototypeOf, Object.setPrototypeOf, and Object.create because their intent is explicit and they work consistently.",
    remember: ["__proto__ is an accessor.", "It is not a normal data field.", "Prefer Object APIs.", "Prototype changes can surprise."],
    theory: [
      { heading: "Read versus own data", body: "On ordinary objects, obj.__proto__ invokes an accessor inherited from Object.prototype and returns the internal prototype. Object.hasOwn(obj, '__proto__') is false unless a real own property with that name was defined." },
      { heading: "The setter changes delegation", body: "Assigning obj.__proto__ = proto can rewire future lookup. This legacy behavior is easy to miss in review and can introduce performance or security problems when arbitrary input controls the assigned prototype." },
      { heading: "Use modern, explicit APIs", body: "Object.getPrototypeOf(obj) clearly reads the link, Object.setPrototypeOf(obj, proto) clearly changes it, and Object.create(proto) creates the intended relationship from the start." },
    ],
    analogy: "__proto__ is an old hidden trapdoor; the Object APIs are labeled stairs.",
    example: {
      title: "Inspecting the legacy accessor",
      code: `const tools = { use() { return "used"; } };
const box = {};
box.__proto__ = tools;
console.log(box.use());
console.log(Object.getPrototypeOf(box) === tools);`,
      output: `used
true`,
    },
    extraExample: {
      title: "An own property can shadow __proto__",
      code: `const item = { "__proto__": null };
console.log(Object.getPrototypeOf(item) === null);
const record = Object.create(null);
record.__proto__ = "data";
console.log(record.__proto__);`,
      output: `true
data`,
    },
    pitfalls: ["Treating __proto__ as a guaranteed ordinary own property.", "Changing prototypes repeatedly in performance-sensitive code.", "Using a user-controlled __proto__ assignment and enabling prototype pollution."],
    playground: {
      starter: `const printer = {
  print() {
    return "printed";
  },
};
const page = {};
Object.setPrototypeOf(page, printer);
console.log(page.print());`,
      goal: "Read page's prototype with Object.getPrototypeOf and log whether it is printer.",
    },
    quiz: [
      { id: "dunder-proto-1", question: "What is __proto__ on a typical object?", options: ["A legacy getter/setter for its prototype", "Always an own string property", "A private class field", "A method that clones objects"], answer: 0, explanation: "The familiar __proto__ spelling exposes legacy accessor behavior on ordinary objects." },
      { id: "dunder-proto-2", question: "Which modern API reads an object's prototype?", options: ["Object.getPrototypeOf(obj)", "Object.readParent(obj)", "obj.prototype()", "Object.parent(obj)"], answer: 0, explanation: "Object.getPrototypeOf explicitly returns the internal prototype link." },
      { id: "dunder-proto-3", question: "Why avoid arbitrary __proto__ assignment?", options: ["It can rewire lookup and contribute to prototype pollution", "It always freezes the object", "It deletes all methods", "It changes only local variables"], answer: 0, explanation: "Unexpected prototype mutation can alter behavior across objects and is a known security concern." },
    ],
    lab: {
      title: "Replace a prototype safely",
      brief: "Define const featureSet = { run() { return 'running' } } and function attachFeatures(target) that uses Object.setPrototypeOf(target, featureSet) and returns target.",
      starter: `const featureSet = {
  // add run()
};
function attachFeatures(target) {
  // set the prototype and return target
}`,
      hint: "Use Object.setPrototypeOf(target, featureSet), then return target.",
      checks: [
        { id: "c1", description: "run is available after attaching", expression: "attachFeatures({}).run() === 'running'" },
        { id: "c2", description: "the explicit prototype link is correct", expression: "(function(){ const item = attachFeatures({}); return Object.getPrototypeOf(item) === featureSet; })()" },
      ],
    },
  },
  {
    slug: "prototype-property",
    title: "The prototype property",
    sectionId: "prototypes",
    minutes: 8,
    level: "intermediate",
    summary: "Functions used as constructors have a prototype property that becomes the prototype of instances made with new. This property is different from an object's internal prototype, which is inspected with Object.getPrototypeOf.",
    remember: ["Constructor.prototype is a template link.", "new connects instances.", "Instance has internal [[Prototype]].", "Names look similar; roles differ."],
    theory: [
      { heading: "Functions expose prototype", body: "A normal function has an own prototype property whose value is an object. Methods assigned there become available to instances constructed with new FunctionName(...)." },
      { heading: "new reads the property", body: "When new Maker() runs, the new object's internal prototype is set to Maker.prototype before Maker runs. Replacing Maker.prototype later affects future instances, not the prototype link already stored by old instances." },
      { heading: "Do not confuse the two spellings", body: "Maker.prototype is a property on a constructor function. Object.getPrototypeOf(instance) returns the instance's current internal link; for a freshly constructed instance, those objects are usually equal." },
    ],
    analogy: "The function's prototype property is a signpost at the factory, while an instance's prototype link is the route printed on its delivery label.",
    example: {
      title: "A function prototype method",
      code: `function Robot(name) {
  this.name = name;
}
Robot.prototype.beep = function () {
  return this.name + " beep";
};
const bot = new Robot("R1");
console.log(bot.beep());
console.log(Object.getPrototypeOf(bot) === Robot.prototype);`,
      output: `R1 beep
true`,
    },
    extraExample: {
      title: "Future instances use a replacement",
      code: `function Box() {}
const oldBox = new Box();
Box.prototype = { label() { return "new"; } };
const newBox = new Box();
console.log(typeof oldBox.label, newBox.label());`,
      output: `undefined new`,
    },
    pitfalls: ["Writing instance.prototype instead of Constructor.prototype.", "Assuming replacing a constructor's prototype rewires existing instances.", "Overwriting a prototype and forgetting to restore its constructor property when it matters."],
    playground: {
      starter: `function Lamp(color) {
  this.color = color;
}
Lamp.prototype.describe = function () {
  return this.color + " lamp";
};
console.log(new Lamp("green").describe());`,
      goal: "Use Object.getPrototypeOf to log whether a new Lamp is linked to Lamp.prototype.",
    },
    quiz: [
      { id: "prototype-property-1", question: "What does new Widget() use to set the instance prototype?", options: ["Widget.prototype", "Widget.__name__", "Object.keys(Widget)", "The constructor's return string"], answer: 0, explanation: "The new operation links the created object to the constructor function's prototype property." },
      { id: "prototype-property-2", question: "What does Object.getPrototypeOf(widget) return?", options: ["widget's internal prototype object", "The Widget class source", "All own properties", "The constructor arguments"], answer: 0, explanation: "The API exposes the object's internal prototype link." },
      { id: "prototype-property-3", question: "After replacing Widget.prototype, what happens to an old instance?", options: ["Its existing prototype link stays unchanged", "It is deleted", "It automatically gets both prototypes", "Its own properties are moved"], answer: 0, explanation: "The old instance already stores its previous prototype object as its link." },
    ],
    lab: {
      title: "Add behavior through prototype",
      brief: "Define function Book(title) assigning this.title. Add Book.prototype.summary returning this.title + ' is ready'.",
      starter: `function Book(title) {
  // assign title
}
// add Book.prototype.summary`,
      hint: "Assign a function to Book.prototype.summary and read this.title inside it.",
      checks: [
        { id: "c1", description: "Book stores title", expression: "new Book('Dune').title === 'Dune'" },
        { id: "c2", description: "prototype method works", expression: "new Book('Dune').summary() === 'Dune is ready' && !Object.hasOwn(new Book('Dune'), 'summary')" },
      ],
    },
  },
  {
    slug: "object-create",
    title: "Creating with Object.create",
    sectionId: "prototypes",
    minutes: 8,
    level: "beginner",
    summary: "Object.create(proto) makes a new object whose prototype is exactly proto. It is a direct way to model delegation and can optionally define own properties with descriptors.",
    remember: ["Object.create links, not copies.", "First argument is the prototype.", "null means no inheritance.", "Descriptors add own data."],
    theory: [
      { heading: "Prototype-first construction", body: "Object.create(shared) returns an empty object that delegates to shared. You can then assign own data such as name, allowing inherited methods to use the receiver's state." },
      { heading: "It skips constructors", body: "Object.create does not call a constructor function. That makes it useful for direct delegation but means any initialization a constructor normally performs must be done separately." },
      { heading: "The second argument is optional", body: "Object.create(proto, descriptors) can define own properties with precise writable, enumerable, and configurable flags. For beginner code, assigning properties afterward is often clearer." },
    ],
    analogy: "Object.create gives you a blank notebook with another notebook's instructions bookmarked at the front.",
    example: {
      title: "A dog from shared behavior",
      code: `const dogActions = {
  speak() {
    return this.name + " barks";
  },
};
const dog = Object.create(dogActions);
dog.name = "Rex";
console.log(dog.speak());`,
      output: `Rex barks`,
    },
    extraExample: {
      title: "A null-prototype dictionary",
      code: `const counts = Object.create(null);
counts.apple = 2;
counts.orange = 3;
console.log(counts.apple + counts.orange, Object.getPrototypeOf(counts));`,
      output: `5 null`,
    },
    pitfalls: ["Expecting Object.create to run a constructor.", "Forgetting to initialize required own properties after creating the object.", "Calling counts.toString() on a null-prototype dictionary."],
    playground: {
      starter: `const vehicle = {
  describe() {
    return this.kind + " is ready";
  },
};
const car = Object.create(vehicle);
car.kind = "Car";
console.log(car.describe());`,
      goal: "Create a second vehicle named bike from the same prototype and log its description.",
    },
    quiz: [
      { id: "object-create-1", question: "What does Object.create(proto) primarily do?", options: ["Creates an object linked to proto", "Clones proto deeply", "Runs proto as a constructor", "Freezes proto"], answer: 0, explanation: "It creates a new object and sets its internal prototype to the supplied object." },
      { id: "object-create-2", question: "Why can Object.create(null) be useful for a key map?", options: ["It has no inherited keys or methods", "It automatically sorts keys", "It prevents all writes", "It makes keys private"], answer: 0, explanation: "No prototype means names such as toString are not inherited and cannot collide with map entries." },
      { id: "object-create-3", question: "What must you do if a shared method expects this.name?", options: ["Set name on the created object", "Set name on null", "Call the constructor automatically", "Make name static"], answer: 0, explanation: "Object.create does not initialize instance data, so the receiver needs its own name property." },
    ],
    lab: {
      title: "Create a message object",
      brief: "Define const messageTools with method format() returning '[' + this.level + '] ' + this.text. Define function makeMessage(level, text) returning Object.create(messageTools) with both own properties set.",
      starter: `const messageTools = {
  // add format()
};
function makeMessage(level, text) {
  // create and initialize a message
}`,
      hint: "Create the object first, assign level and text, then return it.",
      checks: [
        { id: "c1", description: "makeMessage stores both fields", expression: "makeMessage('INFO', 'ready').level === 'INFO' && makeMessage('INFO', 'ready').text === 'ready'" },
        { id: "c2", description: "format delegates to messageTools", expression: "makeMessage('INFO', 'ready').format() === '[INFO] ready'" },
      ],
    },
  },
  {
    slug: "get-prototype-of",
    title: "Reading prototypes explicitly",
    sectionId: "prototypes",
    minutes: 6,
    level: "beginner",
    summary: "Object.getPrototypeOf returns the actual prototype link of an object. It is the clearest way to inspect inheritance relationships without relying on legacy syntax.",
    remember: ["getPrototypeOf reads one link.", "It never walks the whole chain.", "Compare with ===.", "null marks the end."],
    theory: [
      { heading: "One link at a time", body: "Object.getPrototypeOf(value) returns the immediate prototype, not every ancestor. Call it repeatedly if you need to inspect a full chain, stopping when the result is null." },
      { heading: "Use identity comparisons", body: "Prototypes are objects, so compare them with === when checking an expected relationship. Object.getPrototypeOf(child) === parent proves that parent is the direct prototype." },
      { heading: "It supports debugging", body: "When an inherited property surprises you, inspecting the immediate link helps reveal where lookup goes next. It can also distinguish a class instance from a plain object with similar visible properties." },
    ],
    analogy: "getPrototypeOf asks a package for the single address printed on its forwarding label.",
    example: {
      title: "Inspect a class instance",
      code: `class User {}
const user = new User();
console.log(Object.getPrototypeOf(user) === User.prototype);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(user)) === Object.prototype);`,
      output: `true
true`,
    },
    extraExample: {
      title: "Checking a direct link",
      code: `const parent = { ready: true };
const child = Object.create(parent);
console.log(Object.getPrototypeOf(child) === parent);
console.log(Object.getPrototypeOf(parent) === Object.prototype);`,
      output: `true
true`,
    },
    pitfalls: ["Expecting getPrototypeOf to return an array of all ancestors.", "Comparing structurally similar prototype objects instead of their identity.", "Calling it on null or undefined, which cannot have a prototype."],
    playground: {
      starter: `const parent = { kind: "parent" };
const child = Object.create(parent);
console.log(Object.getPrototypeOf(child) === parent);`,
      goal: "Log whether the prototype of parent is Object.prototype and then log that the next prototype is null.",
    },
    quiz: [
      { id: "get-prototype-of-1", question: "What does Object.getPrototypeOf(child) return?", options: ["The immediate prototype", "Every ancestor in an array", "Only child own properties", "The constructor arguments"], answer: 0, explanation: "The function returns one immediate prototype link." },
      { id: "get-prototype-of-2", question: "Which operator is best for checking a specific prototype object?", options: ["===", "in", "typeof", "instanceof on strings"], answer: 0, explanation: "Identity comparison proves the returned prototype is the exact expected object." },
      { id: "get-prototype-of-3", question: "What does a null result indicate?", options: ["The prototype chain has ended", "The object is empty", "The object is frozen", "The value is an array"], answer: 0, explanation: "null is the terminal prototype link." },
    ],
    lab: {
      title: "Inspect a direct parent",
      brief: "Define const parentNode = { type: 'parent' } and function makeChild() returning Object.create(parentNode).",
      starter: `const parentNode = {
  type: "parent",
};
function makeChild() {
  // return a child with parentNode as prototype
}`,
      hint: "Object.create(parentNode) is the entire construction step.",
      checks: [
        { id: "c1", description: "makeChild inherits type", expression: "makeChild().type === 'parent'" },
        { id: "c2", description: "getPrototypeOf finds parentNode", expression: "Object.getPrototypeOf(makeChild()) === parentNode" },
      ],
    },
  },
  {
    slug: "set-prototype-of",
    title: "Changing a prototype deliberately",
    sectionId: "prototypes",
    minutes: 8,
    level: "intermediate",
    summary: "Object.setPrototypeOf changes an existing object's immediate prototype. It is useful for controlled demonstrations or rare dynamic delegation, but creating the correct prototype with Object.create is usually cleaner.",
    remember: ["setPrototypeOf mutates a link.", "It returns the object.", "Prefer create at birth.", "Dynamic chains cost clarity."],
    theory: [
      { heading: "The link is mutable", body: "Object.setPrototypeOf(target, proto) changes where target delegates missing properties. The target keeps its own properties, but future lookups can produce different results." },
      { heading: "It returns the target", body: "The function returns the same object that was changed, which can support a small factory. The return value is not the prototype; inspect the result with Object.getPrototypeOf if you need to verify the link." },
      { heading: "Mutation has a cost", body: "Changing prototypes after objects are created can make code harder to reason about and can hurt engine optimization. Prefer Object.create or class extends when the relationship is known up front." },
    ],
    analogy: "setPrototypeOf changes an object's emergency contact card while it is already traveling.",
    example: {
      title: "Attach a capability",
      code: `const canLog = {
  log() {
    return "log:" + this.value;
  },
};
const record = { value: 7 };
Object.setPrototypeOf(record, canLog);
console.log(record.log(), Object.getPrototypeOf(record) === canLog);`,
      output: `log:7 true`,
    },
    extraExample: {
      title: "The return value",
      code: `const proto = { ready: true };
const item = {};
const returned = Object.setPrototypeOf(item, proto);
console.log(returned === item, item.ready);`,
      output: `true true`,
    },
    pitfalls: ["Assuming setPrototypeOf copies properties into the target.", "Using it repeatedly as a substitute for a clear class or factory design.", "Setting a prototype to a non-object non-null value and expecting useful inheritance."],
    playground: {
      starter: `const readable = {
  read() {
    return this.text;
  },
};
const note = { text: "hello" };
Object.setPrototypeOf(note, readable);
console.log(note.read());`,
      goal: "Add a writable() method to readable and log whether note can call it through the new prototype.",
    },
    quiz: [
      { id: "set-prototype-of-1", question: "What does Object.setPrototypeOf(target, proto) change?", options: ["target's immediate prototype link", "target's own properties only", "proto's class name", "Every object in the program"], answer: 0, explanation: "The API rewires one object's immediate delegation link." },
      { id: "set-prototype-of-2", question: "What does setPrototypeOf return?", options: ["The target object", "The new prototype only", "A Boolean always", "An array of ancestors"], answer: 0, explanation: "It returns the target after changing its prototype." },
      { id: "set-prototype-of-3", question: "What is usually clearer when the prototype is known at creation time?", options: ["Object.create(proto)", "Repeated setPrototypeOf calls", "A string property named proto", "Deleting all properties"], answer: 0, explanation: "Object.create states the relationship in the construction expression." },
    ],
    lab: {
      title: "Attach printable behavior",
      brief: "Define const printable = { print() { return this.text; } } and function printableNote(text) that creates { text } and uses Object.setPrototypeOf to attach printable before returning the object.",
      starter: `const printable = {
  // add print()
};
function printableNote(text) {
  // create, attach prototype, return
}`,
      hint: "Create const note = { text }, set its prototype to printable, and return note.",
      checks: [
        { id: "c1", description: "print returns note text", expression: "printableNote('memo').print() === 'memo'" },
        { id: "c2", description: "print is inherited", expression: "!Object.hasOwn(printableNote('memo'), 'print')" },
      ],
    },
  },
  {
    slug: "constructor-functions",
    title: "Constructor functions",
    sectionId: "prototypes",
    minutes: 9,
    level: "intermediate",
    summary: "Before class syntax, constructor functions were the standard way to create related objects. A function assigns instance state, while methods assigned to its prototype provide shared behavior.",
    remember: ["Capitalized means use new.", "Assign state with this.", "Put methods on prototype.", "Restore constructor after replacement."],
    theory: [
      { heading: "The function is a recipe", body: "function User(name) { this.name = name } can be called with new to create an object. The capitalized name is a convention that warns readers the function is intended as a constructor." },
      { heading: "Prototype methods avoid duplication", body: "User.prototype.greet = function () { ... } gives every User instance access to one shared function. Inside that function, this is the particular User that called greet." },
      { heading: "The constructor property is metadata", body: "A default prototype has constructor pointing back to User. If you replace User.prototype with Object.create(parent), restore User.prototype.constructor = User when code or tools rely on that metadata." },
    ],
    analogy: "A constructor function is an old-fashioned workshop foreman who builds each object and points it to the shared tool wall.",
    example: {
      title: "A classic User constructor",
      code: `function User(name) {
  this.name = name;
}
User.prototype.greet = function () {
  return "Hi " + this.name;
};
const user = new User("Ada");
console.log(user.greet(), user.constructor === User);`,
      output: `Hi Ada true`,
    },
    extraExample: {
      title: "A shared method",
      code: `function Coin(value) {
  this.value = value;
}
Coin.prototype.double = function () {
  return this.value * 2;
};
const a = new Coin(4);
const b = new Coin(9);
console.log(a.double(), b.double(), a.double === b.double);`,
      output: `8 18 true`,
    },
    pitfalls: ["Calling a constructor function without new and writing properties onto the wrong this.", "Defining a new function inside the constructor for every instance.", "Replacing the whole prototype object and losing constructor metadata."],
    playground: {
      starter: `function Book(title) {
  this.title = title;
}
Book.prototype.read = function () {
  return "Reading " + this.title;
};
console.log(new Book("Dune").read());`,
      goal: "Add Book.prototype.pages that returns 100, then log pages from a new Book.",
    },
    quiz: [
      { id: "constructor-functions-1", question: "How should a constructor function usually be called?", options: ["With new", "With await only", "As a static property", "Through JSON.parse"], answer: 0, explanation: "new supplies a fresh object as this and links it to the function's prototype." },
      { id: "constructor-functions-2", question: "Where should a shared greet function usually be placed?", options: ["User.prototype.greet", "Inside every instance as a copied closure", "Object.keys(User)", "The global object"], answer: 0, explanation: "The prototype is the shared lookup location for constructor-created instances." },
      { id: "constructor-functions-3", question: "What metadata can be restored after replacing a prototype?", options: ["prototype.constructor", "instance.name only", "Object.keys.length", "globalThis.new"], answer: 0, explanation: "Replacing the object can remove the constructor link, so assign it back when needed." },
    ],
    lab: {
      title: "Build a classic Dog",
      brief: "Define function Dog(name) assigning this.name. Add Dog.prototype.bark returning this.name + ' says woof'.",
      starter: `function Dog(name) {
  // assign name
}
// add Dog.prototype.bark`,
      hint: "Use a normal function on Dog.prototype and read this.name.",
      checks: [
        { id: "c1", description: "Dog initializes its name", expression: "new Dog('Rex').name === 'Rex'" },
        { id: "c2", description: "Dog shares bark through the prototype", expression: "new Dog('Rex').bark() === 'Rex says woof' && !Object.hasOwn(new Dog('Rex'), 'bark')" },
      ],
    },
  },
  {
    slug: "new-keyword",
    title: "What new does",
    sectionId: "prototypes",
    minutes: 10,
    level: "advanced",
    summary: "The new operator creates an object, links it to a constructor's prototype, calls the constructor with that object as this, and returns the constructor's object result when one is explicitly returned. These steps explain why constructor functions and classes work.",
    remember: ["new allocates.", "new links.", "new calls.", "Explicit object return can replace."],
    theory: [
      { heading: "The four conceptual steps", body: "For new C(args), JavaScript creates a new object, sets its prototype to C.prototype, calls C with this bound to that object, and returns the object unless C explicitly returns another object. This is a model for understanding, not code you need to reimplement." },
      { heading: "Primitive returns are ignored", body: "If a constructor returns a number, string, Boolean, null, or undefined, new still returns the prepared instance. An explicitly returned object or function can replace the normal result, which is a sharp edge to use sparingly." },
      { heading: "Classes enforce construction", body: "Class constructors cannot be called without new, so class syntax prevents one common mistake from older constructor functions. The prototype link and this initialization still follow the same object model." },
    ],
    analogy: "new is a factory button with four clicks: make a shell, connect the manual, fill the shell, then hand it over.",
    example: {
      title: "A constructor's primitive return",
      code: `function Box(value) {
  this.value = value;
  return 99;
}
const box = new Box("open");
console.log(box.value, box instanceof Box);`,
      output: `open true`,
    },
    extraExample: {
      title: "An object return replaces the instance",
      code: `function Special() {
  this.kind = "instance";
  return { kind: "replacement" };
}
console.log(new Special().kind);`,
      output: `replacement`,
    },
    pitfalls: ["Thinking new merely calls a function with parentheses.", "Forgetting that an explicit object return can replace the prepared instance.", "Calling a class as a plain function and expecting it to initialize an object."],
    playground: {
      starter: `function Gadget(name) {
  this.name = name;
}
Gadget.prototype.describe = function () {
  return "Gadget: " + this.name;
};
const gadget = new Gadget("A");
console.log(gadget.describe(), gadget instanceof Gadget);`,
      goal: "Add a second Gadget and use console.log to show that each keeps its own name while sharing describe.",
    },
    quiz: [
      { id: "new-1", question: "Which operation is part of new Constructor()?", options: ["It links the result to Constructor.prototype", "It clones every global variable", "It freezes the constructor", "It calls all static methods"], answer: 0, explanation: "Creating the prototype link is one of new's core construction steps." },
      { id: "new-2", question: "What happens when a constructor returns a primitive?", options: ["The prepared instance is still returned", "The primitive becomes the instance", "new throws every time", "The prototype is discarded"], answer: 0, explanation: "Only an explicitly returned object or function replaces the instance; primitives are ignored by new." },
      { id: "new-3", question: "What does class syntax prevent?", options: ["Calling a class constructor without new", "Using instance methods", "Having a prototype", "Defining a constructor"], answer: 0, explanation: "A class constructor throws when invoked as an ordinary function without new." },
    ],
    lab: {
      title: "Model a gadget constructor",
      brief: "Define function Gadget(name) assigning this.name and add Gadget.prototype.label returning 'Gadget: ' + this.name.",
      starter: `function Gadget(name) {
  // initialize this.name
}
// add Gadget.prototype.label`,
      hint: "new Gadget will provide this; label belongs on Gadget.prototype.",
      checks: [
        { id: "c1", description: "new creates initialized gadgets", expression: "new Gadget('A').name === 'A'" },
        { id: "c2", description: "the result has Gadget in its chain", expression: "new Gadget('A') instanceof Gadget && new Gadget('A').label() === 'Gadget: A'" },
      ],
    },
  },
  {
    slug: "function-constructors",
    title: "Designing function constructors",
    sectionId: "prototypes",
    minutes: 9,
    level: "intermediate",
    summary: "Function constructors combine own initialization with prototype methods to create lightweight object types. They remain useful when working with older APIs or when demonstrating the mechanics behind class syntax.",
    remember: ["Use a capitalized name.", "Own data in the body.", "Behavior on prototype.", "Check instanceof."],
    theory: [
      { heading: "Separate state and behavior", body: "The constructor body should assign values that differ per instance, such as name or balance. Prototype assignments should hold behavior that can be shared, such as greet or deposit." },
      { heading: "Validate the calling convention", body: "A function constructor can be accidentally called without new. In modern code, class syntax prevents this; for a legacy constructor, new.target or an explicit guard can detect misuse and provide a useful error." },
      { heading: "Prototype replacement needs care", body: "Adding methods one by one preserves the default constructor property. If you replace the entire prototype for inheritance, set the constructor property back and use Object.create for the parent link." },
    ],
    analogy: "A function constructor is a reusable assembly recipe with a shared tool rack mounted beside it.",
    example: {
      title: "A bank account constructor",
      code: `function Account(owner, balance) {
  this.owner = owner;
  this.balance = balance;
}
Account.prototype.deposit = function (amount) {
  this.balance += amount;
  return this.balance;
};
const account = new Account("Ada", 10);
console.log(account.deposit(5), account.constructor === Account);`,
      output: `15 true`,
    },
    extraExample: {
      title: "Guarding against a missing new",
      code: `function Card(value) {
  if (!new.target) return new Card(value);
  this.value = value;
}
console.log(Card("ace").value);`,
      output: `ace`,
    },
    pitfalls: ["Adding methods inside the constructor and allocating one function per object.", "Forgetting to return or throw when supporting a no-new call path.", "Using an arrow function as a constructor, since arrows cannot be used with new."],
    playground: {
      starter: `function Light(label) {
  this.label = label;
}
Light.prototype.on = function () {
  return this.label + " on";
};
console.log(new Light("desk").on());`,
      goal: "Add Light.prototype.off returning the matching '<label> off' message and log it.",
    },
    quiz: [
      { id: "function-constructors-1", question: "What belongs in a function constructor body?", options: ["Per-instance initialization", "Only shared methods", "Global constants", "Prototype chain traversal"], answer: 0, explanation: "The body runs for each new call and is the natural place for own state." },
      { id: "function-constructors-2", question: "Why put deposit on Account.prototype?", options: ["All accounts can share one function", "It makes balance static", "It prevents this from working", "It removes Account instances"], answer: 0, explanation: "Prototype lookup lets each account use the same method function with its own this." },
      { id: "function-constructors-3", question: "Can an arrow function be called with new?", options: ["No; arrows are not constructable", "Yes, but only with strings", "Only after Object.freeze", "Only if it has a prototype property"], answer: 0, explanation: "Arrow functions lack the internal construct behavior required by new." },
    ],
    lab: {
      title: "Define a function constructor",
      brief: "Define function Wallet(owner, cents) assigning this.owner and this.cents. Add Wallet.prototype.add(amount) that increases cents and returns cents.",
      starter: `function Wallet(owner, cents) {
  // assign owner and cents
}
// add Wallet.prototype.add`,
      hint: "Use this.cents += amount in the shared prototype method.",
      checks: [
        { id: "c1", description: "Wallet stores constructor state", expression: "new Wallet('Ada', 100).owner === 'Ada' && new Wallet('Ada', 100).cents === 100" },
        { id: "c2", description: "add changes the wallet", expression: "new Wallet('Ada', 100).add(25) === 125" },
      ],
    },
  },
];
