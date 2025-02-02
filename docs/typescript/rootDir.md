下面是一个完整的案例，展示如何使用 TypeScript 的 `rootDirs` 配置来实现多语言支持。我们将创建一个简单的项目，支持中文（`zh`）和德文（`de`）两种语言，并通过 `rootDirs` 让 TypeScript 在模块解析时自动选择正确的语言文件。

------

### **项目结构**

复制

```
src/
  zh/
    messages.ts
  de/
    messages.ts
  app.ts
tsconfig.json
```

------

### **1. 创建语言文件**

#### `src/zh/messages.ts`（中文）

typescript

复制

```
export const messages = {
  greet: "你好！",
  farewell: "再见！",
};
```

#### `src/de/messages.ts`（德文）

typescript

复制

```
export const messages = {
  greet: "Hallo!",
  farewell: "Auf Wiedersehen!",
};
```

------

### **2. 创建主程序文件**

#### `src/app.ts`

typescript

复制

```
import { messages } from './messages';

console.log(messages.greet);
console.log(messages.farewell);
```

------

### **3. 配置 `tsconfig.json`**

json

复制

```
{
  "compilerOptions": {
    "rootDirs": ["src/zh", "src/de"], // 将中文和德文目录视为同一个根目录
    "outDir": "dist", // 编译输出目录
    "module": "commonjs", // 模块系统
    "target": "es6", // 目标 JavaScript 版本
    "strict": true // 启用严格类型检查
  },
  "include": ["src/**/*"] // 包含 src 目录下的所有文件
}
```

------

### **4. 编译和运行**

#### 编译项目

在项目根目录下运行以下命令，将 TypeScript 代码编译为 JavaScript：

bash

复制

```
tsc
```

#### 编译后的输出

编译后的文件会输出到 `dist` 目录，结构如下：

复制

```
dist/
  zh/
    messages.js
  de/
    messages.js
  app.js
```

#### 运行程序

在 `dist` 目录下运行 `app.js`：

bash

复制

```
node dist/app.js
```

------

### **5. 动态选择语言**

为了实现动态选择语言，我们可以通过环境变量或其他方式动态设置语言目录。

#### 修改 `src/app.ts`

typescript

复制

```
const locale = process.env.LOCALE || 'zh'; // 从环境变量中获取语言设置，默认为中文
import { messages } from `./${locale}/messages`; // 动态加载语言文件

console.log(messages.greet);
console.log(messages.farewell);
```

#### 运行程序

通过设置环境变量 `LOCALE` 来动态选择语言：

- 运行中文版本：

  bash

  复制

  ```
  LOCALE=zh node dist/app.js
  ```

  输出：

  复制

  ```
  你好！
  再见！
  ```

- 运行德文版本：

  bash

  复制

  ```
  LOCALE=de node dist/app.js
  ```

  输出：

  复制

  ```
  Hallo!
  Auf Wiedersehen!
  ```

------

### **6. 总结**

在这个案例中，我们通过 `rootDirs` 将 `src/zh` 和 `src/de` 目录虚拟合并为一个根目录，从而在模块解析时能够根据语言环境动态选择正确的文件。以下是关键点：

1. **`rootDirs` 的作用**：
   - 将多个目录视为同一个根目录，简化模块解析。
   - 支持多语言或动态路径的场景。
2. **动态语言选择**：
   - 通过环境变量或其他方式动态设置语言目录。
   - 在代码中动态加载对应的语言文件。
3. **编译和运行**：
   - 使用 `tsc` 编译 TypeScript 代码。
   - 使用 `node` 运行编译后的 JavaScript 代码。

通过这个案例，你可以更好地理解 `rootDirs` 的用法和实际应用场景。