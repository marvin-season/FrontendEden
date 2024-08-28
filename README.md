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
控制台出现如下安装信息，终止跳过即可
```text
nonode_modules/.pnpm/canvas@2.11.2_encoding@0.1.13/node_modules/canvas: Running install script, failed in 7.3s (skipped as optional)
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
