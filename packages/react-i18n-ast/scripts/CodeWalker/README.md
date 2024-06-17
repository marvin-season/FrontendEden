## 运行

```bash
npm run walk-i18n
```

## 如何使用

```javascript
new CodeWalker({src})
      .use(i18nASTParsePlugin)
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




## bug

+ 对于 组件外的 t ，会报错未声明
+ 接口变量如何处理
    + 目前是变量名加了一个时间戳
