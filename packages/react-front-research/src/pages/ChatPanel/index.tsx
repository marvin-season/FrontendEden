import {FC} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";
import moment from "moment";
import {PostChat} from "@root/shared";

const postChat = PostChat.getInstance({
    url: '123'
});

console.log("🚀  ", postChat)
const ChatPanel: FC = () => {
    const chatProps = useChat((params, onData) => {
        postChat.send({
            params,
            onData
        })
        generateRandomTextWithCallback((r) => {
            onData({...r, createTime: moment().format('')} as Types.IMessage)
        })
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
