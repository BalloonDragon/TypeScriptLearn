/**
 * TypeScript类型断言和类型保护示例
 * 演示类型断言、类型保护、类型谓词等类型操作
 */

// 1. 类型断言 - as语法
let someValue: any = "这是一个字符串";

// 使用as语法进行类型断言
let strLength1: number = (someValue as string).length;

// 使用尖括号语法（不推荐在JSX中使用）
let strLength2: number = (<string>someValue).length;

console.log("=== 类型断言 ===");
console.log(`字符串长度(as语法): ${strLength1}`);
console.log(`字符串长度(尖括号语法): ${strLength2}`);

// 2. 类型断言的实际应用
interface Cat {
  name: string;
  meow(): void;
}

interface Dog {
  name: string;
  bark(): void;
}

function getPet(): Cat | Dog {
  // 模拟返回Cat或Dog
  return Math.random() > 0.5 
    ? { name: "咪咪", meow: () => console.log("喵喵~") }
    : { name: "旺财", bark: () => console.log("汪汪！") };
}

const pet = getPet();

// 使用类型断言
if ((pet as Cat).meow) {
  (pet as Cat).meow();
} else if ((pet as Dog).bark) {
  (pet as Dog).bark();
}

// 3. 非空断言操作符 (!)
function getElementById(id: string): { offsetWidth: number } | null {
  // 模拟DOM操作，返回一个简单对象
  return Math.random() > 0.5 ? { offsetWidth: 100 } : null;
}

const element = getElementById("myDiv");

// 使用非空断言（确信element不为null）
// const width = element!.offsetWidth; // 如果element为null会报运行时错误

// 更安全的方式：使用可选链
const safeWidth = element?.offsetWidth;

console.log("\n=== 非空断言 ===");
console.log(`元素宽度: ${safeWidth || "元素不存在"}`);

// 4. 确定赋值断言
class Point {
  x!: number; // 确定赋值断言：告诉TypeScript我们会在构造函数之外初始化
  y!: number;
  
  constructor() {
    // 注意：这里没有初始化x和y
    this.initialize();
  }
  
  private initialize(): void {
    this.x = 0;
    this.y = 0;
  }
}

const point = new Point();
console.log(`点坐标: (${point.x}, ${point.y})`);

// 5. typeof类型保护
function processValue(value: string | number): void {
  if (typeof value === "string") {
    // 在这个块中，TypeScript知道value是string类型
    console.log(`字符串值: ${value.toUpperCase()}`);
  } else {
    // 在这个块中，TypeScript知道value是number类型
    console.log(`数字值: ${value.toFixed(2)}`);
  }
}

console.log("\n=== typeof类型保护 ===");
processValue("hello");
processValue(3.14159);

// 6. instanceof类型保护
class Bird {
  fly(): void {
    console.log("鸟儿在飞翔");
  }
}

class Fish {
  swim(): void {
    console.log("鱼儿在游泳");
  }
}

function move(animal: Bird | Fish): void {
  if (animal instanceof Bird) {
    animal.fly();
  } else {
    animal.swim();
  }
}

console.log("\n=== instanceof类型保护 ===");
move(new Bird());
move(new Fish());

// 7. in操作符类型保护
interface Admin {
  adminId: number;
  manageUsers(): void;
}

interface RegularUser {
  userId: number;
  viewContent(): void;
}

function handleUser(user: Admin | RegularUser): void {
  if ("manageUsers" in user) {
    // TypeScript知道user是Admin类型
    console.log(`管理员ID: ${user.adminId}`);
    user.manageUsers();
  } else {
    // TypeScript知道user是RegularUser类型
    console.log(`用户ID: ${user.userId}`);
    user.viewContent();
  }
}

console.log("\n=== in操作符类型保护 ===");
handleUser({ adminId: 1, manageUsers: () => console.log("管理用户中...") });
handleUser({ userId: 100, viewContent: () => console.log("查看内容中...") });

// 8. 用户定义的类型保护（类型谓词）
function isString(value: any): value is string {
  return typeof value === "string";
}

function isNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isCat(pet: any): pet is Cat {
  return pet && typeof pet.meow === "function";
}

function isDog(pet: any): pet is Dog {
  return pet && typeof pet.bark === "function";
}

function processPet(pet: Cat | Dog): void {
  if (isCat(pet)) {
    console.log(`这是猫: ${pet.name}`);
    pet.meow();
  } else if (isDog(pet)) {
    console.log(`这是狗: ${pet.name}`);
    pet.bark();
  }
}

