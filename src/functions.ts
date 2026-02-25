/**
 * TypeScript函数类型示例
 * 演示函数类型注解、箭头函数、参数类型等
 */

// 1. 函数类型注解
function add(x: number, y: number): number {
  return x + y;
}

const multiply = function(x: number, y: number): number {
  return x * y;
};

// 函数类型
type BinaryOperation = (a: number, b: number) => number;

const divide: BinaryOperation = (a, b) => a / b;
const subtract: BinaryOperation = (a, b) => a - b;

console.log("=== 函数类型注解 ===");
console.log(`add(10, 5) = ${add(10, 5)}`);
console.log(`multiply(10, 5) = ${multiply(10, 5)}`);
console.log(`divide(10, 5) = ${divide(10, 5)}`);
console.log(`subtract(10, 5) = ${subtract(10, 5)}`);

// 2. 箭头函数
const square = (x: number): number => x * x;
const cube = (x: number): number => x * x * x;
const greet = (name: string): string => `你好，${name}！`;

console.log("\n=== 箭头函数 ===");
console.log(`square(5) = ${square(5)}`);
console.log(`cube(3) = ${cube(3)}`);
console.log(greet("TypeScript学习者"));

// 3. 可选参数和默认参数
function createUser(
  name: string,
  age: number,
  email?: string, // 可选参数
  country: string = "中国" // 默认参数
): string {
  let userInfo = `姓名: ${name}, 年龄: ${age}`;
  if (email) {
    userInfo += `, 邮箱: ${email}`;
  }
  userInfo += `, 国家: ${country}`;
  return userInfo;
}

console.log("\n=== 可选参数和默认参数 ===");
console.log(createUser("张三", 25));
console.log(createUser("李四", 30, "lisi@example.com"));
console.log(createUser("王五", 28, "wangwu@example.com", "美国"));

// 4. 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

function introduce(name: string, ...hobbies: string[]): string {
  if (hobbies.length === 0) {
    return `${name}没有特别的爱好`;
  }
  return `${name}的爱好是: ${hobbies.join("、")}`;
}

console.log("\n=== 剩余参数 ===");
console.log(`sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);
console.log(introduce("张三"));
console.log(introduce("李四", "读书", "游泳", "编程"));

// 5. 函数重载
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input * 2;
  }
}

// 更复杂的函数重载示例
interface DivElement {
  type: "div";
  width: number;
  height: number;
}

interface SpanElement {
  type: "span";
  text: string;
}

interface InputElement {
  type: "input";
  value: string;
}

function createElement(tag: "div"): DivElement;
function createElement(tag: "span"): SpanElement;
function createElement(tag: "input"): InputElement;
function createElement(tag: string): DivElement | SpanElement | InputElement | { type: string } {
  // 实际实现
  switch (tag) {
    case "div":
      return { type: "div", width: 100, height: 100 };
    case "span":
      return { type: "span", text: "文本" };
    case "input":
      return { type: "input", value: "" };
    default:
      return { type: tag };
  }
}

console.log("\n=== 函数重载 ===");
console.log(`processInput("hello") = ${processInput("hello")}`);
console.log(`processInput(10) = ${processInput(10)}`);

// 6. 回调函数类型
type Callback = (error: Error | null, result?: any) => void;

function fetchData(url: string, callback: Callback): void {
  console.log(`正在从 ${url} 获取数据...`);
  // 模拟异步操作
  setTimeout(() => {
    const success = Math.random() > 0.3;
    if (success) {
      callback(null, { data: "获取到的数据", status: "success" });
    } else {
      callback(new Error("获取数据失败"));
    }
  }, 1000);
}

console.log("\n=== 回调函数类型 ===");
fetchData("https://api.example.com/data", (error, result) => {
  if (error) {
    console.error(`错误: ${error.message}`);
  } else {
    console.log(`成功: ${JSON.stringify(result)}`);
  }
});

// 7. 高阶函数
type Mapper<T, U> = (item: T) => U;
type Predicate<T> = (item: T) => boolean;

function mapArray<T, U>(array: T[], mapper: Mapper<T, U>): U[] {
  return array.map(mapper);
}

function filterArray<T>(array: T[], predicate: Predicate<T>): T[] {
  return array.filter(predicate);
}

function compose<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => {
    return functions.reduceRight((result, fn) => fn(result), arg);
  };
}

console.log("\n=== 高阶函数 ===");
const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, x => x * 2);
console.log(`原数组: ${numbers}`);
console.log(`加倍后: ${doubled}`);

const evenNumbers = filterArray(numbers, x => x % 2 === 0);
console.log(`偶数: ${evenNumbers}`);

// 组合函数示例
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const squareFunc = (x: number) => x * x;

const composedFunction = compose(addOne, double, squareFunc);
console.log(`组合函数: addOne(double(square(3))) = ${composedFunction(3)}`);

// 8. this参数
interface Counter {
  count: number;
  increment(): void;
  getCount(): number;
}

function createCounter(): Counter {
  return {
    count: 0,
    increment() {
      this.count++;
    },
    getCount() {
      return this.count;
    }
  };
}

// 显式指定this类型
function sayHello(this: { name: string }) {
  console.log(`你好，我是${this.name}`);
}

const person = { name: "张三", sayHello };
person.sayHello();

console.log("\n=== this参数 ===");
const counter = createCounter();
counter.increment();
counter.increment();
console.log(`计数器: ${counter.getCount()}`);

// 9. 泛型函数
function firstElement<T>(array: T[]): T | undefined {
  return array[0];
}

function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

console.log("\n=== 泛型函数 ===");
console.log(`第一个元素: ${firstElement([1, 2, 3])}`);
console.log(`第一个元素: ${firstElement(["a", "b", "c"])}`);

const obj1 = { name: "张三" };
const obj2 = { age: 30 };
const merged = mergeObjects(obj1, obj2);
console.log(`合并对象: ${JSON.stringify(merged)}`);

// 10. 异步函数
async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `用户${userId}` });
    }, 500);
  });
}

async function processUsers(userIds: number[]): Promise<string[]> {
  const promises = userIds.map(id => fetchUserData(id));
  const users = await Promise.all(promises);
  return users.map(user => user.name);
}

console.log("\n=== 异步函数 ===");
// 注意：由于这是示例，我们不会实际等待异步操作完成
fetchUserData(1).then(user => {
  console.log(`获取用户数据: ${JSON.stringify(user)}`);
});

// 11. 构造函数类型
interface AnimalConstructor {
  new (name: string): Animal;
}

class Animal {
  constructor(public name: string) {}
  
  speak(): void {
    console.log(`${this.name}发出声音`);
  }
}

function createAnimal(ctor: AnimalConstructor, name: string): Animal {
  return new ctor(name);
}

console.log("\n=== 构造函数类型 ===");
const animal = createAnimal(Animal, "小狗");
animal.speak();

// 导出示例函数供其他模块使用
export function demonstrateFunctions(): void {
  console.log("函数类型示例演示完成！");
}

// 导出一些有用的函数类型
export type { BinaryOperation, Callback, Mapper, Predicate };
export { mapArray, filterArray, compose };
