import { Message } from "@/types";
import React, { Fragment, useEffect, useRef } from "react";
import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";
import { ChatActionType, ChatStatus } from "@/constant";
import { throttle } from "lodash";

const scrollToBottom = (element: HTMLDivElement) => {
  if (element) {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });

  }
};

const scrollToBottomThrottled = throttle(scrollToBottom, 500, { leading: true, trailing: true });

export default function MessageList({ messages, status }: { messages: Message[], status?: ChatStatus }) {
  const { AssistantMessageLayout, UserMessageLayout, onAction } = useChatContext();

  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    messagesContainerRef.current && scrollToBottomThrottled(messagesContainerRef.current);
    return () => {
      scrollToBottomThrottled.cancel();
    };
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
                    const content = messages[index - 1]?.content;
                    onAction(ChatActionType.ReloadMessage, { content });
                  }} />
                }
                {
                  item.role === "system" && typeof item.content === "string" && <div>system: {item.content}</div>
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