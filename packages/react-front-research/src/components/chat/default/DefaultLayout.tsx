import {AnswerChatItem, ChatItem, CommonPanelRenderType, QuestionChatItem} from "@/components/chat/types.ts";
import {Flex} from "@/styled";
import React, {FC, useState} from "react";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";
import {Input} from "@/components/chat/styled.ts";
import {FileSelector} from "@/components/file";
import {Image} from "antd";
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

    return <Flex>
        <Input value={value} onChange={(e) => {
            setValue(e.target.value);
        }}/>

        <FileSelector onChange={onSelectedFile}>{'选择图片'}</FileSelector>

        <button onClick={() => {
            value.trim().length > 0 && onSend?.(value);
            setValue('')
        }}>发送
        </button>
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
