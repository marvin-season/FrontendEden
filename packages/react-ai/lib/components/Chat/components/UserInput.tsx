import React, { useMemo, useState } from "react";
import { useChatContext } from "@/components/Chat/context/ChatContext.tsx";
import { ChatActionType } from "@/constant";
import { FileSelector } from "./FileSelector.tsx";
import { useCommand } from "@/components/Chat/hooks/useCommand.tsx";
import { AttachmentLayout } from "@/components/Chat/components/AttachmentLayout.tsx";
import { Attachment } from "@/types";

export const UserInput = () => {
  const [value, setValue] = useState<string>("");
  const { onAction, commandElementRender } = useChatContext();


  const { triggerRef, reactorRef } = useCommand(commandElementRender, (char) => {
    // todo: 消除唤起弹窗的字符
    setValue(prevState => (prevState.slice(0, -1)));
  });

  const handleSend = () => {
    if (value.trim().length > 0) {
      onAction(ChatActionType.SendMessage, { content: value });
      setValue("");
    } else {
      alert("消息不能为空");
    }
  };
  return <div className={"flex flex-col gap-4 border p-4 rounded-lg"}>
    <AttachmentLayout />

    <div className={"flex item-center gap-2 "}>
      <FileSelector
        onChange={(files) => {
          onAction(ChatActionType.SelectAttachment, {
            attachments: Array.from(files).map(file => {
              return {
                id: file.name,
                type: "file",
                value: file,
              } as Attachment
            }),
          });
        }}>上传
      </FileSelector>

      <form className={"relative flex-grow flex gap-4"} action="#" onSubmit={e => {
        e.preventDefault();
        handleSend();
      }}>
        <div ref={reactorRef} className={"absolute left-0 right-0 bottom-[48px] z-10"}></div>
        <input
          ref={triggerRef}
          className={"border w-full px-4 py-2 rounded resize-none"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }} />
      </form>
    </div>
  </div>;

};
