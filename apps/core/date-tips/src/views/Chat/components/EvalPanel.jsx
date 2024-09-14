import React, { useState } from "react";

export const EvalPanel = ({ onRunOk }) => {
  const [code, setCode] = useState(`
        return fetch("/maws/api/chat/stream", {
        method: "POST",
        body: JSON.stringify({
          "prompt": "hi",
          "conversationId": "conversation-1726303749057",
          "toolIds": [1]
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  `);

  return <>
    <textarea className={"bg-cyan-800 flex-grow w-full"} value={code} onChange={e => {
      setCode(e.target.value);
    }}></textarea>
    <div className={"cursor-pointer"} onClick={async () => {
      try {
        const res = await new Function(code)();
        console.log(res);
        onRunOk(res);
      } catch (e) {
      }
    }}>获取流数据
    </div>

  </>;
};