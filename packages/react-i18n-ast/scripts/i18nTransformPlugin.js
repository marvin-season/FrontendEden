import babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import types from '@babel/types';

const t = types;
const includeSpace = v => /[\f\r\t\n\s]/.test(v);
const includesChinese = v => /[\u4e00-\u9fa5]+/g.test(v);
const extractChinese = str => str.match(/[\u4e00-\u9fa5]+/g);

export const i18nTransformPlugin = {
    run: ({ast, config}) => {
        console.log("🚀  config", config)
        const chineseCollection = {};
        const stringSets = new Set();

        traverse.default(ast, {
            StringLiteral(path) {
                const {parent, node} = path;
                if (includesChinese(node.value)) {
                    if (t.isJSXAttribute(parent)) {
                        // path.skip()
                        // 转换成string
                        path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(node.value)))
                        return
                    } else {
                        chineseCollection[node.value] = node.value + '[chinese]'
                        path.replaceWithSourceString('t("' + node.value + '")')
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
                const {expressions, quasis} = node;
                // todo 获取所有quasis中value 不为空和数字的, 如果不为末尾,记录前面有几个''
                let enCountExpressions = 0;
                quasis.forEach((node, index) => {
                    const {
                        value: {raw}, tail,
                    } = node;
                    if (!includesChinese(raw)) {
                    } else {
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
        console.log("🚀  this", this)
        config.chineseCollection = chineseCollection;
    }

}
