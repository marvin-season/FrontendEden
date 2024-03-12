import {Chat, ChatItem} from "@/components/chat/Chat.tsx";

const chatList: ChatItem[] = [
    {
        id: '1',
        content: 'hi',
        role: 'question',
    },
    {
        id: '2',
        content: 'hello',
        role: 'answer',
    },
    {
        id: '3',
        content: 'hi',
        role: 'question',
    },
    {
        id: '4',
        content: 'hello',
        role: 'answer',
        parentId: '3'
    }
]
export default function () {

    return <>
        <Chat chatList={chatList}/>
    </>
}
