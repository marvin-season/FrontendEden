import {FC, useEffect} from "react";
import {useChat} from "@/pages/ChatPanel/useChat.ts";
import {Chat} from "@/components/chat";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";

const ChatPanel: FC = () => {
    const chatProps = useChat();

    useEffect(() => {
        fetch('/v2/chat').then()
    }, []);

    return <Chat {...chatProps} renderChatItemLayout={groupRenderLayout}/>;
}

export default ChatPanel
