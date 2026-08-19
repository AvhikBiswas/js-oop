import type { Topic } from "../types";

export const functionOopTopics: Topic[] = [
  {
    slug: "constructor-functions-fn",
    title: "Constructor Functions",
    sectionId: "function-oop",
    minutes: 8,
    level: "beginner",
    summary: "Use a regular function as a blueprint for objects when paired with new. Properties go on each instance while shared methods can live on the prototype.",
    remember: [
      "A constructor function is a conventionally capitalized regular function.",
      "new creates an object, links its prototype, and calls the function with that object as this.",
      "Put per-object state on this and reusable behavior on Constructor.prototype.",
      "A constructor normally returns the new object; an explicit object return can replace it."
    ],
    theory: [
      { heading: "Blueprint plus instance", body: "function User(name) { this.name = name; } describes how to initialize each User. Calling User without new does not create an instance and may write to the wrong this." },
      { heading: "Shared behavior", body: "User.prototype.greet is looked up by every User instance through the prototype chain. One function is shared instead of allocating a new greet function for every object." },
      { heading: "Constructor identity", body: "Instances created with new User() satisfy instance instanceof User. The prototype object also has a constructor property, although it can be overwritten when setting up inheritance." }
    ],
    analogy: "A constructor is a cookie cutter: each cookie gets its own toppings, while the cutter supplies the shared shape.",
    example: {
      title: "A shared greeting method",
      code: `function User(name) {
  this.name = name;
}
User.prototype.greet = function () {
  return "Hello, " + this.name;
};
const ada = new User("Ada");
console.log(ada.greet(), ada instanceof User);`,
      output: "Hello, Ada true"
    },
    extraExample: {
      title: "Separate state, shared method",
      code: `function Counter(start) {
  this.value = start;
}
Counter.prototype.increment = function () {
  this.value += 1;
  return this.value;
};
const first = new Counter(0);
const second = new Counter(10);
console.log(first.increment(), second.increment());
console.log(first.increment === second.increment);`,
      output: "1 11\ntrue"
    },
    pitfalls: [
      "Forgetting new can make this refer to the global object in sloppy mode or be undefined in strict mode.",
      "Defining methods inside the constructor creates a fresh function for every instance.",
      "Replacing a prototype without restoring constructor can make instance.constructor misleading."
    ],
    playground: {
      starter: `function Playlist(owner) {
  // store owner and an empty songs array
}
// Add a shared add(song) method on Playlist.prototype`,
      goal: "Create Playlist so new Playlist('Mina').add('Blue') returns 1, stores the song, and every instance shares the same add function."
    },
    quiz: [
      { id: "constructor-functions-fn-q1", question: "Where should a method shared by all User instances usually be placed?", options: ["Inside each constructor call", "On User.prototype", "On the global object", "In the arguments object"], answer: 1, explanation: "The prototype is shared through the prototype chain, so one method serves every instance." },
      { id: "constructor-functions-fn-q2", question: "What does new User('Ada') do first conceptually?", options: ["Freezes User.prototype", "Creates and links a new object", "Converts User to an arrow function", "Calls User with undefined arguments"], answer: 1, explanation: "new creates an object whose prototype is User.prototype before invoking the constructor." },
      { id: "constructor-functions-fn-q3", question: "What does new User('Ada') instanceof User test?", options: ["Whether User is an arrow", "Whether the object has User.prototype in its chain", "Whether the object is frozen", "Whether name is enumerable"], answer: 1, explanation: "instanceof walks the right-hand constructor's prototype chain." }
    ],
    lab: {
      title: "Build a constructor-based task",
      brief: "Create Task(title) with a title and done=false. Add complete() on Task.prototype; it should set done to true and return the title.",
      starter: `function Task(title) {
  // initialize title and done
}
// Add Task.prototype.complete`,
      hint: "Use this.title and this.done in the constructor. The prototype method still receives the instance as this.",
      checks: [
        { id: "constructor-functions-fn-l1", description: "Task initializes its state", expression: "new Task('Read').title === 'Read' && new Task('Read').done === false" },
        { id: "constructor-functions-fn-l2", description: "complete changes state and returns title", expression: "(function(){ const task = new Task('Read'); return task.complete() === 'Read' && task.done === true; })()" },
        { id: "constructor-functions-fn-l3", description: "complete is shared", expression: "new Task('A').complete === new Task('B').complete" }
      ]
    }
  },
  {
    slug: "factory-functions",
    title: "Factory Functions",
    sectionId: "function-oop",
    minutes: 7,
    level: "beginner",
    summary: "A factory function creates and returns an object directly. It avoids new and can hide private state with closures.",
    remember: [
      "A factory is an ordinary function that returns an object.",
      "Call a factory normally; new is not part of its contract.",
      "Closures can keep data private while returned methods provide controlled access.",
      "Factories can choose different object shapes based on input."
    ],
    theory: [
      { heading: "Explicit creation", body: "A factory writes const product = { ... } and returns product. There is no implicit this setup, so the function is easy to call and compose." },
      { heading: "Private closure state", body: "Variables declared inside the factory remain reachable by methods that close over them, but callers cannot access them as object properties." },
      { heading: "Tradeoff", body: "Methods declared in an object literal are often created per call. That cost can be worthwhile when each object needs private state or a deliberately independent method." }
    ],
    analogy: "A factory is a café order window: you ask for an item and receive the finished object, without operating the kitchen machinery yourself.",
    example: {
      title: "A private score factory",
      code: `function createScore(initial) {
  let value = initial;
  return {
    add(points) {
      value += points;
      return value;
    },
    read() {
      return value;
    }
  };
}
const score = createScore(10);
console.log(score.add(5), score.read());
console.log(score.value);`,
      output: "15 15\nundefined"
    },
    extraExample: {
      title: "A configurable greeting",
      code: `function createGreeter(prefix) {
  return {
    greet(name) {
      return prefix + ", " + name;
    }
  };
}
const casual = createGreeter("Hi");
const formal = createGreeter("Welcome");
console.log(casual.greet("Jo"), formal.greet("Jo"));`,
      output: "Hi, Jo Welcome, Jo"
    },
    pitfalls: [
      "Assuming a factory-created object is an instance of a factory function; it is not unless you deliberately set a prototype.",
      "Returning an object with this-based methods and then detaching those methods can lose their receiver.",
      "Exposing the closed-over variable directly removes the privacy the closure was meant to provide."
    ],
    playground: {
      starter: `function createLamp(color) {
  // keep on=false private
  return {
    // toggle() and status()
  };
}`,
      goal: "Return a lamp whose toggle() changes private state and returns it, while status() reports the current boolean."
    },
    quiz: [
      { id: "factory-functions-q1", question: "How is a factory normally invoked?", options: ["With new only", "As a regular function that returns an object", "Only as a class method", "By calling its prototype"], answer: 1, explanation: "Factories explicitly return an object and do not need new." },
      { id: "factory-functions-q2", question: "Why can a factory keep value private?", options: ["Object.freeze hides it", "Methods close over the factory's local variable", "prototype deletes it", "new encrypts it"], answer: 1, explanation: "A closure preserves access for inner methods without making the variable a public property." },
      { id: "factory-functions-q3", question: "What is a common factory tradeoff?", options: ["It cannot return objects", "It may allocate methods per object", "It always changes global this", "It requires Java syntax"], answer: 1, explanation: "Object-literal methods inside each factory call are normally newly allocated." }
    ],
    lab: {
      title: "Create a private thermostat",
      brief: "Create createThermostat(start) with private temperature. Return set(value) and read(); set returns the new temperature.",
      starter: `function createThermostat(start) {
  // keep temperature private
  return {
    // set(value) and read()
  };
}`,
      hint: "Declare let temperature before the returned object. The methods can read and update it through closure scope.",
      checks: [
        { id: "factory-functions-l1", description: "The factory exposes the initial reading", expression: "createThermostat(20).read() === 20" },
        { id: "factory-functions-l2", description: "set updates and returns temperature", expression: "(function(){ const t = createThermostat(20); return t.set(23) === 23 && t.read() === 23; })()" },
        { id: "factory-functions-l3", description: "Temperature is not a public property", expression: "!Object.hasOwn(createThermostat(20), 'temperature')" }
      ]
    }
  },
  {
    slug: "new-keyword-fn",
    title: "The new Keyword",
    sectionId: "function-oop",
    minutes: 9,
    level: "beginner",
    summary: "Understand the four practical effects of new: create an object, connect its prototype, call the constructor with that object as this, and return the result unless an object is explicitly returned.",
    remember: [
      "new links the created object's internal prototype to Constructor.prototype.",
      "The constructor runs with the new object as this.",
      "The resulting object is returned automatically when the constructor returns a primitive or nothing.",
      "Returning an explicit object from a constructor replaces the automatic result."
    ],
    theory: [
      { heading: "The mental expansion", body: "For function Person(name), new Person('Ada') is roughly Object.create(Person.prototype), followed by Person.call(instance, 'Ada'), followed by returning instance." },
      { heading: "Prototype lookup", body: "Methods are usually found through the linked prototype, which is why instance.greet() can work even when greet is not an own property." },
      { heading: "Return override", body: "A constructor returning an object makes new yield that object. Returning a number or string does not override the created instance." }
    ],
    analogy: "new is an assembly line: it makes a blank product, attaches the right component catalog, runs initialization, then ships the product unless the constructor hands back a replacement.",
    example: {
      title: "Seeing new's result",
      code: `function Badge(label) {
  this.label = label;
}
Badge.prototype.describe = function () {
  return "Badge: " + this.label;
};
const badge = new Badge("gold");
console.log(badge.describe(), Object.getPrototypeOf(badge) === Badge.prototype);`,
      output: "Badge: gold true"
    },
    extraExample: {
      title: "An object return overrides the instance",
      code: `function Replacement() {
  this.created = true;
  return { created: false, kind: "replacement" };
}
const result = new Replacement();
console.log(result.created, result.kind, result instanceof Replacement);`,
      output: "false replacement false"
    },
    pitfalls: [
      "Arrow functions cannot be used with new because they do not have a construct method.",
      "new does not clone the prototype; instances delegate to the same prototype object.",
      "A constructor returning a primitive does not replace the instance, but returning an object does."
    ],
    playground: {
      starter: `function Ticket(number) {
  // store number
}
Ticket.prototype.label = function () {
  // return a label
};`,
      goal: "Make new Ticket(7).label() return 'Ticket #7' and make its prototype exactly Ticket.prototype."
    },
    quiz: [
      { id: "new-keyword-fn-q1", question: "What does new use to set an instance's prototype?", options: ["The constructor's prototype property", "The constructor's name string", "The global object", "The function's arguments"], answer: 0, explanation: "new links the created object to Constructor.prototype." },
      { id: "new-keyword-fn-q2", question: "Which constructor return replaces the automatic instance?", options: ["return 3", "return undefined", "return { kind: 'other' }", "return 'text'"], answer: 2, explanation: "An explicit object return becomes the result of new." },
      { id: "new-keyword-fn-q3", question: "Why does new ArrowThing() fail for an arrow function?", options: ["Arrows cannot have parameters", "Arrows are not constructable", "Arrows always return objects", "Arrows lack a name"], answer: 1, explanation: "Arrow functions do not provide the internal construct behavior required by new." }
    ],
    lab: {
      title: "Model a new-built ticket",
      brief: "Create Ticket(number) and put label() on Ticket.prototype. The label should return 'Ticket #' plus the number.",
      starter: `function Ticket(number) {
  // initialize number
}
// Add Ticket.prototype.label`,
      hint: "new supplies this automatically. In label(), concatenate this.number with the required text.",
      checks: [
        { id: "new-keyword-fn-l1", description: "new creates the expected object", expression: "new Ticket(7).number === 7 && new Ticket(7) instanceof Ticket" },
        { id: "new-keyword-fn-l2", description: "prototype method formats the label", expression: "new Ticket(7).label() === 'Ticket #7'" },
        { id: "new-keyword-fn-l3", description: "label is on the prototype", expression: "!Object.hasOwn(new Ticket(7), 'label') && Ticket.prototype.label instanceof Function" }
      ]
    }
  },
  {
    slug: "call",
    title: "call()",
    sectionId: "function-oop",
    minutes: 6,
    level: "beginner",
    summary: "Use Function.prototype.call to invoke a function immediately with a chosen this value and individual arguments.",
    remember: [
      "call invokes the function immediately.",
      "Its first argument becomes this for a regular function.",
      "Arguments after the this value are passed one by one.",
      "call is useful for borrowing a method or reusing initialization logic."
    ],
    theory: [
      { heading: "Explicit receiver", body: "function greet(prefix) { return prefix + this.name; } can be run as greet.call({ name: 'Ada' }, 'Hi '). The receiver is selected at the call site." },
      { heading: "Borrowing methods", body: "Array.prototype.slice.call(arrayLike) lets a method designed for arrays operate on an array-like object with numeric keys and length." },
      { heading: "Constructor reuse", body: "A child constructor can use Parent.call(this, value) to copy parent initialization onto the child instance. It does not establish prototype inheritance by itself." }
    ],
    analogy: "call is handing a tool to a particular worker for one immediate job, while listing each required material separately.",
    example: {
      title: "Borrow a greeting",
      code: `function greet(prefix, punctuation) {
  return prefix + this.name + punctuation;
}
const person = { name: "Ada" };
console.log(greet.call(person, "Hello ", "!"));`,
      output: "Hello Ada!"
    },
    extraExample: {
      title: "Reuse parent initialization",
      code: `function Animal(name) {
  this.name = name;
}
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
const dog = new Dog("Rex", "collie");
console.log(dog.name, dog.breed);`,
      output: "Rex collie"
    },
    pitfalls: [
      "call does not permanently bind this; the next invocation can choose another receiver.",
      "Using call on an arrow function cannot change its lexical this.",
      "Parent.call initializes properties but does not make the child inherit parent prototype methods."
    ],
    playground: {
      starter: `function announce(prefix, punctuation) {
  // use this.name
}
const speaker = { name: "Mina" };`,
      goal: "Implement announce so announce.call(speaker, 'Hi ', '!') returns 'Hi Mina!'."
    },
    quiz: [
      { id: "call-q1", question: "When does call execute its target function?", options: ["Immediately", "After a promise resolves", "Only when used with new", "Never"], answer: 0, explanation: "call invokes the function during the call expression." },
      { id: "call-q2", question: "Where is the first call argument used?", options: ["As the return value", "As this", "As arguments.length", "As the prototype"], answer: 1, explanation: "The first argument selects this; later arguments become function parameters." },
      { id: "call-q3", question: "What can Parent.call(this, name) do in a child constructor?", options: ["Copy parent initialization", "Change an arrow's this", "Create prototype inheritance", "Freeze the child"], answer: 0, explanation: "It runs the parent function against the existing child instance." }
    ],
    lab: {
      title: "Call a method with a chosen receiver",
      brief: "Create describe(prefix) using this.name and this.role. It should return prefix + name + ':' + role.",
      starter: `function describe(prefix) {
  // return prefix + this.name + ":" + this.role
}
const member = { name: "Kai", role: "admin" };`,
      hint: "describe itself does not know the receiver. Test it with describe.call(member, 'User ').",
      checks: [
        { id: "call-l1", description: "describe reads the explicit receiver", expression: "describe.call({name:'Kai',role:'admin'}, 'User ') === 'User Kai:admin'" },
        { id: "call-l2", description: "individual arguments are accepted", expression: "describe.call({name:'Jo',role:'editor'}, 'Member ') === 'Member Jo:editor'" }
      ]
    }
  },
  {
    slug: "apply",
    title: "apply()",
    sectionId: "function-oop",
    minutes: 6,
    level: "beginner",
    summary: "Use Function.prototype.apply to invoke a regular function immediately with a chosen this value and an array-like collection of arguments.",
    remember: [
      "apply executes immediately, just like call.",
      "The first argument supplies this for a regular function.",
      "The second argument supplies all parameters as an array or array-like value.",
      "Use apply when arguments already live in an array or array-like collection."
    ],
    theory: [
      { heading: "call versus apply", body: "fn.call(receiver, a, b) and fn.apply(receiver, [a, b]) choose the same receiver and values. Only the argument-passing shape differs." },
      { heading: "Array-like inputs", body: "apply accepts an array-like object with numeric indexes and length, not just a real Array. Modern spread syntax is often clearer, but apply remains important legacy and reflective JavaScript." },
      { heading: "Receiver rules remain", body: "apply's explicit receiver works for regular functions. It cannot override an arrow function's lexical this." }
    ],
    analogy: "apply is giving the worker a packed tray of materials for one job; call hands over each material separately.",
    example: {
      title: "Sum a packed argument list",
      code: `function total(label, first, second) {
  return label + (first + second) + this.unit;
}
const context = { unit: " points" };
console.log(total.apply(context, ["Score: ", 4, 6]));`,
      output: "Score: 10 points"
    },
    extraExample: {
      title: "Find a maximum from an array",
      code: `function describeMaximum() {
  return Math.max.apply(null, arguments);
}
console.log(describeMaximum(4, 9, 2));`,
      output: "9"
    },
    pitfalls: [
      "Passing arguments as separate values to apply does not work; the second parameter must be array-like.",
      "apply does not permanently bind the function.",
      "Using null as this can still produce a global or undefined receiver depending on strictness; it is not a universal safety mechanism."
    ],
    playground: {
      starter: `function formatTotal(prefix, a, b) {
  // use this.currency and return a formatted sum
}
const money = { currency: "$" };
const values = ["Total: ", 4, 6];`,
      goal: "Make formatTotal.apply(money, values) return 'Total: $10' without changing the values array."
    },
    quiz: [
      { id: "apply-q1", question: "What is the key difference between call and apply?", options: ["apply is asynchronous", "apply takes arguments as one array-like value", "apply only works on classes", "apply permanently binds this"], answer: 1, explanation: "Both invoke immediately; apply receives its parameters in a second array-like argument." },
      { id: "apply-q2", question: "What does apply's first argument select?", options: ["The return type", "this for a regular function", "The function name", "The prototype"], answer: 1, explanation: "The first argument is the explicit receiver." },
      { id: "apply-q3", question: "Which expression supplies 2 and 3 correctly?", options: ["add.apply(obj, 2, 3)", "add.apply(obj, [2, 3])", "add.apply([2, 3], obj)", "add.apply(obj, { args: [2, 3] })"], answer: 1, explanation: "The second apply argument is the array-like parameter list." }
    ],
    lab: {
      title: "Apply a batch of prices",
      brief: "Create priceTotal(prefix, a, b) that uses this.currency and returns prefix + currency + (a+b).",
      starter: `function priceTotal(prefix, a, b) {
  // format the total with this.currency
}`,
      hint: "Invoke with priceTotal.apply({ currency: '$' }, ['Total: ', 4, 6]).",
      checks: [
        { id: "apply-l1", description: "apply passes packed arguments", expression: "priceTotal.apply({currency:'$'}, ['Total: ', 4, 6]) === 'Total: $10'" },
        { id: "apply-l2", description: "a second batch works", expression: "priceTotal.apply({currency:'€'}, ['Sum: ', 2, 3]) === 'Sum: €5'" }
      ]
    }
  },
  {
    slug: "bind",
    title: "bind()",
    sectionId: "function-oop",
    minutes: 7,
    level: "beginner",
    summary: "Use bind to create a new function with a permanently selected this value and optionally pre-filled arguments.",
    remember: [
      "bind returns a new function and does not call the original immediately.",
      "The bound receiver stays fixed when the bound function is called normally.",
      "Arguments supplied to bind are partially applied before later arguments.",
      "A bound function can still be used with new, where new supplies the new instance as this."
    ],
    theory: [
      { heading: "Permanent receiver", body: "const greetAda = greet.bind({ name: 'Ada' }, 'Hi '); creates a callable function. Calling greetAda('!') later uses the bound object and both arguments." },
      { heading: "Callback safety", body: "Passing obj.method directly can lose obj as this. obj.method.bind(obj) creates a callback that retains the intended receiver." },
      { heading: "A wrapper with identity", body: "The result of bind is a distinct function, so comparing it with the original is false. Repeated bind calls also create different wrappers." }
    ],
    analogy: "bind is attaching a tool to one worker's belt ahead of time, optionally loading the first material, so the later job needs fewer instructions.",
    example: {
      title: "Bind a callback",
      code: `const account = {
  owner: "Ada",
  label(prefix) {
    return prefix + this.owner;
  }
};
const labelAda = account.label.bind(account, "Owner: ");
console.log(labelAda(), labelAda === account.label);`,
      output: "Owner: Ada false"
    },
    extraExample: {
      title: "Partial application",
      code: `function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
console.log(double(7));`,
      output: "14"
    },
    pitfalls: [
      "Expecting bind to run the function immediately; call the returned function to execute it.",
      "Binding an arrow function cannot change its lexical this, although bound arguments still work.",
      "Binding a method once does not automatically update if you later intend it to follow a different object."
    ],
    playground: {
      starter: `const profile = {
  name: "Nia",
  greet(prefix, punctuation) {
    // return a greeting using this.name
  }
};
// Create greetNia with bind`,
      goal: "Create greetNia so greetNia('Hello ', '!') returns 'Hello Nia!'."
    },
    quiz: [
      { id: "bind-q1", question: "What does bind return?", options: ["The original function's result", "A new function", "A promise", "The receiver object"], answer: 1, explanation: "bind creates a wrapper to invoke later with selected settings." },
      { id: "bind-q2", question: "What happens to arguments passed to bind?", options: ["They are discarded", "They become pre-filled leading arguments", "They become this", "They are passed only on the second call"], answer: 1, explanation: "Bind supports partial application by placing bound arguments before call-time arguments." },
      { id: "bind-q3", question: "Why bind a method before passing it as a callback?", options: ["To preserve its receiver", "To make it an arrow", "To copy its prototype", "To make it synchronous"], answer: 0, explanation: "The bound wrapper retains the intended object as this during the callback." }
    ],
    lab: {
      title: "Prepare a bound greeting",
      brief: "Create a named function greet(prefix, punctuation) and a bound greetNia using profile. The bound function should accept both arguments.",
      starter: `const profile = { name: "Nia" };
function greet(prefix, punctuation) {
  // use this.name
}
// const greetNia = ...`,
      hint: "Use greet.bind(profile). Do not invoke greet while creating greetNia.",
      checks: [
        { id: "bind-l1", description: "bound function preserves this", expression: "greetNia('Hello ', '!') === 'Hello Nia!'" },
        { id: "bind-l2", description: "bound function is callable later", expression: "typeof greetNia === 'function' && greetNia('Welcome ', '.') === 'Welcome Nia.'" }
      ]
    }
  },
  {
    slug: "this-binding",
    title: "this Binding Rules",
    sectionId: "function-oop",
    minutes: 12,
    level: "intermediate",
    summary: "Predict this by identifying the call form: default, implicit, explicit, new, or arrow lexical binding. The call site matters more than where a regular function was written.",
    remember: [
      "Default binding gives a regular function the global object in sloppy mode and undefined in strict mode.",
      "Implicit binding uses the object to the left of the dot, such as user.say().",
      "Explicit binding comes from call, apply, or bind; new binding comes from construction.",
      "Arrow functions do not bind their own this; they capture it from the surrounding scope."
    ],
    theory: [
      { heading: "Default and implicit", body: "A detached regular function call, say(), uses default binding. A method call, user.say(), uses implicit binding and sets this to user for that call." },
      { heading: "Explicit and new", body: "say.call(other) and say.apply(other, []) choose other explicitly. say.bind(other) creates a wrapper. new say() creates an instance and gives the constructor call that instance as this." },
      { heading: "Arrow lexical this", body: "An arrow reads this from the surrounding function or module context. call, apply, and bind cannot replace that captured value, which makes arrows useful for callbacks inside methods." }
    ],
    analogy: "Regular-function this is a job assignment made at the call site; arrow this is a name badge inherited from the surrounding team and cannot be reassigned at the door.",
    example: {
      title: "Compare method, detached, explicit, and arrow calls",
      code: `const box = {
  value: 4,
  regular() { return this.value; },
  arrow: () => "lexical"
};
const regular = box.regular;
console.log(box.regular(), regular.call({ value: 9 }), box.arrow.call({ value: 9 }));`,
      output: "4 9 lexical"
    },
    extraExample: {
      title: "Arrow callback keeps the method receiver",
      code: `const counter = {
  value: 3,
  later() {
    return [1].map(() => this.value + 1)[0];
  }
};
console.log(counter.later());`,
      output: "4"
    },
    pitfalls: [
      "The object where a regular method was defined does not permanently own this; detaching the method changes the call form.",
      "An arrow used as an object method does not receive the object as this.",
      "Strict mode changes default regular-function this to undefined, so code must not rely on accidental globals."
    ],
    playground: {
      starter: `const player = {
  score: 8,
  show() {
    // return this.score
  }
};
const showScore = player.show;`,
      goal: "Implement show() and demonstrate method, detached-with-explicit-object, and bound calls without relying on a global variable."
    },
    quiz: [
      { id: "this-binding-q1", question: "What is this in obj.method() for a regular function?", options: ["obj", "The global object always", "undefined always", "method.prototype"], answer: 0, explanation: "The object to the left of the dot supplies implicit this." },
      { id: "this-binding-q2", question: "Which call form uses new binding?", options: ["fn()", "obj.fn()", "fn.call(obj)", "new Fn()"], answer: 3, explanation: "new creates an instance and invokes the constructor with it as this." },
      { id: "this-binding-q3", question: "Can call change an arrow function's this?", options: ["Yes, always", "Only in strict mode", "No, arrows capture lexical this", "Only when the object is frozen"], answer: 2, explanation: "Arrow functions have no own dynamic this binding." }
    ],
    lab: {
      title: "Build a predictable this demo",
      brief: "Create function readScore() returning this.score and const boundReadScore bound to { score: 42 }. Use a regular function so explicit binding works.",
      starter: `function readScore() {
  // return this.score
}
const scorer = { score: 42 };
// const boundReadScore = ...`,
      hint: "Use readScore.bind(scorer), then call boundReadScore(). The named function must not be an arrow.",
      checks: [
        { id: "this-binding-l1", description: "implicit binding reads the object", expression: "readScore.call(scorer) === 42" },
        { id: "this-binding-l2", description: "bind fixes the receiver", expression: "typeof boundReadScore === 'function' && boundReadScore() === 42" },
        { id: "this-binding-l3", description: "explicit binding can use another object", expression: "readScore.apply({score: 7}, []) === 7" }
      ]
    }
  }
];
