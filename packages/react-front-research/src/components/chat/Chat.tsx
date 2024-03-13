import React, {FC} from "react";
import {ChatProps} from "@/components/chat/types.ts";
import {
    defaultAnswerRender,
    defaultQuestionRender,
    linerLayoutRender
} from "@/components/chat/default/DefaultRender.tsx";
import {ChatList, UserInput} from "@/components/chat/default/DefaultLayout.tsx";
import {ChatContext} from "./context/ChatContext";
import {Flex} from "@/styled";


export const Chat: FC<ChatProps> = ({
                                        chatList,
                                        renderAnswerPanel = defaultAnswerRender,
                                        renderQuestionPanel = defaultQuestionRender,
                                        renderChatItemLayout = linerLayoutRender,
                                        onSend
                                    }) => {


    return <ChatContext.Provider value={{
        chatList: chatList,
        renderAnswerPanel,
        renderQuestionPanel,
        renderChatItemLayout
    }}>
        <ChatList/>
        <Flex>
            <UserInput onSend={onSend}/>
        </Flex>
    </ChatContext.Provider>
}
