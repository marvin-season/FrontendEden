import {FC} from "react";
import {Chat, useChat} from "@marvin/react-ai";
import {composeStream, getStream} from "./mock/azure-mock.ts";


const ChatPanel: FC = () => {

    const chatProps = useChat({
        invoke: async (params, onMessage, onFinish) => {
            const stream = await getStream();
            stream && composeStream(stream, onMessage, onFinish)
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
