import React, { useState } from "react";

export const EvalPanel = ({ onRunOk }) => {
  const [code, setCode] = useState("console.log('a'); return {a: 1};");

  return <>
    <div>EVAL</div>
    <textarea className={"bg-cyan-800 flex-grow w-full"} value={code} onChange={e => {
      setCode(e.target.value);
    }}></textarea>
    <div onClick={() => {
      try {
        const res = new Function(code)();
        onRunOk(res);
      } catch (e) {
      }
    }}>运行
    </div>

  </>;
};