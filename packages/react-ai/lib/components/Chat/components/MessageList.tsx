import {Message} from "@/types";
import {Fragment} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";
import {ChatActionType} from "@/constant";

export default function MessageList({messages}: { messages: Message[] }) {
    const {AssistantMessageLayout, UserMessageLayout, onAction} = useChatContext()
    return (
        <>
            {
                messages?.map((item, index) => {
                    return (
                        <Fragment key={item.id}>
                            {
                                item.role === 'user' && UserMessageLayout && <UserMessageLayout message={item}/>
                            }
                            {
                                item.role === 'assistant'
                                && AssistantMessageLayout
                                && <AssistantMessageLayout message={item} onRegenerate={(message) => {
                                    const prompt = messages[index - 1]?.content;
                                    onAction(ChatActionType.ReloadMessage, {prompt})
                                }}/>
                            }
                            {
                                item.role === 'system' && <div>system: {item.content}</div>
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )
}