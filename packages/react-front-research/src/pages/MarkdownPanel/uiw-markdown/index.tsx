import MarkdownPreview from '@uiw/react-markdown-preview'
import {getHighlightInfo} from "@/pages/MarkdownPanel/uiw-markdown/hook.ts";
import {useEffect} from "react";

import {visit} from 'unist-util-visit';
import {getIntersection} from "./hook.ts";


export const remarkText = ({startIndex, endIndex}: { startIndex: number; endIndex: number }) => {
    console.log("🚀  startIndex, endIndex", startIndex, endIndex)
    debugger
    return function (tree: any) {
        visit(tree, 'text', (node, index, parent) => {
            const startOffset = node.position.start.offset;
            const endOffset = node.position.end.offset;
            const intersection = getIntersection([startIndex, endIndex], [startOffset, endOffset])

            if (intersection[0] != intersection[1]) {
                const relativeStart = intersection[0] - startOffset;
                const relativeEnd = intersection[1] - startOffset;
                node.value = `${node.value.substring(0, relativeStart)}<mark>${node.value.substring(relativeStart, relativeEnd)}</mark>${node.value.substring(relativeEnd)}`
                parent.children.splice(index, 1, {
                    type: 'html',
                    value: node.value
                })
            }
        })
    }
}

const source = '**调用示例**\n' +
    '\n' +
    '```js\n' +
    'const useHighlightInfoMD = (mdArr: string[], t: string) => {\n' +
    '    return [0, 0]\n' +
    '}\n' +
    '```\n' +
    '\n' +
    '### text-to-image\n' +
    '**介绍**\n' +
    '\n' +
    '[simple_demo](simple-demo).\n' +
    '\n' +
    '[Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt).\n' +
    '## 我们支持哪些任务？\n' +
    '\n' +
    '### split-video\n' +
    '\n' +
    '**介绍**\n' +
    '\n' +
    '入参为视频或音频，输出为台词内容以及起止时间段的json schema\n' +
    '\n' +
    '*参数列表*\n' +
    '\n' +
    '| pipline args | required | type | remarks                                   |\n' +
    '| ------------ | -------- | ---- | ----------------------------------------- |\n' +
    '| task         | true     | str  | 任务名称                                  |\n' +
    '| model        | false    | str  | 模型本地地址或仓库地址（用户名/仓库名称） |\n' +
    '| device       | false    | str  | cpu / gpu                                 |\n' +
    '\n' +
    '**调用示例**\n' +
    '\n' +
    '计划安排\n' +
    '\n' +
    '+ 吃饭\n' +
    '+ 睡觉\n' +
    '+ 打豆豆\n' +
    '    - 小企鹅\n' +
    '        * 小猫咪\n'

const UiwMarkdown = () => {

    const handle = () => {
        getHighlightInfo(source, "我们支持哪些任务").then(([startIndex, endIndex]) => {
            console.log("🚀  ", startIndex, endIndex)
        })
    }

    useEffect(() => {
        handle();
    }, []);
    return <MarkdownPreview
        source={source}
        remarkPlugins={[[remarkText, {startIndex: 218, endIndex: 226}]]}>
    </MarkdownPreview>
}

export default UiwMarkdown
