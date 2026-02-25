/**
 * TypeScript模块系统示例
 * 演示模块的导入、导出、重新导出等
 */

// 1. 命名导出
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// 2. 默认导出（每个模块只能有一个默认导出）
export default class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }
  
  static subtract(a: number, b: number): number {
    return a - b;
  }
  
  static multiply(a: number, b: number): number {
    return a * b;
  }
  
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("除数不能为零");
    }
    return a / b;
  }
}

// 3. 类型导出
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
}

export type Status = "active" | "inactive" | "pending";

// 4. 重新导出
// 从其他模块重新导出
export { PI as PiValue } from "./modules"; // 重命名导出
export { add as addNumbers } from "./modules"; // 重命名导出

// 5. 命名空间导出（不推荐在新代码中使用，但需要了解）
export namespace MathUtils {
  export function square(x: number): number {
    return x * x;
  }
  
  export function cube(x: number): number {
    return x * x * x;
  }
  
  export const GRAVITY = 9.8;
}

// 6. 异步模块（动态导入）
export async function loadData(url: string): Promise<any> {
  console.log(`正在从 ${url} 加载数据...`);
  // 模拟异步加载
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "加载的数据", url });
    }, 1000);
  });
}

// 7. 模块示例使用
console.log("=== 模块系统示例 ===");
console.log(`数学常数: π = ${PI}, e = ${E}`);
console.log(`加法: 10 + 5 = ${add(10, 5)}`);
console.log(`乘法: 10 * 5 = ${multiply(10, 5)}`);

// 使用默认导出的类
const calc = new Calculator();
console.log(`计算器除法: 10 / 2 = ${Calculator.divide(10, 2)}`);

// 使用命名空间
console.log(`平方: 5² = ${MathUtils.square(5)}`);
console.log(`立方: 3³ = ${MathUtils.cube(3)}`);
console.log(`重力常数: ${MathUtils.GRAVITY}`);

// 8. 模块模式示例
export class Database {
  private static instance: Database;
  private data: Map<string, any> = new Map();
  
  private constructor() {
    console.log("数据库连接已建立");
  }
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  set(key: string, value: any): void {
    this.data.set(key, value);
  }
  
  get(key: string): any {
    return this.data.get(key);
  }
  
  has(key: string): boolean {
    return this.data.has(key);
  }
  
  delete(key: string): boolean {
    return this.data.delete(key);
  }
  
  clear(): void {
    this.data.clear();
  }
}

// 9. 模块的副作用
// 模块在导入时会执行顶层的代码
console.log("模块已加载和执行");

// 10. 模块导出函数示例
export function formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

// 11. 模块导出常量对象
export const APP_CONFIG = {
  name: "TypeScript学习应用",
  version: "1.0.0",
  author: "TypeScript学习者",
  apiBaseUrl: "https://api.example.com",
  maxRetries: 3,
  timeout: 5000
} as const;

// 12. 模块导出工具函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait) as unknown as number;
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 13. 模块导出类型守卫
export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

// 14. 模块导出示例数据
export const SAMPLE_USERS: User[] = [
  { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 },
  { id: 2, name: "李四", email: "lisi@example.com", age: 30 },
  { id: 3, name: "王五", email: "wangwu@example.com" }, // age可选
  { id: 4, name: "赵六", email: "zhaoliu@example.com", age: 28 }
];

export const SAMPLE_PRODUCTS = [
  { id: 1, name: "笔记本电脑", price: 5000, category: "电子产品" },
  { id: 2, name: "智能手机", price: 3000, category: "电子产品" },
  { id: 3, name: "书籍", price: 50, category: "文具" },
  { id: 4, name: "椅子", price: 200, category: "家具" }
];

// 15. 模块测试函数
export function testModuleExports(): void {
  console.log("\n=== 模块导出测试 ===");
  console.log(`APP_CONFIG: ${JSON.stringify(APP_CONFIG)}`);
  console.log(`用户数量: ${SAMPLE_USERS.length}`);
  console.log(`产品数量: ${SAMPLE_PRODUCTS.length}`);
  
  const today = new Date();
  console.log(`今天日期: ${formatDate(today)}`);
  console.log(`日期格式(DD/MM/YYYY): ${formatDate(today, "DD/MM/YYYY")}`);
  
  // 测试类型守卫
  console.log(`"hello"是字符串吗? ${isString("hello")}`);
  console.log(`123是数字吗? ${isNumber(123)}`);
  console.log(`[1,2,3]是数组吗? ${isArray([1, 2, 3])}`);
  console.log(`"123"是数字吗? ${isNumber("123")}`);
}

// 执行测试
testModuleExports();

// 导出模块信息
export const MODULE_INFO = {
  name: "modules.ts",
  description: "TypeScript模块系统示例",
  version: "1.0.0",
  exports: [
    "PI", "E", "add", "multiply", "Calculator", "User", "Status",
    "MathUtils", "loadData", "Database", "formatDate", "parseDate",
    "APP_CONFIG", "debounce", "throttle", "isString", "isNumber", "isArray",
    "SAMPLE_USERS", "SAMPLE_PRODUCTS", "testModuleExports", "MODULE_INFO"
  ]
};
