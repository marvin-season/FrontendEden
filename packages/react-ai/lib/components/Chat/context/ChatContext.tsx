import React, {createContext, useContext} from "react";
import {ChatProps} from "@/types/chat.tsx";

export const ChatContext = createContext<ChatProps>({
    chatList: [],
    QuestionLayout: () => <></>,
    AnswerLayout: () => <></>,
    ChatLayout: () => <></>,
    onAction: console.log
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
