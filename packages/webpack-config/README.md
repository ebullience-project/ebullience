# @ebullience/webpack-config
webpack配置运行文件（使用webpack5，webpack-dev-server4）

```shell script
npm i -D @ebullience/webpack-config
```

### 使用方法

#### 命令式（会自动使用build.config.js的配置）
```shell script
ebc dev
ebc build
```

#### js代码
```javascript
import webpackTask from '@ebullience/webpack-config';

// taskType表示任务类型
// configPath表示配置文件位置
webpackTask(taskType, configPath)
```

### taskType：任务类型

为枚举值：dev、build

分别表示开发和部署模式

### configPath：配置文件位置

配置文件的地址，默认项目根目录下的：build.config.js

### 配置说明

#### isBuild: boolean;
是构建还是开发模式，默认false

#### inputFile: string;
入口文件地址，默认：有layout配置时为index.tsx，否则为index.ts

#### outputName: string;
输出文件名称，默认：''

#### rootDir: string;
项目根目录，默认：process.cwd()

#### srcDir: string;
源代码目录，默认：src

#### staticDir: string;
静态文件目录，默认：static

#### outputDir: string;
输出文件目录，默认：dist

#### showDetailProgress: boolean;
是否显示详细打包日志，默认false

#### host: string;
开发时本地host，默认：0.0.0.0

#### port: string;
开发时本地port，默认：8888

#### layout: string;
html默认文件，默认：''。此时只打包js文件，用于组件等开发。实际页面项目需要指定index.html的路径。

#### theme: Theme;
主题配置文件，用于定制antd等库等主题，默认：{}

#### libOnDemand: Partial<LibraryImport>[];
对于某些库按需加载打包配置，用于antd等库，默认：[]

#### supportIE: boolean;
是否支持ie，默认：false

#### libraryName: string;
打包组件库时库的名称，默认：''

#### style: boolean;
是否有样式需要打包，默认：true
(该配置项目前用于排除plugins报错，后期需优化删除)

#### thirdLib: ThirdLib;
第三方库配置，声明的库不会被打包至dist中，默认：{}
配置对象的key为node_modules中的库文件夹名，value为在全局作用域下的名称（比如挂在window哪个属性下）
