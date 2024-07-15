# front-based
## 说明
这是一个mono-repo，使用lerna + pnpm管理

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
cd [项目所在路径] && npm run dev
```

```yaml
packages:
  js-ts-based: js/ts特性验证
  shared: js相关api手写，以及相关工具类（node.js）
  react-ai: 搭建的一个全新的ai相关的组件库
  react-research: react开发相关学习研究
  express-based: 基于express的node开发环境
  react-pdf-viewer: 基于react-pdf的一个可高亮的库
  react-i18n-ast: ast与i18n
  unified: ast util
```
