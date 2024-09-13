import { Chat, useChat } from "@marvin/react-ai";
import { useChatPage } from "./hooks/index.js";
import React, {} from "react";
import { Delete } from "@icon-park/react";

export default function ChatPage() {
  const {
    conversations,
    fetchConversationMessages,
    fetchConversations,
    deleteConversation,
  } = useChatPage();

  const chatProps = useChat({
    async onSend(params, signal) {
      console.log(params);
      return await fetch("/api/chat/stream", {
        method: "POST",
        signal,
        body: JSON.stringify({ ...params, toolIds: [1] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onConversationStart: async (lastMessage) => {
      // 如果是新对话
      if (!conversations.find(item => item.conversationId === lastMessage.conversationId)) {
        await fetchConversations();
      }
    },
    onConversationEnd: async (lastMessage) => {

    },
    onStop: () => {

    },
  }, {});


  return <>
    <div className={"bg-gray-700 flex gap-4 justify-center"}>
      <div className={"p-2 h-screen flex flex-col"}>
        <div className={"cursor-pointer bg-cyan-800 text-gray-200 p-2 rounded-xl text-center mb-4"}
             onClick={() => {
               chatProps.checkoutConversation();
             }}>新建会话
        </div>
        <div className={"overflow-y-scroll scrollbar-none"}>
          {conversations.map(item => {
            return <div
              key={item.id}
              className={`cursor-pointer border border-green-800 flex justify-between gap-2 p-2 rounded-xl
            ${item.conversationId === chatProps.conversationId ? "bg-cyan-700 text-black" : "bg-gray-600 text-gray-300"} mb-2`}
              onClick={async () => {
                chatProps.checkoutConversation(item.conversationId);
                const messages = await fetchConversationMessages(item.conversationId);
                chatProps.setHistoryMessages(messages);
              }}
            >

              <div className={"w-[200px] overflow-x-scroll scrollbar-none pr-4 text-nowrap mr-4"} style={{
                maskImage: "linear-gradient(to right, black 90%, transparent 100%)",
              }}>{item.name}</div>
              <div onClick={(e) => {
                e.stopPropagation();
                confirm("确认删除吗?") && deleteConversation(item.conversationId).then(() => {
                  fetchConversations();
                  chatProps.checkoutConversation();
                });
              }}>
                <Delete theme={"outline"} fill={"#f40"} />
              </div>
            </div>;
          })}
        </div>


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