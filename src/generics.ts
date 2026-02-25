/**
 * TypeScript泛型示例
 * 演示泛型函数、泛型接口、泛型类等高级类型特性
 */

// 1. 泛型函数 - 基础示例
function identity<T>(arg: T): T {
  return arg;
}

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

console.log("=== 泛型函数 - 基础示例 ===");
console.log(`identity<string>("Hello"): ${identity<string>("Hello")}`);
console.log(`identity<number>(42): ${identity<number>(42)}`);
console.log(`swap([1, "two"]): ${swap([1, "two"])}`);

// 类型推断：TypeScript可以自动推断泛型类型
console.log(`identity("TypeScript推断类型"): ${identity("TypeScript推断类型")}`);
console.log(`swap([true, 100]): ${swap([true, 100])}`);

// 2. 泛型约束 - 限制泛型类型
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`长度: ${arg.length}`);
  return arg;
}

console.log("\n=== 泛型约束 ===");
logLength("字符串有length属性");
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10, name: "对象" });
// logLength(42); // 错误：数字没有length属性

// 3. 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "张三",
  age: 30,
  email: "zhangsan@example.com"
};

console.log("\n=== 泛型约束中使用类型参数 ===");
console.log(`getProperty(person, "name"): ${getProperty(person, "name")}`);
console.log(`getProperty(person, "age"): ${getProperty(person, "age")}`);
// console.log(getProperty(person, "address")); // 错误："address"不是person的属性

// 4. 泛型接口
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  add(item: T): void;
  update(id: number, item: T): boolean;
  delete(id: number): boolean;
}

console.log("\n=== 泛型接口 ===");
const stringNumberPair: KeyValuePair<string, number> = {
  key: "score",
  value: 95
};
console.log(`键值对: ${stringNumberPair.key} = ${stringNumberPair.value}`);

// 5. 泛型类
class GenericStack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  size(): number {
    return this.items.length;
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  clear(): void {
    this.items = [];
  }
}

console.log("\n=== 泛型类 ===");
const numberStack = new GenericStack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log(`数字栈大小: ${numberStack.size()}`);
console.log(`栈顶元素: ${numberStack.peek()}`);
console.log(`弹出元素: ${numberStack.pop()}`);
console.log(`弹出后栈顶元素: ${numberStack.peek()}`);

const stringStack = new GenericStack<string>();
stringStack.push("第一");
stringStack.push("第二");
stringStack.push("第三");
console.log(`字符串栈大小: ${stringStack.size()}`);
console.log(`栈顶元素: ${stringStack.peek()}`);

// 6. 泛型与数组
function reverseArray<T>(array: T[]): T[] {
  return array.reverse();
}

function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

console.log("\n=== 泛型与数组 ===");
const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = reverseArray(numbers);
console.log(`反转数组: ${reversedNumbers}`);

const evenNumbers = filterArray(numbers, n => n % 2 === 0);
console.log(`偶数: ${evenNumbers}`);

const words = ["apple", "banana", "cherry", "date"];
const longWords = filterArray(words, word => word.length > 5);
console.log(`长单词: ${longWords}`);

// 7. 默认泛型类型
interface PaginatedResponse<T = any> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

function createPaginatedResponse<T>(data: T[], page: number, pageSize: number): PaginatedResponse<T> {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);
  
  return {
    data: paginatedData,
    page,
    pageSize,
    total,
    hasNext: end < total
  };
}

console.log("\n=== 默认泛型类型 ===");
const allProducts = ["产品A", "产品B", "产品C", "产品D", "产品E", "产品F"];
const page1 = createPaginatedResponse(allProducts, 1, 3);
console.log(`第1页数据: ${page1.data}`);
console.log(`是否有下一页: ${page1.hasNext}`);

const page2 = createPaginatedResponse(allProducts, 2, 3);
console.log(`第2页数据: ${page2.data}`);
console.log(`是否有下一页: ${page2.hasNext}`);

// 8. 泛型工具类型
// 使用内置的泛型工具类型
type PartialPerson = Partial<{
  name: string;
  age: number;
  email: string;
}>;

type ReadonlyPerson = Readonly<{
  name: string;
  age: number;
}>;

type PersonKeys = keyof typeof person;
type PersonNameType = typeof person["name"];

console.log("\n=== 泛型工具类型 ===");
const partialPerson: PartialPerson = { name: "李四" }; // age和email可选
console.log(`Partial类型: ${JSON.stringify(partialPerson)}`);

const readonlyPerson: ReadonlyPerson = { name: "王五", age: 25 };
// readonlyPerson.age = 26; // 错误：只读属性不能修改
console.log(`Readonly类型: ${JSON.stringify(readonlyPerson)}`);

console.log(`Person的键: ${Object.keys(person).join(", ")}`);
console.log(`Person的name类型: ${typeof person.name}`);

// 9. 条件类型
type IsString<T> = T extends string ? "是字符串" : "不是字符串";

type Test1 = IsString<"hello">; // "是字符串"
type Test2 = IsString<number>;  // "不是字符串"

// 10. 映射类型
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type PersonOptional = Optional<typeof person>;
type PersonRequired = Required<PersonOptional>;

console.log("\n=== 映射类型 ===");
const optionalPerson: PersonOptional = { name: "赵六" }; // age和email可选
console.log(`可选类型: ${JSON.stringify(optionalPerson)}`);

const requiredPerson: PersonRequired = { name: "赵六", age: 30, email: "zhaoliu@example.com" }; // 所有属性必填
console.log(`必填类型: ${JSON.stringify(requiredPerson)}`);

// 11. 泛型函数重载
function processInput<T>(input: T): T;
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: any): any {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 2;
  }
  return input;
}

console.log("\n=== 泛型函数重载 ===");
console.log(`processInput("hello"): ${processInput("hello")}`);
console.log(`processInput(10): ${processInput(10)}`);
console.log(`processInput(true): ${processInput(true)}`);

// 导出示例函数供其他模块使用
export function demonstrateGenerics(): void {
  console.log("泛型示例演示完成！");
}

// 导出一些泛型工具供其他模块使用
export { GenericStack, createPaginatedResponse, getProperty };
