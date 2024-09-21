import { Chat, useChat } from "@marvin/react-ai";
import {useChatApproach, useChatExtend, useChatPage} from "./hooks/index.js";
import React, { useEffect, useState } from "react";
import { Delete } from "@icon-park/react";
import { EvalPanel } from "./components/EvalPanel.jsx";

export default function ChatPage() {
  const {
    conversations, fetchConversationMessages, fetchConversations, deleteConversation,
  } = useChatPage();

  const approachHandle = useChatApproach();

  const chatProps = useChatExtend({
    approachHandle,
    fetchConversations,
    conversations,
  })


  return <>
    <div className={"bg-white p-2 h-screen flex gap-4 justify-center"}>
      <div className={"p-4 border rounded-xl bg-gray-100 b flex flex-col w-[300px]"}>
        <div className={"cursor-pointer bg-cyan-400 text-white p-2 rounded-xl text-center mb-4"}
             onClick={() => {
               chatProps.checkoutConversation();
             }}>新建会话
        </div>
        <div className={"overflow-y-scroll scrollbar-none"}>
          {conversations.map(item => {
            return <div
              key={item.id}
              className={`cursor-pointer border border-green-100 flex items-center justify-between gap-2 p-2 rounded-xl
            ${item.conversationId === chatProps.conversationId ? "bg-cyan-400 text-sky-50" : "bg-cyan-200 text-white"} mb-2`}
              onClick={async () => {
                chatProps.checkoutConversation(item.conversationId);
                const messages = await fetchConversationMessages(item.conversationId);
                chatProps.setHistoryMessages(messages);
              }}
            >

              <div className={"w-[200px] overflow-x-scroll scrollbar-none pr-4 text-nowrap mr-4"} style={{
                maskImage: "linear-gradient(to right, black 90%, transparent 100%)",
              }}>{item.name?.toUpperCase()}</div>
              <div onClick={(e) => {
                e.stopPropagation();
                confirm("确认删除吗?") && deleteConversation(item.conversationId).then(() => {
                  fetchConversations();
                  chatProps.checkoutConversation();
                });
              }}>
                <Delete theme={"outline"} fill={"#fff"} />
              </div>
            </div>;
          })}
        </div>


      </div>
      <div className={"w-[50%] border rounded-xl"}>
        <Chat {...chatProps} title={"ChatBot"} commandElementRender={() => {
          return <div className={'h-[100px]'}>
            commandElementRender Element
          </div>
        }}/>
      </div>
      <div className={"flex-grow border rounded-xl p-4 text-white bg-gray-400 flex flex-col"}>
        <EvalPanel state={approachHandle.state} />
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