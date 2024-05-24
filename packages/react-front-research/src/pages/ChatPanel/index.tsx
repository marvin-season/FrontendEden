import {FC} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {composeStream, getStream} from "@/pages/ChatPanel/mock/readable_mock.ts";

const ChatPanel: FC = () => {

    const chatProps = useChat({
        invoke: (params, onData, onFinish) => {
            composeStream<Types.IMessage>(getStream<string>(params.value), onData, onFinish)
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
