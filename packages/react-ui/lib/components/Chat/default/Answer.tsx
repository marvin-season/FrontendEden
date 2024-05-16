import {Flex} from "antd";
import React, {memo} from "react";
import {IAnswer} from "@/types/chat.tsx";

const AnswerMemo = memo<{ answer: IAnswer }>(({answer}) => {
    console.log("🚀 AnswerMemo ", answer.content)
    return <>
        <Flex gap={6} className={'p-2'} justify={"flex-start"}>
            <div
                className={'bg-sky-100 p-2 pl-4 pr-4 rounded-lg hover:bg-sky-200 hover:cursor-pointer font-mono text-sm'}>
                {
                    typeof answer.content === 'string' ? answer.content : ''
                }
            </div>
        </Flex>
    </>
}, (prevProps, nextProps) => prevProps.answer === nextProps.answer);

export default AnswerMemo
