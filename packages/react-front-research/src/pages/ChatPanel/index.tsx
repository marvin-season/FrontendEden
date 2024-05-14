import {FC, useEffect} from "react";
import {useChatV2} from "@/pages/ChatPanel/useChatV2.ts";
import {ChatV2 as Chat} from "@/components/chatv2";

const ChatPanel: FC = () => {
    const chatProps = useChatV2();

    useEffect(() => {
    }, []);

    return <Chat {...chatProps}/>;
}

export default ChatPanel
