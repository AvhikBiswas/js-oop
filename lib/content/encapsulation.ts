import type { Topic } from "../types";

export const encapsulationTopics: Topic[] = [
  {
    slug: "public-members",
    title: "Public members",
    sectionId: "encapsulation",
    minutes: 6,
    level: "beginner",
    summary: "Public members are properties and methods that code outside an object may read or call directly.",
    remember: [
      "Class fields and methods are public unless declared with #.",
      "Public state is part of the object's visible API.",
      "A public member can be accessed with dot or bracket notation.",
      "Choose clear public names because callers may depend on them.",
    ],
    theory: [
      { heading: "The visible surface", body: "An object exposes a public surface: the names that other code is allowed to use. JavaScript classes make ordinary fields and methods public by default." },
      { heading: "Direct access", body: "Dot notation is usually the clearest way to access a public member, while bracket notation is useful when the property name is dynamic. Both follow the same visibility rule." },
      { heading: "API design", body: "Public does not mean immutable or automatically safe. It means callers can reach the value, so validation and useful method boundaries still matter." },
    ],
    analogy: "A public member is like the front door and reception desk of a building: visitors can use it without knowing the private rooms behind it.",
    example: {
      title: "A public class API",
      code: `class Counter {
  count = 0;
  increment() {
    this.count += 1;
    return this.count;
  }
}
const counter = new Counter();
console.log(counter.count, counter.increment());`,
      output: "0 1",
    },
    extraExample: {
      title: "Dot and bracket access",
      code: `const profile = { name: "Ada", role: "engineer" };
const key = "role";
console.log(profile.name, profile[key]);`,
      output: "Ada engineer",
    },
    pitfalls: [
      "Assuming public fields are protected from invalid assignments.",
      "Changing a public property name without updating its callers.",
      "Using bracket notation when simple dot notation would communicate intent better.",
    ],
    playground: {
      starter: `class Lamp {
  // Add a public property named isOn and a toggle() method.
}
const lamp = new Lamp();
console.log(lamp.isOn);`,
      goal: "Create a public isOn property starting at false and make toggle() switch it and return the new value.",
    },
    quiz: [
      { id: "public-members-q1", question: "What is the default visibility of an ordinary class field?", options: ["Private", "Protected", "Public", "Static only"], answer: 2, explanation: "An ordinary field is public unless it uses the # private syntax." },
      { id: "public-members-q2", question: "Which expression reads a public member named color?", options: ["object.color", "object::color", "object->color", "object.private.color"], answer: 0, explanation: "Dot notation reads a property directly from an object." },
      { id: "public-members-q3", question: "Why should a public property name be chosen carefully?", options: ["Public properties cannot store strings", "Callers can depend on that name", "Public properties are always frozen", "Only constructors can read it"], answer: 1, explanation: "A public name is part of the API used by outside code." },
    ],
    lab: {
      title: "Expose a public playlist",
      brief: "Create class Playlist with public name and tracks members. Add addTrack(track) to push a track and return the track count.",
      starter: `class Playlist {
  // constructor(name)
  // public tracks array
  // addTrack(track)
}`,
      hint: "Initialize this.tracks to an empty array and return this.tracks.length after push().",
      checks: [
        { id: "public-members-l1", description: "name and tracks are public", expression: "new Playlist('Focus').name === 'Focus' && Array.isArray(new Playlist('Focus').tracks)" },
        { id: "public-members-l2", description: "addTrack updates public tracks", expression: "(() => { const p = new Playlist('Focus'); return p.addTrack('Lo-fi') === 1 && p.tracks[0] === 'Lo-fi'; })()" },
      ],
    },
  },
  {
    slug: "private-members",
    title: "Private members with #",
    sectionId: "encapsulation",
    minutes: 10,
    level: "intermediate",
    summary: "JavaScript private class elements use # names that can only be referenced inside the declaring class.",
    remember: [
      "A private name must be declared with # before it is used.",
      "Outside code cannot read, write, or even parse a direct # access.",
      "Private fields are enforced by the language, not by naming convention.",
      "Public methods can provide controlled access to private state.",
    ],
    theory: [
      { heading: "Hard privacy", body: "A declaration such as #balance creates a private brand for instances of that class. The field is not an ordinary string-keyed property." },
      { heading: "Controlled operations", body: "A class can keep raw state private while exposing methods such as deposit or balance(), allowing it to validate every change." },
      { heading: "Syntax boundary", body: "The # token is part of the identifier. Writing account.balance or account['#balance'] does not access a private field; direct account.#balance is a syntax error outside the class." },
    ],
    analogy: "A private member is a locked service hatch: staff inside the room can use it, while visitors can only ask the public counter to perform approved actions.",
    example: {
      title: "Protect a score",
      code: `class Score {
  #points = 0;
  add(points) {
    if (points > 0) this.#points += points;
  }
  value() {
    return this.#points;
  }
}
const score = new Score();
score.add(7);
console.log(score.value(), Object.hasOwn(score, "#points"));`,
      output: "7 false",
    },
    extraExample: {
      title: "Private state with validation",
      code: `class Thermostat {
  #celsius = 20;
  setCelsius(value) {
    if (Number.isFinite(value)) this.#celsius = value;
  }
  read() {
    return this.#celsius;
  }
}
const thermostat = new Thermostat();
thermostat.setCelsius(22);
console.log(thermostat.read());`,
      output: "22",
    },
    pitfalls: [
      "Trying to access a private field with bracket notation or a string containing its name.",
      "Forgetting that every private name must be declared in the same class before use.",
      "Returning a mutable private object directly and accidentally exposing its internals.",
    ],
    playground: {
      starter: `class SafeBox {
  // Declare private #value and add put(value) and open() methods.
}
const box = new SafeBox();
box.put("key");
console.log(box.open());`,
      goal: "Keep the stored value in #value and make open() return it without creating a public value field.",
    },
    quiz: [
      { id: "private-members-q1", question: "How is a private class field declared?", options: ["private value", "#value", "_value", "hidden value"], answer: 1, explanation: "JavaScript uses a leading # in both the declaration and internal references." },
      { id: "private-members-q2", question: "What happens with object['#value'] for a #value field?", options: ["It reads the private field", "It reads a normal string property if one exists", "It always returns the private value", "It calls the constructor"], answer: 1, explanation: "Bracket notation addresses a normal string-keyed property, not a private element." },
      { id: "private-members-q3", question: "What is a good way to expose private state?", options: ["A validated public method", "A global variable", "The # name in a template", "Deleting the declaration"], answer: 0, explanation: "Public methods can enforce rules while keeping the representation private." },
    ],
    lab: {
      title: "Build a private meter",
      brief: "Create class Meter with private #value, add(amount) that increases it, and read() that returns it.",
      starter: `class Meter {
  // private #value starts at 0
  // add(amount)
  // read()
}`,
      hint: "Use this.#value only inside Meter. The lab checks call the public methods.",
      checks: [
        { id: "private-members-l1", description: "value starts privately at zero", expression: "new Meter().read() === 0" },
        { id: "private-members-l2", description: "add changes the private value", expression: "(() => { const m = new Meter(); m.add(4); return m.read() === 4; })()" },
        { id: "private-members-l3", description: "the private name is not an own string property", expression: "!Object.hasOwn(new Meter(), '#value')" },
      ],
    },
  },
  {
    slug: "protected-convention",
    title: "Protected by convention",
    sectionId: "encapsulation",
    minutes: 7,
    level: "beginner",
    summary: "JavaScript has no protected keyword; an underscore such as _value communicates that subclasses may use a member but outside code should treat it as internal.",
    remember: [
      "An underscore is a convention, not an access restriction.",
      "Subclasses can read a conventional protected member normally.",
      "Outside callers can still read or change the member.",
      "Use documentation and methods when the convention needs stronger boundaries.",
    ],
    theory: [
      { heading: "Convention versus enforcement", body: "Names like _count carry a social signal. JavaScript does not stop code from accessing them, so this style is softer than # private fields." },
      { heading: "Why subclasses use it", body: "A base class can expose implementation details to child classes through a documented underscore member while keeping the public API smaller." },
      { heading: "Choosing the boundary", body: "Use the convention when collaboration with subclasses is the goal. Use # or a closure when accidental outside access must be impossible." },
    ],
    analogy: "An underscore member is an employees-only sign: it asks guests not to enter, but it is not a locked door.",
    example: {
      title: "A subclass reads _label",
      code: `class Message {
  constructor(label) {
    this._label = label;
  }
}
class Alert extends Message {
  text() {
    return "Alert: " + this._label;
  }
}
const alert = new Alert("Disk full");
console.log(alert.text(), alert._label);`,
      output: "Alert: Disk full Disk full",
    },
    extraExample: {
      title: "The convention is not private",
      code: `class Account {
  constructor() {
    this._status = "open";
  }
}
const account = new Account();
account._status = "closed";
console.log(account._status);`,
      output: "closed",
    },
    pitfalls: [
      "Calling _name true privacy when JavaScript still allows direct access.",
      "Changing a conventional internal member without considering subclasses.",
      "Using underscores without documenting what subclasses are allowed to rely on.",
    ],
    playground: {
      starter: `class BaseTimer {
  // Store seconds in _seconds.
}
class Countdown extends BaseTimer {
  // Add remaining() that reads _seconds.
}
const countdown = new Countdown(30);
console.log(countdown.remaining());`,
      goal: "Use _seconds as a protected-by-convention value and return 30 from remaining().",
    },
    quiz: [
      { id: "protected-convention-q1", question: "What does _value mean in common JavaScript style?", options: ["The language enforces privacy", "It is a convention for internal use", "It creates a static field", "It freezes the value"], answer: 1, explanation: "The underscore communicates intent but does not enforce access control." },
      { id: "protected-convention-q2", question: "Can a subclass normally read this._value?", options: ["Yes", "No, it is syntax-invalid", "Only from a static method", "Only after Object.freeze"], answer: 0, explanation: "An underscore property is an ordinary property available to subclasses." },
      { id: "protected-convention-q3", question: "Which feature provides enforced class privacy?", options: ["An underscore", "# private fields", "A capitalized name", "A getter alone"], answer: 1, explanation: "Hash-named private elements are enforced by modern JavaScript." },
    ],
    lab: {
      title: "Share a conventional base value",
      brief: "Create BaseTimer(seconds) storing _seconds, then Countdown extends BaseTimer with remaining() returning _seconds.",
      starter: `class BaseTimer {
  // constructor(seconds)
}
class Countdown extends BaseTimer {
  // remaining()
}`,
      hint: "Call super(seconds) from the child constructor only if you add one; inherited constructors can also receive arguments through super.",
      checks: [
        { id: "protected-convention-l1", description: "Countdown receives the base value", expression: "new Countdown(30)._seconds === 30" },
        { id: "protected-convention-l2", description: "the child method reads _seconds", expression: "new Countdown(30).remaining() === 30" },
      ],
    },
  },
  {
    slug: "getters",
    title: "Getters",
    sectionId: "encapsulation",
    minutes: 8,
    level: "beginner",
    summary: "A getter lets a method run when a property is read, giving property-like syntax to computed or validated data.",
    remember: [
      "Define a getter with get name().",
      "Read a getter as object.name, without parentheses.",
      "A getter can compute a value from other state.",
      "Getters should avoid surprising expensive work or side effects.",
    ],
    theory: [
      { heading: "Method-like, property-like", body: "The getter body is a function, but callers use property syntax. This is useful when the result feels like a value derived from current state." },
      { heading: "Computed views", body: "A getter can combine fields, format text, or report a count without storing duplicate state that could become stale." },
      { heading: "Read-only by omission", body: "If no matching setter exists, assigning to a getter is not a supported update path. In strict mode an assignment can throw; otherwise it may be ignored." },
    ],
    analogy: "A getter is a vending-machine display: you ask for the displayed value, and the machine calculates or retrieves it when needed.",
    example: {
      title: "A computed full name",
      code: `class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  get fullName() {
    return this.first + " " + this.last;
  }
}
const person = new Person("Ada", "Lovelace");
console.log(person.fullName);`,
      output: "Ada Lovelace",
    },
    extraExample: {
      title: "A getter stays current",
      code: `class Cart {
  constructor() {
    this.items = [];
  }
  get itemCount() {
    return this.items.length;
  }
}
const cart = new Cart();
cart.items.push("book");
console.log(cart.itemCount);`,
      output: "1",
    },
    pitfalls: [
      "Calling a getter as fullName() even though it is read with property syntax.",
      "Storing a computed value separately and forgetting to update it.",
      "Putting mutations or expensive I/O in a getter that callers expect to be a simple read.",
    ],
    playground: {
      starter: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  // Add an area getter.
}
const rectangle = new Rectangle(3, 4);
console.log(rectangle.area);`,
      goal: "Add get area() so the final log prints 12 without calling area as a function.",
    },
    quiz: [
      { id: "getters-q1", question: "How is a getter normally read?", options: ["object.value()", "object.value", "get object.value", "object->value"], answer: 1, explanation: "A getter provides property-style access." },
      { id: "getters-q2", question: "What is a useful purpose of a getter?", options: ["Compute a current derived value", "Hide all public methods", "Make every field private", "Prevent constructors"], answer: 0, explanation: "Getters are often used for values derived from current object state." },
      { id: "getters-q3", question: "What does a getter without a setter provide?", options: ["A conventional read-only API", "Automatic deep freezing", "A private field", "A static constructor"], answer: 0, explanation: "Without a setter, callers have no supported assignment operation for that property." },
    ],
    lab: {
      title: "Add a rectangle getter",
      brief: "Create Rectangle(width, height) with an area getter that returns width multiplied by height.",
      starter: `class Rectangle {
  // constructor(width, height)
  // get area()
}`,
      hint: "The check accesses new Rectangle(5, 2).area rather than calling it.",
      checks: [
        { id: "getters-l1", description: "area is computed", expression: "new Rectangle(5, 2).area === 10" },
        { id: "getters-l2", description: "area tracks changed dimensions", expression: "(() => { const r = new Rectangle(3, 4); r.width = 5; return r.area === 20; })()" },
      ],
    },
  },
  {
    slug: "setters",
    title: "Setters",
    sectionId: "encapsulation",
    minutes: 8,
    level: "intermediate",
    summary: "A setter runs when a property is assigned, making it a convenient place to validate or normalize incoming values.",
    remember: [
      "Define a setter with set name(value).",
      "Assign to a setter as object.name = value.",
      "A setter should usually write to a differently named backing field.",
      "Validation in a setter keeps invalid state out of the object.",
    ],
    theory: [
      { heading: "Assignment hook", body: "A setter turns an assignment into an operation. The right-hand value is passed to the setter, which can reject it, normalize it, or store it." },
      { heading: "Backing storage", body: "Writing this.name inside set name(value) calls the setter again. Store the result in a field such as _name or a private #name instead." },
      { heading: "Error policy", body: "A setter can throw for invalid input or choose a safe normalization. The important part is that its contract is predictable to callers." },
    ],
    analogy: "A setter is a security checkpoint on a delivery door: every package is inspected before it enters storage.",
    example: {
      title: "Validate a volume",
      code: `class Player {
  #volume = 0;
  set volume(value) {
    if (value < 0 || value > 100) throw new RangeError("0-100");
    this.#volume = value;
  }
  get volume() {
    return this.#volume;
  }
}
const player = new Player();
player.volume = 75;
console.log(player.volume);`,
      output: "75",
    },
    extraExample: {
      title: "Normalize a username",
      code: `class User {
  set name(value) {
    this._name = String(value).trim().toLowerCase();
  }
  get name() {
    return this._name;
  }
}
const user = new User();
user.name = " Ada ";
console.log(user.name);`,
      output: "ada",
    },
    pitfalls: [
      "Assigning to the same property inside its setter and causing infinite recursion.",
      "Silently accepting invalid values without documenting the normalization.",
      "Assuming a setter returns a useful value; assignment expressions generally evaluate to the assigned right-hand value.",
    ],
    playground: {
      starter: `class Temperature {
  // Store a Celsius value through a celsius setter.
}
const temperature = new Temperature();
temperature.celsius = 21;
console.log(temperature.celsius);`,
      goal: "Create a celsius getter and setter that accept finite numbers and store them in a backing field.",
    },
    quiz: [
      { id: "setters-q1", question: "When does a setter run?", options: ["When the property is assigned", "Only during new", "When JSON is parsed", "When the class is declared"], answer: 0, explanation: "Assignment to the setter's property invokes its set method." },
      { id: "setters-q2", question: "Why should a setter use a backing field?", options: ["To avoid recursively calling itself", "To make the class static", "To disable validation", "To force bracket notation"], answer: 0, explanation: "Writing the setter's own property from inside the setter invokes it again." },
      { id: "setters-q3", question: "Which is a sensible setter responsibility?", options: ["Validate an incoming value", "Always mutate unrelated globals", "Return a Promise automatically", "Erase the prototype"], answer: 0, explanation: "Setters are a natural boundary for validation and normalization." },
    ],
    lab: {
      title: "Validate a score setter",
      brief: "Create Score with a score setter and getter. Accept values from 0 through 100 and reject other values with RangeError.",
      starter: `class Score {
  // score getter and setter
}`,
      hint: "Keep the number in a backing field such as this._score. Throw RangeError when value < 0 or value > 100.",
      checks: [
        { id: "setters-l1", description: "valid assignment can be read", expression: "(() => { const s = new Score(); s.score = 80; return s.score === 80; })()" },
        { id: "setters-l2", description: "low invalid values throw", expression: "(() => { try { const s = new Score(); s.score = -1; return false; } catch (error) { return error instanceof RangeError; } })()" },
        { id: "setters-l3", description: "high invalid values throw", expression: "(() => { try { const s = new Score(); s.score = 101; return false; } catch (error) { return error instanceof RangeError; } })()" },
      ],
    },
  },
  {
    slug: "property-descriptors",
    title: "Property descriptors",
    sectionId: "encapsulation",
    minutes: 11,
    level: "advanced",
    summary: "A property descriptor records whether a property is writable, enumerable, configurable, or accessor-based.",
    remember: [
      "Data descriptors use value and writable.",
      "Accessor descriptors use get and set instead of value.",
      "enumerable controls common key listing behavior.",
      "configurable controls whether descriptor details can be changed or the property deleted.",
    ],
    theory: [
      { heading: "Metadata for a property", body: "Object.getOwnPropertyDescriptor returns the own property's descriptor. For a data property it can include value, writable, enumerable, and configurable." },
      { heading: "Define precisely", body: "Object.defineProperty creates or updates one property with descriptor settings. Unspecified flags default to false when creating a new property, so state them deliberately." },
      { heading: "Accessors are descriptors too", body: "A descriptor may contain get and set functions instead of a stored value. A descriptor cannot mix value or writable with get or set." },
    ],
    analogy: "A descriptor is a label on a museum display: it says what is inside, whether visitors may alter it, and whether it appears in the public catalog.",
    example: {
      title: "Define a read-only id",
      code: `const item = {};
Object.defineProperty(item, "id", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false,
});
const descriptor = Object.getOwnPropertyDescriptor(item, "id");
console.log(item.id, descriptor.writable, Object.keys(item));`,
      output: "42 false [ 'id' ]",
    },
    extraExample: {
      title: "Inspect an accessor",
      code: `let raw = 3;
const box = {};
Object.defineProperty(box, "value", {
  get() { return raw; },
  set(next) { raw = next; },
  enumerable: true,
});
box.value = 9;
console.log(box.value, Object.keys(box));`,
      output: "9 [ 'value' ]",
    },
    pitfalls: [
      "Expecting omitted descriptor flags on a new property to default to true.",
      "Combining value or writable with get or set in one descriptor.",
      "Forgetting that a non-configurable property cannot later be freely redefined or deleted.",
    ],
    playground: {
      starter: `const settings = {};
// Define settings.mode as an enumerable, non-writable value of "dark".
console.log(settings.mode, Object.keys(settings));`,
      goal: "Use Object.defineProperty so the log shows dark and includes mode in the keys.",
    },
    quiz: [
      { id: "property-descriptors-q1", question: "Which flag controls assignment to a data property?", options: ["enumerable", "configurable", "writable", "visible"], answer: 2, explanation: "writable determines whether the property's stored value can be changed." },
      { id: "property-descriptors-q2", question: "Which API reads an own property's descriptor?", options: ["Object.describe", "Object.getOwnPropertyDescriptor", "Object.propertyInfo", "Reflect.readDescriptorOnly"], answer: 1, explanation: "Object.getOwnPropertyDescriptor returns the descriptor for one own property." },
      { id: "property-descriptors-q3", question: "Which pair belongs to an accessor descriptor?", options: ["value and writable", "get and set", "name and length", "keys and entries"], answer: 1, explanation: "Accessor descriptors define behavior with get and set functions." },
    ],
    lab: {
      title: "Define a locked label",
      brief: "Create object label and define label.text as value 'ready', writable false, enumerable true, and configurable false.",
      starter: `const label = {};
// Define label.text with the requested descriptor.
`,
      hint: "Use Object.defineProperty(label, 'text', { value: 'ready', writable: false, enumerable: true, configurable: false }).",
      checks: [
        { id: "property-descriptors-l1", description: "text has the expected value", expression: "label.text === 'ready'" },
        { id: "property-descriptors-l2", description: "text is not writable", expression: "Object.getOwnPropertyDescriptor(label, 'text').writable === false" },
        { id: "property-descriptors-l3", description: "text is enumerable", expression: "Object.keys(label).includes('text')" },
      ],
    },
  },
  {
    slug: "object-define-property",
    title: "Object.defineProperty",
    sectionId: "encapsulation",
    minutes: 10,
    level: "advanced",
    summary: "Object.defineProperty creates or configures one property with exact data or accessor behavior.",
    remember: [
      "The first argument is the target object and the second is the property key.",
      "The third argument is a descriptor object.",
      "It can create non-enumerable, read-only, or accessor properties.",
      "Use Object.defineProperties when configuring several properties together.",
    ],
    theory: [
      { heading: "One property at a time", body: "Object.defineProperty(target, key, descriptor) gives precise control over a single own property. It returns the target object." },
      { heading: "Defaults matter", body: "For a newly created property, writable, enumerable, and configurable default to false when omitted. Object literals normally create these flags as true." },
      { heading: "Computed behavior", body: "Supplying get or set turns the property into an accessor. The getter and setter can close over private data held outside the object." },
    ],
    analogy: "defineProperty is a custom door installation: you choose the lock, whether the door is listed on the floor plan, and exactly how it opens.",
    example: {
      title: "Create a hidden version",
      code: `const api = {};
Object.defineProperty(api, "version", {
  value: "1.0",
  enumerable: false,
});
console.log(api.version, Object.keys(api), Object.getOwnPropertyNames(api));`,
      output: "1.0 [] [ 'version' ]",
    },
    extraExample: {
      title: "Define a computed property",
      code: `const point = { x: 3, y: 4 };
Object.defineProperty(point, "distance", {
  get() { return Math.hypot(point.x, point.y); },
  enumerable: true,
});
console.log(point.distance);`,
      output: "5",
    },
    pitfalls: [
      "Using a data descriptor and accessor descriptor together.",
      "Assuming a newly defined property is writable or enumerable when those flags were omitted.",
      "Expecting non-enumerable properties to appear in Object.keys even though direct access still works.",
    ],
    playground: {
      starter: `const user = { first: "Ada", last: "Lovelace" };
// Define a fullName getter with Object.defineProperty.
console.log(user.fullName);`,
      goal: "Define an enumerable fullName getter that returns first + space + last.",
    },
    quiz: [
      { id: "object-define-property-q1", question: "What does Object.defineProperty return?", options: ["The descriptor only", "The target object", "A boolean always", "The property value"], answer: 1, explanation: "It returns the object on which the property was defined." },
      { id: "object-define-property-q2", question: "What happens to enumerable when omitted for a new property?", options: ["It defaults to true", "It defaults to false", "It copies from Object.prototype", "It becomes random"], answer: 1, explanation: "Descriptor attributes default to false for a newly created property." },
      { id: "object-define-property-q3", question: "Which descriptor creates a computed read?", options: ["{ value: fn }", "{ get() { return 1; } }", "{ writable: get }", "{ enumerable: getter }"], answer: 1, explanation: "The get function is invoked when the property is read." },
    ],
    lab: {
      title: "Add a full name accessor",
      brief: "Given user with first and last, use Object.defineProperty to add a fullName getter that returns the combined name.",
      starter: `const user = { first: "Grace", last: "Hopper" };
// Add fullName with Object.defineProperty.
`,
      hint: "Use a descriptor with get() and enumerable: true. Read user.first and user.last inside the getter.",
      checks: [
        { id: "object-define-property-l1", description: "fullName returns both names", expression: "user.fullName === 'Grace Hopper'" },
        { id: "object-define-property-l2", description: "fullName is enumerable", expression: "Object.keys(user).includes('fullName')" },
      ],
    },
  },
];
