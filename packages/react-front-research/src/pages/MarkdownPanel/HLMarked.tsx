import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {Flex, Input} from "antd";
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
        console.log(`交集范围: [${minIntersection}, ${maxIntersection})`);
        return [minIntersection, maxIntersection]
    } else {
        return [-1, -1]
    }
}

const doPlugins = (startIndex: number, endIndex: number) => marked.use({
    renderer: {
        text(text: string): string {
            console.log("🚀 text ", text)
            const len = text.replace(regex, '').length;
            renderIndex += len;
            const [offsetStart, offsetEnd] = getIntersection([renderIndex - len, renderIndex], [startIndex, endIndex]);

            if (offsetStart < offsetEnd) {
                // 真子集，不用切分
                if (offsetStart >= startIndex && offsetEnd <= endIndex) {
                    return `<span style="color: blueviolet">${text}</span>`
                }

                const relativeStartIndex = offsetStart - renderIndex + len;
                const relativeEndIndex = offsetEnd - renderIndex + len;
                const mark = `<span style="color: blueviolet">${text.substring(relativeStartIndex, relativeEndIndex)}</span>`;
                return text.substring(0, relativeStartIndex) + mark + text.substring(relativeEndIndex);
            }
            return text;
        }
    },
});


const r = '*豆*\n1232'
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
            renderIndex = 0;
            setS('');
        }
    }, []);

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

    return <Flex style={{whiteSpace: "none"}} vertical>
        <Flex>
            <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={event => {
                setS(inputValue || '视频或音频');
                renderIndex = 0;
            }}>b
            </button>
        </Flex>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
