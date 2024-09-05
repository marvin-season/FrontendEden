import {Message} from "@/types";
import React, {FC} from "react";
import MarkdownContent from "./MarkdownContent.tsx";

export const AssistantMessageLayout: FC<{ message: Message, onRegenerate?: (message: Message) => void }>
    = ({
           message,
           onRegenerate
       }) => {
    return <>
        <div className={'p-2 gap-4 flex items-start'} >
            <div
                className={'bg-sky-100 p-2 pl-4 pr-4 rounded-lg hover:bg-sky-200 hover:cursor-pointer font-mono text-sm'}>
                <MarkdownContent source={message.content}/>
            </div>
            <div className={'cursor-pointer'} onClick={() => {
                onRegenerate?.(message);
            }}>0️⃣</div>
        </div>
    </>
}
