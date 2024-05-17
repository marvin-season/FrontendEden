import React from "react";
import {ChatProps, IAnswer, IQuestion} from "@/types/chat.tsx";
import Answer from "./Answer.tsx";
import Question from "./Question.tsx";
import {ReloadOutlined} from "@ant-design/icons";


export const defaultAnswerPanelRender = (answers: IAnswer[], onReload: ChatProps['onReload']) => {
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


export const defaultQuestionPanelRender = (questions: IQuestion[]) => {
    return <>
        {
            questions.map((question, index) => {
                return <Question question={question} key={index}></Question>
            })
        }
    </>
}
