import { useChat } from "@marvin/react-ai";
import React, { useMemo, useState } from "react";

const useChatExtend = ({ approachHandle, fetchConversations, conversations = [] }) => {
  const [tools, setTools] = useState([
    { id: 1, name: "天气", selected: false },
    { id: 2, name: "翻译", selected: false },
  ]);

  const [docs, setDocs] = useState([
    { id: 1, name: "资本论", selected: false },
    { id: 2, name: "肖生克的救赎", selected: false },
  ]);

  const attachments = useMemo(() => {
    return [
      ...tools.map(i => ({ ...i, type: "tool" })),
      ...docs.map(i => ({ ...i, type: "doc" })),
    ].filter(item => item.selected);
  }, [tools, docs]);

  const chatProps = useChat({
    async onSend(params, signal) {
      return approachHandle.getApproach.call(null, { ...params, attachments }, signal);
    },
    onConversationStart: async (lastMessage) => {
      // 如果是新对话
      if (!conversations.find(item => item.conversationId === lastMessage.conversationId)) {
        await fetchConversations();
      }
    },
  }, {});

  const AssistantMessageLayout = ({ message, onRegenerate }) => {
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


  const UserMessageLayout = ({ message }) => {
    return <>
      <div className={"flex"}>
        <div className={"bg-gray-400 text-white py-2 px-4 rounded-lg mb-2 mt-4"}>{message.content}</div>
      </div>
    </>;
  };

  const commandElementRender = (commandChar, { onClose }) => {
    const state_ = commandChar === "@" ? tools : docs;
    const setState_ = commandChar === "@" ? setTools : setDocs;
    return <div className={"h-[100px] rounded p-4 backdrop-blur-sm bg-[#fff9]"}>
      <div className={"text-blue-600 text-xl font-bold italic"}>{commandChar}</div>
      <div className={"flex flex-wrap gap-2"}>
        {
          state_.map((item, index) => {
            return <div
              className={`cursor-pointer text-gray-600 py-2 px-4 rounded-xl border text-sm ${item.selected ? "border-green-500" : ""}`}
              key={index}
              onClick={() => {
                setState_(prev => prev.map(item_ => {
                  if (item_.id === item.id) {
                    item_.selected = !item_.selected;
                  }
                  return item_;
                }));
                onClose();
              }}>{item.name}</div>;
          })
        }
      </div>
    </div>;
  };
  return {
    ...chatProps,
    commandElementRender,
    AssistantMessageLayout,
    UserMessageLayout,
    title: "",
  };
};

export default useChatExtend;