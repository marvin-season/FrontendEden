import React from "react";
import {Answer, ChatV2Props, Question} from "@/components/chatv2/types.ts";
import AnswerMemo from "./Answer.tsx";
import QuestionMemo from "@/components/chatv2/default/Question.tsx";
import {useChatContext} from "@/components/chatv2/context/ChatContext.tsx";
import {ReloadOutlined} from "@ant-design/icons";

export const defaultLinerLayoutRender: ChatV2Props['renderChatItemLayout'] = (chatList, renderAnswer, renderQuestion) =>
    <div>
        {
            chatList.map((chatItem, index) => {
                return <div key={index}>
                    {
                        renderQuestion?.(chatItem.questions)
                    }
                    {
                        renderAnswer?.(chatItem.answers)
                    }
                </div>
            })
        }
    </div>


export const defaultAnswerPanelRender = (answers: Answer[]) => {
    const {onReload} = useChatContext();
    return <>
        {
            answers.map((answer, index) => {
                return <AnswerMemo
                    answer={answer}
                    key={index}/>
            })
        }
        {answers.at(-1) && <ReloadOutlined className={'text-sm text-sky-400'} onClick={() => {
            onReload?.(answers.at(-1) as Answer)
        }}/>}
    </>
}


export const defaultQuestionPanelRender = (questions: Question[]) => {
    return <>
        {
            questions.map((question, index) => {
                return <QuestionMemo question={question} key={index}></QuestionMemo>
            })
        }
    </>
}
