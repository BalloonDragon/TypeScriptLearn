/**
 * TypeScript高级类型示例
 * 演示联合类型、交叉类型、条件类型、映射类型等高级类型特性
 */

// 1. 联合类型 (Union Types)
type StringOrNumber = string | number;
type Status = "success" | "error" | "pending";
type Primitive = string | number | boolean | null | undefined;

function processInput(input: StringOrNumber): void {
  if (typeof input === "string") {
    console.log(`字符串: ${input.toUpperCase()}`);
  } else {
    console.log(`数字: ${input.toFixed(2)}`);
  }
}

console.log("=== 联合类型 ===");
processInput("hello");
processInput(3.14159);

// 2. 交叉类型 (Intersection Types)
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: number;
  department: string;
}

type EmployeePerson = Person & Employee;

const employeePerson: EmployeePerson = {
  name: "张三",
  age: 30,
  employeeId: 1001,
  department: "技术部"
};

console.log("\n=== 交叉类型 ===");
console.log(`员工信息: ${employeePerson.name}, ${employeePerson.age}岁, 部门: ${employeePerson.department}`);

// 3. 类型别名 vs 接口
// 类型别名可以定义联合类型和元组，接口不能
type Result = Success | Error;
type Success = { type: "success"; data: any };
type Error = { type: "error"; message: string };

type Point = [number, number];
type ThreeDPoint = [number, number, number];

// 接口可以合并声明，类型别名不能
interface User {
  name: string;
}

interface User {
  age: number;
}

// 现在User接口有name和age两个属性

// 4. 索引签名
interface StringDictionary {
  [key: string]: string;
}

interface NumberDictionary {
  [key: string]: number;
}

const colors: StringDictionary = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
};

const scores: NumberDictionary = {
  math: 95,
  english: 88,
  science: 92
};

console.log("\n=== 索引签名 ===");
console.log(`红色代码: ${colors["red"]}`);
console.log(`数学成绩: ${scores["math"]}`);

// 5. keyof操作符
type PersonKeys = keyof Person; // "name" | "age"
type EmployeeKeys = keyof Employee; // "employeeId" | "department"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log("\n=== keyof操作符 ===");
console.log(`获取属性name: ${getProperty(employeePerson, "name")}`);
console.log(`获取属性department: ${getProperty(employeePerson, "department")}`);

// 6. typeof操作符（类型查询）
const defaultUser = {
  name: "李四",
  age: 25,
  email: "lisi@example.com"
};

type UserType = typeof defaultUser;

function createUser(user: UserType): void {
  console.log(`创建用户: ${user.name}, ${user.age}岁`);
}

console.log("\n=== typeof操作符 ===");
createUser(defaultUser);

// 7. 索引访问类型
type PersonName = Person["name"]; // string
type PersonAge = Person["age"]; // number

type EmployeeDepartment = Employee["department"]; // string

console.log("\n=== 索引访问类型 ===");
console.log(`PersonName类型: ${typeof employeePerson.name}`);
console.log(`PersonAge类型: ${typeof employeePerson.age}`);

// 8. 条件类型 (Conditional Types)
type IsString<T> = T extends string ? "是字符串" : "不是字符串";
type IsNumber<T> = T extends number ? "是数字" : "不是数字";

type Test1 = IsString<"hello">; // "是字符串"
type Test2 = IsString<number>;  // "不是字符串"
type Test3 = IsNumber<42>;      // "是数字"
type Test4 = IsNumber<"hello">; // "不是数字"

// 9. 映射类型 (Mapped Types)
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type ReadonlyPerson = Readonly<Person>;
type PartialPerson = Partial<Person>;
type RequiredPerson = Required<PartialPerson>;

console.log("\n=== 映射类型 ===");
const readonlyPerson: ReadonlyPerson = { name: "王五", age: 28 };
// readonlyPerson.age = 29; // 错误：只读属性

const partialPerson: PartialPerson = { name: "赵六" }; // age可选
const requiredPerson: RequiredPerson = { name: "赵六", age: 30 }; // 所有属性必填

console.log(`只读人员: ${readonlyPerson.name}`);
console.log(`部分人员: ${partialPerson.name}`);
console.log(`必填人员: ${requiredPerson.name}, ${requiredPerson.age}岁`);

// 10. 模板字面量类型 (Template Literal Types)
type EventName = "click" | "hover" | "focus";
type HandlerName = `on${Capitalize<EventName>}`;

const handlers: Record<HandlerName, () => void> = {
  onClick: () => console.log("点击事件"),
  onHover: () => console.log("悬停事件"),
  onFocus: () => console.log("聚焦事件")
};

type CSSValue = `${number}px` | `${number}em` | `${number}rem` | `${number}%`;

