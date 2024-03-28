import {AnswerChatItem, QuestionChatItem} from "@/components/chat/types.ts";
import {Flex} from "@/styled";
import React, {useState} from "react";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";
import {Input} from "@/components/chat/styled.ts";
import {FileSelector} from "@/components/file";
import {Image} from "antd";

export function AnswerPanel({chatItem}: { chatItem: AnswerChatItem }) {
    return <Flex style={{
        background: 'lightblue'
    }}>
        <Flex>
            答：
        </Flex>
        <Flex>
            {chatItem.content}
        </Flex>

    </Flex>;
}

export function QuestionPanel({chatItem}: { chatItem: QuestionChatItem }) {
    return <Flex style={{
        background: 'lightcyan'
    }}>
        <Flex>
            问：
        </Flex>
        <Flex>
            {chatItem.content}
        </Flex>
    </Flex>;
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
