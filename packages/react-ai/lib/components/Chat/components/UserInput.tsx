import React, {useState} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {Button, Flex, Input, message} from "antd";
import {ChatActionType} from "@/constant";
import {UploadOutlined} from "@ant-design/icons";
import {FileSelector} from "./FileSelector.tsx";

export const UserInput = () => {
    const [value, setValue] = useState<string>('');
    const {onAction} = useChatContext();

    const handleSend = () => {
        if (value.trim().length > 0) {
            onAction(ChatActionType.SendMessage, {prompt: value});
            setValue('')
        } else {
            message.info('消息不能为空').then()
        }
    }
    return <Flex align={"center"} gap={6}>
        <FileSelector
            onChange={(files) => {
                onAction(ChatActionType.SelectAttachment, {
                    attachments: Array.from(files).map(file => {
                        return {
                            type: 'file',
                            file: file,
                        }
                    })
                })
            }}><UploadOutlined className={'text-xl text-cyan-700'}/>
        </FileSelector>
        <form className={"w-full"} action="#" onSubmit={e => {
            e.preventDefault()
            handleSend()
        }}>
            <Input type="text" value={value}
                   onChange={(e) => {
                       setValue(e.target.value);
                   }}/>
        </form>

        <Button onClick={handleSend}>发送</Button>

    </Flex>
}
