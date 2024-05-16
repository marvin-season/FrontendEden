import React, {createContext, useContext} from "react";
import {ChatProps} from "../types.ts";

export const ChatContext = createContext<ChatProps>({
    chatList: [],
    renderQuestionPanel: () => <></>,
    renderAnswerPanel: () => <></>,
    renderChatItemLayout: () => <></>
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
