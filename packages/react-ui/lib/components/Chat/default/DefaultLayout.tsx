import React, {useState} from "react";
import {useChatContext} from "../context/ChatContext.tsx";
import {Button, Flex, Input, message} from "antd";


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

    const handleSend = () => {
        if (value.trim().length > 0) {
            onSend?.(value);
            setValue('')
        } else {
            message.info('消息不能为空').then()
        }
    }
    return <Flex align={"center"} gap={6}>
        {/*<FileSelector onChange={onSelectedFile}><UploadOutlined className={'text-xl text-cyan-700'}/></FileSelector>*/}
        <Input
            value={value}
            onKeyUp={e => {
                if (e.key.toLowerCase() == 'enter') {
                    handleSend()
                }
            }}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />

        <Button onClick={handleSend}>发送</Button>

    </Flex>
}
