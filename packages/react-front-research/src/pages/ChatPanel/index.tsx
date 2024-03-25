import {Chat} from "@/components/chat/Chat.tsx";
import {ChatItem, TreeChatItem} from "@/components/chat/types.ts";
import {useState} from "react";

const list: ChatItem[] = [
    {
        id: '1',
        content: '你吃饭了没',
        role: 'question',
    },
    {
        id: '2',
        content: 'hello，我吃过了',
        role: 'answer',
    },
    {
        id: '3',
        content: '青椒炒肉',
        role: 'answer',
    },
    {
        id: '4',
        content: '你吃了没？',
        role: 'answer',
    },
    {
        id: '5',
        content: '今天星期几？',
        role: 'question',
    },
    {
        id: '6',
        content: '嘿嘿，我马上去吃',
        role: 'question',
    },
    {
        id: '7',
        content: '今天星期三？',
        role: 'answer',
    },
]
export default function () {
    const [chatList, setChatList] = useState<TreeChatItem[]>(list)

    return <>
        <Chat
            chatList={chatList}
            onSend={(value) => {
                setChatList(chatList.concat({
                    id: Date.now().toString(),
                    content: value,
                    role: 'question'
                }))
            }}/>
    </>
}
