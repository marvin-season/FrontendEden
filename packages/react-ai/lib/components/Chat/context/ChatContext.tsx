import React, {createContext, useContext} from "react";
import {ChatProps} from "@/types/chat.tsx";
import MessageList from "@/components/Chat/MessageList.tsx";

export const ChatContext = createContext<ChatProps>({
    QuestionLayout: () => <></>,
    AnswerLayout: () => <></>,
    MessageListLayout: () => <></>,
    messages: [],
    onAction: console.log
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
