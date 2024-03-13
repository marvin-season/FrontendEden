import {Chat} from "@/components/chat/Chat.tsx";
import {TreeChatItem} from "@/components/chat/types.ts";
import {TreeAnswerPanel, treeLayoutRender, TreeQuestionPanel} from "@/pages/ChatPanel/render.tsx";
import {useState} from "react";

const list: TreeChatItem[] = [
    {
        id: '1',
        content: '你吃饭了没',
        role: 'question',
    },
    {
        id: '2',
        content: 'hello，我吃过了',
        role: 'answer',
        parentId: '1'
    },
    {
        id: '3',
        content: '青椒炒肉',
        role: 'answer',
        parentId: '1'
    },
    {
        id: '4',
        content: '你吃了没？',
        role: 'answer',
        parentId: '1',
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
        parentId: '4'
    },
    {
        id: '7',
        content: '今天星期三？',
        role: 'answer',
        parentId: '5',
    },
]
export default function () {
    const [chatList, setChatList] = useState<TreeChatItem[]>(list)

    return <>
        <Chat
            chatList={chatList}
            renderChatItemLayout={treeLayoutRender}
            renderAnswerPanel={(chatItem) => <TreeAnswerPanel chatItem={chatItem}/>}
            renderQuestionPanel={(chatItem) => <TreeQuestionPanel onShow={(chatItem) => {
                const target = chatList.find(item => item.id === chatItem.id);
                if (target) {
                    target.childrenShow = !target.childrenShow
                    setChatList(chatList.concat(target))
                }
            }} chatItem={chatItem}/>}
            onSend={(value) => {

            }}/>
    </>
}
