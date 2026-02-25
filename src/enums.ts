/**
 * TypeScript枚举示例
 * 演示数字枚举、字符串枚举、常量枚举等
 */

// 1. 数字枚举（默认从0开始）
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// 可以指定起始值
enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

// 也可以每个成员都指定值
enum FileSize {
  Small = 64,
  Medium = 128,
  Large = 256,
  ExtraLarge = 512
}

console.log("=== 数字枚举 ===");
console.log(`Direction.Up = ${Direction.Up}`); // 0
console.log(`Direction[0] = ${Direction[0]}`); // "Up" - 反向映射
console.log(`StatusCode.OK = ${StatusCode.OK}`);
console.log(`StatusCode[200] = ${StatusCode[200]}`); // "OK"
console.log(`FileSize.Medium = ${FileSize.Medium}`);

// 使用数字枚举
function move(direction: Direction): string {
  switch (direction) {
    case Direction.Up:
      return "向上移动";
    case Direction.Down:
      return "向下移动";
    case Direction.Left:
      return "向左移动";
    case Direction.Right:
      return "向右移动";
    default:
      return "未知方向";
  }
}

console.log(`移动方向: ${move(Direction.Up)}`);
console.log(`移动方向: ${move(Direction.Right)}`);

// 2. 字符串枚举（没有反向映射）
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
  Yellow = "YELLOW"
}

enum Message {
  Success = "操作成功",
  Error = "操作失败",
  Warning = "警告",
  Info = "信息"
}

console.log("\n=== 字符串枚举 ===");
console.log(`Color.Red = ${Color.Red}`);
console.log(`Message.Success = ${Message.Success}`);

// 使用字符串枚举
function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return "红色";
    case Color.Green:
      return "绿色";
    case Color.Blue:
      return "蓝色";
    case Color.Yellow:
      return "黄色";
    default:
      return "未知颜色";
  }
}

console.log(`颜色名称: ${getColorName(Color.Blue)}`);
console.log(`颜色名称: ${getColorName(Color.Green)}`);

// 3. 异构枚举（混合字符串和数字成员，不建议使用）
enum MixedEnum {
  No = 0,
  Yes = "YES",
  Maybe = 2
}

console.log("\n=== 异构枚举 ===");
console.log(`MixedEnum.No = ${MixedEnum.No}`);
console.log(`MixedEnum.Yes = ${MixedEnum.Yes}`);
console.log(`MixedEnum.Maybe = ${MixedEnum.Maybe}`);

// 4. 常量枚举（在编译时会被内联，减少代码体积）
const enum LogLevel {
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4
}

// 使用常量枚举
function logMessage(message: string, level: LogLevel): void {
  const levelName = 
    level === LogLevel.Debug ? "调试" :
    level === LogLevel.Info ? "信息" :
    level === LogLevel.Warning ? "警告" : "错误";
  
  console.log(`[${levelName}] ${message}`);
}

console.log("\n=== 常量枚举 ===");
logMessage("这是一条调试信息", LogLevel.Debug);
logMessage("这是一条错误信息", LogLevel.Error);

// 注意：常量枚举在编译后不会生成实际的枚举对象
// 所以 LogLevel.Debug 会被直接替换为 1

// 5. 枚举成员类型
enum ShapeKind {
  Circle,
  Square,
  Triangle
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

interface Triangle {
  kind: ShapeKind.Triangle;
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case ShapeKind.Circle:
      return Math.PI * shape.radius * shape.radius;
    case ShapeKind.Square:
      return shape.sideLength * shape.sideLength;
    case ShapeKind.Triangle:
      return 0.5 * shape.base * shape.height;
  }
}

console.log("\n=== 枚举成员类型 ===");
const circle: Circle = { kind: ShapeKind.Circle, radius: 5 };
const square: Square = { kind: ShapeKind.Square, sideLength: 4 };
const triangle: Triangle = { kind: ShapeKind.Triangle, base: 6, height: 3 };

