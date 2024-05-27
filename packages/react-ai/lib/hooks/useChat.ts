import {nanoid} from "nanoid";
import {useImmer} from "use-immer";
import moment from "moment";
import {ChatItem, ChatProps, IInvoke} from "@/types";
import {useEffect, useState} from "react";
import {ChatActionType, ChatStatus, MessageType} from "@/constant";

const format = 'YYYY-MM-DD HH:mm:ss';

export const useChat = (invokeHandle: { invoke: IInvoke, stop: Function }): ChatProps => {
    const [chatList, setChatList] = useImmer<ChatItem[]>([]);
    const [chatStatus, setChatStatus] = useState<ChatProps['status']>(ChatStatus.Idle);

    // 发送消息任务(可能包含异步操作)
    const sendTask = async (params: any) => {
        setChatStatus(ChatStatus.Loading);
        setChatList(draft => {
            draft.push({
                questions: [
                    {
                        id: nanoid(),
                        content: params.value,
                        createTime: moment().format(format),
                    }
                ],
                answers: [
                    {
                        id: nanoid(),
                        content: '',
                        createTime: moment().format(format),
                        type: MessageType.Loading
                    }
                ]
            })
        })
    }

    // 接收消息任务(可能包含异步操作)
    const receiveTask = async (params: any) => {
        await invokeHandle.invoke(params, (message) => {
            setChatList(draft => {
                const lastChatItem = draft.at(-1);
                if (lastChatItem) {
                    const lastChatItemAnswer = lastChatItem.answers.find(item => item.id === message.id);
                    if (lastChatItemAnswer) {
                        lastChatItemAnswer.content += message.content as string;
                    } else {
                        lastChatItem.answers.push(message)
                    }
                }

            })
        }, () => {
            setChatStatus(ChatStatus.Idle);
        })

        console.log("🚀 会话建立，消息生成中");
        setChatList(draft => {
            const chatItem = draft.at(-1);
            if (chatItem) {
                chatItem.answers = chatItem.answers.filter(item => item.type != MessageType.Loading)
            }
        })
    }

    const sendMessage = async (params: { value: string }) => {
        await sendTask(params);
        await receiveTask(params);
        return '消息发送成功'
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

    const onStop = () => {
        setChatStatus(ChatStatus.Idle);
        invokeHandle.stop();
    }

    useEffect(() => {
        return () => {
            invokeHandle.stop();
        }
    }, []);

    return {
        chatList,
        status: chatStatus,
        onAction: (actionType, actionParams) => {
            console.log("🚀  ", actionType, actionParams);
            if (actionType === ChatActionType.SendMessage) {
                sendMessage({value: actionParams.value}).then(console.log)
            } else if (actionType === ChatActionType.SelectFile) {
                onSelectedFile(actionParams.files);
            } else if (actionType === ChatActionType.StopGenerate) {
                onStop();
            } else if (actionType === ChatActionType.ReloadMessage) {
                sendMessage({...actionParams.answer, value: actionParams.answer.content}).then(console.log);
            }
        }
    }

}
