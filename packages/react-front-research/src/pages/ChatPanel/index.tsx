import {FC} from "react";
import {useChatV2} from "@/pages/ChatPanel/useChatV2.ts";
import {Chat} from "@root/react-ui";

const ChatPanel: FC = () => {
    const chatProps = useChatV2();

    return <Chat {...chatProps}/>;
}

export default ChatPanel