console.log("\n=== 用户定义的类型保护 ===");
processPet({ name: "小黑", meow: () => console.log("喵~") });
processPet({ name: "大黄", bark: () => console.log("汪！") });

// 9. 类型收缩
function printAll(strs: string | string[] | null): void {
  if (strs && typeof strs === "object") {
    // strs是数组（不是null）
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    // strs是字符串
    console.log(strs);
  }
  // strs可能是null，但我们已经处理了
}

console.log("\n=== 类型收缩 ===");
printAll("单个字符串");
printAll(["字符串1", "字符串2", "字符串3"]);

// 10. 可辨识联合（Discriminated Unions）
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Shape2 = Circle | Square | Rectangle;

function getArea2(shape: Shape2): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.sideLength * shape.sideLength;
    case "rectangle":
      return shape.width * shape.height;
  }
}

console.log("\n=== 可辨识联合 ===");
const circle2: Circle = { kind: "circle", radius: 5 };
const square2: Square = { kind: "square", sideLength: 4 };
const rectangle2: Rectangle = { kind: "rectangle", width: 6, height: 3 };

console.log(`圆形面积: ${getArea2(circle2).toFixed(2)}`);
console.log(`正方形面积: ${getArea2(square2)}`);
console.log(`矩形面积: ${getArea2(rectangle2)}`);

// 11. 类型断言与const断言
// 普通类型断言
let x = "hello" as string;

// const断言 - 将类型收窄为字面量类型
let y = "hello" as const;

// 对象字面量的const断言
const person = {
  name: "张三",
  age: 30,
  hobbies: ["读书", "游泳"] as const  // 将数组收窄为只读元组
} as const;

// person.name = "李四"; // 错误：只读属性
// person.hobbies.push("编程"); // 错误：只读数组

console.log("\n=== const断言 ===");
console.log(`x类型: ${typeof x}`);
console.log(`y类型: ${typeof y}`);
console.log(`person: ${JSON.stringify(person)}`);

// 12. 双重断言（不推荐，但有时必要）
// 示例：将一个类型断言为另一个不相关的类型
function handleEvent(event: unknown): void {
  // 有时我们需要双重断言
  const element = event as unknown as { tagName: string };
  console.log(`处理事件，目标元素: ${element.tagName || '未知'}`);
}

// 13. 类型守卫函数
interface Vehicle {
  speed: number;
  accelerate(): void;
}

interface Aircraft extends Vehicle {
  altitude: number;
  takeOff(): void;
}

interface Ship extends Vehicle {
  draft: number;
  sail(): void;
}

function isAircraft(vehicle: Vehicle): vehicle is Aircraft {
  return "altitude" in vehicle && "takeOff" in vehicle;
}

function isShip(vehicle: Vehicle): vehicle is Ship {
  return "draft" in vehicle && "sail" in vehicle;
}

function operateVehicle(vehicle: Vehicle): void {
  vehicle.accelerate();
  
  if (isAircraft(vehicle)) {
    vehicle.takeOff();
    console.log(`飞机高度: ${vehicle.altitude}米`);
  } else if (isShip(vehicle)) {
    vehicle.sail();
    console.log(`船只吃水深度: ${vehicle.draft}米`);
  } else {
    console.log(`普通交通工具，速度: ${vehicle.speed}km/h`);
  }
}

console.log("\n=== 类型守卫函数 ===");
operateVehicle({ speed: 100, accelerate: () => console.log("加速中...") });

// 创建一个Aircraft对象
const aircraft: Aircraft = { 
  speed: 800, 
  altitude: 10000, 
  accelerate: () => console.log("飞机加速中..."), 
  takeOff: () => console.log("飞机起飞") 
};
operateVehicle(aircraft);

// 14. 类型兼容性检查
interface BasicUser {
  id: number;
  name: string;
}

interface DetailedUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

// DetailedUser可以赋值给BasicUser（更具体的类型可以赋值给更一般的类型）
const basicUser: BasicUser = { id: 1, name: "张三" };
const detailedUser: DetailedUser = { id: 2, name: "李四", email: "lisi@example.com", age: 30 };

const assignedUser: BasicUser = detailedUser; // 兼容

console.log("\n=== 类型兼容性 ===");
console.log(`基本用户: ${JSON.stringify(basicUser)}`);
console.log(`详细用户: ${JSON.stringify(detailedUser)}`);
console.log(`赋值后用户: ${JSON.stringify(assignedUser)}`);

// 导出示例函数供其他模块使用
export function demonstrateTypeAssertions(): void {
  console.log("类型断言和类型保护示例演示完成！");
}

// 导出一些类型保护函数
export { isString, isNumber, isCat, isDog, isAircraft, isShip };
