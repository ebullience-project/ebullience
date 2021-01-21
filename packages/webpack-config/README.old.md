# ebullience
A cli framework for react.
This tool is for simple react project.

### install
```shell script
npm i -D ebullience
```

### add commands to package.json
Just add these commands to package.json:

```json
{
 "scripts": {
    "build": "ebc build",
    "dev": "ebc dev"
  }
}
```

### code quality tools
There are some tools for better coding:

#### eslint
Build a file named ".eslintrc.js":

```js
module.exports = {
  extends: '@ebullience'
};
```

Then you can use eslint to check your scripts.

#### stylelint
Build a file named "stylelint.config.js":

```js
module.exports = {
  extends: '@ebullience/stylelint-config'
};
```

Then you can use eslint to check your style files.

#### prettier
Build a file named ".prettierrc.js":

```js
module.exports = {
  ...require('@ebullience/prettier-config')
};
```

Then you can use prettier to check your scripts and style files. Prettier work with eslint and stylelint.

#### tsconfig
Build a file named "tsconfig.json":

```json
{
  "extends": "@ebullience/typescript-config/react/tsconfig.json",
  "include": [
    "src"
  ]
}
```

Then you can use typescript.

### usage
When you are develop a project, run this command:

```shell script
npm run dev
```

When you need to publish your project, run this command:

```shell script
npm run build
```

### build configuration
You can add a file named "ebullience.config.js" in the root directory of your project. These configurations can change the result of build.

```js
module.exports = {
  outputDir: 'build'
};

```
All the configurations are following:

#### outputName
The rule of names of output files.

type: string

default: '\[name].\[contenthash]' in 'ebc build' and '\[name]' in 'ebc dev'
#### rootDir
Root directory of your project.

type: string

default: process.cwd()
#### srcDir
Directory of your source code.

type: string

default: 'src'
#### staticDir
Directory of static files.

type: string

default: 'static'
#### outputDir
Directory of output files.

type: string

default: 'dist'
#### showDetailProgress
Show detail messages in console during build.

type: boolean

default: false