const width: CSSValue = "100px";
const height: CSSValue = "50%";

console.log("\n=== 模板字面量类型 ===");
console.log(`宽度: ${width}`);
console.log(`高度: ${height}`);
handlers.onClick();

// 11. 条件类型与infer关键字
type ElementType<T> = T extends (infer U)[] ? U : T;

type StringArrayElement = ElementType<string[]>; // string
type NumberArrayElement = ElementType<number[]>; // number
type NotArray = ElementType<string>; // string

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getUser() {
  return { name: "张三", age: 30 };
}

type UserReturnType = ReturnType<typeof getUser>; // { name: string; age: number }

console.log("\n=== 条件类型与infer ===");
console.log(`StringArrayElement类型: string`);
console.log(`UserReturnType类型: { name: string; age: number }`);

// 12. 实用工具类型 (Utility Types)
// TypeScript内置的实用工具类型
type ReadonlyUser = Readonly<UserType>;
type PartialUser = Partial<UserType>;
type PickUser = Pick<UserType, "name" | "email">;
type OmitUser = Omit<UserType, "age">;
type RecordUser = Record<"user1" | "user2", UserType>;
type NonNullableUser = NonNullable<string | number | null | undefined>; // string | number

console.log("\n=== 实用工具类型 ===");
const pickedUser: PickUser = { name: "张三", email: "zhangsan@example.com" };
console.log(`Pick类型: ${JSON.stringify(pickedUser)}`);

const omittedUser: OmitUser = { name: "李四", email: "lisi@example.com" };
console.log(`Omit类型: ${JSON.stringify(omittedUser)}`);

// 13. 递归类型
type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

const jsonData: Json = {
  name: "张三",
  age: 30,
  isStudent: false,
  courses: ["数学", "英语", "编程"],
  address: {
    city: "北京",
    street: "长安街",
    coordinates: [116.4074, 39.9042]
  }
};

console.log("\n=== 递归类型 ===");
console.log(`JSON数据: ${JSON.stringify(jsonData, null, 2)}`);

// 14. 类型守卫与类型谓词
function isPerson(obj: any): obj is Person {
  return obj && typeof obj.name === "string" && typeof obj.age === "number";
}

function isEmployee(obj: any): obj is Employee {
  return obj && typeof obj.employeeId === "number" && typeof obj.department === "string";
}

function processObject(obj: any): void {
  if (isPerson(obj) && isEmployee(obj)) {
    console.log(`员工: ${obj.name}, 部门: ${obj.department}`);
  } else if (isPerson(obj)) {
    console.log(`人员: ${obj.name}, ${obj.age}岁`);
  } else if (isEmployee(obj)) {
    console.log(`员工ID: ${obj.employeeId}, 部门: ${obj.department}`);
  } else {
    console.log("未知对象");
  }
}

console.log("\n=== 类型守卫 ===");
processObject(employeePerson);
processObject({ name: "王五", age: 25 });
processObject({ employeeId: 1002, department: "销售部" });

// 15. 类型兼容性
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Dog可以赋值给Animal（子类型可以赋值给父类型）
const animal: Animal = { name: "动物" };
const dog: Dog = { name: "旺财", breed: "金毛", bark: () => console.log("汪汪！") };

const assignedAnimal: Animal = dog; // 兼容

console.log("\n=== 类型兼容性 ===");
console.log(`动物: ${assignedAnimal.name}`);

// 16. 类型断言与const断言
// const断言创建字面量类型
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retry: 3
} as const;

// config.apiUrl = "https://new-api.example.com"; // 错误：只读属性

// 17. 函数重载与条件类型
function formatInput(input: string): string;
function formatInput(input: number): number;
function formatInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.trim().toUpperCase();
  } else {
    return Math.round(input * 100) / 100;
  }
}

console.log("\n=== 函数重载 ===");
console.log(`格式化字符串: ${formatInput("  hello world  ")}`);
console.log(`格式化数字: ${formatInput(3.1415926)}`);

// 18. 类型查询与条件类型的结合
type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = FunctionReturnType<typeof add>; // number

// 19. 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// 20. 类型编程示例：提取Promise的值类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;
type UnwrappedString = UnwrapPromise<PromiseString>; // string

type NotPromise = UnwrapPromise<string>; // string

console.log("\n=== 类型编程 ===");
console.log(`UnwrapPromise<Promise<string>> = string`);

// 导出示例函数供其他模块使用
export function demonstrateAdvancedTypes(): void {
  console.log("高级类型示例演示完成！");
}

// 导出一些有用的类型工具
export type { 
  StringOrNumber, 
  EmployeePerson, 
  ReadonlyPerson, 
  PartialPerson,
  Json,
  UnwrapPromise
};

export { getProperty, isPerson, isEmployee };
