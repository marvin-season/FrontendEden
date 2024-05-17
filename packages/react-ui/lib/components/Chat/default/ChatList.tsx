import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import React from "react";

export function ChatList() {
    const {chatList, QuestionLayout, AnswerLayout, ChatLayout} = useChatContext();
    return <>
        {
            ChatLayout && <ChatLayout chatList={chatList}/>
        }

    </>;
}
