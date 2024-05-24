import {FC} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {composeStream, getStream} from "@/pages/ChatPanel/mock/readable_mock.ts";

const ChatPanel: FC = () => {

    const chatProps = useChat({
        invoke: (params, onMessage, onFinish) => {
            composeStream<Types.IMessage>(getStream<string>(params.value), onMessage, onFinish)
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
