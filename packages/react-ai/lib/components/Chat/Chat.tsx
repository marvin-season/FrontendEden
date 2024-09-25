import React, { FC } from "react";
import { ChatProps } from "@/types/chat.tsx";
import { ChatContext } from "./context/ChatContext.tsx";
import {
  UserInput,
  UserMessageLayout as DefaultUserMessageLayout,
  AssistantMessageLayout as DefaultAssistantMessageLayout,
} from "@/components/Chat/components";
import { ChatActionType, ChatStatus } from "@/constant";
import MessageList from "@/components/Chat/components/MessageList.tsx";

export const Chat: FC<ChatProps> =
  ({
     UserMessageLayout = DefaultUserMessageLayout,
     AssistantMessageLayout = DefaultAssistantMessageLayout,
     messages,
     status,
     ...restProps
   }) => {
    return <ChatContext.Provider value={{
      messages,
      UserMessageLayout,
      AssistantMessageLayout,
      ...restProps,
    }}>
      <div className={"h-full p-6 gap-2 flex flex-col"}>
        {restProps.title && <div className={"p-2"}>{restProps.title}</div>}
        <MessageList messages={messages} status={status} />
        <div className={"relative flex flex-col gap-4"}>
          {(status === ChatStatus.Loading || status === ChatStatus.Typing) &&
            <div className={"absolute left-[50%] top-0 m-auto"}>
              <button className={"bg-blue-300 border-0"}
                      onClick={() => restProps.onAction(ChatActionType.StopGenerate, {})}>
                停止生成
              </button>
            </div>
          }
          <UserInput />
        </div>
      </div>
    </ChatContext.Provider>;
  };
