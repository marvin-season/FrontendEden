import {Message} from "@/types";
import {Fragment} from "react";
import {UserMessageLayout} from "@/components/Chat/components/UserMessageLayout.tsx";
import {AssistantMessageLayout} from "@/components/Chat/components/AssistantMessageLayout.tsx";

export default function MessageList({messages}: { messages: Message[] }) {
    return (
        <>
            {
                messages?.map(item => {
                    return (
                        <Fragment key={item.id}>
                            {
                                item.role === 'user' && <UserMessageLayout message={item}/>
                            }
                            {
                                item.role === 'assistant' && <AssistantMessageLayout message={item}/>
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