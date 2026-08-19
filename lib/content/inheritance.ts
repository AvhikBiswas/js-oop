import type { Topic } from "../types";

export const inheritanceTopics: Topic[] = [
  {
    slug: "single-inheritance",
    title: "Single inheritance with extends",
    sectionId: "inheritance",
    minutes: 8,
    level: "beginner",
    summary: "Single inheritance gives one child class behavior from one parent class. The child can reuse inherited methods and add or override behavior for its specialized role.",
    remember: ["One child, one parent.", "extends builds the link.", "super initializes parent state.", "Reuse before duplication."],
    theory: [
      { heading: "The child is a specialized parent", body: "class Car extends Vehicle creates a prototype relationship and lets Car instances pass instanceof Vehicle. The child receives inherited methods through its prototype chain." },
      { heading: "super starts parent work", body: "A derived constructor must call super before it can use this. super(args) runs the parent constructor with the new child instance as its receiver, so common initialization can remain in the parent." },
      { heading: "Add only the difference", body: "A useful child class keeps the parent's contract and contributes specialized state or methods. Inheritance becomes brittle when a child copies most of the parent or inherits behavior it does not logically represent." },
    ],
    analogy: "Single inheritance is an apprentice learning one craft from one mentor, then adding a specialty.",
    example: {
      title: "Vehicle and car",
      code: `class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  move() {
    return this.brand + " moves";
  }
}
class Car extends Vehicle {
  honk() {
    return this.brand + " honks";
  }
}
const car = new Car("Toyota");
console.log(car.move(), car.honk(), car instanceof Vehicle);`,
      output: `Toyota moves Toyota honks true`,
    },
    extraExample: {
      title: "Parent initialization",
      code: `class Person {
  constructor(name) {
    this.name = name;
  }
}
class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
const student = new Student("Ivy", 5);
console.log(student.name, student.grade);`,
      output: `Ivy 5`,
    },
    pitfalls: ["Using this in a derived constructor before calling super.", "Duplicating parent initialization instead of calling super.", "Extending a class only to reuse an unrelated utility method."],
    playground: {
      starter: `class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return this.name + " eats";
  }
}
class Dog extends Animal {
  bark() {
    return this.name + " barks";
  }
}
console.log(new Dog("Rex").eat());`,
      goal: "Log both inherited eat() and Dog's bark() for the same instance.",
    },
    quiz: [
      { id: "single-inheritance-1", question: "What does class Car extends Vehicle establish?", options: ["A child-parent inheritance relationship", "A static-only relationship", "A copy of Vehicle's source text", "A private field"], answer: 0, explanation: "extends links the child class to the parent class's prototype behavior." },
      { id: "single-inheritance-2", question: "When must a derived constructor call super()?", options: ["Before using this", "After returning from the constructor", "Only inside static methods", "Never"], answer: 0, explanation: "A derived constructor cannot access this until the parent constructor has initialized the instance." },
      { id: "single-inheritance-3", question: "What should a focused child class usually add?", options: ["Specialized state or behavior", "A copy of every parent method", "An unrelated database", "A second parent with extends"], answer: 0, explanation: "The child should represent a meaningful specialization and reuse the parent contract." },
    ],
    lab: {
      title: "Extend a vehicle",
      brief: "Define class Vehicle with constructor(brand) storing brand and method move() returning brand + ' moves'. Define class Car extends Vehicle with method drive() returning brand + ' drives'.",
      starter: `class Vehicle {
  constructor(brand) {
    // store brand
  }
  move() {
    // return movement
  }
}
class Car extends Vehicle {
  drive() {
    // return driving
  }
}`,
      hint: "Car needs no constructor; it can inherit Vehicle's constructor.",
      checks: [
        { id: "c1", description: "Car inherits initialization and move", expression: "new Car('Ford').brand === 'Ford' && new Car('Ford').move() === 'Ford moves'" },
        { id: "c2", description: "Car adds drive", expression: "new Car('Ford').drive() === 'Ford drives' && new Car('Ford') instanceof Vehicle" },
      ],
    },
  },
  {
    slug: "multilevel-inheritance",
    title: "Multilevel inheritance",
    sectionId: "inheritance",
    minutes: 8,
    level: "intermediate",
    summary: "Multilevel inheritance forms a chain such as Animal to Mammal to Dog. The last class can use behavior from every level, but each extra level increases the distance and coupling of the design.",
    remember: ["Inheritance can form a chain.", "Lookup walks each level.", "super follows upward.", "Keep chains shallow."],
    theory: [
      { heading: "Each level specializes", body: "A middle class can add a concept shared by several children, then a final class can add its own behavior. An instance of Dog is also a Mammal and an Animal because its prototype chain includes each parent." },
      { heading: "super targets the parent level", body: "In a method, super.speak() resolves the parent implementation for the current class. In a constructor, super(...) invokes the immediate parent constructor, which may itself call its parent." },
      { heading: "Long chains amplify change", body: "A change near the root can affect every descendant, and the final behavior can be difficult to locate. Prefer a small number of meaningful levels and use composition for independent capabilities." },
    ],
    analogy: "Multilevel inheritance is a relay of family recipes, where each generation adds one ingredient.",
    example: {
      title: "Animal to dog",
      code: `class Animal {
  speak() {
    return "sound";
  }
}
class Mammal extends Animal {
  warm() {
    return true;
  }
}
class Dog extends Mammal {
  speak() {
    return super.speak() + " bark";
  }
}
const dog = new Dog();
console.log(dog.speak(), dog.warm(), dog instanceof Animal);`,
      output: `sound bark true`,
    },
    extraExample: {
      title: "Three constructors",
      code: `class A {
  constructor() { this.path = ["A"]; }
}
class B extends A {
  constructor() { super(); this.path.push("B"); }
}
class C extends B {
  constructor() { super(); this.path.push("C"); }
}
console.log(new C().path.join("->"));`,
      output: `A->B->C`,
    },
    pitfalls: ["Calling super with the wrong constructor arguments.", "Hiding a parent method without deciding whether super behavior is still needed.", "Building a deep chain for capabilities that could be independent mixins."],
    playground: {
      starter: `class Device {
  start() {
    return "start";
  }
}
class Computer extends Device {
  code() {
    return "code";
  }
}
class Laptop extends Computer {}
console.log(new Laptop().start(), new Laptop().code());`,
      goal: "Add a sleep() method to Laptop and log all three inherited or local behaviors.",
    },
    quiz: [
      { id: "multilevel-inheritance-1", question: "What is true of new Dog() when Dog extends Mammal and Mammal extends Animal?", options: ["It is an instance of Dog, Mammal, and Animal", "It is only an instance of Animal", "It has no prototype", "It becomes a static object"], answer: 0, explanation: "The prototype chain includes each constructor's prototype." },
      { id: "multilevel-inheritance-2", question: "What does super.speak() in Dog usually access?", options: ["The parent implementation of speak", "Dog's static speak", "A random ancestor method", "Only Object.prototype.toString"], answer: 0, explanation: "super resolves the method on the immediate parent prototype." },
      { id: "multilevel-inheritance-3", question: "What is a risk of very deep inheritance?", options: ["Behavior becomes harder to locate and changes ripple widely", "Methods cannot be inherited", "new stops working immediately", "All instances become frozen"], answer: 0, explanation: "Deep chains increase coupling and make the source of behavior less obvious." },
    ],
    lab: {
      title: "Create a three-level chain",
      brief: "Define class Animal with method breathe() returning 'breathes', class Mammal extends Animal with method warm() returning 'warm', and class Dog extends Mammal with method bark() returning 'bark'.",
      starter: `class Animal {
  breathe() {
    // return a word
  }
}
class Mammal extends Animal {
  warm() {
    // return a word
  }
}
class Dog extends Mammal {
  bark() {
    // return a word
  }
}`,
      hint: "Each method can return its requested literal string.",
      checks: [
        { id: "c1", description: "Dog reaches both ancestors", expression: "new Dog().breathe() === 'breathes' && new Dog().warm() === 'warm'" },
        { id: "c2", description: "Dog supplies its own behavior", expression: "new Dog().bark() === 'bark' && new Dog() instanceof Animal" },
      ],
    },
  },
  {
    slug: "hierarchical-inheritance",
    title: "Hierarchical inheritance",
    sectionId: "inheritance",
    minutes: 7,
    level: "intermediate",
    summary: "Hierarchical inheritance has several child classes sharing one parent class. It is useful when siblings truly share a contract but each provides a different specialization.",
    remember: ["One parent, many children.", "Share the common contract.", "Siblings stay separate.", "Avoid sibling assumptions."],
    theory: [
      { heading: "Common behavior belongs above", body: "A parent can define state and operations every child needs, such as a shape's color or an account's owner. Each child extends that base with behavior that is meaningful only for its own kind." },
      { heading: "Siblings do not inherit from each other", body: "If Circle and Rectangle both extend Shape, a Circle cannot use Rectangle's methods through the hierarchy. Shared behavior must be moved to Shape or composed as a separate capability." },
      { heading: "Polymorphism fits naturally", body: "Code can accept a Shape and call a shared method such as describe while each child overrides it. The caller depends on the parent contract rather than checking every concrete child." },
    ],
    analogy: "Hierarchical inheritance is one base camp serving several trails, each trail leading to a different destination.",
    example: {
      title: "Two kinds of notification",
      code: `class Notification {
  constructor(message) {
    this.message = message;
  }
}
class Email extends Notification {
  send() {
    return "email: " + this.message;
  }
}
class SMS extends Notification {
  send() {
    return "sms: " + this.message;
  }
}
console.log(new Email("Hi").send(), new SMS("Hi").send());`,
      output: `email: Hi sms: Hi`,
    },
    extraExample: {
      title: "Shared parent state",
      code: `class Shape {
  constructor(color) {
    this.color = color;
  }
}
class Circle extends Shape {}
class Square extends Shape {}
console.log(new Circle("red").color, new Square("blue").color);`,
      output: `red blue`,
    },
    pitfalls: ["Putting a child-specific method on the parent just to make it available everywhere.", "Assuming siblings share methods that exist only on one sibling.", "Using many instanceof checks instead of a stable parent contract."],
    playground: {
      starter: `class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}
class CashPayment extends Payment {
  label() {
    return "cash " + this.amount;
  }
}
class CardPayment extends Payment {
  label() {
    return "card " + this.amount;
  }
}
console.log(new CashPayment(5).label(), new CardPayment(5).label());`,
      goal: "Add a shared currency property through Payment and include it in both child labels.",
    },
    quiz: [
      { id: "hierarchical-inheritance-1", question: "What defines hierarchical inheritance?", options: ["Several children extend one parent", "One child extends several parents", "A class has no prototype", "Only static methods are used"], answer: 0, explanation: "The hierarchy branches from one shared parent into sibling child classes." },
      { id: "hierarchical-inheritance-2", question: "Where should behavior common to Circle and Square go?", options: ["Their shared Shape parent", "Only Circle", "Only Square", "A random sibling"], answer: 0, explanation: "The common contract belongs at the shared parent level." },
      { id: "hierarchical-inheritance-3", question: "Can Square inherit a method defined only by Circle?", options: ["No; siblings do not inherit from each other", "Yes, all children share all methods", "Only with static", "Only if Square is frozen"], answer: 0, explanation: "Sibling classes share their parent but are not in each other's prototype chain." },
    ],
    lab: {
      title: "Share a notification base",
      brief: "Define class Notification with constructor(message) storing message. Define class Email extends Notification with send() returning 'email:' + message, and class SMS extends Notification with send() returning 'sms:' + message.",
      starter: `class Notification {
  constructor(message) {
    // store message
  }
}
class Email extends Notification {
  send() {
    // return email label
  }
}
class SMS extends Notification {
  send() {
    // return sms label
  }
}`,
      hint: "Both child methods use inherited this.message.",
      checks: [
        { id: "c1", description: "Email uses parent state", expression: "new Email('Hi').send() === 'email:Hi'" },
        { id: "c2", description: "SMS has the same parent contract", expression: "new SMS('Hi').send() === 'sms:Hi' && new SMS('Hi') instanceof Notification" },
      ],
    },
  },
  {
    slug: "multiple-inheritance-limitations",
    title: "Why classes have one extends",
    sectionId: "inheritance",
    minutes: 9,
    level: "advanced",
    summary: "JavaScript classes can extend one direct class, so they do not have built-in multiple class inheritance. Independent behavior is usually combined with mixins, composition, or delegation instead.",
    remember: ["One extends target.", "Two parents create conflicts.", "Compose capabilities.", "Make precedence explicit."],
    theory: [
      { heading: "The language chooses one chain", body: "A class declaration has one extends expression, so class Child extends A, B is invalid syntax. A single prototype chain gives property lookup a clear order and avoids deciding between two parent implementations." },
      { heading: "Multiple parents have ambiguity", body: "If two parents define save(), which implementation should a child receive? Different languages solve this with rules such as linearization, but JavaScript encourages explicit combination instead of hiding the conflict." },
      { heading: "Alternatives preserve clarity", body: "A mixin can add methods, composition can store collaborator objects, and delegation can forward selected calls. Each approach makes the source and precedence of behavior visible in code." },
    ],
    analogy: "One class has one main family tree; extra skills come from coaches, tools, or teammates.",
    example: {
      title: "Combine capabilities explicitly",
      code: `const canFly = (target) => ({
  ...target,
  fly() { return "flying"; },
});
const canSwim = (target) => ({
  ...target,
  swim() { return "swimming"; },
});
const duck = canSwim(canFly({ name: "Daffy" }));
console.log(duck.fly(), duck.swim());`,
      output: `flying swimming`,
    },
    extraExample: {
      title: "Composition with collaborators",
      code: `class Logger {
  log(message) { return "log:" + message; }
}
class Service {
  constructor(logger) { this.logger = logger; }
  run() { return this.logger.log("run"); }
}
console.log(new Service(new Logger()).run());`,
      output: `log:run`,
    },
    pitfalls: ["Trying to write class Child extends A, B.", "Combining two methods with the same name without defining which one wins.", "Using inheritance only to borrow a few unrelated methods."],
    playground: {
      starter: `class Device {
  start() {
    return "started";
  }
}
const canRecord = (object) => Object.assign(
  Object.create(Object.getPrototypeOf(object)),
  object,
  {
    record() {
      return "recorded";
    },
  },
);
const camera = canRecord(new Device());
console.log(camera.start(), camera.record());`,
      goal: "Add a canStream capability and apply it so camera can start, record, and stream.",
    },
    quiz: [
      { id: "multiple-inheritance-limitations-1", question: "How many direct classes can a JavaScript class extend?", options: ["One", "Two always", "Any number separated by commas", "None"], answer: 0, explanation: "A class has one extends target and therefore one direct parent in its class chain." },
      { id: "multiple-inheritance-limitations-2", question: "What problem can two parents defining save() create?", options: ["An ambiguous method choice", "Automatic immutability", "A shorter prototype chain", "No problem because both run"], answer: 0, explanation: "The design must explicitly choose or combine conflicting implementations." },
      { id: "multiple-inheritance-limitations-3", question: "Which is a JavaScript alternative to multiple inheritance?", options: ["Composition or mixins", "A second extends keyword", "Changing typeof", "Making all methods global"], answer: 0, explanation: "Composition and mixins combine independent behavior without two direct class parents." },
    ],
    lab: {
      title: "Combine two abilities",
      brief: "Define function withFly(Base) returning a class extending Base with fly() returning 'fly'. Define function withSwim(Base) returning a class extending Base with swim() returning 'swim'. Define class Duck extends withSwim(withFly(class {})).",
      starter: `function withFly(Base) {
  return class extends Base {
    // add fly()
  };
}
function withSwim(Base) {
  return class extends Base {
    // add swim()
  };
}
class Duck extends withSwim(withFly(class {})) {}`,
      hint: "Each returned anonymous class adds one method; Duck uses the composed result as its single parent.",
      checks: [
        { id: "c1", description: "Duck can fly", expression: "new Duck().fly() === 'fly'" },
        { id: "c2", description: "Duck can swim", expression: "new Duck().swim() === 'swim'" },
      ],
    },
  },
  {
    slug: "hybrid-inheritance",
    title: "Hybrid inheritance patterns",
    sectionId: "inheritance",
    minutes: 9,
    level: "advanced",
    summary: "Hybrid inheritance combines more than one reuse technique, such as a class hierarchy plus a mixin or delegation. It can model real systems, but every added relationship should have a clear ownership story.",
    remember: ["Hybrid means combined.", "Name each relationship.", "Check method precedence.", "Prefer the smallest pattern."],
    theory: [
      { heading: "Different links solve different needs", body: "A base class can own identity and lifecycle, while a mixin contributes an optional capability. A composed collaborator can handle a service without becoming part of the inheritance chain." },
      { heading: "Order matters", body: "When mixins copy methods or return subclasses, applying one after another determines which method wins on a name collision. Keep capability names distinct or intentionally call a saved parent implementation." },
      { heading: "Hybrid does not mean complexity is free", body: "Every path to behavior adds a question for readers and tests. Use a hybrid only when the concepts are genuinely different—for example, an Employee is a Person and can also be Audited." },
    ],
    analogy: "A hybrid design is a bicycle with a frame, gears, and a basket: each mechanism has a distinct job, even though one ride combines them.",
    example: {
      title: "Employee plus audit capability",
      code: `class Person {
  constructor(name) {
    this.name = name;
  }
}
const withAudit = (Base) => class extends Base {
  audit() { return "audited:" + this.name; }
};
class Employee extends withAudit(Person) {
  work() { return this.name + " works"; }
}
const employee = new Employee("Ada");
console.log(employee.work(), employee.audit());`,
      output: `Ada works audited:Ada`,
    },
    extraExample: {
      title: "Inheritance with a collaborator",
      code: `class Report {
  constructor(title, printer) {
    this.title = title;
    this.printer = printer;
  }
  print() {
    return this.printer.output(this.title);
  }
}
class ConsolePrinter {
  output(text) { return "OUT:" + text; }
}
console.log(new Report("Daily", new ConsolePrinter()).print());`,
      output: `OUT:Daily`,
    },
    pitfalls: ["Adding a mixin without documenting which methods it supplies.", "Letting a capability override core class behavior accidentally.", "Choosing hybrid inheritance when simple composition would express the relationship."],
    playground: {
      starter: `class User {
  constructor(name) {
    this.name = name;
  }
}
const withLogin = (Base) => class extends Base {
  login() {
    return this.name + " logged in";
  }
};
class Admin extends withLogin(User) {
  deleteUser() {
    return "deleted";
  }
}
const admin = new Admin("Ada");
console.log(admin.login(), admin.deleteUser());`,
      goal: "Add a withRole mixin that supplies role() returning 'admin', and apply it to Admin.",
    },
    quiz: [
      { id: "hybrid-inheritance-1", question: "What makes an inheritance design hybrid?", options: ["It combines techniques such as a class chain and a mixin", "It has no objects", "It uses only one method", "It avoids prototypes entirely"], answer: 0, explanation: "Hybrid describes combining multiple reuse relationships in one design." },
      { id: "hybrid-inheritance-2", question: "Why does mixin application order matter?", options: ["Later definitions can win name collisions", "It changes all numbers to strings", "It disables constructors", "It removes own properties"], answer: 0, explanation: "When methods are combined, the order can determine which implementation is found." },
      { id: "hybrid-inheritance-3", question: "What should each relationship in a hybrid design have?", options: ["A clear ownership and purpose", "The same method names", "A global variable", "A second direct parent"], answer: 0, explanation: "Naming the role of each class, mixin, or collaborator keeps the combined design understandable." },
    ],
    lab: {
      title: "Add a role to a user",
      brief: "Define class User with constructor(name) storing name. Define function withRole(Base) returning a class extending Base with role() returning 'admin'. Define class Admin extends withRole(User).",
      starter: `class User {
  constructor(name) {
    // store name
  }
}
function withRole(Base) {
  return class extends Base {
    // add role()
  };
}
class Admin extends withRole(User) {}`,
      hint: "The mixin method returns the literal admin; Admin inherits User's constructor.",
      checks: [
        { id: "c1", description: "Admin has User state", expression: "new Admin('Ada').name === 'Ada'" },
        { id: "c2", description: "Admin has the mixed role", expression: "new Admin('Ada').role() === 'admin' && new Admin('Ada') instanceof User" },
      ],
    },
  },
  {
    slug: "mixins",
    title: "Mixins for reusable capabilities",
    sectionId: "inheritance",
    minutes: 8,
    level: "intermediate",
    summary: "A mixin is a function or object that adds a focused capability to another object or class. Mixins avoid forcing unrelated concepts into one parent-child hierarchy.",
    remember: ["Mixin = capability recipe.", "Mix small behaviors.", "Name collisions need rules.", "Mixins are not standalone types."],
    theory: [
      { heading: "Capability over category", body: "A withTimestamp or canLog mixin describes something an object can do, not what it fundamentally is. The same capability can be applied to unrelated classes such as Order and Message." },
      { heading: "Class mixins return subclasses", body: "A class mixin takes a Base and returns class extends Base { ... }. The resulting class preserves the base chain while adding methods, so it can be used in an extends expression." },
      { heading: "Object mixins copy or delegate", body: "Object.assign(target, capability) copies methods as own properties, while a function can return a new object that delegates to or wraps the target. Choose whether later changes to the capability should be visible." },
    ],
    analogy: "A mixin is a clip-on tool belt: different workers can wear the same belt without becoming the same kind of worker.",
    example: {
      title: "A timestamp mixin",
      code: `const withTimestamp = (Base) => class extends Base {
  stamped() {
    return this.name + " has a timestamp";
  }
};
class File {
  constructor(name) {
    this.name = name;
  }
}
class LogFile extends withTimestamp(File) {}
console.log(new LogFile("app").stamped());`,
      output: `app has a timestamp`,
    },
    extraExample: {
      title: "Copying an object capability",
      code: `const canLabel = {
  label() { return "item:" + this.id; },
};
const item = { id: 3 };
Object.assign(item, canLabel);
console.log(item.label(), Object.hasOwn(item, "label"));`,
      output: `item:3 true`,
    },
    pitfalls: ["Using a mixin to hide a required base relationship.", "Applying two mixins that define the same method without an explicit policy.", "Expecting Object.assign to preserve live linkage to the source capability."],
    playground: {
      starter: `const canCount = (Base) => class extends Base {
  count() {
    return this.items.length;
  }
};
class Basket {
  constructor(items) {
    this.items = items;
  }
}
class CountedBasket extends canCount(Basket) {}
console.log(new CountedBasket(["a", "b"]).count());`,
      goal: "Create a canEmpty mixin and apply it so CountedBasket can empty its items and log the resulting count.",
    },
    quiz: [
      { id: "mixins-1", question: "What does a class mixin commonly return?", options: ["A class extending the supplied Base", "A number only", "A second module export", "The global object"], answer: 0, explanation: "The function returns a derived class containing the added capability." },
      { id: "mixins-2", question: "What concept does a capability mixin emphasize?", options: ["What an object can do", "Only what an object is called", "A required database table", "The object's memory address"], answer: 0, explanation: "Mixins package optional behavior rather than defining a single category hierarchy." },
      { id: "mixins-3", question: "What does Object.assign(target, source) do to source methods?", options: ["Copies enumerable properties onto target", "Links target's prototype to source automatically", "Freezes both objects", "Runs source as a constructor"], answer: 0, explanation: "Object.assign copies enumerable own properties from source to the target." },
    ],
    lab: {
      title: "Mix in a printable capability",
      brief: "Define function withPrintable(Base) returning a class extending Base with print() returning this.text. Define class Message with constructor(text), then class PrintableMessage extends withPrintable(Message).",
      starter: `function withPrintable(Base) {
  return class extends Base {
    // add print()
  };
}
class Message {
  constructor(text) {
    // store text
  }
}
class PrintableMessage extends withPrintable(Message) {}`,
      hint: "print reads the inherited instance property this.text.",
      checks: [
        { id: "c1", description: "Message initializes text", expression: "new PrintableMessage('hello').text === 'hello'" },
        { id: "c2", description: "the mixin adds print", expression: "new PrintableMessage('hello').print() === 'hello'" },
      ],
    },
  },
  {
    slug: "composition-vs-inheritance",
    title: "Composition versus inheritance",
    sectionId: "inheritance",
    minutes: 10,
    level: "intermediate",
    summary: "Inheritance models an is-a relationship with a parent contract, while composition builds an object from smaller collaborators or capabilities. Composition is often more flexible when behavior can vary independently.",
    remember: ["Is-a suggests inheritance.", "Has-a suggests composition.", "Prefer replaceable parts.", "Delegate clear responsibilities."],
    theory: [
      { heading: "Inheritance shares identity", body: "A Car is a Vehicle when the child truly satisfies the parent's meaning and contract. This gives substitutability and inherited behavior, but also couples the child to parent implementation and lifecycle." },
      { heading: "Composition assembles behavior", body: "A Report has a Formatter or a Service has a Logger. The outer object stores collaborators and calls their methods, so different implementations can be supplied without changing the outer class hierarchy." },
      { heading: "Choose by change direction", body: "If many objects share a stable category contract, inheritance can be direct. If a feature varies independently, is optional, or needs runtime replacement, composition usually keeps the design easier to test and extend." },
    ],
    analogy: "Inheritance is receiving a family recipe; composition is choosing ingredients and tools for tonight's meal.",
    example: {
      title: "A report with a formatter",
      code: `class PlainFormatter {
  format(data) {
    return data.join(", ");
  }
}
class Report {
  constructor(formatter) {
    this.formatter = formatter;
  }
  render(data) {
    return this.formatter.format(data);
  }
}
console.log(new Report(new PlainFormatter()).render(["a", "b"]));`,
      output: `a, b`,
    },
    extraExample: {
      title: "Swap the collaborator",
      code: `const jsonFormatter = {
  format(data) { return JSON.stringify(data); },
};
const report = new Report(jsonFormatter);
console.log(report.render(["a", "b"]));`,
      output: `["a","b"]`,
    },
    pitfalls: ["Using inheritance just to reuse one helper method.", "Making a composed collaborator global instead of injecting it.", "Calling composition and inheritance interchangeable when their contracts differ."],
    playground: {
      starter: `class UppercaseFormatter {
  format(text) {
    return text.toUpperCase();
  }
}
class MessageView {
  constructor(formatter) {
    this.formatter = formatter;
  }
  show(text) {
    return this.formatter.format(text);
  }
}
console.log(new MessageView(new UppercaseFormatter()).show("hello"));`,
      goal: "Create a LowercaseFormatter with format(text), inject it into MessageView, and log its result.",
    },
    quiz: [
      { id: "composition-vs-inheritance-1", question: "Which relationship most directly suggests composition?", options: ["A Report has a Formatter", "A Dog is an Animal", "A Square is a Shape", "A Car is a Vehicle"], answer: 0, explanation: "A has-a collaborator is naturally represented by storing and using another object." },
      { id: "composition-vs-inheritance-2", question: "What is a benefit of injecting a collaborator?", options: ["It can be replaced with another implementation", "It makes every class static", "It removes all methods", "It prevents testing"], answer: 0, explanation: "Dependency injection lets callers supply a different implementation or test double." },
      { id: "composition-vs-inheritance-3", question: "When is inheritance a reasonable choice?", options: ["When a child truly satisfies a stable parent contract", "Whenever one helper method is reusable", "When two classes are unrelated", "Only when no methods exist"], answer: 0, explanation: "A meaningful is-a relationship and substitutable contract justify inheritance." },
    ],
    lab: {
      title: "Compose a notification service",
      brief: "Define class ConsoleSender with send(message) returning 'sent:' + message. Define class Alert with constructor(sender) storing sender and notify(message) returning this.sender.send(message).",
      starter: `class ConsoleSender {
  send(message) {
    // return a sent message
  }
}
class Alert {
  constructor(sender) {
    // store sender
  }
  notify(message) {
    // delegate to sender
  }
}`,
      hint: "Alert should not extend ConsoleSender; it should call the injected sender.",
      checks: [
        { id: "c1", description: "ConsoleSender implements send", expression: "new ConsoleSender().send('hi') === 'sent:hi'" },
        { id: "c2", description: "Alert delegates to its collaborator", expression: "new Alert(new ConsoleSender()).notify('hi') === 'sent:hi'" },
      ],
    },
  },
  {
    slug: "delegation",
    title: "Delegation: let another object do the work",
    sectionId: "inheritance",
    minutes: 8,
    level: "intermediate",
    summary: "Delegation means an object forwards a request to another object that owns the behavior. It keeps responsibilities separate and is a practical form of composition.",
    remember: ["Forward the request.", "Delegate the responsibility.", "Preserve the result.", "Inject the delegate."],
    theory: [
      { heading: "The wrapper owns coordination", body: "A wrapper can validate input, choose a collaborator, and forward the core operation. It does not need to inherit the collaborator's entire API or pretend to be the same kind of object." },
      { heading: "Keep the boundary small", body: "A method such as printer.print(text) is a narrow delegation boundary. The outer object depends on that contract, so the printer can be replaced with a console printer, file printer, or test double." },
      { heading: "Context must be intentional", body: "Calling this.delegate.work() gives the delegate the right receiver. Saving a method and calling it separately can lose this, so use a method call or bind the delegate when forwarding." },
    ],
    analogy: "Delegation is a receptionist handing a request to the specialist and returning the specialist's answer.",
    example: {
      title: "A logger delegate",
      code: `class Logger {
  write(message) {
    return "LOG " + message;
  }
}
class App {
  constructor(logger) {
    this.logger = logger;
  }
  start() {
    return this.logger.write("started");
  }
}
console.log(new App(new Logger()).start());`,
      output: `LOG started`,
    },
    extraExample: {
      title: "Delegating with a tiny object",
      code: `const calculator = {
  add(a, b) { return a + b; },
};
const service = {
  calculator,
  total(a, b) {
    return this.calculator.add(a, b);
  },
};
console.log(service.total(2, 3));`,
      output: `5`,
    },
    pitfalls: ["Reimplementing the delegate's behavior instead of forwarding it.", "Calling a detached delegate method and losing its this receiver.", "Exposing every delegate method and recreating inheritance accidentally."],
    playground: {
      starter: `class Clock {
  now() {
    return "12:00";
  }
}
class Display {
  constructor(clock) {
    this.clock = clock;
  }
  show() {
    return "Time " + this.clock.now();
  }
}
console.log(new Display(new Clock()).show());`,
      goal: "Add a FakeClock with now() returning '08:30' and show that Display can delegate to either clock.",
    },
    quiz: [
      { id: "delegation-1", question: "What does delegation mean?", options: ["Forwarding work to a collaborator", "Copying a whole parent class", "Calling every global function", "Removing an object's methods"], answer: 0, explanation: "The delegating object asks another object that owns the requested responsibility." },
      { id: "delegation-2", question: "Why inject a delegate?", options: ["To replace implementations easily", "To force one global implementation", "To make inheritance deeper", "To prevent method calls"], answer: 0, explanation: "Injection keeps the boundary replaceable for production variants and tests." },
      { id: "delegation-3", question: "Which call preserves the delegate's receiver?", options: ["this.delegate.work()", "const work = this.delegate.work; work()", "work.delegate()", "Delegate.prototype only"], answer: 0, explanation: "The member call keeps this set to the delegate object." },
    ],
    lab: {
      title: "Delegate a greeting",
      brief: "Define class Greeter with greet(name) returning 'Hello ' + name. Define class Welcome with constructor(greeter) storing greeter and say(name) delegating to greeter.greet(name).",
      starter: `class Greeter {
  greet(name) {
    // return a greeting
  }
}
class Welcome {
  constructor(greeter) {
    // store greeter
  }
  say(name) {
    // delegate greeting
  }
}`,
      hint: "Call this.greeter.greet(name) and return its result.",
      checks: [
        { id: "c1", description: "Greeter owns greeting behavior", expression: "new Greeter().greet('Ada') === 'Hello Ada'" },
        { id: "c2", description: "Welcome delegates", expression: "new Welcome(new Greeter()).say('Ada') === 'Hello Ada'" },
      ],
    },
  },
];
