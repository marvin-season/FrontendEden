import {FC} from "react";
import {Chat, useChat} from "@root/react-ui";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";

const ChatPanel: FC = () => {
    const chatProps = useChat(generateRandomTextWithCallback);

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
