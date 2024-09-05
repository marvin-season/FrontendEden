import {Chat, useChat, Types} from '@marvin/react-ai'

export default function ChatPage() {

    const chatProps = useChat({
        async onSend(params) {
            console.log(params)
            return await fetch('/api/chat/stream', {
                method: 'POST', body: JSON.stringify(params), headers: {
                    'Content-Type': 'application/json',
                }
            });
        }, onStop: () => {
        }
    });

    return <Chat {...chatProps} AnswerLayout={({answers, onRegenerate}) => {
        return <>
            {
                answers?.map((answer, index) => {
                    return <div className={'flex'} key={index}>
                        <div className={'bg-blue-300 text-white p-2'}>
                            {answer.content}
                        </div>
                    </div>
                })
            }
        </>
    }}/>;
}