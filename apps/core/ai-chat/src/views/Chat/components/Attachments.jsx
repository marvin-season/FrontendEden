import { Close } from "@icon-park/react";
import React from "react";

export const Attachments = ({ attachments, closeable, onClose }) => {
  return <>
    {
      attachments?.map((attachment) => {
        return <div key={`${attachment.type}${attachment.id}`} className={"border rounded py-2 px-4 flex gap-2"}>
          <span>{attachment.name}</span>
          {closeable && <Close onClick={() => onClose(attachment)} />}
        </div>;
      })
    }
  </>;
};