import React, {createContext, useContext} from "react";
import {ChatProps} from "@/types/chat.tsx";

export const ChatContext = createContext<ChatProps>({
    UserMessageLayout: () => <></>,
    AssistantMessageLayout: () => <></>,
    MessageListLayout: () => <></>,
    messages: [],
    onAction: console.log
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
