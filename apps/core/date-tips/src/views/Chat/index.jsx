import { Chat, useChat } from "@marvin/react-ai";
import { useChatApproach, useChatPage } from "./hooks/index.js";
import React, { useEffect, useState } from "react";
import { Delete } from "@icon-park/react";
import { EvalPanel } from "./components/EvalPanel.jsx";

export default function ChatPage() {
  const {
    conversations, fetchConversationMessages, fetchConversations, deleteConversation,
  } = useChatPage();

  const [enableEval, setEnableEval] = useState(false);
  const approachHandle = useChatApproach();

  const chatProps = useChat({
    async onSend(params, signal) {
      console.log(approachHandle);
      return approachHandle.getApproach.call(null, params, signal);
    }, onConversationStart: async (lastMessage) => {
      // 如果是新对话
      if (!conversations.find(item => item.conversationId === lastMessage.conversationId)) {
        await fetchConversations();
      }
    },
  }, {});


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
        <div className={"p-2 flex items-center gap-2"}>
          <input type={"checkbox"} checked={enableEval} onChange={e => {
            setEnableEval(e.target.checked);
          }} />
          <span>开启测试</span>
          <Delete theme={"outline"} fill={"#fff"} onClick={() => {
            approachHandle.state.setResponse(null);
          }} />

        </div>
        {approachHandle.state.response ? <div className={"p-2"}>可读流已就绪</div> :
          <div className={"p-2 text-blue-600"}>暂无可读流，请先生成流对象</div>}
        {enableEval && <EvalPanel approach={approachHandle.state.approach} onChangeApproach={(approach) => {
          approachHandle.state.setApproach(approach);
        }} onRunOk={res => {
          approachHandle.state.setResponse(res);
        }} />}
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