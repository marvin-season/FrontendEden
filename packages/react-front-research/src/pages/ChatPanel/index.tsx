import {Chat} from "@/components/chat/Chat.tsx";
import {ChatItem, TreeChatItem} from "@/components/chat/types.ts";
import {useState} from "react";
import {nanoid} from "nanoid";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";

const nanoid1 = nanoid()

const list: ChatItem[] = [
    {
        groupId: nanoid(),
        id: '1',
        content: '你吃饭了没',
        role: 'question',
    },
    {
        groupId: nanoid1,
        id: '2',
        content: 'hello，我吃过了',
        role: 'answer',
    },
    {
        groupId: nanoid1,
        id: '3',
        content: '青椒炒肉',
        role: 'answer',
    },
    {
        groupId: nanoid(),
        id: '5',
        content: '今天星期几？',
        role: 'question',
    },
    {
        groupId: nanoid(),
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
            renderChatItemLayout={groupRenderLayout}
            onSend={(value) => {
                setChatList(chatList.concat({
                    id: Date.now().toString(),
                    content: value,
                    role: 'question',
                    groupId: nanoid()
                }))
            }}/>
    </>
}
