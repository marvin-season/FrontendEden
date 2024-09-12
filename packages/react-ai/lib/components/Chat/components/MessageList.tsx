import { Message } from "@/types";
import React, { Fragment, useEffect } from "react";
import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";
import { ChatActionType, ChatStatus } from "@/constant";

export default function MessageList({ messages, status }: { messages: Message[], status?: ChatStatus }) {
  const { AssistantMessageLayout, UserMessageLayout, onAction } = useChatContext();

  useEffect(() => {

  }, []);
  return (
    <>
      <div className={'flex-grow overflow-y-auto border-slate-200 p-4 border rounded-lg'} id={"messages-container"}>
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