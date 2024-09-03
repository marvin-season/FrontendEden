import {Chat, useChat} from '@marvin/react-ai'

const textDecoder = new TextDecoder();
export default function ChatPage() {

    const chatProps = useChat({
        invoke: async (params, onMessage, onFinish) => {
            console.log(params)
            const stream = await fetch('/api/chat/stream', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: params.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            for await (const streamElement of stream.body) {
                const v = textDecoder.decode(streamElement)
                console.log('streamElement', v)
            }
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}