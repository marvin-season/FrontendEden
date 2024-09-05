import {Message} from "@/types";
import {Fragment} from "react";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";

export default function MessageList({messages}: { messages: Message[] }) {
    const {AssistantMessageLayout, UserMessageLayout} = useChatContext()
    return (
        <>
            {
                messages?.map(item => {
                    return (
                        <Fragment key={item.id}>
                            {
                                item.role === 'user' && UserMessageLayout && <UserMessageLayout message={item}/>
                            }
                            {
                                item.role === 'assistant' && AssistantMessageLayout && <AssistantMessageLayout message={item}/>
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