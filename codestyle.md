# JavaScript / HTML / CSS 代码规范（Frontend）

本项目前端 JavaScript 代码遵循 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)。

## 主要规范摘要

### 变量声明
- 使用 `const` 声明不可变变量，`let` 声明可变变量，禁止使用 `var`。

### 字符串
- 使用单引号 `'...'`（HTML 中使用双引号）。
- 长字符串拼接优先使用模板字符串 `` `...` ``。

### 缩进
- 使用 2 个空格缩进。

### 命名
- 变量与函数：`camelCase`
- 常量：`UPPER_SNAKE_CASE`
- 组件类（若有）：`PascalCase`

### 分号
- 每条语句末尾必须加分号。

### 函数
- 优先使用箭头函数 `() => {}`。
- 函数声明时不超过合理行数，单一职责。

### 数组与对象
- 使用字面量创建：`[]`、`{}`，不用 `new Array()`、`new Object()`。
- 对象方法简写：`{ method() {} }`。

### 异步
- 使用 `async/await` 处理 Promise，避免回调地狱。
- 异步请求必须有 `try/catch` 错误处理。

### DOM 操作
- 使用 `document.createElement` 创建元素，不使用 `innerHTML` 拼接用户输入内容（防止 XSS）。

### HTML / CSS
- HTML 标签小写，属性使用双引号。
- CSS 类名使用中划线分隔 `kebab-case`。
- 样式与脚本外部引用，不内联。
