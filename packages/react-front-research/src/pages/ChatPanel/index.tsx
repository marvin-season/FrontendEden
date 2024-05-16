import {FC} from "react";
import {Chat, Types, useChat} from "@root/react-ui";
import {generateRandomTextWithCallback} from "@/utils/ContentGenerator.ts";
import moment from "moment";


const ChatPanel: FC = () => {
    const sendApi: Types.ISendApi = ({params, onData}) => {
        console.log("🚀  params", params, onData);
        generateRandomTextWithCallback((r) => {
        onData({...r, createTime: moment()})})
    }
    const chatProps = useChat<Types.IMessage>(sendApi);

    return <Chat {...chatProps}/>;
}

export default ChatPanel;
