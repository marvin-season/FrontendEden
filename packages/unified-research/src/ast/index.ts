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

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkText)
    .use(remarkCode)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(addStyles)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify, {allowDangerousHtml: true})

// console.log("🚀  ", String(processor.processSync('# hello')))

processor
    .process(readSync('example.md', {encoding: 'utf8'}))
    .then(
        (file) => {
            file.extname = '.html'
            writeSync(file)
        },
        (error) => {
            throw error
        }
    )


