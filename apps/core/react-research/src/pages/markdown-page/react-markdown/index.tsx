import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

type Props = {}
const MyDiv = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
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

<div>hi</div>
`

export default function ReactMarkdownTest({ }: Props) {
    return (
        <div>
            <Markdown rehypePlugins={[rehypeRaw]}
                components={{
                    div: ({ node, ...props }) => <MyDiv {...props} />,
                }}>
                {source}
            </Markdown>
        </div>
    )
}