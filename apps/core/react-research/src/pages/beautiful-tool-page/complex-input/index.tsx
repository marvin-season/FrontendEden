import { ReactNode, useEffect, useState } from "react";

export const ComplexInput = () => {
  const [inputs, setInputs] = useState<{ id: string; type: "text" | "element", value: string }[]>([
    {
      id: "1",
      type: "text",
      value: "白发苍苍",
    },
    {
      id: "2",

      type: "element",
      value: "hello",
    },
    {
      id: "3",
      type: "text",
      value: "pretty",
    },
    {
      id: "4",
      type: "element",
      value: "world",
    },
  ]);

  console.log("inputs", inputs);

  return <>
    <div className={"px-4 py-2 border"} contentEditable={true} onKeyDown={(e) => {
      if (e.key !== "Backspace") {
        return;
      }
      setInputs(prev => {
        return prev.filter(item => item.id !== "2");
      });
    }}>
      {
        inputs?.map((input, index) => {
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