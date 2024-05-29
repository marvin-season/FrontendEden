import {Marked, RendererObject} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value;
        }
    })
);
const range = [0, 2];
let renderIndex = 0;

const isInRange = (index: number, startIndex: number, endIndex: number) => {
    return index >= startIndex && index < endIndex
}


const getCoreFunc = ({text, level, raw, type, result}: {
    text: string,
    type?: keyof RendererObject
    level?: number,
    raw?: string,
    result: string,
}) => {
    console.log("🚀 ", type, text, level, raw, renderIndex)

    renderIndex += text.length;
    if (isInRange(renderIndex - text.length, range[0], range[1])) {
        return `<mark>${text}</mark>`;
    }
    return result;
}

const getRender = () => {
    return {
        heading(text: string, level: number, raw: string): string {
            return getCoreFunc({
                text,
                type: "heading",
                level,
                raw,
                result: `<h${level}>${text}</h${level}>`
            })

        },
        strong(text: string): string {
            return getCoreFunc({
                text,
                type: "strong",
                result: `<strong>${text}</strong>`
            });
        },
        code(text: string, infostring: string): string {
            return getCoreFunc({
                text,
                type: "code",
                raw: infostring,
                result: `<pre><code class="hljs language-${infostring}">${text}</code></pre>`

            });
        },
        codespan(text: string): string {
            return `<span class="aaa">${text}</span>`;
        }


    } as RendererObject

}

marked.use({
    renderer: getRender(),
});


const r = marked.parse('**调用示例**\n' +
    '\n' +
    '```python\n' +
    'from smartvision.pipline.pipline_process import pipeline\n' +
    'video_path = [\'/data/video/demo.mp4\']\n' +
    'func = pipeline(task="split-video")\n' +
    'print(func(video_path))\n' +
    '```\n' +
    '\n' +
    '### text-to-image\n' +
    '**介绍**');


console.log("🚀  result", r);

export const HLMarked = () => {

    return <>
        <iframe srcDoc={r as string}></iframe>
        {/*<div dangerouslySetInnerHTML={{__html: r}}></div>*/}
    </>
}
