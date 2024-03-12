import {Chat} from "@/components/chat/Chat.tsx";
import {ChatItem} from "@/components/chat/types.ts";
import {treeLayoutRender} from "@/pages/ChatPanel/render.tsx";

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
        parentId: '1'
    },
    {
        id: '3',
        content: '我是您的AI助手',
        role: 'answer',
        parentId: '1'
    },
    {
        id: '4',
        content: 'hi',
        role: 'question',
    },
    {
        id: '5',
        content: 'hello',
        role: 'answer',
        parentId: '4'
    }
]
export default function () {

    return <>
        <Chat chatList={chatList} renderChatItemLayout={treeLayoutRender}/>
    </>
}
