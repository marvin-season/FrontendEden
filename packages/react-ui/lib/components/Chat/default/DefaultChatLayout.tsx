import React, {FC} from "react";
import {ChatProps} from "@/types";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";

export const DefaultChatLayout: FC<Pick<ChatProps, 'chatList'>> = ({chatList}) => {
    const {onReload, QuestionLayout, AnswerLayout} = useChatContext();
    return <>
        {
            chatList.map((chatItem, index) => {
                return <div key={index}>
                    {QuestionLayout && <QuestionLayout questions={chatItem.questions}/>}
                    {AnswerLayout && <AnswerLayout answers={chatItem.answers} onReload={onReload}/>}
                </div>
            })
        }
    </>;
}
