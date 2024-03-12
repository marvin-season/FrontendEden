import React from "react";
import {ChatProps} from "@/components/chat/types.ts";
import {AnswerPanel, QuestionPanel} from "@/components/chat/default/DefaultLayout.tsx";

export const linerLayoutRender: ChatProps['renderChatItemLayout'] = (chatList, renderAnswer, renderQuestion) => <>
    {
        chatList.map(chatItem => {
            return <>
                {
                    chatItem.role === 'answer' ? renderAnswer?.(chatItem) : renderQuestion?.(chatItem)
                }
            </>
        })
    }
</>


export const defaultAnswerRender: ChatProps['renderAnswerPanel'] = (chatItem) => <AnswerPanel chatItem={chatItem}/>
export const defaultQuestionRender: ChatProps['renderQuestionPanel'] = (chatItem) => <QuestionPanel chatItem={chatItem}/>
