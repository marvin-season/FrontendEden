import React, {createContext, useContext} from "react";
import {ChatProps} from "@/components/chat/types.ts";

export const ChatContext = createContext<ChatProps>({
    chatList: [],
    renderQuestionPanel: () => <></>,
    renderAnswerPanel: () => <></>,
    renderChatItemLayout: () => <></>
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
