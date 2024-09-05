import {nanoid} from "nanoid";
import {useImmer} from "use-immer";
import moment from "moment";
import {ActionParams, ChatProps, Message} from "@/types";
import {useEffect, useState} from "react";
import {ChatActionType, ChatStatus} from "@/constant";
import {SSEMessageGenerator} from "@/utils";

const format = 'YYYY-MM-DD HH:mm:ss';

type HandleProps = {
    onSend: (params: ActionParams, signal: any) => Promise<Response>
    onStop: Function,
    onConversationEnd?: (message?: Message) => Promise<void>,
}

type ConfigProps = {
    historyMessage: Message[]
}

const ChatUtils: {
    controller: AbortController | null
} = {
    controller: null
}

export const useChat = (invokeHandle: HandleProps, config: ConfigProps = {
    historyMessage: []
}): ChatProps => {
    const [messages, setMessages] = useImmer<Message[]>([]);
    const [chatStatus, setChatStatus] = useState<ChatProps['status']>(ChatStatus.Idle);

    // 发送消息任务(可能包含异步操作)
    const executeSendTask = async (params: ActionParams) => {
        ChatUtils.controller = new AbortController();
        setChatStatus(ChatStatus.Loading);
        setMessages(draft => {
            draft.push({
                id: nanoid(),
                content: params.prompt as string,
                createTime: moment().format(format),
                role: 'user'
            })
        })
        return invokeHandle.onSend(params, ChatUtils.controller.signal);
    }

    // 接收消息任务(可能包含异步操作)
    const executeReceiveTask = async (response: Response) => {
        setChatStatus(ChatStatus.Typing);
        let lastMessage;
        for await (const message of SSEMessageGenerator<Message>(response)) {
            lastMessage = message;
            setMessages(draft => {
                const find = draft.find(item => item.id === message.id);
                if (find) {
                    find.content += message.content
                } else {
                    draft.push({...message, role: 'assistant'})
                }
            })
        }

        invokeHandle.onConversationEnd?.(lastMessage)
        setChatStatus(ChatStatus.Idle);
    }

    const sendMessage = async (params: ActionParams) => {
        await executeReceiveTask(await executeSendTask(params));
        return '一次会话完成'
    }

    const onSelectedFile = (files: FileList) => {
        for (let index = 0; index < files.length; index++) {
            const file = files[index]
            if (file) {
                const url = URL.createObjectURL(file);
                console.log("🚀  ", url)
            }

        }
    }

    const stop = () => {
        setChatStatus(ChatStatus.Idle);
        ChatUtils.controller?.abort('stop')
        invokeHandle.onStop();
    }

    useEffect(() => {
        return () => {
            invokeHandle.onStop();
            setMessages([]);
            setChatStatus(ChatStatus.Idle);
        }
    }, []);

    return {
        messages: [...config.historyMessage, ...messages],
        status: chatStatus,
        onAction: (actionType, actionParams) => {
            console.log("🚀  ", {actionType, actionParams});
            if (actionType === ChatActionType.SendMessage || actionType === ChatActionType.ReloadMessage) {
                sendMessage(actionParams as ActionParams).then()
            } else if (actionType === ChatActionType.SelectAttachment) {
                // onSelectedFile(actionParams.attachments);
            } else if (actionType === ChatActionType.StopGenerate) {
                stop();
            }
        }
    }

}
