import {useChat} from "@marvin/react-ai";
import React from "react";

const useChatExtend = ({approachHandle, fetchConversations, conversations = []}) => {
    const chatProps = useChat({
        async onSend(params, signal) {
            return approachHandle.getApproach.call(null, params, signal);
        },
        onConversationStart: async (lastMessage) => {
            // 如果是新对话
            if (!conversations.find(item => item.conversationId === lastMessage.conversationId)) {
                await fetchConversations();
            }
        },
    }, {});

    const AssistantMessageLayout = ({message, onRegenerate}) => {
        return <>
            <div className={"flex"}>
                <div className={"bg-blue-300 text-white p-2"}>
                    {message.content}
                </div>
                <div className={"cursor-pointer"} onClick={() => {
                    onRegenerate?.(message);
                }}>0️⃣
                </div>
            </div>
        </>;
    };

    const commandElementRender = (commandChar) => {
        return <div className={'h-[100px]'}>
            <div className={"text-blue-600 text-xl font-bold italic"}>{commandChar}</div>
            commandElementRender Element
        </div>
    }
    return {
        ...chatProps,
        commandElementRender,
        AssistantMessageLayout,
        title: "Chat-Room"
    }
}

export default useChatExtend