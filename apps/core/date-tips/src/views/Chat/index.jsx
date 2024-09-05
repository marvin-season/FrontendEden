import {Chat, useChat, Types} from '@marvin/react-ai'
import {useChatPage} from "./hooks/index.js";

export default function ChatPage() {

    const chatProps = useChat({
        async onSend(params) {
            console.log(params)
            return await fetch('/api/chat/stream', {
                method: 'POST',
                body: JSON.stringify({...params, conversationId: conversation?.conversationId}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }, onStop: () => {
        }
    });

    const {conversations, handleSelectConversation, conversation} = useChatPage()

    return <>
        <div className={'flex'}>
            <div className={'p-2'}>
                {
                    conversations.map(conversation => {
                        return <div key={conversation.id} className={'bg-blue-100 mb-2'} onClick={() => handleSelectConversation(conversation)}>
                            {conversation.name}
                        </div>
                    })
                }

            </div>
            <Chat {...chatProps} AnswerLayout={({answers, onRegenerate}) => {
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
            }}/>
        </div>
    </>;
}