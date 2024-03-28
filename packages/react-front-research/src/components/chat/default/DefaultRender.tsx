import React from "react";
import {ChatProps, CommonPanelRenderType} from "@/components/chat/types.ts";
import {DefaultAnswerPanel, DefaultQuestionPanel} from "@/components/chat/default/DefaultLayout.tsx";
import {Flex} from "@/styled";
import {Image} from "antd";

export const linerLayoutRender: ChatProps['renderChatItemLayout'] = (chatList, renderAnswer, renderQuestion) => <>
    {
        chatList.map(chatItem => {
            return <div key={chatItem.id}>
                {
                    chatItem.role === 'answer' ? renderAnswer?.(chatItem) : renderQuestion?.(chatItem)
                }
            </div>
        })
    }
</>


export const defaultAnswerRender: ChatProps['renderAnswerPanel'] = (chatItem) => <DefaultAnswerPanel
    chatItem={chatItem}/>
export const defaultQuestionRender: ChatProps['renderQuestionPanel'] = (chatItem) => <DefaultQuestionPanel
    chatItem={chatItem}/>

export const defaultAnswerPanelRender: CommonPanelRenderType = (chatItem) => {
    return <>
        <Flex style={{
            background: '#81d8d0',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '8px',
            boxSizing: 'border-box'
        }}>
            <Flex>
                {chatItem.content}
            </Flex>

        </Flex>
    </>
}
export const defaultQuestionPanelRender: CommonPanelRenderType = (chatItem) => {
    return <Flex style={{
        background: '#ffffff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '8px',
        boxSizing: 'border-box'
    }}>
        <div>
            <div>
                {
                    chatItem.chatItemAttach?.images?.map(item => {
                        return <Image key={item.src} width={item.width} height={item.height} src={item.src}
                                      alt={item.src}/>
                    })
                }
            </div>
            <div>
                {chatItem.content}
            </div>
        </div>
    </Flex>
}
