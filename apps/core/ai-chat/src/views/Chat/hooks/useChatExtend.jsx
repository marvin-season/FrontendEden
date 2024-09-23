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
                <div className={"bg-gray-200 py-2 px-4 flex rounded-lg"}>
                    {message.content}
                </div>
                <div className={"cursor-pointer"} onClick={() => {
                    onRegenerate?.(message);
                }}>RE
                </div>
            </div>
        </>;
    };


    const UserMessageLayout = ({message, onRegenerate}) => {
        return <>
            <div className={"flex"}>
                <div className={"bg-gray-400 text-white py-2 px-4 rounded-lg mb-2 mt-4"}>{message.content}</div>
            </div>
        </>
    }

    const commandElementRender = (commandChar, { onClose }) => {
        return <div className={"h-[100px] rounded p-4 backdrop-blur-sm bg-[#fff9]"}>
            <div className={"text-blue-600 text-xl font-bold italic"}>{commandChar}</div>
            <div onClick={onClose}>
                <span>渲染<span className={"text-green-600 text-xl font-bold italic"}>{commandChar}</span>内容</span>
            </div>
        </div>;
    }
    return {
        ...chatProps,
        commandElementRender,
        AssistantMessageLayout,
        UserMessageLayout,
        title: ""
    }
}

export default useChatExtend