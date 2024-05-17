import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import React from "react";

export function ChatList() {
    const {chatList, renderAnswerPanel, renderQuestionPanel, ChatLayout} = useChatContext();
    return <>
        {
            ChatLayout && <ChatLayout
                chatList={chatList}
                renderAnswerPanel={renderAnswerPanel}
                renderQuestionPanel={renderQuestionPanel}/>
        }

    </>;
}
