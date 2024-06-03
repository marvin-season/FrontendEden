import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {Flex} from "antd";
import {useEffect, useMemo, useState} from "react";
import {convertToArray, regex, useHighlightInfo} from "./hook.ts";

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
            const len = text.replace(regex, '').length;
            renderIndex += len;
            const [start, end] = getIntersection([renderIndex - len, renderIndex], [startIndex, endIndex]);
            console.log("🚀  ", start - renderIndex + len, end - renderIndex + len);
            const relativeStartIndex = start - renderIndex + len;
            const relativeEndIndex = end - renderIndex + len;
            if (start < end) {
                const mark = `<mark>${text.substring(relativeStartIndex, relativeEndIndex)}</mark>`;
                text = text.substring(0, relativeStartIndex) + mark + text.substring(relativeEndIndex);
            }

            console.log("🚀  ", text)
            return text;
        }
    },
});


const r = '**介绍**\n' +
    '\n' +
    '入参为视频或音频'
export const HLMarked = () => {
    const [s, setS] = useState(r)
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
            if (startIndex != endIndex) {
                doPlugins(startIndex, endIndex);
            }
            parse();
        }).catch(() => {
            parse();
        })

    }, [rawArray, searchArray]);

    return <Flex style={{whiteSpace: "none"}}>
        <button onClick={event => {
            setS('视频或音频');
            renderIndex = 0;
            // highlight(rawArray, searchArray).then(([startIndex, endIndex]) => {
            //     console.log("🚀  ", startIndex, endIndex)
            //     if (startIndex != endIndex) {
            //         doPlugins(startIndex, endIndex);
            //     }
            //     parse();
            // }).catch(() => {
            //     parse();
            // })
        }}>b
        </button>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
