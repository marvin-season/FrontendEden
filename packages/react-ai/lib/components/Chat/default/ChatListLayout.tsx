import React, {FC} from "react";
import {ChatProps} from "@/types";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {Flex} from "antd";
import {ChatActionType} from "@/constant";

export const ChatListLayout: FC<Pick<ChatProps, 'QuestionLayout' | 'AnswerLayout' | 'chatList'>>
    = ({
           chatList,
           QuestionLayout,
           AnswerLayout
       }) => {
    const {onAction} = useChatContext();
    return <div>
        <Flex>内置的布局</Flex>
        {
            chatList.map((chatItem, index) => {
                return <div key={index}>
                    {QuestionLayout && <QuestionLayout questions={chatItem.questions}/>}
                    {AnswerLayout && <AnswerLayout answers={chatItem.answers} onRegenerate={(answer) => {
                        onAction(ChatActionType.ReloadMessage, {prompt: chatItem.questions.at(-1)?.content as string})
                    }}/>}
                </div>
            })
        }
    </div>;
}
