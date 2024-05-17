import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {ChatList, UserInput} from "./default/DefaultLayout.tsx";
import {Flex} from "antd";
import {
    defaultAnswerPanelRender,
    defaultLinerLayoutRender,
    defaultQuestionPanelRender
} from "@/components/Chat/default/DefaultRender.tsx";

export const Chat: FC<ChatProps> = ({
                                        renderQuestionPanel = defaultQuestionPanelRender,
                                        renderChatItemLayout = defaultLinerLayoutRender,
                                        renderAnswerPanel = defaultAnswerPanelRender,
                                        ...restProps
                                    }) => {
    return <ChatContext.Provider value={{
        renderQuestionPanel,
        renderChatItemLayout,
        renderAnswerPanel,
        ...restProps,
    }}>
        <Flex vertical={true} gap={6} className={'h-full p-6'}>
            <Flex vertical={true} className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg'}>
                <ChatList/>
            </Flex>
            LOGO
            <UserInput/>
        </Flex>
    </ChatContext.Provider>
}
