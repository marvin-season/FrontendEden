## node 配置ts环境
+ 初始化项目
```shell
pnpm init -y

tsx init
```
+ 安装ts相关依赖
```shell
pnpm add ts-node  typescript @types/node --save-dev           
```
+ 配置tsconfig.json
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "moduleResolution": "NodeNext"
  },
  "include": ["src"],
  "exclude": ["node_modules"],
  "ts-node": {
    "transpileOnly": true,
    "compilerOptions": {
      "module": "NodeNext"
    }
  }
}

```
+ 配置packages.json
```json
{
  "type": "module",
  "scripts": {
    "dev": "ts-node-esm src/index.ts"
  }
}
```

注意 项目中使用的是es module的方式，commonjs的对应配置使用如下:
```json
{
  "type": "module",
  "module": "commonjs",
  "dev": "ts-node src/index.ts"
}
```
