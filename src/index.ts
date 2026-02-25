/**
 * TypeScript学习示例 - 主入口文件
 * 展示所有TypeScript特性的综合示例
 */

// 导入各个示例模块
import { demonstrateBasicTypes } from './basic-types';
import { demonstrateInterfacesAndTypes } from './interfaces-types';
import { demonstrateClasses } from './classes';
import { demonstrateGenerics } from './generics';
import { demonstrateFunctions } from './functions';
import { demonstrateEnums } from './enums';
import { demonstrateTypeAssertions } from './type-assertions';
import { demonstrateAdvancedTypes } from './advanced-types';
import { testModuleExports } from './modules';

// 从模块导入一些有用的工具
import { add, multiply, PI, E } from './modules';
import Calculator from './modules';

// 主函数：运行所有示例
async function runAllExamples(): Promise<void> {
  console.log("========================================");
  console.log("TypeScript学习示例 - 开始运行");
  console.log("========================================\n");
  
  // 1. 基本类型示例
  console.log("1. 基本类型示例");
  console.log("========================================");
  demonstrateBasicTypes();
  console.log();
  
  // 2. 接口和类型别名示例
  console.log("2. 接口和类型别名示例");
  console.log("========================================");
  demonstrateInterfacesAndTypes();
  console.log();
  
  // 3. 类与继承示例
  console.log("3. 类与继承示例");
  console.log("========================================");
  demonstrateClasses();
  console.log();
  
  // 4. 泛型示例
  console.log("4. 泛型示例");
  console.log("========================================");
  demonstrateGenerics();
  console.log();
  
  // 5. 函数类型示例
  console.log("5. 函数类型示例");
  console.log("========================================");
  demonstrateFunctions();
  console.log();
  
  // 6. 枚举示例
  console.log("6. 枚举示例");
  console.log("========================================");
  demonstrateEnums();
  console.log();
  
  // 7. 类型断言和类型保护示例
  console.log("7. 类型断言和类型保护示例");
  console.log("========================================");
  demonstrateTypeAssertions();
  console.log();
  
  // 8. 高级类型示例
  console.log("8. 高级类型示例");
  console.log("========================================");
  demonstrateAdvancedTypes();
  console.log();
  
  // 9. 模块系统示例
  console.log("9. 模块系统示例");
  console.log("========================================");
  testModuleExports();
  console.log();
  
  // 10. 综合示例：使用导入的模块
  console.log("10. 综合示例：使用导入的模块");
  console.log("========================================");
  console.log(`数学常数: π ≈ ${PI}, e ≈ ${E}`);
  console.log(`使用导入的add函数: 15 + 25 = ${add(15, 25)}`);
  console.log(`使用导入的multiply函数: 15 * 25 = ${multiply(15, 25)}`);
  console.log(`使用默认导出的Calculator类: 100 / 4 = ${Calculator.divide(100, 4)}`);
  console.log();
  
  // 11. TypeScript特性总结
  console.log("11. TypeScript核心特性总结");
  console.log("========================================");
  console.log("✓ 静态类型检查：编译时发现类型错误");
  console.log("✓ 类型推断：自动推断变量类型");
  console.log("✓ 接口和类型别名：定义复杂类型结构");
  console.log("✓ 类与面向对象：支持类、继承、封装");
  console.log("✓ 泛型：创建可重用的类型安全组件");
  console.log("✓ 枚举：定义命名常量集合");
  console.log("✓ 模块系统：组织代码结构");
  console.log("✓ 高级类型：联合类型、交叉类型、条件类型等");
  console.log("✓ 类型守卫和类型断言：运行时类型检查");
  console.log("✓ 装饰器：元编程支持");
  console.log();
  
  console.log("========================================");
  console.log("TypeScript学习示例 - 运行完成");
  console.log("========================================");
  console.log("\n恭喜！您已经了解了TypeScript的核心特性。");
  console.log("建议下一步：");
  console.log("1. 修改这些示例代码，尝试不同的类型");
  console.log("2. 查看生成的JavaScript代码（dist目录）");
  console.log("3. 尝试编写自己的TypeScript程序");
  console.log("4. 学习TypeScript配置（tsconfig.json）");
  console.log("5. 探索TypeScript与前端框架（如React、Vue）的集成");
}

// 运行示例
runAllExamples().catch(error => {
  console.error("运行示例时出错:", error);
});

// 导出一些有用的工具供外部使用
export {
  demonstrateBasicTypes,
  demonstrateInterfacesAndTypes,
  demonstrateClasses,
  demonstrateGenerics,
  demonstrateFunctions,
  demonstrateEnums,
  demonstrateTypeAssertions,
  demonstrateAdvancedTypes,
  runAllExamples
};

// 默认导出主函数
export default runAllExamples;
