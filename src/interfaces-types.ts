/**
 * TypeScript接口和类型别名示例
 * 演示接口的定义、使用以及与类型别名的区别
 */

// 1. 基本接口定义
interface Person {
  name: string;
  age: number;
  email?: string; // 可选属性
  readonly id: number; // 只读属性
}

// 使用接口
const person1: Person = {
  name: "李四",
  age: 28,
  email: "lisi@example.com",
  id: 1001
};

// person1.id = 1002; // 错误：id是只读属性

console.log("=== 基本接口定义 ===");
console.log(`人员信息: ${person1.name}, ${person1.age}岁, 邮箱: ${person1.email || '未提供'}`);

// 2. 函数类型接口
interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (x, y) => x + y;
const multiply: Calculator = (x, y) => x * y;

console.log("\n=== 函数类型接口 ===");
console.log(`加法: 10 + 5 = ${add(10, 5)}`);
console.log(`乘法: 10 * 5 = ${multiply(10, 5)}`);

// 3. 可索引类型接口
interface StringArray {
  [index: number]: string;
}

interface NumberDictionary {
  [key: string]: number;
}

const colors: StringArray = ["红色", "绿色", "蓝色"];
const scores: NumberDictionary = {
  "数学": 95,
  "语文": 88,
  "英语": 92
};

console.log("\n=== 可索引类型接口 ===");
console.log(`颜色数组: ${colors[0]}, ${colors[1]}, ${colors[2]}`);
console.log(`成绩字典: 数学=${scores["数学"]}, 语文=${scores["语文"]}, 英语=${scores["英语"]}`);

// 4. 接口继承
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "旺财",
  age: 3,
  breed: "金毛",
  bark() {
    console.log("汪汪！");
  }
};

console.log("\n=== 接口继承 ===");
console.log(`我的狗: ${myDog.name}, ${myDog.age}岁, 品种: ${myDog.breed}`);
myDog.bark();

// 5. 多重接口继承
interface CanSwim {
  swim(): void;
}

interface CanFly {
  fly(): void;
}

interface Duck extends Animal, CanSwim, CanFly {
  color: string;
}

const myDuck: Duck = {
  name: "唐老鸭",
  age: 2,
  color: "白色",
  swim() {
    console.log("鸭子在水里游泳");
  },
  fly() {
    console.log("鸭子在空中飞翔");
  }
};

console.log("\n=== 多重接口继承 ===");
console.log(`我的鸭子: ${myDuck.name}, ${myDuck.age}岁, 颜色: ${myDuck.color}`);
myDuck.swim();
myDuck.fly();

// 6. 类型别名 (Type Aliases)
type Point = {
  x: number;
  y: number;
};

type Coordinate3D = Point & {
  z: number;
};

const point2D: Point = { x: 10, y: 20 };
const point3D: Coordinate3D = { x: 10, y: 20, z: 30 };

console.log("\n=== 类型别名 ===");
console.log(`2D点: (${point2D.x}, ${point2D.y})`);
console.log(`3D点: (${point3D.x}, ${point3D.y}, ${point3D.z})`);

// 7. 接口 vs 类型别名
// 接口可以合并，类型别名不能
interface User {
  name: string;
}

interface User {
  age: number;
}

// 这相当于:
// interface User {
//   name: string;
//   age: number;
// }

const user: User = {
  name: "王五",
  age: 35
};

console.log("\n=== 接口合并 ===");
console.log(`用户: ${user.name}, ${user.age}岁`);

// 8. 使用类型别名创建联合类型
type Status = "pending" | "success" | "error";
type ID = string | number;

let currentStatus: Status = "pending";
let itemId: ID = "item-001";

console.log("\n=== 联合类型 ===");
console.log(`当前状态: ${currentStatus}`);
console.log(`项目ID: ${itemId}`);

// 9. 使用类型别名创建交叉类型
type Employee = {
  id: number;
  name: string;
};

type Department = {
  departmentId: number;
  departmentName: string;
};

type EmployeeWithDepartment = Employee & Department;

const employee: EmployeeWithDepartment = {
  id: 2001,
  name: "赵六",
  departmentId: 101,
  departmentName: "技术部"
};

console.log("\n=== 交叉类型 ===");
console.log(`员工信息: ${employee.name} (ID: ${employee.id}), 部门: ${employee.departmentName}`);

// 10. 接口实现类
interface Vehicle {
  brand: string;
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  constructor(public brand: string) {}

  start(): void {
    console.log(`${this.brand}汽车启动`);
  }

  stop(): void {
    console.log(`${this.brand}汽车停止`);
  }
}

const myCar = new Car("丰田");
console.log("\n=== 接口实现类 ===");
myCar.start();
myCar.stop();

// 导出示例函数供其他模块使用
export function demonstrateInterfacesAndTypes(): void {
  console.log("接口和类型别名示例演示完成！");
}
