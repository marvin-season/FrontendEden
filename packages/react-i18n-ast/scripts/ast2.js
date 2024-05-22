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

const stringSets = new Set();

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
        const {expressions, spaceStr} = node;

        let enCountExpressions = 0;
        spaceStr.forEach((node, index) => {
            const {
                value: {raw}, tail,
            } = node;
            if (!includesChinese(raw)) {

            } else {
                console.log("🚀  TemplateLiteral", raw)
                let newCall = t.stringLiteral(raw);
                expressions.splice(index + enCountExpressions, 0, newCall);
                enCountExpressions++;
                node.value = {
                    raw: '', cooked: '',
                };
                // 每增添一个表达式都需要变化原始节点,并新增下一个字符节点
                spaceStr.push(t.templateElement({
                    raw: '', cooked: '',
                }, false,),);
            }
        });
        spaceStr[spaceStr.length - 1].tail = true;
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
