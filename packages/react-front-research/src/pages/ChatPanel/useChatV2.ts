import {nanoid} from "nanoid";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";
import {useImmer} from "use-immer";
import {ChatItem, ChatV2Props} from "@/components/chatv2/types.ts";
import moment from "moment";

const format = 'YYYY-MM-DD HH:mm:ss';

export const useChatV2 = (): ChatV2Props => {
    const [chatList, setChatList] = useImmer<ChatItem[]>([]);


    const handleChatResponse = (chatItem?: ChatItem) => {
        generateRandomTextWithCallback(({content, id}) => {
            setChatList(draft => {
                const lastChatItem = draft.at(-1);
                if (lastChatItem) {
                    lastChatItem.answers.push({
                        id,
                        content,
                        createTime: moment().format(format)
                    })
                }

            })
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
    const onReload = (chatItem: ChatItem) => {
        handleChatResponse(chatItem);
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
        handleChatResponse()
    }

    return {
        chatList,
        onReload,
        onSend,
        onSelectedFile
    }

}
