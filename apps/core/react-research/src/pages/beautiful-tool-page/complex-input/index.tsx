import { ReactNode, useEffect, useState } from "react";

export const ComplexInput = () => {
  const [inputs, setInputs] = useState<{ type: "text" | "element", value: string }[]>([
    {
      type: "text",
      value: "白发苍苍",
    },
    {
      type: "element",
      value: "hello",
    },
    {
      type: "text",
      value: "pretty",
    },
    {
      type: "element",
      value: "world",
    },
  ]);

  return <>
    <div className={"px-4 py-2 border"} contentEditable={true}>
      {
        inputs.map((input, index) => {
          return <>
            {
              input.type === "text" ? <span data-type={input.type} key={index}>{input.value}</span> :
                <span key={index} data-type={input.type} className={"bg-blue-300 p-1 rounded"}>
              <span contentEditable>{input.value}</span>
            </span>
            }
          </>;
        })
      }
      <span>{" asas"}</span>
    </div>
  </>;
};