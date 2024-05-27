import React, {FC} from "react";
import {ChatProps} from "@/types";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {Flex} from "antd";

export const DefaultChatLayout: FC<Pick<ChatProps, 'QuestionLayout' | 'AnswerLayout' | 'chatList'>>
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
                    {AnswerLayout && <AnswerLayout answers={chatItem.answers} onAction={onAction}/>}
                </div>
            })
        }
    </div>;
}
