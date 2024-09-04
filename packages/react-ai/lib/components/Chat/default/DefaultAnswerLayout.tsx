import {ChatProps, IAnswer, IQuestion} from "@/types";
import Answer from "@/components/Chat/default/Answer.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";
import {ChatActionType} from "@/constant";

export const DefaultAnswerLayout: FC<{ answers: IAnswer[], onAction: ChatProps['onAction'] }>
    = ({
           onAction,
           answers
       }) => {
    return <>
        {
            answers.map((answer, index) => {
                return <Answer
                    answer={answer}
                    key={index}/>
            })
        }
        {answers.at(-1) && <ReloadOutlined className={'text-sm text-sky-400'} onClick={() => {
            onAction(ChatActionType.ReloadMessage, {answer: answers.at(-1) as IAnswer, question: answers.at(-2) as IQuestion})
        }}/>}
    </>
}
