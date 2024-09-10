import React, {useState} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {ChatActionType} from "@/constant";
import {FileSelector} from "./FileSelector.tsx";

export const UserInput = () => {
    const [value, setValue] = useState<string>('');
    const {onAction} = useChatContext();

    const handleSend = () => {
        if (value.trim().length > 0) {
            onAction(ChatActionType.SendMessage, {prompt: value});
            setValue('')
        } else {
            alert('消息不能为空')
        }
    }
    return <div className={'flex item-center gap-4'}>
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
            }}>上传
        </FileSelector>
        <form className={"w-full"} action="#" onSubmit={e => {
            e.preventDefault()
            handleSend()
        }}>
            <input value={value}
                   onChange={(e) => {
                       setValue(e.target.value);
                   }}/>
        </form>

        <button onClick={handleSend}>发送</button>

    </div>
}
