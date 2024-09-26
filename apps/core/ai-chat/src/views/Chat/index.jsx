import {Chat} from "@marvin/react-ai";
import {useChatApproach, useChatPage} from "./hooks/index.js";
import React from "react";
import ConversationBar from "./components/ConversationBar.jsx";
import useChatExtend from "./hooks/useChatExtend.jsx";

export default function ChatPage() {
    const {
        conversations, fetchConversations, deleteConversation, fetchConversationMessages
    } = useChatPage();

    const approachHandle = useChatApproach();

    const chatProps = useChatExtend({
        approachHandle,
        fetchConversations,
        conversations,
    })


    return <>
        <div className={"bg-gradient-to-r from-green-200  to-blue-200  h-screen flex items-center justify-center"}>
            <div className={"bg-[#fffa] rounded-[16px] h-[90%] w-[90%] p-8 flex gap-4 justify-center"}>
                <div className={"p-4 border rounded-xl bg-gray-100 b flex flex-col w-[300px]"}>
                    <ConversationBar
                        checkoutConversation={chatProps.checkoutConversation}
                        fetchConversations={fetchConversations}
                        conversations={conversations}
                        conversationId={chatProps.conversationId}
                        setHistoryMessages={chatProps.setHistoryMessages}
                        fetchConversationMessages={fetchConversationMessages}
                        deleteConversation={deleteConversation}
                    />
                </div>
                <div className={"flex-[3] w-[50%] border rounded-xl"}>
                    <Chat {...chatProps}/>
                </div>
                {/*<div className={"flex-1 border rounded-xl p-4 text-white bg-gray-400 flex flex-col"}>*/}
                {/*    <EvalPanel state={approachHandle.state}/>*/}
                {/*</div>*/}
            </div>
        </div>

    </>;
}

