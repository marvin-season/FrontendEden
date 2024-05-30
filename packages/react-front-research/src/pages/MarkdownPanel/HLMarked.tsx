import {Marked, RendererObject} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {Flex} from "antd";
import {useEffect, useState} from "react";
import {useHighlightInfoMD} from "@/pages/MarkdownPanel/hook.ts";

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

const doPlugins = (startIndex: number, endIndex: number) => marked.use({
    renderer: {
        text(text: string): string {
            console.log("🚀  text", text, startIndex, endIndex)
            renderIndex += text.length;
            if (isInRange(renderIndex - text.length, startIndex, endIndex)) {
                return `<mark>${text}</mark>`;
            }
            return text;
        }
    },
});


const isInRange = (index: number, startIndex: number, endIndex: number) => {
    return index >= startIndex && index < endIndex
}

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
const r = '### text-to-image\n' +
    '**介绍**\n' +
    '\n' +
    '## 我们支持哪些任务？\n' +
    '\n' +
    '### split-video\n' +
    '\n' +
    '**介绍**\n' +
    '\n' +
    '入参为视频或音频，输出为台词内容以及起止时间段的json schema\n' +
    '\n' +
    '**参数列表**'

export const HLMarked = () => {
    const [s, setS] = useState('入参为视频或音频，输出为台词内容以及起止时间段的json schema\n')

    const [html_, setHtml_] = useState('')
    const [startIndex, endIndex] = useHighlightInfoMD(r, s);
    const parse = () => {
        const rs = marked.parse(r);
        console.log("🚀 rs ", rs)
        setHtml_(rs as string)
    }

    useEffect(() => {
        console.log("🚀  ", startIndex, endIndex)
        if (startIndex != endIndex) {
            doPlugins(startIndex, endIndex);
        }
        parse();
    }, [startIndex, endIndex]);

    return <Flex>
        <button onClick={event => {
            setS('### text-to-image');
            renderIndex = 0;
        }}>b
        </button>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: html_}}></div>
    </Flex>
}
