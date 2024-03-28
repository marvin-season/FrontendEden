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
                                        renderAnswerPanel = defaultAnswerRender,
                                        renderQuestionPanel = defaultQuestionRender,
                                        renderChatItemLayout = linerLayoutRender,
                                        ...restProps
                                    }) => {


    return <ChatContext.Provider value={{
        renderQuestionPanel,
        renderAnswerPanel,
        renderChatItemLayout,
        ...restProps
    }}>
        <div className={'text-3xl font-bold underline'} style={{height: '600px', overflow: "auto"}}>
            <ChatList/>
        </div>
        <div>
            <UseSelectedImage/>
            <UserInput/>
        </div>
    </ChatContext.Provider>
}
