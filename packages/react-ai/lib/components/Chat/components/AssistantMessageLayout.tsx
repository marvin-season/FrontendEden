import {IAnswer} from "@/types";
import Answer from "./Answer.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";

export const AssistantMessageLayout: FC<{ answers: IAnswer[], onRegenerate: (answer: IAnswer) => void }>
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
