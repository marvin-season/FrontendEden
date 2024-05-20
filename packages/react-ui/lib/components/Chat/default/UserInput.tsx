import React, {useState} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {Button, Flex, Input, message} from "antd";
import {ChatActionType} from "@/constant";

export const UserInput = () => {
    const [value, setValue] = useState<string>('');
    const {onAction} = useChatContext();

    const handleSend = () => {
        if (value.trim().length > 0) {
            onAction(ChatActionType.SendMessage, {params: {value}});
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
