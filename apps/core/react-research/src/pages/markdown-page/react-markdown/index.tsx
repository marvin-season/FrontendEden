import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'

type Props = {}
const Agent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div style={{ border: '1px solid red', padding: '8px' }} {...props}>
            👋 自定义组件内容：
            {children}
        </div>
    )
}
const source = `
# Hello, *world*!
This is a simple markdown example using **react-markdown**.

<agent>this is agent</agent>
`

const components: Components & {
  agent?: React.ElementType
} = {
  agent: ({ node, ...props }) => <Agent {...props} />,
}

export default function ReactMarkdownTest({ }: Props) {
    return (
        <div>
            <Markdown rehypePlugins={[rehypeRaw]} components={components}>
                {source}
            </Markdown>
        </div>
    )
}