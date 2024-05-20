import {nanoid} from "nanoid";
import {useImmer} from "use-immer";
import moment from "moment";
import {ChatItem, ChatProps, IAnswer, ISendApi} from "@/types";
import {useEffect, useState} from "react";
import {ChatActionType, ChatStatus} from "@/constant";

const format = 'YYYY-MM-DD HH:mm:ss';

export const useChat = (invokeHandle: { invoke: ISendApi, stop: Function }): ChatProps => {
    const [chatList, setChatList] = useImmer<ChatItem[]>([]);
    const [chatStatus, setChatStatus] = useState<ChatProps['status']>(ChatStatus.Idle)

    const sendMessage = (params: {}) => {
        invokeHandle.invoke(params, (message) => {
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
    }

    const onSelectedFile = (files: FileList) => {
        for (let index = 0; index < files.length; index++) {
            const file = files[index]
            if (file) {
                const url = URL.createObjectURL(file);
            }
        }
    }
    const onReload = (answer: IAnswer) => {
        sendMessage(answer);
    }
    const onSend = (value: string) => {
        setChatStatus(ChatStatus.Loading);
        setChatList(draft => {
            draft.push({
                questions: [
                    {
                        id: nanoid(),
                        content: value,
                        createTime: moment().format(format),
                    }
                ],
                answers: []
            })
        })
        sendMessage({value})
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
                onSend(actionParams.value);
            } else if (actionType === ChatActionType.SelectFile) {
            } else if (actionType === ChatActionType.StopGenerate) {
                onStop();
            } else if (actionType === ChatActionType.ReloadMessage) {
                onReload(actionParams.answer);
            }
        }
    }

}
