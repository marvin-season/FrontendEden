import React, { useState } from "react";

export const EvalPanel = ({ onRunOk, onChangeApproach, approach }) => {

  const handleChange = (event) => {
    onChangeApproach(event.target.value);
  };

  const [code, setCode] = useState(`
        return fetch("/marvin/api/chat/stream", {
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

    <div className={"flex gap-2"}>
      <input
        type="radio"
        id="default"
        name="approach"
        value="default"
        onChange={handleChange}
        checked={approach === "default"}
      />

      <label htmlFor="default">默认</label>
      <input
        type="radio"
        id="wx"
        name="approach"
        value="wx"
        onChange={handleChange}
        checked={approach === "wx"}
      />
      <label htmlFor="wx">wx</label>
      <input
        type="radio"
        id="custom"
        name="approach"
        value="custom"
        onChange={handleChange}
        checked={approach === "custom"}
      />
      <label htmlFor="custom">自定义获取流对象</label>
    </div>
  {
    approach === "custom" && <>
    <textarea className={"rounded-xl bg-gray-500 flex-grow w-full"} value={code} onChange={e => {
      setCode(e.target.value);
    }}></textarea>
      <div className={"cursor-pointer m-2"} onClick={async () => {
        try {
          const res = await new Function(code)();
          console.log(res);
          onRunOk(res);
        } catch (e) {
        }
      }}>获取流数据
      </div>
    </>
  }

  </>
    ;
};