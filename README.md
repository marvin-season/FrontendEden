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
apps: 
  - core: core apps
  - other: other apps

packages:
  - ui: ui
  - config: common config
```
