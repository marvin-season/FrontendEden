import React, {createContext, FC, useContext} from "react";
import {ChatProps} from "@/components/chat/types.ts";
import {
    defaultAnswerRender,
    defaultQuestionRender,
    linerLayoutRender
} from "@/components/chat/default/DefaultRender.tsx";
import {ChatList} from "@/components/chat/default/DefaultLayout.tsx";
import { ChatContext } from "./context/ChatContext";




export const Chat: FC<ChatProps> = ({
                                        chatList,
                                        renderAnswerPanel = defaultAnswerRender,
                                        renderQuestionPanel = defaultQuestionRender,
                                        renderChatItemLayout = linerLayoutRender
                                    }) => {


    return <ChatContext.Provider value={{
        chatList: chatList,
        renderAnswerPanel,
        renderQuestionPanel,
        renderChatItemLayout
    }}>
        <ChatList/>
    </ChatContext.Provider>
}
