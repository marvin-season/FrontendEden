import React, {createContext, useContext} from "react";
import {ChatProps} from "@/types/chat.tsx";

export const ChatContext = createContext<ChatProps>({
    chatList: [],
    renderQuestionPanel: () => <></>,
    renderAnswerPanel: () => <></>,
    ChatLayout: () => <></>
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
