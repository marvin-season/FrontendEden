import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {Flex} from "antd";
import {defaultAnswerPanelRender, defaultQuestionPanelRender} from "@/components/Chat/default/DefaultRender.tsx";
import {DefaultChatLayout} from "@/components/Chat/default/DefaultChatLayout.tsx";
import {UserInput} from "@/components/Chat/default/UserInput.tsx";
import {ChatList} from "@/components/Chat/default/ChatList.tsx";


export const Chat: FC<ChatProps> = ({
                                        renderQuestionPanel = defaultQuestionPanelRender,
                                        renderAnswerPanel = defaultAnswerPanelRender,
                                        ...restProps
                                    }) => {

    return <ChatContext.Provider value={{
        renderQuestionPanel,
        renderAnswerPanel,
        ChatLayout: DefaultChatLayout,
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
