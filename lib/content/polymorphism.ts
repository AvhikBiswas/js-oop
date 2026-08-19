import type { Topic } from "../types";

export const polymorphismTopics: Topic[] = [
  {
    slug: "method-overriding",
    title: "Method overriding",
    sectionId: "polymorphism",
    minutes: 8,
    level: "beginner",
    summary: "Method overriding lets a child class provide a new implementation for an inherited method. Calls through a child instance use the nearest implementation, while super can still reach the parent version.",
    remember: ["Same name, new behavior.", "Nearest method wins.", "super calls the parent.", "Keep the contract."],
    theory: [
      { heading: "Override at the child level", body: "If Dog extends Animal and defines speak(), a Dog instance finds Dog.prototype.speak before Animal.prototype.speak. The child changes the result without changing the parent or unrelated Animal instances." },
      { heading: "Extend rather than erase", body: "super.speak() lets an override reuse the parent result and add detail. This is useful when the parent establishes a stable base message or invariant that the child should preserve." },
      { heading: "Honor the shared contract", body: "A good override keeps a compatible purpose and useful return shape. If callers expect every Shape to have area(), a child should implement area rather than silently changing the meaning or requiring a special type check." },
    ],
    analogy: "Overriding is a local actor performing the same role with a different line while keeping the scene's script.",
    example: {
      title: "Dogs override speak",
      code: `class Animal {
  speak() {
    return "sound";
  }
}
class Dog extends Animal {
  speak() {
    return super.speak() + " bark";
  }
}
console.log(new Animal().speak(), new Dog().speak());`,
      output: `sound sound bark`,
    },
    extraExample: {
      title: "Different shapes, same method",
      code: `class Shape {
  area() { return 0; }
}
class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() { return this.side * this.side; }
}
console.log(new Square(4).area());`,
      output: `16`,
    },
    pitfalls: ["Changing an override's return type or meaning without updating callers.", "Forgetting super() in a derived constructor, not an overridden method.", "Calling super.method with the wrong arguments or receiver expectations."],
    playground: {
      starter: `class Notification {
  send() {
    return "sending";
  }
}
class Email extends Notification {
  send() {
    return super.send() + " email";
  }
}
console.log(new Email().send());`,
      goal: "Add SMS extends Notification with send() returning the parent result plus ' sms', then log both child results.",
    },
    quiz: [
      { id: "method-overriding-1", question: "Which method does a Dog instance normally find first when Dog defines speak()?", options: ["Dog's speak", "Animal's speak", "Object's constructor only", "A random method"], answer: 0, explanation: "Lookup checks the nearest child prototype before walking to the parent." },
      { id: "method-overriding-2", question: "What does super.speak() allow an override to do?", options: ["Call the parent implementation", "Call a static method on every class", "Skip method lookup", "Create a second instance"], answer: 0, explanation: "super provides access to the parent prototype's implementation." },
      { id: "method-overriding-3", question: "What should an override generally preserve?", options: ["The parent method's useful contract", "The exact parent source code", "A different method name", "Global state"], answer: 0, explanation: "Preserving the expected purpose and result shape keeps polymorphic callers safe." },
    ],
    lab: {
      title: "Override a hero action",
      brief: "Define class Hero with action() returning 'acts'. Define class SuperHero extends Hero overriding action() to return super.action() + ' hero'.",
      starter: `class Hero {
  action() {
    // return the base action
  }
}
class SuperHero extends Hero {
  action() {
    // call the parent and add hero
  }
}`,
      hint: "Return super.action() + ' hero'.",
      checks: [
        { id: "c1", description: "Hero supplies the base action", expression: "new Hero().action() === 'acts'" },
        { id: "c2", description: "SuperHero overrides and extends it", expression: "new SuperHero().action() === 'acts hero'" },
      ],
    },
  },
  {
    slug: "method-overloading",
    title: "Method overloading by arguments",
    sectionId: "polymorphism",
    minutes: 9,
    level: "intermediate",
    summary: "JavaScript does not have compile-time method overloading by parameter signature. One method can inspect arguments, defaults, or types at runtime and choose behavior, which is often called manual overloading.",
    remember: ["One name is retained.", "Arguments arrive at runtime.", "Branch deliberately.", "Document accepted shapes."],
    theory: [
      { heading: "Later definitions replace earlier ones", body: "Defining two methods with the same name in one class does not create two overloads; the later definition wins. JavaScript functions can still receive different numbers or kinds of arguments and branch explicitly." },
      { heading: "Use defaults and rest parameters", body: "A method can use default parameters for common omissions and rest parameters for a variable number of values. These tools make supported call forms visible without pretending the language has static signatures." },
      { heading: "Runtime checks need clear errors", body: "If a method accepts either a string or an object, inspect the value carefully and reject unsupported inputs. Ambiguous overload rules are harder to learn and maintain than separate named methods." },
    ],
    analogy: "Manual overloading is one receptionist asking whether you need a single ticket or a group booking, then routing the request.",
    example: {
      title: "A flexible total method",
      code: `class Calculator {
  total(...values) {
    return values.reduce((sum, value) => sum + value, 0);
  }
}
const calculator = new Calculator();
console.log(calculator.total(2), calculator.total(2, 3, 4));`,
      output: `2 9`,
    },
    extraExample: {
      title: "Choosing by argument type",
      code: `class Greeter {
  greet(value = "friend") {
    if (typeof value === "string") return "Hi " + value;
    if (Array.isArray(value)) return "Hi " + value.join(" and ");
    throw new TypeError("name or names expected");
  }
}
const greeter = new Greeter();
console.log(greeter.greet("Ada"), greeter.greet(["Ada", "Lin"]));`,
      output: `Hi Ada Hi Ada and Lin`,
    },
    pitfalls: ["Writing two same-named class methods and expecting both to survive.", "Accepting ambiguous argument shapes with no documented rule.", "Using typeof null or arrays without remembering their special cases."],
    playground: {
      starter: `class Formatter {
  format(...parts) {
    return parts.join("-");
  }
}
const formatter = new Formatter();
console.log(formatter.format("A"), formatter.format("A", "B", "C"));`,
      goal: "Make format() return 'empty' when called with no parts while preserving the one- and many-part behavior.",
    },
    quiz: [
      { id: "method-overloading-1", question: "What happens to duplicate same-named methods in one class body?", options: ["The later definition replaces the earlier one", "Both are selected by TypeScript", "They merge automatically", "The class cannot be parsed"], answer: 0, explanation: "JavaScript keeps the later property definition; it has no signature-based overload table." },
      { id: "method-overloading-2", question: "How can one JavaScript method support several call forms?", options: ["Inspect arguments at runtime", "Declare two extends clauses", "Use a private prototype", "Call the method twice automatically"], answer: 0, explanation: "The implementation can examine argument count, types, defaults, or rest values." },
      { id: "method-overloading-3", question: "Why should accepted argument shapes be documented?", options: ["To make runtime branching predictable", "To make methods static", "To prevent all calls", "To remove default values"], answer: 0, explanation: "Clear rules keep callers and maintainers from guessing how ambiguous inputs are interpreted." },
    ],
    lab: {
      title: "Support one or many names",
      brief: "Define class Greeter with method greet(...names) returning 'Hi ' + names.join(', ') when names are supplied, or 'Hi friend' when no names are supplied.",
      starter: `class Greeter {
  greet(...names) {
    // support zero, one, or many names
  }
}`,
      hint: "Check names.length before joining the array.",
      checks: [
        { id: "c1", description: "The zero-argument form has a default", expression: "new Greeter().greet() === 'Hi friend'" },
        { id: "c2", description: "The many-argument form joins names", expression: "new Greeter().greet('Ada', 'Lin') === 'Hi Ada, Lin'" },
      ],
    },
  },
  {
    slug: "duck-typing",
    title: "Duck typing",
    sectionId: "polymorphism",
    minutes: 8,
    level: "intermediate",
    summary: "Duck typing focuses on whether a value provides the operation a function needs rather than which class created it. If an object has a callable save method, code can often use it without requiring a shared inheritance hierarchy.",
    remember: ["Behavior over ancestry.", "Ask for the needed method.", "Interfaces can be informal.", "Fail with a useful message."],
    theory: [
      { heading: "The useful contract is small", body: "A function that prints a document may need only document.render(). Any object with that callable method can participate, whether it is a class instance, object literal, or test double." },
      { heading: "Check capability at the boundary", body: "typeof value.render === 'function' is a direct runtime guard. It produces a clear error near the call site instead of a confusing failure deep inside a workflow." },
      { heading: "Duck typing increases flexibility", body: "There is no need for unrelated classes to extend a common parent just to share one operation. The tradeoff is that the contract is informal, so documentation and tests should state the required methods and return values." },
    ],
    analogy: "At a door, duck typing checks whether you have a key that turns the lock, not which locksmith made it.",
    example: {
      title: "Render any printable thing",
      code: `function print(item) {
  if (typeof item.render !== "function") {
    throw new TypeError("item must render");
  }
  return item.render();
}
const card = { render: () => "card" };
const banner = { render: () => "banner" };
console.log(print(card), print(banner));`,
      output: `card banner`,
    },
    extraExample: {
      title: "A class and an object can agree",
      code: `class Report {
  render() {
    return "report";
  }
}
const preview = { render() { return "preview"; } };
function show(view) { return view.render(); }
console.log(show(new Report()), show(preview));`,
      output: `report preview`,
    },
    pitfalls: ["Checking a class with instanceof when the real requirement is just one method.", "Calling the expected method before checking that it is callable.", "Assuming a matching method name guarantees the right return value or semantics."],
    playground: {
      starter: `function announce(item) {
  if (typeof item.speak !== "function") {
    throw new TypeError("item must speak");
  }
  console.log(item.speak());
}
announce({ speak: () => "hello" });`,
      goal: "Call announce with both a class instance and a plain object that provide speak().",
    },
    quiz: [
      { id: "duck-typing-1", question: "What does duck typing primarily ask?", options: ["Does the value provide the needed behavior?", "Which class keyword created it?", "Is the object frozen?", "Does it have a numeric id?"], answer: 0, explanation: "Duck typing checks capabilities such as a callable method rather than nominal ancestry." },
      { id: "duck-typing-2", question: "Which guard checks for a callable render operation?", options: ["typeof item.render === 'function'", "item instanceof Function always", "item.render === true", "Object.keys(item).length > 0"], answer: 0, explanation: "typeof confirms that the property exists as a function before calling it." },
      { id: "duck-typing-3", question: "What is a tradeoff of duck typing?", options: ["The contract is informal and needs documentation/tests", "It can only use class instances", "It prevents test doubles", "It always copies methods"], answer: 0, explanation: "Flexibility comes with responsibility to define and verify the expected behavior." },
    ],
    lab: {
      title: "Process speakable values",
      brief: "Define function announce(speaker) that returns speaker.speak(), and define class Dog with constructor(name) and speak() returning name + ' says woof'.",
      starter: `function announce(speaker) {
  // use the speaker capability
}
class Dog {
  constructor(name) {
    // store name
  }
  speak() {
    // return a bark
  }
}`,
      hint: "announce needs no instanceof check; call the required speak method.",
      checks: [
        { id: "c1", description: "Dog supplies speak", expression: "announce(new Dog('Rex')) === 'Rex says woof'" },
        { id: "c2", description: "A plain object can also participate", expression: "announce({ speak: () => 'plain hello' }) === 'plain hello'" },
      ],
    },
  },
  {
    slug: "instanceof",
    title: "Checking ancestry with instanceof",
    sectionId: "polymorphism",
    minutes: 7,
    level: "beginner",
    summary: "The instanceof operator checks whether a constructor's prototype appears in an object's prototype chain. It can answer an ancestry question, but it is not a complete test of whether an object supports a behavior.",
    remember: ["instanceof walks prototypes.", "Right side needs a constructor.", "It tests ancestry, not skill.", "Cross-realm checks differ."],
    theory: [
      { heading: "The prototype test", body: "value instanceof Type is conceptually similar to checking whether Type.prototype is found while walking value's prototype chain. new Dog() instanceof Animal is true when Dog inherits from Animal." },
      { heading: "It is nominal evidence", body: "instanceof tells you about a constructor relationship, not whether a method currently exists or behaves correctly. A plain object with speak() can duck-type successfully while being instanceof no custom class." },
      { heading: "The result can be context-sensitive", body: "Changing a constructor's prototype changes future instanceof results for existing objects because the operator walks the current chain. Values from another realm, such as another browser window, can also fail local constructor checks." },
    ],
    analogy: "instanceof checks a family-tree passport, while duck typing checks whether the traveler can perform the task.",
    example: {
      title: "Ancestry checks",
      code: `class Animal {}
class Dog extends Animal {}
const dog = new Dog();
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);
console.log({} instanceof Animal);`,
      output: `true
true
false`,
    },
    extraExample: {
      title: "Behavior is a separate question",
      code: `class Bird {
  fly() { return "fly"; }
}
const robot = { fly() { return "fly"; } };
console.log(robot instanceof Bird, typeof robot.fly === "function");`,
      output: `false true`,
    },
    pitfalls: ["Using instanceof as the only validation for a duck-typed capability.", "Putting a non-constructor on the right side and getting a TypeError.", "Assuming instanceof is reliable across separate JavaScript realms."],
    playground: {
      starter: `class User {}
class Admin extends User {}
const admin = new Admin();
console.log(admin instanceof Admin, admin instanceof User);`,
      goal: "Add a Guest class that does not extend User and log how its instanceof results differ from Admin.",
    },
    quiz: [
      { id: "instanceof-1", question: "What does dog instanceof Animal inspect?", options: ["Whether Animal.prototype occurs in dog's chain", "Whether dog has every Animal method as an own property", "Whether dog is frozen", "Whether dog was parsed from JSON"], answer: 0, explanation: "instanceof performs a prototype-chain relationship check." },
      { id: "instanceof-2", question: "Can a plain object with fly() be instanceof Bird without Bird in its chain?", options: ["No, though it can still duck-type as flyable", "Yes, every fly method implies Bird", "Only if it is frozen", "Only if fly is static"], answer: 0, explanation: "Behavior and constructor ancestry are separate; a plain object can provide fly without Bird.prototype." },
      { id: "instanceof-3", question: "What can changing Type.prototype affect?", options: ["Later instanceof results because the chain is inspected", "Only string conversion", "Every object's own properties", "The number of function arguments"], answer: 0, explanation: "instanceof uses the current prototype object associated with Type." },
    ],
    lab: {
      title: "Check a class hierarchy",
      brief: "Define class Animal, class Dog extends Animal, and function isDog(value) returning value instanceof Dog.",
      starter: `class Animal {}
class Dog extends Animal {}
function isDog(value) {
  // return the ancestry check
}`,
      hint: "The expression inside isDog is simply value instanceof Dog.",
      checks: [
        { id: "c1", description: "Dog instances pass", expression: "isDog(new Dog()) === true" },
        { id: "c2", description: "Animal instances do not pass as Dogs", expression: "isDog(new Animal()) === false" },
      ],
    },
  },
];
