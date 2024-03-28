import {Chat} from "@/components/chat/Chat.tsx";
import {BaseAttach, ChatItem, TreeChatItem} from "@/components/chat/types.ts";
import {useState} from "react";
import {nanoid} from "nanoid";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";

const list: ChatItem[] = []
export default function () {
    const [chatList, setChatList] = useState<TreeChatItem[]>(list);
    const [baseAttach, setBaseAttach] = useState<BaseAttach>({})

    return <>
        <Chat
            chatList={chatList}
            chatAttach={baseAttach}
            renderChatItemLayout={groupRenderLayout}
            onSelectedFile={(files) => {
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
            }}
            onReload={(chatItem) => {
                const clone = structuredClone(chatItem);
                clone.content = clone.content.concat('reloaded')
                setChatList(chatList.concat(clone))
            }}
            onSend={(value) => {
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
            }}/>
    </>
}
