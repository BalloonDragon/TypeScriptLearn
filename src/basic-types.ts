/**
 * TypeScript基础类型示例
 * 演示TypeScript的基本类型和类型注解
 */

// 1. 基本类型注解
let username: string = "TypeScript Learner";
let age: number = 25;
let isStudent: boolean = true;
let score: number = 95.5;

console.log("=== 基本类型注解 ===");
console.log(`用户名: ${username}, 类型: ${typeof username}`);
console.log(`年龄: ${age}, 类型: ${typeof age}`);
console.log(`是否学生: ${isStudent}, 类型: ${typeof isStudent}`);
console.log(`分数: ${score}, 类型: ${typeof score}`);

// 2. 数组类型
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: Array<string> = ["苹果", "香蕉", "橙子"];

console.log("\n=== 数组类型 ===");
console.log(`数字数组: ${numbers}`);
console.log(`水果数组: ${fruits}`);

// 3. 元组类型 (Tuple) - 固定长度和类型的数组
let person: [string, number, boolean] = ["张三", 30, true];
let rgbColor: [number, number, number] = [255, 0, 0];

console.log("\n=== 元组类型 ===");
console.log(`人员信息: ${person}`);
console.log(`RGB颜色: ${rgbColor}`);

// 4. any类型 - 可以赋值为任何类型（应谨慎使用）
let dynamicValue: any = "这是一个字符串";
dynamicValue = 42;
dynamicValue = true;

console.log("\n=== any类型 ===");
console.log(`dynamicValue当前值: ${dynamicValue}, 类型: ${typeof dynamicValue}`);

// 5. unknown类型 - 类型安全的any
let unknownValue: unknown = "Hello TypeScript";
// unknownValue.toUpperCase(); // 错误：必须先进行类型检查
if (typeof unknownValue === "string") {
  console.log(`unknownValue是大写: ${unknownValue.toUpperCase()}`);
}

// 6. void类型 - 表示没有返回值
function logMessage(message: string): void {
  console.log(`日志: ${message}`);
}

console.log("\n=== void类型 ===");
logMessage("这是一个void函数的示例");

// 7. never类型 - 表示永远不会返回值的函数
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function infiniteLoop(): never {
  while (true) {
    // 无限循环
  }
}

// 8. null和undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

console.log("\n=== null和undefined ===");
console.log(`nullValue: ${nullValue}`);
console.log(`undefinedValue: ${undefinedValue}`);

// 9. 类型推断 - TypeScript可以自动推断类型
let inferredString = "TypeScript会自动推断这是字符串类型";
let inferredNumber = 100;
let inferredArray = [1, 2, 3];

console.log("\n=== 类型推断 ===");
console.log(`inferredString: ${inferredString}, 推断类型: ${typeof inferredString}`);
console.log(`inferredNumber: ${inferredNumber}, 推断类型: ${typeof inferredNumber}`);
console.log(`inferredArray: ${inferredArray}, 推断类型: ${Array.isArray(inferredArray) ? 'array' : typeof inferredArray}`);

// 10. 类型别名
type ID = string | number;
let userId: ID = "user-123";
let productId: ID = 456;

console.log("\n=== 类型别名 ===");
console.log(`用户ID: ${userId}`);
console.log(`产品ID: ${productId}`);

// 导出示例函数供其他模块使用
export function demonstrateBasicTypes(): void {
  console.log("基本类型示例演示完成！");
}
