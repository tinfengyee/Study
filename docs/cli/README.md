在Node.js开发中，处理命令行参数和通过npm传递参数是常见需求。以下是详细解决方案：

### 一、Node.js脚本接收参数
#### 1. 原生方式 `process.argv`
```javascript
// script.js
const args = process.argv.slice(2);
console.log('参数数组:', args);
```
运行：
```bash
node script.js arg1 --port 3000 --env production
```

#### 2. 使用解析库
推荐使用 `yargs` 或 `commander` 处理复杂参数：

##### 使用yargs：
```bash
npm install yargs
```
```javascript
// script.js
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('port', {
    alias: 'p',
    type: 'number',
    default: 3000
  })
  .option('env', {
    type: 'string',
    choices: ['development', 'production']
  })
  .argv;

console.log('端口:', argv.port);
console.log('环境:', argv.env);
```

##### 使用commander：
```bash
npm install commander
```
```javascript
// script.js
const { Command } = require('commander');
const program = new Command();

program
  .option('-p, --port <number>', '端口号', 3000)
  .option('-e, --env <string>', '运行环境', 'development')
  .parse(process.argv);

console.log('端口:', program.opts().port);
console.log('环境:', program.opts().env);
```

### 二、npm脚本传参
#### 1. 直接传递参数
在package.json中：
```json
{
  "scripts": {
    "start": "node script.js"
  }
}
```
运行命令：
```bash
npm run start -- --port 3000 --env production
```

#### 2. 使用环境变量
通过`cross-env`跨平台设置环境变量：
```bash
npm install cross-env --save-dev
```
```json
{
  "scripts": {
    "start": "cross-env PORT=3000 node script.js"
  }
}
```
脚本中获取：
```javascript
const port = process.env.PORT;
```

#### 3. 配置参数（npm config）
运行命令时：
```bash
npm run start --port=3000
```
脚本中获取：
```javascript
const port = process.env.npm_config_port;
```

### 三、开发npm包处理参数
在package.json中定义bin字段：
```json
{
  "name": "my-cli",
  "bin": {
    "my-cli": "./cli.js"
  }
}
```
cli.js示例（使用commander）：
```javascript
#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .option('-d, --debug', '调试模式')
  .action((options) => {
    if (options.debug) console.log('调试模式已开启');
  });

program.parse(process.argv);
```

### 四、注意事项
1. **参数分隔符**：npm脚本传参必须使用`--`分隔，否则参数会被npm截获
2. **布尔参数**：使用`--flag`形式时，解析库会自动转换为`true`
3. **跨平台处理**：推荐使用`cross-env`处理环境变量，避免系统差异
4. **参数验证**：使用解析库的校验功能（如`.choices()`、`.type()`）

### 五、完整示例工作流
1. 创建项目：
```bash
mkdir demo-cli && cd demo-cli
npm init -y
```

2. 安装依赖：
```bash
npm install commander
```

3. 创建cli.js：
```javascript
#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .requiredOption('-u, --user <name>', '用户名（必填）')
  .option('-a, --age <number>', '用户年龄')
  .parse(process.argv);

const options = program.opts();
console.log('用户信息:', options);
```

4. 在package.json中添加：
```json
{
  "bin": {
    "demo-cli": "./cli.js"
  }
}
```

5. 全局链接测试：
```bash
npm link
demo-cli -u John -a 25
```

通过以上方案，您可以灵活处理Node.js脚本和npm包中的参数传递需求，适用于简单脚本到复杂CLI工具的开发场景。