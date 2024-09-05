import React, {FC} from "react";
import {IQuestion} from "@/types/chat.tsx";
import Question from "./Question.tsx";


export const UserMessageLayout: FC<{ questions: IQuestion[] }> = ({questions}) => {
    return <>
        {
            questions.map((question, index) => {
                return <Question question={question} key={index}></Question>
            })
        }
    </>
}
