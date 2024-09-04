import {Chat, useChat} from '@marvin/react-ai'

const textDecoder = new TextDecoder();
export default function ChatPage() {

    const chatProps = useChat({
        async onSend(params){
            console.log(params)
            return await fetch('/api/chat/stream', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: params.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
        onStop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}