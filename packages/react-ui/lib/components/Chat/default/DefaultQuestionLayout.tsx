import React, {FC} from "react";
import {IQuestion} from "@/types/chat.tsx";
import Question from "./Question.tsx";


export const DefaultQuestionLayout: FC<{ questions: IQuestion[] }> = ({questions}) => {
    console.log("🚀  ", questions)
    return <>
        {
            questions.map((question, index) => {
                return <Question question={question} key={index}></Question>
            })
        }
    </>
}
