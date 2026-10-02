# Calculator Frontend

基于原生 HTML/CSS/JavaScript 的前后端分离计算器前端。

## 技术栈

- HTML5
- CSS3
- 原生 JavaScript（ES6+）
- Fetch API

## 运行环境

任何现代浏览器（Chrome / Edge / Firefox / Safari）。

## 启动方式

无需构建工具，直接用浏览器打开 `index.html` 即可。也可使用任意静态服务器：

```bash
# 任选其一
python -m http.server 8080
npx serve .
```

然后访问 `http://localhost:8080`。

## 前后端连接

前端默认请求 `http://localhost:5000/api`，请确保后端服务已启动。如后端地址不同，修改 `app.js` 顶部的 `API_BASE` 常量即可。

## 功能说明

- 四则运算（加减乘除）
- 复合表达式（支持括号、小数、一元正负号）
- 计算历史展示（从后端数据库读取）
- 删除单条历史记录
- 清空全部历史记录
- 键盘支持（数字、运算符、Enter 计算、Backspace 退格、Esc 清空）

## 项目结构

```
calculator_frontend/
├── index.html   # 页面结构
├── style.css    # 样式
├── app.js       # 交互逻辑与 API 调用
├── README.md
└── codestyle.md
```
