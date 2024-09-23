import {Delete} from "@icon-park/react";
import React from "react";

const ConversationBar = ({
                             checkoutConversation,
                             conversations,
                             setHistoryMessages,
                             conversationId,
                             fetchConversationMessages,
                             fetchConversations,
                             deleteConversation
                         }) => {
    return <>
        <div className={"cursor-pointer bg-gray-400 text-white p-2 rounded-xl text-center mb-4"}
             onClick={() => {
                 checkoutConversation();
             }}>新建会话
        </div>
        <div className={"overflow-y-scroll scrollbar-none"}>
            {conversations.map(item => {
                return <div
                    key={item.id}
                    className={`cursor-pointer border border-green-100 flex items-center justify-between gap-2 p-2 rounded-xl
            ${item.conversationId === conversationId ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-500"} mb-2`}
                    onClick={async () => {
                        checkoutConversation(item.conversationId);
                        const messages = await fetchConversationMessages(item.conversationId);
                        setHistoryMessages(messages);
                    }}
                >

                    <div className={"w-[200px] overflow-x-scroll scrollbar-none pr-4 text-nowrap mr-4"} style={{
                        maskImage: "linear-gradient(to right, black 90%, transparent 100%)",
                    }}>{item.name?.toUpperCase()}</div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        confirm("确认删除吗?") && deleteConversation(item.conversationId).then(async () => {
                            await fetchConversations();
                            checkoutConversation();
                        });
                    }}>
                        <Delete theme={"outline"} fill={"#fff"}/>
                    </div>
                </div>;
            })}
        </div>
    </>
}

export default ConversationBar