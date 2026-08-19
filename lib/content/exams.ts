import type { LabCheck, QuizQuestion } from "../types";
import { topicsForSection } from "./index";

export type SectionExam = {
  quiz: QuizQuestion[];
  lab: {
    title: string;
    brief: string;
    starter: string;
    hint: string;
    checks: LabCheck[];
  };
  playground: string;
};

const labs: Record<string, SectionExam["lab"] & { playground: string }> = {
  "objects-classes": {
    title: "Build a BankAccount class",
    brief: "Create class BankAccount with constructor(owner, balance), instance method deposit(amount) that adds to balance, and static method bankName() returning 'OOP Bank'.",
    starter: `class BankAccount {
  // constructor(owner, balance)
  // deposit(amount)
  // static bankName()
}
`,
    hint: "Use this.owner and this.balance in the constructor. Static methods hang on the class, not this.",
    checks: [
      { id: "c1", description: "Creates an instance with owner and balance", expression: "new BankAccount('Ada', 10).owner === 'Ada' && new BankAccount('Ada', 10).balance === 10" },
      { id: "c2", description: "deposit increases balance and returns it", expression: "(function(){ const a = new BankAccount('Ada', 10); return a.deposit(5) === 15 && a.balance === 15; })()" },
      { id: "c3", description: "static bankName returns OOP Bank", expression: "BankAccount.bankName() === 'OOP Bank'" },
    ],
    playground: `class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }
  static bankName() {
    return "OOP Bank";
  }
}
const a = new BankAccount("Ada", 40);
console.log(a.deposit(10), BankAccount.bankName());
`,
  },
  prototypes: {
    title: "Wire a prototype chain",
    brief: "Create function Animal(name) assigning this.name. Put Animal.prototype.speak so it returns name + ' speaks'. Then function Dog(name) calling Animal.call(this, name). Set Dog.prototype to Object.create(Animal.prototype) and Dog.prototype.constructor = Dog. Add Dog.prototype.speak returning name + ' barks'.",
    starter: `function Animal(name) {}
function Dog(name) {}
`,
    hint: "Dog.prototype = Object.create(Animal.prototype) then restore constructor.",
    checks: [
      { id: "c1", description: "Dog instance is an Animal", expression: "new Dog('Rex') instanceof Animal" },
      { id: "c2", description: "Dog speak overrides", expression: "new Dog('Rex').speak() === 'Rex barks'" },
      { id: "c3", description: "Animal speak still works", expression: "new Animal('Mo').speak() === 'Mo speaks'" },
    ],
    playground: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + " speaks"; };
function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () { return this.name + " barks"; };
console.log(new Dog("Rex").speak());
`,
  },
  inheritance: {
    title: "Single + mixin inheritance",
    brief: "class Vehicle { constructor(brand) { this.brand = brand } }. class Car extends Vehicle { drive() { return this.brand + ' driving' } }. Also function withHonk(Base) { return class extends Base { honk() { return 'beep' } } } and class Taxi extends withHonk(Car) {}.",
    starter: `class Vehicle {}
class Car {}
function withHonk(Base) { return class extends Base {}; }
class Taxi {}
`,
    hint: "Taxi should extend the class returned by withHonk(Car).",
    checks: [
      { id: "c1", description: "Car inherits brand", expression: "new Car('Toyota').brand === 'Toyota' && new Car('Toyota').drive() === 'Toyota driving'" },
      { id: "c2", description: "Taxi is a Car and can honk", expression: "new Taxi('Nissan') instanceof Car && new Taxi('Nissan').honk() === 'beep'" },
    ],
    playground: `class Vehicle { constructor(brand) { this.brand = brand; } }
class Car extends Vehicle { drive() { return this.brand + " driving"; } }
console.log(new Car("Toyota").drive());
`,
  },
  polymorphism: {
    title: "Many shapes, one area()",
    brief: "Create class Shape { area() { return 0 } }, class Rect extends Shape { constructor(w,h){ super(); this.w=w; this.h=h;} area(){ return this.w*this.h } }, class Circle extends Shape { constructor(r){ super(); this.r=r;} area(){ return Math.PI*this.r*this.r } }, and function total(shapes) summing shape.area().",
    starter: `class Shape {}
class Rect {}
class Circle {}
function total(shapes) { return 0; }
`,
    hint: "Call area() on each item. Duck typing means you only need area().",
    checks: [
      { id: "c1", description: "Rect area is w*h", expression: "new Rect(3,4).area() === 12" },
      { id: "c2", description: "total sums mixed shapes", expression: "Math.abs(total([new Rect(2,2), new Circle(1)]) - (4 + Math.PI)) < 1e-8" },
      { id: "c3", description: "Rect is a Shape", expression: "new Rect(1,1) instanceof Shape" },
    ],
    playground: `class Shape { area() { return 0; } }
class Rect extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}
console.log(new Rect(3, 4).area());
`,
  },
  encapsulation: {
    title: "Private balance with getter",
    brief: "class Wallet { #cents = 0; constructor(cents){ this.#cents = cents; } get dollars(){ return this.#cents/100 } set dollars(v){ if (v < 0) throw new Error('neg'); this.#cents = v*100 } add(cents){ this.#cents += cents; return this.#cents } }",
    starter: `class Wallet {
  // private #cents, constructor, dollars getter/setter, add(cents)
}
`,
    hint: "Declare #cents as a class field. Getters use get dollars().",
    checks: [
      { id: "c1", description: "getter reports dollars", expression: "new Wallet(250).dollars === 2.5" },
      { id: "c2", description: "add mutates private cents", expression: "new Wallet(100).add(50) === 150" },
      { id: "c3", description: "private field is not enumerable public cents", expression: "!Object.hasOwn(new Wallet(1), 'cents') && !Object.hasOwn(new Wallet(1), '#cents')" },
    ],
    playground: `class Wallet {
  #cents = 0;
  constructor(cents) { this.#cents = cents; }
  get dollars() { return this.#cents / 100; }
}
console.log(new Wallet(500).dollars);
`,
  },
  abstraction: {
    title: "Hide payment internals",
    brief: "Create function createPaymentPort(gateway) returning { pay(amount) { return gateway.charge(amount) } }. class StripeLike { charge(amount) { return 'charged:' + amount } }. const api = createPaymentPort(new StripeLike()). Callers only use api.pay.",
    starter: `function createPaymentPort(gateway) { return {}; }
class StripeLike {}
const api = createPaymentPort(new StripeLike());
`,
    hint: "pay should delegate to gateway.charge.",
    checks: [
      { id: "c1", description: "api.pay abstracts the gateway", expression: "api.pay(9) === 'charged:9'" },
      { id: "c2", description: "port is not the gateway class instance", expression: "!(api instanceof StripeLike)" },
    ],
    playground: `function createPaymentPort(gateway) {
  return { pay(amount) { return gateway.charge(amount); } };
}
console.log(createPaymentPort({ charge: (n) => "charged:" + n }).pay(4));
`,
  },
  "super-parent": {
    title: "Initialize child through super",
    brief: "class Person { constructor(name){ this.name = name; this.kind = 'person'; } label(){ return this.kind + ':' + this.name } } class Hero extends Person { constructor(name, power){ super(name); this.power = power; this.kind = 'hero'; } label(){ return super.label() + ' ' + this.power } }",
    starter: `class Person {}
class Hero {}
`,
    hint: "Call super(name) before using this. Child label can call super.label().",
    checks: [
      { id: "c1", description: "Hero has name and power", expression: "new Hero('Ada','code').name === 'Ada' && new Hero('Ada','code').power === 'code'" },
      { id: "c2", description: "label uses parent + power", expression: "new Hero('Ada','code').label() === 'hero:Ada code'" },
    ],
    playground: `class Person {
  constructor(name) { this.name = name; }
  hello() { return "hi " + this.name; }
}
class Hero extends Person {
  hello() { return super.hello() + "!"; }
}
console.log(new Hero("Ada").hello());
`,
  },
  "object-utilities": {
    title: "Inspect and lock an object",
    brief: "function inspect(obj, proto) returns { own: Object.hasOwn(obj,'id'), fromProto: proto.isPrototypeOf(obj), frozen: Object.isFrozen(obj) }. Also function freezeScore(obj) { Object.freeze(obj); return obj; }",
    starter: `function inspect(obj, proto) { return {}; }
function freezeScore(obj) { return obj; }
`,
    hint: "Use Object.hasOwn, isPrototypeOf, Object.freeze, Object.isFrozen.",
    checks: [
      { id: "c1", description: "inspect own vs proto", expression: "(function(){ const p={}; const o=Object.create(p); o.id=1; const r=inspect(o,p); return r.own===true && r.fromProto===true && r.frozen===false; })()" },
      { id: "c2", description: "freezeScore freezes", expression: "Object.isFrozen(freezeScore({n:1}))" },
    ],
    playground: `const proto = { kind: "node" };
const o = Object.create(proto);
o.id = 7;
console.log(Object.hasOwn(o, "id"), proto.isPrototypeOf(o));
Object.freeze(o);
console.log(Object.isFrozen(o));
`,
  },
  "function-oop": {
    title: "Factory vs constructor vs bind",
    brief: "function makeUser(name){ return { name, hi(){ return 'hi '+this.name } } }. function User(name){ this.name=name } User.prototype.hi = function(){ return 'hi '+this.name }. function greet(prefix){ return prefix+' '+this.name }. bindGreet(obj) returns greet.bind(obj,'hey').",
    starter: `function makeUser(name) { return {}; }
function User(name) {}
function greet(prefix) { return prefix; }
function bindGreet(obj) { return function () {}; }
`,
    hint: "bindGreet should return greet.bind(obj, 'hey').",
    checks: [
      { id: "c1", description: "factory hi works", expression: "makeUser('Ada').hi() === 'hi Ada'" },
      { id: "c2", description: "constructor + new works", expression: "new User('Ada').hi() === 'hi Ada'" },
      { id: "c3", description: "bindGreet locks this", expression: "bindGreet({name:'Ada'})() === 'hey Ada'" },
    ],
    playground: `function makeUser(name) {
  return { name, hi() { return "hi " + this.name; } };
}
console.log(makeUser("Ada").hi());
`,
  },
  composition: {
    title: "Compose a Duck",
    brief: "const canFly = (o) => ({ ...o, fly(){ return o.name + ' flies' } }); const canQuack = (o) => ({ ...o, quack(){ return o.name + ' quack' } }); function duck(name){ return canQuack(canFly({ name })); }",
    starter: `const canFly = (o) => o;
const canQuack = (o) => o;
function duck(name) { return { name }; }
`,
    hint: "Return new objects that copy o and add methods closing over o.name or this.",
    checks: [
      { id: "c1", description: "duck can fly", expression: "duck('Daffy').fly() === 'Daffy flies'" },
      { id: "c2", description: "duck can quack", expression: "duck('Daffy').quack() === 'Daffy quack'" },
    ],
    playground: `const canFly = (o) => ({ ...o, fly() { return o.name + " flies"; } });
console.log(canFly({ name: "Daffy" }).fly());
`,
  },
  solid: {
    title: "Apply SRP + DIP in a tiny report",
    brief: "class Stats { sum(nums){ return nums.reduce((a,b)=>a+b,0) } }. class Printer { print(text){ return 'OUT:'+text } }. class Report { constructor(stats, printer){ this.stats=stats; this.printer=printer } run(nums){ return this.printer.print(String(this.stats.sum(nums))) } }",
    starter: `class Stats {}
class Printer {}
class Report {}
`,
    hint: "Report should not know how to sum or how to print — inject both.",
    checks: [
      { id: "c1", description: "Stats sums", expression: "new Stats().sum([1,2,3]) === 6" },
      { id: "c2", description: "Report depends on abstractions/collaborators", expression: "new Report(new Stats(), new Printer()).run([2,3]) === 'OUT:5'" },
    ],
    playground: `class Stats { sum(nums) { return nums.reduce((a, b) => a + b, 0); } }
class Printer { print(text) { return "OUT:" + text; } }
class Report {
  constructor(stats, printer) { this.stats = stats; this.printer = printer; }
  run(nums) { return this.printer.print(String(this.stats.sum(nums))); }
}
console.log(new Report(new Stats(), new Printer()).run([1, 2, 3]));
`,
  },
  "design-patterns": {
    title: "Mini pattern kit",
    brief: "Implement: singleton getApp() always same object; createUser(type) factory returning {type, role: type==='admin'?'admin':'user'}; and observable { listeners:[], on(fn){ this.listeners.push(fn) }, emit(v){ this.listeners.forEach(fn=>fn(v)) } } as createBus().",
    starter: `let app;
function getApp() { return {}; }
function createUser(type) { return {}; }
function createBus() { return { on() {}, emit() {} }; }
`,
    hint: "Store the singleton in a module-level variable. Observer stores functions and calls them.",
    checks: [
      { id: "c1", description: "singleton identity", expression: "getApp() === getApp()" },
      { id: "c2", description: "factory roles", expression: "createUser('admin').role === 'admin' && createUser('guest').role === 'user'" },
      { id: "c3", description: "observer emit", expression: "(function(){ const b=createBus(); let n=0; b.on((v)=>n=v); b.emit(7); return n===7; })()" },
    ],
    playground: `function createBus() {
  const listeners = [];
  return {
    on(fn) { listeners.push(fn); },
    emit(v) { listeners.forEach((fn) => fn(v)); },
  };
}
const bus = createBus();
bus.on((v) => console.log("got", v));
bus.emit("hello");
`,
  },
  advanced: {
    title: "Immutable update + loose coupling",
    brief: "function freezeUser(u){ return Object.freeze({ ...u }) }. function updateAge(u, age){ return freezeUser({ ...u, age }) }. function notify(port, msg){ return port.send(msg) } where port is injected.",
    starter: `function freezeUser(u) { return u; }
function updateAge(u, age) { return u; }
function notify(port, msg) { return msg; }
`,
    hint: "Never mutate the original. notify only calls port.send.",
    checks: [
      { id: "c1", description: "updateAge does not mutate original", expression: "(function(){ const u={name:'Ada',age:1}; const n=updateAge(u,2); return u.age===1 && n.age===2 && Object.isFrozen(n); })()" },
      { id: "c2", description: "notify is loosely coupled", expression: "notify({ send: (m) => 'S:' + m }, 'x') === 'S:x'" },
    ],
    playground: `const u = Object.freeze({ name: "Ada", age: 1 });
const n = Object.freeze({ ...u, age: 2 });
console.log(u.age, n.age, Object.isFrozen(n));
`,
  },
};

export function getSectionExam(sectionId: string): SectionExam | undefined {
  const pack = labs[sectionId];
  if (!pack) return undefined;
  const topics = topicsForSection(sectionId);
  const quiz = topics.flatMap((t) => t.quiz).slice(0, 10);
  return {
    quiz,
    lab: pack,
    playground: pack.playground,
  };
}
