import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {Flex} from "antd";
import {DefaultQuestionLayout} from "@/components/Chat/default/DefaultQuestionLayout.tsx";
import {DefaultChatLayout} from "@/components/Chat/default/DefaultChatLayout.tsx";
import {UserInput} from "@/components/Chat/default/UserInput.tsx";
import {ChatList} from "@/components/Chat/default/ChatList.tsx";
import {DefaultAnswerLayout} from "@/components/Chat/default/DefaultAnswerLayout.tsx";


export const Chat: FC<ChatProps> =
    ({
         QuestionLayout = DefaultQuestionLayout,
         AnswerLayout = DefaultAnswerLayout,
         ChatLayout = DefaultChatLayout,
         ...restProps
     }) => {

        return <ChatContext.Provider value={{
            ChatLayout,
            QuestionLayout,
            AnswerLayout,
            ...restProps,
        }}>
            <Flex vertical={true} gap={6} className={'h-full p-6'}>
                <Flex vertical={true}
                      className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg relative'}>
                    <ChatList/>
                </Flex>
                LOGO
                <UserInput/>
            </Flex>
        </ChatContext.Provider>
    }
