import {ChatProps, IAnswer} from "@/types";
import Answer from "@/components/Chat/default/Answer.tsx";
import {ReloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";

export const DefaultAnswerLayout: FC<{ answers: IAnswer[], onReload: ChatProps['onReload'] }>
    = ({
           onReload,
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
            onReload?.(answers.at(-1) as IAnswer)
        }}/>}
    </>
}
