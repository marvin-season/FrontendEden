# i18n

## 安装依赖
```json
{
  "devDependencies": {
    "i18next": "^23.11.5",
    "i18next-browser-languagedetector": "^8.0.0",
    "i18next-http-backend": "^2.5.2",
    "react-i18next": "^14.1.1",
  }
}
```

## 基本配置

根目录下新增配置文件 i18n.ts
```ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from "moment";
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    // 检测用户当前使用的语言
    // 文档: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // 注入 react-i18next 实例
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

i18n.services.formatter?.add('DD/MM/YYYY', (value) => {
    return moment(value).format('DD/MM/YYYY')
})

i18n.services.formatter?.add('YYYY-MM-DD', (value) => {
    return moment(value).format('YYYY-MM-DD')
})
export default i18n;

```

## 使用

```tsx
import {useTranslation} from "react-i18next";

const Demo = () => {
    const { t } = useTranslation()
    return <>
        { t('你好') }
    </>
}
```

在public 目录下创建 locales/en/translation.json,locales/zh/translation.json (i18next-http-backend：约定的名称)

**zh/translation.json**
```json
{
  "你好": "hello"
}

```

执行程序，可以看到映射结果


## 语言切换
```tsx
const lngs: any = {
    en: {nativeName: 'English'},
    zh: {nativeName: '中文'}
};

<select onChange={(evt) => {
    i18n.changeLanguage(evt.target.value).then()
}}>
    {Object.keys(lngs).map((lng) => (
        <option key={lng} value={lng} label={lngs[lng].nativeName}
                style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}/>
    ))}
</select>
```


## babel 自动化扫描生成 文件
**依赖文件**

```json
{
  "@babel/core": "^7.24.5",
  "@babel/generator": "^7.24.5",
  "@babel/parser": "^7.24.5",
  "@babel/traverse": "^7.24.5",
  "@babel/types": "^7.24.5",
}

```

**编写脚本**

[setup.babel.js](./setup.babel.js)
