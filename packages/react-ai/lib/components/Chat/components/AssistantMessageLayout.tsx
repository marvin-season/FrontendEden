import {Message} from "@/types";
import React, {FC} from "react";
import {Flex} from "antd";
import MarkdownContent from "./MarkdownContent.tsx";

export const AssistantMessageLayout: FC<{ message: Message, onRegenerate?: (message: Message) => void }>
    = ({
           message,
           onRegenerate
       }) => {
    return <>
        <Flex gap={6} className={'p-2'} justify={"flex-start"}>
            <div
                className={'bg-sky-100 p-2 pl-4 pr-4 rounded-lg hover:bg-sky-200 hover:cursor-pointer font-mono text-sm'}>
                <MarkdownContent source={message.content}/>
            </div>
        </Flex>
    </>
}
