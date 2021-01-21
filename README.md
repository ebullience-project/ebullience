# ebullience

脚手架工具包

各个包的用法请参考各自的README.md

### 编译说明
1. node版本要求v14+
2. typescript版本要求v4.0+，若未安装typescript或typescript版本不正确需全局安装typescript
```shell
sudo npm i -g typescript
```
3. 下载代码后在项目根目录安装依赖
```shell
npm i
```
4. 在需要编译的package目录下，安装依赖后执行tsc进行编译
```shell
npm i
tsc
```

### 发布说明
1. 确保当前npm仓库指向：https://registry.npmjs.org/
2. 在需要发布的package目录下，修改package.json中的版本号
3. 执行发布命令
```shell
npm publish
```

### 新包开发说明
1. 在packages目录下新建文件夹，名称为包名称
2. 在新文件夹下新建package.json，内容可参考其他包。name字段（npm上发布的包名称）设置为：@ebullience/文件夹名称
3. 在文件夹下新建src目录用于存放源代码
4. 如果编译ts时需要额外类型，新建type目录用于存放声明文件
5. 添加tsconfig.json，与其他包基本一致
6. 在src目录中开始编码