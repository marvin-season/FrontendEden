import React, {useMemo, useState} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {ChatActionType} from "@/constant";
import {FileSelector} from "./FileSelector.tsx";
import {useCommand} from "@/components/Chat/hooks/useCommand.tsx";

export const UserInput = () => {
    const [value, setValue] = useState<string>('');
    const {onAction} = useChatContext();


    const {triggerRef, reactorRef } = useCommand();

    const handleSend = () => {
        if (value.trim().length > 0) {
            onAction(ChatActionType.SendMessage, {content: value});
            setValue('')
        } else {
            alert('消息不能为空')
        }
    }
    return <div className={'flex item-center gap-4 border p-4 rounded-lg'}>
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

        <form className={"relative w-full flex gap-4"} action="#" onSubmit={e => {
            e.preventDefault()
            handleSend()
        }}>
            <div ref={reactorRef} className={"absolute left-0 right-0 bottom-[48px] z-10"}></div>
            <input ref={triggerRef} className={"border w-full px-4 py-2 rounded"} value={value}
                   onChange={(e) => {
                       setValue(e.target.value);
                   }}/>
            <button type={'submit'}>发送</button>
        </form>


    </div>
}
