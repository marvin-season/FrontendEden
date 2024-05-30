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
const range = [0, 10];
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
            const code = `<code class="hljs language-${infostring}">${text}</code>`;

            renderIndex += text.length;
            if (isInRange(renderIndex - text.length, range[0], range[1])) {
                return `<pre style="border: #4f0 1px solid">${code}</pre>`;
            }
            return `<pre>${code}</pre>`;
        },
        codespan(text: string): string {
            console.log("🚀 codespan ", text)
            return `<span class="">${text}</span>`;
        }


    } as RendererObject

}

marked.use({
    renderer: getRender(),
});


const r = marked.parse('**调用示例**\n' +
    '\n' +
    '```js\n' +
    'const useHighlightInfoMD = (mdArr: string[], t: string) => {\n' +
    '    const pText = t.replace(regex, "");\n' +
    '    const pTextArr = t.split(textSplitRegex);\n' +
    '    console.log("🚀  mdArr pTextArr", {mdArr, pTextArr})\n' +
    '\n' +
    '    let mdEndIndex = 0;\n' +
    '    let accText = "";\n' +
    '    // left => right\n' +
    '    while (mdEndIndex < mdArr.length) {\n' +
    '        const text = mdArr[mdEndIndex];\n' +
    '        accText += text.replace(regex, "");\n' +
    '        const index = accText.indexOf(pText);\n' +
    '        if (pText.length > 0 && index > -1) {\n' +
    '            return [mdEndIndex - pTextArr.length + 1, mdEndIndex + 1]\n' +
    '        }\n' +
    '        mdEndIndex += 1;\n' +
    '    }\n' +
    '    return [0, 0]\n' +
    '}\n');


console.log("🚀  result", r);

export const HLMarked = () => {

    return <>
        <div style={{background: "#fff", padding: "20px"}} dangerouslySetInnerHTML={{__html: r}}></div>
    </>
}
