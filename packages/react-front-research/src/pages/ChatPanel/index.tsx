import {FC} from "react";
import {Chat, Types, useChat} from "../../../../react-ai";
import {composeStream, getStream} from "@/pages/ChatPanel/mock/readable_mock.ts";
import {sleep} from "@marvin/shared";

const ChatPanel: FC = () => {

    const chatProps = useChat({
        invoke: async (params, onMessage, onFinish) => {
            await sleep(3000);
            composeStream<Types.IMessage>(getStream<string>(params.value), onMessage, onFinish)
        },
        stop: () => {
        }
    });

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
