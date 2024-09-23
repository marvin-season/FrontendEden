import {useChat} from "@marvin/react-ai";
import React, { useState } from "react";

const useChatExtend = ({approachHandle, fetchConversations, conversations = []}) => {
    const [tools, setTools] = useState([
      {id: 1, name: '天气', selected: false},
      {id: 2, name: '翻译', selected: false}
    ]);

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
            <div className={"flex flex-wrap gap-2"}>
              {
                tools.map((tool, index) => {
                  return <div
                    className={`cursor-pointer text-gray-600 py-2 px-4 rounded-xl border text-sm ${tool.selected ? "border-green-500" : ""}`}
                    key={index}
                    onClick={() => {
                      setTools(tools.map(item => {
                        if (item.id === tool.id) {
                          item.selected = !item.selected;
                        }
                        return item;
                      }));
                      onClose();
                    }}>{tool.name}</div>;
                })
              }
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