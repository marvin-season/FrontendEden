import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {Flex, Input} from "antd";
import {useEffect, useMemo, useState} from "react";
import {convertToArray, getIntersection, regex, useHighlightInfo} from "./hook.ts";

let renderedIndex = 0;

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value;
        }
    })
);

const uninstallPlugin = () => marked.use({
    renderer: {
        text(text: string): string {
            return text
        },
        link(href: string, t, text: string): string {
            return text
        }
    }
})

const installPlugins = (startIndex: number, endIndex: number) => marked.use({
    renderer: {
        link(href: string, title: string | null | undefined, text: string): string {
            renderedIndex += href.length
            return text
        },
        text(text: string): string {
            const len = text.replace(regex, '').length;
            const [offsetStart, offsetEnd] = getIntersection([renderedIndex, renderedIndex + len], [startIndex, endIndex]);

            if (offsetStart < offsetEnd) {
                const relativeStartIndex = offsetStart - renderedIndex;
                const relativeEndIndex = offsetEnd - renderedIndex;
                const mark = `<span style="color: blueviolet">${text.substring(relativeStartIndex, relativeEndIndex)}</span>`;
                text = text.substring(0, relativeStartIndex) + mark + text.substring(relativeEndIndex);
            }
            renderedIndex += len;

            return text;
        }
    },
});


const r = '## 我们支持哪些任务？\n' +
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
    '  - 小企鹅\n' +
    '    * 小猫咪'
export const HLMarked = () => {
    const [inputValue, setInputValue] = useState('')
    const [s, setS] = useState(r)

    const [html_, setHtml_] = useState('')
    const {highlight} = useHighlightInfo();
    const parse = () => {
        const rs = marked.parse(r);
        setHtml_(rs as string)
    }

    const rawArray = useMemo(() => {
        return convertToArray(r)
    }, [r]);

    const searchArray = useMemo(() => {
        return convertToArray(s)
    }, [s]);

    useEffect(() => {
        return () => {
            renderedIndex = 0;
            uninstallPlugin();
        }
    }, []);

    useEffect(() => {
        highlight(rawArray, searchArray).then(([startIndex, endIndex]) => {
            console.log("🚀  ", startIndex, endIndex)
            if (startIndex != endIndex) {
                installPlugins(startIndex, endIndex);
            } else {
                uninstallPlugin();
            }
            parse();
        }).catch(() => {
            parse();
        })

    }, [rawArray, searchArray]);

    return <Flex style={{whiteSpace: "none"}} vertical>
        <Flex>
            <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={event => {
                setS(inputValue || '视频或音频');
                renderedIndex = 0;
            }}>search
            </button>
        </Flex>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
