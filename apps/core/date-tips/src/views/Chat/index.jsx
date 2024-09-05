import {Chat, useChat, Types} from '@marvin/react-ai'
import {useChatPage} from "./hooks/index.js";
import React from "react";

export default function ChatPage() {
    const {conversations, handleSelectConversation, handleUnSelectConversation, conversation} = useChatPage()

    const chatProps = useChat({
        async onSend(params, signal) {
            console.log(params)
            return await fetch('/api/chat/stream', {
                method: 'POST',
                signal,
                body: JSON.stringify({...params, conversationId: conversation?.conversationId }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }, onConversationEnd: async (lastMessage) => {
            console.log('onConversationEnd', lastMessage);
            handleSelectConversation(lastMessage.conversationId).then(() => {
                console.log('选中会话: ', lastMessage.conversationId)
            })
        }, onConversationStart: console.log, onStop: () => {
        }
    }, {
        historyMessage: conversation?.messages || []
    });


    return <>
        <div className={'flex gap-4'}>
            <div className={'p-2'}>
                <div onClick={() => {
                    handleUnSelectConversation();
                }}>新建会话</div>
                {conversations.map(item => {
                    return <div key={item.id}
                                className={`${item.id === conversation?.id ? 'bg-blue-100' : ''} mb-2`}
                                onClick={() => handleSelectConversation(item.conversationId)}>
                        {item.name}
                    </div>
                })}

            </div>
            <div className={'w-[800px] h-screen'}>
                <Chat {...chatProps} title={'ChatBot'} />
            </div>
        </div>
    </>;
}

const AssistantMessageLayout = ({message, onRegenerate}) => {
    return <>
        <div className={'flex'}>
            <div className={'bg-blue-300 text-white p-2'}>
                {message.content}
            </div>
            <div className={'cursor-pointer'} onClick={() => {
                onRegenerate?.(message);
            }}>0️⃣
            </div>
        </div>
    </>
}