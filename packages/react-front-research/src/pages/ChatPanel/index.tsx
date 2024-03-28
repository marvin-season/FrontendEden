import {FC} from "react";
import {useChat} from "@/pages/ChatPanel/useChat.ts";
import {connect} from "@/components/chat/hoc.tsx";
import {Chat} from "@/components/chat";
import {groupRenderLayout} from "@/pages/ChatPanel/groupRender.tsx";

const ChatPanel: FC = () => {
    const chatProps = useChat();
    const ConnectedChat = connect(Chat, chatProps);

    return <ConnectedChat renderChatItemLayout={groupRenderLayout}/>;
}

export default ChatPanel
