import {Chat} from "@/components/chat/Chat.tsx";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";
import {useChat} from "@/pages/ChatPanel/useChat.ts";

export default function () {

    const chatProps = useChat();

    return <>
        <Chat
            {...chatProps}
            renderChatItemLayout={groupRenderLayout}
        ></Chat>
    </>
}
