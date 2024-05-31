import {stream} from 'unified-stream'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import rehypeDocument from 'rehype-document';
import rehypeFormat from "rehype-format";

const processor = unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeDocument, {title: 'Contents'})
    .use(rehypeFormat, {indent: 4})
    .use(rehypeStringify)


process.stdin.pipe(stream(processor)).pipe(process.stdout)
