import type { Topic } from "../types";

export const objectUtilitiesTopics: Topic[] = [
  {
    slug: "instanceof-util",
    title: "instanceof as a prototype-chain utility",
    sectionId: "object-utilities",
    minutes: 9,
    level: "intermediate",
    summary: "The instanceof operator is a prototype-chain checking utility: it asks whether a constructor's prototype appears in an object's chain.",
    remember: [
      "value instanceof Constructor checks Constructor.prototype in the chain.",
      "It is about prototype linkage, not just a stored class label.",
      "It differs from polymorphism lessons that focus on choosing overridden behavior.",
      "Primitives generally return false for ordinary instanceof checks.",
    ],
    theory: [
      { heading: "The chain test", body: "For an object on the left and a constructor on the right, instanceof walks the object's prototype chain looking for the constructor's prototype. A subclass instance can therefore be an instance of both child and parent." },
      { heading: "Utility questions", body: "Use instanceof when a program needs a prototype-family check, such as deciding whether a value is a Date or a particular domain class. It is not a substitute for checking the capability a function actually needs." },
      { heading: "Boundaries", body: "Cross-realm objects, custom Symbol.hasInstance, and objects created with unusual prototypes can make instanceof surprising. Prefer a precise check that matches the question." },
    ],
    analogy: "instanceof is checking an object's ancestry chart for a particular family crest, not asking what job the object currently performs.",
    example: {
      title: "Check a prototype chain",
      code: `class Animal {}
class Dog extends Animal {}
const dog = new Dog();
console.log(dog instanceof Dog, dog instanceof Animal, {} instanceof Animal);`,
      output: "true true false",
    },
    extraExample: {
      title: "Built-in prototype check",
      code: `const when = new Date();
const text = "2026";
console.log(when instanceof Date, text instanceof String);`,
      output: "true false",
    },
    pitfalls: [
      "Using instanceof as a universal type check for primitives such as strings or numbers.",
      "Assuming two copies of a class from different realms share the same prototype identity.",
      "Confusing prototype-chain membership with whether an object has a particular method.",
    ],
    playground: {
      starter: `class Vehicle {}
class Car extends Vehicle {}
const car = new Car();
console.log(car instanceof Vehicle);`,
      goal: "Use instanceof to log true for both Car and its parent Vehicle.",
    },
    quiz: [
      { id: "instanceof-util-q1", question: "What does x instanceof C primarily inspect?", options: ["C.prototype in x's chain", "x's JSON text", "Only x.constructor.name", "Every own property"], answer: 0, explanation: "The operator checks whether C.prototype appears in the object's prototype chain." },
      { id: "instanceof-util-q2", question: "What is true for new Dog() when Dog extends Animal?", options: ["It is only an Animal", "It is only a Dog", "It is both a Dog and an Animal", "It is neither"], answer: 2, explanation: "The Dog prototype chain includes both Dog.prototype and Animal.prototype." },
      { id: "instanceof-util-q3", question: "Which value is not an instance of String?", options: ["new String('x')", "'x'", "A String subclass instance", "An object with String.prototype in its chain"], answer: 1, explanation: "A primitive string is not a String object instance for instanceof." },
    ],
    lab: {
      title: "Inspect a vehicle chain",
      brief: "Create Vehicle and Car extends Vehicle, then use instanceof to check a Car instance against both constructors.",
      starter: `class Vehicle {}
class Car extends Vehicle {}
const car = new Car();
`,
      hint: "The left side is the object and the right side is the constructor: car instanceof Car.",
      checks: [
        { id: "instanceof-util-l1", description: "car is a Car", expression: "car instanceof Car" },
        { id: "instanceof-util-l2", description: "car is also a Vehicle", expression: "car instanceof Vehicle" },
        { id: "instanceof-util-l3", description: "a plain object is not a Vehicle", expression: "!({} instanceof Vehicle)" },
      ],
    },
  },
  {
    slug: "is-prototype-of",
    title: "Object.prototype.isPrototypeOf",
    sectionId: "object-utilities",
    minutes: 8,
    level: "intermediate",
    summary: "isPrototypeOf checks whether one object occurs anywhere in another object's prototype chain, without naming a constructor.",
    remember: [
      "prototypeObject.isPrototypeOf(value) walks value's chain.",
      "The receiver must be an object used as a prototype.",
      "It can check custom prototype links created with Object.create.",
      "It answers a relationship question, not an own-property question.",
    ],
    theory: [
      { heading: "Prototype-to-object direction", body: "The method is called on the possible prototype: Parent.prototype.isPrototypeOf(child). This direction is the reverse-looking counterpart to child instanceof Parent." },
      { heading: "Constructor-free checks", body: "Because it accepts a prototype object directly, isPrototypeOf is useful when code has a prototype reference but no constructor function." },
      { heading: "Chain depth", body: "The method checks the entire chain, not just the immediate prototype. An object can have several prototype ancestors." },
    ],
    analogy: "isPrototypeOf asks whether a particular ancestor appears anywhere in a family tree, even when you do not know which family name the person uses.",
    example: {
      title: "Check a custom prototype",
      code: `const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";
console.log(animal.isPrototypeOf(dog), dog.hasOwnProperty("eats"));`,
      output: "true false",
    },
    extraExample: {
      title: "Check a deeper chain",
      code: `const root = { level: 0 };
const middle = Object.create(root);
const leaf = Object.create(middle);
console.log(root.isPrototypeOf(leaf), middle.isPrototypeOf(leaf));`,
      output: "true true",
    },
    pitfalls: [
      "Reversing the receiver and value: call possiblePrototype.isPrototypeOf(value).",
      "Expecting inherited properties to become own properties after the check.",
      "Using a value that is not an object as the receiver for the method.",
    ],
    playground: {
      starter: `const animal = { kind: "animal" };
const dog = Object.create(animal);
console.log(animal.isPrototypeOf(dog));`,
      goal: "Use isPrototypeOf to confirm that animal is in dog’s prototype chain.",
    },
    quiz: [
      { id: "is-prototype-of-q1", question: "Which call checks whether proto is in value's chain?", options: ["value.isPrototypeOf(proto)", "proto.isPrototypeOf(value)", "Object.isPrototype(proto, value)", "proto.prototypeOf(value)"], answer: 1, explanation: "The possible prototype is the receiver and the checked object is the argument." },
      { id: "is-prototype-of-q2", question: "Does isPrototypeOf check only the immediate prototype?", options: ["Yes", "No, it walks the chain", "Only for arrays", "Only for classes"], answer: 1, explanation: "It returns true for any ancestor in the prototype chain." },
      { id: "is-prototype-of-q3", question: "What does a true result establish?", options: ["The argument owns every receiver property", "The receiver is in the argument's prototype chain", "The argument is frozen", "The receiver is a constructor"], answer: 1, explanation: "It establishes a prototype relationship, not ownership or mutability." },
    ],
    lab: {
      title: "Check a prototype object",
      brief: "Create base with kind 'base', child using Object.create(base), and use base.isPrototypeOf(child).",
      starter: `const base = { kind: "base" };
const child = Object.create(base);
`,
      hint: "Call the method on base and pass child as its argument.",
      checks: [
        { id: "is-prototype-of-l1", description: "base is in child's chain", expression: "base.isPrototypeOf(child)" },
        { id: "is-prototype-of-l2", description: "child does not become base", expression: "child !== base" },
      ],
    },
  },
  {
    slug: "has-own-property",
    title: "hasOwnProperty",
    sectionId: "object-utilities",
    minutes: 7,
    level: "beginner",
    summary: "hasOwnProperty reports whether a property belongs directly to an object rather than being inherited.",
    remember: [
      "obj.hasOwnProperty(key) checks own property ownership.",
      "Inherited properties return false.",
      "An object can shadow or lack the hasOwnProperty method.",
      "Object.hasOwn is the safer modern alternative.",
    ],
    theory: [
      { heading: "Own versus inherited", body: "An own property is stored on the object itself. A property found through its prototype chain is accessible but not owned by that object." },
      { heading: "The method is replaceable", body: "Because hasOwnProperty is an ordinary inherited method, an object may define a property with that name or have a null prototype. Calling the method through Object.prototype avoids those hazards." },
      { heading: "Use for data boundaries", body: "Ownership checks are useful when iterating records or accepting option objects and only direct keys should count." },
    ],
    analogy: "hasOwnProperty checks whether a book is on your own shelf, rather than merely available in the library you can reach.",
    example: {
      title: "Own and inherited keys",
      code: `const defaults = { color: "blue" };
const settings = Object.create(defaults);
settings.size = "large";
console.log(settings.hasOwnProperty("size"), settings.hasOwnProperty("color"));`,
      output: "true false",
    },
    extraExample: {
      title: "Safe call on a shadowed name",
      code: `const record = { hasOwnProperty: "data", id: 7 };
console.log(Object.prototype.hasOwnProperty.call(record, "id"));`,
      output: "true",
    },
    pitfalls: [
      "Treating an inherited property as if it were owned.",
      "Calling obj.hasOwnProperty when input data may shadow that name or have a null prototype.",
      "Using ownership checks when the requirement is actually to include inherited behavior.",
    ],
    playground: {
      starter: `const defaults = { theme: "light" };
const preferences = Object.create(defaults);
preferences.fontSize = 16;
console.log(preferences.hasOwnProperty("fontSize"));`,
      goal: "Log true for the own fontSize key and false for inherited theme.",
    },
    quiz: [
      { id: "has-own-property-q1", question: "What does hasOwnProperty('x') return true for?", options: ["Only an inherited x", "An own x property", "Any method named x anywhere", "A frozen x"], answer: 1, explanation: "The method distinguishes direct ownership from prototype lookup." },
      { id: "has-own-property-q2", question: "Why can obj.hasOwnProperty be unsafe on arbitrary input?", options: ["It may be shadowed or absent", "It always mutates obj", "It only works on arrays", "It freezes obj"], answer: 0, explanation: "Input objects may define their own hasOwnProperty or have no Object.prototype." },
      { id: "has-own-property-q3", question: "What modern utility replaces the common pattern?", options: ["Object.hasOwn(obj, key)", "Object.owns(obj, key)", "Object.property(obj, key)", "Object.direct(obj, key)"], answer: 0, explanation: "Object.hasOwn directly performs the ownership check safely." },
    ],
    lab: {
      title: "Separate own settings",
      brief: "Create defaults with theme, preferences inheriting defaults, and an own fontSize. Check ownership with hasOwnProperty.",
      starter: `const defaults = { theme: "light" };
const preferences = Object.create(defaults);
preferences.fontSize = 16;
`,
      hint: "Call preferences.hasOwnProperty for each key.",
      checks: [
        { id: "has-own-property-l1", description: "fontSize is own", expression: "preferences.hasOwnProperty('fontSize')" },
        { id: "has-own-property-l2", description: "theme is inherited", expression: "!preferences.hasOwnProperty('theme')" },
        { id: "has-own-property-l3", description: "theme remains readable", expression: "preferences.theme === 'light'" },
      ],
    },
  },
  {
    slug: "object-has-own",
    title: "Object.hasOwn",
    sectionId: "object-utilities",
    minutes: 7,
    level: "beginner",
    summary: "Object.hasOwn is the modern, safe way to ask whether a value directly owns a property.",
    remember: [
      "Call Object.hasOwn(object, key).",
      "It does not depend on the object's own hasOwnProperty member.",
      "It returns false for inherited properties.",
      "It is clearer when processing unknown record-like input.",
    ],
    theory: [
      { heading: "A static utility", body: "Object.hasOwn takes the object and property key as arguments, avoiding a method lookup on potentially untrusted data." },
      { heading: "Safe for unusual objects", body: "It works when an object shadows hasOwnProperty and when an object was created with Object.create(null), provided the first argument is a valid object." },
      { heading: "Same ownership question", body: "Object.hasOwn does not search the prototype chain. If inherited availability matters, use in or a deliberate prototype check instead." },
    ],
    analogy: "Object.hasOwn is a clerk with a master checklist: it verifies the object's own inventory without asking the object to provide the inspection tool.",
    example: {
      title: "Inspect record keys safely",
      code: `const record = Object.create(null);
record.id = 3;
console.log(Object.hasOwn(record, "id"), Object.hasOwn(record, "toString"));`,
      output: "true false",
    },
    extraExample: {
      title: "Ignore inherited defaults",
      code: `const defaults = { mode: "safe" };
const options = Object.create(defaults);
options.debug = true;
console.log(Object.hasOwn(options, "debug"), Object.hasOwn(options, "mode"));`,
      output: "true false",
    },
    pitfalls: [
      "Confusing Object.hasOwn with the in operator, which includes inherited properties.",
      "Passing a primitive and expecting it to behave like a normal record object.",
      "Using Object.hasOwn to test whether a property value is truthy rather than whether the key exists.",
    ],
    playground: {
      starter: `const input = Object.create(null);
input.name = "Ada";
console.log(Object.hasOwn(input, "name"));`,
      goal: "Use Object.hasOwn to check both the own name key and a missing age key.",
    },
    quiz: [
      { id: "object-has-own-q1", question: "What is the argument order for Object.hasOwn?", options: ["key, object", "object, key", "prototype, object", "object only"], answer: 1, explanation: "The static method receives the value first and property key second." },
      { id: "object-has-own-q2", question: "What does Object.hasOwn ignore?", options: ["Own properties", "Inherited properties", "String keys", "Numeric keys"], answer: 1, explanation: "It returns true only for direct properties." },
      { id: "object-has-own-q3", question: "Why is it safer than obj.hasOwnProperty(key)?", options: ["It cannot be shadowed by obj data", "It checks values automatically", "It searches prototypes", "It freezes the object"], answer: 0, explanation: "The utility does not rely on a method stored on the input object." },
    ],
    lab: {
      title: "Check safe input keys",
      brief: "Create input with null prototype and own name. Use Object.hasOwn to distinguish name from inherited-looking toString.",
      starter: `const input = Object.create(null);
input.name = "Ada";
`,
      hint: "Object.hasOwn works even though input has no hasOwnProperty method.",
      checks: [
        { id: "object-has-own-l1", description: "name is own", expression: "Object.hasOwn(input, 'name')" },
        { id: "object-has-own-l2", description: "missing age is absent", expression: "!Object.hasOwn(input, 'age')" },
        { id: "object-has-own-l3", description: "null-prototype input has no inherited key", expression: "!Object.hasOwn(input, 'toString')" },
      ],
    },
  },
  {
    slug: "object-freeze",
    title: "Object.freeze",
    sectionId: "object-utilities",
    minutes: 8,
    level: "intermediate",
    summary: "Object.freeze prevents an object's own properties from being added, removed, or reconfigured, and makes data properties non-writable.",
    remember: [
      "Object.freeze returns the same object.",
      "Freeze is shallow; nested objects remain mutable unless frozen separately.",
      "Frozen objects cannot gain or lose own properties.",
      "Strict-mode writes to frozen properties throw instead of silently failing.",
    ],
    theory: [
      { heading: "Strongest ordinary lock", body: "Freezing makes own data properties non-writable and non-configurable and prevents extensions. Existing nested objects are separate values and are not automatically frozen." },
      { heading: "Identity remains", body: "The operation changes the object's descriptors in place and returns that same reference. It does not create an immutable copy." },
      { heading: "Shallow boundary", body: "Object.freeze({ settings: { dark: true } }) protects the settings reference but not the inner settings object. Deep immutability requires a deliberate recursive strategy." },
    ],
    analogy: "Freezing is sealing a display case shut: the case cannot be changed from outside, but a smaller box inside would need its own lock.",
    example: {
      title: "Freeze configuration",
      code: `const config = Object.freeze({ mode: "safe" });
console.log(Object.isFrozen(config), config.mode);
console.log(Reflect.set(config, "mode", "fast"), config.mode);`,
      output: "true safe\nfalse safe",
    },
    extraExample: {
      title: "Freeze is shallow",
      code: `const state = Object.freeze({ user: { name: "Ada" } });
state.user.name = "Grace";
console.log(state.user.name, Object.isFrozen(state.user));`,
      output: "Grace false",
    },
    pitfalls: [
      "Expecting Object.freeze to recursively freeze nested objects.",
      "Ignoring strict-mode behavior when code writes to a frozen property.",
      "Believing freeze clones the object or prevents mutation of referenced external objects.",
    ],
    playground: {
      starter: `const settings = { theme: "dark" };
Object.freeze(settings);
console.log(Object.isFrozen(settings), Reflect.set(settings, "theme", "light"));`,
      goal: "Freeze settings and use the result to show that the attempted write fails and theme stays dark.",
    },
    quiz: [
      { id: "object-freeze-q1", question: "What does Object.freeze prevent for own data properties?", options: ["Reads", "Writes and reconfiguration", "All nested reads", "Function calls"], answer: 1, explanation: "Freeze makes own data properties non-writable and non-configurable and prevents extensions." },
      { id: "object-freeze-q2", question: "Is Object.freeze deep?", options: ["Yes, always", "No, it is shallow", "Only for arrays", "Only in strict mode"], answer: 1, explanation: "Nested objects must be frozen separately if that is desired." },
      { id: "object-freeze-q3", question: "What does Object.freeze(obj) return?", options: ["A deep clone", "The same object", "A descriptor map", "A boolean only"], answer: 1, explanation: "The object is modified in place and returned." },
    ],
    lab: {
      title: "Freeze app settings",
      brief: "Create settings with mode 'dark', freeze it, and verify it is frozen and cannot be changed through Reflect.set.",
      starter: `const settings = { mode: "dark" };
// Freeze settings.
`,
      hint: "Object.freeze(settings) and Reflect.set(settings, 'mode', 'light') make a safe, non-throwing check.",
      checks: [
        { id: "object-freeze-l1", description: "settings is frozen", expression: "Object.isFrozen(settings)" },
        { id: "object-freeze-l2", description: "mode cannot be changed", expression: "Reflect.set(settings, 'mode', 'light') === false" },
        { id: "object-freeze-l3", description: "mode remains dark", expression: "settings.mode === 'dark'" },
      ],
    },
  },
  {
    slug: "object-seal",
    title: "Object.seal",
    sectionId: "object-utilities",
    minutes: 8,
    level: "intermediate",
    summary: "Object.seal prevents adding, deleting, or reconfiguring own properties while still allowing writable data values to change.",
    remember: [
      "Sealed objects are non-extensible.",
      "Own properties become non-configurable.",
      "Writable data properties can still be assigned new values.",
      "Seal is shallow just like freeze.",
    ],
    theory: [
      { heading: "Closed shape", body: "Sealing locks the set of own keys and their configurability. It is useful when an object's shape should stay stable but its existing values may change." },
      { heading: "Seal versus freeze", body: "Freeze also makes writable data properties non-writable. Seal leaves writable flags unchanged, so existing values can still be updated." },
      { heading: "Deletion is reconfiguration", body: "Deleting an own property changes the object's shape, so it fails on a sealed object. Use Reflect.deleteProperty for a boolean result." },
    ],
    analogy: "Sealing is closing a form's list of fields: no fields can be added or removed, but the values in existing fields can still be edited.",
    example: {
      title: "Seal a session",
      code: `const session = Object.seal({ user: "Ada", active: true });
session.active = false;
console.log(session.active, Reflect.set(session, "role", "admin"), Reflect.deleteProperty(session, "user"));`,
      output: "false false false",
    },
    extraExample: {
      title: "Inspect sealed descriptors",
      code: `const book = Object.seal({ title: "OOP" });
const descriptor = Object.getOwnPropertyDescriptor(book, "title");
console.log(Object.isSealed(book), descriptor.writable, descriptor.configurable);`,
      output: "true true false",
    },
    pitfalls: [
      "Assuming seal prevents changing existing writable values.",
      "Expecting seal to protect nested objects.",
      "Using delete and relying on a thrown error instead of checking behavior with Reflect.deleteProperty.",
    ],
    playground: {
      starter: `const user = { name: "Ada" };
Object.seal(user);
user.name = "Grace";
console.log(user.name, Object.isSealed(user));`,
      goal: "Keep the object sealed while allowing the existing name value to change.",
    },
    quiz: [
      { id: "object-seal-q1", question: "Can a writable property on a sealed object change?", options: ["Yes", "No, never", "Only when nested", "Only after freeze"], answer: 0, explanation: "Seal leaves existing writable flags unchanged." },
      { id: "object-seal-q2", question: "What does sealing prevent?", options: ["Adding and deleting own properties", "Reading values", "Calling methods", "Changing every nested value"], answer: 0, explanation: "A sealed object's own shape cannot be extended or reduced." },
      { id: "object-seal-q3", question: "Which flag becomes false for an own property after sealing?", options: ["writable", "enumerable", "configurable", "callable"], answer: 2, explanation: "Sealing makes own properties non-configurable but does not necessarily make them non-writable." },
    ],
    lab: {
      title: "Seal a profile",
      brief: "Create profile with name and role, seal it, allow name to change, and reject adding a new active key.",
      starter: `const profile = { name: "Ada", role: "engineer" };
// Seal profile and update name.
`,
      hint: "Object.seal(profile) still permits profile.name = 'Grace'; Reflect.set can test a new key.",
      checks: [
        { id: "object-seal-l1", description: "profile is sealed", expression: "Object.isSealed(profile)" },
        { id: "object-seal-l2", description: "existing name can change", expression: "profile.name === 'Grace'" },
        { id: "object-seal-l3", description: "new keys are rejected", expression: "Reflect.set(profile, 'active', true) === false && !Object.hasOwn(profile, 'active')" },
      ],
    },
  },
  {
    slug: "object-prevent-extensions",
    title: "Object.preventExtensions",
    sectionId: "object-utilities",
    minutes: 8,
    level: "beginner",
    summary: "Object.preventExtensions stops new own properties while leaving existing properties generally writable and configurable.",
    remember: [
      "Preventing extensions only blocks new own keys.",
      "Existing writable values can still change.",
      "Existing properties can usually still be deleted or reconfigured.",
      "Object.isExtensible reports whether new own properties are allowed.",
    ],
    theory: [
      { heading: "A smaller boundary", body: "preventExtensions changes only the extensibility status. It does not automatically alter the descriptors of properties already present." },
      { heading: "Compare the three levels", body: "Prevent extensions blocks additions; seal also blocks deletion and reconfiguration; freeze additionally blocks writes to data properties." },
      { heading: "Useful for stable schemas", body: "This utility can catch accidental additions while preserving normal updates to known fields, though strict-mode assignments to new keys can throw." },
    ],
    analogy: "Preventing extensions is closing registration for new rooms: existing rooms may still be remodeled or removed, but no new room can be added.",
    example: {
      title: "Block accidental additions",
      code: `const point = Object.preventExtensions({ x: 1 });
point.x = 2;
console.log(point.x, Reflect.set(point, "y", 3), Object.isExtensible(point));`,
      output: "2 false false",
    },
    extraExample: {
      title: "Existing keys remain configurable",
      code: `const record = Object.preventExtensions({ id: 1, temporary: true });
delete record.temporary;
console.log(Object.hasOwn(record, "temporary"), record.id);`,
      output: "false 1",
    },
    pitfalls: [
      "Expecting preventExtensions to freeze existing values.",
      "Assuming it blocks deletion of existing properties.",
      "Using a normal assignment to test a new key in strict code and overlooking the thrown TypeError.",
    ],
    playground: {
      starter: `const point = { x: 1 };
Object.preventExtensions(point);
console.log(Object.isExtensible(point), Reflect.set(point, "y", 2));`,
      goal: "Prevent extensions and show that x can still change while adding y returns false.",
    },
    quiz: [
      { id: "object-prevent-extensions-q1", question: "What does Object.preventExtensions block?", options: ["New own properties", "All writes", "All deletes", "All reads"], answer: 0, explanation: "It prevents the object from gaining new own properties." },
      { id: "object-prevent-extensions-q2", question: "Can an existing writable property change?", options: ["Yes", "No", "Only on arrays", "Only through a getter"], answer: 0, explanation: "Existing property descriptors are not automatically made read-only." },
      { id: "object-prevent-extensions-q3", question: "Which method reports the extensibility state?", options: ["Object.isExtensible", "Object.isExpandable", "Object.canAdd", "Object.hasNew"], answer: 0, explanation: "Object.isExtensible returns whether new own properties can be added." },
    ],
    lab: {
      title: "Keep a point schema",
      brief: "Create point with x and y, prevent extensions, update x, and ensure a new z property cannot be added.",
      starter: `const point = { x: 1, y: 2 };
// Prevent extensions and update x.
`,
      hint: "Use Object.preventExtensions(point), then point.x = 4. Use Reflect.set for the new key check.",
      checks: [
        { id: "object-prevent-extensions-l1", description: "point cannot be extended", expression: "!Object.isExtensible(point)" },
        { id: "object-prevent-extensions-l2", description: "existing x can change", expression: "point.x === 4" },
        { id: "object-prevent-extensions-l3", description: "z cannot be added", expression: "Reflect.set(point, 'z', 3) === false && !Object.hasOwn(point, 'z')" },
      ],
    },
  },
];
