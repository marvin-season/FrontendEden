import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {remarkText} from "../plugins/remarkText.js";
import {remarkCode} from "../plugins/remarkCode.js";
import {readSync, writeSync} from "to-vfile";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {addStyles} from "../plugins/addStyle.js";
import rehypeFormat from "rehype-format";
import rehypeDocument from "rehype-document";
import {getHighlightInfo} from "./md-utils.js";

const vFile = readSync('example.md', {encoding: 'utf8'});
getHighlightInfo(vFile.value as string, '输出为台词内容以及起止时间段的json schema\n' +
    '\n' +
    '参数列表').then(([startIndex, endIndex]) => {
    console.log("🚀  ", {startIndex, endIndex})

    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkText, {startIndex, endIndex})
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(addStyles)
        .use(rehypeDocument)
        .use(rehypeFormat)
        .use(rehypeStringify, {allowDangerousHtml: true})

// console.log("🚀  ", String(processor.processSync('# hello')))

    processor
        .process(vFile)
        .then(
            (file) => {
                file.extname = '.html'
                writeSync(file)
            },
            (error) => {
                throw error
            }
        )

})


