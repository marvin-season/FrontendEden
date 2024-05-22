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

const chineseCollection = {
    // 在遍历过程中会动态添加键值对
};

const srcPath = path.resolve(args[0] || 'src/pages/Demo.tsx');
const outputPath = path.resolve(args[1] || "public/locales/zh/translation.json")
const includeSpace = v => /[\f\r\t\n\s]/.test(v);
const includesChinese = v => /[\u4e00-\u9fa5]+/g.test(v);
const extractChinese = str => str.match(/[\u4e00-\u9fa5]+/g)

const code = fs.readFileSync(srcPath, 'utf8');

let ast = babelParser.parse(code, {
    sourceType: 'module', // default: "script"
    plugins: ['typescript', 'jsx'],
});

// fs.writeFileSync('./demo.ast.json', JSON.stringify(ast, null, 2));

// transform the ast
traverse(ast, {
    StringLiteral(path) {
        const {node, parent} = path;
        // console.log("🚀  ", node, parent)
        if (includesChinese(node.value)) {
            // console.log('StringLiteral', node.value, parent)
            if (t.isJSXAttribute(parent)) {
                // <Input placeholder='请输入你的年龄' /> => <Input placeholder={t('请输入你的年龄')} />
                // 按说应该这么写 path.replaceWith(t.jsxExpressionContainer(t.callExpression(t.identifier('t'),[t.stringLiteral(node.value)])))
                // 但是结果是 <Input placeholder={t(t("请输入你的年龄"))} />
                // 明显被下边的逻辑重复处理了所以可以简单点。只处理成字符串,再经过下边逻辑时就变成我们想要的结果
                path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(node.value)))
                return
            } else {
                const trimValue = node.value.trim()
                console.log("🚀  StringLiteral", trimValue, node.value)
                chineseCollection[trimValue] = trimValue
                path.replaceWithSourceString('t("' + trimValue + '")')
            }
        }
        path.skip()
    }, JSXText(path) {
        const {node, parent} = path;
        const {value} = node;
        if (includesChinese(node.value)) {
            if (!includeSpace(node.value)) {
                path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(node.value)))
                return
            } else {
                const newAstNode = []
                let chineseArr = extractChinese(node.value)
                chineseArr.forEach(str => {
                    let preIndex = node.value.indexOf(str)
                    newAstNode.push(t.jSXText(node.value.slice(0, preIndex)))
                    newAstNode.push(t.jsxExpressionContainer(t.stringLiteral(str)))
                })
                path.replaceWithMultiple(newAstNode)
                return
                // console.log(value.length, value.replace(/[\u4e00-\u9fa5]+/,function(value){return `{t('${value}')}`}) )
                // path.replaceWithSourceString(value.replace(/[\u4e00-\u9fa5]+/,function(value){return `{t('${value}')}`}))
            }

        }
        path.skip()
    }, // 模版字符串
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
    }, ReturnStatement(path) {
        const {node, parent, parentPath} = path;
        const {body} = parent;
        body?.unshift(babelParser.parse('const { t } = useTranslation()').program.body[0],);
    }, Program(path) {
        const {node} = path;
        const {body} = node;

        body?.unshift(babelParser.parse("import { useTranslation } from 'react-i18next'", {sourceType: 'module'}).program.body[0])
    }, ImportDeclaration(path) {
        const {node} = path;
        const {body} = node;
    }
});

const output = generate(ast);
// fs.writeFileSync(srcPath, output.code);
fs.writeFileSync(outputPath, JSON.stringify(chineseCollection, null, 2), 'utf8');
console.log(output.code);
