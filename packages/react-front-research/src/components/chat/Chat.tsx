import React, {FC} from "react";
import {ChatProps} from "@/components/chat/types.ts";
import {
    defaultAnswerRender,
    defaultQuestionRender,
    linerLayoutRender
} from "@/components/chat/default/DefaultRender.tsx";
import {ChatList, UserInput, UseSelectedImage} from "@/components/chat/default/DefaultLayout.tsx";
import {ChatContext} from "./context/ChatContext";


export const Chat: FC<ChatProps> = ({
                                        chatList,
                                        renderAnswerPanel = defaultAnswerRender,
                                        renderQuestionPanel = defaultQuestionRender,
                                        renderChatItemLayout = linerLayoutRender,
                                        onSend,
                                        onSelectedFile,
                                        onReload,
                                        chatAttach
                                    }) => {


    return <ChatContext.Provider value={{
        chatList: chatList,
        renderQuestionPanel,
        renderAnswerPanel,
        renderChatItemLayout,
        onSelectedFile,
        onSend,
        onReload,
        chatAttach
    }}>
        <ChatList/>
        <div>
            <UseSelectedImage/>
            <UserInput/>
        </div>
    </ChatContext.Provider>
}
