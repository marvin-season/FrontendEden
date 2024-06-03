import {Marked, RendererObject} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {Flex} from "antd";
import {useEffect, useMemo, useState} from "react";
import {useHighlightInfo} from "@/pages/MarkdownPanel/hook.ts";

let renderIndex = 0;

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value;
        }
    })
);
const getIntersection = (array1: [number, number], array2: [number, number]) => {
    console.log("🚀  ", array1, array2);
    // 获取每个数组的最小值和最大值
    const min1 = Math.min(...array1);
    const max1 = Math.max(...array1);
    const min2 = Math.min(...array2);
    const max2 = Math.max(...array2);

    // 计算交集范围
    const minIntersection = Math.max(min1, min2);
    const maxIntersection = Math.min(max1, max2);

    // 检查是否存在交集范围
    if (minIntersection <= maxIntersection) {
        console.log(`交集范围: [${minIntersection}, ${maxIntersection}]`);
        return [minIntersection, maxIntersection]
    } else {
        console.log('没有交集范围');
        return [-1, -1]
    }
}

const doPlugins = (startIndex: number, endIndex: number) => marked.use({
    renderer: {
        text(text: string): string {
            console.log("🚀  text", text, startIndex, endIndex)
            renderIndex += text.length;
            const [start, end] = getIntersection([renderIndex - text.length, renderIndex], [startIndex, endIndex]);

            if (start < end) {
                const mark = `<mark>${text.substring(start, end)}</mark>`;
                return text.substring(0, start) + mark + text.substring(end);
            }
            return text;
        }
    },
});


const getRender = () => {
    return {
        // heading(text: string, level: number, raw: string): string {
        //     console.log("🚀  heading", text)
        //     return `<h${level}>${text}</h${level}>`
        // },
        // paragraph(text: string): string {
        //     console.log("🚀  paragraph", text)
        //     return `<p>${text}</p>`
        // },
        // strong(text: string): string {
        //     console.log("🚀  strong", text)
        //     return `<strong>${text}</strong>`
        // },
        // code(text: string, infostring: string): string {
        //     const code = `<code class="hljs language-${infostring}">${text}</code>`;
        //
        //     if (isInRange(renderIndex - text.length, range[0], range[1])) {
        //         return `<pre style="border: #4f0 1px solid">${code}</pre>`;
        //     }
        //     return `<pre>${code}</pre>`;
        // },
        // codespan(text: string): string {
        //     console.log("🚀 codespan ", text)
        //     return `<span class="">${text}</span>`;
        // },
        // text(text: string): string {
        //     console.log("🚀  text", text)
        //     renderIndex += text.length;
        //     if (isInRange(renderIndex - text.length, range[0], range[1])) {
        //         return `<mark>${text}</mark>`;
        //     }
        //     return text;
        // }

    } as RendererObject

}
const convertToArray = (str: string) => {
    return str.split('').map((str, index) => {
        return {
            index,
            str
        }
    })
}
const r = '入参为视频或音频输出\n为.台词内容以及起止时间段的'
export const HLMarked = () => {
    const [s, setS] = useState('频输出\n为台词内')
    console.log("🚀  r.length, s.length", r.length, s.length)

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
        highlight(rawArray, searchArray).then(([startIndex, endIndex]) => {
            console.log("🚀  ", startIndex, endIndex)
            if (startIndex != endIndex) {
                doPlugins(startIndex, endIndex);
            }
            parse();
        }).catch(() => {
            parse();
        })

    }, [rawArray, searchArray]);

    return <Flex style={{whiteSpace: "pre"}}>
        <button onClick={event => {
            setS('入参为视频或音频输出\n为.台词内容以及起');
            renderIndex = 0;
        }}>b
        </button>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
