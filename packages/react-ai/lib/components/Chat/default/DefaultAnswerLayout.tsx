import {ChatProps, IAnswer, IQuestion} from "@/types";
import Answer from "@/components/Chat/default/Answer.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";
import {ChatActionType} from "@/constant";

export const DefaultAnswerLayout: FC<{ answers: IAnswer[], onRegenerate: (answer: IAnswer) => void }>
    = ({
           answers,
           onRegenerate
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
            onRegenerate(answers.at(-1) as IAnswer)
        }}/>}
    </>
}
