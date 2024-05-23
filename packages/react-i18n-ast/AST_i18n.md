

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
[点击查看 ast.js](./scripts/ast2.js)
