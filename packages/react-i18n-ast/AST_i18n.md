

# i18n & AST

## AST

抽象语法树（Abstract Syntax Tree，AST）是一种树状数据结构，用于表示源代码的语法结构。AST 是编译器和解释器的核心数据结构之一，能够表达程序的语法内容和层次结构。

在 AST 中，每个节点代表源代码中的一个结构元素，例如：

- 变量声明
- 函数定义
- 操作符
- 表达式
- 控制结构（如 if 语句、循环）

**如下伪代码**,可见是一个以元素节点组成的树

```json
{
  node: {
    type: '',
    children: [
      {
        node: {
          type: '',
        },
        node: {}
      }
    ]
  } 
}
```



## i18n

i18n 是 "internationalization"（国际化）的简写，其中 "i" 和 "n" 之间有 18 个字母，因此得名 i18n。国际化是指在软件开发过程中，通过设计和开发，使得软件能够适应不同语言、地区和文化的需求，而无需进行核心功能的修改。i18n 通常包括以下几个方面：

1. **语言翻译**：将用户界面文本、消息和提示翻译成不同的语言。
2. **日期和时间格式**：根据用户所在地区显示不同的日期和时间格式。
3. **数字和货币格式**：根据地区习惯显示数字和货币格式。
4. **文本方向**：支持从左到右 (LTR) 和从右到左 (RTL) 的文本布局，例如阿拉伯语和希伯来语。
5. **区域设置**：处理不同地区的文化习惯、符号和度量单位等。



项目发展后期，代码文件众多，手动加入i18n是一个纯体力活，能不能使用ast，将源代码转为AST，并对特征节点进行修改，然后反编译生成目标代码（嵌入i18n功能的代码）?

## 一个AST的例子

### 源码

```tsx
import {name} from '../utils'

export const Page2 = () => {
    const address = "武汉";
    const renderFn = () => <>
        renderFn jsx
    </>

    const ele = <>ele jsx</>
    return <>
        <p>{name}</p>
        <p>{address}</p>
        <div>
            <p>{'东湖'}</p>
        </div>
        <p>{renderFn()}</p>
        <p>{ele}</p>
    </>
}
```

期望通过AST将上述源码转换成如下代码:

```
import {name} from '../utils'
import { useTranslation } from 'react-i18next';

export const Page2 = () => {
		const { t } = useTranslation();
		
    const address = t("武汉");
    const renderFn = () => <>
        renderFn jsx
    </>

    const ele = <>ele jsx</>
    
    return <>
        <p>{name}</p>
        <p>{address}</p>
        <div>
            <p>{t('东湖')}</p>
        </div>
        <p>{renderFn()}</p>
        <p>{ele}</p>
    </>
}
```

### ast解析结果

下面是  对上述 jsx 返回部分 的ast解析结果

```jsx
return <>...</>
```

**总揽**，其中**JSXText** 在这里是换行字符

![image-20240522140408261](/Users/marvin010528/Documents/AST_i18n.assets/image-20240522140408261.png)

**{ address }**

![image-20240522140544049](/Users/marvin010528/Documents/AST_i18n.assets/image-20240522140544049.png)

**{'东湖'}**

![image-20240522141517120](/Users/marvin010528/Documents/AST_i18n.assets/image-20240522141517120.png)

**{ renderFn }**

![image-20240522140712782](/Users/marvin010528/Documents/AST_i18n.assets/image-20240522140712782.png)

那么对于**标签**呢？

```html
<div>
  <p>{'东湖'}</p>
</div>
```

![image-20240522141638019](/Users/marvin010528/Documents/AST_i18n.assets/image-20240522141638019.png)



## @babel/traverse

```
traverse(ast, {
	[key: path.type]: (path) => void
})
```



## 自动化脚本

