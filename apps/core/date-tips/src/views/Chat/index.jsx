import {Chat, useChat} from '@marvin/react-ai'

export default function ChatPage() {

    const chatProps = useChat({
        async onSend(params){
            console.log(params)
            return await fetch('/api/chat/stream', {
                method: 'POST',
                body: JSON.stringify(params),
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