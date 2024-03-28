import {AnswerChatItem, ChatItem, CommonPanelRenderType, QuestionChatItem} from "@/components/chat/types.ts";
import React, {FC, useState} from "react";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";
import {FileSelector} from "@/components/file";
import {Button, Flex, Image, Input, message} from "antd";
import {defaultAnswerPanelRender, defaultQuestionPanelRender} from "@/components/chat/default/DefaultRender.tsx";

export const CommonPanel: FC<{
    chatItem: ChatItem,
    renderChildren: CommonPanelRenderType,
}> = ({renderChildren, chatItem}) => {
    return <>
        {renderChildren(chatItem)}
    </>
}

export function DefaultAnswerPanel({chatItem}: { chatItem: AnswerChatItem }) {
    return defaultAnswerPanelRender(chatItem)
}

export function DefaultQuestionPanel({chatItem}: { chatItem: QuestionChatItem }) {
    return defaultQuestionPanelRender(chatItem);
}

export function ChatList() {
    const {chatList, renderAnswerPanel, renderQuestionPanel, renderChatItemLayout} = useChatContext();
    return <>
        {
            renderChatItemLayout?.(chatList, renderAnswerPanel, renderQuestionPanel)
        }
    </>;
}

export const UserInput = () => {
    const [value, setValue] = useState<string>('');
    const {onSelectedFile, onSend} = useChatContext();

    return <Flex align={"center"}>
        <Input value={value} onChange={(e) => {
            setValue(e.target.value);
        }}/>

        <Button onClick={() => {
            if (value.trim().length > 0) {
                onSend?.(value);
                setValue('')
            } else {
                message.info('消息不能为空').then()
            }
        }}>发送
        </Button>
        <FileSelector onChange={onSelectedFile}>{'选择图片'}</FileSelector>

    </Flex>
}


export const UseSelectedImage = () => {
    const {chatAttach} = useChatContext();

    return <>
        {
            chatAttach?.images?.map(image => {
                return <Image key={image.src} width={image.width} src={image.src} alt="no image"/>
            })
        }
    </>
}
