import React, {createContext, useContext} from "react";
import {ChatV2Props} from "@/components/chatv2/types.ts";

export const ChatContext = createContext<ChatV2Props>({
    chatList: [],
    renderQuestionPanel: () => <></>,
    renderAnswerPanel: () => <></>,
    renderChatItemLayout: () => <></>
})

export const useChatContext = () => {
    return useContext(ChatContext)
}
