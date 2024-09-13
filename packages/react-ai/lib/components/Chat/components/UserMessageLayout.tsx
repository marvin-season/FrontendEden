import React, { FC, memo, useMemo } from "react";
import { Message, MultiModalContent } from "@/types/chat.tsx";
import MarkdownContent from "./MarkdownContent.tsx";
import MultiModalMessageContent from "@/components/Chat/components/MultiModalContent.tsx";


export const UserMessageLayout: FC<{ message: Message }> = memo(({ message }) => {

  return <>
    <div className={"flex justify-end p-2"}>
      <div
        className={"flex flex-col gap-2 item-end bg-indigo-100 p-2 pl-4 pr-4 rounded-lg hover:bg-indigo-200 hover:cursor-pointer"}>
        {
          !message.type && typeof message.content === "string" &&
          <MarkdownContent source={message.content} />
        }

        {
          message.type === "multi-modal" &&
          <MultiModalMessageContent multiContent={message.content as MultiModalContent[]} />
        }

      </div>
    </div>
  </>;
});
