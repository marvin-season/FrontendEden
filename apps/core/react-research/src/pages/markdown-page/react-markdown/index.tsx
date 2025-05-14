import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'
import { createMockStream, sleep } from 'aio-tool'
import { useEffect, useMemo, useRef, useState } from 'react'

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
<agent>this is agent</agent>
`

const components: Components & {
    agent?: React.ElementType
} = {
    agent: ({ node, ...props }) => <Agent {...props} />,
}

export default function ReactMarkdownTest({ }: Props) {
    const [contents, setContents] = useState<{ id: string; text: string; type?: 'agent' }[]>([]);
    const contentValue = useMemo(() => contents.map(c => c.text).join('\n'), [contents]);
    const didRun = useRef(false);
    const handleStream = async () => {
        const stream = createMockStream(source, /\n/);

        for await (const element of stream) {
            const id = crypto.randomUUID();
            const text = element.text;
            const isAgent = text.includes('<agent');
            setContents(prev => [...prev, { id, text, type: isAgent ? 'agent' : undefined }]);
        }

        await sleep(1000);
        setContents(prev => {
            const target = prev.findLast(item => item.type === 'agent');
            if (target) {
                const targetId = target.id;
                return prev.map(item =>
                    item.id === targetId ? { ...item, text: '<agent>hello</agent>', type: 'agent' } : item
                );
            }
            return prev;
        });
    }
    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;
        handleStream()
        return () => {
            console.log('unmount', contents);
            setContents([]);
        }
    }, [])
    return (
        <Markdown rehypePlugins={[rehypeRaw]} components={components}>
            {contentValue}
        </Markdown>
    )
}