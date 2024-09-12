import { Message } from "@/types";
import React, { Fragment, useEffect, useRef } from "react";
import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";
import { ChatActionType, ChatStatus } from "@/constant";

const scrollToBottom = (element: HTMLDivElement) => {
  if (element) {
    console.log("scrollTo", element);
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });

  }
};

export default function MessageList({ messages, status }: { messages: Message[], status?: ChatStatus }) {
  const { AssistantMessageLayout, UserMessageLayout, onAction } = useChatContext();

  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    messagesContainerRef.current && scrollToBottom(messagesContainerRef.current);
  }, [messages]);
  return (
    <>
      <div
        id={"messages-container"}
        ref={messagesContainerRef}
        className={"flex-grow overflow-y-auto border-slate-200 p-4 border rounded-lg"}>
        {
          messages?.map((item, index) => {
            return (
              <Fragment key={item.id}>
                {
                  item.role === "user" && UserMessageLayout && <UserMessageLayout message={item} />
                }
                {
                  item.role === "assistant"
                  && AssistantMessageLayout
                  && <AssistantMessageLayout message={item} onRegenerate={(message) => {
                    const prompt = messages[index - 1]?.content;
                    onAction(ChatActionType.ReloadMessage, { prompt });
                  }} />
                }
                {
                  item.role === "system" && <div>system: {item.content}</div>
                }
              </Fragment>
            );
          })
        }
        {status === ChatStatus.Loading && <div className={""}>loading ...</div>}
      </div>

    </>
  );
}