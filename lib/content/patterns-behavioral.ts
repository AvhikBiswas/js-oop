import type { Topic } from "../types";

export const behavioralTopics: Topic[] = [
  {
    slug: "observer-pattern",
    title: "Observer Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "The observer pattern lets a subject notify a list of listeners when its state or event changes.",
    remember: [
      "The subject owns a listeners array and controls notification timing.",
      "Observers subscribe with a callback and react to supplied data.",
      "Unsubscribe is important for avoiding stale listeners and leaks.",
      "The subject does not need to know the concrete observer classes.",
    ],
    theory: [
      { heading: "Publish and subscribe", body: "Observers register interest with a subject. When something happens, the subject publishes an event to every current listener." },
      { heading: "Loose event knowledge", body: "The subject sends data without calling application-specific methods on each observer. A callback or small update contract keeps the two sides independent." },
      { heading: "Lifecycle matters", body: "A subscribe method should often return an unsubscribe function. Removing a component's listener when it is destroyed prevents unexpected work later." },
    ],
    analogy: "A news service keeps a list of subscribers and sends each of them the next edition.",
    example: {
      title: "A tiny temperature subject",
      code: `class Temperature {
  constructor() { this.listeners = []; this.value = 0; }
  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter((item) => item !== listener); };
  }
  set(value) {
    this.value = value;
    this.listeners.forEach((listener) => listener(value));
  }
}
const temperature = new Temperature();
temperature.subscribe((value) => console.log("reading:" + value));
temperature.set(21);`,
      output: "reading:21",
    },
    extraExample: {
      title: "Function observer",
      code: `const listeners = [];
function watch(listener) { listeners.push(listener); }
function publish(value) { listeners.forEach((listener) => listener(value)); }
watch((value) => console.log(value * 2));
publish(4);`,
      output: "8",
    },
    pitfalls: [
      "Never removing listeners that belong to destroyed views or tasks.",
      "Letting one failing listener prevent all later listeners from receiving an event without deciding that policy.",
      "Making observers reach into subject internals instead of using the event payload.",
    ],
    playground: {
      starter: `class Score {
  constructor() { this.listeners = []; this.value = 0; }
  subscribe(listener) { this.listeners.push(listener); }
  set(value) {
    this.value = value;
    // notify listeners
  }
}`,
      goal: "Notify every listener with the new score whenever set is called.",
    },
    quiz: [
      { id: "observer-q1", question: "What does the subject store?", options: ["A list of listeners", "Only one subclass", "A CSS stylesheet", "A compiler"], answer: 0, explanation: "The subject keeps subscribers to notify later." },
      { id: "observer-q2", question: "Why return an unsubscribe function?", options: ["To remove stale listeners", "To create a singleton", "To freeze numbers", "To rename callbacks"], answer: 0, explanation: "Observers need a lifecycle-safe way to stop receiving updates." },
      { id: "observer-q3", question: "What does an observer usually receive?", options: ["An event payload", "The subject's private source code", "A new module", "A database schema"], answer: 0, explanation: "The subject publishes relevant data to each listener." },
    ],
    lab: {
      title: "Notify score listeners",
      brief: "Implement Score.set(value) so it stores value and calls every listener with it.",
      starter: `class Score {
  constructor() { this.listeners = []; this.value = 0; }
  subscribe(listener) { this.listeners.push(listener); }
  set(value) {
    this.value = value;
  }
}`,
      hint: "Use this.listeners.forEach(listener => listener(value)).",
      checks: [
        { id: "observer-l1", description: "score stores value", expression: "(function(){ const s=new Score(); s.set(7); return s.value===7; })()" },
        { id: "observer-l2", description: "one listener is called", expression: "(function(){ const s=new Score(); let seen=0; s.subscribe(v=>seen=v); s.set(9); return seen===9; })()" },
        { id: "observer-l3", description: "all listeners are called", expression: "(function(){ const s=new Score(); let n=0; s.subscribe(()=>n++); s.subscribe(()=>n++); s.set(1); return n===2; })()" },
      ],
    },
  },
  {
    slug: "strategy-pattern",
    title: "Strategy Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "A strategy packages one algorithm behind a shared operation so a context can swap algorithms without changing its core flow.",
    remember: [
      "Each strategy represents one interchangeable way to do a job.",
      "The context delegates instead of branching on every algorithm choice.",
      "Strategies are often plain objects or functions in JavaScript.",
      "Changing a strategy can happen at construction or during runtime.",
    ],
    theory: [
      { heading: "Algorithm family", body: "Sorting, pricing, validation, and routing often have several valid algorithms. Strategy gives each algorithm a focused implementation." },
      { heading: "Context delegation", body: "The context owns the workflow and asks its current strategy to perform the variable step. This keeps the workflow stable." },
      { heading: "Functions fit naturally", body: "Because functions are values, a JavaScript strategy may simply be a function passed into calculate or filter, without a class hierarchy." },
    ],
    analogy: "A navigation app keeps the trip the same but lets you choose driving, cycling, or walking directions.",
    example: {
      title: "Shipping price strategies",
      code: `const standard = (total) => total + 5;
const express = (total) => total + 15;
class Checkout {
  constructor(shippingStrategy) { this.shippingStrategy = shippingStrategy; }
  total(items) {
    const subtotal = items.reduce((sum, item) => sum + item, 0);
    return this.shippingStrategy(subtotal);
  }
}
console.log(new Checkout(express).total([10, 5]));`,
      output: "30",
    },
    extraExample: {
      title: "Swap a strategy",
      code: `const score = {
  strategy: (values) => Math.max(...values),
  calculate(values) { return this.strategy(values); },
};
console.log(score.calculate([2, 8]));
score.strategy = (values) => values.reduce((a, b) => a + b, 0);
console.log(score.calculate([2, 8]));`,
      output: "8\n10",
    },
    pitfalls: [
      "Keeping the algorithm choice as a large conditional inside the context.",
      "Giving strategies responsibilities beyond their one algorithm.",
      "Using incompatible argument and result shapes across strategies.",
    ],
    playground: {
      starter: `class Calculator {
  constructor(strategy) { this.strategy = strategy; }
  run(a, b) {
    // delegate to strategy
  }
}
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;`,
      goal: "Make Calculator.run use whichever arithmetic strategy was injected.",
    },
    quiz: [
      { id: "strategy-q1", question: "What does a strategy encapsulate?", options: ["One interchangeable algorithm", "Every application state", "Only a constructor", "A DOM node"], answer: 0, explanation: "A strategy packages one variation of an algorithm." },
      { id: "strategy-q2", question: "Who owns the stable workflow?", options: ["The context", "Each number", "The garbage collector", "The stylesheet"], answer: 0, explanation: "The context delegates only the variable part." },
      { id: "strategy-q3", question: "What is a JavaScript strategy often?", options: ["A function", "A module export keyword in student code", "A private field only", "A regular expression"], answer: 0, explanation: "First-class functions make compact strategies natural." },
    ],
    lab: {
      title: "Run arithmetic strategies",
      brief: "Implement Calculator.run(a, b) so it calls this.strategy(a, b).",
      starter: `class Calculator {
  constructor(strategy) { this.strategy = strategy; }
  run(a, b) { return 0; }
}
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;`,
      hint: "Return this.strategy(a, b).",
      checks: [
        { id: "strategy-l1", description: "addition strategy works", expression: "new Calculator(add).run(2, 3) === 5" },
        { id: "strategy-l2", description: "multiplication strategy works", expression: "new Calculator(multiply).run(2, 3) === 6" },
      ],
    },
  },
  {
    slug: "command-pattern",
    title: "Command Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A command turns an action into an object or function so it can be queued, logged, replayed, or undone.",
    remember: [
      "The command exposes an execute operation.",
      "The receiver performs the real domain work.",
      "An invoker schedules or triggers commands without knowing their internals.",
      "Undo commonly needs a matching undo method and saved prior state.",
    ],
    theory: [
      { heading: "Action as data", body: "A direct call happens immediately. A command represents that call, allowing a button, queue, or history list to hold it before execution." },
      { heading: "Three roles", body: "The command requests work, the receiver knows how to do it, and the invoker decides when to execute. Small examples can combine these roles without losing the separation." },
      { heading: "Undo and replay", body: "A command can record the old value before changing it. The same command shape can support undo stacks, retries, and audit logs." },
    ],
    analogy: "A restaurant ticket records an order so the kitchen can execute it later, instead of the waiter cooking directly.",
    example: {
      title: "Toggle a lamp",
      code: `class Lamp {
  constructor() { this.on = false; }
  switchOn() { this.on = true; }
  switchOff() { this.on = false; }
}
class SwitchOnCommand {
  constructor(lamp) { this.lamp = lamp; }
  execute() { this.lamp.switchOn(); }
  undo() { this.lamp.switchOff(); }
}
const lamp = new Lamp();
const command = new SwitchOnCommand(lamp);
command.execute();
console.log(lamp.on);
command.undo();
console.log(lamp.on);`,
      output: "true\nfalse",
    },
    extraExample: {
      title: "Queue commands",
      code: `const queue = [];
const values = [];
queue.push({ execute: () => values.push("A") });
queue.push({ execute: () => values.push("B") });
queue.forEach((command) => command.execute());
console.log(values.join("-"));`,
      output: "A-B",
    },
    pitfalls: [
      "Putting the receiver's entire domain model inside every command.",
      "Offering undo without recording enough state to restore the previous result.",
      "Calling execute while constructing the command and losing deferred behavior.",
    ],
    playground: {
      starter: `class Light {
  constructor() { this.on = false; }
  onLight() { this.on = true; }
}
class TurnOn {
  constructor(light) { this.light = light; }
  execute() {
    // call the receiver
  }
}`,
      goal: "Implement TurnOn.execute so an invoker can turn on an injected Light.",
    },
    quiz: [
      { id: "command-q1", question: "What does a command turn into an object?", options: ["An action", "A CSS rule", "A prototype chain", "A database"], answer: 0, explanation: "The action becomes a value that can be stored and triggered." },
      { id: "command-q2", question: "Who performs domain work?", options: ["The receiver", "The invoker only", "The queue array", "The constructor name"], answer: 0, explanation: "The receiver owns the actual operation." },
      { id: "command-q3", question: "What does undo require?", options: ["Enough prior state to restore", "A random new object", "No receiver", "A different language"], answer: 0, explanation: "Undo must know what value or effect to reverse." },
    ],
    lab: {
      title: "Command a light",
      brief: "Implement TurnOn.execute() to call light.onLight(), then create a command and execute it.",
      starter: `class Light {
  constructor() { this.on = false; }
  onLight() { this.on = true; }
}
class TurnOn {
  constructor(light) { this.light = light; }
  execute() {}
}`,
      hint: "The command should delegate to this.light.onLight().",
      checks: [
        { id: "command-l1", description: "command has execute", expression: "typeof new TurnOn(new Light()).execute === 'function'" },
        { id: "command-l2", description: "execute changes receiver", expression: "(function(){ const l=new Light(); new TurnOn(l).execute(); return l.on===true; })()" },
      ],
    },
  },
  {
    slug: "state-pattern",
    title: "State Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "intermediate",
    summary: "The state pattern moves state-specific behavior into objects so a context changes behavior by changing its current state.",
    remember: [
      "The context delegates current behavior to its state object.",
      "A transition replaces the current state.",
      "State objects can decide what the next state should be.",
      "This replaces sprawling conditionals over a state field.",
    ],
    theory: [
      { heading: "Behavior follows state", body: "An audio player may respond differently to play while stopped, playing, or paused. State objects each implement the same event operation." },
      { heading: "Context as host", body: "The context stores the current state and passes itself to state methods when a transition is needed. The outside API remains stable." },
      { heading: "Explicit transitions", body: "State classes make legal transitions visible. Invalid actions can return a message or do nothing rather than being hidden in nested if statements." },
    ],
    analogy: "A traffic light responds differently to the same passing car depending on whether it is red, yellow, or green.",
    example: {
      title: "A tiny media player",
      code: `class Stopped {
  play(player) { player.state = new Playing(); return "playing"; }
}
class Playing {
  play() { return "already playing"; }
  stop(player) { player.state = new Stopped(); return "stopped"; }
}
class Player {
  constructor() { this.state = new Stopped(); }
  play() { return this.state.play(this); }
  stop() { return this.state.stop ? this.state.stop(this) : "already stopped"; }
}
const player = new Player();
console.log(player.play(), player.play(), player.stop());`,
      output: "playing already playing stopped",
    },
    extraExample: {
      title: "Door states",
      code: `const open = { close(door) { door.state = closed; return "closed"; } };
const closed = { open(door) { door.state = open; return "open"; } };
const door = { state: closed, open() { return this.state.open(this); }, close() { return this.state.close(this); } };
console.log(door.open(), door.close());`,
      output: "open closed",
    },
    pitfalls: [
      "Keeping every state branch in the context and only naming classes State.",
      "Changing state without deciding how the triggering event should complete.",
      "Letting state objects mutate unrelated global data.",
    ],
    playground: {
      starter: `class Locked {
  unlock(door) { door.state = new Unlocked(); return "unlocked"; }
}
class Unlocked {
  lock(door) { door.state = new Locked(); return "locked"; }
}
class Door {
  constructor() { this.state = new Locked(); }
  unlock() { return this.state.unlock(this); }
  lock() { return this.state.lock(this); }
}`,
      goal: "Add safe delegation fallbacks or use the state methods so Door toggles between locked and unlocked.",
    },
    quiz: [
      { id: "state-q1", question: "Where does state-specific behavior live?", options: ["In state objects", "Only in a global if", "In a stylesheet", "In the constructor name"], answer: 0, explanation: "Each state object handles behavior appropriate to that state." },
      { id: "state-q2", question: "What changes during a transition?", options: ["The context's current state", "The JavaScript language", "Every listener", "The object's prototype permanently"], answer: 0, explanation: "The context replaces its state object." },
      { id: "state-q3", question: "What problem does State reduce?", options: ["State-based conditional sprawl", "All object allocation", "All event delivery", "Every function call"], answer: 0, explanation: "Behavior moves out of large conditionals." },
    ],
    lab: {
      title: "Toggle a door state",
      brief: "Use Locked and Unlocked to make Door.unlock() and Door.lock() transition the context and return their messages.",
      starter: `class Locked {
  unlock(door) { door.state = new Unlocked(); return "unlocked"; }
}
class Unlocked {
  lock(door) { door.state = new Locked(); return "locked"; }
}
class Door {
  constructor() { this.state = new Locked(); }
  unlock() { return this.state.unlock(this); }
  lock() { return this.state.lock(this); }
}`,
      hint: "The supplied transitions already show the context replacement; test the two calls in sequence.",
      checks: [
        { id: "state-l1", description: "door unlocks", expression: "(function(){ const d=new Door(); return d.unlock()==='unlocked' && d.state instanceof Unlocked; })()" },
        { id: "state-l2", description: "door locks again", expression: "(function(){ const d=new Door(); d.unlock(); return d.lock()==='locked' && d.state instanceof Locked; })()" },
      ],
    },
  },
  {
    slug: "template-method-pattern",
    title: "Template Method Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A template method fixes an algorithm's overall steps while allowing subclasses or callbacks to customize selected steps.",
    remember: [
      "The template owns the invariant order of operations.",
      "Variation points are small hooks such as prepare or format.",
      "Subclasses customize hooks rather than rewriting the whole algorithm.",
      "The pattern prevents duplicate workflow sequencing.",
    ],
    theory: [
      { heading: "Fixed skeleton", body: "A report process may always load, format, and deliver. The base method calls those steps in order while a child supplies the format." },
      { heading: "Hooks", body: "Hooks are methods intended for variation. A default hook can provide sensible behavior so a subclass only overrides what it needs." },
      { heading: "Composition alternative", body: "JavaScript can express the same idea with a function receiving step callbacks. Use that when inheritance would add more structure than the workflow needs." },
    ],
    analogy: "A recipe fixes the sequence of prepare, cook, and serve while allowing different ingredients in the prepare step.",
    example: {
      title: "Export a report",
      code: `class ReportExporter {
  export(data) {
    const loaded = this.load(data);
    const formatted = this.format(loaded);
    return this.deliver(formatted);
  }
  load(data) { return data; }
  format(data) { return String(data); }
  deliver(data) { return "sent:" + data; }
}
class JsonExporter extends ReportExporter {
  format(data) { return JSON.stringify(data); }
}
console.log(new JsonExporter().export({ total: 4 }));`,
      output: "sent:{\"total\":4}",
    },
    extraExample: {
      title: "Callback template",
      code: `function process(value, format, finish) {
  return finish(format(value));
}
console.log(process("go", (v) => v.toUpperCase(), (v) => "done:" + v));`,
      output: "done:GO",
    },
    pitfalls: [
      "Allowing subclasses to reorder the core steps that must stay invariant.",
      "Making hooks too broad so every subclass duplicates the base algorithm.",
      "Forcing inheritance when simple callbacks would be clearer.",
    ],
    playground: {
      starter: `class Beverage {
  make() {
    // boil, brew, and serve in order
  }
  boil() { return "boil"; }
  brew() { return "brew"; }
  serve() { return "serve"; }
}`,
      goal: "Implement make() to return the three step results joined by ' -> '.",
    },
    quiz: [
      { id: "template-q1", question: "What does the template method fix?", options: ["The algorithm step order", "Every subclass field", "The module path", "The output color"], answer: 0, explanation: "The base workflow controls invariant sequencing." },
      { id: "template-q2", question: "What is a hook?", options: ["A customization point", "A database connection", "A private variable name", "A loop keyword"], answer: 0, explanation: "Subclasses or callbacks customize selected hooks." },
      { id: "template-q3", question: "What can replace inheritance in JavaScript?", options: ["Step callbacks", "More global state", "A random proxy", "A JSON comment"], answer: 0, explanation: "Functions can receive the variable steps directly." },
    ],
    lab: {
      title: "Prepare a beverage",
      brief: "Implement Beverage.make() to run boil, brew, and serve in order and return their messages.",
      starter: `class Beverage {
  make() { return ""; }
  boil() { return "boil"; }
  brew() { return "brew"; }
  serve() { return "serve"; }
}`,
      hint: "Call each hook in the required order and join the returned strings.",
      checks: [
        { id: "template-l1", description: "template has fixed sequence", expression: "new Beverage().make() === 'boil -> brew -> serve'" },
        { id: "template-l2", description: "subclass can customize a hook", expression: "(function(){ class Tea extends Beverage { brew(){ return 'steep'; } } return new Tea().make()==='boil -> steep -> serve'; })()" },
      ],
    },
  },
  {
    slug: "iterator-pattern",
    title: "Iterator Pattern",
    sectionId: "design-patterns",
    minutes: 8,
    level: "beginner",
    summary: "An iterator provides a standard way to visit collection items one at a time without exposing collection storage.",
    remember: [
      "next returns an object with value and done.",
      "done becomes true after the sequence is exhausted.",
      "The consumer controls traversal timing.",
      "JavaScript's Symbol.iterator protocol powers for...of.",
    ],
    theory: [
      { heading: "Traversal contract", body: "The iterator protocol separates how a collection stores data from how a caller visits it. Each next call advances one position." },
      { heading: "Iterable versus iterator", body: "An iterator has next. An iterable has Symbol.iterator that returns an iterator. Arrays provide both, which is why for...of works." },
      { heading: "Custom collections", body: "A class can expose a generator or a hand-written iterator to hide indexes, trees, or filtered data behind the same traversal experience." },
    ],
    analogy: "A museum guide hands visitors the next exhibit ticket one at a time without exposing the storage room.",
    example: {
      title: "A range iterator",
      code: `function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          return current <= end
            ? { value: current++, done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}
console.log([...range(2, 4)].join(","));`,
      output: "2,3,4",
    },
    extraExample: {
      title: "Generator iterator",
      code: `function* letters() {
  yield "a";
  yield "b";
}
const iterator = letters();
console.log(iterator.next().value, iterator.next().value, iterator.next().done);`,
      output: "a b true",
    },
    pitfalls: [
      "Returning a value without the required next method from Symbol.iterator.",
      "Forgetting to return done: true after the final item.",
      "Exposing internal indexes when the collection should be free to change storage.",
    ],
    playground: {
      starter: `class Countdown {
  constructor(start) { this.start = start; }
  *[Symbol.iterator]() {
    // yield start down to 1
  }
}`,
      goal: "Make Countdown iterable so [...new Countdown(3)] produces [3, 2, 1].",
    },
    quiz: [
      { id: "iterator-q1", question: "What does next return?", options: ["A value/done result object", "Only a string", "A class definition", "A Promise always"], answer: 0, explanation: "The iterator protocol uses { value, done }." },
      { id: "iterator-q2", question: "Which protocol enables for...of?", options: ["Symbol.iterator", "Symbol.toStringTag only", "JSON.parse", "Object.freeze"], answer: 0, explanation: "for...of asks an iterable for its Symbol.iterator method." },
      { id: "iterator-q3", question: "What is a generator useful for?", options: ["Writing an iterator with yield", "Making every object immutable", "Creating a singleton automatically", "Replacing constructors"], answer: 0, explanation: "Generators produce iterator objects naturally." },
    ],
    lab: {
      title: "Iterate a countdown",
      brief: "Implement Countdown's generator so it yields every integer from start down to one.",
      starter: `class Countdown {
  constructor(start) { this.start = start; }
  *[Symbol.iterator]() {}
}`,
      hint: "Use a for loop from this.start down to 1 and yield each value.",
      checks: [
        { id: "iterator-l1", description: "three values are yielded", expression: "JSON.stringify([...new Countdown(3)]) === '[3,2,1]'" },
        { id: "iterator-l2", description: "one value is yielded", expression: "JSON.stringify([...new Countdown(1)]) === '[1]'" },
      ],
    },
  },
  {
    slug: "mediator-pattern",
    title: "Mediator Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A mediator coordinates collaborating objects so they communicate through one central colleague instead of many direct links.",
    remember: [
      "Colleagues send requests to the mediator.",
      "The mediator knows the coordination rule.",
      "Direct colleague-to-colleague dependencies become fewer.",
      "A mediator should stay focused or it becomes a god object.",
    ],
    theory: [
      { heading: "Central coordination", body: "A dialog mediator can tell a submit button to enable when a text field has content. The field does not need to know the button directly." },
      { heading: "Colleagues stay simpler", body: "Each participant reports an event to the mediator. The mediator decides which other participant should respond." },
      { heading: "Balance the center", body: "The pattern trades many small links for central logic. Split mediators by workflow when the coordination rules become unrelated." },
    ],
    analogy: "An air-traffic controller coordinates planes so pilots do not negotiate directly with every other plane.",
    example: {
      title: "Coordinate a chat room",
      code: `class ChatMediator {
  constructor() { this.users = []; }
  add(user) { this.users.push(user); user.mediator = this; }
  broadcast(sender, message) {
    this.users.filter((user) => user !== sender)
      .forEach((user) => user.receive(sender.name + ": " + message));
  }
}
class User {
  constructor(name) { this.name = name; this.messages = []; }
  send(message) { this.mediator.broadcast(this, message); }
  receive(message) { this.messages.push(message); }
}
const chat = new ChatMediator();
const ada = new User("Ada");
const lin = new User("Lin");
chat.add(ada); chat.add(lin); ada.send("hi");
console.log(lin.messages[0]);`,
      output: "Ada: hi",
    },
    extraExample: {
      title: "Form mediator",
      code: `const form = {
  email: "",
  submit: { enabled: false },
  changed() { this.submit.enabled = this.email.includes("@"); },
};
form.email = "a@example.com";
form.changed();
console.log(form.submit.enabled);`,
      output: "true",
    },
    pitfalls: [
      "Allowing colleagues to keep direct links that bypass the mediator's rules.",
      "Putting every application interaction into one unmaintainable mediator.",
      "Making the mediator own data that belongs to a colleague.",
    ],
    playground: {
      starter: `class Hub {
  constructor() { this.messages = []; }
  send(message) { this.messages.push(message); }
}
class Sender {
  constructor(hub) { this.hub = hub; }
  send(message) {
    // use the mediator
  }
}`,
      goal: "Make Sender communicate through Hub.send rather than storing its own message list.",
    },
    quiz: [
      { id: "mediator-q1", question: "What does the mediator reduce?", options: ["Direct colleague links", "All object behavior", "The need for methods", "Every collection"], answer: 0, explanation: "Participants communicate through central coordination." },
      { id: "mediator-q2", question: "Who decides what happens after a colleague event?", options: ["The mediator", "The garbage collector", "A random observer", "The module loader"], answer: 0, explanation: "Coordination rules live at the mediator." },
      { id: "mediator-q3", question: "What is a risk of one huge mediator?", options: ["It becomes a god object", "It cannot receive messages", "It creates no links", "It stops JavaScript"], answer: 0, explanation: "Unrelated coordination should not accumulate in one center." },
    ],
    lab: {
      title: "Send through a hub",
      brief: "Implement Sender.send(message) by forwarding the message to its injected Hub.",
      starter: `class Hub {
  constructor() { this.messages = []; }
  send(message) { this.messages.push(message); }
}
class Sender {
  constructor(hub) { this.hub = hub; }
  send(message) {}
}`,
      hint: "Call this.hub.send(message).",
      checks: [
        { id: "mediator-l1", description: "sender uses hub", expression: "(function(){ const h=new Hub(); new Sender(h).send('go'); return h.messages[0]==='go'; })()" },
        { id: "mediator-l2", description: "hub receives multiple messages", expression: "(function(){ const h=new Hub(), s=new Sender(h); s.send('a'); s.send('b'); return h.messages.length===2; })()" },
      ],
    },
  },
  {
    slug: "chain-of-responsibility-pattern",
    title: "Chain of Responsibility Pattern",
    sectionId: "design-patterns",
    minutes: 10,
    level: "intermediate",
    summary: "A chain passes a request through handlers until one handles it or the chain ends.",
    remember: [
      "Each handler decides whether it can handle a request.",
      "A handler can forward to its next handler.",
      "The sender does not need to know which handler will respond.",
      "Chain order affects which handler gets the first opportunity.",
    ],
    theory: [
      { heading: "Pass or handle", body: "A request enters the first handler. If it does not match, the handler delegates to next. This keeps each rule focused." },
      { heading: "Building the link", body: "A setNext method can return the next handler for fluent setup, while handle returns a result or forwards the request." },
      { heading: "Useful pipelines", body: "Approval levels, middleware, support escalation, and validation rules are common chains. Stop at the first match when handlers are exclusive." },
    ],
    analogy: "A help-desk ticket moves from the front desk to a specialist and then to a manager until someone can solve it.",
    example: {
      title: "Approval chain",
      code: `class Approver {
  constructor(limit, name) { this.limit = limit; this.name = name; this.next = null; }
  setNext(handler) { this.next = handler; return handler; }
  approve(amount) {
    if (amount <= this.limit) return this.name + " approved";
    return this.next ? this.next.approve(amount) : "denied";
  }
}
const team = new Approver(100, "team");
team.setNext(new Approver(1000, "manager"));
console.log(team.approve(500));`,
      output: "manager approved",
    },
    extraExample: {
      title: "Validation chain",
      code: `const rules = [
  (value) => value ? null : "required",
  (value) => value.length >= 3 ? null : "too short",
];
function validate(value) {
  for (const rule of rules) { const error = rule(value); if (error) return error; }
  return "ok";
}
console.log(validate("yes"));`,
      output: "ok",
    },
    pitfalls: [
      "Forgetting a terminal result when no handler can process the request.",
      "Creating an accidental cycle that never reaches the end.",
      "Relying on chain order without documenting which handler has priority.",
    ],
    playground: {
      starter: `class Handler {
  constructor(kind) { this.kind = kind; this.next = null; }
  setNext(next) { this.next = next; return next; }
  handle(request) {
    // handle matching kind or pass on
  }
}`,
      goal: "Return 'handled' for a matching request kind and otherwise forward or return 'unhandled'.",
    },
    quiz: [
      { id: "chain-q1", question: "What can a handler do when it cannot help?", options: ["Forward to next", "Delete the request silently always", "Change the language", "Create every handler"], answer: 0, explanation: "Forwarding lets another handler take responsibility." },
      { id: "chain-q2", question: "What affects first-handling priority?", options: ["Chain order", "Variable spelling", "Object color", "Array holes only"], answer: 0, explanation: "The first matching handler in the chain gets the request." },
      { id: "chain-q3", question: "What should happen at chain end?", options: ["A defined fallback result", "An infinite loop", "An unrelated request", "A hidden constructor"], answer: 0, explanation: "A terminal result makes unhandled requests explicit." },
    ],
    lab: {
      title: "Handle request kinds",
      brief: "Complete Handler.handle(request) to process matching kinds or forward to next.",
      starter: `class Handler {
  constructor(kind) { this.kind = kind; this.next = null; }
  setNext(next) { this.next = next; return next; }
  handle(request) { return ""; }
}`,
      hint: "If request.kind matches this.kind return 'handled'; otherwise use next?.handle(request) || 'unhandled'.",
      checks: [
        { id: "chain-l1", description: "matching handler responds", expression: "new Handler('a').handle({kind:'a'}) === 'handled'" },
        { id: "chain-l2", description: "request forwards", expression: "(function(){ const a=new Handler('a'), b=new Handler('b'); a.setNext(b); return a.handle({kind:'b'})==='handled'; })()" },
        { id: "chain-l3", description: "chain has fallback", expression: "new Handler('a').handle({kind:'z'}) === 'unhandled'" },
      ],
    },
  },
  {
    slug: "visitor-pattern",
    title: "Visitor Pattern",
    sectionId: "design-patterns",
    minutes: 11,
    level: "advanced",
    summary: "A visitor adds operations to a stable object structure by letting each element dispatch to a matching visitor method.",
    remember: [
      "Elements accept a visitor and call the appropriate visit method.",
      "The visitor owns an operation across several element types.",
      "Adding a new operation is easier; adding a new element type touches visitors.",
      "The accept plus visit pairing is called double dispatch.",
    ],
    theory: [
      { heading: "Separate operation from structure", body: "An expression tree can support printing, evaluation, and counting without putting every operation into every node class." },
      { heading: "Double dispatch", body: "element.accept(visitor) chooses the element's type-specific method, such as visitor.visitNumber(this). The visitor then sees the concrete element." },
      { heading: "Tradeoff", body: "Visitors work well when the element hierarchy is stable and operations change often. A simple polymorphic method is easier when new element types are frequent." },
    ],
    analogy: "Different museum exhibits welcome a specialist guide by calling the guide's matching explanation for that exhibit.",
    example: {
      title: "Visit shapes for labels",
      code: `class Circle {
  constructor(radius) { this.radius = radius; }
  accept(visitor) { return visitor.visitCircle(this); }
}
class Square {
  constructor(size) { this.size = size; }
  accept(visitor) { return visitor.visitSquare(this); }
}
class LabelVisitor {
  visitCircle(circle) { return "circle:" + circle.radius; }
  visitSquare(square) { return "square:" + square.size; }
}
const visitor = new LabelVisitor();
console.log([new Circle(2), new Square(3)].map((shape) => shape.accept(visitor)).join(", "));`,
      output: "circle:2, square:3",
    },
    extraExample: {
      title: "Visitor sums nodes",
      code: `const number = (value) => ({ value, accept(visitor) { return visitor.number(this); } });
const sumVisitor = { total: 0, number(node) { this.total += node.value; return this.total; } };
number(4).accept(sumVisitor);
number(5).accept(sumVisitor);
console.log(sumVisitor.total);`,
      output: "9",
    },
    pitfalls: [
      "Adding a new element class without adding the visitor method it requires.",
      "Using visitors for a tiny operation that belongs naturally on the element.",
      "Allowing visitors to mutate the structure without a clear ownership rule.",
    ],
    playground: {
      starter: `class Circle {
  constructor(radius) { this.radius = radius; }
  accept(visitor) {
    // call the circle-specific visitor method
  }
}
class AreaVisitor {
  visitCircle(circle) { return Math.PI * circle.radius ** 2; }
}`,
      goal: "Implement accept so AreaVisitor can calculate a Circle's area.",
    },
    quiz: [
      { id: "visitor-q1", question: "What does accept usually call?", options: ["A matching visit method", "The garbage collector", "Every constructor", "A random handler"], answer: 0, explanation: "The element dispatches to the visitor operation for its type." },
      { id: "visitor-q2", question: "When is Visitor a good fit?", options: ["Stable elements and changing operations", "Constantly changing element types only", "No object structure", "One arithmetic expression"], answer: 0, explanation: "Visitors make new cross-cutting operations easy on a stable structure." },
      { id: "visitor-q3", question: "What is a tradeoff?", options: ["New element types require visitor updates", "Visitors cannot return values", "Visitors cannot use classes", "All operations disappear"], answer: 0, explanation: "Every visitor must account for each supported element type." },
    ],
    lab: {
      title: "Visit a circle",
      brief: "Implement Circle.accept(visitor) by calling visitor.visitCircle(this).",
      starter: `class Circle {
  constructor(radius) { this.radius = radius; }
  accept(visitor) { return 0; }
}
class AreaVisitor {
  visitCircle(circle) { return Math.PI * circle.radius ** 2; }
}`,
      hint: "Return visitor.visitCircle(this).",
      checks: [
        { id: "visitor-l1", description: "visitor receives circle", expression: "new Circle(2).accept(new AreaVisitor()) === Math.PI * 4" },
        { id: "visitor-l2", description: "accept uses the visitor", expression: "(function(){ const v={visitCircle:c=>'r'+c.radius}; return new Circle(3).accept(v)==='r3'; })()" },
      ],
    },
  },
  {
    slug: "memento-pattern",
    title: "Memento Pattern",
    sectionId: "design-patterns",
    minutes: 9,
    level: "intermediate",
    summary: "A memento captures an object's state so it can be restored later without exposing the object's internal representation.",
    remember: [
      "The originator creates and restores snapshots.",
      "A caretaker stores snapshots but does not edit their internals.",
      "Snapshots should copy mutable state that must be independent.",
      "Undo is a common use, but checkpoints and drafts also fit.",
    ],
    theory: [
      { heading: "Snapshot boundary", body: "The originator knows which fields form valid state. It creates a memento and later consumes one to restore itself." },
      { heading: "Caretaker role", body: "A history array can store mementos without understanding their fields. This keeps representation knowledge inside the originator." },
      { heading: "Copy versus reference", body: "If a snapshot stores a mutable array by reference, later edits change the supposed past. Copy the required state at save time." },
    ],
    analogy: "A game checkpoint records the player's position and inventory so the game can return to that moment.",
    example: {
      title: "Undo a text editor",
      code: `class Editor {
  constructor() { this.text = ""; }
  type(text) { this.text += text; }
  save() { return { text: this.text }; }
  restore(memento) { this.text = memento.text; }
}
const editor = new Editor();
editor.type("Hi");
const checkpoint = editor.save();
editor.type(" there");
editor.restore(checkpoint);
console.log(editor.text);`,
      output: "Hi",
    },
    extraExample: {
      title: "History caretaker",
      code: `const history = [];
const documentState = { value: "one", save() { return { value: this.value }; }, restore(m) { this.value = m.value; } };
history.push(documentState.save());
documentState.value = "two";
documentState.restore(history.pop());
console.log(documentState.value);`,
      output: "one",
    },
    pitfalls: [
      "Saving a reference to mutable state instead of a snapshot copy.",
      "Letting the caretaker modify private details of the memento.",
      "Keeping unlimited history without a memory or retention policy.",
    ],
    playground: {
      starter: `class Counter {
  constructor() { this.value = 0; }
  increment() { this.value += 1; }
  save() {
    // return a snapshot
  }
  restore(snapshot) {
    // restore the snapshot
  }
}`,
      goal: "Implement save and restore so a counter can undo a later increment.",
    },
    quiz: [
      { id: "memento-q1", question: "Who creates a valid snapshot?", options: ["The originator", "The caretaker's array", "The browser", "A random observer"], answer: 0, explanation: "The originator understands its own valid state." },
      { id: "memento-q2", question: "What does a caretaker usually do?", options: ["Store snapshots", "Interpret every private field", "Run all business logic", "Replace the originator"], answer: 0, explanation: "The caretaker manages history without needing representation details." },
      { id: "memento-q3", question: "Why copy mutable state?", options: ["To preserve the past", "To make history live", "To remove restore", "To force inheritance"], answer: 0, explanation: "A snapshot must not change when current state changes." },
    ],
    lab: {
      title: "Save a counter checkpoint",
      brief: "Implement Counter.save() and Counter.restore(snapshot) using the value field.",
      starter: `class Counter {
  constructor() { this.value = 0; }
  increment() { this.value += 1; }
  save() { return {}; }
  restore(snapshot) { this.value = 0; }
}`,
      hint: "save returns { value: this.value }; restore assigns snapshot.value.",
      checks: [
        { id: "memento-l1", description: "save captures value", expression: "(function(){ const c=new Counter(); c.increment(); return c.save().value===1; })()" },
        { id: "memento-l2", description: "restore returns to checkpoint", expression: "(function(){ const c=new Counter(); c.increment(); const s=c.save(); c.increment(); c.restore(s); return c.value===1; })()" },
      ],
    },
  },
];
