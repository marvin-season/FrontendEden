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
                const jsonV = textDecoder.decode(streamElement)
                try {
                    const message = JSON.parse(jsonV.replace(/data:\s*/, ''))
                    onMessage(message)
                } catch (e) {
                    console.log(e)
                }
            }
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}