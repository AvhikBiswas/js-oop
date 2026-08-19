import type { Topic } from "../types";

export const objectsClasses: Topic[] = [
  {
    slug: "objects",
    title: "Objects: bundles of state and behavior",
    sectionId: "objects-classes",
    minutes: 7,
    level: "beginner",
    summary: "A JavaScript object groups related values under named properties. Its properties can hold data, functions, or even other objects.",
    remember: ["Object = named-value bundle.", "Keys name; values describe.", "Methods are function properties.", "Dot reads; bracket computes."],
    theory: [
      { heading: "Properties hold information", body: "An object is a collection of key-value pairs. Keys are usually strings, while values can be any JavaScript value, so one object can describe a user, a product, or a nested data structure." },
      { heading: "Methods describe actions", body: "When a property contains a function, we commonly call it a method. A method can use this to refer to the object that receives the call, although arrow functions do not create their own this." },
      { heading: "Choose dot or bracket access", body: "Use person.name when the property name is known and a valid identifier. Use person[key] when the name comes from a variable, includes unusual characters, or must be calculated." },
    ],
    analogy: "An object is a labeled toolbox: each label points to a tool, a fact, or a smaller toolbox.",
    example: {
      title: "A tiny coffee order",
      code: `const order = {
  drink: "latte",
  size: "large",
  describe() {
    return this.size + " " + this.drink;
  },
};
console.log(order.describe());
console.log(order["drink"]);`,
      output: `large latte
latte`,
    },
    extraExample: {
      title: "A computed property name",
      code: `const field = "score";
const player = { name: "Mina", [field]: 42 };
console.log(player.name, player[field]);`,
      output: `Mina 42`,
    },
    pitfalls: ["Confusing a missing property with a property whose value is undefined.", "Using dot notation with a variable, as in user.key, instead of user[key].", "Expecting an arrow-function method to receive the object as this."],
    playground: {
      starter: `const book = {
  title: "Dune",
  pages: 412,
  label() {
    return this.title + " has " + this.pages + " pages";
  },
};
console.log(book.label());`,
      goal: "Add an author property and make label include the author after the page count.",
    },
    quiz: [
      { id: "objects-1", question: "Which expression reads a property whose name is stored in key?", options: ["user[key]", "user.key", "user->key", "read(user, key)"], answer: 0, explanation: "Bracket notation evaluates key and then uses its value as the property name." },
      { id: "objects-2", question: "What is a method in an object literal?", options: ["A function stored as a property", "A property that can only be a number", "A class that has no constructor", "A variable outside the object"], answer: 0, explanation: "Methods are callable function values associated with an object." },
      { id: "objects-3", question: "What does Object.keys({ a: 1, b: 2 }) return?", options: ["An array containing a and b", "The values 1 and 2", "The object prototype", "A Boolean"], answer: 0, explanation: "Object.keys returns an array of the object's own enumerable property names." },
    ],
    lab: {
      title: "Build a score card object",
      brief: "Define function createScoreCard(name, score) returning an object with name, score, and method label() that returns name + ': ' + score.",
      starter: `function createScoreCard(name, score) {
  // return an object with name, score, and label()
}`,
      hint: "Return an object literal. Inside label, use this.name and this.score.",
      checks: [
        { id: "c1", description: "The factory stores name and score", expression: "createScoreCard('Ada', 9).name === 'Ada' && createScoreCard('Ada', 9).score === 9" },
        { id: "c2", description: "label formats the card", expression: "createScoreCard('Ada', 9).label() === 'Ada: 9'" },
      ],
    },
  },
  {
    slug: "classes",
    title: "Classes: a reusable object blueprint",
    sectionId: "objects-classes",
    minutes: 8,
    level: "beginner",
    summary: "A class is syntax for creating objects with a shared shape and behavior. Instances created with new keep their own state while sharing methods through a prototype.",
    remember: ["class describes instances.", "new makes an instance.", "constructor initializes state.", "Methods are shared."],
    theory: [
      { heading: "A class is not an instance", body: "The class declaration defines how instances should be made; it does not represent one particular user or car. Calling new User(...) constructs a separate object whose properties can differ from every other instance." },
      { heading: "State belongs to each instance", body: "Assignments such as this.name = name run for every construction, so each object receives its own name property. Updating one instance does not update another instance's state." },
      { heading: "Behavior is reused", body: "Class methods are placed on the class prototype rather than copied into each instance. This gives many instances the same behavior while keeping memory use and code duplication lower." },
    ],
    analogy: "A class is a cookie cutter, while each object is a cookie with its own icing and toppings.",
    example: {
      title: "Greeting users",
      code: `class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return "Hi, " + this.name;
  }
}
const first = new User("Ada");
const second = new User("Lin");
console.log(first.greet(), second.greet());`,
      output: `Hi, Ada Hi, Lin`,
    },
    extraExample: {
      title: "Independent instances",
      code: `class Counter {
  constructor() {
    this.value = 0;
  }
  increment() {
    this.value += 1;
  }
}
const a = new Counter();
const b = new Counter();
a.increment();
console.log(a.value, b.value);`,
      output: `1 0`,
    },
    pitfalls: ["Forgetting new when creating an instance of a class.", "Putting changing data on the class itself instead of on this.", "Assuming a class method is copied onto every object rather than shared through a prototype."],
    playground: {
      starter: `class Lamp {
  constructor(color) {
    this.color = color;
  }
  describe() {
    return "A " + this.color + " lamp";
  }
}
console.log(new Lamp("blue").describe());`,
      goal: "Add a turnOn() method that returns the string 'The blue lamp is on' for a blue lamp.",
    },
    quiz: [
      { id: "classes-1", question: "What does new User('Ada') do?", options: ["Creates an instance and runs the constructor", "Changes the User class name", "Copies every method into global scope", "Calls User without creating an object"], answer: 0, explanation: "new creates an object, links its prototype, and invokes the constructor with the given argument." },
      { id: "classes-2", question: "Where do ordinary class methods normally live?", options: ["On the class prototype", "On every instance as a new function", "Only inside the constructor's local scope", "On Object.keys"], answer: 0, explanation: "Class method definitions are installed on the class's prototype and shared by instances." },
      { id: "classes-3", question: "Why can two Counter instances have different values?", options: ["Each constructor call creates separate instance state", "Methods always make random values", "Classes cannot share methods", "The prototype stores a different value per call"], answer: 0, explanation: "Assignments to this in the constructor belong to the newly created instance." },
    ],
    lab: {
      title: "Create a greeting class",
      brief: "Define class Greeter with constructor(name) storing this.name and method greet() returning 'Hello, ' + this.name + '!'",
      starter: `class Greeter {
  constructor(name) {
    // store name
  }
  greet() {
    // return a greeting
  }
}`,
      hint: "Use this.name in the constructor and in greet().",
      checks: [
        { id: "c1", description: "Greeter stores its name", expression: "new Greeter('Kai').name === 'Kai'" },
        { id: "c2", description: "greet returns the requested message", expression: "new Greeter('Kai').greet() === 'Hello, Kai!'" },
      ],
    },
  },
  {
    slug: "constructors",
    title: "Constructors initialize instances",
    sectionId: "objects-classes",
    minutes: 7,
    level: "beginner",
    summary: "A constructor is the setup step that runs when new creates an instance. It accepts inputs and assigns the initial state that the object's methods will use.",
    remember: ["constructor runs with new.", "this means the new object.", "Parameters become state.", "One setup, many instances."],
    theory: [
      { heading: "Construction is automatic", body: "In a class, constructor is a special method called by new. You normally do not call it directly; new prepares an object, binds this to it, and then runs the constructor." },
      { heading: "Validate at the boundary", body: "A constructor is a useful place to normalize or reject invalid inputs before the object is used. For example, Number(age) can create a consistent representation, while a guard can throw for a negative balance." },
      { heading: "Default values make objects safe", body: "Parameters can have defaults, and constructor assignments can initialize arrays or counters. Create a fresh array per instance; sharing one mutable array across instances causes surprising cross-talk." },
    ],
    analogy: "A constructor is the check-in desk that gives every new guest an ID badge and an empty room.",
    example: {
      title: "A playlist with a safe default",
      code: `class Playlist {
  constructor(name, songs = []) {
    this.name = name;
    this.songs = [...songs];
  }
  add(song) {
    this.songs.push(song);
  }
}
const mix = new Playlist("Morning", ["Sunrise"]);
mix.add("Breeze");
console.log(mix.name, mix.songs.join(", "));`,
      output: `Morning Sunrise, Breeze`,
    },
    extraExample: {
      title: "Normalizing constructor input",
      code: `class Temperature {
  constructor(celsius) {
    this.celsius = Number(celsius);
  }
}
console.log(new Temperature("21").celsius + 1);`,
      output: `22`,
    },
    pitfalls: ["Using a shared mutable default array outside the constructor.", "Assigning a parameter but forgetting this., so the instance never receives it.", "Throwing errors after partially exposing an invalid object instead of validating inputs early."],
    playground: {
      starter: `class Ticket {
  constructor(event, price = 0) {
    this.event = event;
    this.price = price;
  }
}
const ticket = new Ticket("JS Day");
console.log(ticket.event, ticket.price);`,
      goal: "Add a quantity parameter with a default of 1 and log the ticket's total price.",
    },
    quiz: [
      { id: "constructors-1", question: "When does a class constructor normally run?", options: ["During new ClassName(...)", "Whenever the file is imported", "Only when a method is called", "After Object.freeze"], answer: 0, explanation: "new invokes the class constructor to initialize the new instance." },
      { id: "constructors-2", question: "Why should an instance array usually be created inside the constructor?", options: ["So each instance gets its own array", "So arrays become static automatically", "Because arrays cannot be class properties", "To make the array immutable"], answer: 0, explanation: "Creating the array per construction prevents instances from accidentally sharing mutations." },
      { id: "constructors-3", question: "What is the purpose of Number(celsius) in a constructor?", options: ["To normalize numeric input", "To create a prototype chain", "To make celsius private", "To call a static method"], answer: 0, explanation: "Number converts numeric strings and other supported values to a number representation." },
    ],
    lab: {
      title: "Initialize a product",
      brief: "Define class Product with constructor(name, price = 0) storing name and price, and method total(quantity) returning price * quantity.",
      starter: `class Product {
  constructor(name, price = 0) {
    // initialize the instance
  }
  total(quantity) {
    // calculate a total
  }
}`,
      hint: "Store both constructor parameters on this, then multiply this.price by quantity.",
      checks: [
        { id: "c1", description: "Product initializes fields", expression: "new Product('Pen', 2).name === 'Pen' && new Product('Pen', 2).price === 2" },
        { id: "c2", description: "total multiplies price", expression: "new Product('Pen', 2).total(3) === 6" },
      ],
    },
  },
  {
    slug: "this-keyword",
    title: "Understanding this",
    sectionId: "objects-classes",
    minutes: 9,
    level: "intermediate",
    summary: "The value of this is determined by how a function is called, not where the function was written. Method calls provide their receiver as this, while detached calls can lose that context.",
    remember: ["Call site chooses this.", "obj.method() gives obj.", "Arrow this is lexical.", "bind fixes a receiver."],
    theory: [
      { heading: "The receiver supplies context", body: "In user.say(), the expression before the dot is the receiver, so this inside say is user. The same function can observe a different this when it is called through another object or with an explicit call/apply/bind." },
      { heading: "Detaching changes the call", body: "const fn = user.say; fn() is no longer a method call on user. In strict modern JavaScript, this is undefined for that plain function call, so a method that needs its receiver should be bound or called as a method." },
      { heading: "Arrow functions capture outer this", body: "Arrow functions do not define their own this. They capture it from the surrounding scope, which is useful inside callbacks but usually makes an arrow function a poor choice for an object method that should use the object receiver." },
    ],
    analogy: "this is the name on a walkie-talkie channel: the same message means different things depending on which device is speaking.",
    example: {
      title: "Bind a greeting",
      code: `const user = {
  name: "Ada",
  greet() {
    return "Hi " + this.name;
  },
};
const greetLater = user.greet.bind(user);
console.log(greetLater());`,
      output: `Hi Ada`,
    },
    extraExample: {
      title: "An arrow callback keeps outer this",
      code: `const team = {
  name: "Blue",
  members: ["A", "B"],
  labels() {
    return this.members.map((member) => this.name + ":" + member);
  },
};
console.log(team.labels().join(", "));`,
      output: `Blue:A, Blue:B`,
    },
    pitfalls: ["Assuming this always means the object where the function was declared.", "Passing an unbound method as a callback and expecting it to retain its receiver.", "Replacing a normal method with an arrow and expecting call-time this to change."],
    playground: {
      starter: `const button = {
  label: "Save",
  click() {
    console.log("Clicked " + this.label);
  },
};
button.click();`,
      goal: "Create a delayedClick function that can be called later and still logs 'Clicked Save' by binding the correct this.",
    },
    quiz: [
      { id: "this-1", question: "In box.open(), what is this inside open when called normally?", options: ["box", "open", "globalThis in every mode", "undefined in every mode"], answer: 0, explanation: "A normal method call uses the object before the dot as the receiver and this value." },
      { id: "this-2", question: "What does bind return?", options: ["A new function with a fixed this", "The original object", "A class prototype", "The function's return value immediately"], answer: 0, explanation: "bind creates a callable function that remembers the supplied this and optional leading arguments." },
      { id: "this-3", question: "Why can arrow callbacks use this from an enclosing method?", options: ["Arrows lexically capture this", "Arrows always use window", "map supplies this automatically", "The callback becomes static"], answer: 0, explanation: "Arrow functions do not have their own this, so they close over the surrounding this." },
    ],
    lab: {
      title: "Make a bound alarm",
      brief: "Define class Alarm with constructor(label) storing label and method ring() returning 'Ring: ' + this.label. Define function getRing(alarm) returning alarm.ring bound to alarm.",
      starter: `class Alarm {
  constructor(label) {
    // store label
  }
  ring() {
    // return the label
  }
}
function getRing(alarm) {
  // return a bound method
}`,
      hint: "Use alarm.ring.bind(alarm) so the detached function keeps its receiver.",
      checks: [
        { id: "c1", description: "Alarm rings with its label", expression: "new Alarm('wake').ring() === 'Ring: wake'" },
        { id: "c2", description: "getRing preserves this", expression: "getRing(new Alarm('wake'))() === 'Ring: wake'" },
      ],
    },
  },
  {
    slug: "instance-properties",
    title: "Instance properties",
    sectionId: "objects-classes",
    minutes: 7,
    level: "beginner",
    summary: "Instance properties are values stored directly on one object created from a class or constructor. They represent per-object state such as a user's name, a car's fuel, or a task's status.",
    remember: ["Instance state lives on this.", "Each new gets fresh state.", "Own means directly stored.", "Mutate intentionally."],
    theory: [
      { heading: "Own properties belong to one object", body: "A property assigned with this in a constructor is an own property of the resulting instance. Object.hasOwn(instance, 'name') can distinguish that state from a method inherited through a prototype." },
      { heading: "Instances are independent", body: "Every call to new allocates a new object and runs the initialization code again. Primitive values are independent automatically, while arrays and objects should also be allocated per instance when they will be mutated." },
      { heading: "State can be changed through methods", body: "A method can update an instance property, making the object model a small state machine. Keeping updates in methods gives callers a named operation and lets you add validation later." },
    ],
    analogy: "Instance properties are separate lockers: every student has a locker with the same labels but different contents.",
    example: {
      title: "Separate pet state",
      code: `class Pet {
  constructor(name) {
    this.name = name;
    this.tricks = [];
  }
  learn(trick) {
    this.tricks.push(trick);
  }
}
const cat = new Pet("Mochi");
const dog = new Pet("Rex");
cat.learn("spin");
console.log(cat.tricks.length, dog.tricks.length);`,
      output: `1 0`,
    },
    extraExample: {
      title: "Checking own state",
      code: `class Note {
  constructor(text) {
    this.text = text;
  }
  show() {
    return this.text;
  }
}
const note = new Note("read");
console.log(Object.hasOwn(note, "text"), Object.hasOwn(note, "show"));`,
      output: `true false`,
    },
    pitfalls: ["Defining a mutable array once outside the class and sharing it among all instances.", "Confusing an inherited method with an own instance property.", "Changing public state from unrelated code without preserving its invariants."],
    playground: {
      starter: `class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  finish() {
    this.done = true;
  }
}
const task = new Task("Read");
task.finish();
console.log(task.title, task.done);`,
      goal: "Add a priority instance property with default value 'normal' and print it with the task state.",
    },
    quiz: [
      { id: "instance-properties-1", question: "Where does this.name = name store name?", options: ["Directly on the new instance", "Only on the class prototype", "In the global object", "In the constructor function's name"], answer: 0, explanation: "Assignments through this during construction create own properties on that instance." },
      { id: "instance-properties-2", question: "Why should mutable per-instance data be initialized per construction?", options: ["To avoid different instances sharing mutations", "To make methods static", "To remove the prototype", "To make values private"], answer: 0, explanation: "A fresh array or object means changes in one instance do not leak into another." },
      { id: "instance-properties-3", question: "What does Object.hasOwn(note, 'text') test?", options: ["Whether note directly stores text", "Whether note can inherit text", "Whether text is a method", "Whether note is frozen"], answer: 0, explanation: "Object.hasOwn checks for an own property and does not count inherited properties." },
    ],
    lab: {
      title: "Track a hero's energy",
      brief: "Define class Hero with constructor(name, energy) storing both as instance properties and method spend(amount) subtracting amount from energy and returning the new energy.",
      starter: `class Hero {
  constructor(name, energy) {
    // store both instance properties
  }
  spend(amount) {
    // update and return energy
  }
}`,
      hint: "Use this.energy -= amount, then return this.energy.",
      checks: [
        { id: "c1", description: "Hero has independent state", expression: "new Hero('Nova', 10).name === 'Nova' && new Hero('Nova', 10).energy === 10" },
        { id: "c2", description: "spend updates energy", expression: "new Hero('Nova', 10).spend(3) === 7" },
      ],
    },
  },
  {
    slug: "instance-methods",
    title: "Instance methods",
    sectionId: "objects-classes",
    minutes: 8,
    level: "beginner",
    summary: "An instance method is behavior called on a particular object and usually reads or changes that object's state. Class syntax places the method on the prototype so all instances can use one shared function.",
    remember: ["Call methods on instances.", "Methods can read this.", "One prototype method, many users.", "Return or mutate clearly."],
    theory: [
      { heading: "A method receives its receiver", body: "Calling cart.total() gives total a this value of cart. That lets the same method calculate using each cart's own items without duplicating the method definition." },
      { heading: "Methods can model commands", body: "An instance method often performs a domain action such as deposit, addItem, or rename. Decide whether it mutates the instance, returns a new value, or does both, and document that contract with a useful return value." },
      { heading: "Shared does not mean stateless", body: "The function is shared, but this is selected at call time. The method can therefore operate on different instance properties while remaining a single function in the prototype." },
    ],
    analogy: "An instance method is a shared instruction card that each owner follows using their own supplies.",
    example: {
      title: "A shopping cart total",
      code: `class Cart {
  constructor() {
    this.items = [];
  }
  add(name, price) {
    this.items.push({ name, price });
  }
  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
const cart = new Cart();
cart.add("Pen", 2);
cart.add("Book", 8);
console.log(cart.total());`,
      output: `10`,
    },
    extraExample: {
      title: "A method can return this",
      code: `class Builder {
  constructor() {
    this.parts = [];
  }
  add(part) {
    this.parts.push(part);
    return this;
  }
}
console.log(new Builder().add("A").add("B").parts.join("-"));`,
      output: `A-B`,
    },
    pitfalls: ["Calling an instance method on the class, such as Cart.total(), when no instance receiver exists.", "Forgetting to return a value that callers expect from a mutating method.", "Detaching a method and losing this before calling it."],
    playground: {
      starter: `class Counter {
  constructor(start = 0) {
    this.value = start;
  }
  increment() {
    this.value += 1;
    return this.value;
  }
}
const counter = new Counter(4);
console.log(counter.increment());`,
      goal: "Add a reset() instance method that sets value to 0 and returns the reset value.",
    },
    quiz: [
      { id: "instance-methods-1", question: "What does this usually refer to in cart.total()?", options: ["cart", "Cart", "total's source code", "The nearest array"], answer: 0, explanation: "The object used as the receiver before the dot becomes this for a normal method call." },
      { id: "instance-methods-2", question: "Why are class methods efficient for many instances?", options: ["They are shared through the prototype", "They are copied into global scope", "They are converted to strings", "They cannot access instance state"], answer: 0, explanation: "Instances look up the same method on their prototype instead of storing duplicate functions." },
      { id: "instance-methods-3", question: "Which design clearly supports chaining?", options: ["A mutating method returns this", "Every method returns undefined", "A method deletes its receiver", "A method returns the class source"], answer: 0, explanation: "Returning this lets the caller immediately invoke another method on the same instance." },
    ],
    lab: {
      title: "Build a counter method",
      brief: "Define class CounterBox with constructor(value = 0), instance method increment() that adds one and returns value, and reset() that sets value to zero and returns value.",
      starter: `class CounterBox {
  constructor(value = 0) {
    // initialize value
  }
  increment() {
    // increment and return
  }
  reset() {
    // reset and return
  }
}`,
      hint: "Both methods should update this.value before returning it.",
      checks: [
        { id: "c1", description: "increment changes the instance", expression: "new CounterBox(2).increment() === 3" },
        { id: "c2", description: "reset returns zero", expression: "(function(){ const c = new CounterBox(5); c.increment(); return c.reset() === 0 && c.value === 0; })()" },
      ],
    },
  },
  {
    slug: "static-properties",
    title: "Static properties belong to the class",
    sectionId: "objects-classes",
    minutes: 7,
    level: "intermediate",
    summary: "A static property is attached to the class constructor rather than to each instance. It is appropriate for shared metadata or counters that describe the class as a whole.",
    remember: ["static means class-level.", "Instance cannot dot into static.", "Shared data needs care.", "ClassName reads static state."],
    theory: [
      { heading: "Two related objects exist", body: "A class declaration creates a constructor value and instances created from it. Static properties live on the constructor value, while instance properties live on each object produced by new." },
      { heading: "Static fields use class context", body: "class User { static role = 'member' } makes User.role available. An instance such as new User() does not inherit that static property through User.prototype, so user.role is undefined unless separately defined." },
      { heading: "Counters reveal shared state", body: "A static nextId can generate identifiers for all instances, but it is mutable global state within the class. Keep updates deliberate and consider whether a factory or external service would be easier to test." },
    ],
    analogy: "Instance properties are names on individual jerseys; a static property is the team's shared logo.",
    example: {
      title: "Numbering tasks",
      code: `class Task {
  static nextId = 1;
  constructor(title) {
    this.id = Task.nextId++;
    this.title = title;
  }
}
const first = new Task("Read");
const second = new Task("Practice");
console.log(first.id, second.id, Task.nextId);`,
      output: `1 2 3`,
    },
    extraExample: {
      title: "Class metadata",
      code: `class Button {
  static category = "control";
}
const button = new Button();
console.log(Button.category, button.category);`,
      output: `control undefined`,
    },
    pitfalls: ["Trying to read a static property through an instance.", "Using mutable static state when each instance should have an independent value.", "Referencing this instead of the class name inside a static field initializer without understanding static context."],
    playground: {
      starter: `class Ticket {
  static issued = 0;
  constructor(event) {
    this.event = event;
    Ticket.issued += 1;
  }
}
new Ticket("Talk");
new Ticket("Lab");
console.log(Ticket.issued);`,
      goal: "Add a static venue property set to 'Hall A' and log it with the number of issued tickets.",
    },
    quiz: [
      { id: "static-properties-1", question: "Where is a static property read?", options: ["ClassName.property", "instance.property only", "Object.prototype.property only", "constructor() without new"], answer: 0, explanation: "Static members belong to the class constructor, so they are accessed through the class name." },
      { id: "static-properties-2", question: "What is a good use for a static counter?", options: ["Tracking IDs shared by all instances", "Storing a different nickname per instance", "Replacing every instance method", "Making a value automatically private"], answer: 0, explanation: "A static counter can coordinate shared numbering across construction calls." },
      { id: "static-properties-3", question: "What does new Button().category produce if only Button.category exists?", options: ["undefined", "control", "A new static property", "A TypeError every time"], answer: 0, explanation: "Static properties are on Button, not on Button.prototype, so instances do not inherit them." },
    ],
    lab: {
      title: "Count created robots",
      brief: "Define class Robot with static count = 0 and constructor(name) that stores name and increments Robot.count.",
      starter: `class Robot {
  static count = 0;
  constructor(name) {
    // store name and increment the class count
  }
}`,
      hint: "Use Robot.count += 1 in the constructor after storing this.name.",
      checks: [
        { id: "c1", description: "Robot stores its name", expression: "new Robot('R1').name === 'R1'" },
        { id: "c2", description: "Robot count is shared", expression: "(function(){ Robot.count = 0; new Robot('R1'); new Robot('R2'); return Robot.count === 2; })()" },
      ],
    },
  },
  {
    slug: "static-methods",
    title: "Static methods are class utilities",
    sectionId: "objects-classes",
    minutes: 8,
    level: "intermediate",
    summary: "A static method is called on the class and does not receive an instance as its automatic this. Static methods are useful for factories, validation, and operations that do not need one object's state.",
    remember: ["Call static with ClassName.", "No instance receiver.", "Static can create instances.", "Keep utilities cohesive."],
    theory: [
      { heading: "Static calls have a class receiver", body: "User.fromJSON(data) calls fromJSON with User as this in an ordinary static method. It can use the class to construct or inspect instances, but it cannot directly read an instance's name because no particular user was supplied." },
      { heading: "Factories make intent clear", body: "A static fromCents or fromJSON method can translate an external representation into a valid instance. This keeps parsing decisions near the class while leaving new for the ordinary constructor path." },
      { heading: "Static does not mean private", body: "Static members are publicly accessible unless language features such as private static fields are used. The word only describes ownership and call style, not visibility or immutability." },
    ],
    analogy: "A static method is the help desk for the whole library, not a service performed by one borrowed book.",
    example: {
      title: "A named constructor",
      code: `class User {
  constructor(name) {
    this.name = name;
  }
  static guest() {
    return new User("Guest");
  }
}
console.log(User.guest().name);`,
      output: `Guest`,
    },
    extraExample: {
      title: "Static validation",
      code: `class Age {
  static isAdult(value) {
    return Number(value) >= 18;
  }
}
console.log(Age.isAdult(20), Age.isAdult(12));`,
      output: `true false`,
    },
    pitfalls: ["Calling a static method on an instance and expecting it to exist there.", "Using this.name in a static method as if this were a User instance.", "Putting behavior on a static method just because it feels convenient when it needs per-instance state."],
    playground: {
      starter: `class Color {
  constructor(value) {
    this.value = value;
  }
  static red() {
    return new Color("red");
  }
}
console.log(Color.red().value);`,
      goal: "Add static blue() that returns a Color with value 'blue', then log both factory results.",
    },
    quiz: [
      { id: "static-methods-1", question: "Which call invokes a static method make?", options: ["User.make()", "new User().make()", "User.prototype.make()", "make.User()"], answer: 0, explanation: "Static methods belong to the class value and are called through its name." },
      { id: "static-methods-2", question: "What is a useful purpose of User.fromJSON(data)?", options: ["Create a User from an external representation", "Change every user's name automatically", "Hide all User instances", "Call an instance method without an instance"], answer: 0, explanation: "A static factory can parse or normalize data and then return a valid instance." },
      { id: "static-methods-3", question: "Does static automatically mean private?", options: ["No; it describes class ownership, not visibility", "Yes, all static methods are private", "Yes, static methods cannot be called", "Only in object literals"], answer: 0, explanation: "Static members are public unless explicitly made private with supported syntax." },
    ],
    lab: {
      title: "Add a static factory",
      brief: "Define class Badge with constructor(label) storing label and static fromCode(code) returning new Badge('Badge-' + code).",
      starter: `class Badge {
  constructor(label) {
    // store label
  }
  static fromCode(code) {
    // return a Badge
  }
}`,
      hint: "The static method should construct with new Badge('Badge-' + code).",
      checks: [
        { id: "c1", description: "Badge stores a label", expression: "new Badge('VIP').label === 'VIP'" },
        { id: "c2", description: "fromCode creates a Badge", expression: "Badge.fromCode('42').label === 'Badge-42' && Badge.fromCode('42') instanceof Badge" },
      ],
    },
  },
];
