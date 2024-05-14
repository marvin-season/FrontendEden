import React from "react";
import {Answer, ChatV2Props, Question} from "@/components/chatv2/types.ts";
import {Flex} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";

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
        <Flex gap={6} className={'p-2'} justify={"flex-start"}>
            <div
                className={'bg-sky-100 p-2 pl-4 pr-4 rounded-lg hover:bg-sky-200 hover:cursor-pointer font-mono text-sm'}>
                {
                    answers.map((answer, index) => {
                        return <div key={answer.id}>
                            {
                                typeof answer.content === 'string' ? answer.content : ''
                            }
                        </div>
                    })
                }
            </div>
            <ReloadOutlined className={'text-sm text-sky-400'} onClick={() => onReload?.({} as any)}/>
        </Flex>
    </>
}
export const defaultQuestionPanelRender = (questions: Question[]) => {
    return <Flex className={'p-2'} justify={"flex-end"}>
        <Flex vertical={true} gap={2} align={'end'}
              className={'bg-indigo-100 p-2 pl-4 pr-4 rounded-lg hover:bg-indigo-200 hover:cursor-pointer'}>
            <div>
            </div>
            <div className={'font-mono text-sm'}>
                {
                    questions.map((question, index) => {
                        return <div key={question.id}>
                            {
                                typeof question.content === 'string' ? question.content : ''
                            }
                        </div>
                    })
                }
            </div>
        </Flex>
    </Flex>
}
