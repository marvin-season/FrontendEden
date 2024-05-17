import React, {memo} from "react";
import {IQuestion} from "@/types/chat.tsx";
import {Flex} from "antd";

const Question = memo<{ question: IQuestion }>(({question}) => {
    return <>
        <Flex className={'p-2'} justify={"flex-end"}>
            <Flex vertical={true} gap={2} align={'end'}
                  className={'bg-indigo-100 p-2 pl-4 pr-4 rounded-lg hover:bg-indigo-200 hover:cursor-pointer'}>
                <div>
                </div>
                <div className={'font-mono text-sm'}>
                    {
                        typeof question.content === 'string' ? question.content : ''
                    }
                </div>
            </Flex>
        </Flex>
    </>
})


export default Question;