```js
import babelParser from '@babel/parser';
import generator from '@babel/generator';
import traverser from '@babel/traverse'
import types from '@babel/types';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

const t = types;

const generate = generator.default;
const traverse = traverser.default;
const includeSpace = v => /[\f\r\t\n\s]/.test(v);
const includesChinese = v => /[\u4e00-\u9fa5]+/g.test(v);
const extractChinese = str => str.match(/[\u4e00-\u9fa5]+/g)

const chineseCollection = {
    // 在遍历过程中会动态添加键值对
};

const stringSets = new Set(); // 是否是字符串变量

const srcPath = path.resolve(args[0] || '../src/pages/Page2.tsx');
const outputPath = path.resolve(args[1] || "../public/locales/zh/translation.json")
const code = fs.readFileSync(srcPath, 'utf8');

let ast = babelParser.parse(code, {
    sourceType: 'module', // default: "script"
    plugins: ['typescript', 'jsx'],
});
// fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 2));

// transform the ast
traverse(ast, {
    StringLiteral(path) {
        const {parent, node} = path;
        if (includesChinese(node.value)) {
            if (t.isJSXAttribute(parent)) {
                // path.skip()
                // 转换成string
                path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(node.value)))
                return
            } else {
                chineseCollection[node.value] = node.value
                path.replaceWithSourceString('t("' + node.value + '")')
                console.log("🤪StringLiteral ", chineseCollection[node.value])
                parent.id?.name && stringSets.add(parent.id.name);
            }
        }
        path.skip()
    },
    ImportDeclaration(path) {
        path.node.specifiers.forEach((specifier) => {
            if (t.isImportSpecifier(specifier) || t.isImportDefaultSpecifier(specifier) || t.isImportNamespaceSpecifier(specifier)) {
                specifier.local.name && stringSets.add(specifier.local.name)
            }
        });
    },
    JSXText(path) {
        const {node, parent} = path;
        const {value} = node;
        if (includesChinese(node.value)) {
            if (!includeSpace(node.value)) {
                path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(node.value)))
            } else {
                const newAstNode = []
                let chineseArr = extractChinese(node.value)
                chineseArr.forEach(str => {
                    let preIndex = node.value.indexOf(str)
                    newAstNode.push(t.jSXText(node.value.slice(0, preIndex)))
                    newAstNode.push(t.jsxExpressionContainer(t.stringLiteral(str)))
                })
                path.replaceWithMultiple(newAstNode)
            }
        }
        path.skip()
    },
    Identifier(path) {
        const {parent, node} = path;
        if (t.isJSXExpressionContainer(parent)) {
            if (!stringSets.has(node.name)) {
                return
            }
            const name = `${node.name}_${Date.now()}`
            chineseCollection[name] = `{{${node.name}}}`
            path.replaceWithSourceString(`t('${name}', {${node.name}})`)
            console.log("☀️Identifier ", chineseCollection[name])
        }
        path.skip()
    },
    TemplateLiteral: function (path) {
        const {node} = path;
        // expressions 表达式
        // quasis 表示表达式中的间隙字符串, 每个表达式中间都必须有quasis, 同时首尾也必须是quasis,其中末尾元素需要是tail = true
        // 其中 quasis: {
        //    value: 值, 如果为‘’,一般表示给表达式的占位符
        //     tail: 是否为末尾
        // }
        const {expressions, quasis} = node;
        // todo 获取所有quasis中value 不为空和数字的, 如果不为末尾,记录前面有几个''
        // 生成函数, 插入expressions数组中, 修改quasis节点value为空
        // 如果字符串为最后一个节点,还需要生成一个空白的节点
        let hasTail = false;
        let enCountExpressions = 0;
        quasis.forEach((node, index) => {
            const {
                value: {raw}, tail,
            } = node;
            if (!includesChinese(raw)) {
                return;
            } else {
                console.log("🚀  TemplateLiteral", raw)
                let newCall = t.stringLiteral(raw);
                expressions.splice(index + enCountExpressions, 0, newCall);
                enCountExpressions++;
                node.value = {
                    raw: '', cooked: '',
                };
                // 每增添一个表达式都需要变化原始节点,并新增下一个字符节点
                quasis.push(t.templateElement({
                    raw: '', cooked: '',
                }, false,),);
            }
        });
        quasis[quasis.length - 1].tail = true;
        return
    },
    ReturnStatement(path) {
        const {parent, node} = path
        parent?.body?.unshift(babelParser.parse('const { t } = useTranslation()').program.body[0]);
    },
    Program(path) {
        const {parent, node} = path
        node?.body?.unshift(babelParser.parse("import { useTranslation } from 'react-i18next'", {sourceType: 'module'}).program.body[0])
    }
});

const output = generate(ast);
fs.writeFileSync(srcPath, output.code);
fs.writeFileSync(outputPath, JSON.stringify(chineseCollection, null, 2), 'utf8');
console.log(output.code);
console.log("🚀  ", stringSets)
```

