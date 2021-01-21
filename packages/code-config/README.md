# @ebullience/code-config
前端项目代码规范配置文件（eslint、stylelint、prettier、tsconfig）

```shell script
npm i -D @ebullience/code-config
```

#### 配置eslint
项目根目录下新建一个文件 ".eslintrc.js":

```js
const config = require('@ebullience/code-config/dist/eslint.js')

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    // 自己的规则
  }
}
```

重启ide或编辑器可完成识别

#### 配置stylelint
项目根目录下新建一个文件 ".stylelintrc.js":

```js
const config = require('@ebullience/code-config/dist/stylelint.js')

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    // 自己的规则
  }
}
```

重启ide或编辑器可完成识别

#### 配置prettier
项目根目录下新建一个文件 ".prettierrc.js":

```js
module.exports = {
  ...require('@ebullience/code-config/dist/prettier.js'),
  // 自己的规则
}
```

重启ide或编辑器可完成识别

prettier用于校验代码风格，可同时针对js/ts和样式、html文件生效，配置中eslint和stylelint均使用了prettier配置。可以通过prettier配置的选项优先用prettier配置。

#### 配置tsconfig
项目根目录下新建一个文件 "tsconfig.json":

```json
{
  "extends": "@ebullience/code-config/typescript/tsconfig.json",
  "include": [
    "src"
  ]
}
```