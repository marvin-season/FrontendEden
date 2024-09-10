import React, { FC, memo } from "react";
import { Message } from "@/types/chat.tsx";
import MarkdownContent from "./MarkdownContent.tsx";


export const UserMessageLayout: FC<{ message: Message }> = memo(({ message }) => {
  return <>
    <div className={"flex justify-end p-2"}>
      <div
        className={"flex flex-col gap-2 item-end bg-indigo-100 p-2 pl-4 pr-4 rounded-lg hover:bg-indigo-200 hover:cursor-pointer"}>
        <div>
        </div>
        <MarkdownContent source={message.content} />
      </div>
    </div>
  </>;
});
