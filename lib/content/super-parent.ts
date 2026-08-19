import type { Topic } from "../types";

export const superParentTopics: Topic[] = [
  {
    slug: "super-call",
    title: "Calling super",
    sectionId: "super-parent",
    minutes: 7,
    level: "beginner",
    summary: "In a derived constructor, super() calls the parent constructor and initializes the child so it can use this.",
    remember: [
      "A derived constructor must call super() before using this.",
      "Arguments passed to super() become the parent constructor's arguments.",
      "The parent constructor can initialize inherited state.",
      "A child constructor can add its own initialization after super().",
    ],
    theory: [
      { heading: "Derived construction", body: "A class that extends another class is derived. Its constructor does not receive a usable this automatically; super() asks the parent constructor to create and initialize that part." },
      { heading: "Argument forwarding", body: "super(name, age) invokes the parent constructor with those values. The parent decides how to store or validate them." },
      { heading: "Order is required", body: "JavaScript throws a ReferenceError if a derived constructor reads or assigns this before super(). This order prevents an uninitialized child object from being used." },
    ],
    analogy: "Calling super is checking in with the family workshop first: the parent builds the shared frame before the child adds its custom features.",
    example: {
      title: "Initialize parent and child state",
      code: `class Person {
  constructor(name) {
    this.name = name;
  }
}
class Student extends Person {
  constructor(name, subject) {
    super(name);
    this.subject = subject;
  }
}
const student = new Student("Ada", "math");
console.log(student.name, student.subject);`,
      output: "Ada math",
    },
    extraExample: {
      title: "Forward several arguments",
      code: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class LabeledPoint extends Point {
  constructor(x, y, label) {
    super(x, y);
    this.label = label;
  }
}
const point = new LabeledPoint(2, 3, "A");
console.log(point.x + point.y, point.label);`,
      output: "5 A",
    },
    pitfalls: [
      "Using this in a derived constructor before calling super().",
      "Forgetting to forward constructor arguments that the parent needs.",
      "Calling super() more than once in the same constructor.",
    ],
    playground: {
      starter: `class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    // Call the parent, then store breed.
  }
}
console.log(new Dog("Rex", "collie").name);`,
      goal: "Call super(name), store breed, and keep the inherited name available.",
    },
    quiz: [
      { id: "super-call-q1", question: "What does super() do in a derived constructor?", options: ["Calls the parent constructor", "Creates a private field", "Calls every child method", "Freezes this"], answer: 0, explanation: "super() invokes the parent constructor for the derived instance." },
      { id: "super-call-q2", question: "When may a derived constructor use this?", options: ["Before super()", "After super()", "Only outside the class", "Never"], answer: 1, explanation: "The parent initialization must happen before this is used." },
      { id: "super-call-q3", question: "How do you pass name to a parent constructor?", options: ["super.name", "super(name)", "parent(name)", "this.super(name)"], answer: 1, explanation: "Arguments inside super(...) are forwarded to the parent constructor." },
    ],
    lab: {
      title: "Extend a person",
      brief: "Create Person(name) and Employee extends Person with constructor(name, role) that calls super(name) and stores role.",
      starter: `class Person {
  // constructor(name)
}
class Employee extends Person {
  // constructor(name, role)
}`,
      hint: "Use super(name) before this.role = role.",
      checks: [
        { id: "super-call-l1", description: "parent state is initialized", expression: "new Employee('Mina', 'Designer').name === 'Mina'" },
        { id: "super-call-l2", description: "child state is initialized", expression: "new Employee('Mina', 'Designer').role === 'Designer'" },
      ],
    },
  },
  {
    slug: "super-method",
    title: "Calling a parent method",
    sectionId: "super-parent",
    minutes: 8,
    level: "beginner",
    summary: "Inside a child method, super.method() calls the parent prototype method, allowing the child to extend its result or behavior.",
    remember: [
      "super.method() starts lookup on the parent prototype.",
      "The parent method receives the current child instance as this.",
      "A child can add behavior before or after the parent call.",
      "super is not a normal object variable to pass around.",
    ],
    theory: [
      { heading: "Reuse before override", body: "Overriding replaces the method found for the child, but super.method() lets the override deliberately reuse the parent implementation." },
      { heading: "Current receiver", body: "When a child calls super.describe(), the parent method's this is still the child instance. It can read inherited and child state." },
      { heading: "Avoid duplicate logic", body: "A parent method call is useful when the child behavior is an extension. If the contract is fundamentally different, a completely separate implementation may be clearer." },
    ],
    analogy: "Calling a parent method is asking an experienced teammate to do the standard part, then adding your specialist note to the result.",
    example: {
      title: "Extend a greeting",
      code: `class Greeter {
  greet() {
    return "Hello";
  }
}
class FriendlyGreeter extends Greeter {
  greet() {
    return super.greet() + ", friend!";
  }
}
console.log(new FriendlyGreeter().greet());`,
      output: "Hello, friend!",
    },
    extraExample: {
      title: "Parent method sees child state",
      code: `class Item {
  describe() {
    return this.name;
  }
}
class Book extends Item {
  constructor(name, pages) {
    super();
    this.name = name;
    this.pages = pages;
  }
  describe() {
    return super.describe() + " (" + this.pages + " pages)";
  }
}
console.log(new Book("Guide", 80).describe());`,
      output: "Guide (80 pages)",
    },
    pitfalls: [
      "Writing super.greet instead of calling super.greet().",
      "Calling super.method() when the parent does not define that method.",
      "Assuming super.method() changes this to a parent instance; it keeps the current receiver.",
    ],
    playground: {
      starter: `class Logger {
  message() {
    return "base";
  }
}
class TaggedLogger extends Logger {
  message() {
    // Extend the parent message.
  }
}
console.log(new TaggedLogger().message());`,
      goal: "Return the parent result followed by ' tagged'.",
    },
    quiz: [
      { id: "super-method-q1", question: "Which expression calls a parent method?", options: ["super.method()", "parent.method()", "this.super.method()", "super->method()"], answer: 0, explanation: "The super.method() syntax invokes the method on the parent prototype." },
      { id: "super-method-q2", question: "What is this inside the parent method when called by a child?", options: ["Always a new parent object", "The current child instance", "undefined", "The class constructor"], answer: 1, explanation: "The receiver remains the child instance, so the parent can access its state." },
      { id: "super-method-q3", question: "Why call a parent method from an override?", options: ["To reuse shared behavior", "To skip all constructors", "To make the method private", "To change the class name"], answer: 0, explanation: "The child can extend the parent implementation instead of duplicating it." },
    ],
    lab: {
      title: "Extend a status message",
      brief: "Create Status.message() returning 'ready'. StatusWithName extends Status and overrides message() with super.message() + ': ' + this.name.",
      starter: `class Status {
  // message()
}
class StatusWithName extends Status {
  // constructor(name), message()
}`,
      hint: "Call super() in the constructor and super.message() in the override.",
      checks: [
        { id: "super-method-l1", description: "the parent message is reused", expression: "new StatusWithName('API').message() === 'ready: API'" },
        { id: "super-method-l2", description: "the child is still a Status", expression: "new StatusWithName('API') instanceof Status" },
      ],
    },
  },
  {
    slug: "parent-constructor",
    title: "Designing a parent constructor",
    sectionId: "super-parent",
    minutes: 8,
    level: "intermediate",
    summary: "A parent constructor establishes invariants and shared state so every derived class starts from a valid foundation.",
    remember: [
      "Put shared initialization in the parent constructor.",
      "Validate required parent data at the boundary.",
      "Child constructors pass parent data with super(...).",
      "Keep parent construction focused on parent responsibilities.",
    ],
    theory: [
      { heading: "The shared foundation", body: "If every account needs an id and every vehicle needs a make, the parent constructor is the natural place to establish those fields." },
      { heading: "Constructor contracts", body: "A parent constructor's parameters are part of the contract that child constructors must understand. Clear parameter order or an options object reduces mistakes." },
      { heading: "Validate once", body: "Validating a shared invariant in the parent avoids repeating the same check across every child class." },
    ],
    analogy: "A parent constructor is the foundation crew: every specialized building begins with the same level, stable base.",
    example: {
      title: "Validate shared identity",
      code: `class Entity {
  constructor(id) {
    if (!id) throw new Error("id required");
    this.id = id;
  }
}
class UserEntity extends Entity {
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}
console.log(new UserEntity("u1", "Ada").id);`,
      output: "u1",
    },
    extraExample: {
      title: "Parent options",
      code: `class Vehicle {
  constructor({ make, wheels }) {
    this.make = make;
    this.wheels = wheels;
  }
}
class Bicycle extends Vehicle {
  constructor(make) {
    super({ make, wheels: 2 });
  }
}
console.log(new Bicycle("Raleigh").wheels);`,
      output: "2",
    },
    pitfalls: [
      "Duplicating parent initialization in every child instead of using super().",
      "Passing child-only data to a parent that does not expect it and assuming it will be stored.",
      "Letting invalid shared state through because only one child validates it.",
    ],
    playground: {
      starter: `class Product {
  // constructor(sku) validates and stores sku
}
class BookProduct extends Product {
  constructor(sku, title) {
    // Initialize the parent and title.
  }
}
console.log(new BookProduct("B-1", "OOP").sku);`,
      goal: "Make the parent require a truthy sku and let BookProduct initialize its title after super(sku).",
    },
    quiz: [
      { id: "parent-constructor-q1", question: "What belongs in a parent constructor?", options: ["Shared valid state", "Only child-specific fields", "Quiz answers", "Unrelated global mutations"], answer: 0, explanation: "The parent should establish state and invariants common to the family." },
      { id: "parent-constructor-q2", question: "How should a child initialize parent state?", options: ["super(parentArgs)", "new Parent(parentArgs) inside this", "Parent.init only", "Object.parent"], answer: 0, explanation: "super(...) invokes the parent constructor for the same derived instance." },
      { id: "parent-constructor-q3", question: "Why validate in the parent?", options: ["Every child gets the shared invariant", "It prevents methods", "It makes all fields private", "It skips object creation"], answer: 0, explanation: "Central validation prevents each subclass from implementing the same rule inconsistently." },
    ],
    lab: {
      title: "Initialize a catalog item",
      brief: "Create CatalogItem(code) rejecting an empty code, then BookItem extends CatalogItem and adds title after calling super(code).",
      starter: `class CatalogItem {
  // constructor(code)
}
class BookItem extends CatalogItem {
  // constructor(code, title)
}`,
      hint: "Throw Error when code is falsy, then assign this.code and this.title.",
      checks: [
        { id: "parent-constructor-l1", description: "shared code is initialized", expression: "new BookItem('BK1', 'Patterns').code === 'BK1'" },
        { id: "parent-constructor-l2", description: "child title is initialized", expression: "new BookItem('BK1', 'Patterns').title === 'Patterns'" },
        { id: "parent-constructor-l3", description: "invalid shared code is rejected", expression: "(() => { try { new BookItem('', 'Patterns'); return false; } catch (error) { return true; } })()" },
      ],
    },
  },
  {
    slug: "parent-method",
    title: "Designing a parent method",
    sectionId: "super-parent",
    minutes: 8,
    level: "intermediate",
    summary: "A parent method defines behavior shared by a family and can serve as a reusable step that child methods extend with super.method().",
    remember: [
      "Parent methods live on the parent prototype when declared in a class.",
      "A child inherits a parent method until it overrides it.",
      "super.method() preserves shared behavior during an override.",
      "Keep a parent method general enough for all valid children.",
    ],
    theory: [
      { heading: "Prototype lookup", body: "When an instance does not have a method as an own property, lookup proceeds through its prototype chain. A derived class prototype links to the parent prototype." },
      { heading: "Template steps", body: "A parent method can implement a stable step, such as formatting a name. A child can call it and add a specialized suffix or action." },
      { heading: "Correct level of generality", body: "A parent method should express behavior shared by all children. If it needs many child-type conditionals, the abstraction may be in the wrong place." },
    ],
    analogy: "A parent method is a standard recipe step shared by every cook; a child recipe can follow it and add its own seasoning.",
    example: {
      title: "Shared conversion behavior",
      code: `class Unit {
  constructor(value) {
    this.value = value;
  }
  label() {
    return String(this.value);
  }
}
class Meters extends Unit {
  label() {
    return super.label() + " m";
  }
}
console.log(new Meters(12).label());`,
      output: "12 m",
    },
    extraExample: {
      title: "Inherit without overriding",
      code: `class Worker {
  start() {
    return "started";
  }
}
class Designer extends Worker {}
console.log(new Designer().start());`,
      output: "started",
    },
    pitfalls: [
      "Overriding a parent method with an incompatible return meaning.",
      "Copying parent logic into every child and allowing the copies to drift.",
      "Calling a parent method name that was renamed or removed.",
    ],
    playground: {
      starter: `class ShapeName {
  name() {
    return "shape";
  }
}
class CircleName extends ShapeName {
  // Override name using the parent result.
}
console.log(new CircleName().name());`,
      goal: "Return 'shape circle' by calling super.name() and adding the child-specific word.",
    },
    quiz: [
      { id: "parent-method-q1", question: "Where are class methods normally stored?", options: ["On each instance only", "On the class prototype", "In localStorage", "On JSON.prototype"], answer: 1, explanation: "Methods declared in a class are placed on its prototype." },
      { id: "parent-method-q2", question: "What happens when a child does not override a parent method?", options: ["The child inherits it", "The method becomes private", "The class cannot be constructed", "The method becomes static"], answer: 0, explanation: "Prototype lookup finds the inherited method." },
      { id: "parent-method-q3", question: "What is a sign a parent method is too specific?", options: ["It works for every child", "It needs many child-type conditionals", "It returns a string", "It is inherited"], answer: 1, explanation: "Many type-specific branches can indicate the behavior belongs in subclasses or collaborators." },
    ],
    lab: {
      title: "Extend a parent label",
      brief: "Create Item.label() returning 'item'. Create Book extends Item and override label() to return 'item: book' with super.label().",
      starter: `class Item {
  // label()
}
class Book extends Item {
  // label() using super
}`,
      hint: "Return super.label() + ': book'.",
      checks: [
        { id: "parent-method-l1", description: "Book extends the parent label", expression: "new Book().label() === 'item: book'" },
        { id: "parent-method-l2", description: "Book inherits from Item", expression: "new Book() instanceof Item" },
      ],
    },
  },
  {
    slug: "constructor-initialization",
    title: "Constructor initialization order",
    sectionId: "super-parent",
    minutes: 10,
    level: "advanced",
    summary: "Class construction follows an order: parent initialization, derived field initialization, and derived constructor statements; understanding it prevents overwritten state.",
    remember: [
      "Base construction runs before the derived constructor body continues.",
      "Derived instance fields initialize after super() and before the rest of the child constructor body.",
      "A child field initializer can overwrite a value set by the parent.",
      "Explicit assignments in the child constructor run after field initializers.",
    ],
    theory: [
      { heading: "The important sequence", body: "For a derived instance, super() runs the parent constructor. After it returns, declared child instance fields initialize, then the remaining child constructor statements execute." },
      { heading: "Initialization collisions", body: "If a parent constructor calls an overridable method, that method may observe child fields before their initializers have run. Prefer simple parent initialization over calling child-overridable behavior." },
      { heading: "Make order visible", body: "Small logging experiments can reveal the sequence. Usually, keep constructors responsible for state setup and avoid relying on subtle cross-class side effects." },
    ],
    analogy: "Construction is an assembly line: the frame is built first, the standard parts are fitted next, and the final custom adjustments happen last.",
    example: {
      title: "Field initialization after super",
      code: `class Base {
  constructor() {
    this.log = ["base constructor"];
  }
}
class Child extends Base {
  status = "field initialized";
  constructor() {
    super();
    this.log.push(this.status);
  }
}
console.log(new Child().log);`,
      output: "[ 'base constructor', 'field initialized' ]",
    },
    extraExample: {
      title: "Constructor statements come last",
      code: `class Base {
  constructor() {
    this.steps = ["parent"];
  }
}
class Child extends Base {
  value = 2;
  constructor() {
    super();
    this.value += 3;
    this.steps.push("child " + this.value);
  }
}
console.log(new Child().steps);`,
      output: "[ 'parent', 'child 5' ]",
    },
    pitfalls: [
      "Using this in a derived constructor before super().",
      "Assuming child fields exist while the parent constructor is still running.",
      "Calling an overridable child method from the parent constructor and reading not-yet-initialized child state.",
    ],
    playground: {
      starter: `class Base {
  constructor() {
    this.events = ["base"];
  }
}
class Child extends Base {
  label = "child";
  constructor() {
    // Finish initialization and log the order.
  }
}
console.log(new Child().events);`,
      goal: "Call super(), then push the initialized label so the output is ['base', 'child'].",
    },
    quiz: [
      { id: "constructor-initialization-q1", question: "When do derived instance fields initialize?", options: ["Before super()", "After super() and before the remaining child body", "Only after the object is frozen", "Before the parent constructor"], answer: 1, explanation: "Derived fields are initialized after the parent constructor returns and before later child statements." },
      { id: "constructor-initialization-q2", question: "What can overwrite a parent-assigned value?", options: ["A child field initializer", "A comment", "Object.keys only", "The class name"], answer: 0, explanation: "Child field initialization can assign the same property again." },
      { id: "constructor-initialization-q3", question: "Why avoid overridable calls in a parent constructor?", options: ["Child state may not be initialized yet", "Methods cannot return strings", "super becomes private", "It disables inheritance"], answer: 0, explanation: "The child portion of the object is still being initialized while the parent constructor runs." },
    ],
    lab: {
      title: "Record construction order",
      brief: "Create Base with events ['base'], then Child extends Base with label field 'child'. Its constructor calls super() and pushes label.",
      starter: `class Base {
  // events starts with 'base'
}
class Child extends Base {
  // label field and constructor
}`,
      hint: "Declare label = 'child'; then call super() before this.events.push(this.label).",
      checks: [
        { id: "constructor-initialization-l1", description: "base initializes first", expression: "new Child().events[0] === 'base'" },
        { id: "constructor-initialization-l2", description: "child field is available after super", expression: "new Child().events[1] === 'child'" },
        { id: "constructor-initialization-l3", description: "the complete order is recorded", expression: "JSON.stringify(new Child().events) === '[\"base\",\"child\"]'" },
      ],
    },
  },
];
