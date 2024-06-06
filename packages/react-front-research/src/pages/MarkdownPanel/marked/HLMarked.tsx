import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {useEffect, useMemo, useState} from "react";
import {convertToArray, getIntersection, useHighlightInfo} from "../hooks/implict-highlight-algorithm.ts";
import {MarkdownContainer} from "@/pages/MarkdownPanel/components/MarkdownContainer.tsx";

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
            const len = text.length;
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


export const HLMarked = () => {
    const [source, setSource] = useState('')
    const [s, setS] = useState('')

    const [html_, setHtml_] = useState('')
    const {highlight} = useHighlightInfo();
    const parse = () => {
        const rs = marked.parse(source);
        setHtml_(rs as string)
    }

    const rawArray = useMemo(() => {
        return convertToArray(source)
    }, [source]);

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

    return <>
        <MarkdownContainer onSource={setSource} onHL={() => {
        }} onSearch={(value) => {
            setS(value);
            renderedIndex = 0;
        }}>
            <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>

        </MarkdownContainer>
    </>
}
