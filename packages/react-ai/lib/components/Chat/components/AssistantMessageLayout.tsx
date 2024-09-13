import { Message, MultiModalContent } from "@/types";
import React, { FC, memo } from "react";
import MarkdownContent from "./MarkdownContent.tsx";
import MultiModalMessageContent from "@/components/Chat/components/MultiModalContent.tsx";

export const AssistantMessageLayout: FC<{
  message: Message, onRegenerate?: (message: Message) => void
}> = memo(({ message, onRegenerate }) => {
  return <>
    <div
      className={"flex-shrink-0 bg-sky-100 p-2 gap-4 pl-4 pr-4 rounded-lg hover:bg-sky-200 hover:cursor-pointer font-mono text-sm"}>
      {
        !message.type && typeof message.content === "string" &&
        <MarkdownContent source={message.content} />
      }

      {
        message.type === "multi-modal" &&
        <MultiModalMessageContent multiContent={message.content as MultiModalContent[]} />
      }
      <div className={"cursor-pointer"} onClick={() => {
        onRegenerate?.(message);
      }}>0️⃣
      </div>
    </div>
  </>;
}, (prevProps, nextProps) => {
  return prevProps.message.content === nextProps.message.content;
});
