import React, {FC} from "react";
import {ChatV2Props} from "./types.ts";
import {ChatContext} from "./context/ChatContext.tsx";
import {ChatList, UserInput, UseSelectedImage} from "./default/DefaultLayout.tsx";
import {
    defaultAnswerPanelRender,
    defaultLinerLayoutRender,
    defaultQuestionPanelRender
} from "./default/DefaultRender.tsx";
import {Flex} from "antd";

export const ChatV2: FC<ChatV2Props> = (props) => {
    return <ChatContext.Provider value={{
        ...props,
        renderQuestionPanel: defaultQuestionPanelRender,
        renderChatItemLayout: defaultLinerLayoutRender,
        renderAnswerPanel: defaultAnswerPanelRender,
    }}>
        <Flex vertical={true} gap={6} className={'h-full p-6'}>
            <Flex vertical={true} className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg'}>
                <ChatList/>
            </Flex>
            <UseSelectedImage/>
            <UserInput/>
        </Flex>
    </ChatContext.Provider>
}
