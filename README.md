# front-based
## 说明
这是一个mono-repo，使用pnpm管理，当然你可以看到lerna的身影，但是使用pnpm就可以满足需求

切换分支
```shell
git checkout -b yourbranch
```

安装依赖
```shell
pnpm i
```

以下命令会启动所有相关的工程
```shell
npm run dev
npm run dev_

```

启动指定的项目
```shell
cd target/dir && npm run dev
```

```yaml
packages:
  js-advanced: js高级特性验证使用（web.js）
  shared: js相关api手写，以及相关工具类（node.js）
  react-front-research: react开发相关调研
  express-based: 基于express的node开发环境
  react-pdf-viewer: 基于react-pdf的一个可高亮的库
```
