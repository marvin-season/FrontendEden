import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'
import { createMockStream, sleep } from 'aio-tool'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {}
import React from 'react';
const Agent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const status = props['data-status'];
  const description = props['data-description'];
  const [collapsed, setCollapsed] = React.useState(false);
  const isLoading = status === 'loading';

  return (
    <div
      className="rounded-lg p-4 bg-gray-50 shadow mb-4 font-sans text-gray-900"
      {...props}
    >
      <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
        Status:
        <strong className="text-gray-800">{status}</strong>
        {isLoading && (
          <span className="animate-spin inline-block w-3 h-3 border-2 border-t-transparent border-gray-500 rounded-full" />
        )}
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-xs text-blue-600 hover:underline mb-2"
      >
        {collapsed ? '展开内容' : '收起内容'}
      </button>
      {!collapsed && <div className="text-xs text-gray-400 leading-relaxed">{description}</div>}
    </div>
  );
}
const source = `
# Hello, *world*!
This is a simple markdown example using **react-markdown**.

<agent data-status="fail" data-description="失败的调用"></agent>
<agent data-status="loading"></agent>
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

        await sleep(3000);
        setContents(prev => {
            const target = prev.findLast(item => item.type === 'agent');
            if (target) {
                const targetId = target.id;
                return prev.map(item =>
                    item.id === targetId ? { ...item, text: '<agent data-status="success" data-description="hello"></agent>', type: 'agent' } : item
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