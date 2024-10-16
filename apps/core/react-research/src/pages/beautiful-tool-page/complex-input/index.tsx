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
    {
      id: "5",
      type: "text",
      value: "pretty",
    },
    {
      id: "6",
      type: "element",
      value: "world",
    },
  ]);

  console.log("inputs", inputs);

  const remove = (e: any) => {
    if (e.key !== "Backspace") {
      return;
    }
    const selection = window.getSelection() as any;
    if (selection?.baseOffset === 0) {
      const previousElementSibling = (selection.baseNode.parentNode.previousElementSibling as HTMLSpanElement);
      previousElementSibling.parentNode?.removeChild(previousElementSibling);
    }
  };

  return <>
    <div className={"px-4 py-2 border"} contentEditable={true} onKeyDown={remove}>
      {
        inputs?.map((input, index) => {
          return <>
            {
              input.type === "text" ?
                <span id={input.id} data-id={input.id} data-type={input.type} key={index}>{input.value}</span> :
                <span id={input.id} data-id={input.id} key={index} data-type={input.type} contentEditable={false}
                      className={"bg-blue-300 p-1 rounded"}>
              <span contentEditable={true}>{input.value}</span>
            </span>
            }
          </>;
        })
      }
      <span>{" asas"}</span>
    </div>
  </>;
};

const isCursorInElement = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return false;
  }
  const range = selection.getRangeAt(0);
  return element.contains(range.commonAncestorContainer);
};