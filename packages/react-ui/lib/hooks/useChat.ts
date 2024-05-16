import {nanoid} from "nanoid";
import {useImmer} from "use-immer";
import moment from "moment";
import {IAnswer, ChatItem, ChatProps, IMessage, ISendApi} from "@/types";

const format = 'YYYY-MM-DD HH:mm:ss';

export const useChat = <T extends IMessage>(sendApi: ISendApi): ChatProps => {
    const [chatList, setChatList] = useImmer<ChatItem[]>([]);

    const sendMessage = (params: {}) => {
        sendApi<typeof params, T>({
            params,
            onData: (message) => {
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
            }
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

    return {
        chatList,
        onReload,
        onSend,
        onSelectedFile
    }

}
