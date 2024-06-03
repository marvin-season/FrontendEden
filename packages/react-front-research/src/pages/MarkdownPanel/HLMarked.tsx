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


const doPlugins = (startIndex: number, endIndex: number) => marked.use({
    renderer: {
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
            renderedIndex = 0;
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
                renderedIndex = 0;
            }}>b
            </button>
        </Flex>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
