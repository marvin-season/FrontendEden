import {FC, useEffect} from "react";
import {useChat} from "@/pages/ChatPanel/useChat.ts";
import {connect} from "@/components/chat/hoc.tsx";
import {Chat} from "@/components/chat";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";

const ChatPanel: FC = () => {
    const chatProps = useChat();
    const ConnectedChat = connect(Chat, chatProps);

    useEffect(() => {
        fetch('/v2/chat').then()
    }, []);

    return <ConnectedChat renderChatItemLayout={groupRenderLayout}/>;
}

export default ChatPanel