console.log(`圆形面积: ${getArea(circle).toFixed(2)}`);
console.log(`正方形面积: ${getArea(square)}`);
console.log(`三角形面积: ${getArea(triangle)}`);

// 6. 枚举作为对象使用
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
  Guest = "GUEST"
}

const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.Admin]: ["create", "read", "update", "delete", "manage_users"],
  [UserRole.Editor]: ["create", "read", "update"],
  [UserRole.Viewer]: ["read"],
  [UserRole.Guest]: ["read_public"]
};

function checkPermission(role: UserRole, permission: string): boolean {
  return rolePermissions[role].includes(permission);
}

console.log("\n=== 枚举作为对象使用 ===");
console.log(`管理员可以删除吗? ${checkPermission(UserRole.Admin, "delete")}`);
console.log(`编辑者可以删除吗? ${checkPermission(UserRole.Editor, "delete")}`);
console.log(`访客可以读取公开内容吗? ${checkPermission(UserRole.Guest, "read_public")}`);

// 7. 枚举的遍历
enum Weekday {
  Monday = "星期一",
  Tuesday = "星期二",
  Wednesday = "星期三",
  Thursday = "星期四",
  Friday = "星期五",
  Saturday = "星期六",
  Sunday = "星期日"
}

console.log("\n=== 枚举的遍历 ===");
// 注意：字符串枚举没有反向映射，所以Object.keys会包含两个方向的映射
const weekdayKeys = Object.keys(Weekday).filter(key => isNaN(Number(key)));
console.log("工作日:");
weekdayKeys.forEach(key => {
  console.log(`  ${key}: ${Weekday[key as keyof typeof Weekday]}`);
});

// 8. 枚举的计算成员（非常量成员）
enum FileAccess {
  // 常量成员
  None = 0,
  Read = 1 << 0,    // 1
  Write = 1 << 1,   // 2
  ReadWrite = Read | Write,  // 3
  // 计算成员
  G = "123".length  // 3
}

console.log("\n=== 枚举的计算成员 ===");
console.log(`FileAccess.Read = ${FileAccess.Read}`);
console.log(`FileAccess.Write = ${FileAccess.Write}`);
console.log(`FileAccess.ReadWrite = ${FileAccess.ReadWrite}`);
console.log(`FileAccess.G = ${FileAccess.G}`);

// 9. 环境枚举（用于声明已存在的枚举类型）
declare enum AmbientEnum {
  A = 1,
  B,
  C = 2
}

// 10. 枚举的合并
enum MergeableEnum {
  Part1 = "PART_1"
}

enum MergeableEnum {
  Part2 = "PART_2",
  Part3 = "PART_3"
}

console.log("\n=== 枚举的合并 ===");
console.log(`合并后的枚举: ${MergeableEnum.Part1}, ${MergeableEnum.Part2}, ${MergeableEnum.Part3}`);

// 11. 使用枚举的最佳实践
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

async function makeRequest(url: string, method: HttpMethod, data?: any): Promise<any> {
  console.log(`发起 ${method} 请求到 ${url}`);
  // 实际请求逻辑...
  return { status: "success", data };
}

console.log("\n=== 枚举最佳实践示例 ===");
makeRequest("/api/users", HttpMethod.GET);
makeRequest("/api/users", HttpMethod.POST, { name: "张三" });

// 12. 枚举与联合类型
// 有时使用联合类型比枚举更简单
type Size = "small" | "medium" | "large" | "extra-large";

function getSizeDescription(size: Size): string {
  switch (size) {
    case "small":
      return "小号";
    case "medium":
      return "中号";
    case "large":
      return "大号";
    case "extra-large":
      return "加大号";
  }
}

console.log("\n=== 枚举与联合类型比较 ===");
console.log(`尺寸描述: ${getSizeDescription("medium")}`);
console.log(`尺寸描述: ${getSizeDescription("large")}`);

// 导出示例函数供其他模块使用
export function demonstrateEnums(): void {
  console.log("枚举示例演示完成！");
}

// 导出一些有用的枚举
export { Direction, Color, UserRole, HttpMethod, Weekday };
