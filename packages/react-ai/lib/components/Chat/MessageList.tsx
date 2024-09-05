import {Message} from "@/types";
import {Fragment} from "react";

export default function MessageList({messages}: { messages: Message[] }) {
    return (
        <>
            {
                messages?.map(item => {
                    return (
                        <Fragment key={item.id}>
                            {
                                item.role === 'user' && <div>user: {item.content}</div>
                            }
                            {
                                item.role === 'assistant' && <div>assistant: {item.content}</div>
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