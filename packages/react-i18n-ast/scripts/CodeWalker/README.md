# CodeWalker

## 这是什么

一个用来解析指定ts,tsx,js,jsx，并将其转译为AST，并提供插件的形式以供操作ast，然后反编译ast为目标文件

## 如何使用

```js
new CodeWalker({src})
    .use(i18nTransformPlugin)
    .use(i18nCodeGeneratePlugin)
    .use({
        run({config}) {
            console.log("🚀  正在写入文件: \n", config.src)
            console.log(config.transformed.code);
            effective && fs.writeFileSync(config.src, config.transformed.code);
        }
    })
```
