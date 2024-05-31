import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {stream} from "unified-stream";

const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
console.log("🚀  ", String(processor.processSync('# hello')))
