import {FC} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";
import moment from "moment";

// new PostChat()

const ChatPanel: FC = () => {
    const chatProps = useChat((params, onData) => {
        console.log("🚀  params", params, onData);
        generateRandomTextWithCallback((r) => {
            onData({...r, createTime: moment().format('')} as Types.IMessage)
        })
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
