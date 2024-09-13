import { Chat, useChat } from "@marvin/react-ai";
import { useChatPage } from "./hooks/index.js";
import React, { useEffect } from "react";
import { Delete } from "@icon-park/react";

export default function ChatPage() {
  const {
    conversations,
    conversation,
    fetchConversations,
    selectConversation,
    unSelectConversation,
    deleteConversation,
  } = useChatPage();

  const { reset, ...chatProps } = useChat({
    async onSend(params, signal) {
      console.log(params);
      return await fetch("/api/chat/stream", {
        method: "POST",
        signal,
        body: JSON.stringify({ ...params, conversationId: conversation?.conversationId, toolIds: [1] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onConversationStart: async (lastMessage) => {
      await fetchConversations();
      await selectConversation({ conversationId: lastMessage?.conversationId }, false);
    },
    onConversationEnd: async (lastMessage) => {
      await selectConversation({
        conversationId: conversation.conversationId,
      }, true);
    },
    onStop: () => {
      selectConversation({
        conversationId: conversation.conversationId,
      }, true);
    },
  }, {
    historyMessages: conversation?.messages || [],
  });


  return <>
    <div className={"flex gap-4 justify-center"}>
      <div className={"p-2"}>
        <div className={"cursor-pointer bg-blue-500 p-2 rounded-xl text-white text-center mb-4"}
             onClick={() => {
               unSelectConversation();
             }}>新建会话
        </div>
        {conversations.map(item => {
          return <div
            key={item.id}
            className={`cursor-pointer hover:border hover:border-blue-500 border flex justify-between gap-2 p-2 rounded-xl
            ${item.id === conversation?.id ? "bg-blue-300 text-black" : "bg-gray-100 text-gray-600"} mb-2`}
            onClick={() => selectConversation(item, true)}
          >

            <div className={"w-[200px] overflow-hidden text-nowrap"} style={{
              maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            }}>{item.name}</div>
            <div onClick={(e) => {
              e.stopPropagation();
              confirm("确认删除吗?") && deleteConversation(item.conversationId).then(() => {
                unSelectConversation();
                fetchConversations();
                reset();
              });
            }}>
              <Delete theme={"outline"} fill={"#f40"} />
            </div>
          </div>;
        })}

      </div>
      <div className={"w-[50%] h-screen"}>
        <Chat {...chatProps} title={"ChatBot"} />
      </div>
    </div>
  </>;
}

const AssistantMessageLayout = ({ message, onRegenerate }) => {
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