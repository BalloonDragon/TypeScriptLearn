/**
 * TypeScript类与继承示例
 * 演示类的定义、继承、访问修饰符等面向对象特性
 */

// 1. 基本类定义
class Person {
  // 属性
  name: string;
  age: number;
  
  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // 方法
  introduce(): void {
    console.log(`你好，我是${this.name}，今年${this.age}岁。`);
  }
  
  celebrateBirthday(): void {
    this.age++;
    console.log(`${this.name}过生日了！现在${this.age}岁。`);
  }
}

console.log("=== 基本类定义 ===");
const person1 = new Person("张三", 25);
person1.introduce();
person1.celebrateBirthday();

// 2. 访问修饰符
class BankAccount {
  public accountNumber: string;      // 公共属性（默认）
  private balance: number;           // 私有属性，只能在类内部访问
  protected owner: string;           // 受保护属性，只能在类及其子类中访问
  
  constructor(accountNumber: string, initialBalance: number, owner: string) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.owner = owner;
  }
  
  // 公共方法
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`存款成功！当前余额: ${this.balance}`);
    }
  }
  
  public withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`取款成功！当前余额: ${this.balance}`);
    } else {
      console.log("取款失败：余额不足或金额无效");
    }
  }
  
  public getBalance(): number {
    return this.balance;
  }
}

console.log("\n=== 访问修饰符 ===");
const account = new BankAccount("123456789", 1000, "李四");
account.deposit(500);
account.withdraw(200);
// account.balance = 5000; // 错误：balance是私有属性
console.log(`账户余额: ${account.getBalance()}`);

// 3. 继承
class Employee extends Person {
  employeeId: number;
  department: string;
  
  constructor(name: string, age: number, employeeId: number, department: string) {
    super(name, age); // 调用父类构造函数
    this.employeeId = employeeId;
    this.department = department;
  }
  
  // 方法重写
  introduce(): void {
    console.log(`你好，我是${this.name}，${this.department}部门的员工，工号: ${this.employeeId}。`);
  }
  
  // 新增方法
  work(): void {
    console.log(`${this.name}正在工作中...`);
  }
}

console.log("\n=== 继承 ===");
const employee = new Employee("王五", 30, 1001, "技术部");
employee.introduce(); // 调用重写的方法
employee.work();
employee.celebrateBirthday(); // 调用继承的方法

// 4. 抽象类
abstract class Shape {
  protected color: string;
  
  constructor(color: string) {
    this.color = color;
  }
  
  // 抽象方法，必须在子类中实现
  abstract calculateArea(): number;
  
  // 具体方法
  displayInfo(): void {
    console.log(`这是一个${this.color}的图形`);
  }
}

class Circle extends Shape {
  radius: number;
  
  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }
  
  // 实现抽象方法
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
  
  // 重写父类方法
  displayInfo(): void {
    super.displayInfo();
    console.log(`这是一个圆形，半径: ${this.radius}, 面积: ${this.calculateArea().toFixed(2)}`);
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;
  
  constructor(color: string, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }
  
  // 实现抽象方法
  calculateArea(): number {
    return this.width * this.height;
  }
  
  displayInfo(): void {
    super.displayInfo();
    console.log(`这是一个矩形，宽: ${this.width}, 高: ${this.height}, 面积: ${this.calculateArea()}`);
  }
}

console.log("\n=== 抽象类 ===");
const circle = new Circle("红色", 5);
circle.displayInfo();

const rectangle = new Rectangle("蓝色", 10, 6);
rectangle.displayInfo();

// 5. 静态属性和方法
class MathUtils {
  static readonly PI: number = 3.14159;
  static readonly E: number = 2.71828;
  
  static add(a: number, b: number): number {
    return a + b;
  }
  
  static subtract(a: number, b: number): number {
    return a - b;
  }
  
  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * MathUtils.factorial(n - 1);
  }
}

console.log("\n=== 静态属性和方法 ===");
console.log(`π的值: ${MathUtils.PI}`);
console.log(`e的值: ${MathUtils.E}`);
console.log(`10 + 5 = ${MathUtils.add(10, 5)}`);
console.log(`10 - 5 = ${MathUtils.subtract(10, 5)}`);
console.log(`5的阶乘: ${MathUtils.factorial(5)}`);

// 6. Getter和Setter
class Temperature {
  private _celsius: number;
  
  constructor(celsius: number) {
    this._celsius = celsius;
  }
  
  // Getter
  get celsius(): number {
    return this._celsius;
  }
  
  // Setter
  set celsius(value: number) {
    if (value < -273.15) {
      console.log("温度不能低于绝对零度(-273.15°C)");
    } else {
      this._celsius = value;
    }
  }
  
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

console.log("\n=== Getter和Setter ===");
const temp = new Temperature(25);
console.log(`摄氏温度: ${temp.celsius}°C`);
console.log(`华氏温度: ${temp.fahrenheit}°F`);

temp.celsius = 30;
console.log(`修改后的摄氏温度: ${temp.celsius}°C`);
console.log(`对应的华氏温度: ${temp.fahrenheit}°F`);

temp.fahrenheit = 100;
console.log(`设置华氏温度为100°F，对应的摄氏温度: ${temp.celsius.toFixed(2)}°C`);

// 7. 只读属性
class Product {
  readonly id: number;
  name: string;
  price: number;
  
  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  
  // 可以在构造函数中修改只读属性，但不能在其他地方修改
  updatePrice(newPrice: number): void {
    this.price = newPrice;
    // this.id = 999; // 错误：id是只读属性
  }
}

console.log("\n=== 只读属性 ===");
const product = new Product(1, "笔记本电脑", 5000);
console.log(`产品: ${product.name}, ID: ${product.id}, 价格: ${product.price}`);
product.updatePrice(4500);
console.log(`更新后的价格: ${product.price}`);

// 8. 接口实现类
interface Playable {
  play(): void;
  pause(): void;
  stop(): void;
}

class MusicPlayer implements Playable {
  private currentTrack: string;
  
  constructor(track: string) {
    this.currentTrack = track;
  }
  
  play(): void {
    console.log(`正在播放: ${this.currentTrack}`);
  }
  
  pause(): void {
    console.log(`已暂停: ${this.currentTrack}`);
  }
  
  stop(): void {
    console.log(`已停止: ${this.currentTrack}`);
  }
  
  changeTrack(track: string): void {
    this.currentTrack = track;
    console.log(`切换到: ${track}`);
  }
}

console.log("\n=== 接口实现类 ===");
const player = new MusicPlayer("夜曲");
player.play();
player.pause();
player.changeTrack("晴天");
player.play();
player.stop();

// 导出示例函数供其他模块使用
export function demonstrateClasses(): void {
  console.log("类与继承示例演示完成！");
}
