import {useState} from "react";
import {BaseAttach, ChatItem, ChatProps} from "@/components/chat/types.ts";
import {nanoid} from "nanoid";

export const useChat = (): ChatProps => {
    const [chatList, setChatList] = useState<ChatItem[]>([]);
    const [baseAttach, setBaseAttach] = useState<BaseAttach>({})
    const onSelectedFile = (files: FileList) => {
        const images: any[] = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index]
            if (file) {
                const url = URL.createObjectURL(file);
                images.push({src: url, width: '120px'})
            }
        }

        setBaseAttach({
            images
        })
    }
    const onReload = (chatItem: ChatItem) => {
        const clone = structuredClone(chatItem);
        clone.content = clone.content.concat('reloaded')
        setChatList(chatList.concat(clone))
    }
    const onSend = (value: string) => {
        setChatList(chatList.concat({
            id: Date.now().toString(),
            content: value,
            role: 'question',
            groupId: nanoid(),
            chatItemAttach: baseAttach
        }))

        setBaseAttach({})

        setTimeout(() => {
            setChatList(prevState => {
                return prevState.concat({
                    id: Date.now().toString(),
                    content: value,
                    role: 'answer',
                    groupId: nanoid(),
                })
            })
        })
    }

    return {
        chatList,
        chatAttach: baseAttach,
        onReload,
        onSend,
        onSelectedFile
    }

}
